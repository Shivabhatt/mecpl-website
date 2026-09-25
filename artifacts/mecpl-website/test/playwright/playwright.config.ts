import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

const systemChromiumPath = "/repl/tools/bin/chromium";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ??
  (existsSync(systemChromiumPath) ? systemChromiumPath : undefined);

export default defineConfig({
  testDir: ".",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    viewport: { width: 402, height: 874 },
    reducedMotion: "reduce",
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: {
    command: "pnpm run dev",
    url: "http://127.0.0.1:4173",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});