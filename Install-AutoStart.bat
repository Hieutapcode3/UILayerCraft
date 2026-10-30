@echo off
chcp 65001 >nul
cd /d "%~dp0"
rem Per-user, no admin rights, nothing global: one shortcut in the Startup folder.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 or later was not found. Run start.bat and choose 1 first.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Dependencies are missing. Run start.bat and choose 1 first.
  pause
  exit /b 1
)
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
powershell -NoProfile -Command "$s=(New-Object -ComObject WScript.Shell).CreateShortcut($env:STARTUP+'\UILayerCraft API.lnk'); $s.TargetPath=$env:SystemRoot+'\System32\wscript.exe'; $s.Arguments='\"'+(Resolve-Path 'scripts\start-hidden.vbs').Path+'\"'; $s.WorkingDirectory=(Get-Location).Path; $s.Save()"
if errorlevel 1 (
  echo Could not create the Startup shortcut.
  pause
  exit /b 1
)
wscript "%~dp0scripts\start-hidden.vbs"
echo.
echo Done. The API now starts in the background every time you sign in to Windows.
echo Starting it now... open the Figma plugin in a few seconds.
echo Log file: %~dp0server.log
echo To remove: run Remove-AutoStart.bat
timeout /t 4 >nul
