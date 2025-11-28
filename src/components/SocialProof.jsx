import { ArrowRight } from 'lucide-react';
import React from 'react';

const SocialProof = () => {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Simple stat */}
          <p className="text-lg mb-8" style={{ color: '#6b5d54' }}>
            <span className="font-bold text-2xl block mb-2" style={{ color: '#52796f' }}>1,200+</span>
            Omaha homeowners have used this tool
          </p>

          {/* CTA Repeat */}
          <a
            href="/tools"
            className="group inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              backgroundColor: '#52796f',
              color: '#ffffff'
            }}
          >
            Start Your Free Assessment
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
          </a>

        </div>
      </div>
    </section>
  );
};

export default SocialProof;
