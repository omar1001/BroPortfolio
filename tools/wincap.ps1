# BroPortfolio window capture: start a desktop app, resize its window, drive it through
# UI Automation, capture it to PNG, and close it. Windows only. One action per call:
#   start    -Exe <path> [-ArgList "..."] [-WorkDir <dir>]        -> prints PID
#   find     -ProcId <pid> | -Title <substring>                     -> prints hwnd + title
#   capture  (-ProcId|-Title) -Out <file.png> [-Width -Height]      -> resizes, focuses, saves PNG
#   invoke   (-ProcId|-Title) -Name <UIA element name>              -> select tab / press button
#   setvalue (-ProcId|-Title) -Name <name or AutomationId> -Value <text>
#   keys     (-ProcId|-Title) -Keys <SendKeys string>
#   close    -ProcId <pid>                                          -> graceful close, then kill tree
#   list                                                            -> visible top-level windows
# Sizes are physical pixels (the process is DPI aware). Exit code 0 = success.
param(
  [ValidateSet('start', 'find', 'capture', 'invoke', 'setvalue', 'keys', 'close', 'list', 'clickat', 'dblclickat', 'elements')] [string]$Action,
  [string]$Exe = '', [string]$ArgList = '', [string]$WorkDir = '',
  [int]$ProcId = 0, [string]$Title = '',
  [string]$Out = '', [int]$Width = 0, [int]$Height = 0,
  [string]$Name = '', [string]$Value = '', [string]$Keys = '',
  [int]$WaitMs = 900, [int]$TimeoutSec = 40,
  [int]$X = 0, [int]$Y = 0
)
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms
Add-Type -TypeDefinition @'
using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;
public static class Win {
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
  public delegate bool EnumProc(IntPtr h, IntPtr l);
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc cb, IntPtr l);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
  [DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern int GetWindowText(IntPtr h, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("dwmapi.dll")] public static extern int DwmGetWindowAttribute(IntPtr h, int a, out RECT r, int size);
  [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr h, int x, int y, int w, int hh, bool repaint);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int cmd);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern void keybd_event(byte vk, byte scan, uint flags, UIntPtr extra);
  [DllImport("user32.dll")] public static extern IntPtr GetWindow(IntPtr h, uint cmd);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint f, uint dx, uint dy, uint d, UIntPtr e);
  public static void Click(int x, int y, int times) { SetCursorPos(x, y); for (int i = 0; i < times; i++) { mouse_event(2,0,0,0,UIntPtr.Zero); mouse_event(4,0,0,0,UIntPtr.Zero); System.Threading.Thread.Sleep(60); } }
  public static List<IntPtr> TopWindows() {
    var list = new List<IntPtr>();
    EnumWindows((h, l) => { if (IsWindowVisible(h) && GetWindow(h, 4) == IntPtr.Zero) list.Add(h); return true; }, IntPtr.Zero);
    return list;
  }
  public static string Text(IntPtr h) { var sb = new StringBuilder(512); GetWindowText(h, sb, 512); return sb.ToString(); }
  public static uint Pid(IntPtr h) { uint p; GetWindowThreadProcessId(h, out p); return p; }
  public static RECT Bounds(IntPtr h) {
    RECT r; if (DwmGetWindowAttribute(h, 9, out r, Marshal.SizeOf(typeof(RECT))) == 0) return r;
    GetWindowRect(h, out r); return r;
  }
  public static void Focus(IntPtr h) {
    ShowWindow(h, 9);                       // SW_RESTORE
    keybd_event(0x12, 0, 0, UIntPtr.Zero);  // tap ALT so Windows lets us take the foreground
    keybd_event(0x12, 0, 2, UIntPtr.Zero);
    SetForegroundWindow(h);
  }
}
'@
[void][Win]::SetProcessDPIAware()

function Get-ProcTree([int]$root) {
  $all = Get-CimInstance Win32_Process | Select-Object ProcessId, ParentProcessId
  $ids = New-Object System.Collections.Generic.List[int]; $ids.Add($root)
  $added = $true
  while ($added) {
    $added = $false
    foreach ($p in $all) { if ($ids.Contains([int]$p.ParentProcessId) -and -not $ids.Contains([int]$p.ProcessId)) { $ids.Add([int]$p.ProcessId); $added = $true } }
  }
  return ,$ids
}

function Find-Window {
  $deadline = (Get-Date).AddSeconds($TimeoutSec)
  do {
    $wins = [Win]::TopWindows() | Where-Object { [Win]::Text($_).Length -gt 0 }
    if ($Title) { $hit = $wins | Where-Object { [Win]::Text($_) -like "*$Title*" } | Select-Object -First 1 }
    elseif ($ProcId) {
      $tree = Get-ProcTree $ProcId
      $hit = $wins | Where-Object { $tree.Contains([int][Win]::Pid($_)) } | Select-Object -First 1
    }
    if ($hit) { return $hit }
    Start-Sleep -Milliseconds 500
  } while ((Get-Date) -lt $deadline)
  throw "Window not found (ProcId=$ProcId Title='$Title')"
}

function Get-Uia([IntPtr]$hwnd) {
  Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes
  return [System.Windows.Automation.AutomationElement]::FromHandle($hwnd)
}

function Find-Element($root, [string]$key) {
  $AE = [System.Windows.Automation.AutomationElement]
  $scope = [System.Windows.Automation.TreeScope]::Descendants
  foreach ($prop in @($AE::NameProperty, $AE::AutomationIdProperty)) {
    $el = $root.FindFirst($scope, (New-Object System.Windows.Automation.PropertyCondition($prop, $key)))
    if ($el) { return $el }
  }
  # Fallback: partial name match.
  $all = $root.FindAll($scope, [System.Windows.Automation.Condition]::TrueCondition)
  foreach ($el in $all) { if ($el.Current.Name -like "*$key*") { return $el } }
  throw "UI element '$key' not found"
}

switch ($Action) {
  'list' {
    foreach ($h in [Win]::TopWindows()) { $t = [Win]::Text($h); if ($t) { "{0}`t{1}`t{2}" -f [Win]::Pid($h), $h, $t } }
  }
  'start' {
    $sp = @{ FilePath = $Exe; PassThru = $true }
    if ($ArgList) { $sp.ArgumentList = $ArgList }
    if ($WorkDir) { $sp.WorkingDirectory = $WorkDir }
    $p = Start-Process @sp
    $p.Id
  }
  'find' { $h = Find-Window; "{0}`t{1}" -f $h, [Win]::Text($h) }
  'capture' {
    $h = Find-Window
    if ($Width -gt 0 -and $Height -gt 0) {
      $screen = [System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea
      $x = [Math]::Max(0, [int](($screen.Width - $Width) / 2)); $y = [Math]::Max(0, [int](($screen.Height - $Height) / 2))
      [void][Win]::ShowWindow($h, 9)
      [void][Win]::MoveWindow($h, $x, $y, $Width, $Height, $true)
    }
    [Win]::Focus($h)
    Start-Sleep -Milliseconds $WaitMs
    $r = [Win]::Bounds($h)
    $w = $r.Right - $r.Left; $hh = $r.Bottom - $r.Top
    $bmp = New-Object System.Drawing.Bitmap($w, $hh)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen($r.Left, $r.Top, 0, 0, (New-Object System.Drawing.Size($w, $hh)))
    $g.Dispose()
    $dir = Split-Path -Parent $Out; if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    $bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    "saved $Out ${w}x${hh}"
  }
  'invoke' {
    $h = Find-Window; [Win]::Focus($h)
    $el = Find-Element (Get-Uia $h) $Name
    $done = $false
    foreach ($pat in @([System.Windows.Automation.SelectionItemPattern]::Pattern, [System.Windows.Automation.InvokePattern]::Pattern, [System.Windows.Automation.TogglePattern]::Pattern, [System.Windows.Automation.ExpandCollapsePattern]::Pattern)) {
      $obj = $null
      if ($el.TryGetCurrentPattern($pat, [ref]$obj)) {
        switch ($pat.ProgrammaticName) {
          { $_ -like '*SelectionItem*' } { $obj.Select() }
          { $_ -like '*Invoke*' } { $obj.Invoke() }
          { $_ -like '*Toggle*' } { $obj.Toggle() }
          { $_ -like '*ExpandCollapse*' } { $obj.Expand() }
        }
        $done = $true; break
      }
    }
    if (-not $done) { throw "Element '$Name' supports no clickable pattern" }
    Start-Sleep -Milliseconds $WaitMs
    "invoked $Name"
  }
  'setvalue' {
    $h = Find-Window; [Win]::Focus($h)
    $el = Find-Element (Get-Uia $h) $Name
    $obj = $null
    if (-not $el.TryGetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern, [ref]$obj)) { throw "Element '$Name' has no ValuePattern" }
    $obj.SetValue($Value)
    "set $Name"
  }
  'keys' {
    $h = Find-Window; [Win]::Focus($h); Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait($Keys)
    Start-Sleep -Milliseconds $WaitMs
    "sent keys"
  }
  'clickat' {
    $h = Find-Window; [Win]::Focus($h); Start-Sleep -Milliseconds 250
    $r = [Win]::Bounds($h); [Win]::Click($r.Left + $X, $r.Top + $Y, 1); Start-Sleep -Milliseconds $WaitMs
    "clicked $X,$Y"
  }
  'dblclickat' {
    $h = Find-Window; [Win]::Focus($h); Start-Sleep -Milliseconds 250
    $r = [Win]::Bounds($h); [Win]::Click($r.Left + $X, $r.Top + $Y, 2); Start-Sleep -Milliseconds $WaitMs
    "double-clicked $X,$Y"
  }
  'elements' {
    # Lists named UI Automation elements with their rectangles relative to the window (for clicking/redacting).
    $h = Find-Window; $r = [Win]::Bounds($h); $root = Get-Uia $h
    $all = $root.FindAll([System.Windows.Automation.TreeScope]::Descendants, [System.Windows.Automation.Condition]::TrueCondition)
    foreach ($el in $all) {
      $c = $el.Current; if (-not $c.Name -and -not $c.AutomationId) { continue }
      $b = $c.BoundingRectangle; if ($b.IsEmpty) { continue }
      "{0}`t{1}`t{2}`t{3},{4},{5},{6}" -f $c.ControlType.ProgrammaticName.Replace('ControlType.',''), $c.AutomationId, ($c.Name -replace '\s+',' ').Substring(0, [Math]::Min(60, ($c.Name -replace '\s+',' ').Length)), [int]($b.X - $r.Left), [int]($b.Y - $r.Top), [int]$b.Width, [int]$b.Height
    }
  }
  'close' {
    $tree = Get-ProcTree $ProcId
    try { $p = Get-Process -Id $ProcId -ErrorAction Stop; [void]$p.CloseMainWindow(); [void]$p.WaitForExit(4000) } catch {}
    foreach ($id in $tree) { try { Stop-Process -Id $id -Force -ErrorAction Stop } catch {} }
    "closed $ProcId"
  }
}
exit 0
