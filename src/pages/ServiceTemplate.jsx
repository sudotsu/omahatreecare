import { CheckCircle, ShieldAlert, Wrench } from 'lucide-react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import servicesData from '../data/services.json'
import ContactForm from '../components/ContactForm'

export default function ServiceTemplate() {
  const { serviceId } = useParams()
  const data = servicesData[serviceId]

  // Redirect garbage URLs to home
  if (!data) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{data.title} | Midwest Roots Tree Services</title>
        <meta name="description" content={data.meta_desc} />
        {/* Canonical link points to the clean /services/ URL */}
        <link rel="canonical" href={`https://omahatreecare.com/services/${data.slug}`} />
      </Head>

      {/* Hero Section */}
      <header className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-full font-bold mb-6 border border-emerald-500/30">
              <Wrench className="w-4 h-4" />
              Professional Tree Service
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {data.hero_headline}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-8">
              {data.hero_sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:4028123294" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-center transition">
                Call for Quote: (402) 812-3294
              </a>
              <Link to="/tools" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-center transition backdrop-blur-sm">
                Use Free Diagnostic Tool
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pain & Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Problem */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-8 rounded-r-lg">
              <div className="flex items-start gap-4">
                <ShieldAlert className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">The Problem</h2>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    {data.pain_point}
                  </p>
                </div>
              </div>
            </div>
            {/* The Solution */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Solution</h2>
              <p className="text-slate-600 text-lg mb-6">
                {data.solution}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{data.benefit_1}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{data.benefit_2}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{data.benefit_3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get a Free Estimate</h2>
            <p className="text-slate-400">
              Send us a photo or describe the issue. We'll get back to you fast.
            </p>
          </div>
          <div className="max-w-xl mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <ContactForm urgency="high" pageSource={serviceId} />
          </div>
        </div>
      </section>
    </div>
  )
}