import fs from 'fs';
import path from 'path';
import {
  loadCities,
  cityClusterSection,
  detectCityFromFile,
  CLUSTER_CSS,
} from './city-links.mjs';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CITIES = loadCities();

function injectCss(html) {
  if (html.includes('/* CITY-CLUSTER */')) return html;
  if (html.includes('</style>')) {
    return html.replace('</style>', `/* CITY-CLUSTER */${CLUSTER_CSS}\n</style>`);
  }
  return html.replace('</head>', `<style>/* CITY-CLUSTER */${CLUSTER_CSS}</style>\n</head>`);
}

function stripCrossCityArea(html) {
  return html.replace(/<section class="seo-area">[\s\S]*?<\/section>\s*/g, '');
}

function injectCluster(html, file, city) {
  const cluster = cityClusterSection(city, file);
  html = stripCrossCityArea(html);
  html = html.replace(/<!-- CITY-CLUSTER -->[\s\S]*?<\/section>\s*/g, '');

  const anchor = html.includes('<!-- FOOTER -->') ? '<!-- FOOTER -->' : '<footer';
  if (html.includes(anchor)) {
    html = html.replace(anchor, `${cluster}\n\n${anchor}`);
  } else {
    html = html.replace('</body>', `${cluster}\n</body>`);
  }
  return html;
}

function patchFile(file) {
  const city = detectCityFromFile(file, CITIES);
  if (!city) return false;

  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  html = injectCss(html);
  html = injectCluster(html, file, city);

  if (html !== orig) {
    fs.writeFileSync(fp, html);
    return true;
  }
  return false;
}

let patched = 0;
const htmlFiles = fs.readdirSync(SITE).filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  if (patchFile(file)) patched++;
}

console.log(`City cluster links: patched ${patched} pages (same-city service mesh, nearby → hub only)`);
console.log(`Removed cross-city service area grids from window pages`);
