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
    command: "LEAD_STORE_DIR=/tmp/omahatreecare-e2e-leads npm run start -- -p 3200",
    url: "http://127.0.0.1:3200",
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
