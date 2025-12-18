const { getAllCanonicalRoutes } = require('../src/routes.ts')
const routes = getAllCanonicalRoutes()

console.log('First 30 URLs in sitemap:\n')
routes.slice(0, 30).forEach((r, i) => {
  console.log(`${i + 1}. https://omahatreecare.com${r.path}`)
})

console.log(`\n... (${routes.length - 30} more URLs)`)
