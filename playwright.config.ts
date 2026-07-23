import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:3200",
    trace: "retain-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
  },
  webServer: {
    command: "DATABASE_URL= LEAD_STORE_DIR= LEAD_STORAGE_ADAPTER= npm run start -- -p 3200",
    url: "http://127.0.0.1:3200",
    reuseExistingServer: false,
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    // Focused cross-engine smoke coverage (TEST-001). Only tests tagged @smoke
    // run here. These engines are installed in CI via `playwright install
    // --with-deps`; a local run without them will skip these projects.
    { name: "firefox", use: { browserName: "firefox" }, grep: /@smoke/ },
    { name: "webkit", use: { browserName: "webkit" }, grep: /@smoke/ },
  ],
});
