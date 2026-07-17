import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CostEstimator } from "../CostEstimator";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// next/font/google requires the Next.js compiler; stub it out for plain Vitest runs.
vi.mock("@/lib/fonts", () => ({
  dmSerif: { className: "mock-dm-serif" },
}));

describe("CostEstimator", () => {
  it("renders without crashing when searchParams is undefined", () => {
    render(<CostEstimator />);

    expect(screen.getByText("Estimate Your Project")).toBeInTheDocument();
  });

  it("renders without crashing when searchParams contains non-string values (Record<string, unknown> regression)", () => {
    render(
      <CostEstimator
        searchParams={{
          budget: 5000,
          zones: ["front", "back"],
          meta: { source: "ads" },
        }}
      />,
    );

    expect(screen.getByText("Estimate Your Project")).toBeInTheDocument();
    expect(screen.getByText("Residential Standard")).toBeInTheDocument();
  });
});