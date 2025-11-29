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

  // Comprehensive crawlable content describing the entire tool
  const crawlableToolContent = `
<!-- Crawlable Tool Documentation for AI/LLM Access -->
<div id="tool-documentation" style="display:none;" aria-hidden="true">
  <h1>Tree Risk Diagnostic Tool - Complete Documentation</h1>

  <section>
    <h2>Overview</h2>
    <p>This interactive tool assesses tree risk based on ISA (International Society of Arboriculture) arborist standards. It evaluates tree health, structural integrity, and hazard potential to provide homeowners with instant risk assessment and cost estimates.</p>
  </section>

  <section>
    <h2>Assessment Questions</h2>

    <h3>1. Tree Species Identification</h3>
    <p>The tool asks users to identify their tree species. Common Omaha trees include:</p>
    <ul>
      <li>Ash (American, Green) - High risk due to Emerald Ash Borer (EAB) infestation</li>
      <li>Oak (Bur, Red, White) - Generally healthy, long-lived</li>
      <li>Maple (Silver, Norway, Red) - Moderate risk, common storm damage</li>
      <li>Elm (American, Siberian) - Variable health, Dutch Elm Disease concerns</li>
      <li>Cottonwood - Fast-growing, structurally weak, high storm damage risk</li>
      <li>Pine (Scotch, Austrian) - Drought stress, pine wilt disease</li>
      <li>Honeylocust - Generally hardy, adaptable</li>
      <li>Other/Unknown species</li>
    </ul>

    <h3>2. Tree Size Assessment</h3>
    <p>Users estimate tree height:</p>
    <ul>
      <li>Small: Under 30 feet (typical removal cost: $500-$1,500)</li>
      <li>Medium: 30-60 feet (typical removal cost: $1,500-$3,500)</li>
      <li>Large: Over 60 feet (typical removal cost: $3,500-$7,000+)</li>
    </ul>

    <h3>3. Health Indicators</h3>
    <p>The tool evaluates multiple health factors:</p>

    <h4>Canopy Decline</h4>
    <ul>
      <li>0-10% dead branches: Low concern</li>
      <li>10-30% dead branches: Moderate concern</li>
      <li>30-50% dead branches: High concern</li>
      <li>50%+ dead branches: Critical - removal likely recommended</li>
    </ul>

    <h4>Structural Issues</h4>
    <ul>
      <li>Trunk cracks or splits: Indicates structural failure risk</li>
      <li>Cavities or decay: Compromised structural integrity</li>
      <li>Fungal growth at base: Root or lower trunk decay</li>
      <li>Co-dominant stems: Weak branch unions, splitting risk</li>
      <li>Dead branches over 2 inches: Falling hazard</li>
      <li>Leaning more than 15 degrees: Uprooting risk</li>
    </ul>

    <h4>Pest/Disease Indicators</h4>
    <ul>
      <li>Emerald Ash Borer (EAB): D-shaped exit holes, woodpecker damage, canopy thinning in ash trees</li>
      <li>Sudden leaf drop: Stress response or disease</li>
      <li>Unusual bark peeling: Pest activity or environmental stress</li>
      <li>Premature fall colors: Stress indicator</li>
    </ul>

    <h3>4. Location Risk Factors</h3>
    <p>The tool assesses hazard potential based on proximity to:</p>
    <ul>
      <li>Houses/buildings: Within falling distance (1.5x tree height)</li>
      <li>Power lines: Utility hazard, requires professional removal</li>
      <li>Driveways/sidewalks: Property damage risk</li>
      <li>Other structures: Sheds, fences, neighbor property</li>
      <li>Open area: Low hazard if tree fails</li>
    </ul>

    <h3>5. Recent Changes</h3>
    <ul>
      <li>Construction nearby: Root damage, soil compaction</li>
      <li>Grade changes: Altered drainage, root exposure</li>
      <li>Recent storms: Structural damage assessment</li>
      <li>Lightning strike: Internal damage not always visible</li>
    </ul>
  </section>

  <section>
    <h2>Risk Assessment Algorithm</h2>

    <h3>Risk Levels</h3>

    <h4>Extreme Risk (Immediate Action Required)</h4>
    <p>Triggers:</p>
    <ul>
      <li>Leaning more than 15 degrees toward structure</li>
      <li>Large cracks in trunk</li>
      <li>50%+ canopy decline</li>
      <li>Dead tree near structure or power lines</li>
      <li>Recent storm damage with structural compromise</li>
    </ul>
    <p>Recommendation: Remove within days. Get multiple quotes immediately.</p>

    <h4>High Risk (Action Needed Soon)</h4>
    <p>Triggers:</p>
    <ul>
      <li>30-50% canopy decline</li>
      <li>Multiple structural defects</li>
      <li>EAB-infested ash tree with declining health</li>
      <li>Large dead branches over high-traffic areas</li>
      <li>Cavity decay near structure</li>
    </ul>
    <p>Recommendation: Professional inspection within 2-4 weeks. Removal or major pruning likely.</p>

    <h4>Moderate Risk (Monitor & Plan)</h4>
    <p>Triggers:</p>
    <ul>
      <li>10-30% canopy decline</li>
      <li>Minor structural issues</li>
      <li>Healthy ash tree (EAB treatment candidate)</li>
      <li>Some dead branches, but not over structures</li>
      <li>Age-related decline in mature tree</li>
    </ul>
    <p>Recommendation: Professional inspection within 3-6 months. May need treatment or selective pruning.</p>

    <h4>Low Risk (Routine Care)</h4>
    <p>Triggers:</p>
    <ul>
      <li>Less than 10% canopy decline</li>
      <li>No major structural defects</li>
      <li>No proximity hazards</li>
      <li>Healthy species with good prognosis</li>
    </ul>
    <p>Recommendation: Standard maintenance pruning every 3-5 years. Annual inspection for high-value trees.</p>
  </section>

  <section>
    <h2>Cost Estimation Factors</h2>

    <h3>Base Costs (Omaha Market, 2025)</h3>
    <ul>
      <li>Small tree removal (under 30ft): $500-$1,500</li>
      <li>Medium tree removal (30-60ft): $1,500-$3,500</li>
      <li>Large tree removal (60ft+): $3,500-$7,000+</li>
      <li>Hazardous tree premium: +30-50%</li>
      <li>Crane access: +$1,000-$3,000</li>
      <li>Stump grinding: $100-$400</li>
    </ul>

    <h3>Treatment Options</h3>
    <ul>
      <li>EAB treatment (injection): $150-$400 every 2-3 years</li>
      <li>Crown thinning/pruning: $300-$1,200</li>
      <li>Cabling/bracing: $500-$1,500</li>
      <li>Deep root fertilization: $200-$500</li>
    </ul>

    <h3>Cost Multipliers</h3>
    <ul>
      <li>Near power lines: Requires utility coordination, increases cost 20-40%</li>
      <li>Tight access: Limits equipment, increases labor time</li>
      <li>Multiple trees: Discount of 10-20% for bulk work</li>
      <li>Emergency/storm damage: Premium pricing (15-30%)</li>
      <li>Winter removal: May be 10-15% cheaper (lower demand)</li>
    </ul>
  </section>

  <section>
    <h2>Omaha-Specific Considerations</h2>

    <h3>Emerald Ash Borer (EAB)</h3>
    <p>EAB has decimated ash tree populations in Omaha since first detection in 2016. The tool specifically evaluates:</p>
    <ul>
      <li>Treatment candidacy: Healthy ash trees with less than 30% decline</li>
      <li>Treatment vs. removal economics: Trees under $2,000 removal cost often better to treat if valued</li>
      <li>Preemptive treatment: Preventative treatment for high-value, healthy ash trees</li>
    </ul>

    <h3>Storm Patterns</h3>
    <p>Omaha experiences severe thunderstorms (March-September) and occasional ice storms (December-February). The tool considers:</p>
    <ul>
      <li>Post-storm inspection recommendations</li>
      <li>Structural weaknesses exacerbated by wind/ice</li>
      <li>Seasonal removal timing to avoid storm season</li>
    </ul>

    <h3>Soil & Climate</h3>
    <ul>
      <li>Heavy clay soils: Poor drainage, root issues</li>
      <li>Drought stress: Common in July-August, weakens trees</li>
      <li>Hardiness Zone 5b: Species suitability for Omaha climate</li>
    </ul>
  </section>

  <section>
    <h2>Tool Output</h2>
    <p>After completing the assessment, users receive:</p>
    <ul>
      <li>Risk level classification (Low/Moderate/High/Extreme)</li>
      <li>Detailed explanation of risk factors identified</li>
      <li>Recommended timeline for action</li>
      <li>Cost estimate range based on tree size and complexity</li>
      <li>Treatment vs. removal recommendation (if applicable)</li>
      <li>Next steps: DIY monitoring tips or professional inspection recommendation</li>
      <li>Seasonal timing advice (best time to address the issue)</li>
    </ul>
  </section>

  <section>
    <h2>Disclaimers & Limitations</h2>
    <ul>
      <li>This tool provides preliminary assessment only, not a substitute for professional arborist inspection</li>
      <li>Accuracy depends on user's ability to observe and report tree conditions</li>
      <li>Some hazards (internal decay, root issues) are not visible to homeowners</li>
      <li>Recommended for 80-90% of common tree scenarios</li>
      <li>Complex cases (heritage trees, legal disputes, unusual species) require certified arborist</li>
      <li>Cost estimates are market averages and may vary by contractor</li>
    </ul>
  </section>
</div>`;

  // Inject SEO tags right after <head> or at the start if no head tag
  if (html.includes('<head>')) {
    html = html.replace('<head>', `<head>\n${seoTags}\n`);
  } else {
    // Minified HTML might not have proper head tag, inject after <html>
    html = html.replace(/<html[^>]*>/, `$&\n<head>\n${seoTags}\n</head>`);
  }

  // Inject crawlable content right after <body> tag
  if (html.includes('<body>')) {
    html = html.replace('<body>', `<body>\n${crawlableToolContent}\n`);
  } else {
    // If no body tag, inject after head
    html = html.replace('</head>', `</head>\n${crawlableToolContent}\n`);
  }

  fs.writeFileSync(toolsPath, html, 'utf-8');
  console.log('✅ SEO metadata added to dist/tools/index.html');
};

prerenderHomepage();
prerenderToolsPage();
