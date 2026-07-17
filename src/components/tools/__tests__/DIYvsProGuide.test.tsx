import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DIYvsProGuide } from "../DIYvsProGuide";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("DIYvsProGuide", () => {
  it("renders without crashing when searchParams is undefined", () => {
    render(<DIYvsProGuide />);

    expect(screen.getByText("DIY vs Professional Guide")).toBeInTheDocument();
  });

  it("renders without crashing when searchParams contains non-string values (Record<string, unknown> regression)", () => {
    render(
      <DIYvsProGuide
        searchParams={{
          urgent: true,
          scores: [1, 2, 3],
        }}
      />,
    );

    expect(screen.getByText("DIY vs Professional Guide")).toBeInTheDocument();
    expect(screen.getByText("Safe for DIY")).toBeInTheDocument();
    expect(screen.getByText("Professional Only — Do Not Attempt")).toBeInTheDocument();
  });
});