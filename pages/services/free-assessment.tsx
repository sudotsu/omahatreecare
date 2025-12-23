import { AnimatePresence, motion } from "framer-motion";
import { Award, CheckCircle, Clock, MapPin, Phone, Shield } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

import {
  Alert,
  Button,
  Card,
  Container,
  FormRow,
  Input,
  Section,
  Textarea,
} from "@/components/primitives";
import { CONTACT } from "@/constants";
import { submitLeadForm, validateFormData, type FormSubmissionData } from "@/lib/emailjs";

export default function FreeAssessmentPage() {
  const [showFormTop, setShowFormTop] = useState(false);
  const [showFormMid, setShowFormMid] = useState(false);
  const [showFormBottom, setShowFormBottom] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    issue: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [submittedFrom, setSubmittedFrom] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent, location: string) => {
    e.preventDefault();
    setSubmitMessage(null);
    setSubmittedFrom(location);

    // Prepare data for EmailJS
    const emailData: FormSubmissionData = {
      from_name: formData.name,
      from_phone: formData.phone,
      address: formData.address,
      message: formData.issue || "Free tree assessment request",
      form_location: `Services Free Assessment Page - ${location}`,
    };

    // Validate form data
    const validation = validateFormData(emailData);
    if (!validation.isValid) {
      setSubmitMessage({ type: "error", text: validation.error! });
      return;
    }

    // Submit to EmailJS
    setIsSubmitting(true);
    const result = await submitLeadForm(emailData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitMessage({ type: "success", text: result.message });
      // Clear form on success
      setFormData({ name: "", phone: "", address: "", issue: "" });
      // Hide form after 5 seconds
      setTimeout(() => {
        if (location === "hero") setShowFormTop(false);
        if (location === "mid-page") setShowFormMid(false);
        if (location === "bottom") setShowFormBottom(false);
        setSubmitMessage(null);
      }, 5000);
    } else {
      setSubmitMessage({ type: "error", text: result.message });
    }
  };

  const ContactForm = ({
    onSubmit,
    location,
  }: {
    onSubmit: (e: React.FormEvent, loc: string) => void;
    location: string;
  }) => (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onSubmit={(e) => onSubmit(e, location)}
      className="bg-neutral-100 border-2 border-primary-500 rounded-lg p-6 space-y-4"
    >
      <FormRow>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full"
          disabled={isSubmitting}
        />
      </FormRow>
      <FormRow>
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full"
          disabled={isSubmitting}
        />
      </FormRow>
      <FormRow>
        <Input
          type="text"
          name="address"
          placeholder="Property Address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="w-full"
          disabled={isSubmitting}
        />
      </FormRow>
      <FormRow>
        <Textarea
          name="issue"
          placeholder="What's your tree concern? (e.g., leaning oak, dead branches over garage)"
          value={formData.issue}
          onChange={handleInputChange}
          rows={3}
          className="w-full"
          disabled={isSubmitting}
        />
      </FormRow>

      {submitMessage && submittedFrom === location && (
        <div
          className={`p-4 rounded-lg text-sm font-medium ${
            submitMessage.type === "success"
              ? "bg-primary-100 border-2 border-primary-500 text-primary-900"
              : "bg-alert-100 border-2 border-alert-500 text-alert-900"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full text-lg font-bold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send My Free Assessment Request"}
      </Button>
      <p className="text-xs text-neutral-600 text-center">
        We respond within 24 hours. No spam, no pressure, no charge.
      </p>
    </motion.form>
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Midwest Roots Tree Service",
    description:
      "Professional tree risk assessments and tree care services in Omaha, NE. Same-day free quotes available.",
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Omaha",
      addressRegion: "NE",
      addressCountry: "US",
    },
    areaServed: ["Omaha", "Dundee", "Midtown", "West Omaha", "Elkhorn", "Papillion", "Bellevue"],
    priceRange: "$$",
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <>
      <Head>
        <title>Free Tree Risk Assessment Omaha | Same-Day Quotes | No-Charge Estimates</title>
        <meta
          name="description"
          content="Get a professional tree risk assessment in Omaha at zero cost. Same-day or next-day service available. Expert evaluation of hazardous trees, canopy decline, and storm damage risk. Call or text (402) 812-3294."
        />
        <meta
          name="keywords"
          content="free tree assessment omaha, tree risk evaluation, no charge tree estimate, same day tree quote, arborist consultation omaha"
        />
        <link rel="canonical" href="https://omahatreecare.com/free-assessment" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section - Dark Slab Recipe */}
        <Section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-steel-800 text-white pt-32 pb-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Emergency Badge */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="w-6 h-6 text-alert-500 animate-pulse" aria-hidden="true" />
                <span className="bg-alert-500 text-white py-1 px-4 rounded-full text-sm font-bold tracking-wide">
                  SAME-DAY ASSESSMENTS AVAILABLE
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-50 mb-6 leading-tight text-center">
                No Cost Tree Risk Assessment in Omaha
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-neutral-200 mb-8 text-center max-w-3xl mx-auto">
                Expert evaluation of hazardous trees, canopy decline, and storm damage risk. Free
                quotes within 24 hours. Zero pressure, zero charge.
              </p>

              {/* CTA Buttons - Above Fold */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  {!showFormTop ? (
                    <motion.div
                      key="cta-top"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <Button
                        onClick={() => setShowFormTop(true)}
                        variant="primary"
                        className="w-full text-xl md:text-2xl py-6 font-bold shadow-xl hover:shadow-2xl transition-all"
                      >
                        Give Me A Free Estimate
                      </Button>
                      <div className="text-center text-neutral-300 text-sm font-semibold">OR</div>
                      <a href={`tel:${CONTACT.phoneRaw}`} className="block">
                        <Button
                          variant="emergency"
                          className="w-full text-lg md:text-xl py-5 font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                        >
                          <Phone className="w-6 h-6" aria-hidden="true" />
                          Urgent? Call/Text Andrew
                        </Button>
                      </a>
                      <p className="text-center text-alert-200 text-sm font-semibold mt-2">
                        {CONTACT.phone} - Anytime of the Day
                      </p>
                    </motion.div>
                  ) : (
                    <ContactForm onSubmit={handleSubmit} location="hero" />
                  )}
                </AnimatePresence>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" aria-hidden="true" />
                  <span>ISA Certified Arborists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" aria-hidden="true" />
                  <span>$2M Liability Insurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" aria-hidden="true" />
                  <span>No-Pressure Recommendations</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* What You Get Section - Light Canvas */}
        <Section className="bg-neutral-50 dark:bg-neutral-950 py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                What You Get (100% Free)
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                A comprehensive tree risk evaluation that homeowners insurance companies trust
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-neutral-100 border-neutral-200 p-8 hover:border-primary-500 transition-all">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  Target Rating Analysis
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  We identify what&apos;s at risk if the tree fails: your home, power lines,
                  vehicles, or people. This determines urgency.
                </p>
              </Card>

              <Card className="bg-neutral-100 border-neutral-200 p-8 hover:border-primary-500 transition-all">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  Canopy Decline Assessment
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  We measure live vs. dead canopy ratio, check for dieback patterns, and estimate
                  how much time you have before action is needed.
                </p>
              </Card>

              <Card className="bg-neutral-100 border-neutral-200 p-8 hover:border-primary-500 transition-all">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  Written Recommendations
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  You get a clear, jargon-free report with photos. Keep it, share it with other
                  companies, use it for insurance claims.
                </p>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Local Knowledge Section - Steel Background */}
        <Section className="bg-steel-50 dark:bg-steel-800 py-16">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                  We Know Omaha Trees (And Their Problems)
                </h2>
                <p className="text-xl text-steel-700 dark:text-steel-300">
                  Every neighborhood has different tree species, soil conditions, and risk factors
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-neutral-100 border-steel-200 p-6">
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="w-8 h-8 text-steel-700 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        Dundee/Midtown
                      </h3>
                      <p className="text-sm text-steel-700 dark:text-steel-300">
                        Mature oaks with lever arm issues over slate roofs. We know the canopy
                        decline patterns here and how to prune without destroying tree health.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-neutral-100 border-steel-200 p-6">
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="w-8 h-8 text-steel-700 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        West Omaha
                      </h3>
                      <p className="text-sm text-steel-700 dark:text-steel-300">
                        Emerald Ash Borer (EAB) devastation and volcano mulching damage from
                        landscapers. We&apos;ll tell you if your ash is savable or if it&apos;s time
                        to remove before it falls.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Alert variant="info" className="mt-8 max-w-3xl mx-auto">
                <p className="text-sm text-steel-800 dark:text-steel-200">
                  <strong>Serving:</strong> Dundee, Midtown, Aksarben, West Omaha, Elkhorn, Millard,
                  Papillion, Bellevue, Benson, and all surrounding areas
                </p>
              </Alert>
            </div>
          </Container>
        </Section>

        {/* Mid-Page CTA - Emergency Alert Band */}
        <Section className="bg-gradient-to-br from-alert-600 via-alert-500 to-neutral-900 py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                No-Charge Tree Care Estimates
              </h2>
              <p className="text-xl text-alert-100 mb-8">
                Get your property assessed before the next storm. Zero obligation, zero cost.
              </p>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {!showFormMid ? (
                    <motion.div
                      key="cta-mid"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <Button
                        onClick={() => setShowFormMid(true)}
                        className="w-full bg-white text-alert-600 hover:bg-alert-50 text-xl md:text-2xl py-6 font-bold shadow-xl hover:shadow-2xl transition-all"
                      >
                        Give Me A Free Estimate
                      </Button>
                      <div className="text-center text-alert-100 text-sm font-semibold">OR</div>
                      <a href={`tel:${CONTACT.phoneRaw}`} className="block">
                        <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-lg md:text-xl py-5 font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                          <Phone className="w-6 h-6" aria-hidden="true" />
                          Call/Text Andrew Anytime
                        </Button>
                      </a>
                      <p className="text-center text-white text-base font-bold mt-2">
                        {CONTACT.phone}
                      </p>
                    </motion.div>
                  ) : (
                    <ContactForm onSubmit={handleSubmit} location="mid-page" />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Container>
        </Section>

        {/* Social Proof Section - Light Canvas */}
        <Section className="bg-neutral-50 dark:bg-neutral-950 py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                Why Omaha Homeowners Trust Us
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="bg-neutral-100 border-neutral-200 p-6 text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">24hrs</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Average response time for assessment requests
                </p>
              </Card>

              <Card className="bg-neutral-100 border-neutral-200 p-6 text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">$0</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Cost for risk assessment and written recommendations
                </p>
              </Card>

              <Card className="bg-neutral-100 border-neutral-200 p-6 text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">ISA</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Certified Arborists perform every assessment
                </p>
              </Card>

              <Card className="bg-neutral-100 border-neutral-200 p-6 text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">$2M</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Liability insurance coverage for your peace of mind
                </p>
              </Card>
            </div>
          </Container>
        </Section>

        {/* FAQ Section - Neutral Background */}
        <Section className="bg-neutral-100 dark:bg-neutral-900 py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-12 text-center">
                Common Questions
              </h2>

              <div className="space-y-6">
                <Card className="bg-neutral-50 border-neutral-200 p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    What&apos;s the catch? Why is this free?
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    No catch. We assess your trees for free because we&apos;re confident that if you
                    need work done, you&apos;ll choose us after seeing our professionalism. If you
                    don&apos;t need anything, we&apos;ll tell you that too. We&apos;d rather earn
                    your trust and get a referral later.
                  </p>
                </Card>

                <Card className="bg-neutral-50 border-neutral-200 p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    How long does the assessment take?
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Most residential assessments take 30-45 minutes. We&apos;ll walk your property,
                    measure canopy health, photograph concerning areas, and explain everything in
                    plain English. You&apos;ll get a written summary within 24 hours.
                  </p>
                </Card>

                <Card className="bg-neutral-50 border-neutral-200 p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    Will I be pressured to buy services I don&apos;t need?
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Absolutely not. We&apos;ll give you honest recommendations based on target
                    rating and urgency. If you can wait a year, we&apos;ll tell you. If it&apos;s
                    urgent, we&apos;ll explain why. No pressure, no sales tactics.
                  </p>
                </Card>

                <Card className="bg-neutral-50 border-neutral-200 p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    Do you provide pricing during the assessment?
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Yes. We&apos;ll give you realistic cost ranges based on the work needed. Tree
                    removal typically runs $500-$8,000+ depending on size, location, and complexity.
                    Trimming/pruning is usually $300-$2,500. We don&apos;t quote fixed prices until
                    we see the tree.
                  </p>
                </Card>

                <Card className="bg-neutral-50 border-neutral-200 p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    What if I need emergency service?
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Call or text{" "}
                    <a
                      href={`tel:${CONTACT.phoneRaw}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold underline"
                    >
                      {CONTACT.phone}
                    </a>{" "}
                    immediately. We offer 24/7 emergency response for storm damage, fallen trees,
                    and imminent hazards. We can usually arrive within 2-4 hours for true
                    emergencies.
                  </p>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Bottom CTA - Primary Gradient */}
        <Section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Free Quotes Within 24 Hours
              </h2>
              <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                Get expert tree risk assessment with zero cost and zero obligation. Same-day service
                available.
              </p>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {!showFormBottom ? (
                    <motion.div
                      key="cta-bottom"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <Button
                        onClick={() => setShowFormBottom(true)}
                        className="w-full bg-white text-primary-600 hover:bg-primary-50 text-xl md:text-2xl py-6 font-bold shadow-xl hover:shadow-2xl transition-all"
                      >
                        Give Me A Free Estimate
                      </Button>
                      <div className="text-center text-primary-100 text-sm font-semibold">OR</div>
                      <a href={`tel:${CONTACT.phoneRaw}`} className="block">
                        <Button className="w-full bg-primary-800 hover:bg-primary-900 text-white border-2 border-primary-400 text-lg md:text-xl py-5 font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                          <Phone className="w-6 h-6" aria-hidden="true" />
                          Urgent? Call/Text Andrew
                        </Button>
                      </a>
                      <p className="text-center text-white text-base font-bold mt-2">
                        {CONTACT.phone} - Available Anytime
                      </p>
                    </motion.div>
                  ) : (
                    <ContactForm onSubmit={handleSubmit} location="bottom" />
                  )}
                </AnimatePresence>
              </div>

              <p className="mt-8 text-primary-200 text-sm">
                Serving Omaha, Dundee, Midtown, West Omaha, Elkhorn, Papillion &amp; Bellevue •
                Licensed &amp; Insured • ISA Certified
              </p>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
