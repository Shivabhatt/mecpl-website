import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
// runtime error overlay plugin caused a runtime 'removeChild' issue in dev overlay
// (disabled to avoid the overlay removing nodes incorrectly)
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "4173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

const publicRoutes = [
  "/about",
  "/projects",
  "/services",
  "/completed-projects",
  "/ongoing-projects",
  "/clients",
  "/equipment",
  "/awards",
  "/blog",
  "/blog/construction-industry-trends",
  "/blog/construction-site-material-storage",
  "/blog/cement-setting-time",
  "/investors",
  "/careers",
  "/contact",
];

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "generate-static-route-app-shells",
      writeBundle() {
        const outDir = path.resolve(import.meta.dirname, "dist/public");
        const index = path.join(outDir, "index.html");

        for (const route of publicRoutes) {
          const routePath = route.replace(/^\/+|\/+$/g, "");
          const routeDir = path.join(outDir, routePath);

          fs.mkdirSync(routeDir, { recursive: true });
          fs.copyFileSync(index, path.join(routeDir, "index.html"));
          fs.copyFileSync(index, path.join(outDir, `${routePath}.html`));
        }

        fs.copyFileSync(index, path.join(outDir, "404.html"));
      },
    },
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
