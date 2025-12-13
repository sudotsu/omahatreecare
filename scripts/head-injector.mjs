import { load } from "cheerio";
import fs from "fs/promises";
import path from "path";

const DIST = "./dist";
const SITE = "https://omahatreecare.com";

async function getHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function clamp(text, max) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() : text;
}

function computeCanonical(filePath) {
  const rel = path.relative(DIST, filePath).replace(/\\/g, "/");
  const siteBase = SITE.replace(/\/+$/, "");

  if (rel === "index.html") {
    return `${siteBase}/`;
  }

  let slug = rel.replace(/\.html$/, "");
  if (slug.endsWith("/index")) {
    slug = slug.slice(0, -6);
  }

  const normalizedPath = slug.replace(/^\/+/, "");
  return normalizedPath ? `${siteBase}/${normalizedPath}` : `${siteBase}/`;
}

function ensureSingle(head, selector) {
  const matches = head.find(selector);
  if (!matches.length) return null;
  matches.slice(1).remove();
  return matches.first();
}

function ensureMeta($, head, selector, attributes) {
  let tag = ensureSingle(head, selector);
  if (!tag) {
    tag = $("<meta>");
    head.append(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      tag.attr(key, value);
    }
  });
  return tag;
}

function ensureCanonical($, head, href) {
  let link = ensureSingle(head, 'link[rel="canonical"]');
  if (!link) {
    link = $("<link rel=\"canonical\">");
    head.append(link);
  }
  link.attr("href", href);
}

function ensureOgTag($, head, property, content) {
  if (content === undefined || content === null) return;
  let meta = ensureSingle(head, `meta[property="${property}"]`);
  if (!meta) {
    meta = $("<meta>");
    head.append(meta);
  }
  meta.attr("property", property);
  meta.attr("content", content);
}

function removeViteFavicon($) {
  const icons = $('link[rel="icon"]');
  let removed = 0;
  icons.each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.includes("vite.svg")) {
      $(el).remove();
      removed += 1;
    }
  });
  return removed;
}

async function processFile(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const doctypeMatch = raw.match(/<!doctype [^>]*>/i);
  const $ = load(raw, { decodeEntities: false });
  const head = $("head");

  const canonical = computeCanonical(filePath);
  const titleText = clamp($("title").first().text().trim() || deriveTitleFromPath(filePath), 60);

  const metaDescTag = head.find('meta[name="description"]').first();
  let metaDesc = (metaDescTag.attr("content") || "").trim();
  if (!metaDesc || metaDesc.length < 80) {
    const h1Text = $("h1").first().text().trim();
    const fallback = h1Text ? `${h1Text} | Omaha Tree Care` : "Omaha Tree Care";
    metaDesc = clamp(fallback, 155);
  }
  ensureMeta($, head, 'meta[name="description"]', { name: "description", content: metaDesc });

  ensureOgTag($, head, "og:type", "website");
  ensureOgTag($, head, "og:title", titleText);
  ensureOgTag($, head, "og:description", metaDesc);
  ensureOgTag($, head, "og:url", canonical);
  const existingOgImage = head.find('meta[property="og:image"]');
  if (!existingOgImage.length) {
    ensureOgTag($, head, "og:image", "/og-image.jpg");
  }

  ensureCanonical($, head, canonical);

  removeViteFavicon($);
  if (!$('link[rel="icon"]').length) {
    head.prepend('<link rel="icon" href="/favicon.ico" />');
  }

  const htmlOutput = `${doctypeMatch ? `${doctypeMatch[0]}\n` : "<!doctype html>\n"}${$.html()}`;
  await fs.writeFile(filePath, htmlOutput, "utf8");

  const missingDesc = head.find('meta[name="description"]').length === 0;
  const viteRefs = head.find('link[rel="icon"][href*="vite.svg"]').length;
  return { missingDesc, viteRefs };
}

function deriveTitleFromPath(filePath) {
  const rel = path.relative(DIST, filePath).replace(/\\/g, "/").replace(/\.html$/, "");
  const parts = rel.split(/[\/]+/).filter(Boolean);
  if (!parts.length) return "Omaha Tree Care";
  const last = parts[parts.length - 1];
  const human = last.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return `${human} | Omaha Tree Care`;
}

async function main() {
  try {
    await fs.access(DIST);
  } catch (err) {
    console.warn(`[head-injector] Dist path not found: ${DIST}`);
    return;
  }

  const htmlFiles = await getHtmlFiles(DIST);
  let pagesUpdated = 0;
  let missingDescriptions = 0;
  let viteIconRefs = 0;

  for (const file of htmlFiles) {
    const { missingDesc, viteRefs } = await processFile(file);
    pagesUpdated += 1;
    if (missingDesc) missingDescriptions += 1;
    viteIconRefs += viteRefs;
  }

  console.log(`[head-injector] Processed ${pagesUpdated} page(s).`);
  console.log(`[head-injector] Pages missing meta descriptions after processing: ${missingDescriptions}.`);
  console.log(`[head-injector] Favicon references to vite.svg remaining: ${viteIconRefs}.`);
}

main().catch((err) => {
  console.error("[head-injector] Error:", err);
});