'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, CheckCircle, Phone, Shield, Info, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { CONTACT } from '@/constants';
import ContactForm from '@/components/ContactForm';
import { Badge, Card, Button, Section, Container, Grid } from '@/components/primitives';

export default function TreeConsultation() {
  const router = useRouter();
  const riskLevel = router.query.risk as string | undefined;
  const score = router.query.score as string | undefined;

  const pageTitle = 'Tree Consultation Omaha - Professional Assessment Before DIY | Midwest Roots';
  const metaDescription = `Get a professional tree risk assessment in Omaha before you DIY. Expert advice on safety, pruning vs removal, and storm risks. Call ${CONTACT.phone}.`;

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Tree Consultation',
        risk_level: riskLevel,
        risk_score: score
      });
    }
  }, [riskLevel, score]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {/* Service Schema for Local SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Tree Consultation and Safety Assessment",
            "provider": { "@type": "LocalBusiness", "name": CONTACT.businessName },
            "areaServed": "Omaha, NE",
            "description": "Professional arborist consultation to identify hidden risks and provide honest DIY vs Pro advice."
          })}} />
      </Head>

      <main className="min-h-screen bg-surface-warm dark:bg-surface-dark transition-colors">
        {/* Navigation & Risk Badge */}
        <Section className="py-6 border-b border-neutral-100 dark:border-neutral-800">
          <Container>
            <div className="flex justify-between items-center">
              <Link href="/tools" className="inline-flex items-center gap-2 text-content-muted hover:text-brand-primary transition font-bold uppercase text-xs tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
              </Link>
              {riskLevel && (
                <Badge variant="steel" className="animate-pulse border-alert-400">
                  {riskLevel} Risk Identified (Score: {score})
                </Badge>
              )}
            </div>
          </Container>
        </Section>

        {/* Hero Section */}
        <Section className="pt-12 pb-8 text-center">
          <Container>
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-content-heading dark:text-content-inverse uppercase italic leading-none tracking-tighter">
                Get a Professional Look <br />
                <span className="text-brand-primary">Before You DIY</span>
              </h1>
              <p className="text-lg text-content-body dark:text-content-muted max-w-2xl mx-auto font-medium">
                Your assessment shows concerns that warrant a closer look. Let’s provide an honest opinion before you invest time or risk your safety.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="pb-20">
          <Container>
            <Grid cols={1} lgCols={2} gap="lg">
              <div className="space-y-8">
                {/* Primary CTA */}
                <Card variant="feature" className="border-brand-primary/20 bg-white/80 backdrop-blur-sm shadow-xl p-8 rounded-[2.5rem]">
                  <h2 className="text-2xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-2">Talk to Andrew</h2>
                  <p className="text-content-muted mb-6 text-sm font-medium">Quick phone call to discuss your tree situation and whether you truly need professional help.</p>
                  <a href={`tel:${CONTACT.phoneRaw}`} className="block group">
                    <Button variant="primary" className="w-full py-6 text-2xl flex items-center justify-center gap-4 rounded-2xl transition-all group-hover:scale-102">
                      <Phone className="w-6 h-6 group-hover:animate-bounce" />
                      {CONTACT.phone}
                    </Button>
                  </a>
                  <p className="text-center mt-4 text-xs font-bold text-content-muted uppercase tracking-widest flex items-center justify-center gap-2">
                    <Clock className="w-3 h-3" /> Best Times: Mon-Sat 8am-6pm
                  </p>
                </Card>

                {/* Omaha-Specific Authority */}
                <Grid cols={1} mdCols={2} gap="sm">
                  {[
                    { title: "Clay Soil Impacts", desc: "How Omaha's soil affects root stability.", icon: MapPin },
                    { title: "Ice Load Risks", desc: "Preparing your canopy for Nebraska winters.", icon: Shield },
                    { title: "EAB Strategy", desc: "Treatment decisions for Ash trees.", icon: AlertTriangle },
                    { title: "Native Species", desc: "Understanding local growth patterns.", icon: Info }
                  ].map((item, i) => (
                    <Card key={i} className="p-5 border-neutral-200 dark:border-neutral-800 bg-surface-primary/50 rounded-2xl">
                      <item.icon className="w-5 h-5 text-brand-primary mb-2"/>
                      <h3 className="font-bold text-content-heading dark:text-content-inverse text-sm uppercase italic">{item.title}</h3>
                      <p className="text-xs text-content-body dark:text-content-muted leading-relaxed font-medium">{item.desc}.</p>
                    </Card>
                  ))}
                </Grid>
              </div>

              {/* Contact Form / Callback */}
              <Card variant="feature" className="md:p-12 shadow-2xl border-brand-primary/10 rounded-[3rem]">
                <h2 className="text-3xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-2 leading-none">Request a <br />Callback</h2>
                <p className="text-content-body dark:text-content-muted mb-8 font-medium">I&apos;ll reach out within 24 hours to schedule a formal assessment.</p>
                <ContactForm />
              </Card>
            </Grid>
          </Container>
        </Section>

        {/* Education: DIY vs Pro */}
        <Section variant="dark" className="py-20">
          <Container className="space-y-12">
            <h2 className="text-3xl font-black uppercase italic text-center tracking-tighter">DIY-Friendly vs. Call a Professional</h2>
            <Grid cols={1} mdCols={2} gap="lg">
              <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold text-brand-secondary uppercase italic">Often DIY-Friendly</h3>
                <ul className="space-y-4">
                  {["Small branches (under 3 inches diameter)", "Work that doesn't require ladders", "Clear of power lines and structures", "Routine pruning on young, healthy trees"].map((li, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium text-content-inverse/80">
                      <CheckCircle className="w-5 h-5 text-brand-primary shrink-0" /> {li}.
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6 bg-alert-500/10 p-8 rounded-3xl border border-alert-500/20">
                <h3 className="text-xl font-bold text-alert-400 uppercase italic">Call a Professional</h3>
                <ul className="space-y-4">
                  {["Any work near power lines", "Trees/branches leaning toward structures", "Large branches (over 6 inches diameter)", "Any tree removal or stump grinding"].map((li, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium text-content-inverse/80">
                      <AlertTriangle className="w-5 h-5 text-alert-500 shrink-0" /> {li}.
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          </Container>
        </Section>
      </main>
    </>
  );
}
