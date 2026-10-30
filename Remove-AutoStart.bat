@echo off
chcp 65001 >nul
rem Removes the Startup shortcut and stops the background API.
del "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\UILayerCraft API.lnk" 2>nul
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 18787 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }"
echo Auto-start removed and the API stopped.
timeout /t 3 >nul
