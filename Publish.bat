@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules (
  echo Installing the tools, first run only...
  call npm install || goto :fail
)
call node tools\deploy.mjs || goto :fail
echo.
pause
exit /b 0
:fail
echo.
echo Publishing stopped - read the message above.
pause
exit /b 1
