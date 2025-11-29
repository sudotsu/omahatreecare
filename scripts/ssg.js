import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import http from 'http';
import { createReadStream, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to pre-render
const routes = ['/', '/tools'];

// Simple static file server
function startServer(distPath, port = 3000) {
  const server = http.createServer((req, res) => {
    // Serve index.html for all routes (SPA mode)
    const filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);

    // Check if file exists
    if (fs.existsSync(filePath) && statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
      }[ext] || 'text/plain';

      res.writeHead(200, { 'Content-Type': contentType });
      createReadStream(filePath).pipe(res);
    } else {
      // SPA fallback - serve index.html
      res.writeHead(200, { 'Content-Type': 'text/html' });
      createReadStream(path.join(distPath, 'index.html')).pipe(res);
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`📡 Local server running at http://localhost:${port}`);
      resolve({ server, port });
    });
  });
}

async function generateStaticPages() {
  const distPath = path.join(__dirname, '../dist');
  const templatePath = path.join(distPath, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.log('❌ dist/index.html not found. Run vite build first.');
    return;
  }

  // Start local server
  const { server, port } = await startServer(distPath);

  // Launch browser
  console.log('🚀 Launching browser for SSG...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext();

  for (const route of routes) {
    console.log(`🔄 Pre-rendering ${route}...`);

    try {
      const page = await context.newPage();

      // Navigate to the route
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'domcontentloaded' });

      // Wait for React to render
      await page.waitForTimeout(2000);

      // Get the fully rendered HTML
      const html = await page.content();

      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = path.join(distPath, 'index.html');
      } else {
        const routePath = route.slice(1);
        const routeDir = path.join(distPath, routePath);
        fs.mkdirSync(routeDir, { recursive: true });
        outputPath = path.join(routeDir, 'index.html');
      }

      // Write pre-rendered HTML
      fs.writeFileSync(outputPath, html, 'utf-8');
      console.log(`✅ Pre-rendered: ${route} → ${path.relative(distPath, outputPath)}`);

      await page.close();
    } catch (error) {
      console.error(`❌ Failed to render ${route}:`, error.message);
    }
  }

  await browser.close();
  server.close();
  console.log('\n✨ SSG complete! All routes pre-rendered.');
}

generateStaticPages().catch(console.error);
