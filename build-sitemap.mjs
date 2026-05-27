import fs from 'fs';
import path from 'path';
import { loadCities, classifyPage, DOMAIN } from './city-links.mjs';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CITIES = loadCities();
const TODAY = new Date().toISOString().slice(0, 10);

function lastmod(file) {
  const stat = fs.statSync(path.join(SITE, file));
  return new Date(stat.mtime).toISOString().slice(0, 10);
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlEntry({ loc, file, changefreq, priority }) {
  const lm = lastmod(file);
  return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${lm}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function writeUrlset(filename, entries) {
  const body = entries.map(urlEntry).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
  fs.writeFileSync(path.join(SITE, filename), xml);
  return { file: filename, count: entries.length, lastmod: entries.reduce((max, e) => {
    const lm = lastmod(e.file);
    return lm > max ? lm : max;
  }, '1970-01-01') };
}

function sitemapIndexItem(filename, lm) {
  return `  <sitemap>\n    <loc>${DOMAIN}/${filename}</loc>\n    <lastmod>${lm}</lastmod>\n  </sitemap>`;
}

const htmlFiles = fs.readdirSync(SITE).filter(f => f.endsWith('.html')).sort();
const classified = htmlFiles.map(f => classifyPage(f, CITIES));

const groups = {
  pages: [],
  cities: [],
  services: [],
  blogs: [],
};

for (const entry of classified) {
  (groups[entry.group] || groups.pages).push(entry);
}

// Sort services & blogs by city slug then file for logical crawl clusters
const slugOrder = Object.fromEntries(CITIES.map((c, i) => [c.slug, i]));
groups.cities.sort((a, b) => (slugOrder[a.slug] ?? 99) - (slugOrder[b.slug] ?? 99));
groups.services.sort((a, b) => {
  const sa = slugOrder[a.slug] ?? 99;
  const sb = slugOrder[b.slug] ?? 99;
  if (sa !== sb) return sa - sb;
  return a.file.localeCompare(b.file);
});
groups.blogs.sort((a, b) => {
  const sa = slugOrder[a.slug] ?? 99;
  const sb = slugOrder[b.slug] ?? 99;
  if (sa !== sb) return sa - sb;
  return a.file.localeCompare(b.file);
});

// Core pages first within pages group
const pageOrder = ['index.html', 'reviews.html', 'gallery.html', 'faq.html', 'blog-index.html'];
groups.pages.sort((a, b) => {
  const ia = pageOrder.indexOf(a.file);
  const ib = pageOrder.indexOf(b.file);
  if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  return a.file.localeCompare(b.file);
});

const sitemapPages = writeUrlset('sitemap-pages.xml', groups.pages);
const sitemapCities = writeUrlset('sitemap-cities.xml', groups.cities);
const sitemapServices = writeUrlset('sitemap-services.xml', groups.services);
const sitemapBlogs = writeUrlset('sitemap-blogs.xml', groups.blogs);

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexItem('sitemap-pages.xml', sitemapPages.lastmod)}
${sitemapIndexItem('sitemap-cities.xml', sitemapCities.lastmod)}
${sitemapIndexItem('sitemap-services.xml', sitemapServices.lastmod)}
${sitemapIndexItem('sitemap-blogs.xml', sitemapBlogs.lastmod)}
</sitemapindex>`;

fs.writeFileSync(path.join(SITE, 'sitemap.xml'), indexXml);

// Legacy single-file backup for tools that expect flat urlset (optional redirect note in robots)
const allEntries = [...groups.pages, ...groups.cities, ...groups.services, ...groups.blogs];
writeUrlset('sitemap-all.xml', allEntries);

const robots = `User-agent: *
Allow: /

# Primary sitemap index (recommended for Google Search Console)
Sitemap: ${DOMAIN}/sitemap.xml

# Segmented sitemaps
Sitemap: ${DOMAIN}/sitemap-pages.xml
Sitemap: ${DOMAIN}/sitemap-cities.xml
Sitemap: ${DOMAIN}/sitemap-services.xml
Sitemap: ${DOMAIN}/sitemap-blogs.xml
`;
fs.writeFileSync(path.join(SITE, 'robots.txt'), robots);

const total = allEntries.length;
console.log('Elite sitemap index written: sitemap.xml');
console.log(`  sitemap-pages.xml    ${sitemapPages.count} URLs (home, trust, FAQ, blog index)`);
console.log(`  sitemap-cities.xml   ${sitemapCities.count} URLs (city hub pages)`);
console.log(`  sitemap-services.xml ${sitemapServices.count} URLs (same-city service pages)`);
console.log(`  sitemap-blogs.xml    ${sitemapBlogs.count} URLs (city blog articles)`);
console.log(`  sitemap-all.xml      ${total} URLs (flat backup)`);
console.log(`  robots.txt           updated with sitemap index + segments`);
console.log(`Total indexed: ${total} URLs · generated ${TODAY}`);
