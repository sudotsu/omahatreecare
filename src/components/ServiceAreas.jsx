import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import locationsData from '../data/locations.json';

const ServiceAreas = () => {
  // Format city names for display
  const formatCityName = (city) => {
    return city.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const cities = Object.keys(locationsData);

  return (
    <section className="py-20" style={{ backgroundColor: '#f8f6f1' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#3d3027' }}>
            Nebraska Communities We Serve
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b5d54' }}>
            Providing expert tree care across the Greater Omaha metro area.
            Click a city to see all neighborhoods we service.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {cities.map(city => {
            const neighborhoodCount = locationsData[city].length;
            return (
              <Link
                key={city}
                to={`/locations/${city}`}
                className="group bg-slate-800 border-2 border-slate-700 hover:border-emerald-500 rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <MapPin className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />

                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {formatCityName(city)}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {neighborhoodCount} {neighborhoodCount === 1 ? 'neighborhood' : 'neighborhoods'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    View Area
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
