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

// Add crawlable /tools route for ChatGPT/AI access
const prerenderToolsRoute = () => {
  const distPath = path.join(__dirname, '../dist');
  const toolsDir = path.join(distPath, 'tools');
  const toolsPath = path.join(toolsDir, 'index.html');

  // Create tools directory
  if (!fs.existsSync(toolsDir)) {
    fs.mkdirSync(toolsDir, { recursive: true });
  }

  // Read the main index.html as template
  const templatePath = path.join(distPath, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.log('⚠️  dist/index.html not found. Run build first.');
    return;
  }

  let html = fs.readFileSync(templatePath, 'utf-8');

  // SEO meta tags specific to /tools page
  const toolsSeoTags = `
    <title>Tree Diagnostic Tools - Free Risk Assessment | Omaha Tree Care</title>
    <meta name="description" content="Free interactive tree diagnostic tools for Omaha homeowners. Species identifier, hazard assessment, cost estimator, disease diagnosis, and DIY vs professional guidance. Based on ISA arborist standards.">
    <meta name="keywords" content="tree risk assessment, Omaha tree diagnostic, tree health checker, EAB detection tool, tree hazard assessment, tree cost estimator, Omaha arborist tool, tree disease identifier, tree species identification">
    <link rel="canonical" href="https://omahatreecare.com/tools">
    <meta property="og:title" content="Free Tree Diagnostic Tools - Omaha Tree Care">
    <meta property="og:description" content="Interactive tree diagnostic tools. Get instant health analysis, cost estimates, and expert recommendations for your Omaha trees.">
    <meta property="og:url" content="https://omahatreecare.com/tools">`;

  // Replace title and add tools-specific SEO
  html = html.replace(/<title>.*?<\/title>/i, '');
  html = html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />${toolsSeoTags}`);

  // Add comprehensive crawlable tool documentation for AI/ChatGPT
  const toolsContent = `
    <div id="root">
      <!-- Crawlable content for AI/search engines describing all diagnostic tools -->
      <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif;">

        <header style="margin-bottom: 48px;">
          <h1 style="font-size: 2.5rem; font-weight: bold; color: #3d3027; margin-bottom: 16px;">
            Tree Diagnostic Tools for Omaha Homeowners
          </h1>
          <p style="font-size: 1.25rem; color: #6b5d54; line-height: 1.6;">
            Six interactive tools to assess tree health, identify risks, estimate costs, and make informed decisions.
            Based on ISA (International Society of Arboriculture) arborist standards with Omaha-specific considerations.
          </p>
        </header>

        <section style="margin-bottom: 48px;">
          <h2 style="font-size: 2rem; font-weight: bold; color: #3d3027; margin-bottom: 24px;">Available Tools</h2>

          <div style="display: grid; gap: 32px;">

            <!-- Tool 1: Species Identifier -->
            <article style="border: 2px solid #16a34a; border-radius: 12px; padding: 24px; background: #f0fdf4;">
              <h3 style="font-size: 1.75rem; font-weight: bold; color: #16a34a; margin-bottom: 16px;">
                🌳 Tree Species Identifier
              </h3>
              <p style="color: #374151; margin-bottom: 16px; line-height: 1.6;">
                Identify your tree species and learn about its specific care needs, common problems, and expected lifespan.
              </p>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Common Omaha Tree Species:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li><strong>Ash (American, Green):</strong> High risk due to Emerald Ash Borer (EAB) infestation. Treatment cost: $150-400 every 2-3 years. Removal cost: $1,500-5,000 depending on size.</li>
                <li><strong>Oak (Bur, Red, White):</strong> Generally healthy, long-lived (200+ years). Low maintenance, drought tolerant once established.</li>
                <li><strong>Maple (Silver, Norway, Red):</strong> Moderate risk. Silver maple prone to storm damage due to weak wood. Regular pruning recommended.</li>
                <li><strong>Elm (American, Siberian):</strong> Variable health. Dutch Elm Disease is manageable with treatment ($300-800/year for high-value trees).</li>
                <li><strong>Cottonwood:</strong> Fast-growing but structurally weak. High storm damage risk. Short lifespan (50-80 years).</li>
                <li><strong>Pine (Scotch, Austrian):</strong> Drought stress common. Pine wilt disease fatal (no treatment, immediate removal required).</li>
                <li><strong>Honeylocust:</strong> Generally hardy and adaptable to Omaha conditions. Low maintenance.</li>
              </ul>
            </article>

            <!-- Tool 2: Hazard Assessment -->
            <article style="border: 2px solid #ea580c; border-radius: 12px; padding: 24px; background: #fff7ed;">
              <h3 style="font-size: 1.75rem; font-weight: bold; color: #ea580c; margin-bottom: 16px;">
                ⚠️ Tree Hazard Assessment
              </h3>
              <p style="color: #374151; margin-bottom: 16px; line-height: 1.6;">
                Evaluate if your tree poses a safety risk using ISA arborist risk assessment criteria.
              </p>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Risk Levels:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li><strong>EXTREME RISK (Remove immediately):</strong> Leaning &gt;15° toward structure, large trunk cracks, 50%+ dead canopy, dead tree near building/power lines. Timeline: Days to weeks.</li>
                <li><strong>HIGH RISK (Action needed soon):</strong> 30-50% canopy decline, multiple structural defects, large dead branches over high-traffic areas, advanced decay near structures. Timeline: 2-4 weeks.</li>
                <li><strong>MODERATE RISK (Monitor & plan):</strong> 10-30% canopy decline, minor structural issues, some dead branches not over structures. Timeline: 3-6 months for inspection.</li>
                <li><strong>LOW RISK (Routine care):</strong> &lt;10% canopy decline, no major defects, no proximity hazards. Maintenance: Standard pruning every 3-5 years.</li>
              </ul>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Warning Signs Assessed:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li>Trunk cracks or splits (structural failure risk)</li>
                <li>Cavities or decay holes (compromised structural integrity)</li>
                <li>Fungal growth at base (root or trunk decay)</li>
                <li>Co-dominant stems with weak unions (splitting risk)</li>
                <li>Dead branches over 2 inches diameter (falling hazard)</li>
                <li>Leaning more than 15 degrees (uprooting risk)</li>
                <li>Proximity to structures within falling distance (1.5x tree height)</li>
                <li>Power line contact or proximity (utility hazard)</li>
              </ul>
            </article>

            <!-- Tool 3: Common Ailments & Pests -->
            <article style="border: 2px solid #9333ea; border-radius: 12px; padding: 24px; background: #faf5ff;">
              <h3 style="font-size: 1.75rem; font-weight: bold; color: #9333ea; margin-bottom: 16px;">
                🐛 Common Tree Problems & Diseases
              </h3>
              <p style="color: #374151; margin-bottom: 16px; line-height: 1.6;">
                Diagnose diseases and pests specific to Omaha trees with treatment recommendations and cost estimates.
              </p>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Major Pest & Disease Issues in Omaha:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li><strong>Emerald Ash Borer (EAB):</strong> Invasive beetle killing ash trees. Signs: D-shaped exit holes, canopy thinning, woodpecker damage, bark splits. Treatment: 95% effective if caught early ($150-400 every 2-3 years). Not treatable if &gt;30% canopy decline.</li>
                <li><strong>Dutch Elm Disease:</strong> Fungal disease spread by beetles. Signs: Yellowing/wilting leaves, brown streaks in wood. Treatment: Fungicide injections ($300-800/year) effective for high-value trees.</li>
                <li><strong>Oak Wilt:</strong> Fatal fungal disease. Signs: Leaf browning from edges inward, rapid decline. No treatment - remove infected trees immediately to prevent spread.</li>
                <li><strong>Pine Wilt:</strong> Nematode disease, fatal to pines. Signs: Rapid browning of entire tree in 2-4 weeks. No treatment available, remove immediately.</li>
                <li><strong>Chlorosis (Iron deficiency):</strong> Common in alkaline Omaha soils. Signs: Yellowing leaves with green veins. Treatment: Iron treatments ($200-400), acidifying soil amendments.</li>
                <li><strong>Storm Damage:</strong> Omaha experiences severe thunderstorms March-September. Assess for: broken branches, stripped bark, root exposure, lean changes. Timeline: Remove hazards immediately, assess remaining tree health within 2 weeks.</li>
              </ul>
            </article>

            <!-- Tool 4: DIY vs Professional Guide -->
            <article style="border: 2px solid #0891b2; border-radius: 12px; padding: 24px; background: #ecfeff;">
              <h3 style="font-size: 1.75rem; font-weight: bold; color: #0891b2; margin-bottom: 16px;">
                🔧 DIY vs Professional Guide
              </h3>
              <p style="color: #374151; margin-bottom: 16px; line-height: 1.6;">
                Learn when you can safely do tree work yourself and when to hire a professional arborist.
              </p>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Safe for DIY:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li>Small trees under 15 feet tall with no nearby structures</li>
                <li>Pruning branches under 2 inches diameter at ground level</li>
                <li>Watering and mulching (maintain 2-4 inch layer, keep away from trunk)</li>
                <li>Planting small trees (under 2 inch caliper)</li>
                <li>Minor cleanup of storm debris from ground</li>
              </ul>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Hire a Professional For:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li>Any tree over 15 feet tall or larger than 4 inch trunk diameter</li>
                <li>Trees near buildings, power lines, or other structures</li>
                <li>Trees leaning toward structures or showing instability</li>
                <li>Dead or diseased trees (unpredictable failures)</li>
                <li>Any work requiring a ladder or climbing</li>
                <li>Pruning branches over 4 inches diameter (risk of improper cuts causing decay)</li>
                <li>Work near power lines (even if not touching - call utility company)</li>
                <li>Diagnosis of tree diseases or pest infestations</li>
                <li>Trees that require heavy equipment (bucket truck, crane, stump grinder)</li>
              </ul>
              <p style="color: #991b1b; font-weight: bold; margin-top: 16px; padding: 12px; background: #fee2e2; border-radius: 8px;">
                ⚠️ Safety Note: Most homeowner tree-related injuries occur during DIY work. Professional arborists have specialized training, insurance, and equipment. When in doubt, get a professional assessment ($100-300 for inspection).
              </p>
            </article>

            <!-- Tool 5: Cost Estimator -->
            <article style="border: 2px solid #16a34a; border-radius: 12px; padding: 24px; background: #f0fdf4;">
              <h3 style="font-size: 1.75rem; font-weight: bold; color: #16a34a; margin-bottom: 16px;">
                💰 Tree Service Cost Estimator
              </h3>
              <p style="color: #374151; margin-bottom: 16px; line-height: 1.6;">
                Get realistic Omaha market cost estimates for tree removal, pruning, treatment, and other services.
              </p>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Omaha Tree Removal Costs (2025):</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li><strong>Small trees (under 30 feet):</strong> $500-$1,500 typical range</li>
                <li><strong>Medium trees (30-60 feet):</strong> $1,500-$3,500 typical range</li>
                <li><strong>Large trees (over 60 feet):</strong> $3,500-$7,000+ typical range</li>
                <li><strong>Hazardous tree premium:</strong> +30-50% (leaning, dead, near structures)</li>
                <li><strong>Crane access required:</strong> +$1,000-$3,000</li>
                <li><strong>Near power lines:</strong> +20-40% (utility coordination required)</li>
                <li><strong>Stump grinding:</strong> $100-$400 depending on diameter</li>
                <li><strong>Emergency/storm damage:</strong> +15-30% premium pricing</li>
              </ul>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Tree Treatment & Maintenance Costs:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li><strong>EAB treatment (trunk injection):</strong> $150-$400 every 2-3 years (size dependent)</li>
                <li><strong>Crown thinning/pruning:</strong> $300-$1,200 (removes 10-20% of canopy)</li>
                <li><strong>Crown raising (remove lower branches):</strong> $200-$800</li>
                <li><strong>Cabling and bracing (structural support):</strong> $500-$1,500</li>
                <li><strong>Deep root fertilization:</strong> $200-$500</li>
                <li><strong>Dutch Elm Disease treatment:</strong> $300-$800/year (fungicide injection)</li>
                <li><strong>Professional tree inspection:</strong> $100-$300</li>
              </ul>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Cost-Saving Tips:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li>Winter removal (November-March): 10-15% cheaper due to lower demand</li>
                <li>Multiple trees: 10-20% discount for bulk work</li>
                <li>Leave wood: Save $100-300 if you keep firewood/don't need hauling</li>
                <li>Get 3 quotes: Prices vary significantly between contractors</li>
                <li>Off-season scheduling: Avoid peak spring/fall demand for better rates</li>
              </ul>
            </article>

            <!-- Tool 6: Complete Risk Assessment Tool Documentation -->
            <article style="border: 2px solid #6366f1; border-radius: 12px; padding: 24px; background: #eef2ff;">
              <h3 style="font-size: 1.75rem; font-weight: bold; color: #6366f1; margin-bottom: 16px;">
                📋 Complete Tree Risk Assessment Process
              </h3>
              <p style="color: #374151; margin-bottom: 16px; line-height: 1.6;">
                Comprehensive diagnostic tool that guides you through a complete tree risk assessment with instant recommendations.
              </p>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Assessment Steps:</h4>
              <ol style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li><strong>Identify Species:</strong> Select your tree type from common Omaha species (affects disease susceptibility, structural characteristics, expected lifespan)</li>
                <li><strong>Measure Size:</strong> Estimate height in 30ft increments (under 30ft, 30-60ft, over 60ft) - impacts removal cost and falling radius</li>
                <li><strong>Assess Canopy Health:</strong> Estimate percentage of dead branches (0-10%, 10-30%, 30-50%, 50%+) - primary health indicator</li>
                <li><strong>Check Structural Integrity:</strong> Identify visible defects: cracks, cavities, decay, fungal growth, lean, dead branches</li>
                <li><strong>Evaluate Location Risk:</strong> Distance to structures, power lines, high-traffic areas - determines hazard level</li>
                <li><strong>Note Recent Changes:</strong> Construction, storms, grade changes, lightning strikes - recent stress factors</li>
                <li><strong>Review Recommendations:</strong> Get risk level, timeline, cost estimate, and specific next steps</li>
              </ol>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Omaha-Specific Factors:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li><strong>EAB Prevalence:</strong> All ash trees evaluated for treatment candidacy vs. removal economics</li>
                <li><strong>Storm Patterns:</strong> Severe thunderstorms March-September, ice storms December-February inform structural risk assessment</li>
                <li><strong>Soil Conditions:</strong> Heavy clay soil, poor drainage affect root stability</li>
                <li><strong>Hardiness Zone 5b:</strong> Species suitability and winter hardiness considerations</li>
                <li><strong>Local Cost Data:</strong> Estimates based on actual Omaha metro area pricing (Omaha, Bellevue, Papillion, La Vista, Gretna, Elkhorn)</li>
              </ul>
              <h4 style="font-weight: bold; color: #3d3027; margin: 16px 0 8px;">Tool Output:</h4>
              <p style="color: #4b5563; line-height: 1.8;">
                After completing the assessment, you receive:
              </p>
              <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px;">
                <li>Risk level classification (Low/Moderate/High/Extreme)</li>
                <li>Detailed explanation of risk factors identified</li>
                <li>Recommended timeline for action (immediate, 2-4 weeks, 3-6 months, routine)</li>
                <li>Cost estimate range based on tree size and complexity</li>
                <li>Treatment vs. removal recommendation (for treatable conditions)</li>
                <li>Seasonal timing advice (best time to address the issue)</li>
                <li>DIY vs. professional recommendation</li>
                <li>Next steps and monitoring guidance</li>
              </ul>
            </article>

          </div>
        </section>

        <section style="margin: 48px 0; padding: 32px; background: #f9fafb; border-radius: 12px;">
          <h2 style="font-size: 1.75rem; font-weight: bold; color: #3d3027; margin-bottom: 16px;">
            About These Tools
          </h2>
          <p style="color: #4b5563; line-height: 1.8; margin-bottom: 16px;">
            These diagnostic tools are based on ISA (International Society of Arboriculture) arborist standards and consider Omaha-specific factors including:
          </p>
          <ul style="color: #4b5563; line-height: 1.8; margin-left: 24px; margin-bottom: 16px;">
            <li>EAB infestation prevalence and treatment economics</li>
            <li>Local soil conditions (heavy clay, alkaline pH)</li>
            <li>Climate factors (Zone 5b, drought patterns, storm frequency)</li>
            <li>Actual Omaha metro area service costs (2025 data)</li>
            <li>Common species performance in Nebraska conditions</li>
          </ul>
          <p style="color: #4b5563; line-height: 1.8; margin-bottom: 16px;">
            <strong>Accuracy:</strong> The tools provide reliable assessment and cost estimates for 80-90% of common tree scenarios. Complex situations (heritage trees, legal disputes, unusual species, structural engineering concerns) require certified arborist inspection.
          </p>
          <p style="color: #991b1b; font-weight: bold; padding: 12px; background: #fee2e2; border-radius: 8px;">
            <strong>Disclaimer:</strong> These tools provide preliminary assessment only and are not a substitute for professional arborist inspection. Accuracy depends on user's ability to observe and report tree conditions. Some hazards (internal decay, root issues, pest infestations) are not visible without specialized equipment.
          </p>
        </section>

        <footer style="margin-top: 80px; padding-top: 40px; border-top: 2px solid #e5e7eb; text-align: center;">
          <p style="font-size: 1.125rem; color: #6b5d54; margin-bottom: 16px;">
            <strong>Need Professional Help?</strong>
          </p>
          <p style="color: #8b8175; margin-bottom: 8px;">Phone: (402) 812-3294</p>
          <p style="color: #8b8175; margin-bottom: 24px;">Email: andrew@midwestroots.info</p>
          <p style="color: #8b8175; font-size: 0.875rem;">
            Service Areas: Omaha, Bellevue, Papillion, La Vista, Gretna, Elkhorn, NE
          </p>
          <p style="color: #8b8175; font-size: 0.875rem; margin-top: 32px;">
            &copy; 2025 Midwest Roots Tree Services. All rights reserved.
          </p>
        </footer>

      </div>
    </div>`;

  // Replace the empty root div with crawlable tools content
  html = html.replace('<div id="root"></div>', toolsContent);

  // Write to /tools/index.html
  fs.writeFileSync(toolsPath, html, 'utf-8');
  console.log('✅ Prerendered /tools route with comprehensive crawlable content');
};

// Main execution
console.log('🔄 Starting prerender process...\n');

// Save original template before any modifications
const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');
const originalTemplate = fs.readFileSync(indexPath, 'utf-8');

// Prerender tools route FIRST (uses original template)
prerenderToolsRoute();

// Then prerender homepage (modifies index.html)
prerenderHomepage();

console.log('\n✨ Prerender complete!\n');
