import { describe, expect, it } from "vitest";
import eslintConfig from "../eslint.config.mjs";

describe("eslint.config.mjs", () => {
  it("exports a non-empty flat config array combining Next.js configs and global ignores", () => {
    expect(Array.isArray(eslintConfig)).toBe(true);
    expect(eslintConfig.length).toBeGreaterThan(0);
  });

  it("ignores the generated service worker output (public/sw.js)", () => {
    const ignoreEntry = eslintConfig.find(
      (entry): entry is { ignores: string[] } =>
        Array.isArray((entry as { ignores?: unknown }).ignores),
    );

    expect(ignoreEntry).toBeDefined();
    expect(ignoreEntry?.ignores).toContain("public/sw.js");
  });

  it("ignores build output directories", () => {
    const ignoreEntry = eslintConfig.find(
      (entry): entry is { ignores: string[] } =>
        Array.isArray((entry as { ignores?: unknown }).ignores),
    );

    expect(ignoreEntry?.ignores).toEqual(
      expect.arrayContaining([".next/**", "out/**", "build/**"]),
    );
  });
});