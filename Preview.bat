@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules (
  echo Installing the tools, first run only...
  call npm install || goto :fail
)
call node tools\build.mjs || goto :fail
node tools\serve.mjs --open
exit /b 0
:fail
echo.
echo Something went wrong - read the message above.
pause
exit /b 1
