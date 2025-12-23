import ContactForm from "@/components/ContactForm";
import { Button, Card, Container, Grid, Section } from "@/components/primitives";
import { CONTACT, TRUST_SIGNALS } from "@/constants";
import { ArrowRight, CheckCircle, MapPin, Phone, Shield } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

/**
 * Homepage - The high-conversion entry point for Midwest Roots.
 * Merges general Omaha tree service SEO with the new diagnostic tool routing.
 */
export default function HomePage() {
  const pageTitle = `Professional Tree Service Omaha | ${TRUST_SIGNALS.certificationShort} | Midwest Roots`;
  const metaDescription =
    "Expert tree removal, trimming, and winter prep in Omaha. 24/7 emergency service. ISA Certified Arborists on staff. Licensed & insured.";

  const services = [
    {
      name: "Tree Removal",
      slug: "tree-removal",
      description: "Safe removal of hazardous trees with professional care",
    },
    {
      name: "Tree Trimming & Pruning",
      slug: "tree-trimming",
      description: "Structural pruning following ANSI A300 standards",
    },
    {
      name: "Tree Health Assessment",
      slug: "tree-health-assessment",
      description: "Expert evaluation with no-pressure recommendations",
    },
    {
      name: "Winter Tree Prep",
      slug: "winter-tree-prep",
      description: "Weight reduction pruning to prevent ice storm damage",
    },
  ];

  const neighborhoods = ["Dundee", "Millard", "Elkhorn", "Benson", "Papillion", "Bellevue"];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={CONTACT.siteUrl} />
      </Head>

      <main className="min-h-screen bg-surface-warm dark:bg-surface-dark transition-colors">
        {/* Hero Section with 24/7 Emergency Priority */}
        <Section variant="dark" className="py-16 md:py-24 overflow-hidden relative">
          <Container>
            <Grid cols={1} lgCols={2} gap="xl" className="items-center relative z-10">
              <div className="space-y-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-8 h-8 text-brand-accent animate-pulse" />
                  <span className="text-brand-accent font-black tracking-widest uppercase text-sm">
                    24/7 Emergency Service Available
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.9] tracking-tighter text-white">
                  Winter Defense <br />
                  <span className="text-brand-primary">For Omaha Trees</span>
                </h1>
                <p className="text-xl md:text-2xl text-content-inverse/80 max-w-xl font-medium">
                  Protect your property from ice storm damage. Structural pruning and{" "}
                  {TRUST_SIGNALS.certificationShort} assessments for local homeowners [2, 4].
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="emergency"
                    size="lg"
                    className="group"
                    onClick={() => (window.location.href = `tel:${CONTACT.phoneRaw}`)}
                  >
                    <Phone size={24} className="group-hover:animate-bounce" /> Emergency:{" "}
                    {CONTACT.phone}
                  </Button>
                  <Link href="/tools" passHref>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="bg-white text-surface-dark hover:bg-white/90 border-none"
                    >
                      Get Free Assessment <ArrowRight size={20} />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Reduced-Friction Form Card */}
              <div className="lg:order-2">
                <Card
                  variant="feature"
                  className="p-8 md:p-10 rounded-[3rem] shadow-2xl border-t-8 border-brand-primary"
                >
                  <h2 className="text-3xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-1">
                    Request a Quote
                  </h2>
                  <p className="text-content-muted mb-8 font-medium">
                    Get a Response Within 3 Hours [3].
                  </p>
                  <ContactForm />
                </Card>
              </div>
            </Grid>
          </Container>
        </Section>

        {/* Professional Services Grid */}
        <Section className="py-24 px-6">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-content-heading dark:text-content-inverse uppercase italic tracking-tighter">
                Omaha Tree Experts
              </h2>
              <p className="text-xl text-content-body dark:text-content-muted max-w-3xl mx-auto font-medium">
                From emergency removal to preventive care, we handle the Omaha canopy with{" "}
                {TRUST_SIGNALS.certificationShort} precision [5].
              </p>
            </div>

            <Grid cols={1} mdCols={2} lgCols={4} gap="md">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                  <Card
                    hover
                    className="h-full p-8 rounded-[2rem] border-neutral-100 dark:border-neutral-800"
                  >
                    <CheckCircle className="w-10 h-10 text-brand-primary mb-6" />
                    <h3 className="text-xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-3">
                      {service.name}
                    </h3>
                    <p className="text-sm text-content-body dark:text-content-muted leading-relaxed mb-6 font-medium">
                      {service.description} [4, 6].
                    </p>
                    <span className="text-brand-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      Learn More{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Card>
                </Link>
              ))}
            </Grid>
          </Container>
        </Section>

        {/* Local Trust Signals */}
        <Section variant="warm" className="py-16">
          <Container>
            <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {neighborhoods.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 text-content-muted font-black uppercase tracking-widest text-sm"
                >
                  <MapPin className="w-4 h-4" /> {area}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
