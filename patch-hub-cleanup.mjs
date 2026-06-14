/**
 * Safe cleanup: hub duplicate main, footer corruption, double CTAs, dead burger JS.
 */
import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

const HUB_RE = /^(index|(?:[a-z-]+-(?:mn|wi)-pressure-washing|pressure-washing-cloquet-mn))\.html$/;
const SERVICE_RE = /^(soft-washing|concrete-washing|deck-restoration|gutter-fascia-cleaning|roof-soft-washing|window-cleaning|residential-window-cleaning|commercial-window-cleaning|commercial-soft-washing)-/;

function fixDuplicateMain(html) {
  return html.replace(
    /(<div class="nav-backdrop" id="navBackdrop" hidden><\/div>)<main>\s*<main id="main">/,
    '$1\n<main id="main">'
  );
}

function fixFooterBackticks(html) {
  return html.replace(/`n\s*/g, '\n      ');
}

function stripStickyCta(html) {
  html = html.replace(/<div class="sticky-cta" id="stickyCta"[\s\S]*?<\/div>\s*/g, '');
  html = html.replace(
    /\s*var sticky=document\.getElementById\('stickyCta'\);\s*var applyScroll=function\(\)\{var sy=window\.scrollY;if\(sticky\)sticky\.classList\.toggle\('is-visible',sy>420\);\};\s*var scrollTick=false;\s*window\.addEventListener\('scroll',function\(\)\{\s*if\(!scrollTick\)\{scrollTick=true;requestAnimationFrame\(function\(\)\{applyScroll\(\);scrollTick=false\}\)\}\s*\},\{passive:true\}\);\s*applyScroll\(\);\s*/,
    '\n  '
  );
  return html;
}

function stripDeadBurger(html) {
  html = html.replace(
    /\n\/\/ Mobile menu toggle\s*\nconst burger=document\.getElementById\('burger'\);[\s\S]*?navLinks\.classList\.remove\('open'\);\}\)\);\s*\n\}/g,
    '\n'
  );
  html = html.replace(/\n\/\/ Burger\s*\n+/g, '\n');
  return html;
}

function patchHub(html, filename) {
  if (!HUB_RE.test(filename)) return html;
  html = fixDuplicateMain(html);
  html = fixFooterBackticks(html);
  html = stripStickyCta(html);
  return html;
}

function patchService(html) {
  return stripDeadBurger(html);
}

let changed = 0;
for (const name of fs.readdirSync(SITE)) {
  if (!name.endsWith('.html')) continue;
  const fp = path.join(SITE, name);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  if (HUB_RE.test(name)) html = patchHub(html, name);
  else if (SERVICE_RE.test(name)) html = patchService(html);

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    changed++;
  }
}

console.log(`Hub/cleanup fixes applied to ${changed} pages.`);
