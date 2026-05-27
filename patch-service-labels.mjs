import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

for (const f of fs.readdirSync(SITE).filter(x => x.startsWith('deck-restoration-') && x.endsWith('.html'))) {
  let html = fs.readFileSync(path.join(SITE, f), 'utf8');
  html = html.replace('<h3>Patio & Walkway Reset</h3><span>Adjacent Concrete</span>',
    '<h3>Lakefront Deck Restored</h3><span>Wood Cleaning Process</span>');
  fs.writeFileSync(path.join(SITE, f), html);
}

for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('-pressure-washing.html') || x === 'index.html')) {
  let html = fs.readFileSync(path.join(SITE, f), 'utf8');
  html = html.replace(/After window cleaning — crystal clear windows on a commercial building/g,
    'After window cleaning — crystal clear residential glass');
  html = html.replace(/Before window cleaning — grimy commercial glass facade/g,
    'Before window cleaning — filmy residential glass');
  fs.writeFileSync(path.join(SITE, f), html);
}

for (const f of fs.readdirSync(SITE).filter(x => x.startsWith('window-cleaning-') && x.endsWith('.html'))) {
  let html = fs.readFileSync(path.join(SITE, f), 'utf8');
  html = html.replace('<h3>Hard Water & Film, Gone</h3><span>Detail Cleaning</span>',
    '<h3>Interior Clarity</h3><span>Multi-Pane Windows</span>');
  fs.writeFileSync(path.join(SITE, f), html);
}

console.log('Updated slider labels and hub alt text');
