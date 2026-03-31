import type { MetadataRoute } from 'next'
import { CONTACT } from '@/lib/constants'
import { serviceIds } from '@/data/services'
import { cities, allNeighborhoods } from '@/data/locations'
import { posts } from '@/data/blog/posts'

const base = CONTACT.siteUrl

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/contact`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tools`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`,                          lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/free-tree-assessment-omaha`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/accessibility`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const toolRoutes: MetadataRoute.Sitemap = [
    'hazard', 'species', 'cost', 'diy', 'ailments',
  ].map(slug => ({
    url: `${base}/tools/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = serviceIds.map(slug => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const cityRoutes: MetadataRoute.Sitemap = cities.map(city => ({
    url: `${base}/locations/${city}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = allNeighborhoods.map(({ city, neighborhood }) => ({
    url: `${base}/locations/${city}/${neighborhood}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...serviceRoutes,
    ...cityRoutes,
    ...neighborhoodRoutes,
    ...blogRoutes,
  ]
}
