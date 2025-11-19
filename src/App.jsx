import emailjs from '@emailjs/browser';
import { AlertTriangle, ArrowRight, CheckCircle, HardHat, Menu, Phone, Ruler, Shield, ThermometerSnowflake, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    phone: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  // Handle scroll for sticky nav styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Brand Colors
  const colors = {
    navy: '#0a192f', // Midnight Navy
    orange: '#ff5e00', // Safety Orange
    grey: '#64748b', // Steel Grey
    white: '#f8fafc',
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Basic validation
    if (!formData.address || !formData.phone) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // EmailJS configuration
      // You'll need to replace these with your actual values from EmailJS
      const serviceId = 'service_77y8j48';
      const templateId = 'template_534ddr9';
      const publicKey = 'WMCnzw0M1hqlbYim1';

      // Check if EmailJS is configured
      if (serviceId === 'YOUR_SERVICE_ID') {
        // For development - just log to console
        console.log('Form submitted:', formData);
        setFormStatus({
          type: 'success',
          message: 'Thanks! We\'ll contact you within 24 hours to schedule your risk audit.'
        });
        setFormData({ address: '', phone: '' });
        setIsSubmitting(false);
        return;
      }

      // Send email via EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          property_address: formData.address,
          phone_number: formData.phone,
          submission_time: new Date().toLocaleString(),
        },
        publicKey
      );

      if (result.status === 200) {
        setFormStatus({
          type: 'success',
          message: 'Thanks! We\'ll contact you within 24 hours to schedule your risk audit.'
        });
        setFormData({ address: '', phone: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please call us at (402) 812-3294'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-100 selection:bg-orange-500 selection:text-white" style={{ backgroundColor: colors.navy }}>
      {/* Google Fonts Injection */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@600;800;900&display=swap');

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Montserrat', sans-serif;
          }
          body, p, li, a, button {
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 shadow-lg backdrop-blur-sm py-2' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo Area */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-600 rounded-sm flex items-center justify-center">
               <span className="font-black text-2xl text-white">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl leading-none tracking-wider text-white uppercase">Midwest Roots</span>
              <span className="text-xs text-slate-400 font-bold tracking-[0.2em] uppercase">Property Protection</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#why-us" className="text-slate-300 hover:text-orange-500 font-bold uppercase text-sm tracking-wide transition-colors">The Strategy</a>
            <a href="#about" className="text-slate-300 hover:text-orange-500 font-bold uppercase text-sm tracking-wide transition-colors">Our Story</a>
            <a href="#services" className="text-slate-300 hover:text-orange-500 font-bold uppercase text-sm tracking-wide transition-colors">Services</a>
            <a href="#audit" className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase text-sm px-6 py-3 rounded shadow-lg shadow-orange-900/20 transition-all transform hover:-translate-y-1">
              Get Risk Audit
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-6 flex flex-col space-y-4 shadow-2xl">
            <a href="#why-us" className="text-lg font-bold text-slate-300" onClick={toggleMenu}>The Strategy</a>
            <a href="#about" className="text-lg font-bold text-slate-300" onClick={toggleMenu}>Our Story</a>
            <a href="#services" className="text-lg font-bold text-slate-300" onClick={toggleMenu}>Services</a>
            <a href="#audit" className="bg-orange-600 text-white font-bold uppercase py-4 rounded w-full text-center" onClick={toggleMenu}>
              Schedule Risk Audit
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Fallback dark gradient if image fails */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 opacity-95 z-10"></div>
          {/* Conceptual 'Winter Threat' Image */}
          <img
            src="https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&q=80&w=2000"
            alt="Trees heavy with snow"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-orange-600/10 border border-orange-500/30 rounded px-3 py-1 mb-6">
              <AlertTriangle size={16} className="text-orange-500" />
              <span className="text-orange-400 text-xs md:text-sm font-bold uppercase tracking-wider">Winter Storm Warning: Omaha Season 2025</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-xl">
              IS YOUR PROPERTY READY FOR THE NEXT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">ICE STORM?</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl border-l-4 border-orange-600 pl-6">
              Heavy snow and ice turn weak branches into expensive liabilities. We specialize in
              <strong className="text-white"> winter structural pruning</strong> to protect your roof, vehicles, and power lines before the weather turns.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#audit" className="group bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold px-8 py-4 rounded shadow-lg shadow-orange-900/40 transition-all flex items-center justify-center">
                <HardHat className="mr-2 group-hover:rotate-12 transition-transform" size={24} />
                SCHEDULE FREE RISK AUDIT
              </a>
              <a href="#why-us" className="group border-2 border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold px-8 py-4 rounded transition-all flex items-center justify-center">
                Why Winter Pruning?
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>

            <div className="mt-8 flex items-center space-x-6 text-sm font-semibold text-slate-400">
              <div className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" /> Fully Insured</div>
              <div className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" /> Safety Obsessed</div>
              <div className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" /> Omaha Local</div>
            </div>
          </div>
        </div>
      </header>

      {/* The "Why Us" / Strategy Section */}
      <section id="why-us" className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">We Don't Just Chop. <br/><span className="text-orange-500">We Engineer.</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">The "Winter Defense" protocol is designed specifically for the Midwest climate. We target the specific threats of Omaha winters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-lg hover:border-orange-500/50 transition-all group">
              <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                <Ruler size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Structural Integrity Focus</h3>
              <p className="text-slate-400 leading-relaxed">
                We identify and remove 'weak unions' and deadwood that are most likely to fail under snow load. It's not about aesthetics; it's about physics.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-lg hover:border-orange-500/50 transition-all group">
              <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                <ThermometerSnowflake size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Dormant Season Advantage</h3>
              <p className="text-slate-400 leading-relaxed">
                Without leaves, we see structural defects clearly. Plus, pruning in winter stops disease transmission cold. It is scientifically the best time to cut.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-lg hover:border-orange-500/50 transition-all group">
              <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Zero-Liability Promise</h3>
              <p className="text-slate-400 leading-relaxed">
                Fully insured and safety-obsessed. When we work on your property, your home is protected by our coverage and our experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Narrative Section */}
      <section id="about" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-600/20 z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-600/20 z-0"></div>
              <img
                src="https://img1.wsimg.com/isteam/ip/f84ace64-9f94-4487-b225-a5fac24c6158/blob-facf59f.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280"
                alt="Andrew inspecting a tree"
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
                BORN IN A STORM. <br/>BUILT TO PREVENT THEM.
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

      {/* The Risk Audit Offer - Conversion Driver */}
      <section id="audit" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="lg:w-3/5">
                <div className="inline-block bg-orange-600 text-white text-xs font-black uppercase px-3 py-1 rounded mb-4">
                  Limited Winter Availability
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  Get Your 15-Minute <span className="text-orange-500">Winter Risk Audit</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8">
                  This isn't a generic quote. It's a diagnostic walkthrough where we identify:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">Overhanging limbs threatening the roof or power lines.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">Deadwood that will snap instantly in a deep freeze.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">Structural defects invisible when leaves are on.</span>
                  </li>
                </ul>

                <div className="bg-slate-900/50 p-4 rounded border border-slate-700 flex items-center gap-4">
                  <Shield className="text-green-500 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-white font-bold text-sm">The No-Pressure Promise</p>
                    <p className="text-slate-400 text-xs">We will tell you honestly if your trees are safe and need no work. We prioritize safety, not sales.</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/5 w-full">
                <form ref={formRef} onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm space-y-4">
                  <h3 className="text-white font-bold text-xl mb-2">Secure Your Slot</h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Property Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-orange-500 outline-none transition-colors"
                      placeholder="1234 Omaha St"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-orange-500 outline-none transition-colors"
                      placeholder="402-812-3294"
                      required
                    />
                  </div>

                  {formStatus.message && (
                    <div className={`p-3 rounded ${formStatus.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-red-500/20 border border-red-500/50 text-red-400'}`}>
                      <p className="text-sm">{formStatus.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-black uppercase py-4 rounded shadow-lg transition-all"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'BOOK RISK AUDIT'}
                  </button>

                  <p className="text-center text-slate-500 text-xs mt-2">
                    Your privacy is protected. No spam.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content / Blog Teasers */}
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
                    <span className="text-slate-600 font-bold text-4xl">01</span>
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
                    <span className="text-slate-600 font-bold text-4xl">02</span>
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
                    <span className="text-slate-600 font-bold text-4xl">03</span>
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

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">

            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-sm flex items-center justify-center">
                  <span className="font-black text-2xl text-white">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-lg leading-none tracking-wider text-white uppercase">Midwest Roots</span>
                  <span className="text-xs text-slate-400 font-bold tracking-[0.2em] uppercase">Property Protection</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Engineering winter-safe properties across the Omaha metro. We specialize in structural pruning that prevents storm damage before it happens.
              </p>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone size={16} />
                <span className="font-bold">402-812-3294</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#why-us" className="hover:text-orange-500 transition-colors">The Strategy</a></li>
                <li><a href="#about" className="hover:text-orange-500 transition-colors">Our Story</a></li>
                <li><a href="#services" className="hover:text-orange-500 transition-colors">Knowledge Base</a></li>
                <li><a href="#audit" className="hover:text-orange-500 transition-colors">Get Risk Audit</a></li>
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Service Areas</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Omaha, NE</li>
                <li>Bellevue, NE</li>
                <li>Papillion, NE</li>
                <li>La Vista, NE</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2025 Midwest Roots Tree Services. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Fully Insured • Licensed • Safety Certified</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
