'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { CONTACT } from '@/constants';
import { Section, Container, Card, Button } from '@/components/primitives';

export default function AccessibilityPage() {
  const pageTitle = `Accessibility Statement | ${CONTACT.businessName}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Our commitment to digital accessibility at ${CONTACT.businessName}.`} />
      </Head>

      <main className="min-h-screen bg-surface-warm dark:bg-surface-dark py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-content-muted hover:text-brand-primary transition mb-8 font-bold uppercase text-xs tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Return Home
            </Link>

            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-content-heading dark:text-content-inverse uppercase italic tracking-tighter mb-4 leading-none">
                Accessibility <span className="text-brand-primary">Statement</span>
              </h1>
              <p className="text-lg text-content-body dark:text-content-muted font-medium leading-relaxed">
                <strong>{CONTACT.businessName}</strong> is committed to ensuring digital accessibility for people with disabilities [1]. We are continually improving the user experience for everyone and applying the relevant accessibility standards [2].
              </p>
            </header>

            <div className="space-y-12">
              {/* Conformance Status */}
              <Card variant="feature" className="p-8 border-neutral-200 dark:border-neutral-800 shadow-xl">
                <h2 className="text-xl font-black text-content-heading dark:text-content-inverse uppercase italic mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" /> Conformance Status
                </h2>
                <p className="text-content-muted dark:text-content-muted text-sm leading-relaxed">
                  The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility.
                  <strong> {CONTACT.businessName}</strong> is partially conformant with WCAG 2.1 level AA [2, 3].
                </p>
              </Card>

              {/* Technical Specs */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-content-heading dark:text-content-inverse uppercase italic">Technical Specs</h2>
                  <ul className="space-y-2 text-sm font-bold text-content-muted uppercase tracking-tight">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full" /> HTML & WAI-ARIA</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full" /> CSS & JavaScript</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-black text-content-heading dark:text-content-inverse uppercase italic">Feedback</h2>
                  <div className="space-y-3">
                    <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-center gap-3 text-content-body dark:text-content-muted hover:text-brand-primary transition text-sm font-medium">
                      <Phone className="w-4 h-4" /> {CONTACT.phone}
                    </a>
                    <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-content-body dark:text-content-muted hover:text-brand-primary transition text-sm font-medium">
                      <Mail className="w-4 h-4" /> {CONTACT.email}
                    </a>
                    <div className="flex items-start gap-3 text-content-body dark:text-content-muted text-sm font-medium">
                      <MapPin className="w-4 h-4 shrink-0" /> <span>Serving Omaha, NE & Surrounding Areas</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Known Limitations */}
              <Card variant="feature" className="bg-surface-dark text-content-inverse p-8 border-none shadow-2xl">
                <h2 className="text-xl font-black uppercase italic mb-4 text-brand-primary">Known Limitations</h2>
                <p className="text-content-inverse/70 text-sm leading-relaxed mb-4 font-medium">
                  Despite our best efforts, some interactive third-party tools (like maps or external widgets) may not be fully accessible as they are controlled by external providers [4, 5].
                </p>
                <p className="text-xs font-black text-content-inverse/40 uppercase tracking-widest italic">
                  We try to respond to feedback within 2 business days [3].
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
