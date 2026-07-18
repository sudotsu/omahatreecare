import { describe, expect, it } from "vitest";
import { getRiskLevel } from "./hazard-criteria";

describe("hazard score characterization", () => {
  it.each([[1, "Low"], [3, "Moderate"], [6, "High"], [12, "Extreme"], [16, "Extreme"]])("maps %i to %s", (score, expected) => {
    expect(getRiskLevel(score).level).toBe(expected);
  });
});
