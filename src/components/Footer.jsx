import { Phone, Mail, MapPin, Wrench } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import locationsData from '../data/locations.json';
import { CONTACT, COLORS } from '../constants';

const Footer = () => {
  // Format city names for display
  const formatCityName = (city) => {
    return city.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Get first 8 cities for footer
  const cities = Object.keys(locationsData).slice(0, 8);

  return (
    <footer style={{ backgroundColor: '#3d3027' }} className="pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: '#f8f6f1' }}>
              Contact
            </h4>
            <div className="space-y-3 text-sm" style={{ color: '#c4bbb0' }}>
              <div className="flex items-center space-x-2">
                <Phone size={16} aria-hidden="true" />
                <a href={`tel:${CONTACT.phoneRaw}`} className="hover:opacity-70 transition-opacity font-medium">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:opacity-70 transition-opacity">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: '#f8f6f1' }}>
              Our Services
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#c4bbb0' }}>
              <li>
                <Link to="/services/tree-removal" className="hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  <Wrench size={14} style={{ color: COLORS.primary }} />
                  Tree Removal
                </Link>
              </li>
              <li>
                <Link to="/services/tree-trimming" className="hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  <Wrench size={14} style={{ color: COLORS.primary }} />
                  Tree Trimming
                </Link>
              </li>
              <li>
                <Link to="/services/tree-health-assessment" className="hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  <Wrench size={14} style={{ color: COLORS.primary }} />
                  Health Assessment
                </Link>
              </li>
              <li>
                <Link to="/services/winter-tree-prep" className="hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  <Wrench size={14} style={{ color: COLORS.primary }} />
                  Winter Tree Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas - Dynamic */}
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider uppercase" style={{ color: '#f8f6f1' }}>
              Service Areas
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#c4bbb0' }}>
              {cities.slice(0, 5).map(city => (
                <li key={city}>
                  <Link
                    to={`/locations/${city}`}
                    className="hover:opacity-70 transition-opacity inline-flex items-center gap-2"
                  >
                    <MapPin size={14} className="text-emerald-400" />
                    {formatCityName(city)}, NE
                  </Link>
                </li>
              ))}
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
              Built by <a href="https://midwestroots.info" className="font-semibold hover:opacity-70 transition-opacity" style={{ color: COLORS.accent }}>{CONTACT.businessName}</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 text-center text-xs" style={{ borderColor: '#6b5d54', color: '#8b8175' }}>
          <p>&copy; 2025 {CONTACT.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
