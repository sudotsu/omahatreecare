import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("@emailjs/browser", () => ({
  default: {
    send: (...args: unknown[]) => sendMock(...args),
  },
}));

type MultiStepContactFormProps = {
  initialValues?: Record<string, string>;
  trackingData?: Record<string, string>;
};

async function loadComponent(env: {
  service?: string;
  template?: string;
  publicKey?: string;
} = {}) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", env.service ?? "");
  vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", env.template ?? "");
  vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", env.publicKey ?? "");
  const mod = await import("../MultiStepContactForm");
  return mod.MultiStepContactForm as ComponentType<MultiStepContactFormProps>;
}

const CONFIGURED_ENV = { service: "service_123", template: "template_456", publicKey: "public_789" };

async function goToStep2(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /removal/i }));
  await waitFor(() => expect(screen.getByText("Step 2 of 3")).toBeInTheDocument(), { timeout: 2000 });
}

async function goToStep3(user: ReturnType<typeof userEvent.setup>) {
  await goToStep2(user);
  await user.click(screen.getByRole("button", { name: /continue/i }));
  await waitFor(() => expect(screen.getByText("Step 3 of 3")).toBeInTheDocument());
}

async function fillContactFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Your Name"), "Jane Doe");
  await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
  await user.type(screen.getByLabelText("Phone Number"), "(402) 555-1234");
}

describe("MultiStepContactForm", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders step 1 with the standard service options", async () => {
    const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
    render(<MultiStepContactForm />);

    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /removal/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pruning/i })).toBeInTheDocument();
  });

  it(
    "advances to step 2 after selecting a service",
    async () => {
      const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
      const user = userEvent.setup();
      render(<MultiStepContactForm />);

      await goToStep2(user);
      expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
    },
    10000,
  );

  it(
    "injects a dynamic service tile when initialValues.service_type isn't in the standard list",
    async () => {
      const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
      render(<MultiStepContactForm initialValues={{ service_type: "Cabling & Bracing" }} />);

      expect(screen.getByText("Cabling & Bracing")).toBeInTheDocument();
    },
    10000,
  );

  it("does not inject a dynamic tile when initialValues.service_type matches a standard option", async () => {
    const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
    render(<MultiStepContactForm initialValues={{ service_type: "Tree Removal" }} />);

    // Only the standard "Removal" tile should exist, no duplicate custom tile with the raw id text.
    expect(screen.queryByText("Tree Removal")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /removal/i })).toBeInTheDocument();
  });

  it(
    "pre-fills step 2 fields from initialValues",
    async () => {
      const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
      const user = userEvent.setup();
      render(<MultiStepContactForm initialValues={{ address: "456 Oak Ave" }} />);

      await goToStep2(user);
      expect(screen.getByDisplayValue("456 Oak Ave")).toBeInTheDocument();
    },
    10000,
  );

  it(
    "shows a config_error status listing missing EmailJS env vars instead of calling emailjs.send",
    async () => {
      const MultiStepContactForm = await loadComponent({});
      const user = userEvent.setup();
      render(<MultiStepContactForm />);

      await goToStep3(user);
      await fillContactFields(user);
      await user.click(screen.getByRole("button", { name: /request my estimate/i }));

      await waitFor(() =>
        expect(screen.getByText(/Missing EmailJS configuration/i)).toBeInTheDocument(),
      );
      expect(screen.getByText("NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.", { exact: false })).toBeInTheDocument();
      expect(sendMock).not.toHaveBeenCalled();
    },
    10000,
  );

  it(
    "reports only the specific missing keys when EmailJS config is partially set",
    async () => {
      const MultiStepContactForm = await loadComponent({ service: "service_123" });
      const user = userEvent.setup();
      render(<MultiStepContactForm />);

      await goToStep3(user);
      await fillContactFields(user);
      await user.click(screen.getByRole("button", { name: /request my estimate/i }));

      await waitFor(() =>
        expect(
          screen.getByText("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.", { exact: false }),
        ).toBeInTheDocument(),
      );
    },
    10000,
  );

  it(
    "submits tracking data and form fields to emailjs.send when config is present",
    async () => {
      const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
      const user = userEvent.setup();
      render(
        <MultiStepContactForm
          trackingData={{
            source: "hazard_assessment",
            city: "Omaha",
            neighborhood: "Dundee",
            risk: "High",
            score: "12",
            task: "urgent_assessment",
            archetype: "technical",
            species: "Silver Maple",
          }}
        />,
      );

      await goToStep3(user);
      await fillContactFields(user);
      await user.click(screen.getByRole("button", { name: /request my estimate/i }));

      await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));

      const [serviceId, templateId, payload, publicKey] = sendMock.mock.calls[0];
      expect(serviceId).toBe("service_123");
      expect(templateId).toBe("template_456");
      expect(publicKey).toBe("public_789");
      expect(payload).toMatchObject({
        user_name: "Jane Doe",
        user_email: "jane@example.com",
        user_phone: "4025551234",
        service_type: "Tree Removal",
        message: "No description provided",
        address: "Not provided",
        city: "Omaha",
        neighborhood: "Dundee",
        source: "hazard_assessment",
        risk_level: "High",
        risk_score: "12",
        task_name: "urgent_assessment",
        archetype: "technical",
        species: "Silver Maple",
      });
    },
    10000,
  );

  it(
    "falls back to default tracking values when trackingData is omitted",
    async () => {
      const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
      const user = userEvent.setup();
      render(<MultiStepContactForm />);

      await goToStep3(user);
      await fillContactFields(user);
      await user.click(screen.getByRole("button", { name: /request my estimate/i }));

      await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
      const [, , payload] = sendMock.mock.calls[0];
      expect(payload).toMatchObject({
        city: "Not specified",
        neighborhood: "Not specified",
        source: "Website Contact Form",
        risk_level: "Not assessed",
        risk_score: "N/A",
        task_name: "Not specified",
        archetype: "None",
        species: "None",
      });
    },
    10000,
  );

  it(
    "shows a success message after a successful submission and allows starting another request",
    async () => {
      sendMock.mockResolvedValueOnce(undefined);
      const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
      const user = userEvent.setup();
      render(<MultiStepContactForm />);

      await goToStep3(user);
      await fillContactFields(user);
      await user.click(screen.getByRole("button", { name: /request my estimate/i }));

      await waitFor(() => expect(screen.getByText("Estimate Request Sent")).toBeInTheDocument());

      await user.click(screen.getByRole("button", { name: /send another request/i }));
      expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    },
    10000,
  );

  it(
    "shows a generic error status when emailjs.send rejects",
    async () => {
      sendMock.mockRejectedValueOnce(new Error("network failure"));
      const MultiStepContactForm = await loadComponent(CONFIGURED_ENV);
      const user = userEvent.setup();
      render(<MultiStepContactForm />);

      await goToStep3(user);
      await fillContactFields(user);
      await user.click(screen.getByRole("button", { name: /request my estimate/i }));

      await waitFor(() => expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument());
    },
    10000,
  );
});