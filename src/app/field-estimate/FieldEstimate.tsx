"use client";

import {
  Download,
  Eye,
  FileText,
  Plus,
  RotateCcw,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import styles from "./field-estimate.module.css";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  amount: string;
};

type Estimate = {
  estimateNumber: string;
  issued: string;
  validDays: string;
  customerName: string;
  serviceAddress: string;
  intro: string;
  services: ServiceItem[];
  customerNote: string;
};

const STORAGE_KEY = "midwest-roots-field-estimate-v1";

function dateInputValue(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function defaultEstimate(): Estimate {
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

  return {
    estimateNumber: `MR-${stamp}`,
    issued: dateInputValue(now),
    validDays: "30",
    customerName: "",
    serviceAddress: "",
    intro:
      "Thanks for having us out. Based on our walkthrough, here’s the work we recommend to address the tree concerns we discussed and leave the property clean.",
    services: [
      {
        id: crypto.randomUUID(),
        title: "Tree removal",
        description: "Safely dismantle and remove the designated tree; protect nearby property; haul away wood and debris; complete final ground cleanup.",
        amount: "0",
      },
    ],
    customerNote: "thanks again! text me if anything comes up\n— andrew",
  };
}

function money(value: string) {
  const amount = Number.parseFloat(value.replace(/[^0-9.-]/g, "")) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function displayDate(value: string) {
  if (!value) return "Date not set";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function safeFileName(value: string) {
  const name = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `midwest-roots-estimate-${name || "draft"}`;
}

function markdownFor(estimate: Estimate, total: number) {
  const work = estimate.services
    .map(
      (item, index) =>
        `### ${index + 1}. ${item.title || "Service"} — ${money(item.amount)}\n\n${item.description || "No description provided."}`,
    )
    .join("\n\n");

  return `# Midwest Roots Tree Services\n\n## Tree Service Estimate\n\n**Prepared for:** ${estimate.customerName || "Customer"}  \n**Service address:** ${estimate.serviceAddress || "Not provided"}  \n**Estimate:** ${estimate.estimateNumber}  \n**Issued:** ${displayDate(estimate.issued)}  \n**Valid for:** ${estimate.validDays || "30"} days\n\n${estimate.intro}\n\n## Recommended work\n\n${work}\n\n## Estimated total: ${money(String(total))}\n\n### A few important details\n\n- Pricing assumes normal access for our crew and equipment.\n- Normal job-site cleanup and listed debris removal are included.\n- Customer identifies private irrigation, lighting, and invisible fencing.\n- Any change in scope will be discussed and approved before the price changes.\n- Scheduling is weather-dependent; payment is due upon completion.\n\n> ${estimate.customerNote.replace(/\n/g, "  \n> ")}\n\nMidwest Roots Tree Services  \n(402) 812-3294 · andrew@omahatreecare.com  \nhttps://omahatreecare.com\n`;
}

function loadEstimate() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Estimate) : defaultEstimate();
  } catch {
    return defaultEstimate();
  }
}

const subscribeToHydration = () => () => undefined;

export function FieldEstimate() {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  return hydrated ? <FieldEstimateEditor /> : <div className={styles.loading}>Opening your saved estimate…</div>;
}

function FieldEstimateEditor() {
  const [estimate, setEstimate] = useState<Estimate>(loadEstimate);
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState("Draft saves on this device");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estimate));
      setStatus(`Saved locally at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [estimate]);

  const total = useMemo(
    () =>
      estimate.services.reduce(
        (sum, item) => sum + (Number.parseFloat(item.amount.replace(/[^0-9.-]/g, "")) || 0),
        0,
      ),
    [estimate],
  );

  function update<K extends keyof Estimate>(key: K, value: Estimate[K]) {
    setEstimate((current) => ({ ...current, [key]: value }));
  }

  function updateService(id: string, key: keyof Omit<ServiceItem, "id">, value: string) {
    update(
      "services",
      estimate.services.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  }

  function addService() {
    update("services", [
      ...estimate.services,
      { id: crypto.randomUUID(), title: "", description: "", amount: "0" },
    ]);
  }

  function removeService(id: string) {
    if (estimate.services.length === 1) return;
    update(
      "services",
      estimate.services.filter((item) => item.id !== id),
    );
  }

  async function shareEstimate() {
    const markdown = markdownFor(estimate, total);
    const file = new File([markdown], `${safeFileName(estimate.customerName)}.md`, {
      type: "text/markdown",
    });

    try {
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Midwest Roots estimate for ${estimate.customerName || "customer"}`,
          text: `Tree service estimate from Midwest Roots — ${money(String(total))}`,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `Midwest Roots estimate for ${estimate.customerName || "customer"}`,
          text: markdown,
        });
      } else {
        downloadMarkdown();
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Share didn’t open; use Download Markdown instead");
    }
  }

  function downloadMarkdown() {
    const blob = new Blob([markdownFor(estimate, total)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeFileName(estimate.customerName)}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function resetDraft() {
    if (!window.confirm("Clear this estimate and start a new one?")) return;
    const next = defaultEstimate();
    localStorage.removeItem(STORAGE_KEY);
    setEstimate(next);
    setStatus("New estimate started");
  }

  return (
    <div className={`field-estimate-app ${styles.app}`}>
      <header className={styles.appHeader}>
        <div>
          <span className={styles.appEyebrow}>Midwest Roots</span>
          <h1>Field estimate</h1>
          <p>{status}</p>
        </div>
        <button className={styles.iconButton} type="button" onClick={resetDraft} aria-label="Start a new estimate">
          <RotateCcw size={19} />
        </button>
      </header>

      <div className={styles.mobileActions}>
        <button type="button" className={styles.secondaryButton} onClick={() => setShowPreview(true)}>
          <Eye size={18} /> Preview
        </button>
        <button type="button" className={styles.primaryButton} onClick={shareEstimate}>
          <Share2 size={18} /> Share
        </button>
      </div>

      <div className={styles.workspace}>
        <section className={styles.editor} aria-label="Estimate fields">
          <div className={styles.formSection}>
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div><h2>Customer</h2><p>Who and where the work is for.</p></div>
            </div>
            <label>
              Customer name
              <input value={estimate.customerName} onChange={(event) => update("customerName", event.target.value)} placeholder="Jamie Thompson" autoComplete="name" />
            </label>
            <label>
              Service address
              <input value={estimate.serviceAddress} onChange={(event) => update("serviceAddress", event.target.value)} placeholder="123 Maple Street, Omaha, NE" autoComplete="street-address" />
            </label>
            <div className={styles.fieldGrid}>
              <label>
                Estimate #
                <input value={estimate.estimateNumber} onChange={(event) => update("estimateNumber", event.target.value)} />
              </label>
              <label>
                Date
                <input type="date" value={estimate.issued} onChange={(event) => update("issued", event.target.value)} />
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div><h2>Recommended work</h2><p>Tap any field and say it plainly.</p></div>
            </div>
            <label>
              Opening note
              <textarea rows={3} value={estimate.intro} onChange={(event) => update("intro", event.target.value)} />
            </label>

            <div className={styles.serviceList}>
              {estimate.services.map((item, index) => (
                <article className={styles.serviceEditor} key={item.id}>
                  <div className={styles.serviceEditorHeader}>
                    <strong>Service {index + 1}</strong>
                    <button type="button" onClick={() => removeService(item.id)} disabled={estimate.services.length === 1} aria-label={`Remove service ${index + 1}`}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <label>
                    Work
                    <input value={item.title} onChange={(event) => updateService(item.id, "title", event.target.value)} placeholder="Remove declining maple" />
                  </label>
                  <label>
                    What’s included
                    <textarea rows={3} value={item.description} onChange={(event) => updateService(item.id, "description", event.target.value)} placeholder="Removal, hauling, cleanup…" />
                  </label>
                  <label>
                    Price
                    <div className={styles.moneyInput}><span>$</span><input inputMode="decimal" value={item.amount} onChange={(event) => updateService(item.id, "amount", event.target.value)} aria-label={`Price for service ${index + 1}`} /></div>
                  </label>
                </article>
              ))}
            </div>
            <button type="button" className={styles.addButton} onClick={addService}><Plus size={18} /> Add another service</button>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionHeading}>
              <span>03</span>
              <div><h2>Your note</h2><p>Keep it personal. It won’t be corrected.</p></div>
            </div>
            <label>
              Sharpie note
              <textarea className={styles.markerInput} rows={4} value={estimate.customerNote} onChange={(event) => update("customerNote", event.target.value)} />
            </label>
          </div>

          <div className={styles.editorFooter}>
            <button type="button" className={styles.secondaryButton} onClick={downloadMarkdown}><Download size={18} /> Download Markdown</button>
            <button type="button" className={styles.secondaryButton} onClick={() => window.print()}><FileText size={18} /> Save PDF</button>
            <button type="button" className={styles.primaryButton} onClick={shareEstimate}><Share2 size={18} /> Share estimate</button>
          </div>
        </section>

        <EstimatePreview estimate={estimate} total={total} />
      </div>

      {showPreview && (
        <div className={styles.previewModal} role="dialog" aria-modal="true" aria-label="Estimate preview">
          <button className={styles.closePreview} type="button" onClick={() => setShowPreview(false)} aria-label="Close preview"><X size={21} /></button>
          <EstimatePreview estimate={estimate} total={total} mobile />
        </div>
      )}
    </div>
  );
}

function EstimatePreview({ estimate, total, mobile = false }: { estimate: Estimate; total: number; mobile?: boolean }) {
  return (
    <aside className={`${styles.previewPane} ${mobile ? styles.mobilePreviewPane : ""}`} aria-label="Customer estimate preview">
      <article className={styles.estimate}>
        <header className={styles.estimateHeader}>
          <div><strong>Midwest Roots</strong><span>Tree Services</span></div>
          <p><b>(402) 812-3294</b><br />andrew@omahatreecare.com<br />omahatreecare.com · Omaha, Nebraska</p>
        </header>
        <div className={styles.estimateBody}>
          <section className={styles.estimateIntro}>
            <div><span>Prepared with care</span><h2>Tree Service Estimate</h2><p>{estimate.intro}</p></div>
            <dl>
              <div><dt>Estimate</dt><dd>{estimate.estimateNumber}</dd></div>
              <div><dt>Issued</dt><dd>{displayDate(estimate.issued)}</dd></div>
              <div><dt>Valid for</dt><dd>{estimate.validDays || "30"} days</dd></div>
            </dl>
          </section>
          <section className={styles.customerSummary}>
            <div><span>Prepared for</span><strong>{estimate.customerName || "Customer name"}</strong></div>
            <div><span>Service address</span><strong>{estimate.serviceAddress || "Service address"}</strong></div>
          </section>
          <section className={styles.workPreview}>
            <h3>Recommended work</h3>
            {estimate.services.map((item, index) => (
              <div className={styles.previewLineItem} key={item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{item.title || "Service"}</strong><p>{item.description || "Service details"}</p></div>
                <b>{money(item.amount)}</b>
              </div>
            ))}
            <div className={styles.total}><span>Estimated total</span><strong>{money(String(total))}</strong></div>
          </section>
          <section className={styles.bottomDetails}>
            <div><h3>A few important details</h3><ul><li>Pricing assumes normal access for our crew and equipment.</li><li>Normal cleanup and listed debris removal are included.</li><li>Customer identifies private irrigation, lighting, and invisible fencing.</li><li>Changes in scope are approved before the price changes.</li><li>Scheduling is weather-dependent; payment is due upon completion.</li></ul></div>
            <div className={styles.approval}><span>Ready to move forward?</span><strong>Approve this estimate</strong><p>Reply “Approved” by text or email. We’ll follow up with available dates.</p><i>Client signature</i><i>Date</i></div>
          </section>
          <section className={styles.personalNote}>
            <p>{estimate.customerNote}</p>
            <div><span>check out the new site<br />omahatreecare.com</span><Image src="/images/omahatreecare-qr.png" width={55} height={55} alt="QR code for OmahaTreeCare.com" /></div>
          </section>
          <footer><span>Midwest Roots Tree Services · Omaha, NE</span><span>Clear recommendations. Thoughtful tree care.</span></footer>
        </div>
      </article>
    </aside>
  );
}
