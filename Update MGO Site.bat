@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Updates the MGO Computing website (mgocomputing.com) with the projects from this portfolio.
echo It checks and builds the site, gives you a private preview link, then asks before going live.
echo.
if not exist node_modules (
  echo Installing the tools, first run only...
  call npm install || goto :fail
)
call node tools\export.mjs mgo --publish || goto :fail
echo.
pause
exit /b 0
:fail
echo.
echo Stopped - read the message above.
pause
exit /b 1
