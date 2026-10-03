import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { awards, categories } from "./src/data/awardsData";
// runtime error overlay plugin caused a runtime 'removeChild' issue in dev overlay
// (disabled to avoid the overlay removing nodes incorrectly)
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "4173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

// Render the actual archive in HTML as well, so the awards route is useful
// without JavaScript. React enhances the same data into the interactive wall.
const escapeHtml = (value: string | number) => String(value).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const awardsFallback = `<noscript><style>
  #root{display:none}.awards-nojs{font-family:Montserrat,Arial,sans-serif;background:#fff;color:#25292b;padding:48px max(24px,calc((100vw - 960px)/2));min-height:100vh}
  .awards-nojs a{color:#25292b}.awards-nojs h1{font-weight:400}.awards-nojs h2{font-weight:400;color:#25292b;margin-top:40px}
  .awards-nojs ul{padding:0;list-style:none}.awards-nojs li{padding:14px 0;border-bottom:1px solid #25292b30;line-height:1.6}.awards-nojs small{display:block;color:#6e7174}
  @media print{.awards-nojs{background:white;color:black}.awards-nojs h2,.awards-nojs small{color:black}}
</style><main class="awards-nojs"><a href="${basePath}">MECPL — Home</a><h1>The record · A wall of the work.</h1><p>All ${awards.length} recognitions, by category.</p>
${categories.map((c) => `<section aria-labelledby="nojs-${c.key}"><h2 id="nojs-${c.key}">${escapeHtml(c.label)} · ${awards.filter((a) => a.category === c.key).length}</h2><ul>${awards.filter((a) => a.category === c.key).map((a) => `<li id="${escapeHtml(a.id)}"><strong>${a.year}</strong> · ${escapeHtml(a.title)}<small>${[a.project, a.note, a.issuer].filter(Boolean).map((s) => escapeHtml(s!)).join(" · ")}</small></li>`).join("")}</ul></section>`).join("")}
</main></noscript>`;
const withAwardsFallback = (html: string) => html.replace("</body>", `${awardsFallback}</body>`);

const publicRoutes = [
  "/about",
  "/projects",
  "/services",
  "/completed-projects",
  "/ongoing-projects",
  "/clients",
  "/equipment",
  "/certifications",
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
      transformIndexHtml(html, context) {
        const requestPath = (context.originalUrl ?? context.path).split("?")[0];
        return /\/awards(?:\/|\.html)?$/.test(requestPath) ? withAwardsFallback(html) : html;
      },
      writeBundle() {
        const outDir = path.resolve(import.meta.dirname, "dist/public");
        const index = path.join(outDir, "index.html");

        for (const route of publicRoutes) {
          const routePath = route.replace(/^\/+|\/+$/g, "");
          const routeDir = path.join(outDir, routePath);

          fs.mkdirSync(routeDir, { recursive: true });
          const shell = fs.readFileSync(index, "utf8");
          const routeShell = route === "/awards" ? withAwardsFallback(shell) : shell;
          fs.writeFileSync(path.join(routeDir, "index.html"), routeShell);
          fs.writeFileSync(path.join(outDir, `${routePath}.html`), routeShell);
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
