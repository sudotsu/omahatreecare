import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-600/20 z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-600/20 z-0"></div>
            <img
              src="/images/andrew.png"
              alt="Andrew Warner, founder of Midwest Roots, inspecting tree structure for winter safety"
              className="relative z-10 rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full"
            />
            <div className="absolute bottom-0 left-0 bg-slate-900/90 p-4 z-20 border-t-4 border-orange-600">
              <p className="font-bold text-white">Andrew Warner</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Founder & Lead Operator</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              BORN IN A STORM. <br />BUILT TO PREVENT THEM.
            </h2>
            <div className="space-y-6 text-lg text-slate-300 font-light">
              <p>
                I started Midwest Roots after seeing the devastation a storm can bring to Omaha neighborhoods. I had nothing but a rented truck and a chainsaw, but I learned the hard way that <strong className="text-white">most tree damage is preventable.</strong>
              </p>
              <p>
                Now, my mission isn't just removing trees—it's assessing risks so you sleep soundly when the wind howls. We take the "guesswork" out of tree care.
              </p>
              <div className="pt-4">
                <div className="inline-block border-l-2 border-slate-600 pl-4 italic text-slate-400">
                  "We don't sell tree trimming. We sell the peace of mind that your roof won't be crushed in February."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
