import { CONTACT } from "@/constants";
import locationsData from "@/data/locations.json";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface CityHubProps {
  city: string;
  cityName: string;
  neighborhoods: string[];
}

export default function CityHubPage({ city, cityName, neighborhoods }: CityHubProps) {
  const pageTitle = `Tree Service in ${cityName}, NE | ${CONTACT.businessName}`;
  const metaDescription = `Top-rated tree removal and trimming in ${cityName}, Nebraska. Serving all neighborhoods including ${neighborhoods
    .slice(0, 3)
    .map((n) =>
      n
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    )
    .join(", ")}. Free estimates: ${CONTACT.phone}.`;
  const canonicalUrl = `${CONTACT.siteUrl}/locations/${city}`;

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
              "@type": "Service",
              name: `Tree Services in ${cityName}`,
              description: metaDescription,
              provider: {
                "@type": "LocalBusiness",
                "@id": `${CONTACT.siteUrl}/#organization`,
                name: CONTACT.businessName,
                telephone: CONTACT.phone,
                email: CONTACT.email,
              },
              areaServed: {
                "@type": "City",
                name: cityName,
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-stone-100 dark:bg-slate-900">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="mb-8 text-sm">
              <Link href="/" className="hover:text-primary-300 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/locations" className="hover:text-primary-300 transition-colors">
                Locations
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary-300">{cityName}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tree Service in {cityName}, NE</h1>
            <p className="text-xl text-primary-100">
              Professional tree care for all {cityName} neighborhoods
            </p>
          </div>
        </div>

        {/* Neighborhoods Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Neighborhoods We Serve
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {neighborhoods.map((neighborhood) => {
                const neighborhoodName = neighborhood
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <Link
                    key={neighborhood}
                    href={`/locations/${city}/${neighborhood}`}
                    className="block bg-white dark:bg-slate-800 rounded-lg shadow-card p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {neighborhoodName}
                    </h3>
                    <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-2">
                      View Details
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Services Section */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Our Services in {cityName}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/services/tree-removal"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Tree Removal
                  </span>
                </Link>
                <Link
                  href="/services/tree-trimming"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Tree Trimming & Pruning
                  </span>
                </Link>
                <Link
                  href="/services/tree-health-assessment"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Tree Health Assessment
                  </span>
                </Link>
                <Link
                  href="/services/winter-tree-prep"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Winter Tree Prep
                  </span>
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Serving {cityName} Since Day One</h2>
              <p className="mb-6 text-primary-100">
                Local experts who know your neighborhood&apos;s trees
              </p>
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cities = Object.keys(locationsData);

  return {
    paths: cities.map((city) => ({
      params: { city },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CityHubProps> = async ({ params }) => {
  const city = params?.city as string;
  const neighborhoods = locationsData[city as keyof typeof locationsData];

  if (!neighborhoods) {
    return {
      notFound: true,
    };
  }

  const cityName = city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    props: {
      city,
      cityName,
      neighborhoods,
    },
  };
};
