# BroPortfolio alarm: asks the owner to free the PC before apps are opened for screenshots,
# and tells them when the PC is free again. Bilingual (English + Arabic).
#   -Mode start  : sound + top-most dialog, waits for a click. Exit 0 = ready, 2 = not now, 3 = no answer.
#   -Mode done   : sound + top-most "you can use your PC again" dialog.
# Run:  powershell -NoProfile -ExecutionPolicy Bypass -File tools\alarm.ps1 -Mode start -Minutes 10
param(
  [ValidateSet('start', 'done')] [string]$Mode = 'start',
  [int]$Minutes = 10,
  [int]$TimeoutMinutes = 45,
  [string]$Note = ''
)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()

function Play-Chime {
  for ($i = 0; $i -lt 3; $i++) {
    [System.Media.SystemSounds]::Exclamation.Play()
    Start-Sleep -Milliseconds 650
  }
}

$form = New-Object System.Windows.Forms.Form
$form.TopMost = $true
$form.StartPosition = 'CenterScreen'
$form.FormBorderStyle = 'FixedDialog'
$form.MaximizeBox = $false
$form.MinimizeBox = $false
$form.ShowInTaskbar = $true
$form.BackColor = [System.Drawing.Color]::FromArgb(16, 18, 27)
$form.ForeColor = [System.Drawing.Color]::White
$form.ClientSize = New-Object System.Drawing.Size(620, 330)
$form.Font = New-Object System.Drawing.Font('Segoe UI', 11)

$title = New-Object System.Windows.Forms.Label
$title.AutoSize = $false
$title.Location = New-Object System.Drawing.Point(24, 18)
$title.Size = New-Object System.Drawing.Size(572, 40)
$title.Font = New-Object System.Drawing.Font('Segoe UI Semibold', 17)

$en = New-Object System.Windows.Forms.Label
$en.AutoSize = $false
$en.Location = New-Object System.Drawing.Point(24, 66)
$en.Size = New-Object System.Drawing.Size(572, 88)

$ar = New-Object System.Windows.Forms.Label
$ar.AutoSize = $false
$ar.RightToLeft = 'Yes'
$ar.TextAlign = 'TopRight'
$ar.Location = New-Object System.Drawing.Point(24, 158)
$ar.Size = New-Object System.Drawing.Size(572, 88)
$ar.Font = New-Object System.Drawing.Font('Segoe UI', 12)

$ok = New-Object System.Windows.Forms.Button
$ok.Size = New-Object System.Drawing.Size(250, 46)
$ok.Location = New-Object System.Drawing.Point(24, 262)
$ok.FlatStyle = 'Flat'
$ok.BackColor = [System.Drawing.Color]::FromArgb(46, 204, 138)
$ok.ForeColor = [System.Drawing.Color]::FromArgb(10, 14, 20)
$ok.Font = New-Object System.Drawing.Font('Segoe UI Semibold', 12)

$form.Controls.AddRange(@($title, $en, $ar, $ok))

if ($Mode -eq 'start') {
  $form.Text = 'BroPortfolio'
  $title.Text = 'I need your PC for about ' + $Minutes + ' minutes'
  $en.Text = "I'm about to open your apps to take screenshots.`nPlease save your work and don't touch the mouse or keyboard until I say I'm done.`nClick READY when you are free." + $(if ($Note) { "`n" + $Note } else { '' })
  $ar.Text = "سأفتح برامجك الآن لالتقاط صور الشاشة (حوالي $Minutes دقائق).`nمن فضلك احفظ عملك ولا تستخدم الماوس أو لوحة المفاتيح حتى أخبرك أنني انتهيت.`nاضغط «جاهز» عندما تكون مستعدًا."
  $ok.Text = 'READY  /  جاهز'
  $ok.DialogResult = [System.Windows.Forms.DialogResult]::OK

  $later = New-Object System.Windows.Forms.Button
  $later.Size = New-Object System.Drawing.Size(250, 46)
  $later.Location = New-Object System.Drawing.Point(346, 262)
  $later.FlatStyle = 'Flat'
  $later.Text = 'Not now  /  ليس الآن'
  $later.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
  $form.Controls.Add($later)
  $form.AcceptButton = $ok
  $form.CancelButton = $later

  # Keep reminding every 30 s until answered; give up after the timeout.
  $script:elapsed = 0
  $timer = New-Object System.Windows.Forms.Timer
  $timer.Interval = 30000
  $timer.Add_Tick({
      $script:elapsed += 30
      if ($script:elapsed -ge ($TimeoutMinutes * 60)) { $form.Tag = 'timeout'; $form.Close(); return }
      [System.Media.SystemSounds]::Exclamation.Play()
      $form.Activate()
    })
  $form.Add_Shown({ $form.Activate(); Play-Chime; $timer.Start() })
  $result = $form.ShowDialog()
  $timer.Stop()
  if ($form.Tag -eq 'timeout') { exit 3 }
  if ($result -eq [System.Windows.Forms.DialogResult]::OK) { exit 0 } else { exit 2 }
}
else {
  $form.Text = 'BroPortfolio'
  $title.Text = 'Done - your PC is free again'
  $en.Text = "Finished! I closed the apps I opened.`nYou can use your PC again." + $(if ($Note) { "`n" + $Note } else { '' })
  $ar.Text = "انتهيت! أغلقت البرامج التي فتحتها.`nيمكنك استخدام جهازك الآن."
  $ok.Text = 'OK  /  حسنًا'
  $ok.DialogResult = [System.Windows.Forms.DialogResult]::OK
  $form.AcceptButton = $ok
  $form.Add_Shown({ $form.Activate(); Play-Chime })
  [void]$form.ShowDialog()
  exit 0
}
