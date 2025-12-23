import { Badge, Button, Card, Container, Grid, Section } from "@/components/primitives";
import { CONTACT } from "@/constants";
import { AlertTriangle, ArrowLeft, CheckCircle, Clock, Phone, Shield } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function EmergencyTreeServicePage() {
  const router = useRouter();
  const score = router.query.score as string | undefined;

  const pageTitle = "24/7 Emergency Tree Service Omaha | Storm Damage Removal";
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
              availableChannel: [
                {
                  "@type": "ServiceChannel",
                  serviceUrl: canonicalUrl,
                  serviceType: "Website",
                },
                {
                  "@type": "ServiceChannel",
                  servicePhone: CONTACT.phone,
                  serviceType: "Telephone",
                },
                {
                  "@type": "ServiceChannel",
                  servicePhone: CONTACT.phone,
                  serviceType: "SMS",
                },
              ],
              openingHours: "Mo-Su 00:00-24:00",
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-surface-dark">
        {/* Navigation & Risk Badge */}
        <Section className="py-6 border-b border-white/10">
          <Container>
            <div className="flex justify-between items-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-content-inverse/60 hover:text-brand-accent transition font-bold uppercase text-xs tracking-widest"
              >
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
        <Section
          variant="dark"
          className="bg-gradient-to-br from-brand-accent/20 via-brand-accent/10 to-transparent py-20 relative overflow-hidden"
        >
          <Container>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-brand-accent animate-pulse" />
              <span className="text-xl font-black uppercase italic tracking-widest text-white">
                24/7 EMERGENCY SERVICE
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-[0.9] tracking-tighter mb-6">
              Emergency Tree Removal <br />& Storm Damage Cleanup
            </h1>
            <p className="text-2xl text-content-inverse/80 mb-8 max-w-2xl font-medium">
              Immediate response for hazardous trees in Omaha. We prioritize safety and property
              protection.
            </p>

            <Button
              variant="emergency"
              size="lg"
              className="px-12 py-6 text-2xl"
              onClick={() => (window.location.href = `tel:${CONTACT.phoneRaw}`)}
            >
              <Phone size={28} className="mr-4" /> CALL NOW: {CONTACT.phone}
            </Button>
          </Container>

          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
        </Section>

        {/* When to Call */}
        <Section className="py-24">
          <Container>
            <Grid cols={1} gap="lg" className="max-w-4xl mx-auto">
              <Card
                variant="feature"
                className="p-8 md:p-12 border-brand-accent/10 bg-surface-primary/5 shadow-2xl"
              >
                <h2 className="text-4xl font-black text-white uppercase italic mb-8 tracking-tight flex items-center gap-4">
                  <AlertTriangle className="w-10 h-10 text-brand-accent" />
                  When to Call Emergency Services
                </h2>
                <Grid cols={1} mdCols={2} gap="md">
                  {[
                    {
                      title: "Tree on structure",
                      desc: "Tree or limb has fallen on house, car, or power line",
                      icon: AlertTriangle,
                    },
                    {
                      title: "Imminent danger",
                      desc: "Tree leaning dangerously after storm",
                      icon: AlertTriangle,
                    },
                    {
                      title: "Blocked access",
                      desc: "Tree blocking driveway or emergency route",
                      icon: AlertTriangle,
                    },
                    {
                      title: "Storm damage",
                      desc: "Major limb split creating safety hazard",
                      icon: AlertTriangle,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-brand-accent/10 border border-brand-accent/20 rounded-2xl p-6 transition-transform hover:scale-102"
                    >
                      <div className="flex items-start gap-4">
                        <item.icon className="w-6 h-6 text-brand-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-black text-white uppercase italic mb-2 text-sm tracking-wide">
                            {item.title}
                          </h3>
                          <p className="text-sm text-content-inverse/70 font-medium leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Grid>
              </Card>

              {/* Our Response */}
              <Card
                variant="feature"
                className="p-8 md:p-12 border-neutral-800 bg-surface-dark/50 shadow-xl"
              >
                <h2 className="text-3xl font-black text-white uppercase italic mb-8 tracking-tight">
                  Our Emergency Response
                </h2>
                <Grid cols={1} mdCols={2} gap="lg">
                  {[
                    {
                      title: "24/7 Availability",
                      desc: "We answer the phone day or night, weekends and holidays",
                      icon: Clock,
                    },
                    {
                      title: "Rapid Response",
                      desc: "Crews dispatched within 1-2 hours for true emergencies",
                      icon: Shield,
                    },
                    {
                      title: "Full Equipment",
                      desc: "Cranes, lifts, and specialized gear for any emergency",
                      icon: CheckCircle,
                    },
                    {
                      title: "Insurance Coordination",
                      desc: "We work directly with your insurance company",
                      icon: CheckCircle,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <item.icon className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-black text-white uppercase italic mb-1 text-sm tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm text-content-inverse/60 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </Grid>
              </Card>

              {/* Emergency CTA */}
              <div className="bg-gradient-to-br from-brand-accent to-red-800 rounded-[2.5rem] shadow-2xl p-12 text-white text-center relative overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-4 tracking-tighter">
                    Don&apos;t Wait - Call Now
                  </h2>
                  <p className="text-xl mb-10 text-white/90 font-medium max-w-xl mx-auto">
                    Every minute counts in an emergency. Our crews are standing by with the right
                    gear.
                  </p>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-white text-brand-accent hover:bg-white/90 border-none px-12 py-6 text-3xl font-black"
                    onClick={() => (window.location.href = `tel:${CONTACT.phoneRaw}`)}
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
            </Grid>
          </Container>
        </Section>
      </main>
    </>
  );
}
