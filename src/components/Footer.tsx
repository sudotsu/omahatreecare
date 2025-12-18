import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT, BUSINESS_HOURS } from '../constants';

/**
 * Footer Component
 * NAP block + canonical service/location links
 */
export const Footer: React.FC = () => {
  const services = [
    { name: 'Tree Removal', slug: 'tree-removal' },
    { name: 'Tree Trimming', slug: 'tree-trimming' },
    { name: 'Tree Health Assessment', slug: 'tree-health-assessment' },
    { name: 'Winter Tree Prep', slug: 'winter-tree-prep' },
  ];

  const cities = [
    { name: 'Omaha', slug: 'omaha' },
    { name: 'Millard', slug: 'millard' },
    { name: 'Elkhorn', slug: 'elkhorn' },
    { name: 'Papillion', slug: 'papillion' },
    { name: 'Bellevue', slug: 'bellevue' },
    { name: 'Gretna', slug: 'gretna' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-100 pb-20 lg:pb-0">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-xl py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* NAP Block (Name, Address, Phone) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">{CONTACT.businessName}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p>{CONTACT.streetAddress}</p>
                  <p>
                    {CONTACT.addressLocality}, {CONTACT.addressRegion}{' '}
                    {CONTACT.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="hover:text-primary-400 transition-colors font-semibold"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={18} className="text-primary-500 flex-shrink-0" />
                <p>{BUSINESS_HOURS.display}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-neutral-400">
              <p>
                Serving Omaha and surrounding areas with professional tree care
                services.
              </p>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-neutral-50">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  All Services
                </Link>
              </li>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-neutral-50">
              Service Areas
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/locations"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  All Locations
                </Link>
              </li>
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/locations/${city.slug}`}
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {city.name}, NE
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Links Row */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              href="/emergency-tree-service-omaha"
              className="text-alert-400 hover:text-alert-500 transition-colors font-semibold"
            >
              Emergency Service
            </Link>
            <Link
              href="/tree-consultation-omaha"
              className="text-neutral-400 hover:text-primary-400 transition-colors"
            >
              Free Consultation
            </Link>
            <Link
              href="/tools"
              className="text-neutral-400 hover:text-primary-400 transition-colors"
            >
              Tree Care Tools
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-600">
          <p>
            &copy; {new Date().getFullYear()} {CONTACT.businessName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
