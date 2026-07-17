import { describe, expect, it } from "vitest";
import fieldEstimateManifest from "../field-estimate-manifest.json";
import manifest from "../manifest.json";

describe("public/manifest.json", () => {
  it("includes a Field Estimate shortcut pointing at /field-estimate", () => {
    const shortcuts = manifest.shortcuts as Array<{ name: string; url: string; short_name: string }>;
    const fieldEstimateShortcut = shortcuts.find((s) => s.url === "/field-estimate");

    expect(fieldEstimateShortcut).toBeDefined();
    expect(fieldEstimateShortcut).toMatchObject({
      name: "Field Estimate",
      short_name: "Estimate",
      url: "/field-estimate",
    });
  });

  it("still includes the pre-existing Hazard Assessment and Species Identifier shortcuts", () => {
    const shortcuts = manifest.shortcuts as Array<{ url: string }>;
    const urls = shortcuts.map((s) => s.url);

    expect(urls).toContain("/tools/hazard");
    expect(urls).toContain("/tools/species");
  });

  it("has exactly one icon entry per shortcut", () => {
    const shortcuts = manifest.shortcuts as Array<{ icons: unknown[] }>;
    for (const shortcut of shortcuts) {
      expect(shortcut.icons.length).toBeGreaterThan(0);
    }
  });
});

describe("public/field-estimate-manifest.json", () => {
  it("is scoped to /field-estimate as its own standalone PWA start_url and id", () => {
    expect(fieldEstimateManifest.id).toBe("/field-estimate");
    expect(fieldEstimateManifest.start_url).toBe("/field-estimate");
    expect(fieldEstimateManifest.scope).toBe("/");
    expect(fieldEstimateManifest.display).toBe("standalone");
  });

  it("defines both maskable and any-purpose icons at 192 and 512 sizes", () => {
    const icons = fieldEstimateManifest.icons as Array<{ sizes: string; purpose: string }>;
    const sizes = icons.map((i) => i.sizes);
    const purposes = icons.map((i) => i.purpose);

    expect(sizes).toEqual(expect.arrayContaining(["192x192", "512x512"]));
    expect(purposes).toEqual(expect.arrayContaining(["any", "maskable"]));
  });

  it("declares a valid hex background_color and theme_color", () => {
    expect(fieldEstimateManifest.background_color).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(fieldEstimateManifest.theme_color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});