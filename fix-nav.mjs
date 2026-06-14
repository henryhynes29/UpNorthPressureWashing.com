import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

const MAIN_MENU = [
  ['Services', '#soft-washing'],
  ['Service Area', '/service-area'],
  ['Learning Center', '/blog-index'],
  ['Reviews', '/reviews'],
  ['Gallery', '/gallery'],
  ['FAQ', '/faq'],
  ['Contact', '#quote'],
];

const TOP_MENU = [
  ['Services', '/#soft-washing'],
  ['Service Area', '/service-area'],
  ['Learning Center', '/blog-index'],
  ['Reviews', '/reviews'],
  ['Gallery', '/gallery'],
  ['FAQ', '/faq'],
];

function mainNavItems() {
  return MAIN_MENU.map(([label, href]) => `    <li><a href="${href}">${label}</a></li>`).join('\n');
}

function topNavLinks(html) {
  const servicesHref = html.includes('id="services"') ? '#services' : '/#soft-washing';
  const contactHref = html.includes('id="quote"') ? '#quote' : '/#quote';

  return TOP_MENU.map(([label, href]) => {
    const resolved = label === 'Services' ? servicesHref : href;
    return `      <a href="${resolved}">${label}</a>`;
  }).join('\n') + `
      <a href="tel:+12185768610" class="nav-phone" aria-label="Call Up North Pressure Washing at 218-576-8610">218-576-8610</a>
      <a href="${contactHref}" class="nav-cta">Free Quote</a>`;
}

let fixed = 0;

for (const file of fs.readdirSync(SITE).filter((name) => name.endsWith('.html'))) {
  const fp = path.join(SITE, file);
  const before = fs.readFileSync(fp, 'utf8');
  let html = before;

  html = html.replace(
    /<nav class="site-nav" aria-label="Main"><ul id="navlist">[\s\S]*?<\/ul><\/nav>/g,
    `<nav class="site-nav" aria-label="Main"><ul id="navlist">\n${mainNavItems()}\n  </ul></nav>`
  );

  html = html.replace(
    /<nav class="nav-links"([^>]*)>[\s\S]*?<\/nav>/g,
    (_match, attrs) => `<nav class="nav-links"${attrs}>\n${topNavLinks(html)}\n    </nav>`
  );

  if (html !== before) {
    fs.writeFileSync(fp, html);
    fixed++;
  }
}

const broken = [];
for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(SITE, f), 'utf8');
  for (const m of html.matchAll(/href="([^"#][^"]*\.html)/g)) {
    const t = m[1].split('/').pop();
    if (!fs.existsSync(path.join(SITE, t))) broken.push(`${f} → ${t}`);
  }
}
console.log(`Navigation cleaned on ${fixed} HTML files.`);
console.log('Broken links:', broken.length ? broken.join('\n') : 'none');
