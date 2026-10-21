@echo off
chcp 65001 >nul
cd /d "%~dp0"
rem CLIs are .cmd shims on Windows; every call below needs "call" or the menu never comes back.

:menu
cls
echo UILayerCraft - Menu
echo -----------------------------------
echo  1. Start the local API server
echo  2. Check CLI accounts
echo  3. Claude Code: log out
echo  4. Claude Code: log in
echo  5. Codex CLI: log out
echo  6. Codex CLI: log in
echo  0. Exit
echo.
set "choice="
set /p choice=Choose:

if "%choice%"=="1" goto server
if "%choice%"=="2" goto status
if "%choice%"=="3" call claude auth logout & goto done
if "%choice%"=="4" call claude auth login & goto done
if "%choice%"=="5" call codex logout & goto done
if "%choice%"=="6" call codex login & goto done
if "%choice%"=="0" exit /b 0
goto menu

:status
echo.
echo --- Claude Code ---
call claude auth status
echo.
echo --- Codex CLI ---
call codex login status
echo.
call node scripts\setup-clis.js --check
goto done

:server
echo.
echo Do not close this window while using the Figma plugin. Press Ctrl+C to stop.
echo.
call npm run api
goto done

:done
echo.
pause
goto menu
