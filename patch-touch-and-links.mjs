import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const GOOGLE_REVIEW = 'https://g.page/r/CSCaz34lDtneEBE/review';
const PHONE_TEL = 'tel:+12185768610';

const HUB_SLIDER_OLD = `  // Before/After sliders (multiple independent instances)
  (function(){
    document.querySelectorAll('.ba').forEach(function(slider){
      var before=slider.querySelector('.ba__before');
      var handle=slider.querySelector('.ba__handle');
      if(!before||!handle)return;
      var dragging=false;
      function setPos(clientX){
        var r=slider.getBoundingClientRect();
        var x=Math.max(0,Math.min(clientX-r.left,r.width));
        var pct=x/r.width*100;
        before.style.clipPath='inset(0 '+(100-pct)+'% 0 0)';
        handle.style.left=pct+'%';
        slider.classList.add('touched');
      }
      function start(e){dragging=true;move(e)}
      function move(e){if(!dragging)return;var cx=e.touches?e.touches[0].clientX:e.clientX;setPos(cx);if(e.cancelable&&e.touches)e.preventDefault()}
      function end(){dragging=false}
      slider.addEventListener('mousedown',start);
      slider.addEventListener('touchstart',start,{passive:false});
      slider.addEventListener('mousemove',function(e){if(dragging)move(e)});
      slider.addEventListener('mouseup',end);
      slider.addEventListener('mouseleave',end);
      slider.addEventListener('touchmove',move,{passive:false});
      slider.addEventListener('touchend',end);
      before.style.clipPath='inset(0 50% 0 0)';
    });
  })();`;

const HUB_SLIDER_NEW = `  // Before/After sliders — horizontal drag only; vertical scroll passes through on mobile
  (function(){
    document.querySelectorAll('.ba').forEach(function(slider){
      var before=slider.querySelector('.ba__before');
      var handle=slider.querySelector('.ba__handle');
      if(!before||!handle)return;
      var dragging=false, locked=false, startX=0, startY=0;
      function pctFromX(clientX){
        var r=slider.getBoundingClientRect();
        var x=Math.max(0,Math.min(clientX-r.left,r.width));
        return x/r.width*100;
      }
      function setPos(pct){
        before.style.clipPath='inset(0 '+(100-pct)+'% 0 0)';
        handle.style.left=pct+'%';
        slider.classList.add('touched');
      }
      function onStart(e){
        var pt=e.touches?e.touches[0]:e;
        startX=pt.clientX; startY=pt.clientY;
        dragging=false; locked=false;
        if(!e.touches){ dragging=true; locked=true; slider.classList.add('is-dragging'); setPos(pctFromX(pt.clientX)); }
      }
      function onMove(e){
        var pt=e.touches?e.touches[0]:e;
        if(e.touches){
          var dx=pt.clientX-startX, dy=pt.clientY-startY;
          if(!locked){
            if(Math.abs(dx)<10&&Math.abs(dy)<10)return;
            if(Math.abs(dx)<Math.abs(dy)*1.15){ locked=true; return; }
            dragging=true; locked=true; slider.classList.add('is-dragging');
          }
          if(!dragging)return;
        }else if(!dragging)return;
        setPos(pctFromX(pt.clientX));
        if(e.cancelable&&dragging)e.preventDefault();
      }
      function onEnd(){ dragging=false; locked=false; slider.classList.remove('is-dragging'); }
      slider.addEventListener('mousedown',onStart);
      slider.addEventListener('mousemove',onMove);
      slider.addEventListener('mouseup',onEnd);
      slider.addEventListener('mouseleave',onEnd);
      slider.addEventListener('touchstart',onStart,{passive:true});
      slider.addEventListener('touchmove',onMove,{passive:false});
      slider.addEventListener('touchend',onEnd);
      slider.addEventListener('touchcancel',onEnd);
      setPos(50);
    });
  })();`;

const SERVICE_SLIDER_OLD = `  let dragging=false;
  const down=e=>{dragging=true; setPos((e.touches?e.touches[0].clientX:e.clientX));};
  const move=e=>{if(!dragging)return; setPos((e.touches?e.touches[0].clientX:e.clientX)); if(e.cancelable)e.preventDefault();};
  const up=()=>dragging=false;
  ba.addEventListener('mousedown',down); window.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
  ba.addEventListener('touchstart',down,{passive:true}); window.addEventListener('touchmove',move,{passive:false}); window.addEventListener('touchend',up);`;

const SERVICE_SLIDER_NEW = `  let dragging=false, locked=false, startX=0, startY=0;
  const down=e=>{
    const pt=e.touches?e.touches[0]:e;
    startX=pt.clientX; startY=pt.clientY;
    dragging=false; locked=false;
    if(!e.touches){ dragging=true; locked=true; ba.classList.add('is-dragging'); setPos(pt.clientX); }
  };
  const move=e=>{
    const pt=e.touches?e.touches[0]:e;
    if(e.touches){
      const dx=pt.clientX-startX, dy=pt.clientY-startY;
      if(!locked){
        if(Math.abs(dx)<10&&Math.abs(dy)<10)return;
        if(Math.abs(dx)<Math.abs(dy)*1.15){ locked=true; return; }
        dragging=true; locked=true; ba.classList.add('is-dragging');
      }
      if(!dragging)return;
    }else if(!dragging)return;
    setPos(pt.clientX);
    if(e.cancelable&&dragging)e.preventDefault();
  };
  const up=()=>{ dragging=false; locked=false; ba.classList.remove('is-dragging'); };
  ba.addEventListener('mousedown',down);
  ba.addEventListener('touchstart',down,{passive:true});
  window.addEventListener('mousemove',move);
  window.addEventListener('mouseup',up);
  ba.addEventListener('touchmove',move,{passive:false});
  ba.addEventListener('touchend',up);
  ba.addEventListener('touchcancel',up);`;

const REVIEW_BTN = `<a class="btn btn--pill" href="${GOOGLE_REVIEW}" target="_blank" rel="noopener" style="min-width:0;margin-top:1.4rem">★ Read &amp; Leave a Review on Google</a>`;

function patchFile(fp) {
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  if (html.includes('google.com/search?q=Up+North+Pressure+Washing')) {
    html = html.replace(/https:\/\/www\.google\.com\/search\?q=Up\+North\+Pressure\+Washing\+Duluth\+reviews/g, GOOGLE_REVIEW);
    changed = true;
  }

  if (html.includes('touch-action:none')) {
    html = html.replace(/touch-action:none/g, 'touch-action:pan-y pinch-zoom');
    if (!html.includes('.ba.is-dragging')) {
      html = html.replace(/(\.ba\{[^}]*touch-action:pan-y pinch-zoom[^}]*\})/,
        '$1\n.ba.is-dragging{touch-action:none}');
    }
    changed = true;
  }

  if (html.includes(HUB_SLIDER_OLD)) {
    html = html.replace(HUB_SLIDER_OLD, HUB_SLIDER_NEW);
    changed = true;
  }

  if (html.includes(SERVICE_SLIDER_OLD)) {
    html = html.replace(SERVICE_SLIDER_OLD, SERVICE_SLIDER_NEW);
    changed = true;
  }

  // Service page: phone in nav + review CTA after testimonials
  if (/^(soft-washing|concrete-washing|commercial-soft-washing)-/.test(path.basename(fp))) {
    if (!html.includes(PHONE_TEL)) {
      html = html.replace(
        '<a href="#quote" class="nav-cta">Free Quote</a>',
        `<a href="${PHONE_TEL}" class="nav-phone">218-576-8610</a>\n      <a href="#quote" class="nav-cta">Free Quote</a>`
      );
      if (!html.includes('.nav-phone{')) {
        html = html.replace(
          '.nav-cta{background:linear-gradient',
          `.nav-phone{color:var(--ice);font-weight:600;font-size:.9rem;text-decoration:none;padding:11px 14px;border-radius:40px;border:1px solid var(--glass-line);white-space:nowrap}\n.nav-phone:hover{color:#fff;border-color:var(--ice)}\n.nav-cta{background:linear-gradient`
        );
      }
      changed = true;
    }
    const reviewBlock = `    <div class="svc-cta reveal" style="margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center">
      <a href="${PHONE_TEL}" class="btn-ghost">📞 218-576-8610</a>
      <a href="${GOOGLE_REVIEW}" target="_blank" rel="noopener" class="btn-gold">★ Read &amp; Leave a Review on Google</a>
    </div>`;
    if (!html.includes(GOOGLE_REVIEW) && html.includes('id="reviews"')) {
      html = html.replace(
        /(<section id="reviews">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>)/,
        (m) => m.replace('</div>\n  </div>\n</section>', `</div>\n${reviewBlock}\n  </div>\n</section>`)
      );
      changed = true;
    }
    if (html.includes('#reviews">Reviews</a></div>') && !html.includes(`${GOOGLE_REVIEW}`)) {
      html = html.replace(
        '<a href="#reviews">Reviews</a></div>',
        `<a href="#reviews">Reviews</a><a href="${PHONE_TEL}">218-576-8610</a><a href="${GOOGLE_REVIEW}" target="_blank" rel="noopener">Google Reviews</a></div>`
      );
      changed = true;
    }
  }

  if (changed) fs.writeFileSync(fp, html);
  return changed;
}

const files = fs.readdirSync(SITE).filter(f => f.endsWith('.html'));
let n = 0;
for (const f of files) {
  if (patchFile(path.join(SITE, f))) {
    n++;
    console.log('Patched', f);
  }
}

// wire-site constant for future builds
const wire = path.join(SITE, 'wire-site.mjs');
if (fs.existsSync(wire)) {
  let w = fs.readFileSync(wire, 'utf8');
  w = w.replace(
    /const GOOGLE_REVIEWS = '[^']*';/,
    `const GOOGLE_REVIEWS = '${GOOGLE_REVIEW}';`
  );
  fs.writeFileSync(wire, w);
}

console.log(`\nUpdated ${n} files. Google review: ${GOOGLE_REVIEW}`);
