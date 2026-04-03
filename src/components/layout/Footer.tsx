import { Mail, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { cities } from "@/data/locations";
import { CONTACT } from "@/lib/constants";

function formatCityName(city: string): string {
  return city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Footer() {
  const displayCities = cities.slice(0, 5);

  return (
    <footer className="bg-slate-900 pt-12 pb-8 text-slate-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase text-slate-50">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone size={16} aria-hidden="true" className="text-emerald-500" />
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="hover:text-emerald-400 transition-colors font-medium"
                >
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} aria-hidden="true" className="text-emerald-500" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase text-slate-50">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {(
                [
                  ["tree-removal",          "Tree Removal"],
                  ["tree-trimming",         "Tree Trimming"],
                  ["tree-health-assessment","Health Assessment"],
                  ["winter-tree-prep",      "Winter Tree Prep"],
                ] as const
              ).map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <Wrench size={14} className="text-emerald-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase text-slate-50">
              Service Areas
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {displayCities.map((city) => (
                <li key={city}>
                  <Link
                    href={`/locations/${city}`}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <MapPin size={14} className="text-emerald-500" />
                    {formatCityName(city)}, NE
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase text-slate-50">
              About This Site
            </h4>
            <p className="text-sm mb-3 text-slate-400">
              Free tree care resources and diagnostic tools for Omaha homeowners.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-500">
                Built by{" "}
                <a
                  href="https://midwestroots.info"
                  className="font-semibold hover:text-emerald-400 transition-colors text-emerald-500"
                >
                  {CONTACT.businessName}
                </a>
              </p>
              <Link
                href="/accessibility"
                className="text-xs hover:text-emerald-400 transition-colors inline-flex items-center gap-1 text-slate-500"
              >
                <ShieldCheck size={12} />
                Accessibility Statement
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} {CONTACT.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
