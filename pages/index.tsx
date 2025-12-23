<<<<<<< Updated upstream
'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Phone, Shield, CheckCircle, MapPin, Users,
  Award, ArrowRight, Clock, Star
} from 'lucide-react';
import { CONTACT, TRUST_SIGNALS } from '@/constants';
import ContactForm from '@/components/ContactForm';
import { Button, Card, Badge, Section, Container, Grid } from '@/components/primitives';

/**
 * Homepage - The high-conversion entry point for Midwest Roots.
 * Merges general Omaha tree service SEO with the new diagnostic tool routing.
 */
export default function HomePage() {
  const pageTitle = `Professional Tree Service Omaha | ${TRUST_SIGNALS.certificationShort} | Midwest Roots`;
  const metaDescription = "Expert tree removal, trimming, and winter prep in Omaha. 24/7 emergency service. ISA Certified Arborists on staff. Licensed & insured.";

  const services = [
    { name: 'Tree Removal', slug: 'tree-removal', description: 'Safe removal of hazardous trees with professional care' },
    { name: 'Tree Trimming & Pruning', slug: 'tree-trimming', description: 'Structural pruning following ANSI A300 standards' },
    { name: 'Tree Health Assessment', slug: 'tree-health-assessment', description: 'Expert evaluation with no-pressure recommendations' },
    { name: 'Winter Tree Prep', slug: 'winter-tree-prep', description: 'Weight reduction pruning to prevent ice storm damage' },
  ];

  const neighborhoods = ['Dundee', 'Millard', 'Elkhorn', 'Benson', 'Papillion', 'Bellevue'];
=======
import { Award, CheckCircle, MapPin, Phone, Shield, Users } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { Card, Section } from "../src/components/primitives";
import { CONTACT } from "../src/constants";

/**
 * Renders the Omaha Tree Care homepage with primary CTAs, core services, and local trust sections.
 * @returns The homepage JSX.
 */
export default function HomePage() {
  const services = [
    {
      name: "Tree Removal",
      slug: "tree-removal",
      description: "Safe removal of hazardous trees with zero property damage guarantee",
    },
    {
      name: "Tree Trimming & Pruning",
      slug: "tree-trimming",
      description: "Structural pruning following ANSI A300 standards",
    },
    {
      name: "Tree Health Assessment",
      slug: "tree-health-assessment",
      description: "Free expert evaluation with no-pressure recommendations",
    },
    {
      name: "Winter Tree Prep",
      slug: "winter-tree-prep",
      description: "Weight reduction pruning to prevent ice storm damage",
    },
  ];

  const neighborhoods = ["Dundee", "Millard", "Elkhorn", "Benson", "Papillion", "Bellevue"];
>>>>>>> Stashed changes

  return (
    <>
      <Head>
<<<<<<< Updated upstream
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
                  <span className="text-brand-accent font-black tracking-widest uppercase text-sm">24/7 Emergency Service Available</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.9] tracking-tighter text-white">
                  Winter Defense <br />
                  <span className="text-brand-primary">For Omaha Trees</span>
                </h1>
                <p className="text-xl md:text-2xl text-content-inverse/80 max-w-xl font-medium">
                  Protect your property from ice storm damage. Structural pruning and {TRUST_SIGNALS.certificationShort} assessments for local homeowners [2, 4].
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="emergency"
                    size="lg"
                    className="group"
                    onClick={() => window.location.href = `tel:${CONTACT.phoneRaw}`}
                  >
                    <Phone size={24} className="group-hover:animate-bounce" /> Emergency: {CONTACT.phone}
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
                <Card variant="feature" className="p-8 md:p-10 rounded-[3rem] shadow-2xl border-t-8 border-brand-primary">
                  <h2 className="text-3xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-1">Request a Quote</h2>
                  <p className="text-content-muted mb-8 font-medium">Get a Response Within 3 Hours [3].</p>
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
              <h2 className="text-4xl md:text-5xl font-black text-content-heading dark:text-content-inverse uppercase italic tracking-tighter">Omaha Tree Experts</h2>
              <p className="text-xl text-content-body dark:text-content-muted max-w-3xl mx-auto font-medium">
                From emergency removal to preventive care, we handle the Omaha canopy with {TRUST_SIGNALS.certificationShort} precision [5].
              </p>
            </div>

            <Grid cols={1} mdCols={2} lgCols={4} gap="md">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                  <Card hover className="h-full p-8 rounded-[2rem] border-neutral-100 dark:border-neutral-800">
                    <CheckCircle className="w-10 h-10 text-brand-primary mb-6" />
                    <h3 className="text-xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-3">{service.name}</h3>
                    <p className="text-sm text-content-body dark:text-content-muted leading-relaxed mb-6 font-medium">{service.description} [4, 6].</p>
                    <span className="text-brand-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <div key={area} className="flex items-center gap-2 text-content-muted font-black uppercase tracking-widest text-sm">
                  <MapPin className="w-4 h-4" /> {area}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
=======
        <title>Omaha Tree Care | Expert Tree Services in Omaha, NE</title>
        <meta
          name="description"
          content="ISA-certified Omaha tree service specializing in hazardous removals, pruning, and emergency storm work. Local experts who treat your trees like our own."
        />
      </Head>

      {/* HERO */}
      <Section variant="dark" className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary-300 mb-3">
              Omaha&apos;s hazardous tree specialists
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              From emergency removal to preventive care, we handle the trees other companies
              won&apos;t touch.
            </h1>
            <p className="text-base md:text-lg text-content-inverse/90 mb-8 max-w-xl">
              ISA-certified arborists serving Omaha neighborhoods with safe removals, structural
              pruning, and honest assessments. No scare tactics. No upsells. Just straight answers
              and clean work.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/free-tree-assessment-omaha"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition"
              >
                Get a free tree assessment
              </Link>
              <Link
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-flex items-center text-sm font-semibold text-content-inverse hover:text-primary-200 transition"
              >
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                24/7 Emergency: {CONTACT.phone}
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs md:text-sm text-content-inverse/80">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-300" aria-hidden="true" />
                ISA Certified Arborists
              </span>
              <span className="inline-flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-300" aria-hidden="true" />
                Fully insured up to $2M
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-300" aria-hidden="true" />
                Omaha owned &amp; operated
              </span>
            </div>
          </div>

          <Card className="bg-surface-primary/95 border border-neutral-200 shadow-md">
            <h2 className="text-lg font-semibold text-content-heading mb-4">
              Get a free tree assessment
            </h2>
            <p className="text-sm text-content-body mb-4">
              Send a few photos and a brief description. A certified arborist will review and
              respond within 1 business day.
            </p>
            <ul className="text-sm text-content-body space-y-1 mb-4">
              <li>• Hazardous or leaning trees</li>
              <li>• Branches over roofs, driveways, or power lines</li>
              <li>• Storm damage or emergency work</li>
            </ul>
            <Link
              href="/free-tree-assessment-omaha"
              className="inline-flex items-center justify-center w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition"
            >
              Start assessment
            </Link>
          </Card>
        </div>
      </Section>

      {/* CORE SERVICES */}
      <Section variant="default">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-content-heading mb-2">
                Core tree services
              </h2>
              <p className="text-sm md:text-base text-content-body">
                From removals to structural pruning, every visit is led by an ISA-certified arborist
                and a crew that actually cleans up.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden md:inline-flex text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all services →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.slug}>
                <h3 className="text-lg font-semibold text-content-heading mb-2">{service.name}</h3>
                <p className="text-sm text-content-body mb-3">{service.description}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  Learn more →
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link
              href="/services"
              className="inline-flex text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all services →
            </Link>
          </div>
        </div>
      </Section>

      {/* TRUST / LOCAL PROOF */}
      <Section variant="warm">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-content-heading mb-2">
              Local experts who know your neighborhood&apos;s trees
            </h2>
            <p className="text-sm md:text-base text-content-body">
              From Dundee cottonwoods to Millard maples, we work in your streets every week. We know
              how Omaha storms hit and which trees fail first.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Service Areas */}
            <Card>
              <MapPin className="w-8 h-8 text-content-body mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold text-content-heading mb-4">Service Areas</h3>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="text-xs bg-neutral-100 text-content-muted px-2 py-1 rounded"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <Link
                href="/locations"
                className="inline-block mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold"
              >
                See all areas →
              </Link>
            </Card>

            {/* Certified & Insured */}
            <Card>
              <Award className="w-8 h-8 text-content-body mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold text-content-heading mb-4">
                Certified &amp; Insured
              </h3>
              <ul className="space-y-2 text-sm text-content-body">
                <li>• ISA Certified Arborists</li>
                <li>• Licensed &amp; Bonded</li>
                <li>• $2M Liability Insurance</li>
              </ul>
            </Card>

            {/* Omaha Owned & Operated */}
            <Card>
              <Users className="w-8 h-8 text-content-body mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold text-content-heading mb-4">
                Omaha Owned &amp; Operated
              </h3>
              <p className="text-sm text-content-body mb-4">
                We live in the neighborhoods we serve. Your trees are our trees.
              </p>
              <p className="text-sm text-content-body">
                <strong>Contact:</strong> {CONTACT.email}
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* EMERGENCY CTA */}
      <Section variant="default">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-content-heading mb-3">
              Storm damage or a tree that suddenly looks dangerous?
            </h2>
            <p className="text-sm md:text-base text-content-body mb-4">
              If a tree is leaning, cracked, or already on the ground, don&apos;t wait. We
              prioritize hazardous situations and can often respond same day.
            </p>
            <ul className="text-sm text-content-body space-y-2 mb-4">
              <li>• Branches on roofs, garages, or vehicles</li>
              <li>• Trees uprooted or leaning after high winds</li>
              <li>• Limbs tangled in power or service lines (we coordinate with utilities)</li>
            </ul>
            <p className="text-xs text-content-muted">
              If anyone is in immediate danger, call 911 first. Then call us to secure the site and
              remove the tree safely.
            </p>
          </div>

          <Card className="border border-amber-300 bg-amber-50">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-amber-600" aria-hidden="true" />
              <div>
                <h3 className="text-base font-semibold text-content-heading">
                  24/7 Emergency Line
                </h3>
                <p className="text-xs text-content-body">
                  You&apos;ll speak directly with an arborist, not a call center.
                </p>
              </div>
            </div>
            <Link
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-flex items-center justify-center w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition mb-3"
            >
              Call {CONTACT.phone}
            </Link>
            <p className="text-xs text-content-muted">
              If we&apos;re on another site, leave a voicemail with your address, a brief
              description, and photos if possible. We monitor this line after hours during storms.
            </p>
          </Card>
        </div>
      </Section>
>>>>>>> Stashed changes
    </>
  );
}
