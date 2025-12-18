import { Wrench, Heart, GraduationCap, CheckCircle } from 'lucide-react';

const WhyDifferent = () => {
  return (
    <section className="py-20" style={{ backgroundColor: '#f8f6f1' }}>
      <div className="container mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#3d3027' }}>
            Not Another "We Cut Trees Good" Website
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b5d54' }}>
            Most tree services just want your money. We built a free diagnostic tool to help you make informed decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">

          {/* Feature 1: Free Tool */}
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#e8f5f2' }}>
              <Wrench size={40} style={{ color: '#52796f' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#3d3027' }}>
              Arborist-Grade Diagnostic Tool
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b5d54' }}>
              Not a gimmick. Our free tool uses ISA risk assessment standards and Omaha-specific data
              to give you honest answers about your trees.
            </p>
          </div>

          {/* Feature 2: Honest */}
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#fef2f2' }}>
              <Heart size={40} style={{ color: '#c1666b' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#3d3027' }}>
              We'll Tell You if You Can DIY
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b5d54' }}>
              If your tree is healthy or safe for you to handle, we'll tell you. No pressure, no upselling,
              no BS. Your safety and wallet matter more than our profits.
            </p>
          </div>

          {/* Feature 3: Education */}
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#e8f5f2' }}>
              <GraduationCap size={40} style={{ color: '#52796f' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#3d3027' }}>
              Education-First Approach
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b5d54' }}>
              We teach you what to look for, what questions to ask, and how to spot red flags from
              predatory tree services. Knowledge is power.
            </p>
          </div>

        </div>

        {/* Call-out Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg border-2" style={{ borderColor: '#52796f' }}>
          <div className="flex items-start gap-4">
            <CheckCircle size={28} style={{ color: '#52796f', flexShrink: 0 }} className="mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#3d3027' }}>
                The Bottom Line
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#6b5d54' }}>
                If you complete our diagnostic tool and decide you don't need a tree service, we're happy for you.
                If you decide you need help, we'll be here. Either way, you made an informed decision based on science, not sales tactics.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyDifferent;
