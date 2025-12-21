import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Button } from './primitives';
import { CONTACT } from '../constants';
import servicesData from '../data/services.json';

/**
 * Header Component
 *
 * Sticky header with semantic surface colors, proper spacing, and consolidated emergency CTA
 *
 * Features:
 * - Sticky positioning with backdrop blur
 * - Increased nav link spacing (gap-8)
 * - Single emergency CTA (no duplication)
 * - Working Services dropdown with keyboard support
 * - Mobile-friendly hamburger menu
 */
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [router.pathname]);

  // Normalize services.json to array with runtime validation
  const normalizeServices = (data: any) => {
    // Already an array
    if (Array.isArray(data)) {
      return data.map((service: any) => ({
        name: service.title || service.name,
        slug: service.slug
      }));
    }

    // Object with nested services array
    if (data && typeof data === 'object') {
      if (Array.isArray(data.services)) {
        return data.services.map((service: any) => ({
          name: service.title || service.name,
          slug: service.slug
        }));
      }
      if (Array.isArray(data.items)) {
        return data.items.map((service: any) => ({
          name: service.title || service.name,
          slug: service.slug
        }));
      }

      // Object keyed by slug (current shape)
      const values = Object.values(data);
      if (values.length > 0 && values.every((v: any) => v && typeof v === 'object')) {
        return values.map((service: any) => ({
          name: service.title || service.name,
          slug: service.slug
        }));
      }
    }

    // Fallback: log warning and return empty array
    console.warn('Header: Unable to normalize services.json, expected array or object with services');
    return [];
  };

  const services = normalizeServices(servicesData);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-250 ease-smooth ${
        scrolled
          ? 'bg-surface-primary/95 backdrop-blur-md shadow-md'
          : 'bg-surface-primary shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link href="/" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-bold text-content-heading leading-tight group-hover:text-brand-secondary transition-colors">
              {CONTACT.businessName}
            </span>
            <span className="text-xs font-medium text-content-muted tracking-wide">
              Tree Care Omaha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-neutral-50 hover:text-primary-400 transition-colors"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onFocus={() => setIsServicesOpen(true)}
                onBlur={(e) => {
                  // Only close if focus is leaving the entire dropdown
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                    setIsServicesOpen(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsServicesOpen(!isServicesOpen);
                  } else if (e.key === 'Escape') {
                    setIsServicesOpen(false);
                  }
                }}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-fast ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-surface-primary rounded-lg shadow-xl border border-neutral-200 py-2">
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-sm font-medium text-content-heading hover:bg-brand-secondary hover:text-white transition-colors"
                    >
                      All Services
                    </Link>
                    <div className="border-t border-neutral-200 my-2" />
                    {services.map((service: { name: string; slug: string }) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block px-4 py-2 text-sm text-content-body hover:bg-brand-secondary hover:text-white transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/locations"
              className="text-sm font-semibold text-content-body hover:text-brand-secondary transition-colors"
            >
              Service Areas
            </Link>

            <Link
              href="/tree-consultation-omaha"
              className="text-sm font-semibold text-content-body hover:text-brand-secondary transition-colors"
            >
              Free Consultation
            </Link>

            {/* Primary CTA: Free Consultation Button */}
            <Link href="/tree-consultation-omaha">
              <Button variant="primary" size="md" className="min-h-[44px]">
                Get Free Quote
              </Button>
            </Link>

            {/* Emergency CTA: Phone (Secondary but visible) */}
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Button variant="emergency" size="sm" className="flex items-center gap-2 min-h-[44px]">
                <Phone size={16} />
                <span className="hidden xl:inline">{CONTACT.phone}</span>
                <span className="xl:hidden">Call Now</span>
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-content-heading hover:text-brand-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200">
            <nav className="py-6 space-y-4">
              {/* Primary CTA - Mobile (Priority #1) */}
              <Link href="/tree-consultation-omaha" className="block">
                <Button variant="primary" className="w-full flex items-center justify-center gap-2 min-h-[44px]">
                  Get Free Quote
                </Button>
              </Link>

              {/* Emergency Phone CTA - Mobile (Priority #2) */}
              <a href={`tel:${CONTACT.phoneRaw}`} className="block">
                <Button variant="emergency" className="w-full flex items-center justify-center gap-2 min-h-[44px]">
                  <Phone size={20} />
                  Call {CONTACT.phone}
                </Button>
              </a>

              {/* Navigation Links */}
              <div className="border-t border-neutral-200 pt-4 mt-4 space-y-3">
                <Link
                  href="/services"
                  className="block text-sm font-medium text-content-body hover:text-brand-secondary transition-colors py-2"
                >
                  Services
                </Link>

                <Link
                  href="/locations"
                  className="block text-sm font-medium text-content-body hover:text-brand-secondary transition-colors py-2"
                >
                  Service Areas
                </Link>

                <Link
                  href="/emergency-tree-service-omaha"
                  className="block text-sm font-medium text-alert-500 hover:text-alert-600 transition-colors py-2"
                >
                  24/7 Emergency Service
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
