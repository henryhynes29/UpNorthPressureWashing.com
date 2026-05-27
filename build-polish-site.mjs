import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const PHONE_TEL = '+12185768610';

const stats = {
  patched: 0,
  indexFixed: false,
  formsUpgraded: 0,
  slidersUpgraded: 0,
  geoFixed: 0,
  guaranteeFixed: 0,
  hubDeduped: 0,
  redirects: 0,
  galleryFixed: 0,
};

const OLD_SUBMIT = /(?:async )?function submitForm\([^)]*\)\{[\s\S]*?\n\}/;

const NEW_SUBMIT = `async function submitForm(e){
  if(e)e.preventDefault();
  const fn=(document.getElementById('fn')?.value||'').trim();
  const em=(document.getElementById('em')?.value||'').trim();
  if(!fn||!em){alert('Please enter at least your first name and email.');return;}
  const form=document.getElementById('quoteForm');
  if(!form)return;
  const btn=form.querySelector('.submit');
  const prevLabel=btn?.textContent||'';
  if(btn){btn.disabled=true;btn.textContent='Sending…';}
  const data=new FormData(form);
  data.set('form-name','quote-request');
  if(!data.get('page'))data.set('page',location.pathname.replace(/^\\//,'')||'index.html');
  try{
    const res=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});
    if(!res.ok)throw new Error('submit failed');
    form.style.display='none';
    const okView=document.getElementById('okView');
    if(okView){
      okView.classList.add('show');
      const note=okView.querySelector('p');
      if(note)note.innerHTML='We\\'ve received your request and will reach out within one business day. Need a faster reply? <a href="tel:${PHONE_TEL}" style="color:#2e8b57;font-weight:700">Call 218-576-8610</a>.';
    }
  }catch(err){
    alert('Something went wrong submitting your request. Please call 218-576-8610 and we will help you directly.');
    if(btn){btn.disabled=false;btn.textContent=prevLabel||'Request My Free Quote →';}
  }
}
document.getElementById('quoteForm')?.addEventListener('submit',submitForm);`;

const SLIDER_RESIZE = `
function refreshBaWidths(){
  document.querySelectorAll('.ba').forEach(ba=>{
    const afterImg=ba.querySelector('.after-wrap img');
    if(afterImg)afterImg.style.width=ba.getBoundingClientRect().width+'px';
  });
}
window.addEventListener('resize',refreshBaWidths,{passive:true});
window.addEventListener('load',refreshBaWidths);
`;

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(code.indexOf('[', start), arrEnd + 1));
}

const CITIES = loadCities();
const stateByName = new Map(CITIES.map(c => [c.name, c.state]));

function fixIndex(html) {
  let out = html;
  out = out.replace(/<main>\s*<main id="main">/, '<main id="main">');
  out = out.replace(/<\/section>\s*<\/main>\s*\n<section class="service-areas"/, '</section>\n\n<section class="service-areas"');
  out = out.replace(/(<\/section>\s*\n)(<footer>)/, '$1</main>\n\n$2');
  out = out.replace(/<\/footer><\/main>/, '</footer>');
  out = out.replace(
    /<p style="margin-top:1\.4rem"><a href="blog-index\.html"[^>]*>Learning Center<\/a>\s*<p style="margin-top:1rem"><a href="gallery\.html"[^>]*>Photo Gallery<\/a><\/p>\s*<p style="margin-top:1rem"><a href="reviews\.html"[^>]*>Reviews<\/a><\/p><\/p>/,
    `<p style="margin-top:1.4rem"><a href="blog-index.html" style="font-family:var(--f-display);text-transform:uppercase;letter-spacing:1px;font-size:1.2rem">Learning Center</a></p>
    <p style="margin-top:1rem"><a href="gallery.html" style="font-family:var(--f-display);text-transform:uppercase;letter-spacing:1px;font-size:1.2rem">Photo Gallery</a></p>
    <p style="margin-top:1rem"><a href="reviews.html" style="font-family:var(--f-display);text-transform:uppercase;letter-spacing:1px;font-size:1.2rem">Reviews</a></p>`
  );
  if (out !== html) stats.indexFixed = true;
  return out;
}

function dedupeSplitHero(html) {
  const count = (html.match(/<div class="split-cards reveal">/g) || []).length;
  if (count <= 1) return html;
  let out = html;
  let first = true;
  out = out.replace(/<div class="split-cards reveal">[\s\S]*?<\/div>\s*/g, (block) => {
    if (first) { first = false; return block; }
    return '';
  });
  first = true;
  out = out.replace(/<div class="split-nav reveal">[\s\S]*?<\/div>\s*/g, (block) => {
    if (first) { first = false; return block; }
    return '';
  });
  if (out !== html) stats.hubDeduped++;
  return out;
}

function fixGeoStrings(html) {
  let out = html.replace(/Superior, MN/g, 'Superior, WI');
  const wrongNearby = [...stateByName.entries()]
    .filter(([name, st]) => st === 'MN')
    .flatMap(([name]) => [`${name}, WI`]);
  for (const wrong of wrongNearby) {
    const right = wrong.replace(', WI', ', MN');
    if (out.includes(wrong)) {
      out = out.replaceAll(wrong, right);
      stats.geoFixed++;
    }
  }
  if (out.includes('Superior, WI')) stats.geoFixed++;
  return out;
}

function fixGuarantee(html, file) {
  if (!file.includes('soft-washing-duluth')) return html;
  return html
    .replace(/2-year guarantee/gi, '1-year regrowth guarantee')
    .replace(/2 year guarantee/gi, '1-year regrowth guarantee');
}

function upgradeServiceScript(html) {
  if (!html.includes('const IMGDATA') || !html.includes('submitForm')) return html;
  let out = html;

  if (OLD_SUBMIT.test(out)) {
    out = out.replace(OLD_SUBMIT, NEW_SUBMIT);
    stats.formsUpgraded++;
  }

  if (!out.includes('refreshBaWidths')) {
    out = out.replace(
      /\/\/ Mobile menu toggle\nconst burger=document\.getElementById\('burger'\);[\s\S]*?navLinks\.querySelectorAll\('a'\)\.forEach\(a=>a\.addEventListener\('click',\(\)=>\{burger\.classList\.remove\('open'\);navLinks\.classList\.remove\('open'\);\}\)\);/,
      `// Mobile menu toggle
const burger=document.getElementById('burger');
const navLinks=document.querySelector('.nav-links');
if(burger&&navLinks){
  burger.addEventListener('click',()=>{burger.classList.toggle('open');navLinks.classList.toggle('open');});
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');navLinks.classList.remove('open');}));
}`
    );
    out = out.replace(
      /(ba\.addEventListener\('touchcancel',up\);\s*\}\);)/,
      `$1${SLIDER_RESIZE}`
    );
    stats.slidersUpgraded++;
  }

  return out;
}

function upgradeGallery(html, file) {
  if (file !== 'gallery.html') return html;
  if (html.includes('Escape') && html.includes('gal-item')) return html;
  let out = html.replace(
    /document\.querySelectorAll\('\.gal-item'\)\.forEach\(\(el,i\)=>el\.addEventListener\('click',/,
    `document.querySelectorAll('.gal-item').forEach((el,i)=>{
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(i);}});
  el.addEventListener('click',`
  );
  if (!out.includes("e.key==='Escape'")) {
    out = out.replace(
      /lb\.addEventListener\('click',e=>\{if\(e\.target===lb\)lb\.classList\.remove\('open'\);\}\);/,
      `lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lb.classList.contains('open'))lb.classList.remove('open');});`
    );
    stats.galleryFixed++;
  }
  return out;
}

function redirectLearningCenter(html, file) {
  if (file !== 'learning-center-mn.html') return html;
  stats.redirects++;
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0;url=blog-index.html">
<link rel="canonical" href="https://www.upnorthpressurewashing.com/blog-index.html">
<title>Redirecting to Learning Center…</title>
<script>location.replace('blog-index.html');</script>
</head>
<body><p><a href="blog-index.html">Continue to Learning Center →</a></p></body>
</html>`;
}

function addImageFallback(html) {
  if (html.includes('img-fallback-init')) return html;
  return html.replace(
    /<\/body>/,
    `<script id="img-fallback-init">
document.querySelectorAll('img[src^="images/"]').forEach(img=>{
  img.addEventListener('error',function(){
    if(this.dataset.fallbackApplied)return;
    this.dataset.fallbackApplied='1';
    this.style.background='linear-gradient(145deg,#0c1824 0%,#1c4259 100%)';
    this.style.minHeight=this.style.minHeight||'120px';
  },{once:true});
});
</script>
</body>`
  );
}
function addSkipLink(html) {
  if (html.includes('skip-link') || !html.includes('id="main"')) return html;
  return html.replace(
    /<body>/,
    `<body>
<a class="skip-link" href="#main" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:9999;padding:12px 18px;background:#e3b53e;color:#1a1305;font-weight:700;text-decoration:none;border-radius:8px">Skip to content</a>
<style>.skip-link:focus{left:12px;top:12px;width:auto;height:auto;overflow:visible}</style>`
  );
}

function patchFile(file) {
  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  if (file === 'learning-center-mn.html') {
    html = redirectLearningCenter(html, file);
  } else {
    if (file === 'index.html') html = fixIndex(html);
    if (/window-cleaning-|residential-window|commercial-window/.test(file)) {
      html = dedupeSplitHero(html);
    }
    html = fixGeoStrings(html);
    html = fixGuarantee(html, file);
    html = upgradeServiceScript(html);
    html = upgradeGallery(html, file);
    html = addSkipLink(html);
    html = addImageFallback(html);
  }

  if (html !== orig) {
    fs.writeFileSync(fp, html);
    stats.patched++;
  }
}

for (const file of fs.readdirSync(SITE).filter(f => f.endsWith('.html'))) {
  patchFile(file);
}

console.log('Site polish complete:');
console.log(`  Pages patched: ${stats.patched}`);
console.log(`  Index HTML structure fixed: ${stats.indexFixed}`);
console.log(`  Quote forms upgraded (Netlify): ${stats.formsUpgraded}`);
console.log(`  Service slider/menu scripts upgraded: ${stats.slidersUpgraded}`);
console.log(`  Window hero deduped: ${stats.hubDeduped}`);
console.log(`  Geo string fixes: ${stats.geoFixed}`);
console.log(`  Gallery keyboard/a11y: ${stats.galleryFixed}`);
console.log(`  Redirects: ${stats.redirects}`);
console.log('\nNext: node build-window-split-pages.mjs  (regenerates clean window pages)');
console.log('Then: node build-city-links.mjs && node build-seo-site.mjs');
