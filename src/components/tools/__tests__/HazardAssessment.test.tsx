import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HazardAssessment } from "../HazardAssessment";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

/**
 * Answers all four assessment questions with the first (lowest-risk) option,
 * which drives the component into its completed/results view without
 * triggering the gtag-tracked CTA branches (risk score stays below 3).
 */
async function completeQuizWithLowRisk(user: ReturnType<typeof userEvent.setup>) {
  for (let i = 0; i < 4; i++) {
    const options = screen.getAllByRole("button").filter((btn) =>
      btn.textContent?.includes("no visible defects") ||
      btn.textContent?.includes("strong and well-attached") ||
      btn.textContent?.includes("Full, healthy canopy") ||
      btn.textContent?.includes("Remote area, no structures"),
    );
    await user.click(options[0]);
  }
}

async function openShareMenu(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /share results/i }));
}

describe("HazardAssessment", () => {
  beforeEach(() => {
    pushMock.mockReset();
    vi.spyOn(window.location, "assign").mockImplementation(() => {});
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the first question and progress indicator", () => {
    render(<HazardAssessment />);

    expect(screen.getByText("Root & Trunk Condition")).toBeInTheDocument();
    expect(screen.getByText("1 of 4")).toBeInTheDocument();
  });

  it("advances through all questions to show the results screen", async () => {
    const user = userEvent.setup();
    render(<HazardAssessment />);

    await completeQuizWithLowRisk(user);

    expect(screen.getByText(/Risk$/)).toBeInTheDocument();
    expect(screen.getByText(/Risk Score:/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share results/i })).toBeInTheDocument();
  });

  it("uses window.location.assign with a mailto: URL when sharing via email", async () => {
    const user = userEvent.setup();
    render(<HazardAssessment />);

    await completeQuizWithLowRisk(user);
    await openShareMenu(user);
    await user.click(screen.getByRole("button", { name: /share via email/i }));

    expect(window.location.assign).toHaveBeenCalledTimes(1);
    const url = (window.location.assign as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url.startsWith("mailto:?subject=My%20Tree%20Risk%20Assessment%20Results&body=")).toBe(true);

    const body = decodeURIComponent(url.split("body=")[1]);
    expect(body).toContain("Risk Level: Low");
    expect(body).toContain("Risk Score: 1/16");
    expect(body).toContain("Get your free assessment at");
  });

  it("uses window.location.assign with an sms: URL when sharing via text", async () => {
    const user = userEvent.setup();
    render(<HazardAssessment />);

    await completeQuizWithLowRisk(user);
    await openShareMenu(user);
    await user.click(screen.getByRole("button", { name: /share via text/i }));

    expect(window.location.assign).toHaveBeenCalledTimes(1);
    const url = (window.location.assign as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url.startsWith("sms:?body=")).toBe(true);
  });

  it("includes identified issues in the shared message body", async () => {
    const user = userEvent.setup();
    render(<HazardAssessment />);

    // Answer the first question with an option that records an issue.
    await user.click(screen.getByText(/Minor issues like small cracks or minor lean/i));
    // Remaining questions: pick the lowest-risk option for each.
    await user.click(screen.getByText(/Branches appear strong and well-attached/i));
    await user.click(screen.getByText(/Full, healthy canopy with good color/i));
    await user.click(screen.getByText(/Remote area, no structures or people nearby/i));

    await openShareMenu(user);
    await user.click(screen.getByRole("button", { name: /share via email/i }));

    const url = (window.location.assign as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    const body = decodeURIComponent(url.split("body=")[1]);
    expect(body).toContain("Minor structural defects");
  });

  it("closes the share menu after selecting a share method", async () => {
    const user = userEvent.setup();
    render(<HazardAssessment />);

    await completeQuizWithLowRisk(user);
    await openShareMenu(user);
    await user.click(screen.getByRole("button", { name: /share via email/i }));

    expect(screen.queryByRole("button", { name: /share via email/i })).not.toBeInTheDocument();
  });

  it("copies results to the clipboard (not window.location.assign) when using the copy method", async () => {
    const user = userEvent.setup();
    render(<HazardAssessment />);

    await completeQuizWithLowRisk(user);
    await openShareMenu(user);
    await user.click(screen.getByRole("button", { name: /copy to clipboard/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(window.location.assign).not.toHaveBeenCalled();
  });
});