import { Phone, Mail } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#3d3027' }} className="pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: '#f8f6f1' }}>
              Contact
            </h4>
            <div className="space-y-3 text-sm" style={{ color: '#c4bbb0' }}>
              <div className="flex items-center space-x-2">
                <Phone size={16} aria-hidden="true" />
                <a href="tel:+14028123294" className="hover:opacity-70 transition-opacity font-medium">
                  (402) 812-3294
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} aria-hidden="true" />
                <a href="mailto:andrew@midwestroots.info" className="hover:opacity-70 transition-opacity">
                  andrew@midwestroots.info
                </a>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: '#f8f6f1' }}>
              Service Areas
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#c4bbb0' }}>
              <li>Omaha, NE</li>
              <li>Bellevue, NE</li>
              <li>Papillion, NE</li>
              <li>La Vista, NE</li>
              <li>Gretna, NE</li>
              <li>Elkhorn, NE</li>
            </ul>
          </div>

          {/* Built By */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: '#f8f6f1' }}>
              About This Site
            </h4>
            <p className="text-sm mb-3" style={{ color: '#c4bbb0' }}>
              Free tree care resources and diagnostic tools for Omaha homeowners.
            </p>
            <p className="text-xs" style={{ color: '#8b8175' }}>
              Built by <a href="https://midwestroots.info" className="font-semibold hover:opacity-70 transition-opacity" style={{ color: '#c1666b' }}>Midwest Roots Tree Services</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 text-center text-xs" style={{ borderColor: '#6b5d54', color: '#8b8175' }}>
          <p>&copy; 2025 Midwest Roots Tree Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
