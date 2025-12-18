# ACCEPTANCE TESTS - Route Migration Validation

**Purpose**: Gate checks to verify route integrity after each migration step.

**Requirements**: All tests must pass before proceeding to next step.

---

## Test 1: Development Server Boots

**Command**:
```bash
npm run dev
```

**Expected Result**:
- ✅ Server starts on `http://localhost:5173`
- ✅ No fatal errors in terminal
- ✅ No console errors in browser on homepage

**Failure Conditions**:
- Server crashes or fails to start
- Import errors or missing dependencies
- Module resolution errors

---

## Test 2: Production Build Passes

**Command**:
```bash
npm run build
```

**Expected Result**:
- ✅ Build completes successfully
- ✅ `dist/` directory is created
- ✅ No TypeScript/ESLint errors
- ✅ No SSG rendering errors
- ✅ All routes generate HTML files

**Failure Conditions**:
- Build fails with errors
- Missing route HTML files in `dist/`
- SSG pre-rendering failures

**Manual Verification**:
```bash
# Check that all expected HTML files exist
ls dist/index.html
ls dist/tools/index.html
ls dist/locations/index.html
ls dist/locations/omaha/index.html
ls dist/locations/omaha/dundee/index.html
ls dist/services/tree-removal/index.html
ls dist/services/tree-trimming/index.html
ls dist/services/tree-health-assessment/index.html
ls dist/services/winter-tree-prep/index.html
ls dist/emergency-tree-service-omaha/index.html
ls dist/tree-consultation-omaha/index.html
```

---

## Test 3: Sitemap Contains Only Canonical 200 URLs

**Command**:
```bash
npm run build
cat dist/sitemap.xml
```

**Expected Result**:
- ✅ `dist/sitemap.xml` exists
- ✅ Contains exactly these route patterns:
  - `/` (homepage)
  - `/tools`
  - `/locations`
  - `/locations/{city}` (8 cities)
  - `/locations/{city}/{neighborhood}` (29 neighborhoods)
  - `/services/{slug}` (4 services)
  - `/emergency-tree-service-omaha`
  - `/tree-consultation-omaha`
- ✅ NO `/404` in sitemap
- ✅ NO broken or malformed URLs
- ✅ All URLs are absolute (e.g., `https://omahatreecare.com/services/tree-removal`)

**Failure Conditions**:
- Missing routes in sitemap
- Malformed URLs (e.g., `/tree-removal` instead of `/services/tree-removal`)
- Duplicate URLs
- `/404` is present

**Manual Count Check**:
```bash
# Total expected routes in sitemap:
# 1 (homepage) + 1 (tools) + 1 (locations directory) + 8 (cities) + 29 (neighborhoods) + 4 (services) + 2 (special) = 46 URLs
grep -c "<url>" dist/sitemap.xml
# Expected output: 46
```

---

## Test 4: No Internal 404s (Local Crawl)

**Method**: Manual click-through or automated crawler

**Option A - Manual**:
```bash
npm run build
npm run preview
# Open http://localhost:4173
# Click through navigation and footer links
# Verify no 404 pages
```

**Option B - Automated** (requires crawler tool):
```bash
# Example with wget spider (Windows: use WSL or skip)
wget --spider -r -nd -nv -l 3 -o crawl.log http://localhost:4173
grep "404" crawl.log
# Expected: No 404 entries
```

**Option C - Playwright Test** (future enhancement):
```javascript
// Example test (not implemented yet)
test('all internal links return 200', async ({ page }) => {
  const links = await page.$$eval('a[href^="/"]', els => els.map(e => e.href))
  for (const link of links) {
    const response = await page.goto(link)
    expect(response.status()).toBe(200)
  }
})
```

**Expected Result**:
- ✅ All internal links return 200 status
- ✅ No navigation links point to 404
- ✅ Footer service links work
- ✅ Breadcrumb links work

**Failure Conditions**:
- Any internal link returns 404
- Missing route handlers
- Broken navigation

---

## Test 5: Every Indexed Page Has Non-Empty `<title>`

**Command**:
```bash
npm run build
# Check a sample of HTML files for title tags
```

**Manual Verification**:
```bash
# Homepage
grep -o "<title>[^<]*</title>" dist/index.html
# Expected: Non-empty title

# Service page
grep -o "<title>[^<]*</title>" dist/services/tree-removal/index.html
# Expected: Non-empty title

# Location page
grep -o "<title>[^<]*</title>" dist/locations/omaha/dundee/index.html
# Expected: Non-empty title

# Tools page
grep -o "<title>[^<]*</title>" dist/tools/index.html
# Expected: Non-empty title
```

**Expected Result**:
- ✅ Every HTML file has `<title>` tag
- ✅ No empty titles (`<title></title>` or `<title> </title>`)
- ✅ Titles are descriptive and include brand name

**Failure Conditions**:
- Missing `<title>` tag
- Empty title content
- Generic titles like "Vite App"

**Automated Check** (PowerShell):
```powershell
# Get all HTML files and check for empty titles
Get-ChildItem -Path dist -Recurse -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '<title>\s*</title>') {
        Write-Host "Empty title in: $($_.FullName)"
    }
}
```

---

## Test 6: Every Indexed Page Has Canonical Tag

**Command**:
```bash
npm run build
# Check HTML files for canonical links
```

**Manual Verification**:
```bash
# Homepage
grep -o '<link rel="canonical"[^>]*>' dist/index.html
# Expected: <link rel="canonical" href="https://omahatreecare.com/">

# Service page
grep -o '<link rel="canonical"[^>]*>' dist/services/tree-removal/index.html
# Expected: <link rel="canonical" href="https://omahatreecare.com/services/tree-removal">

# Location page
grep -o '<link rel="canonical"[^>]*>' dist/locations/omaha/dundee/index.html
# Expected: <link rel="canonical" href="https://omahatreecare.com/locations/omaha/dundee">
```

**Expected Result**:
- ✅ Every HTML file has `<link rel="canonical">`
- ✅ Canonical URLs match the page's actual URL path
- ✅ All canonical URLs use `https://omahatreecare.com` domain
- ✅ No trailing slashes on canonical URLs (per vercel.json config)

**Failure Conditions**:
- Missing canonical tag
- Incorrect canonical URL (doesn't match page path)
- Relative URLs instead of absolute
- Wrong domain

**Automated Check** (PowerShell):
```powershell
# Get all HTML files and check for canonical tags
Get-ChildItem -Path dist -Recurse -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch '<link rel="canonical"') {
        Write-Host "Missing canonical in: $($_.FullName)"
    }
}
```

---

## Test 7: Sitemap Contains Only Canonical 200 URLs (Detailed)

**Command**:
```bash
npm run build
cat dist/sitemap.xml | grep "<loc>"
```

**Expected URLs in Sitemap**:

### Static/Core (3)
```
https://omahatreecare.com/
https://omahatreecare.com/tools
https://omahatreecare.com/locations
```

### Special Pages (2)
```
https://omahatreecare.com/emergency-tree-service-omaha
https://omahatreecare.com/tree-consultation-omaha
```

### Services (4)
```
https://omahatreecare.com/services/tree-removal
https://omahatreecare.com/services/tree-trimming
https://omahatreecare.com/services/tree-health-assessment
https://omahatreecare.com/services/winter-tree-prep
```

### City Hubs (8)
```
https://omahatreecare.com/locations/omaha
https://omahatreecare.com/locations/millard
https://omahatreecare.com/locations/elkhorn
https://omahatreecare.com/locations/gretna
https://omahatreecare.com/locations/ralston
https://omahatreecare.com/locations/papillion
https://omahatreecare.com/locations/bellevue
https://omahatreecare.com/locations/bennington
```

### Neighborhoods (29)
```
https://omahatreecare.com/locations/omaha/dundee
https://omahatreecare.com/locations/omaha/benson
https://omahatreecare.com/locations/omaha/florence
https://omahatreecare.com/locations/omaha/midtown
https://omahatreecare.com/locations/omaha/aksarben
https://omahatreecare.com/locations/omaha/westside
https://omahatreecare.com/locations/omaha/north-omaha
https://omahatreecare.com/locations/omaha/south-omaha
https://omahatreecare.com/locations/millard/old-millard
https://omahatreecare.com/locations/millard/harvey-oaks
https://omahatreecare.com/locations/millard/oak-hills
https://omahatreecare.com/locations/millard/millard-highlands
https://omahatreecare.com/locations/elkhorn/the-ridges
https://omahatreecare.com/locations/elkhorn/pacific-springs
https://omahatreecare.com/locations/elkhorn/skyline-ranches
https://omahatreecare.com/locations/elkhorn/indian-creek
https://omahatreecare.com/locations/gretna/tiburon
https://omahatreecare.com/locations/gretna/aspen-creek
https://omahatreecare.com/locations/gretna/buffalo-creek
https://omahatreecare.com/locations/ralston/mockingbird-hills
https://omahatreecare.com/locations/papillion/shadow-lake
https://omahatreecare.com/locations/papillion/eagle-hills
https://omahatreecare.com/locations/bellevue/fontenelle-hills
https://omahatreecare.com/locations/bennington/newport-landing
```

**Total Count**: 46 URLs

**Forbidden URLs** (must NOT be in sitemap):
```
/404
/home (redirects to /)
/index.html (redirects to /)
/tree-removal (incorrect - should be /services/tree-removal)
```

**Validation Commands**:
```bash
# Ensure /404 is NOT in sitemap
grep "/404" dist/sitemap.xml
# Expected: No output

# Ensure service URLs have /services/ prefix
grep "tree-removal" dist/sitemap.xml
# Expected: https://omahatreecare.com/services/tree-removal (NOT /tree-removal)

# Count total URLs
grep -c "<url>" dist/sitemap.xml
# Expected: 46
```

---

## Test 8: All Service Routes Are Accessible

**Manual Test**:
```bash
npm run build
npm run preview
# Visit each service URL and verify 200 response
```

**URLs to Test**:
- http://localhost:4173/services/tree-removal
- http://localhost:4173/services/tree-trimming
- http://localhost:4173/services/tree-health-assessment
- http://localhost:4173/services/winter-tree-prep

**Expected Result**:
- ✅ All service pages load successfully
- ✅ No 404 errors
- ✅ Page content is specific to the service
- ✅ Breadcrumb navigation works

---

## Test 9: All Location Routes Are Accessible

**Manual Test**:
```bash
npm run build
npm run preview
# Visit sample location URLs
```

**Sample URLs to Test**:
- http://localhost:4173/locations
- http://localhost:4173/locations/omaha
- http://localhost:4173/locations/omaha/dundee
- http://localhost:4173/locations/millard
- http://localhost:4173/locations/millard/harvey-oaks

**Expected Result**:
- ✅ All location pages load successfully
- ✅ City hubs show neighborhood lists
- ✅ Neighborhood pages show local content
- ✅ Geo coordinates are present in JSON-LD

---

## Test 10: Footer Links Point to Correct Routes

**Manual Test**:
```bash
npm run build
npm run preview
# Open homepage and inspect footer
```

**Expected Footer Links** (per Footer.jsx lines 51-69):
- `/services/tree-removal`
- `/services/tree-trimming`
- `/services/tree-health-assessment`
- `/services/winter-tree-prep`

**Verification**:
```bash
# Check footer links in built HTML
grep -o 'to="/services/[^"]*"' dist/index.html
# Expected: All 4 service routes present
```

**Expected Result**:
- ✅ All footer service links use canonical URLs
- ✅ Clicking footer links navigates to correct pages
- ✅ No broken links

---

## Test 11: JSON-LD Schema Is Valid

**Manual Test**:
```bash
npm run build
# Extract JSON-LD from built files and validate
```

**Sample Validation**:
```bash
# Extract schema from homepage
grep -Pzo '(?s)<script type="application/ld\+json">.*?</script>' dist/index.html

# Validate it's valid JSON
# Copy output and validate at: https://validator.schema.org/
```

**Expected Result**:
- ✅ Every page has JSON-LD schema
- ✅ Schema validates without errors
- ✅ Appropriate schema types used (LocalBusiness, Service, BreadcrumbList, etc.)

---

## Quick Validation Script (PowerShell)

**Save as `validate-build.ps1`**:

```powershell
# Run build
Write-Host "Running build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Check critical HTML files exist
Write-Host "`nChecking critical files..." -ForegroundColor Cyan
$criticalFiles = @(
    "dist/index.html",
    "dist/tools/index.html",
    "dist/locations/index.html",
    "dist/services/tree-removal/index.html",
    "dist/emergency-tree-service-omaha/index.html"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file" -ForegroundColor Green
    } else {
        Write-Host "✗ $file MISSING" -ForegroundColor Red
    }
}

# Check sitemap exists
Write-Host "`nChecking sitemap..." -ForegroundColor Cyan
if (Test-Path "dist/sitemap.xml") {
    $urlCount = (Select-String -Path "dist/sitemap.xml" -Pattern "<url>" -AllMatches).Matches.Count
    Write-Host "✓ Sitemap exists with $urlCount URLs (expected: 46)" -ForegroundColor Green

    # Check for incorrect service URLs
    $badServiceUrls = Select-String -Path "dist/sitemap.xml" -Pattern "omahatreecare.com/tree-(removal|trimming|health|prep)" -AllMatches
    if ($badServiceUrls.Matches.Count -gt 0) {
        Write-Host "✗ Found service URLs WITHOUT /services/ prefix!" -ForegroundColor Red
    } else {
        Write-Host "✓ All service URLs have /services/ prefix" -ForegroundColor Green
    }
} else {
    Write-Host "✗ Sitemap missing!" -ForegroundColor Red
}

# Check for empty titles
Write-Host "`nChecking for empty titles..." -ForegroundColor Cyan
$emptyTitles = Get-ChildItem -Path dist -Recurse -Filter *.html | Where-Object {
    (Get-Content $_.FullName -Raw) -match '<title>\s*</title>'
}

if ($emptyTitles.Count -eq 0) {
    Write-Host "✓ No empty titles found" -ForegroundColor Green
} else {
    Write-Host "✗ Found empty titles in:" -ForegroundColor Red
    $emptyTitles | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Red }
}

# Check for missing canonical tags
Write-Host "`nChecking for canonical tags..." -ForegroundColor Cyan
$missingCanonical = Get-ChildItem -Path dist -Recurse -Filter *.html | Where-Object {
    (Get-Content $_.FullName -Raw) -notmatch '<link rel="canonical"'
}

if ($missingCanonical.Count -eq 0) {
    Write-Host "✓ All pages have canonical tags" -ForegroundColor Green
} else {
    Write-Host "✗ Missing canonical tags in:" -ForegroundColor Red
    $missingCanonical | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Red }
}

Write-Host "`nValidation complete!" -ForegroundColor Cyan
```

**Usage**:
```powershell
.\validate-build.ps1
```

---

## Success Criteria Summary

All acceptance tests must pass:

- ✅ Dev server boots without errors
- ✅ Build completes successfully
- ✅ Sitemap contains 46 canonical URLs (no /404, no malformed URLs)
- ✅ Local crawl returns 0 internal 404s
- ✅ No empty `<title>` tags on any indexed page
- ✅ Every indexed page has a canonical tag
- ✅ All service URLs in sitemap have `/services/` prefix
- ✅ Footer links point to correct canonical routes
- ✅ JSON-LD schema is present and valid

**Gate**: If any test fails, STOP and fix before proceeding to next step.
