import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CSS_MARKER = '/* SITE-NAV-PLUS */';

const HUB_RE = /^(index|(?:[a-z-]+-(?:mn|wi)-pressure-washing|pressure-washing-cloquet-mn))\.html$/;
const SERVICE_RE = /^(soft-washing|concrete-washing|deck-restoration|gutter-fascia-cleaning|roof-soft-washing|window-cleaning|residential-window-cleaning|commercial-window-cleaning|commercial-soft-washing)-/;
const BLOG_RE = /^blog-.*\.html$/;
const SKIP = new Set(['learning-center-mn.html', '404.html', 'privacy.html', 'thank-you.html']);

const HUB_URLS = {
  duluth: '/',
  hermantown: '/hermantown-mn-pressure-washing',
  proctor: '/proctor-mn-pressure-washing',
  superior: '/superior-wi-pressure-washing',
  cloquet: '/pressure-washing-cloquet-mn',
  carlton: '/carlton-mn-pressure-washing',
  esko: '/esko-mn-pressure-washing',
  scanlon: '/scanlon-mn-pressure-washing',
  wrenshall: '/wrenshall-mn-pressure-washing',
  barnum: '/barnum-mn-pressure-washing',
  hibbing: '/hibbing-mn-pressure-washing',
  virginia: '/virginia-mn-pressure-washing',
  eveleth: '/eveleth-mn-pressure-washing',
  'two-harbors': '/two-harbors-mn-pressure-washing',
  'silver-bay': '/silver-bay-mn-pressure-washing',
  'moose-lake': '/moose-lake-mn-pressure-washing',
  'lake-nebagamon': '/lake-nebagamon-wi-pressure-washing',
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

const SITE_NAV_CSS = `${CSS_MARKER}
.svc-subnav{position:sticky;top:68px;z-index:53;background:rgba(11,22,34,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(150,190,215,.12)}
.svc-subnav__in{display:flex;align-items:center;gap:6px;padding:10px 0;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.svc-subnav__in::-webkit-scrollbar{display:none}
.svc-subnav a{flex-shrink:0;font-size:.76rem;font-weight:600;color:#b3c4cf;text-decoration:none;padding:7px 12px;border-radius:20px;border:1px solid transparent;white-space:nowrap;transition:.2s}
.svc-subnav a:hover{color:#fff;border-color:rgba(160,200,225,.2)}
.svc-subnav a.is-active,.svc-subnav a.svc-subnav__home{color:#7fc6e8;border-color:rgba(127,198,232,.28);background:rgba(127,198,232,.08)}
.svc-subnav__home{margin-right:2px}
.crumb.svc-crumb{margin:16px auto 0;max-width:1180px;padding:0 clamp(14px,3vw,22px)}
.foot-grid{display:grid;grid-template-columns:240px 1fr;gap:52px;padding-bottom:40px}
.foot-links{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.foot-col h4{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#7fc6e8;margin:0 0 14px;font-weight:600}
.foot-col a,.foot-col p{display:block;font-size:.82rem;color:#b3c4cf;text-decoration:none;margin-bottom:7px;line-height:1.4}
.foot-col a:hover{color:#fff}
.foot-bottom{border-top:1px solid rgba(255,255,255,.07);padding:20px 0 28px;text-align:center;font-size:.78rem;color:#8fa8b8}
@media(max-width:900px){.foot-grid{grid-template-columns:1fr}.foot-links{grid-template-columns:1fr 1fr}}
`;

const GENERIC_FOOTER = `<footer>
  <div class="wrap foot-grid">
    <div>
      <a href="/" class="brand" style="text-decoration:none;display:inline-flex;align-items:center;gap:11px;font-family:'Fraunces',serif;color:#fff">
        <span class="mark" style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(140deg,#1d3a4d,#102330);border:1px solid rgba(160,200,225,.16)"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L4 9v11h5v-6h6v6h5V9z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
        <span>Up North<small style="display:block;font-family:'Outfit',sans-serif;font-size:.58rem;letter-spacing:.26em;color:#7fc6e8;text-transform:uppercase">Pressure Washing</small></span>
      </a>
      <p style="color:#b3c4cf;font-size:.9rem;margin-top:16px;max-width:280px">Premium exterior cleaning for Duluth, the North Shore &amp; surrounding Northland.</p>
    </div>
    <div class="foot-links">
      <div class="foot-col"><h4>Services</h4>
        <a href="/soft-washing-duluth">Soft Washing</a>
        <a href="/roof-soft-washing-duluth">Roof Cleaning</a>
        <a href="/gutter-fascia-cleaning-duluth">Gutter Cleaning</a>
        <a href="/concrete-washing-duluth">Concrete</a>
        <a href="/deck-restoration-duluth">Deck &amp; Fence</a>
        <a href="/window-cleaning-duluth">Windows</a>
      </div>
      <div class="foot-col"><h4>Company</h4>
        <a href="/">Home</a>
        <a href="/pricing">Pricing</a>
        <a href="/service-area">Service Area</a>
        <a href="/blog-index">Learning Center</a>
        <a href="/gallery">Gallery</a>
        <a href="/reviews">Reviews</a>
        <a href="/faq">FAQ</a>
      </div>
      <div class="foot-col"><h4>Areas</h4>
        <a href="/">Duluth</a>
        <a href="/hermantown-mn-pressure-washing">Hermantown</a>
        <a href="/superior-wi-pressure-washing">Superior</a>
        <a href="/pressure-washing-cloquet-mn">Cloquet</a>
        <a href="/service-area">All service areas</a>
      </div>
      <div class="foot-col"><h4>Contact</h4>
        <a href="/pricing">Free Quote</a>
        <a href="tel:+12185768610">218-576-8610</a>
        <p>Duluth, MN 55811</p>
      </div>
    </div>
  </div>
  <div class="wrap foot-bottom">&copy; 2026 Up North Pressure Washing &middot; Duluth, MN &middot; Fully Insured</div>
</footer>`;

function injectCss(html) {
  if (html.includes(CSS_MARKER)) {
    return html.replace(/\/\* SITE-NAV-PLUS \*\/[\s\S]*?(?=\n\/\*|\n<\/style>)/, SITE_NAV_CSS.trim());
  }
  return html.replace('</style>', `${SITE_NAV_CSS}\n</style>`);
}

function resolveQuote(html) {
  if (html.includes('id="quote"')) return '#quote';
  if (html.includes('id="quote-cta"')) return '#quote-cta';
  return '/pricing';
}

function mobileCtaBlock(quote) {
  return `<style id="mobile-cta-bar">
.mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:90;background:rgba(11,22,34,.94);backdrop-filter:blur(12px);border-top:1px solid rgba(150,190,215,.22);padding:10px 14px calc(10px + env(safe-area-inset-bottom));gap:10px}
.mobile-cta a{flex:1;text-align:center;padding:13px 10px;border-radius:40px;font-weight:700;font-size:.88rem;text-decoration:none}
.mobile-cta .call{color:#fff;border:1px solid rgba(160,200,225,.25);background:rgba(255,255,255,.04)}
.mobile-cta .quote{background:linear-gradient(135deg,#e3b53e,#caa033);color:#1a1305}
@media(max-width:768px){.mobile-cta{display:flex}body{padding-bottom:72px}}
</style>
<div class="mobile-cta" aria-label="Quick contact">
  <a class="call" href="tel:+12185768610" aria-label="Call 218-576-8610">218-576-8610</a>
  <a class="quote" href="${quote}">Free Quote</a>
</div>`;
}

function parseServiceFile(filename) {
  for (const s of SERVICE_NAV) {
    const pre = `${s.prefix}-`;
    if (filename.startsWith(pre) && filename.endsWith('.html')) {
      const city = filename.slice(pre.length, -5);
      if (CITY_LABELS[city]) return { ...s, city };
    }
  }
  return null;
}

function serviceLabel(prefix) {
  const m = SERVICE_NAV.find((s) => s.prefix === prefix);
  return m ? m.label : prefix.replace(/-/g, ' ');
}

function buildSvcSubnav(info, filename) {
  const hub = HUB_URLS[info.city] || '/';
  const cityLabel = CITY_LABELS[info.city] || info.city;
  const links = SERVICE_NAV.map((s) => {
    const active = s.prefix === info.prefix ? ' class="is-active" aria-current="page"' : '';
    return `    <a href="/${s.slug}-${info.city}"${active}>${s.label}</a>`;
  }).join('\n');
  return `<nav class="svc-subnav" aria-label="${cityLabel} services">
  <div class="wrap svc-subnav__in">
    <a href="${hub}" class="svc-subnav__home">${cityLabel}</a>
${links}
    <a href="/blog-index">Learning Center</a>
  </div>
</nav>`;
}

function buildSvcCrumb(info) {
  const hub = HUB_URLS[info.city] || '/';
  const cityLabel = CITY_LABELS[info.city] || info.city;
  const label = serviceLabel(info.prefix);
  return `<nav class="crumb svc-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><a href="${hub}">${cityLabel}</a><span class="sep">›</span><span aria-current="page">${label}</span></nav>`;
}

function ensureMobileCta(html) {
  if (html.includes('class="mobile-cta"')) return html;
  const block = mobileCtaBlock(resolveQuote(html));
  if (html.includes('id="mobile-cta-bar"')) {
    return html.replace(/<style id="mobile-cta-bar">[\s\S]*?<\/div>\s*(?=<script|<\/body>)/, `${block}\n`);
  }
  return html.replace('</body>', `${block}\n</body>`);
}

function patchServicePage(html, filename) {
  const info = parseServiceFile(filename);
  if (!info) return html;
  html = injectCss(html);
  const subnav = buildSvcSubnav(info, filename);
  const crumb = buildSvcCrumb(info);
  if (!html.includes('class="svc-subnav"')) {
    html = html.replace(
      /<div class="nav-backdrop" id="navBackdrop" hidden><\/div>/,
      `<div class="nav-backdrop" id="navBackdrop" hidden></div>\n${subnav}\n${crumb}`
    );
  }
  return ensureMobileCta(html);
}

function needsRichFooter(filename, html) {
  if (html.includes('class="foot-grid"')) return false;
  if (filename === 'faq.html') return true;
  if (filename === 'gallery.html' || filename === 'reviews.html') return true;
  if (BLOG_RE.test(filename) || filename === 'blog-index.html') return true;
  if (html.includes('class="flinks"') && !HUB_RE.test(filename)) return true;
  return false;
}

function patchRichFooter(html, filename) {
  if (!needsRichFooter(filename, html)) return html;
  html = injectCss(html);
  if (filename === 'gallery.html' || filename === 'reviews.html') {
    html = html.replace(/<footer[\s\S]*?<\/footer>/, GENERIC_FOOTER);
    return html;
  }
  if (filename === 'faq.html') {
    if (html.includes('class="foot-grid"')) {
      const footers = html.match(/<footer>[\s\S]*?<\/footer>/g) || [];
      if (footers.length > 1) {
        html = html.replace(/<footer>[\s\S]*?<\/footer>/, '');
      }
      html = html.replace(
        /(<\/div>)\s*(<footer>)/,
        '$1\n</main>\n$2'
      );
      html = html.replace(/<\/main>\s*<style id="mobile-cta-bar">/, '<style id="mobile-cta-bar">');
      html = html.replace(/(<\/footer>)\s*(<style id="mobile-cta-bar">|<div class="mobile-cta")/, '$1\n$2');
      return html;
    }
    html = html.replace(
      /(<\/div>)\s*(?=<style id="mobile-cta-bar">|<div class="mobile-cta")/,
      `$1\n</main>\n${GENERIC_FOOTER}\n`
    );
    return html;
  }
  if (BLOG_RE.test(filename) || filename === 'blog-index.html') {
    html = html.replace(/<footer class="wrap">[\s\S]*?<\/footer>/, GENERIC_FOOTER);
    html = html.replace(/<footer>\s*<p>[\s\S]*?<\/footer>/, GENERIC_FOOTER);
    return html;
  }
  return html;
}

function patchHubPage(html, filename) {
  if (!HUB_RE.test(filename) || filename === 'index.html') return html;
  html = html.replace(/<main>\s*<main id="main">/g, '<main id="main">');
  html = html.replace(/<div class="sticky-cta"[\s\S]*?<\/div>\s*/g, '');
  html = html.replace(/\s*var sticky=document\.getElementById\('stickyCta'\);[\s\S]*?sticky\.classList\.toggle\('is-visible'[\s\S]*?;\s*/g, '\n');
  html = html.replace(/`n\s*/g, '');
  html = html.replace(/blog-index\.html/g, '/blog-index');
  html = html.replace(/gallery\.html/g, '/gallery');
  html = html.replace(/reviews\.html/g, '/reviews');
  html = html.replace(/faq\.html/g, '/faq');
  const flinksExtra = '<li><a href="/pricing">Pricing</a></li><li><a href="/service-area">Service Area</a></li>';
  if (html.includes('class="flinks"') && !html.includes('href="/pricing"')) {
    html = html.replace(/(<ul class="flinks">)/, `$1\n      ${flinksExtra}`);
  }
  return ensureMobileCta(html);
}

function patchIndex(html) {
  html = html.replace(/<div class="sticky-cta"[\s\S]*?<\/div>\s*/g, '');
  html = html.replace(/\s*var sticky=document\.getElementById\('stickyCta'\);[\s\S]*?sticky\.classList\.toggle\('is-visible'[\s\S]*?;\s*/g, '\n');
  html = html.replace(/\.site-header[^{]*\{[^}]*\}/g, '');
  html = html.replace(/\.menu-btn[^{]*\{[^}]*\}/g, '');
  html = html.replace(/\.site-nav[^{]*\{[^}]*\}/g, '');
  return html;
}

function patchCrossLinks(html, filename) {
  if (filename === 'faq.html') {
    html = html.replace(/<a href="\/">See all service areas<\/a>/g, '<a href="/service-area">See all service areas</a>');
    html = html.replace(/href="\/#quote"/g, 'href="/pricing"');
  }
  if (filename === 'gallery.html' || filename === 'reviews.html') {
    html = html.replace(/index\.html#quote/g, '/pricing');
    html = html.replace(/href="index\.html"/g, 'href="/"');
    html = html.replace(/href="gallery\.html"/g, 'href="/gallery"');
    html = html.replace(/href="reviews\.html"/g, 'href="/reviews"');
    html = html.replace(/href="blog-index\.html"/g, 'href="/blog-index"');
    html = html.replace(/href="faq\.html"/g, 'href="/faq"');
  }
  html = html.replace(/blog-index\.html/g, '/blog-index');
  html = html.replace(/gallery\.html/g, '/gallery');
  html = html.replace(/reviews\.html/g, '/reviews');
  return html;
}

let changed = 0;
for (const name of fs.readdirSync(SITE)) {
  if (!name.endsWith('.html') || SKIP.has(name)) continue;
  const fp = path.join(SITE, name);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  if (SERVICE_RE.test(name)) html = patchServicePage(html, name);
  html = patchHubPage(html, name);
  if (name === 'index.html') html = patchIndex(html);
  html = patchRichFooter(html, name);
  html = patchCrossLinks(html, name);
  html = ensureMobileCta(html);

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    changed++;
  }
}

console.log(`Sitewide nav enhancements applied to ${changed} pages.`);
