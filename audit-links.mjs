import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const files = fs.readdirSync(SITE).filter(f => f.endsWith('.html'));
const htmlSet = new Set(files);
const broken = [];

function targetExists(href) {
  const clean = href.split('#')[0];
  if (!clean) return true;
  const base = clean.split('/').pop();
  if (htmlSet.has(base)) return true;
  const rel = clean.includes('/') ? clean : base;
  if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(rel)) {
    return fs.existsSync(path.join(SITE, rel));
  }
  return htmlSet.has(rel);
}

for (const f of files) {
  const html = fs.readFileSync(path.join(SITE, f), 'utf8');
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  for (const m of body.matchAll(/href="([^"#][^"]*)"/g)) {
    const h = m[1];
    if (/^(https?:|tel:|mailto:|sms:)/.test(h)) continue;
    if (!targetExists(h)) broken.push(`${f} -> ${h}`);
  }
}

console.log('Broken links:', broken.length ? [...new Set(broken)].join('\n') : 'none');
