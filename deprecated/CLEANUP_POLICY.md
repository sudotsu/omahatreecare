# Deprecated & Retired Files Policy

This directory houses previous versions of core components and logic. We keep "entire change versions" (v1, v2, v3, etc.) for comparison and proof of improvement, rather than every minor commit.

## Cleanup Instructions for AI & Developers

**If you encounter a file in this folder, evaluate it against the following criteria:**

1.  **Time Elapsed:** Has it been more than 6 months since the file was moved here?
2.  **References:** Is the file completely unreferenced in the current codebase?
3.  **Utility:** Do we have a more stable, archived backup of this version elsewhere?
4.  **Value:** Has the "new" version proven its superiority and stability in production?

**Action:** If all the above are true, the file can be safely discarded to keep the codebase lean.

---

## Archive Log

| File | Original Path | Retired On | Reason | Status |
| :--- | :--- | :--- | :--- | :--- |
| ContactForm.v1.tsx | src/components/forms/ContactForm.tsx | 2026-04-02 | Replaced by MultiStepContactForm (v2) | Discarded 2026-07-23 (CLEAN-001) before the six-month minimum retention period under an owner-approved exception; unreferenced and superseded |
