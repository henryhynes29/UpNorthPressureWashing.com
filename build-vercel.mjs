import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const PHONE_TEL = '+12185768610';
const PHONE = '218-576-8610';
const stats = { forms: 0, scripts: 0, stripped: 0 };

const VERCEL_SUBMIT = `async function submitForm(e){
  if(e)e.preventDefault();
  const fn=(document.getElementById('fn')?.value||'').trim();
  const em=(document.getElementById('em')?.value||'').trim();
  if(!fn||!em){alert('Please enter at least your first name and email.');return false;}
  const form=document.getElementById('quoteForm');
  if(!form)return false;
  const btn=form.querySelector('.submit');
  const prevLabel=btn?.textContent||'';
  if(btn){btn.disabled=true;btn.textContent='Sending…';}
  const payload={
    first_name:fn,
    last_name:(document.getElementById('ln')?.value||'').trim(),
    email:em,
    phone:(document.getElementById('ph')?.value||'').trim(),
    city:(document.getElementById('city')?.value||'').trim(),
    service:(document.getElementById('svc')?.value||'').trim(),
    message:(document.getElementById('msg')?.value||'').trim(),
    page:location.pathname.replace(/^\\//,'')||'index.html',
    'bot-field':(document.querySelector('[name="bot-field"]')?.value||'').trim()
  };
  try{
    const res=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||('Request failed ('+res.status+')'));
    form.style.display='none';
    const okView=document.getElementById('okView');
    if(okView){
      okView.classList.add('show');
      const note=okView.querySelector('p');
      if(note)note.innerHTML='We\\'ve received your request and will reach out within one business day. Need a faster reply? <a href="tel:${PHONE_TEL}" style="color:#2e8b57;font-weight:700">Call ${PHONE}</a>.';
    }
  }catch(err){
    alert((err&&err.message?err.message:'Something went wrong.')+' Please call ${PHONE}.');
    if(btn){btn.disabled=false;btn.textContent=prevLabel||'Request My Free Quote →';}
  }
  return false;
}
document.getElementById('quoteForm')?.addEventListener('submit',submitForm);`;

const FORM_SCRIPT_BLOCK = `<script id="quote-form-handler">\n${VERCEL_SUBMIT}\n</script>`;

function stripNetlify(html) {
  let out = html;
  const before = out.includes('data-netlify');
  out = out.replace(/\s*data-netlify="true"/g, '');
  out = out.replace(/\s*netlify-honeypot="bot-field"/g, '');
  out = out.replace(/\s*name="quote-request"/g, '');
  out = out.replace(/<input type="hidden" name="form-name" value="quote-request">\s*/g, '');
  out = out.replace(/action="\/thank-you\.html"/g, 'action="#quote"');
  out = out.replace(/id="netlify-form-css"/g, 'id="quote-form-css"');
  out = out.replace(/<!-- NETLIFY-QUOTE -->/g, '<!-- QUOTE-FORM -->');
  if (before) stats.stripped++;
  return out;
}

function replaceSubmitScript(html) {
  let out = html;
  out = out.replace(/<script id="quote-form-handler">[\s\S]*?<\/script>\s*/g, '');
  out = out.replace(/async function submitForm\(e\)\{[\s\S]*?\n\}/g, '');
  out = out.replace(/function submitForm\(\)\{[\s\S]*?\n\}/g, '');
  out = out.replace(/document\.getElementById\('quoteForm'\)\?\.addEventListener\('submit',submitForm\);?\n?/g, '');
  return out;
}

function patchFormTag(html) {
  return html.replace(
    /<form id="quoteForm"[^>]*>/g,
    '<form id="quoteForm" method="post" action="#" onsubmit="submitForm(event);return false;" novalidate>'
  );
}

function injectSubmitScript(html) {
  if (!html.includes('id="quoteForm"')) return html;
  if (html.includes("fetch('/api/quote'")) return html;
  let out = replaceSubmitScript(html);
  if (out.includes('</body>')) {
    out = out.replace('</body>', `${FORM_SCRIPT_BLOCK}\n</body>`);
    stats.scripts++;
  }
  stats.forms++;
  return out;
}

function patchPrivacy(html) {
  return html.replace(
    /Quote forms are processed by <a href="https:\/\/www\.netlify\.com\/privacy\/"[^>]*>Netlify Forms<\/a> on our behalf\. Submissions are stored securely and emailed to our team\./,
    'Quote forms are sent securely to <strong>Upnorthpressurewash@gmail.com</strong> so we can respond to your request.'
  );
}

for (const file of fs.readdirSync(SITE).filter(f => f.endsWith('.html'))) {
  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;
  html = stripNetlify(html);
  if (html.includes('id="quoteForm"')) {
    html = patchFormTag(html);
    html = injectSubmitScript(html);
  }
  if (file === 'privacy.html') html = patchPrivacy(html);
  if (html !== orig) fs.writeFileSync(fp, html);
}

console.log('Vercel form wiring complete:');
console.log(`  Pages with quote forms: ${stats.forms}`);
console.log(`  Submit handlers updated: ${stats.scripts}`);
console.log(`  Netlify attrs removed from: ${stats.stripped} pages`);
console.log('\nSet in Vercel → Settings → Environment Variables:');
console.log('  RESEND_API_KEY  (from resend.com — free tier)');
console.log('  QUOTE_EMAIL=Upnorthpressurewash@gmail.com  (optional, already default)');
