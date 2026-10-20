const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/simulator/main.js"),
      name: "UILayerCraftFigmaSimulator",
      formats: ["iife"],
      fileName: () => "figma-sim.js"
    },
    outDir: "dist",
    rollupOptions: {
      output: {
        extend: true
      }
    }
  }
});
