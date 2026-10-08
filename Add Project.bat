@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules (
  echo Installing the tools, first run only...
  call npm install
)
node tools\new-project.mjs
pause
