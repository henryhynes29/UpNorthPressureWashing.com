import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

const hubs = [
  ['index.html', 'Duluth', 'index.html'],
  ['hermantown-mn-pressure-washing.html', 'Hermantown', 'hermantown-mn-pressure-washing.html'],
  ['proctor-mn-pressure-washing.html', 'Proctor', 'proctor-mn-pressure-washing.html'],
  ['pressure-washing-cloquet-mn.html', 'Cloquet', 'pressure-washing-cloquet-mn.html'],
  ['superior-wi-pressure-washing.html', 'Superior', 'superior-wi-pressure-washing.html'],
  ['two-harbors-mn-pressure-washing.html', 'Two Harbors', 'two-harbors-mn-pressure-washing.html'],
  ['esko-mn-pressure-washing.html', 'Esko', 'esko-mn-pressure-washing.html'],
  ['carlton-mn-pressure-washing.html', 'Carlton', 'carlton-mn-pressure-washing.html'],
  ['scanlon-mn-pressure-washing.html', 'Scanlon', 'scanlon-mn-pressure-washing.html'],
  ['wrenshall-mn-pressure-washing.html', 'Wrenshall', 'wrenshall-mn-pressure-washing.html'],
  ['barnum-mn-pressure-washing.html', 'Barnum', 'barnum-mn-pressure-washing.html'],
  ['moose-lake-mn-pressure-washing.html', 'Moose Lake', 'moose-lake-mn-pressure-washing.html'],
  ['silver-bay-mn-pressure-washing.html', 'Silver Bay', 'silver-bay-mn-pressure-washing.html'],
  ['lake-nebagamon-wi-pressure-washing.html', 'Lake Nebagamon', 'lake-nebagamon-wi-pressure-washing.html'],
  ['hibbing-mn-pressure-washing.html', 'Hibbing', 'hibbing-mn-pressure-washing.html'],
  ['virginia-mn-pressure-washing.html', 'Virginia', 'virginia-mn-pressure-washing.html'],
  ['eveleth-mn-pressure-washing.html', 'Eveleth', 'eveleth-mn-pressure-washing.html'],
];

function navItems(name, hub) {
  return `    <li><a href="${hub}#window-cleaning">Window Cleaning</a></li>
    <li><a href="hermantown-mn-pressure-washing.html">Hermantown</a></li>
    <li><a href="superior-wi-pressure-washing.html">Superior</a></li>
    <li><a href="pressure-washing-cloquet-mn.html">Cloquet</a></li>
    <li><a href="two-harbors-mn-pressure-washing.html">Two Harbors</a></li>
    <li><a href="esko-mn-pressure-washing.html">Esko</a></li>
    <li><a href="hibbing-mn-pressure-washing.html">Hibbing</a></li>
    <li><a href="blog-index.html">Learning Center</a></li>
    <li><a href="${hub}">${name} Home</a></li>
    <li><a href="faq.html">FAQ</a></li>
    <li><a href="#quote">Contact</a></li>`;
}

for (const [file, name, hub] of hubs) {
  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(
    /<nav class="site-nav" aria-label="Main"><ul id="navlist">[\s\S]*?<\/ul><\/nav>/,
    `<nav class="site-nav" aria-label="Main"><ul id="navlist">\n${navItems(name, hub)}\n  </ul></nav>`
  );
  fs.writeFileSync(fp, html);
  console.log('Nav fixed:', file);
}

const broken = [];
for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(SITE, f), 'utf8');
  for (const m of html.matchAll(/href="([^"#][^"]*\.html)/g)) {
    const t = m[1].split('/').pop();
    if (!fs.existsSync(path.join(SITE, t))) broken.push(`${f} → ${t}`);
  }
}
console.log('Broken links:', broken.length ? broken.join('\n') : 'none');
