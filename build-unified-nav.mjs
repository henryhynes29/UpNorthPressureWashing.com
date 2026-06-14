import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CSS_MARKER = '/* UNIFIED-NAV */';
const JS_MARKER = '/* UNIFIED-NAV-JS */';

const PHONE_ICON = '<span class="ui-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.41 2.33.63 3.57.63a1 1 0 011 1V21a1 1 0 01-1 1C10.85 22 2 13.15 2 2a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.22 2.45.63 3.57a1 1 0 01-.25 1.01l-2.26 2.21z"/></svg></span>';

const BRAND_MARK = `<span class="mark"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L4 9v11h5v-6h6v6h5V9z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 13c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5" stroke="#a9dcf2" stroke-width="1.3"/></svg></span>`;

const SKIP_LINK = `<a href="#main" class="skip-link">Skip to content</a>`;

const UNIFIED_NAV_CSS = `${CSS_MARKER}
.skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:200}
.skip-link:focus{left:12px;top:12px;width:auto;height:auto;padding:10px 16px;background:#e3b53e;color:#1a1305;font-weight:700;border-radius:8px;text-decoration:none}
.unified-header,header.nav.unified-header{position:sticky;top:0;z-index:60;transition:background .3s ease,box-shadow .3s ease,border-color .3s ease;background:rgba(11,22,34,.78);backdrop-filter:blur(16px) saturate(1.15);-webkit-backdrop-filter:blur(16px) saturate(1.15);border-bottom:1px solid rgba(150,190,215,.14)}
.unified-header.is-scrolled{background:rgba(11,22,34,.95);box-shadow:0 12px 40px rgba(0,0,0,.38);border-bottom-color:rgba(127,198,232,.24)}
.unified-header .nav-in,.unified-header .wrap.nav-in{max-width:1180px;margin:0 auto;padding:0 clamp(14px,3vw,22px);display:flex;align-items:center;justify-content:space-between;gap:12px;height:68px;position:relative}
.unified-header .brand{display:flex;align-items:center;gap:11px;font-family:'Fraunces',serif;font-weight:600;font-size:clamp(1rem,2.4vw,1.14rem);color:#fff;text-decoration:none;flex-shrink:0;min-width:0}
.unified-header .brand .mark{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(140deg,#1d3a4d,#102330);border:1px solid rgba(160,200,225,.16);box-shadow:0 4px 16px rgba(0,0,0,.25);flex-shrink:0}
.unified-header .brand small{display:block;font-family:'Outfit',sans-serif;font-weight:500;font-size:.58rem;letter-spacing:.26em;color:#7fc6e8;text-transform:uppercase;margin-top:1px}
.unified-header .nav-links{display:flex;align-items:center;gap:clamp(8px,1.4vw,20px)}
.unified-header .nav-links a{color:#b3c4cf;text-decoration:none;font-size:.84rem;font-weight:500;white-space:nowrap;transition:color .2s}
.unified-header .nav-links a:hover,.unified-header .nav-links a:focus-visible{color:#fff;outline:none}
.unified-header .nav-links a.is-active{color:#7fc6e8;font-weight:600}
.unified-header .nav-phone{display:inline-flex;align-items:center;justify-content:center;gap:.35rem;min-height:40px;padding:9px 14px;border-radius:40px;border:1px solid rgba(160,200,225,.22);color:#7fc6e8;font-weight:600;font-size:.8rem;white-space:nowrap;box-sizing:border-box}
.unified-header .nav-phone:hover{color:#fff;border-color:#7fc6e8}
.unified-header .nav-cta{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:9px 18px;border-radius:40px;background:linear-gradient(135deg,#e3b53e,#caa033);color:#1a1305;font-weight:700;font-size:.76rem;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;box-shadow:0 6px 20px rgba(227,181,62,.28);white-space:nowrap;box-sizing:border-box}
.unified-header .nav-cta:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(227,181,62,.4)}
.unified-header .burger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;border:1px solid rgba(255,255,255,.1);border-radius:10px;background:rgba(255,255,255,.04);z-index:62;flex-shrink:0}
.unified-header .burger span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .28s,opacity .2s}
.unified-header .burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.unified-header .burger.open span:nth-child(2){opacity:0}
.unified-header .burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.nav-backdrop{position:fixed;inset:0;background:rgba(6,12,18,.62);opacity:0;visibility:hidden;transition:opacity .28s,visibility .28s;z-index:58;backdrop-filter:blur(3px)}
.nav-backdrop.open{opacity:1;visibility:visible}
body.nav-open{overflow:hidden}
@media(max-width:960px){
  .unified-header .nav-links{display:none;position:absolute;left:0;right:0;top:100%;flex-direction:column;align-items:stretch;background:rgba(11,22,34,.98);padding:8px 0 10px;gap:0;border-bottom:1px solid rgba(150,190,215,.18);box-shadow:0 20px 48px rgba(0,0,0,.48);max-height:min(75vh,520px);overflow-y:auto;z-index:61}
  .unified-header .nav-links.open{display:flex}
  .unified-header .nav-links a{padding:14px 22px;border-bottom:1px solid rgba(255,255,255,.05);width:100%;font-size:.94rem;text-align:left}
  .unified-header .nav-links .nav-phone,.unified-header .nav-links .nav-cta{margin:10px 18px 4px;width:calc(100% - 36px);justify-content:center;min-height:46px;font-size:.88rem}
  .unified-header .burger{display:flex}
}
@media(min-width:961px){
  .unified-header .nav-links .nav-phone,.unified-header .nav-links .nav-cta{margin-left:2px}
}
`;

const UNIFIED_NAV_JS = `<script>${JS_MARKER}
(function(){
  var hdr=document.querySelector('.unified-header');
  var burger=document.getElementById('navBurger');
  var links=document.getElementById('navLinks');
  var backdrop=document.getElementById('navBackdrop');
  function closeNav(){
    if(burger){burger.classList.remove('open');burger.setAttribute('aria-expanded','false')}
    if(links)links.classList.remove('open');
    if(backdrop){backdrop.classList.remove('open');backdrop.hidden=true}
    document.body.classList.remove('nav-open');
  }
  function openNav(){
    if(burger){burger.classList.add('open');burger.setAttribute('aria-expanded','true')}
    if(links)links.classList.add('open');
    if(backdrop){backdrop.hidden=false;backdrop.classList.add('open')}
    document.body.classList.add('nav-open');
  }
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.contains('open')?closeNav():openNav()});
    if(backdrop)backdrop.addEventListener('click',closeNav);
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeNav)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeNav()});
  }
  if(hdr){
    var onScroll=function(){hdr.classList.toggle('is-scrolled',window.scrollY>16)};
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }
})();
</script>`;

const SKIP_PAGES = new Set(['learning-center-mn.html']);

const HUB_RE = /^(index|(?:[a-z-]+-(?:mn|wi)-pressure-washing|pressure-washing-cloquet-mn))\.html$/;
const BLOG_RE = /^blog-.*\.html$/;
const SERVICE_RE = /^(soft-washing|concrete-washing|deck-restoration|gutter-fascia-cleaning|roof-soft-washing|window-cleaning|residential-window-cleaning|commercial-window-cleaning|commercial-soft-washing)-/;
const GUIDE_RE = /^(exterior-stain-identifier|pressure-washing-psi-chart|soft-wash-chemistry|soft-washing-vs-pressure|how-to-hire|how-long-does|pressure-washing-cost|ice-dams|moss-on-roof|roof-black-streaks|roof-cleaning-|gutter-tiger|green-algae|hard-water|vinyl-siding|cedar-|lp-smartside|metal-roof|stamped-concrete|asphalt-driveway|oil-stain|rust-stains|graffiti|dumpster-pad|warehouse-|storefront-|commercial-multifamily|post-construction|play-structure|fence-cleaning|deck-staining|dock-lakeside|cabin-lake|curb-appeal|duluth-microclimates|spiders-webs|spring-exterior|solar-panel|bird-droppings|paint-prep|paver-patio|concrete-sealing|road-salt|warehouse)/;

function detectActive(filename) {
  if (filename === 'service-area.html') return 'service-area';
  if (filename === 'pricing.html') return 'pricing';
  if (filename === 'reviews.html') return 'reviews';
  if (filename === 'gallery.html') return 'gallery';
  if (filename === 'faq.html') return 'faq';
  if (filename === 'blog-index.html' || BLOG_RE.test(filename)) return 'learning';
  if (HUB_RE.test(filename) || SERVICE_RE.test(filename)) return 'services';
  return '';
}

function resolveHrefs(html, filename) {
  let services = '/#soft-washing';
  if (html.includes('id="soft-washing"') || filename === 'index.html') services = '#soft-washing';
  else if (html.includes('id="services"')) services = '#services';

  let quote = '/#quote';
  if (html.includes('id="quote"')) quote = '#quote';
  else if (html.includes('id="quote-cta"')) quote = '#quote-cta';

  return { services, quote };
}

function buildNavHtml(html, filename) {
  const active = detectActive(filename);
  const { services, quote } = resolveHrefs(html, filename);
  const items = [
    ['Services', services, 'services'],
    ['Service Area', '/service-area', 'service-area'],
    ['Pricing', '/pricing', 'pricing'],
    ['Learning Center', '/blog-index', 'learning'],
    ['Reviews', '/reviews', 'reviews'],
    ['Gallery', '/gallery', 'gallery'],
    ['FAQ', '/faq', 'faq'],
  ];

  const links = items.map(([label, href, key]) => {
    const cls = active === key ? ' class="is-active" aria-current="page"' : '';
    return `      <a href="${href}"${cls}>${label}</a>`;
  }).join('\n');

  return `<header class="nav unified-header" id="siteNav">
  <div class="wrap nav-in">
    <a href="/" class="brand" aria-label="Up North Pressure Washing home">
      ${BRAND_MARK}
      <span>Up North<small>Pressure Washing</small></span>
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Main">
${links}
      <a href="tel:+12185768610" class="nav-phone" aria-label="Call 218-576-8610">${PHONE_ICON}218-576-8610</a>
      <a href="${quote}" class="nav-cta">Free Quote</a>
    </nav>
    <button type="button" class="burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="nav-backdrop" id="navBackdrop" hidden></div>`;
}

function injectCss(html) {
  if (html.includes(CSS_MARKER)) {
    return html.replace(/\/\* UNIFIED-NAV \*\/[\s\S]*?(?=\n\/\*|\n<\/style>)/, UNIFIED_NAV_CSS.trim());
  }
  if (html.includes('</style>')) {
    return html.replace('</style>', `${UNIFIED_NAV_CSS}\n</style>`);
  }
  return html.replace('</head>', `<style>${UNIFIED_NAV_CSS}</style>\n</head>`);
}

function injectJs(html) {
  html = stripOldNavJs(html);
  if (html.includes(JS_MARKER)) {
    return html.replace(/<script>\/\* UNIFIED-NAV-JS \*\/[\s\S]*?<\/script>/, UNIFIED_NAV_JS);
  }
  return html.replace('</body>', `${UNIFIED_NAV_JS}\n</body>`);
}

function stripOldNavJs(html) {
  // Hub menu-btn handler
  html = html.replace(
    /\s*var b=document\.getElementById\('menuBtn'\)[\s\S]*?l\.addEventListener\('click',function\(e\)\{if\(e\.target\.tagName==='A'\)closeNav\(\)\}\);\n/,
    '\n'
  );
  // Generic burger handlers
  html = html.replace(
    /const burger=document\.getElementById\('burger'\)[\s\S]*?navLinks\.querySelectorAll\('a'\)\.forEach\(a=>a\.addEventListener\('click',closeNav\)\);\}/g,
    ''
  );
  html = html.replace(
    /const burger = document\.getElementById\('burger'\);[\s\S]*?navLinks\.classList\.remove\('open'\);\s*\}\)\s*\);\s*\}/g,
    ''
  );
  html = html.replace(
    /const burger=document\.getElementById\('burger'\),navLinks=document\.querySelector\('\.nav-links'\);[\s\S]*?navLinks\.classList\.remove\('open'\);\}\)\);\}/g,
    ''
  );
  // siteHeader -> siteNav in remaining scroll handlers
  html = html.replace(/getElementById\('siteHeader'\)/g, "getElementById('siteNav')");
  // Legacy pricing-page burger handler (id changed to navBurger with unified nav)
  html = html.replace(
    /\/\/ Burger menu\s*\n?document\.getElementById\('burger'\)\.addEventListener\('click',function\(\)\{[\s\S]*?\}\);\s*\n/,
    ''
  );
  return html;
}

function replaceHeader(html, filename) {
  const nav = buildNavHtml(html, filename);

  if (html.includes('class="site-header"')) {
    html = html.replace(/<header class="site-header"[\s\S]*?<\/header>/, nav);
    return html;
  }

  if (/<header class="nav[^"]*"/.test(html)) {
    html = html.replace(/<header class="nav[^"]*"[\s\S]*?<\/header>\s*(?:<div class="nav-backdrop" id="navBackdrop" hidden><\/div>\s*)?/, nav);
    // Remove stray duplicate CTA after header (reviews/gallery bug)
    html = html.replace(/(<div class="nav-backdrop" id="navBackdrop" hidden><\/div>\s*)<a href="[^"]*#quote" class="nav-cta">Free Quote<\/a>\s*/g, '$1');
    // Remove duplicate backdrop if old one exists right after new header block
    html = html.replace(
      /(<div class="nav-backdrop" id="navBackdrop" hidden><\/div>\s*)<div class="nav-backdrop" id="navBackdrop" hidden><\/div>/g,
      '$1'
    );
    return html;
  }

  return html;
}

function addSkipAndHeader(html, filename) {
  const nav = buildNavHtml(html, filename);
  let out = html;

  // Remove breadcrumb nav
  out = out.replace(/\s*<p class="nav">[\s\S]*?<\/p>\s*/g, '\n');

  // Remove inline skip-link styles (unified CSS handles it)
  out = out.replace(/<style>\.skip-link:focus\{[^<]*<\/style>\s*/g, '');
  out = out.replace(/<a href="#main" class="skip-link" style="[^"]*">Skip to content<\/a>\s*/g, '');

  if (!out.includes('class="skip-link"')) {
    out = out.replace(/<body>\s*/, `<body>\n${SKIP_LINK}\n`);
  }

  if (!out.includes('unified-header')) {
    // Insert after skip link / atmosphere
    if (out.includes('<div class="atmosphere">')) {
      out = out.replace(/(<div class="atmosphere"><\/div>\s*)/, `$1${nav}\n`);
    } else if (out.includes(SKIP_LINK)) {
      out = out.replace(SKIP_LINK, `${SKIP_LINK}\n${nav}`);
    } else {
      out = out.replace('<body>', `<body>\n${SKIP_LINK}\n${nav}`);
    }
  }

  // Ensure main landmark
  if (!out.includes('id="main"')) {
    out = out.replace(/<div class="wrap">/, '<main id="main" class="wrap">');
    out = out.replace(/<\/body>/, '</main>\n</body>');
    // Fix double-close if wrap wasn't only top-level - faq case
    if ((out.match(/<main id="main"/g) || []).length > 1) {
      out = out.replace(/<main id="main" class="wrap">/, '<div class="wrap">');
    }
  }

  return out;
}

function patchHubScroll(html) {
  if (!html.includes('stickyCta')) return html;
  if (html.includes('if(sticky)sticky.classList.toggle') && !html.includes("getElementById('stickyCta')")) {
    html = html.replace(
      /<script>\s*var applyScroll=function/,
      `<script>\n  var sticky=document.getElementById('stickyCta');\n  var applyScroll=function`
    );
  }
  return html;
}

function cleanupSkipLink(html) {
  html = html.replace(/<style>\.skip-link:focus\{[^<]*<\/style>\s*/g, '');
  html = html.replace(
    /<a (?=[^>]*class="skip-link")[^>]*style="[^"]*"[^>]*>Skip to content<\/a>\s*/g,
    ''
  );
  html = html.replace(
    /<a href="#main" class="skip-link" style="[^"]*">Skip to content<\/a>\s*/g,
    ''
  );
  if (!html.includes('class="skip-link"')) {
    html = html.replace(/<body>\s*/, `<body>\n${SKIP_LINK}\n`);
  }
  return html;
}

function shouldPatch(filename) {
  if (!filename.endsWith('.html')) return false;
  if (SKIP_PAGES.has(filename)) return false;
  return true;
}

function patchFile(fp) {
  const filename = path.basename(fp);
  if (!shouldPatch(filename)) return false;

  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  const hadSiteHeader = html.includes('class="site-header"');
  const hadHeaderNav = /<header class="nav"/.test(html);
  const hadBreadcrumb = html.includes('<p class="nav">');

  if (hadSiteHeader || hadHeaderNav) {
    html = replaceHeader(html, filename);
  } else if (hadBreadcrumb || filename === '404.html' || filename === 'privacy.html' || filename === 'thank-you.html') {
    html = addSkipAndHeader(html, filename);
  } else if (!html.includes('unified-header')) {
    return false;
  } else {
    html = replaceHeader(html, filename);
  }

  html = injectCss(html);
  html = injectJs(html);
  html = patchHubScroll(html);
  html = cleanupSkipLink(html);

  // Remove broken mobile-only hide without burger
  html = html.replace(/@media\(max-width:720px\)\{\.nav-links\{display:none\}\}\s*/g, '');
  html = html.replace(/@media\(max-width:860px\)\{\s*header\.nav\{position:sticky\}[\s\S]*?body\.nav-open\{overflow:hidden\}\s*/g, '');

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    return true;
  }
  return false;
}

let changed = 0;
for (const name of fs.readdirSync(SITE).filter((n) => n.endsWith('.html'))) {
  if (patchFile(path.join(SITE, name))) {
    changed++;
    console.log('nav →', name);
  }
}

// Second pass: fix hub sticky CTA refs after nav JS strip
for (const name of fs.readdirSync(SITE).filter((n) => n.endsWith('.html'))) {
  const fp = path.join(SITE, name);
  let html = fs.readFileSync(fp, 'utf8');
  const fixed = patchHubScroll(cleanupSkipLink(html));
  if (fixed !== html) {
    fs.writeFileSync(fp, fixed, 'utf8');
    console.log('sticky fix →', name);
  }
}

console.log(`Unified navigation applied to ${changed} pages.`);
