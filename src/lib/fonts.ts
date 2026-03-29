import { DM_Serif_Display } from "next/font/google";

/**
 * Shared DM Serif Display instance — import this wherever the display font is
 * needed instead of calling DM_Serif_Display() again. Next.js deduplicates
 * font loading by URL + options; a single module-level call makes that
 * explicit and avoids lint warnings about duplicate instantiation.
 */
export const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
