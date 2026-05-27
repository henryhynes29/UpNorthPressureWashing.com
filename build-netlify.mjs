import fs from 'fs';
import path from 'path';
import { loadCities } from './city-links.mjs';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const PHONE_TEL = '+12185768610';
const PHONE = '218-576-8610';
const FORM_NAME = 'quote-request';

const CITIES = loadCities();
const stats = { serviceForms: 0, hubForms: 0, scripts: 0, mains: 0, names: 0 };

const CITY_OPTIONS = CITIES.map(c =>
  `<option value="${c.name}"${c.slug === 'duluth' ? ' selected' : ''}>${c.name}</option>`
).join('');

const SERVICE_OPTIONS = [
  'Soft Washing',
  'Roof Cleaning',
  'Gutter Cleaning',
  'Concrete / Driveway Cleaning',
  'Deck & Fence Restoration',
  'Window Cleaning',
  'Commercial Exterior Cleaning',
  'Other / Not Sure',
].map(s => `<option>${s}</option>`).join('');

const FORM_CSS = `<style id="netlify-form-css">
.quote-sec{padding:48px 0}
.qbox{max-width:780px;margin:0 auto;background:#f4f0e8;border-radius:26px;padding:48px 44px;color:#1a2630;box-shadow:0 30px 80px rgba(0,0,0,.5);text-align:left}
.qbox h2{color:#13212c;font-size:clamp(2rem,5vw,3rem);text-align:center}
.qbox .sub{color:#4a5a64;margin:12px 0 30px;text-align:center}
.qbox label{display:block;font-size:.82rem;font-weight:600;color:#2c3a44;margin-bottom:7px}
.qbox .req{color:#c0392b}
.qbox .row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.qbox input,.qbox select,.qbox textarea{width:100%;padding:13px 15px;border:1px solid #cdd5da;border-radius:11px;font-family:inherit;font-size:.96rem;background:#fff;color:#1a2630;margin-bottom:18px;box-sizing:border-box}
.qbox input:focus,.qbox select:focus,.qbox textarea:focus{outline:none;border-color:#7fc6e8;box-shadow:0 0 0 3px rgba(127,198,232,.25)}
.qbox textarea{resize:vertical;min-height:96px}
.qbox .submit{width:100%;background:linear-gradient(135deg,#e3b53e,#c9972a);color:#1a1305;border:none;padding:17px;border-radius:46px;font-weight:700;font-size:1rem;cursor:pointer;box-shadow:0 10px 30px rgba(227,181,62,.35)}
.qbox .submit:hover{transform:translateY(-2px)}
.qbox .submit:disabled{opacity:.65;cursor:wait;transform:none}
.qbox .ok{display:none;text-align:center;padding:30px}
.qbox .ok.show{display:block}
.qbox .ok svg{width:60px;height:60px;stroke:#2e8b57;margin-bottom:14px}
.qbox .ok h3{font-size:1.6rem;color:#13212c}
.hub-quote-phone{display:block;text-align:center;font-size:clamp(1.6rem,5vw,2.2rem);font-weight:700;color:#e3b53e;text-decoration:none;margin:12px 0 24px}
@media(max-width:680px){.qbox{padding:32px 22px}.qbox .row{grid-template-columns:1fr}}
</style>`;

const NETLIFY_SUBMIT = `async function submitForm(e){
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
  data.set('form-name','${FORM_NAME}');
  if(!data.get('page'))data.set('page',location.pathname.replace(/^\\//,'')||'index.html');
  try{
    const res=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});
    if(!res.ok)throw new Error('submit failed');
    form.style.display='none';
    const okView=document.getElementById('okView');
    if(okView){
      okView.classList.add('show');
      const note=okView.querySelector('p');
      if(note)note.innerHTML='We\\'ve received your request and will reach out within one business day. Need a faster reply? <a href="tel:${PHONE_TEL}" style="color:#2e8b57;font-weight:700">Call ${PHONE}</a>.';
    }
  }catch(err){
    alert('Something went wrong submitting your request. Please call ${PHONE} and we will help you directly.');
    if(btn){btn.disabled=false;btn.textContent=prevLabel||'Request My Free Quote →';}
  }
}
document.getElementById('quoteForm')?.addEventListener('submit',submitForm);`;

function hubCityFromFile(file) {
  if (file === 'index.html') return 'Duluth';
  const m = file.match(/^([a-z-]+)-(?:mn|wi)-pressure-washing\.html$/)
    || file.match(/^pressure-washing-([a-z-]+)-mn\.html$/);
  if (!m) return 'Duluth';
  const slug = m[1];
  return CITIES.find(c => c.slug === slug)?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase());
}

function cityOptions(defaultCity) {
  return CITIES.map(c =>
    `<option value="${c.name}"${c.name === defaultCity ? ' selected' : ''}>${c.name}</option>`
  ).join('');
}

function hubFormBlock(defaultCity) {
  return `<!-- NETLIFY-QUOTE -->
<section class="quote-sec block alt center" id="quote">
  <div class="wrap">
    <div class="qbox reveal">
      <form id="quoteForm" name="${FORM_NAME}" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">
        <input type="hidden" name="form-name" value="${FORM_NAME}">
        <input type="hidden" name="page" value="">
        <p hidden><label>Don't fill this out: <input name="bot-field"></label></p>
        <h2>Get Your Free Quote</h2>
        <p class="sub">Tell us about your project — we'll respond within one business day.</p>
        <a class="hub-quote-phone" href="tel:${PHONE_TEL}">${PHONE}</a>
        <div class="row">
          <div><label>First Name <span class="req">*</span></label><input type="text" id="fn" name="first_name" required autocomplete="given-name"></div>
          <div><label>Last Name</label><input type="text" id="ln" name="last_name" autocomplete="family-name"></div>
        </div>
        <div class="row">
          <div><label>Email <span class="req">*</span></label><input type="email" id="em" name="email" required autocomplete="email"></div>
          <div><label>Phone</label><input type="tel" id="ph" name="phone" autocomplete="tel"></div>
        </div>
        <label>City / Area</label>
        <select id="city" name="city">${cityOptions(defaultCity)}</select>
        <label>Service Interested In</label>
        <select id="svc" name="service">${SERVICE_OPTIONS}</select>
        <label>Tell us about your project</label>
        <textarea id="msg" name="message" placeholder="Type of siding, problem areas, square footage, anything helpful…"></textarea>
        <button type="submit" class="submit">Request My Free Quote →</button>
      </form>
      <div class="ok" id="okView">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#2e8b57" stroke-width="1.6"/><path d="M8 12l3 3 5-6" stroke="#2e8b57" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h3>Thank you!</h3>
        <p style="color:#4a5a64;margin-top:10px">We've received your request and will reach out shortly.</p>
      </div>
    </div>
  </div>
</section>`;
}

function isHub(file) {
  return file === 'index.html' || /pressure-washing.*\.html$/.test(file);
}

function isServiceFormPage(file) {
  return htmlHasServiceForm(file) || /^(soft-washing|concrete-washing|commercial-soft-washing|deck-restoration|window-cleaning|residential-window-cleaning|commercial-window-cleaning|roof-soft-washing|gutter-fascia-cleaning)-/.test(file);
}

function htmlHasServiceForm(file) {
  const fp = path.join(SITE, file);
  if (!fs.existsSync(fp)) return false;
  return fs.readFileSync(fp, 'utf8').includes('id="formView"');
}

function addNameAttributes(html) {
  const map = { fn: 'first_name', ln: 'last_name', em: 'email', ph: 'phone', city: 'city', svc: 'service', msg: 'message' };
  let out = html;
  for (const [id, name] of Object.entries(map)) {
    const re = new RegExp(`(<input[^>]*id="${id}"(?![^>]*\\bname=))`, 'g');
    if (re.test(out)) {
      out = out.replace(new RegExp(`(<input[^>]*id="${id}")`, 'g'), `$1 name="${name}"`);
      stats.names++;
    }
    const selRe = new RegExp(`(<select[^>]*id="${id}"(?![^>]*\\bname=))`, 'g');
    if (selRe.test(out)) {
      out = out.replace(new RegExp(`(<select[^>]*id="${id}")`, 'g'), `$1 name="${name}"`);
      stats.names++;
    }
    const taRe = new RegExp(`(<textarea[^>]*id="${id}"(?![^>]*\\bname=))`, 'g');
    if (taRe.test(out)) {
      out = out.replace(new RegExp(`(<textarea[^>]*id="${id}")`, 'g'), `$1 name="${name}"`);
      stats.names++;
    }
  }
  return out;
}

function patchServiceForm(html) {
  if (!html.includes('id="formView"') || html.includes('data-netlify="true"')) return html;

  let out = html;
  out = addNameAttributes(out);

  if (out.includes('<div id="formView">')) {
    out = out.replace(
      '<div id="formView">',
      `<form id="quoteForm" name="${FORM_NAME}" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">
        <input type="hidden" name="form-name" value="${FORM_NAME}">
        <input type="hidden" name="page" value="">
        <p hidden><label>Don't fill this out: <input name="bot-field"></label></p>`
    );
    out = out.replace(
      /<button class="submit" onclick="submitForm\(\)">([^<]*)<\/button>\s*<\/div>\s*(<div class="ok" id="okView">)/,
      `<button type="submit" class="submit">$1</button></form>$2`
    );
    stats.serviceForms++;
  }

  return out;
}

function patchHubQuote(html, file) {
  if (!isHub(file)) return html;
  if (html.includes('id="quoteForm"')) return html;

  let out = html;
  const city = hubCityFromFile(file);

  if (!out.includes('id="netlify-form-css"')) {
    out = out.replace('</head>', `${FORM_CSS}\n</head>`);
  }

  const hubQuoteRe = /<section class="block alt center" id="quote">[\s\S]*?<\/section>/;
  if (hubQuoteRe.test(out)) {
    out = out.replace(hubQuoteRe, hubFormBlock(city));
    stats.hubForms++;
  } else if (file === 'index.html' && out.includes('id="quote"')) {
    // index may have different quote section shape
    out = out.replace(
      /<section class="block alt center" id="quote">[\s\S]*?<\/section>/,
      hubFormBlock(city)
    );
    stats.hubForms++;
  }

  return out;
}

function replaceSubmitScript(html) {
  if (!html.includes('function submitForm')) return html;
  let out = html.replace(/function submitForm\(\)\{[\s\S]*?\n\}/, '');
  out = out.replace(/async function submitForm\(e\)\{[\s\S]*?\n\}/, '');
  out = out.replace(/document\.getElementById\('quoteForm'\)\?\.addEventListener\('submit',submitForm\);?\n?/, '');
  if (!out.includes("addEventListener('submit',submitForm)")) {
    out = out.replace(/<\/script>\s*(?=<style id="mobile-cta-bar">|<\/body>)/, `\n${NETLIFY_SUBMIT}\n</script>\n`);
    stats.scripts++;
  }
  return out;
}

function fixDuplicateMain(html) {
  const before = (html.match(/<\/main>/g) || []).length;
  let out = html.replace(/(<\/main>\s*){2,}/g, '</main>\n');
  const after = (out.match(/<\/main>/g) || []).length;
  if (after < before) stats.mains += before - after;
  return out;
}

function patchFile(file) {
  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  html = fixDuplicateMain(html);
  if (isServiceFormPage(file) || html.includes('id="formView"')) {
    html = patchServiceForm(html);
  }
  html = patchHubQuote(html, file);
  html = replaceSubmitScript(html);

  if (html !== orig) fs.writeFileSync(fp, html);
}

function writeNetlifyConfig() {
  fs.writeFileSync(path.join(SITE, 'netlify.toml'), `[build]
  publish = "."

# Apex + bare domain → www (matches canonical URLs in sitemap)
[[redirects]]
  from = "http://upnorthpressurewashing.com/*"
  to = "https://www.upnorthpressurewashing.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://upnorthpressurewashing.com/*"
  to = "https://www.upnorthpressurewashing.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://www.upnorthpressurewashing.com/*"
  to = "https://www.upnorthpressurewashing.com/:splat"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Form notification emails are configured in Netlify dashboard:
# Site settings → Forms → Form notifications → Add notification
`);

  fs.writeFileSync(path.join(SITE, '.netlifyignore'), `*.mjs
node_modules/
.git/
`);

  console.log('Wrote netlify.toml + .netlifyignore');
}

function write404() {
  const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page Not Found | Up North Pressure Washing</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://www.upnorthpressurewashing.com/">
<style>
body{margin:0;font-family:system-ui,sans-serif;background:#0f1c28;color:#e8f0f5;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px}
.wrap{max-width:520px}
h1{font-size:2rem;margin:0 0 12px;color:#e3b53e}
p{color:#b3c4cf;line-height:1.6}
a{color:#7fc6e8;font-weight:600;text-decoration:none}
.btn{display:inline-block;margin-top:24px;background:#e3b53e;color:#1a1305;padding:14px 28px;border-radius:999px;font-weight:700;text-decoration:none}
</style>
</head>
<body>
<div class="wrap">
  <h1>404 — Page Not Found</h1>
  <p>Sorry, that page doesn't exist. Head back to our homepage or request a free quote.</p>
  <p><a href="/">Homepage</a> · <a href="tel:${PHONE_TEL}">${PHONE}</a></p>
  <a class="btn" href="/index.html#quote">Get Your Free Quote</a>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(SITE, '404.html'), html);
  console.log('Wrote 404.html');
}

function writeThankYou() {
  const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Thank You | Up North Pressure Washing</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://www.upnorthpressurewashing.com/">
<style>
body{margin:0;font-family:system-ui,sans-serif;background:#0f1c28;color:#e8f0f5;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px}
.wrap{max-width:560px}
h1{font-size:2rem;margin:0 0 12px;color:#2e8b57}
p{color:#b3c4cf;line-height:1.6}
a{color:#7fc6e8;font-weight:600}
.btn{display:inline-block;margin-top:24px;background:#e3b53e;color:#1a1305;padding:14px 28px;border-radius:999px;font-weight:700;text-decoration:none}
</style>
</head>
<body>
<div class="wrap">
  <h1>Thank you!</h1>
  <p>We've received your quote request and will reach out within one business day.</p>
  <p>Need a faster reply? Call <a href="tel:${PHONE_TEL}">${PHONE}</a>.</p>
  <a class="btn" href="/">Back to Homepage</a>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(SITE, 'thank-you.html'), html);
  console.log('Wrote thank-you.html');
}

function writePrivacy() {
  const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy | Up North Pressure Washing</title>
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="https://www.upnorthpressurewashing.com/privacy.html">
<style>
body{margin:0;font-family:system-ui,sans-serif;background:#0f1c28;color:#e8f0f5;line-height:1.7}
.wrap{max-width:720px;margin:0 auto;padding:48px 24px 80px}
h1{color:#e3b53e;font-size:2rem}
h2{font-size:1.2rem;margin-top:2rem;color:#7fc6e8}
a{color:#7fc6e8}
p,li{color:#b3c4cf}
</style>
</head>
<body>
<div class="wrap">
  <h1>Privacy Policy</h1>
  <p><strong>Up North Pressure Washing</strong> · Last updated: May 2026</p>
  <h2>Information we collect</h2>
  <p>When you request a quote through our website, we collect the information you provide: name, email, phone number, city, service type, and project details.</p>
  <h2>How we use it</h2>
  <p>We use your information only to respond to your quote request, schedule service, and communicate about your project. We do not sell your personal information.</p>
  <h2>Form processing</h2>
  <p>Quote forms are processed by <a href="https://www.netlify.com/privacy/" rel="noopener">Netlify Forms</a> on our behalf. Submissions are stored securely and emailed to our team.</p>
  <h2>Contact</h2>
  <p>Questions? Call <a href="tel:${PHONE_TEL}">${PHONE}</a> or use our <a href="/index.html#quote">quote form</a>.</p>
  <p><a href="/">← Back to homepage</a></p>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(SITE, 'privacy.html'), html);
  console.log('Wrote privacy.html');
}

for (const file of fs.readdirSync(SITE).filter(f => f.endsWith('.html'))) {
  patchFile(file);
}

writeNetlifyConfig();
write404();
writeThankYou();
writePrivacy();

console.log('\nNetlify setup complete:');
console.log(`  Service forms wired: ${stats.serviceForms}`);
console.log(`  Hub forms added: ${stats.hubForms}`);
console.log(`  Submit scripts updated: ${stats.scripts}`);
console.log(`  Duplicate </main> removed: ${stats.mains}`);
console.log('\nDeploy: drag folder to Netlify, or connect Git repo with publish directory "."');
console.log('After deploy: Site settings → Forms → enable notifications → add your email');
