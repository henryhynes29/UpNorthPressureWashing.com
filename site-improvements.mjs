import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrStart = code.indexOf('[', start);
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(arrStart, arrEnd + 1));
}

const CITIES = loadCities();
const cityByFile = {};
for (const c of CITIES) cityByFile[c.hubFile] = c;

const MOBILE_BAR = `
<style id="mobile-cta-bar">
.mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:90;
  background:rgba(11,22,34,.94);backdrop-filter:blur(12px);border-top:1px solid rgba(150,190,215,.22);
  padding:10px 14px calc(10px + env(safe-area-inset-bottom));gap:10px}
.mobile-cta a{flex:1;text-align:center;padding:13px 10px;border-radius:40px;font-weight:700;font-size:.88rem;text-decoration:none}
.mobile-cta .call{color:#fff;border:1px solid rgba(160,200,225,.25);background:rgba(255,255,255,.04)}
.mobile-cta .quote{background:linear-gradient(135deg,#e3b53e,#caa033);color:#1a1305}
@media(max-width:768px){.mobile-cta{display:flex}body{padding-bottom:72px}}
</style>
<div class="mobile-cta" aria-label="Quick contact">
  <a class="call" href="tel:+12185768610">📞 218-576-8610</a>
  <a class="quote" href="#quote">Free Quote</a>
</div>`;

const SKIP_LINK = `<a href="#main" class="skip-link" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:100">Skip to content</a>
<style>.skip-link:focus{left:12px;top:12px;width:auto;height:auto;padding:10px 16px;background:#e3b53e;color:#1a1305;font-weight:700;border-radius:8px;text-decoration:none}</style>`;

function breadcrumbs(city, pageName, pageUrl) {
  const hub = city.hubFile;
  const hubLabel = city.name;
  return `
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
  {"@type":"ListItem","position":1,"name":"Home","item":"${DOMAIN}/${hub === 'index.html' ? '' : hub}"},
  {"@type":"ListItem","position":2,"name":"${hubLabel}","item":"${DOMAIN}/${hub === 'index.html' ? '' : hub}"},
  {"@type":"ListItem","position":3,"name":"${pageName}","item":"${DOMAIN}/${pageUrl}"}
]}
</script>`;
}

function patchPage(file) {
  let html = fs.readFileSync(path.join(SITE, file), 'utf8');
  let changed = false;

  if (!html.includes('mobile-cta-bar')) {
    html = html.replace('</body>', `${MOBILE_BAR}\n</body>`);
    changed = true;
  }
  if (!html.includes('skip-link')) {
    html = html.replace('<body>', `<body>\n${SKIP_LINK}`);
    changed = true;
  }
  if (!html.includes('id="main"') && html.includes('<section class="hero')) {
    html = html.replace('<section class="hero', '<main id="main"><section class="hero');
    if (html.includes('</footer>')) {
      html = html.replace('</footer>', '</footer></main>');
    }
    changed = true;
  }
  if (file.startsWith('window-cleaning-')) {
    const slug = file.replace('window-cleaning-', '').replace('.html', '');
    const city = CITIES.find(c => c.slug === slug);
    if (city && !html.includes('BreadcrumbList')) {
      html = html.replace('</head>', `${breadcrumbs(city, 'Window Cleaning', file)}\n</head>`);
      changed = true;
    }
  }
  if (file.startsWith('deck-restoration-')) {
    const slug = file.replace('deck-restoration-', '').replace('.html', '');
    const city = CITIES.find(c => c.slug === slug);
    if (city && !html.includes('BreadcrumbList')) {
      html = html.replace('</head>', `${breadcrumbs(city, 'Deck Restoration', file)}\n</head>`);
      changed = true;
    }
  }
  if (file.startsWith('soft-washing-') || file.startsWith('concrete-washing-') || file.startsWith('commercial-soft-washing-')) {
    const slug = file.replace(/^(soft-washing|concrete-washing|commercial-soft-washing)-/, '').replace('.html', '');
    const city = CITIES.find(c => c.slug === slug);
    const label = file.startsWith('soft-washing-') ? 'Soft Washing' : file.startsWith('concrete-washing-') ? 'Concrete Washing' : 'Commercial Cleaning';
    if (city && !html.includes('BreadcrumbList')) {
      html = html.replace('</head>', `${breadcrumbs(city, label, file)}\n</head>`);
      changed = true;
    }
  }
  html = html.replace(/href="blog"/g, 'href="blog-index.html"');
  if (html.includes('fonts.googleapis.com/css2') && !html.includes('display=swap')) {
    html = html.replace(/family=([^&"']+)/g, (m) => m.includes('display=swap') ? m : m);
  }
  if (changed) fs.writeFileSync(path.join(SITE, file), html);
  return changed;
}

// 1. sitemap.xml
const pages = fs.readdirSync(SITE).filter(f => f.endsWith('.html')).sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(f => {
  const pri = f === 'index.html' ? '1.0' : f.includes('pressure-washing') && !f.startsWith('blog') ? '0.9' : f.startsWith('blog') ? '0.7' : '0.8';
  return `  <url><loc>${DOMAIN}/${f === 'index.html' ? '' : f}</loc><changefreq>monthly</changefreq><priority>${pri}</priority></url>`;
}).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), sitemap);

// 2. robots.txt
fs.writeFileSync(path.join(SITE, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml\n`);

// 3-5. patch all pages
let patched = 0;
for (const f of pages) {
  if (patchPage(f)) patched++;
}

// Copy oxidation image if missing
const oxSrc = path.join(SITE, '..', 'up-north-pressure-washing-oxidzed-siding-duluth.jpg');
const oxDst = path.join(SITE, 'images', 'oxidation-siding.jpg');
if (fs.existsSync(oxSrc) && !fs.existsSync(oxDst)) {
  fs.copyFileSync(oxSrc, oxDst);
}

console.log(`Site improvements: sitemap (${pages.length} URLs), robots.txt, patched ${patched} pages (mobile CTA, skip link, breadcrumbs)`);
