/**
 * Safe, idempotent nav enhancements — does NOT replace footers or hub layouts.
 * Run after: node build-unified-nav.mjs
 */
import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CSS_MARKER = '/* NAV-ENHANCE */';

const SERVICE_RE = /^(soft-washing|concrete-washing|deck-restoration|gutter-fascia-cleaning|roof-soft-washing|window-cleaning|residential-window-cleaning|commercial-window-cleaning|commercial-soft-washing)-/;
const SKIP = new Set(['learning-center-mn.html', '404.html', 'privacy.html', 'thank-you.html']);

const HUB_URLS = {
  duluth: '/', hermantown: '/hermantown-mn-pressure-washing', proctor: '/proctor-mn-pressure-washing',
  superior: '/superior-wi-pressure-washing', cloquet: '/pressure-washing-cloquet-mn',
  carlton: '/carlton-mn-pressure-washing', esko: '/esko-mn-pressure-washing',
  scanlon: '/scanlon-mn-pressure-washing', wrenshall: '/wrenshall-mn-pressure-washing',
  barnum: '/barnum-mn-pressure-washing', hibbing: '/hibbing-mn-pressure-washing',
  virginia: '/virginia-mn-pressure-washing', eveleth: '/eveleth-mn-pressure-washing',
  'two-harbors': '/two-harbors-mn-pressure-washing', 'silver-bay': '/silver-bay-mn-pressure-washing',
  'moose-lake': '/moose-lake-mn-pressure-washing', 'lake-nebagamon': '/lake-nebagamon-wi-pressure-washing',
};

const CITY_LABELS = {
  duluth: 'Duluth', hermantown: 'Hermantown', proctor: 'Proctor', superior: 'Superior',
  cloquet: 'Cloquet', carlton: 'Carlton', esko: 'Esko', scanlon: 'Scanlon', wrenshall: 'Wrenshall',
  barnum: 'Barnum', hibbing: 'Hibbing', virginia: 'Virginia', eveleth: 'Eveleth',
  'two-harbors': 'Two Harbors', 'silver-bay': 'Silver Bay', 'moose-lake': 'Moose Lake',
  'lake-nebagamon': 'Lake Nebagamon',
};

const SERVICE_NAV = [
  { prefix: 'residential-window-cleaning', slug: 'residential-window-cleaning', label: 'Res. Windows' },
  { prefix: 'commercial-window-cleaning', slug: 'commercial-window-cleaning', label: 'Comm. Windows' },
  { prefix: 'commercial-soft-washing', slug: 'commercial-soft-washing', label: 'Commercial' },
  { prefix: 'gutter-fascia-cleaning', slug: 'gutter-fascia-cleaning', label: 'Gutters' },
  { prefix: 'roof-soft-washing', slug: 'roof-soft-washing', label: 'Roof' },
  { prefix: 'concrete-washing', slug: 'concrete-washing', label: 'Concrete' },
  { prefix: 'deck-restoration', slug: 'deck-restoration', label: 'Deck' },
  { prefix: 'soft-washing', slug: 'soft-washing', label: 'Soft Washing' },
  { prefix: 'window-cleaning', slug: 'window-cleaning', label: 'Windows' },
];

const ENHANCE_CSS = `${CSS_MARKER}
.svc-subnav{position:sticky;top:68px;z-index:53;background:rgba(11,22,34,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(150,190,215,.12)}
.svc-subnav__in{display:flex;align-items:center;gap:6px;padding:10px 0;overflow-x:auto;scrollbar-width:none}
.svc-subnav__in::-webkit-scrollbar{display:none}
.svc-subnav a{flex-shrink:0;font-size:.76rem;font-weight:600;color:#b3c4cf;text-decoration:none;padding:7px 12px;border-radius:20px;border:1px solid transparent;white-space:nowrap}
.svc-subnav a:hover{color:#fff;border-color:rgba(160,200,225,.2)}
.svc-subnav a.is-active,.svc-subnav a.svc-subnav__home{color:#7fc6e8;border-color:rgba(127,198,232,.28);background:rgba(127,198,232,.08)}
.crumb.svc-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:.82rem;color:#b3c4cf;margin:14px auto 0;max-width:1180px;padding:0 clamp(14px,3vw,22px)}
.crumb.svc-crumb a{color:#7fc6e8;text-decoration:none;font-weight:500}
.crumb.svc-crumb .sep{opacity:.45}
`;

function injectCss(html) {
  if (html.includes(CSS_MARKER)) return html;
  if (html.includes('</style>')) return html.replace('</style>', `${ENHANCE_CSS}\n</style>`);
  return html;
}

function resolveQuote(html) {
  if (html.includes('id="quote"')) return '#quote';
  if (html.includes('id="quote-cta"')) return '#quote-cta';
  return '/pricing';
}

function mobileCtaHtml(quote) {
  return `<style id="mobile-cta-bar">
.mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:90;background:rgba(11,22,34,.94);backdrop-filter:blur(12px);border-top:1px solid rgba(150,190,215,.22);padding:10px 14px calc(10px + env(safe-area-inset-bottom));gap:10px}
.mobile-cta a{flex:1;text-align:center;padding:13px 10px;border-radius:40px;font-weight:700;font-size:.88rem;text-decoration:none}
.mobile-cta .call{color:#fff;border:1px solid rgba(160,200,225,.25);background:rgba(255,255,255,.04)}
.mobile-cta .quote{background:linear-gradient(135deg,#e3b53e,#caa033);color:#1a1305}
@media(max-width:768px){.mobile-cta{display:flex}body{padding-bottom:72px}}
</style>
<div class="mobile-cta" aria-label="Quick contact">
  <a class="call" href="tel:+12185768610">218-576-8610</a>
  <a class="quote" href="${quote}">Free Quote</a>
</div>`;
}

function parseService(filename) {
  for (const s of SERVICE_NAV) {
    const pre = `${s.prefix}-`;
    if (!filename.startsWith(pre) || !filename.endsWith('.html')) continue;
    const city = filename.slice(pre.length, -5);
    if (CITY_LABELS[city]) return { ...s, city };
  }
  return null;
}

function buildSubnav(info) {
  const hub = HUB_URLS[info.city] || '/';
  const cityLabel = CITY_LABELS[info.city];
  const links = SERVICE_NAV.map((s) => {
    const active = s.prefix === info.prefix ? ' class="is-active" aria-current="page"' : '';
    return `    <a href="/${s.slug}-${info.city}"${active}>${s.label}</a>`;
  }).join('\n');
  return `<nav class="svc-subnav" aria-label="${cityLabel} services">
  <div class="wrap svc-subnav__in">
    <a href="${hub}" class="svc-subnav__home">${cityLabel}</a>
${links}
  </div>
</nav>`;
}

function buildCrumb(info) {
  const hub = HUB_URLS[info.city] || '/';
  const cityLabel = CITY_LABELS[info.city];
  const label = SERVICE_NAV.find((s) => s.prefix === info.prefix)?.label || info.prefix;
  return `<nav class="crumb svc-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><a href="${hub}">${cityLabel}</a><span class="sep">›</span><span aria-current="page">${label}</span></nav>`;
}

function patchServicePage(html, filename) {
  const info = parseService(filename);
  if (!info) return html;
  html = injectCss(html);
  if (!html.includes('class="svc-subnav"')) {
    const block = `${buildSubnav(info)}\n${buildCrumb(info)}\n`;
    if (!html.includes('class="svc-crumb"')) {
      html = html.replace(
        /<div class="nav-backdrop" id="navBackdrop" hidden><\/div>/,
        `<div class="nav-backdrop" id="navBackdrop" hidden></div>\n${block}`
      );
    }
  }
  return html;
}

function addMobileCta(html) {
  if (html.includes('class="mobile-cta"')) return html;
  return html.replace('</body>', `${mobileCtaHtml(resolveQuote(html))}\n</body>`);
}

function patchTargetedLinks(html, filename) {
  if (filename === 'faq.html') {
    html = html.replace(
      /<a href="\/">See all service areas<\/a>/g,
      '<a href="/service-area">See all service areas</a>'
    );
  }
  if (filename === 'gallery.html' || filename === 'reviews.html') {
    html = html.replace(/index\.html#quote/g, '/pricing');
    html = html.replace(/href="index\.html"/g, 'href="/"');
    html = html.replace(/href="gallery\.html"/g, 'href="/gallery"');
    html = html.replace(/href="reviews\.html"/g, 'href="/reviews"');
    html = html.replace(/href="blog-index\.html"/g, 'href="/blog-index"');
    html = html.replace(/href="faq\.html"/g, 'href="/faq"');
  }
  return html;
}

let changed = 0;
for (const name of fs.readdirSync(SITE)) {
  if (!name.endsWith('.html') || SKIP.has(name)) continue;
  const fp = path.join(SITE, name);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  if (SERVICE_RE.test(name)) html = patchServicePage(html, name);
  html = html.replace(/<\/nav><!-- HERO -->/g, '</nav>\n\n<!-- HERO -->');
  html = patchTargetedLinks(html, name);
  html = addMobileCta(html);

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    changed++;
  }
}

console.log(`Safe nav enhancements applied to ${changed} pages.`);
