"use client";

import { DM_Serif_Display } from "next/font/google";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/constants";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const services = [
  { name: "Tree Removal",       slug: "tree-removal" },
  { name: "Tree Trimming",      slug: "tree-trimming" },
  { name: "Health Assessment",  slug: "tree-health-assessment" },
  { name: "Winter Tree Prep",   slug: "winter-tree-prep" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled]             = useState(false);
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Colors shift based on whether we're over the dark hero or a light section
  const onDark = !scrolled;
  const navBg       = scrolled ? "rgba(245,242,236,0.97)" : "rgba(10,20,11,0.45)";
  const brandColor  = onDark ? "#f0ede8" : "#1a2e1c";
  const subColor    = onDark ? "#FFB800" : "#52796f";
  const linkColor   = onDark ? "#a8d4c8" : "#52796f";
  const iconColor   = onDark ? "#f0ede8" : "#1a2e1c";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-md py-3" : "py-4"
      }`}
      style={{ backgroundColor: navBg, backdropFilter: "blur(8px)" }}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex flex-col gap-0.5">
          <span
            className={`${dmSerif.className} text-2xl leading-none tracking-tight transition-colors duration-300`}
            style={{ color: brandColor }}
          >
            Omaha Tree Care
          </span>
          <span
            className="text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300"
            style={{ color: subColor }}
          >
            Tools &amp; Resources
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 h-full">
          {/* Services Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className="font-semibold text-sm transition-colors flex items-center gap-1 h-full hover:opacity-75"
              style={{ color: linkColor }}
              aria-haspopup="menu"
              aria-expanded={isServicesOpen}
              onClick={() => setIsServicesOpen((v) => !v)}
            >
              Services
              <ChevronDown
                size={15}
                className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div
                  className="rounded-lg shadow-xl py-2"
                  style={{
                    backgroundColor: "#f5f2ec",
                    border: "1px solid rgba(82,121,111,0.3)",
                  }}
                >
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-[#52796f]/10"
                      style={{ color: "#1a2e1c" }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/tools"
            className="font-semibold text-sm transition-colors hover:opacity-75"
            style={{ color: linkColor }}
          >
            Free Tools
          </Link>

          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="rounded font-bold px-5 py-2.5 text-sm transition-all hover:-translate-y-0.5 hover:bg-white"
            style={{ backgroundColor: "#FFB800", color: "#11261B" }}
          >
            {CONTACT.phone}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          style={{ color: iconColor }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full shadow-xl p-6 flex flex-col space-y-4"
          style={{ backgroundColor: "#f5f2ec" }}
        >
          <div>
            <div className="font-bold text-xs uppercase tracking-widest mb-3 text-[#52796f]">
              Services
            </div>
            <div className="flex flex-col space-y-2 pl-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm font-medium text-[#1a2e1c] hover:text-[#52796f] transition-colors"
                  onClick={toggleMenu}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/tools"
            className="text-base font-semibold text-[#52796f]"
            onClick={toggleMenu}
          >
            Free Tools
          </Link>

          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="rounded py-3 text-center font-bold"
            onClick={toggleMenu}
            style={{ backgroundColor: "#FFB800", color: "#11261B" }}
          >
            {CONTACT.phone}
          </a>
        </div>
      )}
    </nav>
  );
}
