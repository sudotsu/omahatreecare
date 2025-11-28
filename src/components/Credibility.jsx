import { MapPin, Award, Target } from 'lucide-react';
import React from 'react';

const Credibility = () => {
  const features = [
    {
      icon: MapPin,
      title: "Omaha-Specific",
      description: "EAB, soil conditions, local climate"
    },
    {
      icon: Award,
      title: "Real Science",
      description: "Based on ISA arborist standards"
    },
    {
      icon: Target,
      title: "Honest Assessment",
      description: "Even if you need nothing"
    }
  ];

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#e8ebe6' }}
                  >
                    <Icon size={28} style={{ color: '#52796f' }} aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#3d3027' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b5d54' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Credibility;
