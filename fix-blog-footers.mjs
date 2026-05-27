import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const files = fs.readdirSync(SITE).filter(f => f.startsWith('blog-') && f.endsWith('.html'));
let fixed = 0;

for (const f of files) {
  const fp = path.join(SITE, f);
  let h = fs.readFileSync(fp, 'utf8');
  const orig = h;

  h = h.replace(
    /(<div class="crumb">[\s\S]*?<a href="blog-index\.html">Learning Center<\/a>)\s*<a href="gallery\.html">Photo Gallery<\/a>\s*<a href="reviews\.html">Reviews<\/a>/g,
    '$1'
  );

  if (!h.includes('footer class="wrap">© 2026') || !h.includes('href="gallery.html">Gallery')) {
    h = h.replace(
      /(<footer class="wrap">© 2026[^]*?<a href="blog-index\.html">Learning Center<\/a>)\s*<a href="gallery\.html">Photo Gallery<\/a>\s*<a href="reviews\.html">Reviews<\/a>/,
      '$1 · <a href="gallery.html">Gallery</a> · <a href="reviews.html">Reviews</a>'
    );
    h = h.replace(
      /(<footer class="wrap">© 2026[^]*?<a href="blog-index\.html">Learning Center<\/a>)(?!\s*·)/,
      '$1 · <a href="gallery.html">Gallery</a> · <a href="reviews.html">Reviews</a>'
    );
  }

  if (h !== orig) {
    fs.writeFileSync(fp, h);
    fixed++;
  }
}

console.log(`Fixed ${fixed} blog files`);
