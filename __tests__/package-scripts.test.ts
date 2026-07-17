import { describe, expect, it } from "vitest";
import packageJson from "../package.json";

describe("package.json scripts", () => {
  it("builds and starts the dev server using the webpack bundler", () => {
    expect(packageJson.scripts.build).toBe("next build --webpack");
    expect(packageJson.scripts.dev).toBe("next dev --webpack");
  });

  it("lints the entire project with the flat eslint config", () => {
    expect(packageJson.scripts.lint).toBe("eslint .");
  });

  it("exposes a test script that runs vitest non-interactively", () => {
    expect(packageJson.scripts.test).toBe("vitest run");
  });
});