import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CSS_MARKER = '/* LC-NAV */';
const JS_MARKER = '/* LC-NAV-JS */';

const REGIONS = [
  { id: 'twin-ports', label: 'Twin Ports', badge: 'Twin Ports & Proctor' },
  { id: 'carlton', label: 'Carlton County', badge: 'Carlton County' },
  { id: 'iron-range', label: 'Iron Range', badge: 'Iron Range' },
  { id: 'north-shore', label: 'North Shore', badge: 'North Shore' },
  { id: 'northland', label: 'Northland', badge: 'Northland' },
];

const TOPICS = [
  { id: 'all', label: 'All Topics' },
  { id: 'soft-washing', label: 'Soft Washing', match: /soft washing|algae|mold|oxidation|home value|pollen|curb appeal/i },
  { id: 'roof', label: 'Roof', match: /roof/i },
  { id: 'gutters', label: 'Gutters', match: /gutter|fascia/i },
  { id: 'windows', label: 'Windows', match: /window/i },
  { id: 'concrete', label: 'Concrete', match: /concrete|driveway|salt|rust/i },
  { id: 'deck', label: 'Deck & Fence', match: /deck|fence|composite/i },
  { id: 'commercial', label: 'Commercial', match: /commercial|hoa|restaurant|parking|lakefront|seasonal|brick|stone/i },
];

const CITY_REGION = {
  duluth: 'twin-ports', hermantown: 'twin-ports', proctor: 'twin-ports', superior: 'twin-ports',
  barnum: 'carlton', cloquet: 'carlton', carlton: 'carlton', esko: 'carlton', scanlon: 'carlton', wrenshall: 'carlton',
  hibbing: 'iron-range', virginia: 'iron-range', eveleth: 'iron-range',
  'two-harbors': 'iron-range', 'silver-bay': 'north-shore',
  'moose-lake': 'northland', 'lake-nebagamon': 'northland',
};

const LC_CSS = `${CSS_MARKER}
.lc-sticky-panel{position:sticky;top:68px;z-index:55;background:rgba(11,22,34,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(150,190,215,.16);padding-bottom:8px;margin-bottom:12px}
.lc-sticky-panel .lc-toolbar{position:static;background:transparent;border:none;padding:10px 0 2px;margin:0}
.lc-sticky-panel .lc-jump{margin:0;padding:10px 0 6px;border-bottom:1px solid rgba(150,190,215,.1)}
.lc-toolbar{padding:14px 0 12px;margin-bottom:8px}
.lc-toolbar__search{margin-bottom:12px}
.lc-toolbar__search input{width:100%;padding:12px 16px 12px 42px;border-radius:12px;border:1px solid rgba(160,200,225,.22);background:rgba(255,255,255,.05);color:#e9f1f6;font:inherit;font-size:.92rem;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237fc6e8' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3-3'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:14px center;background-size:18px}
.lc-toolbar__search input::placeholder{color:#8fa8b8}
.lc-toolbar__search input:focus{outline:2px solid rgba(127,198,232,.45);border-color:rgba(127,198,232,.4)}
.lc-toolbar__group{margin-bottom:10px}
.lc-toolbar__label{display:block;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#7fc6e8;font-weight:700;margin-bottom:6px}
.lc-pills{display:flex;flex-wrap:wrap;gap:7px}
.lc-pill{border:1px solid rgba(160,200,225,.2);background:rgba(255,255,255,.04);color:#b3c4cf;padding:7px 14px;border-radius:999px;font:inherit;font-size:.78rem;font-weight:600;cursor:pointer;transition:.2s;white-space:nowrap}
.lc-pill:hover,.lc-pill.is-active{border-color:#7fc6e8;color:#fff;background:rgba(127,198,232,.12)}
.lc-pill.is-active{background:rgba(127,198,232,.18);color:#e9f1f6}
.lc-results{font-size:.78rem;color:#8fa8b8;margin:4px 0 0;min-height:1.2em}
.lc-jump{display:flex;flex-wrap:nowrap;gap:8px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.lc-jump::-webkit-scrollbar{display:none}
.lc-jump a{flex-shrink:0;font-size:.8rem;color:#b3c4cf;text-decoration:none;padding:6px 12px;border-radius:20px;border:1px solid rgba(160,200,225,.16);transition:.2s}
.lc-jump a:hover,.lc-jump a.is-active{color:#fff;border-color:#7fc6e8;background:rgba(127,198,232,.1)}
.lc-subnav{position:sticky;top:68px;z-index:54;background:rgba(11,22,34,.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(150,190,215,.14)}
.lc-subnav__in{display:flex;align-items:center;gap:6px;padding:10px 0;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.lc-subnav__in::-webkit-scrollbar{display:none}
.lc-subnav a{flex-shrink:0;font-size:.78rem;font-weight:600;color:#b3c4cf;text-decoration:none;padding:7px 12px;border-radius:20px;border:1px solid transparent;transition:.2s;white-space:nowrap}
.lc-subnav a:hover{color:#fff;border-color:rgba(160,200,225,.2)}
.lc-subnav a.is-active,.lc-subnav a.lc-subnav__home{color:#7fc6e8;border-color:rgba(127,198,232,.28);background:rgba(127,198,232,.08)}
.lc-subnav__home{margin-right:4px}
.crumb{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:.82rem;color:var(--text-dim,#b3c4cf);margin-bottom:22px}
.crumb a{color:#7fc6e8;text-decoration:none;font-weight:500}
.crumb a:hover{text-decoration:underline}
.crumb .sep{opacity:.45}
.lc-featured{margin-bottom:28px}
.lc-featured h2{font-family:'Fraunces',serif;color:#e3b53e;margin:0 0 4px;font-size:1.35rem}
.lc-featured p{margin:0 0 14px;color:#b8c9d6;font-size:.92rem}
.lc-featured-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.lc-featured-card{display:block;background:rgba(255,255,255,.05);border:1px solid rgba(160,200,225,.16);border-radius:12px;padding:14px 16px;text-decoration:none;color:#e9f1f6;transition:.2s}
.lc-featured-card:hover{border-color:#7fc6e8;transform:translateY(-2px)}
.lc-featured-card strong{color:#e3b53e;display:block;margin-bottom:4px;font-size:.92rem}
.lc-featured-card span{font-size:.84rem;color:#b8c9d6;line-height:1.45}
.lc-expert{margin-bottom:24px}
.lc-expert h2{font-family:'Fraunces',serif;color:#e3b53e;margin:0 0 4px}
.lc-expert h3{color:#7fc6e8;margin:18px 0 8px;font-size:1.02rem}
.lc-expert-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.lc-expert-link{display:block;background:rgba(255,255,255,.04);border:1px solid rgba(160,200,225,.14);border-radius:10px;padding:11px 14px;text-decoration:none;color:#dce8f0;font-size:.92rem;transition:.2s}
.lc-expert-link:hover{border-color:#7fc6e8;color:#fff}
.cluster-section.is-hidden,.topic-row.is-hidden{display:none!important}
.topic-row.is-dimmed{opacity:.35}
.post-card.is-hidden{display:none!important}
.post-card .tag{display:inline-flex;font-size:.64rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#e3b53e;background:rgba(227,181,62,.1);border:1px solid rgba(227,181,62,.25);border-radius:20px;padding:2px 8px;margin-right:6px}
.lc-city-guides h2{font-family:'Fraunces',serif;color:#e3b53e;margin:0 0 6px;font-size:1.35rem}
.lc-city-guides p{margin:0 0 18px;color:#b8c9d6;font-size:.9rem}
#featured-guides,#expert-answers,#city-guides,.cluster-section{scroll-margin-top:170px}
@media(max-width:640px){.lc-sticky-panel{top:68px}.lc-pill{padding:6px 11px;font-size:.74rem}}
`;

const LC_JUMP = `<nav class="lc-jump wrap" aria-label="Jump to section">
  <a href="#featured-guides">Featured</a>
  <a href="#expert-answers">Expert Answers</a>
  <a href="#city-guides">City Guides</a>
${REGIONS.map((r) => `  <a href="#region-${r.id}">${r.label}</a>`).join('\n')}
</nav>`;

const LC_TOOLBAR_INNER = `<nav class="lc-toolbar wrap" id="lcToolbar" aria-label="Filter Learning Center guides">
  <div class="lc-toolbar__search">
    <input type="search" id="lcSearch" placeholder="Search by city, topic, or guide name…" aria-label="Search guides" autocomplete="off">
  </div>
  <div class="lc-toolbar__group">
    <span class="lc-toolbar__label">Region</span>
    <div class="lc-pills" role="group" aria-label="Filter by region">
      <button type="button" class="lc-pill is-active" data-lc-region="all">All Regions</button>
${REGIONS.map((r) => `      <button type="button" class="lc-pill" data-lc-region="${r.id}">${r.label}</button>`).join('\n')}
    </div>
  </div>
  <div class="lc-toolbar__group">
    <span class="lc-toolbar__label">Topic</span>
    <div class="lc-pills" role="group" aria-label="Filter by topic">
      <button type="button" class="lc-pill is-active" data-lc-topic="all">All Topics</button>
${TOPICS.filter((t) => t.id !== 'all').map((t) => `      <button type="button" class="lc-pill" data-lc-topic="${t.id}">${t.label}</button>`).join('\n')}
    </div>
  </div>
  <p class="lc-results" id="lcResults" aria-live="polite"></p>
</nav>`;

const LC_STICKY_PANEL = `<div class="lc-sticky-panel" id="lcSticky">
${LC_JUMP}
${LC_TOOLBAR_INNER}
</div>`;

const LC_INDEX_JS = `<script>${JS_MARKER}
(function(){
  var region='all',topic='all',query='';
  var sections=document.querySelectorAll('.cluster-section[data-lc-region]');
  var rows=document.querySelectorAll('.topic-row[data-lc-topic]');
  var cards=document.querySelectorAll('.post-card');
  var results=document.getElementById('lcResults');
  function norm(s){return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
  function apply(){
    var visibleCards=0,visibleRows=0;
    cards.forEach(function(card){
      var sec=card.closest('.cluster-section');
      var row=card.closest('.topic-row');
      var rOk=region==='all'||(sec&&sec.dataset.lcRegion===region);
      var tOk=topic==='all'||(row&&row.dataset.lcTopic===topic);
      var text=norm(card.textContent);
      var qOk=!query||text.indexOf(query)!==-1;
      var show=rOk&&tOk&&qOk;
      card.classList.toggle('is-hidden',!show);
      if(show)visibleCards++;
    });
    rows.forEach(function(row){
      var any=!!row.querySelector('.post-card:not(.is-hidden)');
      row.classList.toggle('is-hidden',!any);
      if(any)visibleRows++;
    });
    sections.forEach(function(sec){
      var any=!!sec.querySelector('.post-card:not(.is-hidden)');
      sec.classList.toggle('is-hidden',!any);
    });
    if(results)results.textContent=query||region!=='all'||topic!=='all'?visibleCards+' guides match your filters':'';
  }
  document.querySelectorAll('[data-lc-region]').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('[data-lc-region]').forEach(function(b){b.classList.remove('is-active')});
      btn.classList.add('is-active');
      region=btn.dataset.lcRegion;
      apply();
      if(region!=='all'){
        var target=document.getElementById('region-'+region);
        if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
  document.querySelectorAll('[data-lc-topic]').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('[data-lc-topic]').forEach(function(b){b.classList.remove('is-active')});
      btn.classList.add('is-active');
      topic=btn.dataset.lcTopic;
      apply();
    });
  });
  var search=document.getElementById('lcSearch');
  if(search)search.addEventListener('input',function(){query=norm(search.value);apply()});
  var params=new URLSearchParams(location.search);
  var pr=params.get('region'),pt=params.get('topic'),pq=params.get('q');
  if(pr){region=pr;document.querySelectorAll('[data-lc-region]').forEach(function(b){b.classList.toggle('is-active',b.dataset.lcRegion===pr)})}
  if(pt){topic=pt;document.querySelectorAll('[data-lc-topic]').forEach(function(b){b.classList.toggle('is-active',b.dataset.lcTopic===pt)})}
  if(pq&&search){search.value=pq;query=norm(pq)}
  apply();
  var jumpLinks=document.querySelectorAll('.lc-jump a');
  var spySections=[];
  jumpLinks.forEach(function(a){
    var id=(a.getAttribute('href')||'').replace('#','');
    if(id){var el=document.getElementById(id);if(el)spySections.push({id:id,el:el,link:a})}
  });
  function updateSpy(){
    var y=window.scrollY+200;
    var current=spySections[0];
    spySections.forEach(function(s){if(s.el.offsetTop<=y)current=s});
    jumpLinks.forEach(function(a){a.classList.remove('is-active')});
    if(current&&current.link)current.link.classList.add('is-active');
  }
  window.addEventListener('scroll',updateSpy,{passive:true});
  updateSpy();
})();
</script>`;

function topicIdFromLabel(label) {
  for (const t of TOPICS) {
    if (t.id === 'all') continue;
    if (t.match && t.match.test(label)) return t.id;
  }
  return 'soft-washing';
}

function injectCss(html) {
  if (html.includes(CSS_MARKER)) {
    return html.replace(/\/\* LC-NAV \*\/[\s\S]*?(?=\n\/\*|\n<\/style>)/, LC_CSS.trim());
  }
  return html.replace('</style>', `${LC_CSS}\n</style>`);
}

function cityFromBlogFile(filename) {
  const m = filename.match(/^blog-.+-(.+)\.html$/);
  if (!m) return '';
  return m[1];
}

function regionFromCity(slug) {
  return CITY_REGION[slug] || 'twin-ports';
}

function buildSubnav(regionId) {
  return `<nav class="lc-subnav" aria-label="Learning Center navigation">
  <div class="wrap lc-subnav__in">
    <a href="/blog-index" class="lc-subnav__home">All Guides</a>
${REGIONS.map((r) => `    <a href="/blog-index?region=${r.id}#region-${r.id}"${regionId === r.id ? ' class="is-active" aria-current="true"' : ''}>${r.label}</a>`).join('\n')}
    <a href="/blog-index#featured-guides">Featured</a>
    <a href="/blog-index#expert-answers">Expert Answers</a>
  </div>
</nav>`;
}

function fixHero(html) {
  const hero = `<section class="hero wrap">
  <span class="eyebrow"><span class="dot"></span>Learning Center</span>
  <h1>Local Guides on <span class="gold">Exterior Cleaning</span><br>&amp; <span class="ice">Curb Appeal</span></h1>
  <p>Guides organized by region — find articles written for your specific city and climate.</p>
  <p>Start here: <a href="/pressure-washing-psi-chart">The Pressure Washing PSI Chart</a> — safe pressure for every surface, plus our Northland seasonal cleaning calendar.</p>
</section>`;
  if (html.includes('<section class="hero wrap">')) {
    return html.replace(/<section class="hero wrap">[\s\S]*?<\/section>/, hero);
  }
  return html.replace(
    /<main id="main">\s*/,
    `<main id="main">\n${hero}\n`
  );
}

function ensureStickyPanel(html) {
  html = html.replace(/\n<div class="lc-sticky-panel"[\s\S]*?<\/div>\n(?=<section class="lc-featured")/, '\n');
  html = html.replace(/\n<nav class="lc-toolbar[\s\S]*?<\/nav>\n<nav class="lc-jump[\s\S]*?<\/nav>\n/, '\n');
  if (!html.includes('id="lcSticky"')) {
    html = html.replace(
      /(<section class="hero wrap">[\s\S]*?<\/section>)\n/,
      `$1\n${LC_STICKY_PANEL}\n`
    );
  }
  return html;
}

function patchBlogIndex(html) {
  html = injectCss(html);
  html = fixHero(html);
  html = html.replace(
    /<\/section>\s*<div class="wrap" style="padding:24px 0 8px">\s*<h2 style="font-family:'Fraunces',serif;color:#e3b53e;margin:0 0 4px">Featured Guides<\/h2>/,
    `</section>
<section class="lc-featured wrap" id="featured-guides">
  <h2>Featured Guides</h2>`
  );
  html = html.replace(
    /<p style="margin:0 0 14px;color:#b8c9d6">Our most in-depth resources — written for the Northland, not the internet\.<\/p>\s*<div style="display:grid;grid-template-columns:repeat\(auto-fill,minmax\(240px,1fr\)\);gap:12px">/,
    `<p>Our most in-depth resources — written for the Northland, not the internet.</p>
  <div class="lc-featured-grid">`
  );
  html = html.replace(
    /<a href="([^"]+)" style="display:block;background:rgba\(255,255,255,\.05\);border:1px solid rgba\(160,200,225,\.16\);border-radius:12px;padding:14px 16px;text-decoration:none;color:#e9f1f6"><strong style="color:#e3b53e">([^<]+)<\/strong><br><span style="font-size:\.86rem;color:#b8c9d6">([^<]*)<\/span><\/a>/g,
    '<a href="$1" class="lc-featured-card"><strong>$2</strong><span>$3</span></a>'
  );
  html = html.replace(/<\/div>\s*<\/div>\s*<div class="wrap" style="padding:8px 0 8px">\s*<h2 style="font-family:'Fraunces',serif;color:#e3b53e;margin:18px 0 4px">Expert Answers<\/h2>/,
    `</div>
</section>
<section class="lc-expert wrap" id="expert-answers">
  <h2>Expert Answers</h2>`
  );
  html = html.replace(
    /<p style="margin:0 0 14px;color:#b8c9d6">Deep answers to the specific questions Northland homeowners and businesses actually ask\.<\/p>/,
    `<p>Deep answers to the specific questions Northland homeowners and businesses actually ask.</p>`
  );
  html = html.replace(
    /<h3 style="color:#7fc6e8;margin:18px 0 8px;font-size:1\.02rem">([^<]+)<\/h3>\s*<div style="display:grid;grid-template-columns:repeat\(auto-fill,minmax\(220px,1fr\)\);gap:10px">/g,
    `<h3>$1</h3>
  <div class="lc-expert-grid">`
  );
  html = html.replace(
    /<a href="([^"]+)" style="display:block;background:rgba\(255,255,255,\.04\);border:1px solid rgba\(160,200,225,\.14\);border-radius:10px;padding:11px 14px;text-decoration:none;color:#dce8f0;font-size:\.92rem">([^<]+) <span class="ui-icon ui-icon--arrow"[\s\S]*?<\/span><\/a>/g,
    '<a href="$1" class="lc-expert-link">$2</a>'
  );
  html = html.replace(/<\/div>\s*<\/div>\s*<div class="wrap" style="padding-bottom:20px">/,
    `</div>
</section>
<div class="wrap" style="padding-bottom:20px">`
  );

  // Region ids on clusters
  for (const r of REGIONS) {
    html = html.replace(
      new RegExp(`<div class="cluster-section">\\s*<div class="cluster-header">\\s*<span class="cluster-badge">${r.badge.replace(/&/g, '&')}</span>`, 'g'),
      `<div class="cluster-section" id="region-${r.id}" data-lc-region="${r.id}">
    <div class="cluster-header">
      <span class="cluster-badge">${r.badge}</span>`
    );
  }

  // Topic data attributes
  html = html.replace(
    /<div class="topic-row"><span class="topic-label">([^<]+)<\/span>/g,
    (_, label) => `<div class="topic-row" data-lc-topic="${topicIdFromLabel(label)}"><span class="topic-label">${label}</span>`
  );

  // Insert sticky panel + city guides header
  html = ensureStickyPanel(html);
  if (!html.includes('id="city-guides"')) {
    html = html.replace(
      /<div class="wrap" style="padding-bottom:20px">/,
      `<section class="lc-city-guides wrap" id="city-guides">
  <h2>Guides by City &amp; Region</h2>
  <p>360+ local articles — use the filters above to narrow by region, topic, or city name.</p>
</section>
<div class="wrap" style="padding-bottom:20px">`
    );
  }

  // Close main before footer
  if (!html.includes('</main>\n\n<footer>')) {
    html = html.replace(/\n<\/div>\s*\n<footer>/, '\n</div>\n</main>\n\n<footer>');
  }

  if (html.includes(JS_MARKER)) {
    html = html.replace(/<script>\/\* LC-NAV-JS \*\/[\s\S]*?<\/script>/, LC_INDEX_JS);
  } else if (!html.includes(JS_MARKER)) {
    html = html.replace('</body>', `${LC_INDEX_JS}\n</body>`);
  }

  return html;
}

function patchBlogPost(html, filename) {
  const city = cityFromBlogFile(filename);
  const regionId = regionFromCity(city);
  html = injectCss(html);

  const subnav = buildSubnav(regionId);
  if (!html.includes('class="lc-subnav"')) {
    html = html.replace(
      /<div class="nav-backdrop" id="navBackdrop" hidden><\/div>/,
      `<div class="nav-backdrop" id="navBackdrop" hidden></div>\n${subnav}`
    );
  }

  // Upgrade breadcrumb
  html = html.replace(
    /<div class="crumb"><a href="[^"]*">Home<\/a> › <a href="\/blog-index">Learning Center<\/a> › ([^<]+)<\/div>/,
    (_, cityName) => `<nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><a href="/blog-index">Learning Center</a><span class="sep">›</span><a href="/blog-index?region=${regionId}#region-${regionId}">${cityName.trim()}</a></nav>`
  );

  return html;
}

function patchGuidePage(html) {
  html = injectCss(html);
  const subnav = buildSubnav('');
  if (!html.includes('class="lc-subnav"') && html.includes('unified-header')) {
    html = html.replace(
      /<div class="nav-backdrop" id="navBackdrop" hidden><\/div>/,
      `<div class="nav-backdrop" id="navBackdrop" hidden></div>\n${subnav}`
    );
  }
  return html;
}

let changed = 0;
for (const name of fs.readdirSync(SITE)) {
  if (!name.endsWith('.html')) continue;
  const fp = path.join(SITE, name);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  if (name === 'blog-index.html') {
    html = patchBlogIndex(html);
  } else if (name.startsWith('blog-') && name !== 'blog-index.html') {
    html = patchBlogPost(html, name);
  } else if (
    html.includes('exterior-stain-identifier') ||
    name.includes('pressure-washing-psi') ||
    name.includes('soft-wash-chemistry') ||
    name.includes('how-to-hire') ||
    name.includes('roof-cleaning') ||
    name.includes('gutter-tiger') ||
    name.includes('spring-exterior')
  ) {
    if (name !== 'blog-index.html' && (html.includes('id="main"') || html.includes('unified-header'))) {
      html = patchGuidePage(html);
    }
  }

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    changed++;
    console.log('lc-nav →', name);
  }
}

console.log(`Learning Center navigation upgraded on ${changed} pages.`);
