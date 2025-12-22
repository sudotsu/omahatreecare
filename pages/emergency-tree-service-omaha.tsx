<<<<<<< Updated upstream
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Shield, AlertTriangle, CheckCircle, Phone, Clock, ArrowLeft } from 'lucide-react';
import { CONTACT } from '@/constants';
import { Button, Card, Section, Container, Grid, Badge } from '@/components/primitives';

export default function EmergencyTreeServicePage() {
  const router = useRouter();
  const score = router.query.score as string | undefined;

  const pageTitle = '24/7 Emergency Tree Service Omaha | Storm Damage Removal';
=======
import Head from "next/head";
import { CONTACT } from "../src/constants";

export default function EmergencyTreeServicePage() {
  const pageTitle = "24/7 Emergency Tree Service Omaha | Storm Damage Removal";
>>>>>>> Stashed changes
  const metaDescription = `Urgent tree removal and storm damage cleanup in Omaha. 24-hour emergency response for hazardous trees. Call ${CONTACT.phone} immediately.`;
  const canonicalUrl = `${CONTACT.siteUrl}/emergency-tree-service-omaha`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EmergencyService",
              name: "Midwest Roots Emergency Tree Service",
              serviceType: "Emergency Tree Removal",
              provider: {
                "@type": "LocalBusiness",
                name: CONTACT.businessName,
                telephone: CONTACT.phone,
                email: CONTACT.email,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: CONTACT.streetAddress,
                  addressLocality: CONTACT.addressLocality,
                  addressRegion: CONTACT.addressRegion,
                  postalCode: CONTACT.postalCode,
                  addressCountry: CONTACT.addressCountry,
                },
                priceRange: "$$$",
              },
              areaServed: {
                "@type": "City",
                name: "Omaha",
              },
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-surface-dark">
        {/* Navigation & Risk Badge */}
        <Section className="py-6 border-b border-white/10">
          <Container>
            <div className="flex justify-between items-center">
              <Link href="/tools" className="inline-flex items-center gap-2 text-content-inverse/60 hover:text-brand-accent transition font-bold uppercase text-xs tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
              </Link>
              {score && (
                <Badge variant="emergency" className="animate-pulse border-brand-accent">
                  High Risk Score: {score}/16 Identified
                </Badge>
              )}
            </div>
          </Container>
        </Section>

        {/* Emergency Hero */}
        <Section variant="dark" className="bg-gradient-to-br from-brand-accent/20 via-brand-accent/10 to-transparent py-20 relative overflow-hidden">
          <Container>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-brand-accent animate-pulse" />
              <span className="text-xl font-black uppercase italic tracking-widest text-white">24/7 EMERGENCY SERVICE</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-[0.9] tracking-tighter mb-6">
              Emergency Tree Removal <br />& Storm Damage Cleanup
            </h1>
            <p className="text-2xl text-content-inverse/80 mb-8 max-w-2xl font-medium">
              Immediate response for hazardous trees in Omaha. We prioritize safety and property protection.
            </p>

            <Button
              variant="emergency"
              size="lg"
              className="px-12 py-6 text-2xl"
              onClick={() => window.location.href = `tel:${CONTACT.phoneRaw}`}
            >
              <Phone size={28} className="mr-4" /> CALL NOW: {CONTACT.phone}
            </Button>
          </Container>

          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
        </Section>

        {/* When to Call */}
<<<<<<< Updated upstream
        <Section className="py-24">
          <Container>
            <Grid cols={1} gap="lg" className="max-w-4xl mx-auto">
              <Card variant="feature" className="p-8 md:p-12 border-brand-accent/10 bg-surface-primary/5 shadow-2xl">
                <h2 className="text-4xl font-black text-white uppercase italic mb-8 tracking-tight flex items-center gap-4">
                  <AlertTriangle className="w-10 h-10 text-brand-accent" />
                  When to Call Emergency Services
                </h2>
                <Grid cols={1} mdCols={2} gap="md">
                  {[
                    { title: "Tree on structure", desc: "Tree or limb has fallen on house, car, or power line", icon: AlertTriangle },
                    { title: "Imminent danger", desc: "Tree leaning dangerously after storm", icon: AlertTriangle },
                    { title: "Blocked access", desc: "Tree blocking driveway or emergency route", icon: AlertTriangle },
                    { title: "Storm damage", desc: "Major limb split creating safety hazard", icon: AlertTriangle }
                  ].map((item, i) => (
                    <div key={i} className="bg-brand-accent/10 border border-brand-accent/20 rounded-2xl p-6 transition-transform hover:scale-102">
                      <div className="flex items-start gap-4">
                        <item.icon className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-black text-white uppercase italic mb-2 text-sm tracking-wide">{item.title}</h3>
                          <p className="text-sm text-content-inverse/70 font-medium leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
=======
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                When to Call Emergency Services
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <svg
                      className="w-6 h-6 text-red-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Warning"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold text-white mb-2">Tree on structure</h3>
                      <p className="text-red-200">
                        Tree or limb has fallen on house, car, or power line
                      </p>
>>>>>>> Stashed changes
                    </div>
                  ))}
                </Grid>
              </Card>

              {/* Our Response */}
              <Card variant="feature" className="p-8 md:p-12 border-neutral-800 bg-surface-dark/50 shadow-xl">
                <h2 className="text-3xl font-black text-white uppercase italic mb-8 tracking-tight">Our Emergency Response</h2>
                <Grid cols={1} mdCols={2} gap="lg">
                  {[
                    { title: "24/7 Availability", desc: "We answer the phone day or night, weekends and holidays", icon: Clock },
                    { title: "Rapid Response", desc: "Crews dispatched within 1-2 hours for true emergencies", icon: Shield },
                    { title: "Full Equipment", desc: "Cranes, lifts, and specialized gear for any emergency", icon: CheckCircle },
                    { title: "Insurance Coordination", desc: "We work directly with your insurance company", icon: CheckCircle }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <item.icon className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-black text-white uppercase italic mb-1 text-sm tracking-wide">{item.title}</h3>
                        <p className="text-sm text-content-inverse/60 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </Grid>
              </Card>

              {/* Emergency CTA */}
              <div className="bg-gradient-to-br from-brand-accent to-red-800 rounded-[2.5rem] shadow-2xl p-12 text-white text-center relative overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-4 tracking-tighter">Don&apos;t Wait - Call Now</h2>
                  <p className="text-xl mb-10 text-white/90 font-medium max-w-xl mx-auto">
                    Every minute counts in an emergency. Our crews are standing by with the right gear.
                  </p>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-white text-brand-accent hover:bg-white/90 border-none px-12 py-6 text-3xl font-black"
                    onClick={() => window.location.href = `tel:${CONTACT.phoneRaw}`}
                  >
                    <Phone size={32} className="mr-4 group-hover:animate-bounce" /> {CONTACT.phone}
                  </Button>
                  <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-white/60">
                    <Clock className="w-4 h-4 inline-block mr-2" /> Available 24/7/365
                  </p>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              </div>
<<<<<<< Updated upstream
            </Grid>
          </Container>
        </Section>
      </main>
=======
            </div>

            {/* Our Response */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Our Emergency Response</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">24/7 Availability</h3>
                    <p className="text-slate-300">
                      We answer the phone day or night, weekends and holidays
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">Rapid Response</h3>
                    <p className="text-slate-300">
                      Crews dispatched within 1-2 hours for true emergencies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">Full Equipment</h3>
                    <p className="text-slate-300">
                      Cranes, lifts, and specialized gear for any emergency
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">Insurance Coordination</h3>
                    <p className="text-slate-300">We work directly with your insurance company</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency CTA */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-xl p-10 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Don&apos;t Wait - Call Now</h2>
              <p className="text-xl mb-8 text-red-100">
                Every minute counts in an emergency. Our crews are standing by.
              </p>
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-block bg-white text-red-600 px-12 py-5 rounded-lg text-2xl font-bold hover:bg-red-50 transition-colors shadow-lg"
              >
                {CONTACT.phone}
              </a>
              <p className="mt-6 text-sm text-red-200">
                Available 24 hours a day, 7 days a week, 365 days a year
              </p>
            </div>
          </div>
        </div>
      </div>
>>>>>>> Stashed changes
    </>
  );
}
