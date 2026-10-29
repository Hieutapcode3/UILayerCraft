@echo off
chcp 65001 >nul
cd /d "%~dp0"
rem CLIs are .cmd shims on Windows; every call below needs "call" or the menu never comes back.

:menu
cls
echo UILayerCraft - Menu
echo -----------------------------------
echo  1. Set up and start (first run / new machine)
echo  2. Start the local API server
echo  3. Check CLI accounts
echo  4. Claude Code: log out
echo  5. Claude Code: log in
echo  6. Codex CLI: log out
echo  7. Codex CLI: log in
echo  0. Exit
echo.
set "choice="
set /p choice=Choose:

if "%choice%"=="1" goto setup
if "%choice%"=="2" goto server
if "%choice%"=="3" goto status
if "%choice%"=="4" call claude auth logout & goto done
if "%choice%"=="5" call claude auth login & goto done
if "%choice%"=="6" call codex logout & goto done
if "%choice%"=="7" call codex login & goto done
if "%choice%"=="0" exit /b 0
goto menu

:setup
echo.
where node >nul 2>nul
if errorlevel 1 goto nonode
where npm >nul 2>nul
if errorlevel 1 goto nonode
for /f "usebackq delims=" %%v in (`node -p "Number(process.versions.node.split('.')[0])"`) do set NODE_MAJOR=%%v
if %NODE_MAJOR% LSS 20 goto nonode
echo Node.js:
node -v
echo npm:
call npm -v
echo.
echo Installing or checking project dependencies...
call npm install
if errorlevel 1 (
  echo.
  echo Dependency installation failed. Check the red error messages above.
  echo Common causes: network problems, an old Node.js version, or no write permission in the project folder.
  goto done
)
echo.
rem Installs missing Claude/Codex/Gemini CLIs and opens a terminal for each login still needed.
call node scripts\setup-clis.js
goto server

:nonode
echo Node.js 20 or later was not found (it also installs npm).
echo I will open the download page. After installing, reopen this menu and choose 1 again.
echo To verify, run in a new terminal: node -v  and  npm -v
start "" "https://nodejs.org/"
goto done

:status
echo.
rem Installed / logged-in state and the account (email) each CLI uses; see scripts\setup-clis.js.
call node scripts\setup-clis.js --check
goto done

:server
echo.
echo Seeing "UILayerCraft API listening on http://127.0.0.1:18787" means startup succeeded.
echo Do not close this window while using the Figma plugin. Press Ctrl+C to stop.
echo.
call npm run api
goto done

:done
echo.
pause
goto menu
