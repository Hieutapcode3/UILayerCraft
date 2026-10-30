#!/bin/bash

set -u

cd "$(dirname "$0")" || exit 1

clear
echo "UILayerCraft - Deploy Environment"
echo "-----------------------------------"
echo

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js was not detected."
  echo "This plugin requires Node.js 20 or later."
  echo "Download: https://nodejs.org/"
  echo
  echo "I will open the Node.js download page for you."
  echo "After installing, reopen the terminal and run the two commands below to verify:"
  echo
  echo "node -v"
  echo "npm -v"
  echo
  echo "If you see a version such as v20.x.x or v22.x.x, the installation succeeded."
  echo "Then double-click this file again."
  echo
  open "https://nodejs.org/" >/dev/null 2>&1 || true
  read -r -p "Press Enter to exit..."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm was not detected."
  echo "npm normally installs together with Node.js."
  echo "Reinstall Node.js 20 or later, then double-click this file again."
  echo "Download: https://nodejs.org/"
  echo
  echo "After installing, reopen the terminal and run the two commands below to verify:"
  echo
  echo "node -v"
  echo "npm -v"
  echo
  echo "If both commands show a version number, the installation succeeded."
  echo
  open "https://nodejs.org/" >/dev/null 2>&1 || true
  read -r -p "Press Enter to exit..."
  exit 1
fi

NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"

if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "Your Node.js version is too old: $(node -v)"
  echo "Upgrade to Node.js 20 or later, then double-click this file again."
  echo "Download: https://nodejs.org/"
  echo
  echo "After upgrading, reopen the terminal and run the two commands below to verify:"
  echo
  echo "node -v"
  echo "npm -v"
  echo
  echo "If node -v shows v20.x.x or later, you can continue."
  echo
  open "https://nodejs.org/" >/dev/null 2>&1 || true
  read -r -p "Press Enter to exit..."
  exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo
echo "Installing or checking project dependencies..."
echo

npm install

if [ $? -ne 0 ]; then
  echo
  echo "Dependency installation failed. Check the red error messages above."
  echo "Common causes: network problems, an old Node.js version, or no write permission in the project folder."
  echo
  read -r -p "Press Enter to exit..."
  exit 1
fi

echo
echo "Dependencies are ready."
echo
# Installs missing Claude/Codex/Gemini CLIs and opens a terminal for each login still needed.
node scripts/setup-clis.js
echo "Starting the local API service..."
echo
echo "Seeing the line below means startup succeeded:"
echo "UILayerCraft API listening on http://127.0.0.1:18787"
echo
echo "Important: do not close this terminal window while using the Figma plugin."
echo

npm run api

echo
echo "The local service has stopped."
read -r -p "Press Enter to exit..."
