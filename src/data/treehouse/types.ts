export type CategorySlug =
  | "homeowner-guides"
  | "field-notes"
  | "tree-profiles";

export type ArticleStatus = "draft" | "published";

export type PublicationEvidence = {
  bylineApproved: boolean;
  featuredImageApproved: boolean;
  sourcesVerifiedOn?: string;
  safetyReview?: {
    reviewerName: string;
    credential: string;
    reviewedOn: string;
  };
};

export type InternalLink = {
  label: string;
  href: string;
  description?: string;
};

export type SourceReference = {
  title: string;
  organization: string;
  url: string;
  accessedDate?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
  sourceUrl?: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; id: string; text: string }
  | { type: "list"; style?: "bulleted" | "numbered"; items: string[] }
  | { type: "takeaway"; text: string }
  | { type: "safety"; title?: string; text: string }
  | { type: "tool-cta"; title: string; text: string; link: InternalLink }
  | { type: "service-cta"; title: string; text: string; link: InternalLink }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "example"; text: string }
  | { type: "quote"; quote: string; attribution?: string }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string; width: number; height: number }
  | { type: "source-note"; label: string; url: string };

export type TreehouseArticle = {
  id: string;
  slug: string;
  status: ArticleStatus;
  publication: PublicationEvidence;
  title: string;
  cardTitle: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  directAnswer: string;
  category: CategorySlug;
  tags: string[];
  author: {
    name: string;
    role?: string;
    profileUrl?: string;
    bio?: string;
    photo?: string;
  };
  datePublished?: string;
  dateModified?: string;
  readingTime: number;
  featured: boolean;
  featuredImage?: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  };
  relatedTools: InternalLink[];
  relatedServices: InternalLink[];
  relatedArticles: InternalLink[];
  sources: SourceReference[];
  faq: FAQItem[];
  body: ContentBlock[];
};
