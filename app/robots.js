export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/card'] },
    sitemap: 'https://hindus.live/sitemap.xml',
  };
}
