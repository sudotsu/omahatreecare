# Operations & Project Integrity SOP (Standard Operating Procedure)

This document mandates the workflow for all tasks in this project. Adherence ensures high-quality, consistent,
and trust-first results.

## The Core Lifecycle: "Search -> Architect -> Propagate"

### 1. External Research & Modern Standards
- **Never guess on UI/UX or "best practices."**
- Before implementing features, run a targeted `google_web_search` for current-year research or the latest available guidance on trends, psychological triggers (e.g., Labor Illusion), and high-conversion patterns.
- Contrast internal project context with external modern standards to avoid "building yesterday's web."

### 2. Architectural Integrity vs. Surface Fixes
- **Root-Cause Solving:** If a component has a bug or needs a new feature, do not apply a local hack or inline
  override.
- **Component Evolution:** Modify the underlying component (in src/components/ui/) to support the new case
  elegantly (e.g., adding labelInset rather than hardcoding margins). This makes the entire codebase stronger.

### 3. Site-Wide Consistency (Proactive Discovery)
- **Concept Over File:** When modifying a "global concept" (like "The Contact Form" or "The Hero Section"), use
  grep_search to find every instance of that concept across the entire site.
- **Synchronized Updates:** Do not wait for a directive to fix related files. Proactively propose (or execute if
  safe) a synchronized update to ensure a unified brand/user experience.

### 4. Philosophical Alignment (Value-First UX)
- **Trust-First Design:** Prioritize building trust before data collection.
- **Voluntary Information:** Defer requirements (like "Property Address") where possible. We owe the user proof
  of authority and value *before* they owe us their data.
- **Micro-copy Harmony:** All UI text must reflect this trust-first approach (e.g., "Address is helpful but
  optional" rather than "Required").

### 5. Versioned Retirement (The Deprecated Folder)
- **Archive by Version:** Move retired versions of core files to /deprecated/ and rename them (e.g.,
  ContactForm.v1.tsx).
- **Proof of Improvement:** We keep "entire change versions" (v1, v2, v3) for comparison and proof of growth.
- **Maintenance:** Follow the /deprecated/CLEANUP_POLICY.md for periodic pruning.

---

*This SOP is an "Active Directive." If a task can be done "faster" by ignoring this SOP, but "better" by
following it—always choose better.
