import React from 'react';

const Services = () => {
  return (
    <section id="services" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Winter Defense Knowledge Base</h2>
            <p className="text-slate-500">Expert advice on dormant season tree care.</p>
          </div>
          <a href="#" className="hidden md:block text-orange-500 font-bold hover:text-orange-400">View All Articles &gt;</a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <a href="#" className="group block">
            <div className="aspect-video bg-slate-800 mb-4 overflow-hidden rounded relative">
              <div className="absolute inset-0 bg-slate-900 group-hover:bg-slate-800 transition-colors flex items-center justify-center">
                <span className="text-slate-600 font-bold text-4xl" aria-hidden="true">01</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors mb-2">
              The 3 Signs Your Oak Tree Can't Handle Heavy Snow
            </h3>
            <p className="text-slate-500 text-sm">Identifying stress fractures before the blizzard hits.</p>
          </a>

          <a href="#" className="group block">
            <div className="aspect-video bg-slate-800 mb-4 overflow-hidden rounded relative">
              <div className="absolute inset-0 bg-slate-900 group-hover:bg-slate-800 transition-colors flex items-center justify-center">
                <span className="text-slate-600 font-bold text-4xl" aria-hidden="true">02</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors mb-2">
              Why Smart Homeowners Prune in January (And Save Money)
            </h3>
            <p className="text-slate-500 text-sm">The economic and biological benefits of winter care.</p>
          </a>

          <a href="#" className="group block">
            <div className="aspect-video bg-slate-800 mb-4 overflow-hidden rounded relative">
              <div className="absolute inset-0 bg-slate-900 group-hover:bg-slate-800 transition-colors flex items-center justify-center">
                <span className="text-slate-600 font-bold text-4xl" aria-hidden="true">03</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors mb-2">
              Winter Risk: How to Spot a 'Widowmaker' Branch
            </h3>
            <p className="text-slate-500 text-sm">Protecting your driveway and family from falling hazards.</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
