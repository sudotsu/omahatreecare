import { Menu, X, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, COLORS } from '../constants';

const Navigation = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const services = [
    { name: 'Tree Removal', slug: 'tree-removal' },
    { name: 'Tree Trimming', slug: 'tree-trimming' },
    { name: 'Health Assessment', slug: 'tree-health-assessment' },
    { name: 'Winter Tree Prep', slug: 'winter-tree-prep' }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md backdrop-blur-sm py-3' : 'py-5'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(248, 246, 241, 0.95)' : 'transparent'
      }}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-tight" style={{ color: '#3d3027' }}>
            Omaha Tree Care
          </span>
          <span className="text-xs font-medium tracking-wide" style={{ color: '#8b8175' }}>
            Tools & Resources
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className="font-medium text-sm transition-colors hover:opacity-70 flex items-center gap-1"
              style={{ color: COLORS.primary }}
            >
              Services
              <ChevronDown size={16} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg py-2"
                style={{ backgroundColor: '#f8f6f1', border: `1px solid ${COLORS.primary}` }}
              >
                {services.map(service => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block px-4 py-2 text-sm transition-colors hover:opacity-70"
                    style={{ color: COLORS.text }}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href="/tools"
            className="font-medium text-sm transition-colors hover:opacity-70"
            style={{ color: COLORS.primary }}
          >
            Free Tool
          </a>
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="font-semibold px-5 py-2 rounded-lg transition-all transform hover:-translate-y-0.5"
            style={{
              backgroundColor: COLORS.primary,
              color: '#ffffff'
            }}
          >
            {CONTACT.phone}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          style={{ color: '#3d3027' }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full shadow-lg p-6 flex flex-col space-y-4"
          style={{ backgroundColor: '#f8f6f1' }}
        >
          {/* Services in Mobile */}
          <div>
            <div className="font-bold text-sm mb-2" style={{ color: COLORS.text }}>Services</div>
            <div className="flex flex-col space-y-2 pl-4">
              {services.map(service => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="text-sm font-medium"
                  onClick={toggleMenu}
                  style={{ color: COLORS.primary }}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <a
            href="/tools"
            className="text-lg font-medium"
            onClick={toggleMenu}
            style={{ color: COLORS.primary }}
          >
            Free Tool
          </a>
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="font-semibold py-3 rounded-lg text-center"
            onClick={toggleMenu}
            style={{
              backgroundColor: COLORS.primary,
              color: '#ffffff'
            }}
          >
            {CONTACT.phone}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
