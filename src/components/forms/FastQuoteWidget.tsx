"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { serviceIds, servicesData } from "@/data/services";

export function FastQuoteWidget() {
  const [zip, setZip] = useState("");
  const [service, setService] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (zip) params.set("zip", zip);
    if (service) params.set("service", service);
    router.push(`/free-tree-assessment-omaha?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full rounded-2xl bg-[#060f07] p-7 shadow-2xl"
      style={{ border: "1px solid rgba(82,121,111,0.45)" }}
    >
      {/* Subtle inner glow at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(82,121,111,0.5),transparent)",
        }}
      />

      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#52796f]/20">
          <Zap className="h-4 w-4 text-[#52796f]" />
        </div>
        <span className="text-lg font-bold text-white">Fast Quote Request</span>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="fq-zip"
            className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#8ab5a8]"
          >
            ZIP Code
          </label>
          <input
            id="fq-zip"
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="e.g. 68104"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-lg bg-[#243d30] px-4 py-3 text-white placeholder:text-[#4d7566] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#52796f]"
            style={{ border: "1px solid rgba(82,121,111,0.28)" }}
          />
        </div>

        <div>
          <label
            htmlFor="fq-service"
            className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#8ab5a8]"
          >
            Service Needed
          </label>
          <select
            id="fq-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-lg bg-[#243d30] px-4 py-3 text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#52796f]"
            style={{ border: "1px solid rgba(82,121,111,0.28)" }}
          >
            <option value="" style={{ background: "#1a2820" }}>
              Select Service...
            </option>
            {serviceIds.map((id) => (
              <option key={id} value={id} style={{ background: "#1a2820" }}>
                {servicesData[id]?.title ?? id}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-[#52796f] py-3.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#406259] focus:outline-none focus:ring-2 focus:ring-[#52796f] focus:ring-offset-2 focus:ring-offset-[#1a2820]"
        >
          Next →
        </button>
      </div>
    </form>
  );
}
