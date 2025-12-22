'use client';

import React from 'react';
import Head from 'next/head';
import { AlertTriangle, Clock, Phone, ShieldAlert, CheckCircle, FileText, Camera } from 'lucide-react';
import { CONTACT } from '@/constants';
import { Section, Container, Card, Grid, Button } from '@/components/primitives';

export default function EmergencyTreeService() {
  const pageTitle = "24/7 Emergency Tree Service Omaha | Storm Damage Removal";
  const metaDescription = `Urgent tree removal and storm damage cleanup in Omaha. 24-hour emergency response for hazardous trees. Call ${CONTACT.phone} immediately.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {/* Specific Schema for Emergency Service to capture "emergency tree removal" intent */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Emergency Tree Removal",
          "provider": { "@type": "LocalBusiness", "name": CONTACT.businessName },
          "areaServed": "Omaha, NE",
          "availableChannel": { "@type": "ServiceChannel", "serviceUrl": CONTACT.siteUrl, "telephone": CONTACT.phoneRaw }
        })}} />
      </Head>

      <main className="min-h-screen bg-surface-primary dark:bg-surface-dark">
        {/* Urgent Hero Section */}
        <Section variant="dark" className="bg-brand-accent py-16">
          <Container className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest animate-pulse">
              <Clock className="w-4 h-4" /> 24/7 Emergency Response Available
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
              Emergency Tree <span className="text-red-200">Removal</span>
            </h1>
            <p className="text-xl font-medium max-w-2xl mx-auto opacity-90 text-white">
              Tree on your house? Driveway blocked? We prioritize safety hazards and storm damage across Omaha.
            </p>
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Button
                variant="emergency"
                size="lg"
                className="bg-white text-brand-accent hover:bg-white/90 font-black py-5 px-10 rounded-2xl text-2xl shadow-2xl transform hover:scale-105"
              >
                <span>Call Now: {CONTACT.phone}</span>
                <span className="block text-xs uppercase tracking-widest opacity-70">Click to call 24/7</span>
              </Button>
            </a>
          </Container>
        </Section>

        {/* Triage & Protocol Section */}
        <Section className="py-20">
          <Container>
            <Grid cols={1} mdCols={2} gap="xl">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-6">What We Prioritize</h2>
                  <div className="space-y-4">
                    {[
                      { title: "Structural Impact", desc: "Trees fallen on roofs, siding, or breaking windows", icon: ShieldAlert },
                      { title: "Blocked Access", desc: "Driveways, garage doors, or main entryways blocked by debris", icon: AlertTriangle },
                      { title: "Immediate Hazard", desc: "Hanging limbs ('widowmakers') threatening safety or lines", icon: Clock }
                    ].map((item, i) => (
                      <Card key={i} className="flex gap-4 p-4 bg-surface-warm/50 dark:bg-surface-dark/50 border-neutral-100 dark:border-neutral-800">
                        <item.icon className="w-6 h-6 text-brand-accent shrink-0" />
                        <div>
                          <h3 className="font-bold text-content-heading dark:text-content-inverse uppercase italic text-sm">{item.title}</h3>
                          <p className="text-content-body dark:text-content-muted text-sm">{item.desc}.</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-brand-accent/5 dark:bg-brand-accent/10 rounded-3xl border-2 border-brand-accent/20">
                  <h3 className="font-black uppercase italic text-brand-accent mb-2">Response Protocol</h3>
                  <p className="text-sm text-content-body dark:text-content-muted font-medium">
                    We triage calls based on severity. Structural damage and safety risks come first. Emergency rates apply for after-hours and holiday service calls.
                  </p>
                </div>
              </div>

              {/* Insurance Claims Assistance */}
              <Card variant="feature" className="bg-content-heading text-content-inverse p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8 border-none">
                <h2 className="text-3xl font-black uppercase italic leading-none">Insurance Claims <br /><span className="text-brand-primary text-xl">Assistance Included</span></h2>
                <p className="text-content-inverse/70 font-medium">
                  Dealing with storm damage is stressful. We help streamline your homeowner&apos;s insurance claim with professional documentation.
                </p>
                <div className="space-y-6">
                  {[
                    { step: "Step 1", title: "Safety Stabilization", desc: "Removing the immediate threat to prevent further damage.", icon: ShieldAlert },
                    { step: "Step 2", title: "Photo Documentation", desc: "Comprehensive photos and itemized invoicing for adjusters.", icon: Camera },
                    { step: "Step 3", title: "Full Clean-up", desc: "Complete debris haul-away once the property is safe.", icon: CheckCircle }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-content-inverse uppercase text-xs tracking-widest">{item.step}: {item.title}</h4>
                        <p className="text-sm text-content-inverse/60 font-medium">{item.desc}.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Grid>
          </Container>
        </Section>
      </main>
    </>
  );
}
