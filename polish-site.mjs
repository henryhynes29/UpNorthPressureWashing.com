import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';

const CITIES = [
  { slug: 'duluth', hub: 'index.html' },
  { slug: 'hermantown', hub: 'hermantown-mn-pressure-washing.html' },
  { slug: 'proctor', hub: 'proctor-mn-pressure-washing.html' },
  { slug: 'cloquet', hub: 'pressure-washing-cloquet-mn.html' },
  { slug: 'superior', hub: 'superior-wi-pressure-washing.html' },
  { slug: 'two-harbors', hub: 'two-harbors-mn-pressure-washing.html' },
  { slug: 'esko', hub: 'esko-mn-pressure-washing.html' },
  { slug: 'carlton', hub: 'carlton-mn-pressure-washing.html' },
  { slug: 'scanlon', hub: 'scanlon-mn-pressure-washing.html' },
  { slug: 'wrenshall', hub: 'wrenshall-mn-pressure-washing.html' },
  { slug: 'barnum', hub: 'barnum-mn-pressure-washing.html' },
  { slug: 'moose-lake', hub: 'moose-lake-mn-pressure-washing.html' },
  { slug: 'silver-bay', hub: 'silver-bay-mn-pressure-washing.html' },
  { slug: 'lake-nebagamon', hub: 'lake-nebagamon-wi-pressure-washing.html' },
  { slug: 'hibbing', hub: 'hibbing-mn-pressure-washing.html' },
  { slug: 'virginia', hub: 'virginia-mn-pressure-washing.html' },
  { slug: 'eveleth', hub: 'eveleth-mn-pressure-washing.html' },
];

function fixDomain(html, file) {
  let out = html.replace(/https:\/\/(?:www\.)?(?:up)+northpressurewashing\.com/gi, DOMAIN);

  // Per-page canonical / og:url when still wrong or missing www
  const base = file === 'index.html' ? `${DOMAIN}/` : `${DOMAIN}/${file}`;
  out = out.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${base}">`
  );
  if (out.includes('property="og:url"')) {
    out = out.replace(/<meta property="og:url" content="[^"]*">/,
      `<meta property="og:url" content="${base}">`);
  }
  if (out.includes('"@type": "LocalBusiness"') || out.includes('"@type":"LocalBusiness"')) {
    out = out.replace(/"url":\s*"https:\/\/[^"]+"/, `"url": "${base}"`);
  }
  return out;
}

function fixBlogLinks(html) {
  return html
    .replace(/href="\/([^"]+\.html(?:#[^"]*)?)"/g, 'href="$1"')
    .replace(/href="\/blog\/([^"]+)"/g, (_, p) => {
      const m = p.match(/soft-washing-home-value-([a-z-]+)/);
      return m ? `href="blog-soft-washing-home-value-${m[1]}.html"` : `href="blog-index.html"`;
    });
}

function fixHubDeckButtons(html, slug) {
  const soft = `soft-washing-${slug}.html`;
  return html.replace(
    new RegExp(`href="[^"]+#deck-restoration">See Our Work`, 'g'),
    `href="${soft}">See Our Work`
  );
}

function addHubFooterLinks(html, city) {
  const s = city.slug;
  const block = `
      <li><a href="${soft(s)}">Soft Washing</a></li>
      <li><a href="concrete-washing-${s}.html">Concrete</a></li>
      <li><a href="commercial-soft-washing-${s}.html">Commercial</a></li>
      <li><a href="blog-soft-washing-home-value-${s}.html">Home Value Guide</a></li>`;
  if (html.includes(`soft-washing-${s}.html">Soft Washing`)) return html;
  return html.replace(
    /<li><a href="[^"]*#window-cleaning">Window Washing<\/a><\/li>/,
    `<li><a href="${city.hub}#window-cleaning">Window Washing</a></li>${block}`
  );
}

function soft(s) { return `soft-washing-${s}.html`; }

const htmlFiles = fs.readdirSync(SITE).filter(f => f.endsWith('.html'));

for (const f of htmlFiles) {
  let html = fs.readFileSync(path.join(SITE, f), 'utf8');
  html = fixDomain(html, f);
  if (f.startsWith('blog-soft-washing')) html = fixBlogLinks(html);
  const city = CITIES.find(c => c.hub === f);
  if (city) {
    html = fixHubDeckButtons(html, city.slug);
    html = addHubFooterLinks(html, city);
  }
  fs.writeFileSync(path.join(SITE, f), html);
}

// Broken link audit
const broken = [];
for (const f of htmlFiles) {
  const html = fs.readFileSync(path.join(SITE, f), 'utf8');
  for (const m of html.matchAll(/href="([^"#][^"]*\.html(?:#[^"]*)?)"/g)) {
    const target = m[1].split('#')[0].split('/').pop();
    if (!fs.existsSync(path.join(SITE, target))) broken.push(`${f} → ${target}`);
  }
}

console.log('Polished', htmlFiles.length, 'pages');
console.log('Broken links:', broken.length ? [...new Set(broken)].join('\n') : 'none');
