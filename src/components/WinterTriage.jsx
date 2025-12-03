import { Snowflake, Wind, Search, ArrowRight } from 'lucide-react';

const WinterTriage = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-stone-100 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#3d3027' }}>
            Winter Tree Preparation for Omaha Homeowners
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b5d54' }}>
            Our free diagnostic tool helps you prepare for winter weather, assess storm damage, and know when to call a pro
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* Before Storms */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 transition-all hover:shadow-xl" style={{ borderColor: '#52796f' }}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#e8f5f2' }}>
              <Snowflake size={32} style={{ color: '#52796f' }} />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#3d3027' }}>
              Before Winter Storms
            </h3>

            <p className="mb-6 leading-relaxed" style={{ color: '#6b5d54' }}>
              Identify weak branches before ice accumulation. Our tool helps you spot widow makers,
              weak unions, and trees at risk of failure during Omaha's brutal ice storms.
            </p>

            <a
              href="/tools"
              className="group inline-flex items-center justify-center w-full text-center font-semibold px-6 py-3 rounded-lg transition-all"
              style={{ backgroundColor: '#52796f', color: '#ffffff' }}
            >
              Prep Your Trees
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </div>

          {/* After Storms */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 transition-all hover:shadow-xl" style={{ borderColor: '#c1666b' }}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#fef2f2' }}>
              <Wind size={32} style={{ color: '#c1666b' }} />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#3d3027' }}>
              After Storm Damage
            </h3>

            <p className="mb-6 leading-relaxed" style={{ color: '#6b5d54' }}>
              Storm passed and now you've got split trunks, hanging limbs, or leaning trees?
              Use our tool to assess the damage and know if it's DIY-safe or time to call a pro.
            </p>

            <a
              href="/tools"
              className="group inline-flex items-center justify-center w-full text-center font-semibold px-6 py-3 rounded-lg transition-all"
              style={{ backgroundColor: '#c1666b', color: '#ffffff' }}
            >
              Assess Damage
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </div>

          {/* Not Sure? */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 transition-all hover:shadow-xl" style={{ borderColor: '#52796f' }}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#e8f5f2' }}>
              <Search size={32} style={{ color: '#52796f' }} />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#3d3027' }}>
              Not Sure? Our Tool Knows
            </h3>

            <p className="mb-6 leading-relaxed" style={{ color: '#6b5d54' }}>
              Can't tell if your tree is dangerous or just ugly? Our arborist-grade diagnostic
              cuts through the confusion and gives you a clear answer in 10 minutes.
            </p>

            <a
              href="/tools"
              className="group inline-flex items-center justify-center w-full text-center font-semibold px-6 py-3 rounded-lg transition-all"
              style={{ backgroundColor: '#52796f', color: '#ffffff' }}
            >
              Get Answers
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WinterTriage;
