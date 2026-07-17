import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CommonAilments } from "../CommonAilments";

describe("CommonAilments", () => {
  it("renders without crashing when searchParams is undefined", () => {
    render(<CommonAilments />);

    expect(screen.getByText("Common Tree Problems")).toBeInTheDocument();
  });

  it("renders without crashing when searchParams contains non-string values (Record<string, unknown> regression)", () => {
    render(
      <CommonAilments
        searchParams={{
          count: 42,
          tags: ["eab", "oak-wilt"],
          nested: { foo: "bar" },
        }}
      />,
    );

    expect(screen.getByText("Common Tree Problems")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /all problems/i })).toBeInTheDocument();
  });
});