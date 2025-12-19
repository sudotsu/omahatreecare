import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, AlertTriangle, Phone } from 'lucide-react';
import { Button } from './primitives';
import { CONTACT } from '../constants';
import servicesData from '../data/services.json';

/**
 * Header Component
 * Blue-collar trustworthy navigation with Emergency CTA
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
      className={`fixed w-full z-50 transition-all duration-250 ease-smooth ${
        scrolled
          ? 'bg-neutral-900/95 backdrop-blur-sm shadow-lg py-4'
          : 'bg-neutral-900 py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-bold text-neutral-50 leading-tight group-hover:text-primary-400 transition-colors">
              {CONTACT.businessName}
            </span>
            <span className="text-xs font-medium text-neutral-300 tracking-wide">
              Tree Care Omaha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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
                  <div className="bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 py-2">
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-sm font-medium text-neutral-50 hover:bg-primary-700 hover:text-white transition-colors"
                    >
                      All Services
                    </Link>
                    <div className="border-t border-neutral-700 my-2" />
                    {services.map((service: { name: string; slug: string }) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block px-4 py-2 text-sm text-neutral-200 hover:bg-primary-700 hover:text-white transition-colors"
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
              className="text-sm font-semibold text-neutral-50 hover:text-primary-400 transition-colors"
            >
              Service Areas
            </Link>

            <Link
              href="/tools"
              className="text-sm font-semibold text-neutral-50 hover:text-primary-400 transition-colors"
            >
              Tools
            </Link>

            <Link
              href="/tree-consultation-omaha"
              className="text-sm font-semibold text-neutral-50 hover:text-primary-400 transition-colors"
            >
              Free Consultation
            </Link>

            {/* Emergency CTA - Desktop */}
            <Link href="/emergency-tree-service-omaha">
              <Button variant="emergency" size="sm" className="flex items-center gap-2">
                <AlertTriangle size={16} />
                Emergency
              </Button>
            </Link>

            {/* Phone CTA - Desktop */}
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <Phone size={16} />
                {CONTACT.phone}
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-neutral-50 hover:text-primary-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-neutral-900 border-t border-neutral-700 shadow-xl">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {/* Services Section */}
              <div>
                <Link
                  href="/services"
                  className="block text-base font-semibold text-neutral-900 mb-3 hover:text-primary-600 transition-colors"
                >
                  Services
                </Link>
                <div className="pl-4 space-y-2">
                  {services.map((service: { name: string; slug: string }) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block text-sm text-neutral-700 hover:text-primary-600 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/locations"
                className="block text-base font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
              >
                Service Areas
              </Link>

              <Link
                href="/tools"
                className="block text-base font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
              >
                Tools
              </Link>

              <Link
                href="/tree-consultation-omaha"
                className="block text-base font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
              >
                Free Consultation
              </Link>

              {/* Emergency CTA - Mobile */}
              <Link href="/emergency-tree-service-omaha" className="block">
                <Button variant="emergency" className="w-full flex items-center justify-center gap-2">
                  <AlertTriangle size={20} />
                  Emergency Service
                </Button>
              </Link>

              {/* Phone CTA - Mobile */}
              <a href={`tel:${CONTACT.phoneRaw}`} className="block">
                <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                  <Phone size={20} />
                  Call {CONTACT.phone}
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
