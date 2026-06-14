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
html{scroll-behavior:smooth}
body{background:var(--navy-900);background-image:radial-gradient(ellipse 80% 55% at 50% -8%,rgba(127,198,232,.14),transparent),radial-gradient(ellipse 55% 35% at 100% 15%,rgba(227,181,62,.07),transparent),radial-gradient(ellipse 45% 30% at 0% 75%,rgba(127,198,232,.06),transparent)}
.hero{position:relative;padding:56px 0 36px}
.hero::before{content:'';position:absolute;inset:0 auto auto 50%;transform:translateX(-50%);width:min(100%,720px);height:100%;background:radial-gradient(ellipse at center top,rgba(127,198,232,.1),transparent 68%);pointer-events:none}
.hero h1{line-height:1.1;margin-bottom:14px}
.hero p{color:var(--text-dim);margin:0 auto 10px}
.lc-stats{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:26px auto 18px;max-width:680px}
.lc-stat{flex:1 1 100px;background:rgba(255,255,255,.04);border:1px solid rgba(160,200,225,.16);border-radius:14px;padding:12px 16px;text-align:center}
.lc-stat strong{display:block;font-family:'Fraunces',serif;font-size:clamp(1.25rem,3vw,1.6rem);color:#e3b53e;line-height:1.1}
.lc-stat span{font-size:.68rem;color:#8fa8b8;text-transform:uppercase;letter-spacing:.1em;font-weight:600}
.lc-hero-callout{max-width:560px;margin:16px auto 0;padding:13px 18px;background:linear-gradient(135deg,rgba(227,181,62,.12),rgba(127,198,232,.07));border:1px solid rgba(227,181,62,.28);border-radius:14px;font-size:.88rem;color:#dce8f0;line-height:1.5}
.lc-hero-callout a{color:#e3b53e;font-weight:700;text-decoration:none}
.lc-hero-callout a:hover{text-decoration:underline}
.lc-sticky-panel{position:sticky;top:68px;z-index:55;background:rgba(11,22,34,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(150,190,215,.18);padding-bottom:6px;margin-bottom:16px;box-shadow:0 12px 32px rgba(0,0,0,.22)}
.lc-sticky-panel .lc-toolbar{position:static;background:transparent;border:none;padding:8px 0 2px;margin:0}
.lc-sticky-panel .lc-jump{margin:0;padding:10px 0 8px;border-bottom:1px solid rgba(150,190,215,.1)}
.lc-filter-toggle{display:none;width:100%;padding:10px 14px;margin:8px 0 4px;border:1px solid rgba(160,200,225,.2);border-radius:10px;background:rgba(255,255,255,.04);color:#dce8f0;font:inherit;font-size:.82rem;font-weight:600;cursor:pointer;text-align:left}
.lc-filter-toggle::after{content:'▼';float:right;font-size:.68rem;opacity:.55;transition:transform .2s}
.lc-sticky-panel.is-filters-collapsed .lc-filter-toggle::after{transform:rotate(-90deg)}
.lc-toolbar{padding:10px 0 8px}
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
.lc-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid rgba(160,200,225,.12)}
.lc-section-head h2{font-family:'Fraunces',serif;color:#e3b53e;margin:0;font-size:clamp(1.25rem,3vw,1.45rem)}
.lc-section-head p{margin:0;color:#b8c9d6;font-size:.9rem;max-width:420px;text-align:right;line-height:1.45}
.lc-featured,.lc-expert{padding:28px 24px;margin-bottom:32px;background:rgba(255,255,255,.025);border:1px solid rgba(160,200,225,.1);border-radius:20px}
.lc-featured-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
.lc-featured-card{position:relative;display:block;padding:16px 18px 16px 24px;background:rgba(255,255,255,.04);border:1px solid rgba(160,200,225,.14);border-radius:14px;text-decoration:none;color:#e9f1f6;transition:transform .2s,box-shadow .2s,border-color .2s;overflow:hidden}
.lc-featured-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#e3b53e,#7fc6e8);border-radius:4px 0 0 4px}
.lc-featured-card:hover{border-color:#7fc6e8;transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,.28)}
.lc-featured-card strong{color:#e3b53e;display:block;margin-bottom:5px;font-size:.94rem}
.lc-featured-card span{font-size:.84rem;color:#b8c9d6;line-height:1.45}
.lc-expert h3{color:#7fc6e8;margin:20px 0 10px;font-size:1.02rem;padding-left:10px;border-left:3px solid rgba(127,198,232,.35)}
.lc-expert-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.lc-expert-link{display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(160,200,225,.12);border-radius:12px;padding:12px 14px;text-decoration:none;color:#dce8f0;font-size:.9rem;transition:.2s}
.lc-expert-link::after{content:'→';color:#7fc6e8;opacity:0;transform:translateX(-4px);transition:.2s}
.lc-expert-link:hover{border-color:#7fc6e8;color:#fff;background:rgba(127,198,232,.06)}
.lc-expert-link:hover::after{opacity:1;transform:translateX(0)}
.lc-city-guides{padding:8px 0 4px;margin-bottom:4px}
.lc-city-guides .lc-section-head{border-bottom:none;padding-bottom:0;margin-bottom:8px}
.lc-city-guides .lc-section-head p{text-align:left;max-width:none}
.cluster-section{padding:24px 22px 20px;margin-bottom:28px;background:rgba(255,255,255,.02);border:1px solid rgba(160,200,225,.1);border-radius:20px}
.cluster-section[data-lc-region="twin-ports"]{border-color:rgba(127,198,232,.22);box-shadow:inset 4px 0 0 #7fc6e8}
.cluster-section[data-lc-region="carlton"]{border-color:rgba(120,200,140,.22);box-shadow:inset 4px 0 0 #78c88c}
.cluster-section[data-lc-region="iron-range"]{border-color:rgba(220,150,90,.22);box-shadow:inset 4px 0 0 #dc965a}
.cluster-section[data-lc-region="north-shore"]{border-color:rgba(90,190,210,.22);box-shadow:inset 4px 0 0 #5abed2}
.cluster-section[data-lc-region="northland"]{border-color:rgba(160,140,220,.22);box-shadow:inset 4px 0 0 #a08cdc}
.cluster-header{margin-bottom:22px;padding-bottom:16px;border-bottom:1px solid rgba(160,200,225,.1)}
.cluster-badge{font-size:.95rem;padding:9px 20px}
.hub-link{padding:7px 14px;font-size:.8rem;border-radius:24px;transition:.2s}
.hub-link:hover{background:rgba(127,198,232,.1);color:#fff;border-color:rgba(127,198,232,.28)}
.cluster-topics{display:flex;flex-direction:column;gap:12px}
.topic-row{flex-direction:column;gap:0;margin-bottom:0;padding:14px 16px;background:rgba(0,0,0,.12);border:1px solid rgba(160,200,225,.08);border-radius:14px}
.topic-label{min-width:unset;width:100%;padding:0 0 10px;margin-bottom:10px;border-bottom:1px solid rgba(160,200,225,.08);color:#7fc6e8;font-size:.8rem;letter-spacing:.06em}
.topic-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:8px}
.post-card{display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(160,200,225,.1);font-size:.82rem;transition:transform .2s,box-shadow .2s,border-color .2s,background .2s}
.post-card:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.22);border-color:rgba(127,198,232,.32);background:rgba(127,198,232,.06)}
.post-card .pc-city{font-weight:600;font-size:.9rem;color:#fff}
.post-card .go{margin-top:auto;align-self:flex-end;font-size:.72rem;color:#7fc6e8;opacity:.85}
.cluster-section.is-hidden,.topic-row.is-hidden{display:none!important}
.topic-row.is-dimmed{opacity:.35}
.post-card.is-hidden{display:none!important}
.post-card .tag{display:inline-flex!important;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#e3b53e;background:rgba(227,181,62,.1);border:1px solid rgba(227,181,62,.25);border-radius:20px;padding:2px 8px}
#featured-guides,#expert-answers,#city-guides,.cluster-section{scroll-margin-top:180px}
@media(max-width:768px){
  .lc-filter-toggle{display:block}
  .lc-sticky-panel.is-filters-collapsed .lc-toolbar__body{display:none}
  .lc-section-head{flex-direction:column;align-items:flex-start}
  .lc-section-head p{text-align:left;max-width:none}
  .lc-featured,.lc-expert{padding:20px 16px}
  .topic-cards{grid-template-columns:repeat(2,1fr)}
  .cluster-section{padding:18px 14px}
}
@media(min-width:769px){
  .lc-sticky-panel.is-filters-collapsed .lc-toolbar__body{display:block!important}
}
@media(max-width:640px){.lc-sticky-panel{top:68px}.lc-pill{padding:6px 11px;font-size:.74rem}}
`;

const LC_JUMP = `<nav class="lc-jump wrap" aria-label="Jump to section">
  <a href="#featured-guides">Featured</a>
  <a href="#expert-answers">Expert Answers</a>
  <a href="#city-guides">City Guides</a>
${REGIONS.map((r) => `  <a href="#region-${r.id}">${r.label}</a>`).join('\n')}
</nav>`;

const LC_TOOLBAR_INNER = `<div class="wrap">
  <button type="button" class="lc-filter-toggle" id="lcFilterToggle" aria-expanded="false">Search &amp; filter guides</button>
  <div class="lc-toolbar__body" id="lcToolbarBody">
<nav class="lc-toolbar" id="lcToolbar" aria-label="Filter Learning Center guides">
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
</nav>
  </div>
</div>`;

const LC_STICKY_PANEL = `<div class="lc-sticky-panel is-filters-collapsed" id="lcSticky">
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
  var toggle=document.getElementById('lcFilterToggle');
  var sticky=document.getElementById('lcSticky');
  if(toggle&&sticky){
    toggle.addEventListener('click',function(){
      sticky.classList.toggle('is-filters-collapsed');
      var open=!sticky.classList.contains('is-filters-collapsed');
      toggle.setAttribute('aria-expanded',open);
    });
  }
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
  <div class="lc-stats">
    <div class="lc-stat"><strong>360+</strong><span>Local Guides</span></div>
    <div class="lc-stat"><strong>5</strong><span>Regions</span></div>
    <div class="lc-stat"><strong>18</strong><span>Cities</span></div>
    <div class="lc-stat"><strong>20</strong><span>Topics</span></div>
  </div>
  <p class="lc-hero-callout">Start here: <a href="/pressure-washing-psi-chart">The Pressure Washing PSI Chart</a> — safe pressure for every surface, plus our Northland seasonal cleaning calendar.</p>
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
  html = html.replace(/<div class="lc-sticky-panel"[\s\S]*?(?=<section class="lc-featured")/, '');
  html = html.replace(/\n<nav class="lc-toolbar[\s\S]*?<\/nav>\n<nav class="lc-jump[\s\S]*?<\/nav>\n/, '\n');
  html = html.replace(
    /(<section class="hero wrap">[\s\S]*?<\/section>)\n/,
    `$1\n${LC_STICKY_PANEL}\n`
  );
  return html;
}

function patchSectionHeads(html) {
  html = html.replace(
    /<section class="lc-featured wrap" id="featured-guides">\s*<h2>Featured Guides<\/h2>\s*<p>Our most in-depth resources — written for the Northland, not the internet\.<\/p>/,
    `<section class="lc-featured wrap" id="featured-guides">
  <div class="lc-section-head">
    <h2>Featured Guides</h2>
    <p>Our most in-depth resources — written for the Northland, not the internet.</p>
  </div>`
  );
  html = html.replace(
    /<section class="lc-expert wrap" id="expert-answers">\s*<h2>Expert Answers<\/h2>\s*<p>Deep answers to the specific questions Northland homeowners and businesses actually ask\.<\/p>/,
    `<section class="lc-expert wrap" id="expert-answers">
  <div class="lc-section-head">
    <h2>Expert Answers</h2>
    <p>Deep answers to the specific questions Northland homeowners and businesses actually ask.</p>
  </div>`
  );
  html = html.replace(
    /<section class="lc-city-guides wrap" id="city-guides">\s*<h2>Guides by City &amp; Region<\/h2>\s*<p>360\+ local articles — use the filters above to narrow by region, topic, or city name\.<\/p>/,
    `<section class="lc-city-guides wrap" id="city-guides">
  <div class="lc-section-head">
    <h2>Guides by City &amp; Region</h2>
    <p>360+ local articles — use the filters above to narrow by region, topic, or city name.</p>
  </div>`
  );
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
  html = patchSectionHeads(html);
  if (!html.includes('id="city-guides"')) {
    html = html.replace(
      /<div class="wrap" style="padding-bottom:20px">/,
      `<section class="lc-city-guides wrap" id="city-guides">
  <div class="lc-section-head">
    <h2>Guides by City &amp; Region</h2>
    <p>360+ local articles — use the filters above to narrow by region, topic, or city name.</p>
  </div>
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
