// Run on Windows before electron-builder: builds dist/ and copies the Node that built node_modules,
// so the packaged native modules (sharp, vectorizer) always match the bundled node.exe.
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
if (process.platform !== "win32") {
  console.error("Build the installer on Windows (the bundled node.exe must be the Windows one).");
  process.exit(1);
}
if (!fs.existsSync(path.join(root, "node_modules"))) {
  console.error("Run npm install in the project root first.");
  process.exit(1);
}
execSync("npm run build", { cwd: root, stdio: "inherit" });
fs.mkdirSync(path.join(__dirname, "build"), { recursive: true });
fs.copyFileSync(process.execPath, path.join(__dirname, "build", "node.exe"));
console.log(`Bundled Node ${process.version}`);

// Tray/installer icon, drawn once with the project's own sharp.
const iconPath = path.join(__dirname, "build", "icon.png");
if (!fs.existsSync(iconPath)) {
  const sharp = require(path.join(root, "node_modules", "sharp"));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#22c5a6"/></linearGradient></defs><rect x="16" y="16" width="480" height="480" rx="110" fill="url(#g)"/><rect x="120" y="130" width="272" height="100" rx="28" fill="#fff" fill-opacity=".43"/><rect x="120" y="188" width="272" height="100" rx="28" fill="#fff" fill-opacity=".67"/><rect x="120" y="246" width="272" height="100" rx="28" fill="#fff"/></svg>`;
  sharp(Buffer.from(svg)).png().toFile(iconPath).then(() => console.log("Icon written"));
}
