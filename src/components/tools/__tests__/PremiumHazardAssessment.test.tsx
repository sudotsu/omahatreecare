import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PremiumHazardAssessment } from "../PremiumHazardAssessment";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// next/font/google requires the Next.js compiler; stub it out for plain Vitest runs.
vi.mock("@/lib/fonts", () => ({
  dmSerif: { className: "mock-dm-serif" },
}));

/** Answers all four questions with the lowest-risk option, waiting out the
 * "labor illusion" delay between each step, and lands on the results view. */
async function completeQuiz(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByText("Stable & Healthy"));
  await waitFor(() => expect(screen.getByText("Canopy Integrity")).toBeInTheDocument(), { timeout: 2000 });

  await user.click(screen.getByText("Strong Structure"));
  await waitFor(() => expect(screen.getByText("Tree Vitality")).toBeInTheDocument(), { timeout: 2000 });

  await user.click(screen.getByText("Vibrant & Full"));
  await waitFor(() => expect(screen.getByText("Target Value")).toBeInTheDocument(), { timeout: 2000 });

  await user.click(screen.getByText("Remote Area"));
  await waitFor(() => expect(screen.getByText(/Risk$/)).toBeInTheDocument(), { timeout: 3000 });
}

describe("PremiumHazardAssessment", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the first question by default", () => {
    render(<PremiumHazardAssessment />);

    expect(screen.getByText("Trunk & Roots")).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 4")).toBeInTheDocument();
  });

  it(
    "shows a transient analyzing overlay between steps and a finalizing message on the last step",
    async () => {
      const user = userEvent.setup();
      render(<PremiumHazardAssessment />);

      await user.click(screen.getByText("Stable & Healthy"));
      expect(screen.getByText("Processing response...")).toBeInTheDocument();
      await waitFor(() => expect(screen.getByText("Canopy Integrity")).toBeInTheDocument(), { timeout: 2000 });

      await user.click(screen.getByText("Strong Structure"));
      await waitFor(() => expect(screen.getByText("Tree Vitality")).toBeInTheDocument(), { timeout: 2000 });

      await user.click(screen.getByText("Vibrant & Full"));
      await waitFor(() => expect(screen.getByText("Target Value")).toBeInTheDocument(), { timeout: 2000 });

      await user.click(screen.getByText("Remote Area"));
      expect(screen.getByText("Finalizing Report...")).toBeInTheDocument();
      await waitFor(() => expect(screen.getByText(/Risk$/)).toBeInTheDocument(), { timeout: 3000 });
    },
    10000,
  );

  it(
    "passes a species from a string searchParams.species value through to the final CTA",
    async () => {
      const user = userEvent.setup();
      render(<PremiumHazardAssessment searchParams={{ species: "Oak" }} />);

      await completeQuiz(user);
      await user.click(screen.getByRole("button", { name: /request professional walkthrough/i }));

      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock.mock.calls[0][0]).toContain("species=Oak");
    },
    10000,
  );

  it(
    "uses the first element when searchParams.species is an array",
    async () => {
      const user = userEvent.setup();
      render(<PremiumHazardAssessment searchParams={{ species: ["Maple", "Oak"] }} />);

      await completeQuiz(user);
      await user.click(screen.getByRole("button", { name: /request professional walkthrough/i }));

      expect(pushMock.mock.calls[0][0]).toContain("species=Maple");
    },
    10000,
  );

  it(
    "defaults to an empty species when searchParams.species is undefined",
    async () => {
      const user = userEvent.setup();
      render(<PremiumHazardAssessment />);

      await completeQuiz(user);
      await user.click(screen.getByRole("button", { name: /request professional walkthrough/i }));

      expect(pushMock.mock.calls[0][0]).toContain("species=&source=hazard_assessment");
    },
    10000,
  );

  it(
    "does not react to a later searchParams.species change after mount (regression: initial-only state, no sync effect)",
    async () => {
      const user = userEvent.setup();
      const { rerender } = render(<PremiumHazardAssessment searchParams={{ species: "Oak" }} />);

      rerender(<PremiumHazardAssessment searchParams={{ species: "Maple" }} />);

      await completeQuiz(user);
      await user.click(screen.getByRole("button", { name: /request professional walkthrough/i }));

      expect(pushMock.mock.calls[0][0]).toContain("species=Oak");
    },
    10000,
  );

  it(
    "lists identified issues in the results view when a non-baseline option is selected",
    async () => {
      const user = userEvent.setup();
      render(<PremiumHazardAssessment />);

      await user.click(screen.getByText("Minor Irregularity"));
      await waitFor(() => expect(screen.getByText("Canopy Integrity")).toBeInTheDocument(), { timeout: 2000 });
      await user.click(screen.getByText("Strong Structure"));
      await waitFor(() => expect(screen.getByText("Tree Vitality")).toBeInTheDocument(), { timeout: 2000 });
      await user.click(screen.getByText("Vibrant & Full"));
      await waitFor(() => expect(screen.getByText("Target Value")).toBeInTheDocument(), { timeout: 2000 });
      await user.click(screen.getByText("Remote Area"));

      await waitFor(() => expect(screen.getByText("Specific Factors Identified")).toBeInTheDocument(), { timeout: 3000 });
      expect(screen.getByText("Minor structural defects")).toBeInTheDocument();
    },
    10000,
  );

  it(
    "resets back to the first question when Start New Assessment is clicked",
    async () => {
      const user = userEvent.setup();
      render(<PremiumHazardAssessment />);

      await completeQuiz(user);
      await user.click(screen.getByRole("button", { name: /start new assessment/i }));

      expect(screen.getByText("Trunk & Roots")).toBeInTheDocument();
      expect(screen.getByText("Step 1 of 4")).toBeInTheDocument();
    },
    10000,
  );
});