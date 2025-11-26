import { Phone } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-sm flex items-center justify-center">
                <span className="font-black text-2xl text-white">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg leading-none tracking-wider text-white uppercase">Midwest Roots</span>
                <span className="text-xs text-slate-400 font-bold tracking-[0.2em] uppercase">Property Protection</span>
              </div>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Engineering winter-safe properties across the Omaha metro. We specialize in structural pruning that prevents storm damage before it happens.
            </p>
            <div className="flex items-center space-x-2 text-slate-400">
              <Phone size={16} aria-hidden="true" />
              <a href="tel:+14028123294" className="font-bold hover:text-orange-500 transition-colors">402-812-3294</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#why-us" className="hover:text-orange-500 transition-colors">The Strategy</a></li>
              <li><a href="#about" className="hover:text-orange-500 transition-colors">Our Story</a></li>
              <li><a href="#services" className="hover:text-orange-500 transition-colors">Knowledge Base</a></li>
              <li><a href="#audit" className="hover:text-orange-500 transition-colors">Get Risk Audit</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Service Areas</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Omaha, NE</li>
              <li>Bellevue, NE</li>
              <li>Papillion, NE</li>
              <li>La Vista, NE</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2025 Midwest Roots Tree Services. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Fully Insured • Licensed • Safety Certified</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
