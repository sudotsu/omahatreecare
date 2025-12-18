import { Head, Html, Main, NextScript } from 'next/document'

/**
 * Next.js Document Component
 * Extracted from index.html
 *
 * Key elements migrated:
 * - GTM script tags (head and noscript)
 * - Dark mode initialization script (blocking script to prevent FOUC)
 * - SeoJuice script (deferred)
 * - FAQPage and HowTo schema (global structured data)
 */

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager - from index.html lines 4-10 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KX63X3X4');`,
          }}
        />

        {/* Google Fonts - Preconnect and Load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Dark Mode Script - BLOCKING to prevent FOUC */}
        {/* From index.html lines 11-23 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var savedMode = localStorage.getItem('darkMode');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
            `,
          }}
        />

        {/* FAQPage Schema - from index.html lines 41-96 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How do I know if my tree is dangerous?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Use our free tree diagnostic tool to assess risk factors including: visible decay or cavities, dead branches larger than 2 inches, trunk cracks, leaning more than 15 degrees, fungal growth at the base, or proximity to structures within falling distance. The tool provides an instant risk assessment based on ISA arborist standards.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How much does tree removal cost in Omaha?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'In Omaha, tree removal costs typically range from $500-$1,500 for small trees (under 30ft), $1,500-$3,500 for medium trees (30-60ft), and $3,500-$7,000+ for large trees (over 60ft). Hazardous trees near structures or requiring crane access cost more. Use our diagnostic tool for a personalized estimate based on your tree\'s specific conditions.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is Emerald Ash Borer (EAB) and should I treat my ash tree in Omaha?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Emerald Ash Borer is an invasive insect that has killed millions of ash trees across Nebraska, including Omaha. If your ash tree is healthy and valuable (large, well-positioned), treatment costs $150-$400 every 2-3 years and is 95% effective. If the tree shows more than 30% canopy decline, removal is more cost-effective than treatment. Our diagnostic tool helps you decide.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'When is the best time to remove a tree in Omaha?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'In Omaha, late fall through early spring (November-March) is ideal for tree removal when trees are dormant, ground is often frozen for equipment access, and there\'s less landscape damage. However, hazardous trees should be removed immediately regardless of season. Prices may be lower in winter due to reduced demand.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I remove a tree myself or do I need a professional?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Only attempt DIY removal for small trees (under 15ft) with no nearby structures, power lines, or other obstacles. Hire a professional for: trees over 15ft tall, trees near buildings or power lines, trees leaning toward structures, dead or diseased trees (unpredictable falls), or if you lack proper equipment and insurance. Most homeowner injuries occur during DIY tree work.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How accurate is the free tree diagnostic tool?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The diagnostic tool is based on ISA (International Society of Arboriculture) arborist standards and considers Omaha-specific factors like EAB prevalence, soil conditions, and climate. It provides reliable risk assessment and cost estimates for 80-90% of common scenarios. For complex situations, the tool recommends a professional on-site inspection.',
                  },
                },
              ],
            }),
          }}
        />

        {/* HowTo Schema - from index.html lines 98-126 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to Assess Your Tree\'s Risk Level',
              description: 'Step-by-step guide to assessing tree risk and determining next steps for your Omaha trees',
              step: [
                {
                  '@type': 'HowToStep',
                  name: 'Describe Your Tree',
                  text: 'Answer questions about tree species, size, health indicators, and location relative to structures',
                  url: 'https://omahatreecare.com/tools',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Get Instant Risk Assessment',
                  text: 'Receive a risk level classification (low, moderate, high, or extreme) based on ISA arborist standards',
                  url: 'https://omahatreecare.com/tools',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Review Recommendations and Cost Estimates',
                  text: 'Get clear next steps with realistic cost ranges specific to Omaha tree service market',
                  url: 'https://omahatreecare.com/tools',
                },
              ],
              totalTime: 'PT10M',
            }),
          }}
        />

        {/* SeoJuice Script - from index.html line 136 */}
        <script type="text/javascript" src="https://cdn.seojuice.io/suggestions.v1.js" defer />
      </Head>

      <body>
        {/* Google Tag Manager (noscript) - from index.html lines 129-132 */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KX63X3X4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
