import fs from 'fs';
import path from 'path';

export const DOMAIN = 'https://www.upnorthpressurewashing.com';

export function loadCities() {
  const site = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
  const code = fs.readFileSync(path.join(site, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(code.indexOf('[', start), arrEnd + 1));
}

/** Same-city service routes only — never cross-link service URLs between cities. */
export function cityServiceRoutes(city) {
  const s = city.slug;
  return [
    { file: city.hubFile, label: `${city.name} Home`, short: 'Home' },
    { file: `soft-washing-${s}.html`, label: `Soft Washing — ${city.name}`, short: 'Soft Washing' },
    { file: `roof-soft-washing-${s}.html`, label: `Roof Cleaning — ${city.name}`, short: 'Roof Cleaning' },
    { file: `gutter-fascia-cleaning-${s}.html`, label: `Gutter Cleaning — ${city.name}`, short: 'Gutter Cleaning' },
    { file: `concrete-washing-${s}.html`, label: `Concrete Washing — ${city.name}`, short: 'Concrete' },
    { file: `deck-restoration-${s}.html`, label: `Deck Restoration — ${city.name}`, short: 'Deck & Fence' },
    { file: `window-cleaning-${s}.html`, label: `Window Cleaning — ${city.name}`, short: 'Windows Hub' },
    { file: `residential-window-cleaning-${s}.html`, label: `Residential Windows — ${city.name}`, short: 'Residential Windows' },
    { file: `commercial-window-cleaning-${s}.html`, label: `Commercial Windows — ${city.name}`, short: 'Commercial Windows' },
    { file: `commercial-soft-washing-${s}.html`, label: `Commercial Soft Washing — ${city.name}`, short: 'Commercial Exterior' },
    { file: `blog-soft-washing-home-value-${s}.html`, label: `${city.name} Exterior Care Guide`, short: 'Local Guide' },
  ];
}

export function cityBySlug(cities) {
  return Object.fromEntries(cities.map(c => [c.slug, c]));
}

export function detectCityFromFile(file, cities) {
  if (file === 'index.html') return cities.find(c => c.slug === 'duluth');
  const hub = cities.find(c => c.hubFile === file);
  if (hub) return hub;

  const patterns = [
    /^(soft-washing|concrete-washing|commercial-soft-washing|window-cleaning|deck-restoration|roof-soft-washing|gutter-fascia-cleaning|residential-window-cleaning|commercial-window-cleaning)-(.+)\.html$/,
    /^blog-.+-(.+)\.html$/,
  ];
  for (const re of patterns) {
    const m = file.match(re);
    if (m) return cities.find(c => c.slug === m[m.length - 1]);
  }
  if (file.endsWith('-pressure-washing.html')) {
    return cities.find(c => c.hubFile === file);
  }
  return null;
}

export function nearbyHubLinks(city, cities) {
  const byName = Object.fromEntries(cities.map(c => [c.name.toLowerCase(), c]));
  return city.nearby.slice(0, 5).map(nb => {
    const nc = byName[nb.toLowerCase()] || cities.find(c => c.slug === nb.toLowerCase().replace(/\s+/g, '-'));
    if (!nc || nc.slug === city.slug) return '';
    return `<a href="${nc.hubFile}" class="nearby-hub">${nb}, ${nc.state} services →</a>`;
  }).filter(Boolean);
}

export function cityClusterSection(city, currentFile, cities = loadCities()) {
  const site = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
  const routes = cityServiceRoutes(city).filter(r => fs.existsSync(path.join(site, r.file)));

  const links = routes.map(r => {
    const active = r.file === currentFile ? ' active' : '';
    const aria = r.file === currentFile ? ' aria-current="page"' : '';
    return `<a href="${r.file}" class="cluster-link${active}"${aria}><span class="cluster-short">${r.short}</span><span class="cluster-full">${r.label}</span></a>`;
  }).join('');

  const nearby = nearbyHubLinks(city, cities);
  const nearbyBlock = nearby.length
    ? `<p class="cluster-nearby">Nearby towns we serve (city home pages only): ${nearby.join(' ')}</p>`
    : '';

  return `<!-- CITY-CLUSTER -->
<section class="city-cluster" id="city-services">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>${city.name}, ${city.state} · Same City</span>
      <h2>All <span class="ice">${city.name}</span> Exterior Cleaning Pages</h2>
      <p>Every link below stays in <strong>${city.name}, ${city.state}</strong> — so Google and visitors always get the right local page, not another city's service URL.</p>
    </div>
    <nav class="cluster-grid reveal" aria-label="${city.name} exterior cleaning services">${links}</nav>
    ${nearbyBlock}
  </div>
</section>`;
}

export const CLUSTER_CSS = `
.city-cluster{padding:64px 0;border-top:1px solid var(--line);background:rgba(255,255,255,.012)}
.cluster-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;max-width:980px;margin:0 auto}
.cluster-link{display:flex;flex-direction:column;gap:4px;padding:14px 16px;border-radius:12px;border:1px solid var(--glass-line);background:var(--glass);text-decoration:none;transition:.2s}
.cluster-link:hover,.cluster-link.active{border-color:var(--ice);transform:translateY(-2px)}
.cluster-link.active{background:rgba(127,198,232,.08)}
.cluster-short{font-weight:700;color:#fff;font-size:.9rem}
.cluster-full{font-size:.78rem;color:var(--text-dim);line-height:1.35}
.cluster-nearby{text-align:center;margin-top:22px;font-size:.88rem;color:var(--text-dim);max-width:820px;margin-left:auto;margin-right:auto}
.nearby-hub{color:var(--ice);font-weight:600;text-decoration:none;margin:0 6px}
.nearby-hub:hover{text-decoration:underline}
@media(max-width:760px){.cluster-grid{grid-template-columns:1fr 1fr}}
`;

export function classifyPage(file, cities) {
  const loc = file === 'index.html' ? `${DOMAIN}/` : `${DOMAIN}/${file}`;
  const city = detectCityFromFile(file, cities);
  const slug = city?.slug;

  if (file === 'index.html') {
    return { loc, file, tier: 'home', changefreq: 'weekly', priority: '1.0', group: 'pages', slug: 'duluth' };
  }
  if (['reviews.html', 'gallery.html'].includes(file)) {
    return { loc, file, tier: 'trust', changefreq: 'monthly', priority: '0.88', group: 'pages' };
  }
  if (file === 'faq.html') {
    return { loc, file, tier: 'faq', changefreq: 'monthly', priority: '0.82', group: 'pages' };
  }
  if (file === 'blog-index.html') {
    return { loc, file, tier: 'blog-index', changefreq: 'weekly', priority: '0.85', group: 'pages' };
  }
  if (city && city.hubFile === file) {
    return { loc, file, tier: 'city-hub', changefreq: 'weekly', priority: '0.95', group: 'cities', slug };
  }
  if (file.startsWith('blog-')) {
    return { loc, file, tier: 'blog', changefreq: 'monthly', priority: '0.62', group: 'blogs', slug };
  }
  if (file.startsWith('residential-window-cleaning-') || file.startsWith('commercial-window-cleaning-')) {
    return { loc, file, tier: 'service-window-split', changefreq: 'monthly', priority: '0.93', group: 'services', slug };
  }
  if (file.startsWith('roof-soft-washing-') || file.startsWith('gutter-fascia-cleaning-')) {
    return { loc, file, tier: 'service-roof-gutter', changefreq: 'monthly', priority: '0.92', group: 'services', slug };
  }
  if (/^(soft-washing|concrete-washing|commercial-soft-washing|window-cleaning|deck-restoration)-/.test(file)) {
    return { loc, file, tier: 'service', changefreq: 'monthly', priority: '0.90', group: 'services', slug };
  }
  return { loc, file, tier: 'other', changefreq: 'monthly', priority: '0.75', group: 'pages' };
}
