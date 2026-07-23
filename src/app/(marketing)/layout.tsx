import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";

// Marketing route group: the public-facing pages that share the global site
// navigation and footer. Tool routes (src/app/tools) and the standalone
// field-estimate route own their own shells and are intentionally kept out of
// this group so exactly one shell renders per route family (ARCH-001).
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navigation />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
