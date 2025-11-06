import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";
import federation from "@originjs/vite-plugin-federation";

// Dynamically discover screen directories
const screensDir = resolve(__dirname, "src/screens");
const screenEntries: Record<string, string> = {};

// Only add screens that exist in the src/screens directory
if (fs.existsSync(screensDir)) {
  const screenDirs = fs
    .readdirSync(screensDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Create an entry point for each screen
  screenDirs.forEach((screen) => {
    const entryFile = resolve(screensDir, screen, "index.tsx");
    if (fs.existsSync(entryFile)) {
      screenEntries[screen] = entryFile;
    }
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({}),
    federation({
      name: "host_app",
      remotes: {
        mfe_app: "https://dellmfe.vercel.app/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
  clearScreen: false,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/common": resolve(__dirname, "./src/common"),
      "@/screens": resolve(__dirname, "./src/screens"),
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/constants": resolve(__dirname, "./src/constants"),
      "@/assets": resolve(__dirname, "./src/assets"),
      "@/lib": resolve(__dirname, "./src/lib"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        ...screenEntries,
        main: resolve(__dirname, "index.html"),
      },
      output: {
        // Screen-specific entries
        entryFileNames: (chunkInfo) =>
          screenEntries[chunkInfo.name]
            ? `assets/${chunkInfo.name}/index.js`
            : "assets/main.js",

        // Chunks naming strategy
        chunkFileNames: (chunkInfo) => {
          const chunkName = chunkInfo.name || "";

          // For screen-specific chunks
          const screenMatch = Object.keys(screenEntries).find((screen) =>
            chunkName.startsWith(`${screen}-`)
          );

          if (screenMatch) {
            return `assets/${screenMatch}/chunk.js`;
          }

          // For shared chunks, use a simplified naming scheme
          return "assets/shared/[name].js";
        },

        // Assets naming (CSS, images, etc)
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || "";
          if (info.endsWith(".css")) {
            return "assets/shared/style[extname]";
          }
          return "assets/shared/[name][extname]";
        },

        // Simplified manual chunks strategy with forced common chunk
        manualChunks: (id) => {
          const absoluteId = resolve(id);
          const absoluteSrcDir = resolve(__dirname, "src/");

          // All node_modules dependencies go into a single vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }

          // Everything in src/ but NOT in src/screens/ goes to common
          // Note: resolve(id) converts to absolute path for reliable checking

          if (absoluteId.startsWith(absoluteSrcDir)) {
            return "common";
          }

          // For screen-specific code or other cases, let Rollup decide
          return undefined;
        },
      },
    },
    minify: false,
    emptyOutDir: true,
    cssCodeSplit: false, // Keep CSS in a single file
    sourcemap: true,
  },
  logLevel: "info",
});
