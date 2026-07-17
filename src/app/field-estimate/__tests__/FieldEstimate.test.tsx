import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FieldEstimate } from "../FieldEstimate";

const STORAGE_KEY = "midwest-roots-field-estimate-v1";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} alt={props.alt as string} />;
  },
}));

function mockObjectUrls() {
  const createObjectURL = vi.fn(() => "blob:mock-url");
  const revokeObjectURL = vi.fn();
  Object.defineProperty(URL, "createObjectURL", { value: createObjectURL, writable: true, configurable: true });
  Object.defineProperty(URL, "revokeObjectURL", { value: revokeObjectURL, writable: true, configurable: true });
  return { createObjectURL, revokeObjectURL };
}

describe("FieldEstimate", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders the editor immediately (hydrated) with default estimate data", () => {
    render(<FieldEstimate />);

    expect(screen.getByRole("heading", { name: "Field estimate" })).toBeInTheDocument();
    expect(screen.getByDisplayValue("Tree removal")).toBeInTheDocument();
    // Default single service, price 0, formatted as currency in the preview total.
    expect(screen.getByText("$0")).toBeInTheDocument();
  });

  it("does not show the loading fallback text on a normal client render", () => {
    render(<FieldEstimate />);
    expect(screen.queryByText("Opening your saved estimate…")).not.toBeInTheDocument();
  });

  it("loads a previously saved estimate from localStorage", () => {
    const saved = {
      estimateNumber: "MR-CUSTOM-1",
      issued: "2026-01-15",
      validDays: "45",
      customerName: "Jamie Thompson",
      serviceAddress: "123 Maple Street",
      intro: "Custom intro text",
      services: [
        { id: "svc-1", title: "Stump grinding", description: "Grind the stump", amount: "325" },
      ],
      customerNote: "thanks!",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

    render(<FieldEstimate />);

    expect(screen.getByDisplayValue("Jamie Thompson")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Maple Street")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Stump grinding")).toBeInTheDocument();
    expect(screen.getByDisplayValue("MR-CUSTOM-1")).toBeInTheDocument();
  });

  it("falls back to the default estimate when localStorage contains invalid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{not-valid-json");

    render(<FieldEstimate />);

    expect(screen.getByDisplayValue("Tree removal")).toBeInTheDocument();
  });

  it("persists edits to localStorage after the debounce delay", async () => {
    render(<FieldEstimate />);

    const nameInput = screen.getByPlaceholderText("Jamie Thompson");
    fireEvent.change(nameInput, { target: { value: "Andrew Client" } });

    await waitFor(
      () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        expect(stored).not.toBeNull();
        expect(JSON.parse(stored as string).customerName).toBe("Andrew Client");
      },
      { timeout: 1000 },
    );
  });

  it("adds a new blank service when 'Add another service' is clicked", async () => {
    const user = userEvent.setup();
    render(<FieldEstimate />);

    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.queryByText("Service 2")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add another service/i }));

    expect(screen.getByText("Service 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Remove service 2")).toBeInTheDocument();
  });

  it("disables the remove button when only one service remains", () => {
    render(<FieldEstimate />);
    expect(screen.getByLabelText("Remove service 1")).toBeDisabled();
  });

  it("removes a service when there are multiple and remove is clicked", async () => {
    const user = userEvent.setup();
    render(<FieldEstimate />);

    await user.click(screen.getByRole("button", { name: /add another service/i }));
    expect(screen.getByText("Service 2")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Remove service 2"));

    expect(screen.queryByText("Service 2")).not.toBeInTheDocument();
    expect(screen.getByText("Service 1")).toBeInTheDocument();
  });

  it("updates the estimated total in the preview when a price changes", () => {
    render(<FieldEstimate />);

    const priceInput = screen.getByLabelText("Price for service 1");
    fireEvent.change(priceInput, { target: { value: "1500" } });

    expect(screen.getByText("$1,500")).toBeInTheDocument();
  });

  it("sums multiple service prices into the total", async () => {
    const user = userEvent.setup();
    render(<FieldEstimate />);

    fireEvent.change(screen.getByLabelText("Price for service 1"), { target: { value: "1000" } });

    await user.click(screen.getByRole("button", { name: /add another service/i }));
    fireEvent.change(screen.getByLabelText("Price for service 2"), { target: { value: "250" } });

    expect(screen.getByText("$1,250")).toBeInTheDocument();
  });

  it("resets the draft when confirmed via window.confirm", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<FieldEstimate />);

    fireEvent.change(screen.getByPlaceholderText("Jamie Thompson"), { target: { value: "Some Customer" } });
    expect(screen.getByDisplayValue("Some Customer")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Start a new estimate" }));

    expect(window.confirm).toHaveBeenCalledWith("Clear this estimate and start a new one?");
    expect(screen.queryByDisplayValue("Some Customer")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("Tree removal")).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("keeps the draft when window.confirm is declined", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<FieldEstimate />);

    fireEvent.change(screen.getByPlaceholderText("Jamie Thompson"), { target: { value: "Keep Me" } });
    await user.click(screen.getByRole("button", { name: "Start a new estimate" }));

    expect(screen.getByDisplayValue("Keep Me")).toBeInTheDocument();
  });

  it("opens and closes the mobile preview modal", async () => {
    const user = userEvent.setup();
    render(<FieldEstimate />);

    expect(screen.queryByRole("dialog", { name: "Estimate preview" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /preview/i }));
    expect(screen.getByRole("dialog", { name: "Estimate preview" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close preview" }));
    expect(screen.queryByRole("dialog", { name: "Estimate preview" })).not.toBeInTheDocument();
  });

  it("downloads a markdown file when 'Download Markdown' is clicked", async () => {
    const user = userEvent.setup();
    const { createObjectURL, revokeObjectURL } = mockObjectUrls();
    const clickSpy = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === "a") {
        el.click = clickSpy;
      }
      return el;
    });

    render(<FieldEstimate />);
    fireEvent.change(screen.getByPlaceholderText("Jamie Thompson"), { target: { value: "Jane Doe" } });

    await user.click(screen.getByRole("button", { name: /download markdown/i }));

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
  });

  it("shares via navigator.share with a file when supported", async () => {
    const user = userEvent.setup();
    const shareMock = vi.fn().mockResolvedValue(undefined);
    const canShareMock = vi.fn().mockReturnValue(true);
    Object.defineProperty(navigator, "share", { value: shareMock, configurable: true });
    Object.defineProperty(navigator, "canShare", { value: canShareMock, configurable: true });

    render(<FieldEstimate />);
    fireEvent.change(screen.getByPlaceholderText("Jamie Thompson"), { target: { value: "Share Test" } });

    await user.click(screen.getByRole("button", { name: /share estimate/i }));

    await waitFor(() => expect(shareMock).toHaveBeenCalled());
    const callArg = shareMock.mock.calls[0][0];
    expect(callArg.files).toHaveLength(1);
    expect(callArg.files[0].name).toContain("share-test");
  });

  it("falls back to text share when files aren't shareable", async () => {
    const user = userEvent.setup();
    const shareMock = vi.fn().mockResolvedValue(undefined);
    const canShareMock = vi.fn().mockReturnValue(false);
    Object.defineProperty(navigator, "share", { value: shareMock, configurable: true });
    Object.defineProperty(navigator, "canShare", { value: canShareMock, configurable: true });

    render(<FieldEstimate />);
    await user.click(screen.getByRole("button", { name: /share estimate/i }));

    await waitFor(() => expect(shareMock).toHaveBeenCalled());
    const callArg = shareMock.mock.calls[0][0];
    expect(callArg.files).toBeUndefined();
    expect(callArg.text).toContain("Midwest Roots Tree Services");
  });

  it("falls back to downloading markdown when navigator.share is unavailable", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "share", { value: undefined, configurable: true });
    const { createObjectURL } = mockObjectUrls();
    const clickSpy = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === "a") el.click = clickSpy;
      return el;
    });

    render(<FieldEstimate />);
    await user.click(screen.getByRole("button", { name: /share estimate/i }));

    await waitFor(() => expect(createObjectURL).toHaveBeenCalled());
    expect(clickSpy).toHaveBeenCalled();
  });

  it("silently ignores an AbortError from navigator.share", async () => {
    const user = userEvent.setup();
    const abortError = new DOMException("cancelled", "AbortError");
    const shareMock = vi.fn().mockRejectedValue(abortError);
    Object.defineProperty(navigator, "share", { value: shareMock, configurable: true });
    Object.defineProperty(navigator, "canShare", { value: vi.fn().mockReturnValue(true), configurable: true });

    render(<FieldEstimate />);
    await user.click(screen.getByRole("button", { name: /share estimate/i }));

    await waitFor(() => expect(shareMock).toHaveBeenCalled());
    expect(screen.queryByText(/Share didn’t open/i)).not.toBeInTheDocument();
  });

  it("shows an error status when sharing fails for a non-abort reason", async () => {
    const user = userEvent.setup();
    const shareMock = vi.fn().mockRejectedValue(new Error("boom"));
    Object.defineProperty(navigator, "share", { value: shareMock, configurable: true });
    Object.defineProperty(navigator, "canShare", { value: vi.fn().mockReturnValue(true), configurable: true });

    render(<FieldEstimate />);
    await user.click(screen.getByRole("button", { name: /share estimate/i }));

    await waitFor(() =>
      expect(screen.getByText(/Share didn’t open; use Download Markdown instead/i)).toBeInTheDocument(),
    );
  });

  it("renders the customer note and service line items in the preview pane", () => {
    render(<FieldEstimate />);
    const previews = screen.getAllByLabelText("Customer estimate preview");
    expect(within(previews[0]).getByText(/text me if anything comes up/)).toBeInTheDocument();
    expect(within(previews[0]).getByText("Tree removal")).toBeInTheDocument();
  });
});