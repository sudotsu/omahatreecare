import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

const Navigation = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 shadow-lg backdrop-blur-sm py-2' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-orange-600 rounded-sm flex items-center justify-center">
            <span className="font-black text-2xl text-white">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl leading-none tracking-wider text-white uppercase">Midwest Roots</span>
            <span className="text-xs text-slate-400 font-bold tracking-[0.2em] uppercase">Property Protection</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#why-us" className="text-slate-300 hover:text-orange-500 font-bold uppercase text-sm tracking-wide transition-colors">The Strategy</a>
          <a href="#about" className="text-slate-300 hover:text-orange-500 font-bold uppercase text-sm tracking-wide transition-colors">Our Story</a>
          <a href="#services" className="text-slate-300 hover:text-orange-500 font-bold uppercase text-sm tracking-wide transition-colors">Services</a>
          <a href="#audit" className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase text-sm px-6 py-3 rounded shadow-lg shadow-orange-900/20 transition-all transform hover:-translate-y-1">
            Get Risk Audit
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-6 flex flex-col space-y-4 shadow-2xl">
          <a href="#why-us" className="text-lg font-bold text-slate-300" onClick={toggleMenu}>The Strategy</a>
          <a href="#about" className="text-lg font-bold text-slate-300" onClick={toggleMenu}>Our Story</a>
          <a href="#services" className="text-lg font-bold text-slate-300" onClick={toggleMenu}>Services</a>
          <a href="#audit" className="bg-orange-600 text-white font-bold uppercase py-4 rounded w-full text-center" onClick={toggleMenu}>
            Schedule Risk Audit
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
