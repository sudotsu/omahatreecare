import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpeciesIdentifier } from "../SpeciesIdentifier";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("SpeciesIdentifier", () => {
  it("renders without crashing when searchParams is undefined", () => {
    render(<SpeciesIdentifier />);

    expect(screen.getByText("Tree Species Identifier")).toBeInTheDocument();
  });

  it("renders without crashing when searchParams contains non-string values (Record<string, unknown> regression)", () => {
    render(
      <SpeciesIdentifier
        searchParams={{
          matched: false,
          candidates: ["Ash Trees", "Bur Oak"],
        }}
      />,
    );

    expect(screen.getByText("Tree Species Identifier")).toBeInTheDocument();
    expect(screen.getByText("Ash Trees")).toBeInTheDocument();
  });
});