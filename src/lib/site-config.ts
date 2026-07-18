/** Bounded business configuration. Tool rules stay independent of this object. */
export const siteConfig = {
  business: {
    name: "Midwest Roots Tree Services",
    phone: "(402) 812-3294",
    phoneRaw: "+14028123294",
    email: "andrew@omahatreecare.com",
    siteUrl: "https://omahatreecare.com",
    address: "5634 Corby St # 1, Omaha, NE 68104-4128",
    streetAddress: "5634 Corby St # 1",
    addressLocality: "Omaha",
    addressRegion: "NE",
    postalCode: "68104-4128",
    addressCountry: "US",
    latitude: 41.28431,
    longitude: -96.00133,
  },
  leadRouting: {
    endpoint: "/api/leads",
    retentionMonths: 12,
    accessRoles: ["owner", "explicitly authorized operator"],
  },
  serviceAreas: ["Omaha", "Dundee", "Millard", "Elkhorn", "Gretna", "Papillion", "Bellevue", "Bennington", "Ralston"],
  pricing: {
    locale: "Omaha area",
    status: "uncalibrated broad planning ranges",
    reviewOwner: "Midwest Roots owner",
  },
  toolCopy: {
    hazardName: "Tree Hazard Screening",
    speciesName: "Tree Species Matching Guide",
    costName: "Tree-Service Cost Planning Guide",
    diyName: "DIY or Professional Decision Guide",
    ailmentsName: "Common Tree Ailments Reference",
  },
  analytics: {
    acceptedLeadIsSourceOfTruth: true,
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  },
  authority: {
    hazardDisclaimer: "This preliminary screening uses only the observations you report. It is not an on-site inspection, diagnosis, or certification.",
    professionalReviewGate: "Safety-sensitive content should receive independent review by an appropriately credentialed tree professional before release.",
  },
  features: {
    pwa: false,
    photoUpload: false,
    managedEmbedPilot: false,
  },
} as const;
