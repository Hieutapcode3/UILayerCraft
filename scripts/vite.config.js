const { defineConfig } = require("vite");
const path = require("path");

// One config for both IIFE bundles; `--mode` picks which: plugin-main (dist/code.js) or figma-sim (dist/figma-sim.js).
const BUNDLES = {
  "plugin-main": { entry: "src/plugin/main.js", name: "UILayerCraftPluginMain", fileName: "code.js" },
  "figma-sim": { entry: "src/simulator/main.js", name: "UILayerCraftFigmaSimulator", fileName: "figma-sim.js" }
};

const ROOT = path.resolve(__dirname, "..");

module.exports = defineConfig(({ mode }) => {
  const bundle = BUNDLES[mode];
  if (!bundle) throw new Error(`Unknown build mode "${mode}"; use ${Object.keys(BUNDLES).join(" or ")}`);
  return {
    root: ROOT,
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.join(ROOT, bundle.entry),
        name: bundle.name,
        formats: ["iife"],
        fileName: () => bundle.fileName
      },
      outDir: path.join(ROOT, "dist"),
      rollupOptions: {
        output: {
          extend: true
        }
      }
    }
  };
});
