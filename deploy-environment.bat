@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo UILayerCraft - Deploy Environment
echo -----------------------------------
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not detected.
  echo This plugin requires Node.js 20 or later.
  echo Download: https://nodejs.org/
  echo.
  echo I will open the Node.js download page for you.
  echo After installing, reopen the terminal and run the two commands below to verify:
  echo.
  echo node -v
  echo npm -v
  echo.
  echo If you see a version such as v20.x.x or v22.x.x, the installation succeeded.
  echo Then double-click this file again.
  echo.
  start "" "https://nodejs.org/"
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not detected.
  echo npm normally installs together with Node.js.
  echo Reinstall Node.js 20 or later, then double-click this file again.
  echo Download: https://nodejs.org/
  echo.
  echo After installing, reopen the terminal and run the two commands below to verify:
  echo.
  echo node -v
  echo npm -v
  echo.
  echo If both commands show a version number, the installation succeeded.
  echo.
  start "" "https://nodejs.org/"
  pause
  exit /b 1
)

for /f "usebackq delims=" %%v in (`node -p "Number(process.versions.node.split('.')[0])"`) do set NODE_MAJOR=%%v

if %NODE_MAJOR% LSS 20 (
  echo Your Node.js version is too old:
  node -v
  echo Upgrade to Node.js 20 or later, then double-click this file again.
  echo Download: https://nodejs.org/
  echo.
  echo After upgrading, reopen the terminal and run the two commands below to verify:
  echo.
  echo node -v
  echo npm -v
  echo.
  echo If node -v shows v20.x.x or later, you can continue.
  echo.
  start "" "https://nodejs.org/"
  pause
  exit /b 1
)

echo Node.js version:
node -v
echo npm version:
npm -v
echo.
echo Installing or checking project dependencies...
echo.

call npm install
if errorlevel 1 (
  echo.
  echo Dependency installation failed. Check the red error messages above.
  echo Common causes: network problems, an old Node.js version, or no write permission in the project folder.
  echo.
  pause
  exit /b 1
)

echo.
echo Dependencies are ready.
echo Starting the local API service...
echo.
echo Seeing the line below means startup succeeded:
echo OpenAI image proxy listening on http://127.0.0.1:18787
echo.
echo Important: do not close this window while using the Figma plugin.
echo.

call npm run api

echo.
echo The local service has stopped.
pause
