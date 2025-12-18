import { ArrowRight, MapPin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_AREAS } from '../constants';

const ServiceAreas = () => {
  return (
    <section className="py-20 bg-stone-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">
            Nebraska Communities We Serve
          </h2>
          <p className="text-lg text-slate-600">
            Providing expert tree care across the Greater Omaha metro area. Click a city to see all neighborhoods we service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.name}
              to={`/locations/${area.name.toLowerCase()}`}
              // THE FIX: bg-white on bg-stone-100 creates the "Card" effect
              className="group relative bg-white rounded-xl p-8 shadow-card hover:shadow-soft transition-all duration-300 border border-stone-200 hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                  <MapPin size={24} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">
                  {area.name}
                </h3>

                <p className="text-sm text-slate-500 mb-6">
                   {area.type === 'City' ? 'Metro Area Service' : 'Neighborhood Service'}
                </p>

                <div className="flex items-center text-primary font-semibold text-sm group-hover:underline decoration-2 underline-offset-4">
                  View Service Area
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;