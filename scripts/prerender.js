import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple prerendering script that adds crawlable content to index.html and SEO tags to tools
const prerenderHomepage = () => {
  const distPath = path.join(__dirname, '../dist');
  const indexPath = path.join(distPath, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.log('⚠️  dist/index.html not found. Run build first.');
    return;
  }

  let html = fs.readFileSync(indexPath, 'utf-8');

  // Add crawlable content inside the root div
  const crawlableContent = `
    <div id="root">
      <div style="max-width: 800px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif;">
        <header style="margin-bottom: 40px;">
          <h1 style="font-size: 2.5rem; font-weight: bold; color: #3d3027; margin-bottom: 16px; line-height: 1.2;">
            Know Your Tree Risk<br>
            <span style="color: #52796f;">Before You Spend a Dime</span>
          </h1>
          <p style="font-size: 1.25rem; color: #6b5d54; margin-bottom: 24px;">
            Free diagnostic tool based on arborist science.<br>
            Omaha-specific. Honest assessment. 10 minutes.
          </p>
          <a href="/tools" style="display: inline-block; background-color: #52796f; color: white; padding: 16px 40px; font-size: 1.125rem; font-weight: 600; border-radius: 8px; text-decoration: none;">
            Start Free Assessment →
          </a>
        </header>

        <section style="margin: 60px 0;">
          <div style="display: grid; gap: 32px;">
            <div style="text-align: center;">
              <h3 style="font-size: 1.125rem; font-weight: bold; color: #3d3027; margin-bottom: 8px;">Omaha-Specific</h3>
              <p style="color: #6b5d54;">EAB, soil conditions, local climate</p>
            </div>
            <div style="text-align: center;">
              <h3 style="font-size: 1.125rem; font-weight: bold; color: #3d3027; margin-bottom: 8px;">Real Science</h3>
              <p style="color: #6b5d54;">Based on ISA arborist standards</p>
            </div>
            <div style="text-align: center;">
              <h3 style="font-size: 1.125rem; font-weight: bold; color: #3d3027; margin-bottom: 8px;">Honest Assessment</h3>
              <p style="color: #6b5d54;">Even if you need nothing</p>
            </div>
          </div>
        </section>

        <section style="margin: 60px 0;">
          <h2 style="font-size: 2rem; font-weight: bold; color: #3d3027; text-align: center; margin-bottom: 48px;">How It Works</h2>
          <div style="display: grid; gap: 32px;">
            <div>
              <h3 style="font-size: 1.125rem; font-weight: bold; color: #3d3027; margin-bottom: 8px;">1. Describe Your Tree</h3>
              <p style="color: #6b5d54;">Answer questions about species, health, and location</p>
            </div>
            <div>
              <h3 style="font-size: 1.125rem; font-weight: bold; color: #3d3027; margin-bottom: 8px;">2. Get Risk Level</h3>
              <p style="color: #6b5d54;">Instant assessment: low, high, or extreme risk</p>
            </div>
            <div>
              <h3 style="font-size: 1.125rem; font-weight: bold; color: #3d3027; margin-bottom: 8px;">3. Know Your Options</h3>
              <p style="color: #6b5d54;">Clear next steps and realistic cost ranges</p>
            </div>
          </div>
        </section>

        <section style="margin: 60px 0; text-align: center;">
          <p style="font-size: 1.125rem; color: #6b5d54; margin-bottom: 24px;">
            <strong style="display: block; font-size: 1.5rem; color: #52796f; margin-bottom: 8px;">1,200+</strong>
            Omaha homeowners have used this tool
          </p>
          <a href="/tools" style="display: inline-block; background-color: #52796f; color: white; padding: 16px 40px; font-size: 1.125rem; font-weight: 600; border-radius: 8px; text-decoration: none;">
            Start Your Free Assessment →
          </a>
        </section>

        <footer style="margin-top: 80px; padding-top: 40px; border-top: 1px solid #e5e5e5; color: #8b8175; font-size: 0.875rem;">
          <div style="display: grid; gap: 32px; margin-bottom: 32px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 16px; color: #3d3027;">Contact</h4>
              <p>Phone: (402) 812-3294</p>
              <p>Email: andrew@midwestroots.info</p>
            </div>
            <div>
              <h4 style="font-weight: bold; margin-bottom: 16px; color: #3d3027;">Service Areas</h4>
              <p>Omaha, Bellevue, Papillion, La Vista, Gretna, Elkhorn, NE</p>
            </div>
            <div>
              <h4 style="font-weight: bold; margin-bottom: 16px; color: #3d3027;">About This Site</h4>
              <p>Free tree care resources and diagnostic tools for Omaha homeowners.</p>
              <p style="margin-top: 12px;">Built by <a href="https://midwestroots.info" style="color: #c1666b; font-weight: 600;">Midwest Roots Tree Services</a></p>
            </div>
          </div>
          <p style="text-align: center;">&copy; 2025 Midwest Roots Tree Services. All rights reserved.</p>
        </footer>
      </div>
    </div>`;

  // Replace the empty root div with crawlable content
  html = html.replace('<div id="root"></div>', crawlableContent);

  // Write back
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log('✅ Prerendered content added to dist/index.html');
};

// Add SEO metadata to the tools page
const prerenderToolsPage = () => {
  const distPath = path.join(__dirname, '../dist');
  const toolsPath = path.join(distPath, 'tools', 'index.html');

  if (!fs.existsSync(toolsPath)) {
    console.log('⚠️  dist/tools/index.html not found. Skipping tools prerender.');
    return;
  }

  let html = fs.readFileSync(toolsPath, 'utf-8');

  // SEO meta tags to inject
  const seoTags = `<meta charset=UTF-8>
<title>Tree Diagnostic Tool - Free Risk Assessment | Omaha Tree Care</title>
<meta name="description" content="Free interactive tree risk assessment tool for Omaha homeowners. Analyze tree health, get cost estimates, identify hazards. Based on ISA arborist standards. EAB detection, disease diagnosis, structural analysis.">
<meta name="keywords" content="tree risk assessment, Omaha tree diagnostic, tree health checker, EAB detection tool, tree hazard assessment, tree cost estimator, Omaha arborist tool, tree disease identifier">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://omahatreecare.com/tools">
<meta property="og:title" content="Free Tree Diagnostic Tool - Omaha Tree Care">
<meta property="og:description" content="Interactive tree risk assessment tool. Get instant health analysis, cost estimates, and expert recommendations for your Omaha trees.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://omahatreecare.com/tools">
<meta name="viewport" content="width=device-width,initial-scale=1">`;

  // Inject SEO tags right after <head> or at the start if no head tag
  if (html.includes('<head>')) {
    html = html.replace('<head>', `<head>\n${seoTags}\n`);
  } else {
    // Minified HTML might not have proper head tag, inject after <html>
    html = html.replace(/<html[^>]*>/, `$&\n<head>\n${seoTags}\n</head>`);
  }

  fs.writeFileSync(toolsPath, html, 'utf-8');
  console.log('✅ SEO metadata added to dist/tools/index.html');
};

prerenderHomepage();
prerenderToolsPage();
