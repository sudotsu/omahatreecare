# Codex Kickoff Instructions

Use the accompanying files as the source of truth for the Treehouse MVP:

1. `01-treehouse-build-brief.md`
2. `02-first-article-tree-removal-cost-omaha.md`

You also have access to the existing Midwest Roots Tree Services codebase.

## First Steps

1. Inspect the repository before changing architecture.
2. Identify the framework, routing conventions, content system, design tokens, reusable components, SEO utilities, sitemap setup, and deployment workflow.
3. Confirm the real routes for:
   - Tree-removal service
   - Cost-planning tool
   - Hazard-screening tool
   - Tree-species guide
   - DIY-versus-professional guide, if present
   - Estimate or contact page
4. Review the current site’s brand colors, typography, spacing, buttons, navigation, footer, forms, and card styles.
5. Implement The Treehouse as an extension of the existing site rather than a separate redesign.

## Article Instruction

Use `02-first-article-tree-removal-cost-omaha.md` as the first production Treehouse entry.

Do not rewrite, shorten, or invent business claims unless:

- Formatting requires a structural adjustment
- A factual conflict is found
- The existing site contradicts a proposed service or route
- A statement requires owner verification before publication

Convert the article into the structured content format created for The Treehouse. Integrate it with the correct existing tool, service, and estimate routes.

Flag placeholders that require:

- Real author details
- Author photograph
- Publication date
- Updated date
- Original images
- Verified credentials
- Logo URL
- Canonical URL
- Business-specific service confirmation

## Required Deliverables

Build:

- `/treehouse` landing page
- Reusable Treehouse article template
- Category archive support
- Standard, featured, and Field Note article cards
- Table of contents
- Treehouse Takeaway component
- Safety notice component
- Tool CTA component
- FAQ component
- Sources component
- Related-content component
- Author box
- Breadcrumbs
- Article metadata
- `BlogPosting` or `Article` schema
- Sitemap integration
- First article implementation
- README explaining how to publish the next article

## Implementation Guardrails

- Do not redesign the entire website.
- Do not invent business facts, credentials, pricing, reviews, or service capabilities.
- Do not ship placeholder internal links.
- Do not index empty category pages.
- Do not hard-code the first article in a way that prevents future structured articles.
- Keep the reading experience fast, mobile-friendly, and accessible.
- Prefer server-rendered or statically generated article content when supported by the existing stack.
- Use original images when supplied; do not substitute generic stock imagery without approval.

## Definition of Done

The MVP is done when the answer to this question is yes:

> Can Midwest Roots publish a genuinely useful new Omaha tree-care article afterward by adding structured content and images, without rebuilding the page or asking a developer to invent another layout?

The first article must also be fully integrated into the existing tools, services, SEO system, and estimate journey.
