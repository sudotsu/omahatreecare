import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

const Navigation = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          <a
            href="/tools"
            className="font-medium text-sm transition-colors hover:opacity-70"
            style={{ color: '#52796f' }}
          >
            Free Tool
          </a>
          <a
            href="tel:+14028123294"
            className="font-semibold px-5 py-2 rounded-lg transition-all transform hover:-translate-y-0.5"
            style={{
              backgroundColor: '#52796f',
              color: '#ffffff'
            }}
          >
            (402) 812-3294
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
          <a
            href="/tools"
            className="text-lg font-medium"
            onClick={toggleMenu}
            style={{ color: '#52796f' }}
          >
            Free Tool
          </a>
          <a
            href="tel:+14028123294"
            className="font-semibold py-3 rounded-lg text-center"
            onClick={toggleMenu}
            style={{
              backgroundColor: '#52796f',
              color: '#ffffff'
            }}
          >
            (402) 812-3294
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
