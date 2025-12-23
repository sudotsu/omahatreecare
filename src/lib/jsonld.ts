/**
 * JSON-LD Helper Utilities
 *
 * Provides safe serialization of JSON-LD structured data for use in dangerouslySetInnerHTML.
 * All user-controlled or dynamic fields are sanitized to prevent XSS attacks.
 */

/**
 * Sanitizes a string value for safe inclusion in JSON-LD.
 * Escapes characters that could break out of JSON context or enable XSS.
 *
 * @param value - The string to sanitize
 * @returns Sanitized string safe for JSON-LD
 */
function sanitizeJsonLdString(value: string | undefined | null): string {
  if (!value) return "";

  return (
    String(value)
      // Remove any script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      // Escape HTML entities
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      // Remove null bytes and other control characters
      .replace(/[\x00-\x1F\x7F]/g, "")
      // Trim whitespace
      .trim()
  );
}

/**
 * Recursively sanitizes all string values in an object for JSON-LD.
 *
 * @param obj - The object to sanitize
 * @returns Sanitized object
 */
function sanitizeJsonLdObject(obj: any): any {
  if (typeof obj === "string") {
    return sanitizeJsonLdString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeJsonLdObject(item));
  }

  if (obj !== null && typeof obj === "object") {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeJsonLdObject(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
}

/**
 * Creates a safe JSON-LD string for use in dangerouslySetInnerHTML.
 * Sanitizes all string values to prevent XSS attacks.
 *
 * @param schema - The JSON-LD schema object
 * @returns Safe, pre-serialized JSON-LD string
 *
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: makeJsonLd(schemaObject) }}
 * />
 * ```
 */
export function makeJsonLd(schema: Record<string, any>): string {
  // Sanitize all string values in the schema
  const sanitizedSchema = sanitizeJsonLdObject(schema);

  // Serialize to JSON with proper formatting
  return JSON.stringify(sanitizedSchema, null, 0);
}

/**
 * Validates that a schema object has required JSON-LD fields.
 *
 * @param schema - The schema object to validate
 * @returns True if valid, false otherwise
 */
export function validateJsonLdSchema(schema: Record<string, any>): boolean {
  // Must have @context and @type
  if (!schema["@context"] || !schema["@type"]) {
    console.warn("JSON-LD schema missing required @context or @type");
    return false;
  }

  return true;
}

/**
 * Creates a LocalBusiness JSON-LD schema with sanitized values.
 *
 * @param params - Business parameters
 * @returns Safe JSON-LD string
 */
export function makeLocalBusinessJsonLd(params: {
  name: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  url?: string;
  priceRange?: string;
  areaServed?: string | string[];
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: params.name,
    ...(params.description && { description: params.description }),
    ...(params.telephone && { telephone: params.telephone }),
    ...(params.email && { email: params.email }),
    ...(params.url && { url: params.url }),
    ...(params.priceRange && { priceRange: params.priceRange }),
    ...(params.address && {
      address: {
        "@type": "PostalAddress",
        ...params.address,
      },
    }),
    ...(params.areaServed && { areaServed: params.areaServed }),
  };

  return makeJsonLd(schema);
}

/**
 * Creates a Service JSON-LD schema with sanitized values.
 *
 * @param params - Service parameters
 * @returns Safe JSON-LD string
 */
export function makeServiceJsonLd(params: {
  serviceType: string;
  provider: {
    name: string;
    telephone?: string;
    email?: string;
  };
  areaServed?: string;
  description?: string;
  availableChannel?: any;
  openingHours?: string;
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.serviceType,
    provider: {
      "@type": "LocalBusiness",
      ...params.provider,
    },
    ...(params.areaServed && { areaServed: params.areaServed }),
    ...(params.description && { description: params.description }),
    ...(params.availableChannel && { availableChannel: params.availableChannel }),
    ...(params.openingHours && { openingHours: params.openingHours }),
  };

  return makeJsonLd(schema);
}
