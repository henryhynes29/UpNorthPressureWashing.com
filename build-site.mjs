import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DL = path.join(SITE, '..');

const PHONE = '218-576-8610';
const PHONE_TEL = '+12185768610';
const DOMAIN = 'https://www.upnorthpressurewashing.com';

const CITIES = [
  {
    slug: 'duluth', name: 'Duluth', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'index.html', lat: 46.78627, lng: -92.10049, zip: '55802',
    possessive: "Duluth's", region: 'Twin Ports & North Shore',
    nearby: ['Hermantown', 'Proctor', 'Superior', 'Two Harbors'],
    storyTitle: 'Built in Duluth, Backed by Pride',
    storyP1: 'Up North Pressure Washing was founded by a Duluth native who grew up on these North Shore streets — and still calls them home. After years serving in the <strong>Army National Guard</strong>, he brought the same discipline, attention to detail, and follow-through to every property we clean.',
    storyBadge: 'Veteran-Founded · Duluth Proud',
    heroEyebrow: "Duluth's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing, Roof Cleaning &amp; Window Cleaning in Duluth, MN',
    softWashCopy: '<strong>Soft washing</strong> is the safest way to clean siding, roofs, and exterior surfaces in <strong>Duluth, MN</strong>. Our <strong>low-pressure method</strong> removes <strong>algae, mold, and grime</strong> without damaging your home, keeping it looking fresh through Duluth\'s tough Lake Superior weather. From Lakeside to Piedmont Heights, our professional soft washing delivers dependable results you can see immediately.',
    concreteCopy: '<strong>Hot water</strong> pressure washing delivers deeper, faster cleaning for <strong>Duluth properties</strong> — removing <strong>grease, oil stains, road salt, and winter sand</strong> that cold water alone can\'t break down. Our <strong>commercial-grade hot water system</strong> restores driveways, alleys, sidewalks, and parking lots across the hillside neighborhoods and lakefront districts Duluth is known for.',
    deckCopy: 'Bring your outdoor spaces back to life with <strong>professional deck and fence restoration</strong> in <strong>Duluth</strong>. Our wood-safe soft washing removes <strong>algae, mold, and gray weathering</strong> from decks facing the lake breeze — without damaging cedar, treated pine, or composite boards through <strong>Duluth\'s freeze-thaw cycles</strong>.',
    commercialCopy: 'From Canal Park storefronts to West Duluth industrial pads, we provide <strong>commercial-grade pressure washing</strong> built for heavy <strong>salt, grease, and foot-traffic buildup</strong>. Your property\'s curb appeal is your first impression on the North Shore — we make sure it\'s a strong one.',
    windowCopy: 'Crystal-clear windows make every Duluth property look sharper against the lake and sky. Our <strong>window cleaning in Duluth, MN</strong> removes hard-water stains, salt film, pollen, and grime from <strong>residential and commercial glass</strong> — streak-free results that hold up through harsh harbor winds.',
    reviewsHeading: 'Rated 5 Stars by Duluth Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Duluth, Hermantown, Proctor, Cloquet, Two Harbors</strong> &amp; <strong>Superior, WI</strong> — within 100 miles of Duluth.',
    footerLine: 'Proudly serving Duluth, Hermantown, Proctor, Cloquet, and the North Shore.',
    copyright: '© 2026 Up North Pressure Washing · Duluth, MN · Fully Insured &amp; 5-Star Rated',
    existingHub: null,
  },
  {
    slug: 'hermantown', name: 'Hermantown', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'hermantown-mn-pressure-washing.html', lat: 46.80139, lng: -92.22250, zip: '55811',
    possessive: "Hermantown's", region: 'Miller Trunk & Adolph corridor',
    nearby: ['Duluth', 'Proctor', 'Adolph', 'Cloquet'],
    storyTitle: 'Veteran-Founded, Serving Hermantown with Pride',
    storyP1: 'Up North Pressure Washing was founded by a Duluth-area native who grew up on these Northland streets — and proudly serves neighbors right here in Hermantown. After years serving in the <strong>Army National Guard</strong>, he brought the same discipline, attention to detail, and follow-through to every property we clean.',
    storyBadge: 'Veteran-Founded · Hermantown Proud',
    heroEyebrow: "Hermantown's Exterior Cleaning Specialists",
    heroH1: 'Exterior Cleaning in Hermantown, MN',
    softWashCopy: '<strong>Soft washing</strong> protects Hermantown\'s vinyl, LP SmartSide, and stucco homes from <strong>algae and mold</strong> that thrive on shaded, tree-lined lots along the Miller Trunk corridor. Our <strong>low-pressure method</strong> clears green-black streaking on north-facing walls common in the City of Quality Living — without the damage high-pressure washing causes.',
    concreteCopy: '<strong>Hot water</strong> concrete cleaning restores Hermantown driveways, RV pads, and garage aprons stained by <strong>road salt, sand, and oil</strong>. From newer subdivisions to acreage out toward Adolph, our commercial hot-water system breaks down winter buildup that cold rinses leave behind.',
    deckCopy: 'Hermantown decks and fences sit under heavy tree canopy — perfect conditions for <strong>algae, mildew, and gray weathering</strong>. Our soft-wash restoration brightens wood safely before staining, extending the life of outdoor spaces through long Minnesota winters.',
    commercialCopy: 'Hermantown businesses along Highway 53 and the Miller Trunk rely on clean storefronts and parking lots. We deliver <strong>commercial pressure washing</strong> that strips salt, grease, and grime from high-traffic concrete and building exteriors.',
    windowCopy: 'Keep Hermantown homes and businesses looking sharp with <strong>professional window cleaning</strong> that removes pollen, hard-water spots, and Lake Superior humidity film — inside and out, streak-free.',
    reviewsHeading: 'Rated 5 Stars by Hermantown Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Hermantown, Duluth, Proctor, Adolph</strong> &amp; surrounding St. Louis County.',
    footerLine: 'Proudly serving Hermantown, Duluth, Proctor, and the Twin Ports.',
    copyright: '© 2026 Up North Pressure Washing · Hermantown, MN · Fully Insured &amp; 5-Star Rated',
    existingHub: 'hermantown-mn-pressure-washing.html',
  },
  {
    slug: 'proctor', name: 'Proctor', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'proctor-mn-pressure-washing.html', lat: 46.74439, lng: -92.22547, zip: '55810',
    possessive: "Proctor's", region: 'Iron Range gateway',
    nearby: ['Duluth', 'Hermantown', 'Cloquet', 'Esko'],
    storyTitle: 'Northland Roots, Proctor Proud',
    storyP1: 'We serve Proctor homeowners and businesses with the same veteran-led standards we bring across the Twin Ports. Founded by a Northland native after service in the <strong>Army National Guard</strong>, Up North Pressure Washing treats every Proctor property like our own.',
    storyBadge: 'Veteran-Founded · Proctor Proud',
    heroEyebrow: "Proctor's Exterior Cleaning Specialists",
    heroH1: 'Pressure Washing &amp; Soft Washing in Proctor, MN',
    softWashCopy: '<strong>Soft washing</strong> is ideal for Proctor\'s mix of historic homes and updated ranches where <strong>algae and lichen</strong> collect on north slopes and under mature pines. Our gentle method cleans siding and roofs without forcing water behind trim or damaging aging wood.',
    concreteCopy: 'Proctor driveways and walkways take heavy <strong>salt and sand</strong> from MN-210 and local plow routes. <strong>Hot water pressure washing</strong> lifts embedded winter contaminants from concrete, asphalt, and paver patios faster than cold-water rinsing alone.',
    deckCopy: 'Restore Proctor decks and fences dulled by seasons of snow load and shade moisture. Our soft-wash process removes <strong>mold and gray oxidation</strong> safely — prepping surfaces for stain or sealant that lasts.',
    commercialCopy: 'Proctor shops, schools, and municipal buildings deserve professional curb appeal. We handle <strong>commercial exteriors, sidewalks, and loading areas</strong> with insured, commercial-grade equipment.',
    windowCopy: '<strong>Window cleaning in Proctor, MN</strong> clears pollen, dust, and hard-water spotting from residential and commercial glass — improving natural light and street-facing presentation year-round.',
    reviewsHeading: 'Rated 5 Stars by Proctor Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Proctor, Duluth, Hermantown, Cloquet</strong> &amp; Carlton County.',
    footerLine: 'Proudly serving Proctor, Duluth, Hermantown, and the Twin Ports.',
    copyright: '© 2026 Up North Pressure Washing · Proctor, MN · Fully Insured &amp; 5-Star Rated',
    existingHub: 'proctor-mn-pressure-washing.html',
  },
  {
    slug: 'cloquet', name: 'Cloquet', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'pressure-washing-cloquet-mn.html', lat: 46.72161, lng: -92.45931, zip: '55720',
    possessive: "Cloquet's", region: 'Carlton County seat',
    nearby: ['Scanlon', 'Esko', 'Carlton', 'Duluth'],
    storyTitle: 'Serving Cloquet & Carlton County',
    storyP1: 'Cloquet sits where the St. Louis River meets small-town Minnesota character — and its homes face unique moisture from river valleys and heavy timber shade. Our veteran-founded team brings disciplined, detail-oriented exterior cleaning to every Cloquet property we touch.',
    storyBadge: 'Veteran-Founded · Cloquet Proud',
    heroEyebrow: "Cloquet's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Cloquet, MN',
    softWashCopy: '<strong>Soft washing</strong> protects Cloquet siding and roofs from <strong>algae, mold, and river-valley humidity</strong> that streaks north-facing walls near the St. Louis River and Pinehurst Park areas. Low-pressure cleaning preserves finishes on Cloquet\'s mix of craftsman, ranch, and newer builds.',
    concreteCopy: 'Cloquet driveways and commercial lots accumulate <strong>road salt, pulp-mill dust, and winter sand</strong>. Our <strong>hot water concrete washing</strong> restores walkways, shop floors, and residential aprons across Cloquet and Scanlon.',
    deckCopy: 'Cloquet\'s wooded lots mean decks stay damp and green. Our restoration soft wash removes <strong>years of mildew and weathering</strong> without splintering boards — ideal before restaining for Minnesota seasons.',
    commercialCopy: 'From downtown Cloquet storefronts to industrial sites along the river corridor, we provide <strong>commercial pressure washing</strong> that handles grease, salt, and heavy traffic buildup.',
    windowCopy: 'Professional <strong>window cleaning in Cloquet</strong> removes river-humidity film, pollen, and hard-water stains from homes and businesses — streak-free, inside and out.',
    reviewsHeading: 'Rated 5 Stars by Cloquet Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Cloquet, Scanlon, Esko, Carlton</strong> &amp; Carlton County.',
    footerLine: 'Proudly serving Cloquet, Scanlon, Esko, and Carlton County.',
    copyright: '© 2026 Up North Pressure Washing · Cloquet, MN · Fully Insured &amp; 5-Star Rated',
    existingHub: 'pressure-washing-cloquet-mn.html',
  },
  {
    slug: 'superior', name: 'Superior', state: 'WI', stateFull: 'Wisconsin',
    hubFile: 'superior-wi-pressure-washing.html', lat: 46.72077, lng: -92.10408, zip: '54880',
    possessive: "Superior's", region: 'Twin Ports Wisconsin',
    nearby: ['Duluth', 'Proctor', 'Two Harbors', 'Cloquet'],
    storyTitle: 'Twin Ports Service, Superior Proud',
    storyP1: 'We proudly serve Superior, Wisconsin — just across the Blatnik Bridge from our Duluth home base. Veteran-founded and fully insured, Up North Pressure Washing understands how <strong>Lake Superior winds, harbor salt, and long winters</strong> affect Wisconsin-side properties.',
    storyBadge: 'Veteran-Founded · Superior Proud',
    heroEyebrow: "Superior's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Superior, WI',
    softWashCopy: '<strong>Soft washing</strong> protects Superior homes in Billings Park, North End, and South Superior from <strong>algae and mold</strong> driven by lake humidity and bay-side exposure. Gentle cleaning preserves vinyl, aluminum, and wood siding without high-pressure damage.',
    concreteCopy: 'Superior driveways and commercial lots face <strong>harbor salt, sand, and vehicle fluids</strong> year-round. <strong>Hot water concrete washing</strong> breaks down contaminants on walkways, parking areas, and residential driveways across Douglas County.',
    deckCopy: 'Superior decks and docks see constant moisture off the bay. Our soft-wash restoration removes <strong>slippery algae and gray wood oxidation</strong> safely — perfect for waterfront and hillside properties.',
    commercialCopy: 'Superior businesses along Tower Avenue and the waterfront industrial corridor trust our <strong>commercial-grade cleaning</strong> for storefronts, sidewalks, and equipment pads.',
    windowCopy: '<strong>Window cleaning in Superior, WI</strong> cuts through salt spray, pollen, and hard-water spotting — delivering streak-free glass for homes and commercial buildings facing the lake.',
    reviewsHeading: 'Rated 5 Stars by Superior Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Superior, WI, Duluth, Hermantown</strong> &amp; the Twin Ports.',
    footerLine: 'Proudly serving Superior, WI, Duluth, and the Twin Ports.',
    copyright: '© 2026 Up North Pressure Washing · Superior, WI · Fully Insured &amp; 5-Star Rated',
    existingHub: 'superior-wi-pressure-washing.html',
  },
  {
    slug: 'two-harbors', name: 'Two Harbors', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'two-harbors-mn-pressure-washing.html', lat: 47.02215, lng: -91.67073, zip: '55616',
    possessive: "Two Harbors'", region: 'North Shore harbor town',
    nearby: ['Silver Bay', 'Duluth', 'Beaver Bay', 'Finland'],
    storyTitle: 'North Shore Service from Two Harbors',
    storyP1: 'Two Harbors properties endure relentless <strong>Lake Superior spray, fog, and coastal wind</strong> — conditions that accelerate algae on siding and salt on concrete. Our veteran-founded crew brings Twin Ports expertise up the shore with methods tuned for harbor-town exposure.',
    storyBadge: 'Veteran-Founded · North Shore Proud',
    heroEyebrow: "Two Harbors' Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Two Harbors, MN',
    softWashCopy: '<strong>Soft washing</strong> removes the green-black algae and lichen that cling to Two Harbors homes facing the lake and Agate Bay. Our low-pressure approach protects cedar, vinyl, and metal siding from downtown historic districts to Highway 61 lakefront cabins.',
    concreteCopy: 'Two Harbors driveways and marina-adjacent concrete collect <strong>road salt, sand, and iron-rich lake spray</strong>. Hot water pressure washing restores walkways, RV pads, and commercial lots along the North Shore corridor.',
    deckCopy: 'Lake-facing decks in Two Harbors need gentle care. We soft-wash away <strong>algae and slippery buildup</strong> without gouging wood — extending the life of decks battered by Superior storms.',
    commercialCopy: 'Tourism, shipping, and local shops along Highway 61 depend on clean exteriors. We provide <strong>commercial washing</strong> for storefronts, lodging, and industrial sites in Two Harbors.',
    windowCopy: '<strong>Window cleaning in Two Harbors</strong> removes salt film and fog residue from glass — keeping lake views crystal clear through every season.',
    reviewsHeading: 'Rated 5 Stars by Two Harbors Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Two Harbors, Silver Bay, Duluth</strong> &amp; the North Shore.',
    footerLine: 'Proudly serving Two Harbors, Silver Bay, and the North Shore.',
    copyright: '© 2026 Up North Pressure Washing · Two Harbors, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'esko', name: 'Esko', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'esko-mn-pressure-washing.html', lat: 46.70583, lng: -92.36333, zip: '55733',
    possessive: "Esko's", region: 'Esko corner & Thomson',
    nearby: ['Cloquet', 'Scanlon', 'Carlton', 'Duluth'],
    storyTitle: 'Esko & Thomson — Local Service You Can Trust',
    storyP1: 'Esko sits at the crossroads of rural Carlton County — where wooded acreage, school-community pride, and long driveways meet Minnesota winters. We serve Esko and nearby Thomson with veteran-led exterior cleaning built for country properties and suburban homes alike.',
    storyBadge: 'Veteran-Founded · Esko Proud',
    heroEyebrow: "Esko's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Esko, MN',
    softWashCopy: '<strong>Soft washing</strong> clears algae and mold from Esko homes on shaded, pine-lined lots — common from the school district neighborhoods out toward Thomson. Low-pressure cleaning protects siding and roofs without damaging finishes on multi-acre properties.',
    concreteCopy: 'Long Esko driveways and farm-adjacent concrete take <strong>salt, gravel dust, and oil stains</strong>. Hot water washing restores aprons, shop floors, and walkways that see heavy winter plowing along County roads.',
    deckCopy: 'Esko decks under heavy tree cover turn green fast. Our restoration soft wash removes mildew and weathering before you stain — keeping outdoor spaces safe and bright.',
    commercialCopy: 'Esko-area businesses and agricultural operations rely on clean, professional premises. We handle <strong>commercial pads, outbuildings, and storefront concrete</strong> with insured crews.',
    windowCopy: '<strong>Window cleaning in Esko</strong> removes pollen, hard-water spots, and road dust from country homes and local businesses — streak-free results.',
    reviewsHeading: 'Rated 5 Stars by Esko Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Esko, Cloquet, Scanlon, Carlton</strong> &amp; Carlton County.',
    footerLine: 'Proudly serving Esko, Cloquet, Scanlon, and Carlton County.',
    copyright: '© 2026 Up North Pressure Washing · Esko, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'carlton', name: 'Carlton', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'carlton-mn-pressure-washing.html', lat: 46.66300, lng: -92.67379, zip: '55718',
    possessive: "Carlton's", region: 'Carlton County',
    nearby: ['Cloquet', 'Wrenshall', 'Moose Lake', 'Esko'],
    storyTitle: 'Carlton County Seat, Local Care',
    storyP1: 'Carlton homeowners deal with river-bottom humidity, heavy timber shade, and road salt from MN-210 — a combination that stains siding and concrete fast. Our veteran-founded team delivers exterior cleaning tailored to Carlton\'s rural character and county-seat properties.',
    storyBadge: 'Veteran-Founded · Carlton Proud',
    heroEyebrow: "Carlton's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Carlton, MN',
    softWashCopy: '<strong>Soft washing</strong> protects Carlton homes from <strong>algae and mold</strong> in shaded valleys near the Nemadji and surrounding timber. Gentle cleaning suits historic downtown buildings and countryside ranches alike.',
    concreteCopy: 'Carlton driveways and municipal walkways accumulate <strong>winter sand and salt</strong> from plow routes. Hot water concrete washing lifts embedded grime from residential and commercial surfaces across Carlton County.',
    deckCopy: 'Wood decks around Carlton need soft washing — not blasting — to remove green growth and prep for stain. We restore fences and porches damaged by seasons of moisture under the pines.',
    commercialCopy: 'Carlton businesses and county facilities benefit from <strong>commercial pressure washing</strong> for sidewalks, loading docks, and building exteriors.',
    windowCopy: '<strong>Window cleaning in Carlton, MN</strong> delivers streak-free glass for homes and offices — removing pollen, dust, and hard-water film.',
    reviewsHeading: 'Rated 5 Stars by Carlton Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Carlton, Cloquet, Wrenshall, Moose Lake</strong> &amp; Carlton County.',
    footerLine: 'Proudly serving Carlton, Cloquet, Wrenshall, and Carlton County.',
    copyright: '© 2026 Up North Pressure Washing · Carlton, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'scanlon', name: 'Scanlon', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'scanlon-mn-pressure-washing.html', lat: 46.70719, lng: -92.39186, zip: '55720',
    possessive: "Scanlon's", region: 'Cloquet area',
    nearby: ['Cloquet', 'Esko', 'Carlton', 'Duluth'],
    storyTitle: 'Scanlon & Cloquet Area Service',
    storyP1: 'Scanlon sits minutes from Cloquet with the same river-valley humidity and wooded-lot shade that fuel algae growth on local homes. Up North Pressure Washing serves Scanlon residents with veteran-led, fully insured exterior cleaning.',
    storyBadge: 'Veteran-Founded · Scanlon Proud',
    heroEyebrow: "Scanlon's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Scanlon, MN',
    softWashCopy: '<strong>Soft washing</strong> removes algae and mold from Scanlon homes on quiet, tree-lined streets near the Cloquet river corridor. Low-pressure methods protect vinyl and wood without the risks of high-pressure washing.',
    concreteCopy: 'Scanlon driveways and walkways need <strong>hot water cleaning</strong> to remove embedded salt and sand from Minnesota winters. We restore concrete aprons and patio slabs across the Cloquet-Scanlon area.',
    deckCopy: 'Scanlon decks and fences benefit from soft-wash restoration that clears mildew and gray weathering — preparing wood for stain that lasts through long winters.',
    commercialCopy: 'Local Scanlon and Cloquet-area businesses trust our <strong>commercial washing</strong> for clean storefronts and customer-facing exteriors.',
    windowCopy: '<strong>Window cleaning in Scanlon</strong> removes humidity film and pollen from residential glass — streak-free, professional results.',
    reviewsHeading: 'Rated 5 Stars by Scanlon Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Scanlon, Cloquet, Esko, Carlton</strong> &amp; Carlton County.',
    footerLine: 'Proudly serving Scanlon, Cloquet, Esko, and Carlton County.',
    copyright: '© 2026 Up North Pressure Washing · Scanlon, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'wrenshall', name: 'Wrenshall', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'wrenshall-mn-pressure-washing.html', lat: 46.61772, lng: -92.38352, zip: '55797',
    possessive: "Wrenshall's", region: 'Highway 61 south corridor',
    nearby: ['Carlton', 'Cloquet', 'Moose Lake', 'Barnum'],
    storyTitle: 'Wrenshall & South Carlton County',
    storyP1: 'Wrenshall combines small-town Minnesota charm with rural acreage and heavy winter exposure along the I-35 corridor. Our team delivers soft washing and pressure washing tuned for Wrenshall\'s mix of farmsteads, family homes, and local businesses.',
    storyBadge: 'Veteran-Founded · Wrenshall Proud',
    heroEyebrow: "Wrenshall's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Wrenshall, MN',
    softWashCopy: '<strong>Soft washing</strong> clears algae from Wrenshall homes shaded by pines and birch along the Highway 61 south route. Gentle cleaning protects siding on properties from downtown Wrenshall to surrounding township acreage.',
    concreteCopy: 'Wrenshall driveways and shop floors collect <strong>salt, gravel, and agricultural dust</strong>. Hot water pressure washing restores concrete faster than cold rinses — ideal for long rural driveways.',
    deckCopy: 'Country decks around Wrenshall turn green under tree canopy. Our soft-wash restoration removes slippery algae and preps wood for sealing.',
    commercialCopy: 'Wrenshall-area commercial and agricultural properties get <strong>professional pressure washing</strong> for pads, outbuildings, and customer-facing exteriors.',
    windowCopy: '<strong>Window cleaning in Wrenshall</strong> keeps country homes bright — removing road dust, pollen, and hard-water stains streak-free.',
    reviewsHeading: 'Rated 5 Stars by Wrenshall Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Wrenshall, Carlton, Cloquet, Moose Lake</strong> &amp; Carlton County.',
    footerLine: 'Proudly serving Wrenshall, Carlton, Cloquet, and Carlton County.',
    copyright: '© 2026 Up North Pressure Washing · Wrenshall, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'barnum', name: 'Barnum', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'barnum-mn-pressure-washing.html', lat: 46.50161, lng: -92.68879, zip: '55707',
    possessive: "Barnum's", region: 'Moose Lake area',
    nearby: ['Moose Lake', 'Carlton', 'Wrenshall', 'Cloquet'],
    storyTitle: 'Serving Barnum & the Lakes Area',
    storyP1: 'Barnum sits among lakes and timber south of Carlton County\'s busier corridors — where humidity, shade, and seasonal cabins create constant exterior buildup. Veteran-founded Up North Pressure Washing serves Barnum with methods built for lake-country properties.',
    storyBadge: 'Veteran-Founded · Barnum Proud',
    heroEyebrow: "Barnum's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Barnum, MN',
    softWashCopy: '<strong>Soft washing</strong> protects Barnum year-round and seasonal homes from <strong>algae, mold, and lake-humidity streaks</strong>. Low-pressure cleaning is ideal for cabins, lakefront siding, and full-time residences near Barnum and the surrounding lakes.',
    concreteCopy: 'Barnum driveways and lake-access walkways see <strong>sand, salt, and boat-trailer grime</strong>. Hot water concrete washing restores patios, garage aprons, and parking areas.',
    deckCopy: 'Lake decks and docks around Barnum need algae removed safely. Our soft-wash approach clears slippery growth without damaging cedar or treated lumber.',
    commercialCopy: 'Barnum businesses, resorts, and rental properties rely on <strong>commercial exterior cleaning</strong> for curb appeal and guest-ready presentation.',
    windowCopy: '<strong>Window cleaning in Barnum</strong> maximizes lake views — removing water spots, pollen, and grime from residential and vacation-home glass.',
    reviewsHeading: 'Rated 5 Stars by Barnum Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Barnum, Moose Lake, Carlton, Wrenshall</strong> &amp; lake country.',
    footerLine: 'Proudly serving Barnum, Moose Lake, Carlton, and lake country.',
    copyright: '© 2026 Up North Pressure Washing · Barnum, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'moose-lake', name: 'Moose Lake', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'moose-lake-mn-pressure-washing.html', lat: 46.45468, lng: -92.76187, zip: '55767',
    possessive: "Moose Lake's", region: 'I-35 lake country',
    nearby: ['Barnum', 'Carlton', 'Cloquet', 'Hinckley'],
    storyTitle: 'Moose Lake & I-35 Corridor Service',
    storyP1: 'Moose Lake blends interstate traffic, lake tourism, and small-town neighborhoods — each with unique exterior cleaning needs. We serve Moose Lake with veteran-led soft washing and hot-water concrete cleaning built for Minnesota lake country.',
    storyBadge: 'Veteran-Founded · Moose Lake Proud',
    heroEyebrow: "Moose Lake's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Moose Lake, MN',
    softWashCopy: '<strong>Soft washing</strong> removes algae and mold from Moose Lake homes near the state park, downtown, and surrounding lakes. Gentle cleaning suits seasonal cabins and year-round residences facing heavy pollen and humidity.',
    concreteCopy: 'Moose Lake concrete — from downtown sidewalks to lake-home driveways — collects <strong>salt, sand, and RV traffic stains</strong>. Hot water washing delivers deep, lasting clean results.',
    deckCopy: 'Restore Moose Lake decks and docks with soft washing that clears algae and gray wood without splintering boards — perfect before summer season.',
    commercialCopy: 'Moose Lake shops, lodging, and municipal buildings benefit from <strong>commercial pressure washing</strong> along the I-35 and downtown corridors.',
    windowCopy: '<strong>Window cleaning in Moose Lake</strong> keeps lake views and storefront glass streak-free through pollen season and winter salt spray.',
    reviewsHeading: 'Rated 5 Stars by Moose Lake Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Moose Lake, Barnum, Carlton, Cloquet</strong> &amp; I-35 lake country.',
    footerLine: 'Proudly serving Moose Lake, Barnum, Carlton, and I-35 lake country.',
    copyright: '© 2026 Up North Pressure Washing · Moose Lake, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'silver-bay', name: 'Silver Bay', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'silver-bay-mn-pressure-washing.html', lat: 47.29437, lng: -91.26679, zip: '55614',
    possessive: "Silver Bay's", region: 'North Shore mining community',
    nearby: ['Two Harbors', 'Beaver Bay', 'Finland', 'Duluth'],
    storyTitle: 'North Shore Service in Silver Bay',
    storyP1: 'Silver Bay faces some of the North Shore\'s harshest lake exposure — constant Superior wind, fog, and mineral-rich spray that stains siding and concrete. Our veteran-founded crew brings professional exterior cleaning to this tight-knit North Shore community.',
    storyBadge: 'Veteran-Founded · North Shore Proud',
    heroEyebrow: "Silver Bay's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Silver Bay, MN',
    softWashCopy: '<strong>Soft washing</strong> clears aggressive North Shore algae from Silver Bay homes and multi-family buildings. Low-pressure methods protect exteriors facing direct lake wind and long winter snow loads.',
    concreteCopy: 'Silver Bay driveways and commercial lots endure <strong>road salt, iron-rich spray, and heavy sand</strong>. Hot water concrete washing restores surfaces across the North Shore corridor.',
    deckCopy: 'Lake-facing decks in Silver Bay need regular algae control. Soft-wash restoration keeps wood safe and walkable without damage from high pressure.',
    commercialCopy: 'Silver Bay businesses and public-facing properties rely on <strong>commercial washing</strong> for professional presentation along Highway 61.',
    windowCopy: '<strong>Window cleaning in Silver Bay</strong> removes salt film and fog residue — keeping Superior views clear.',
    reviewsHeading: 'Rated 5 Stars by Silver Bay Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Silver Bay, Two Harbors, Beaver Bay</strong> &amp; the North Shore.',
    footerLine: 'Proudly serving Silver Bay, Two Harbors, and the North Shore.',
    copyright: '© 2026 Up North Pressure Washing · Silver Bay, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'lake-nebagamon', name: 'Lake Nebagamon', state: 'WI', stateFull: 'Wisconsin',
    hubFile: 'lake-nebagamon-wi-pressure-washing.html', lat: 46.60772, lng: -91.73709, zip: '54849',
    possessive: "Lake Nebagamon's", region: 'Douglas County WI border lakes',
    nearby: ['Superior', 'Solon Springs', 'Poplar', 'Duluth'],
    storyTitle: 'Lake Nebagamon & Douglas County Lakes',
    storyP1: 'Lake Nebagamon is a lake-community jewel where wooded lots, seasonal cabins, and full-time homes all battle moisture-driven algae and winter salt. We serve the village and surrounding townships with veteran-led exterior cleaning.',
    storyBadge: 'Veteran-Founded · Lake Country Proud',
    heroEyebrow: "Lake Nebagamon's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Lake Nebagamon, WI',
    softWashCopy: '<strong>Soft washing</strong> protects Lake Nebagamon homes and cabins from <strong>algae, mold, and lake-humidity streaks</strong> on shaded north shores. Gentle cleaning preserves log, vinyl, and cedar siding.',
    concreteCopy: 'Lake Nebagamon driveways and boat-access concrete see <strong>sand, salt, and organic stains</strong>. Hot water washing restores walkways and garage aprons across the lake community.',
    deckCopy: 'Dock-side and lake-facing decks need soft washing to remove slippery algae. We restore wood safely before staining for the season.',
    commercialCopy: 'Lake Nebagamon-area businesses and rental properties get <strong>commercial exterior cleaning</strong> for guest-ready curb appeal.',
    windowCopy: '<strong>Window cleaning at Lake Nebagamon</strong> maximizes water views — streak-free glass inside and out.',
    reviewsHeading: 'Rated 5 Stars by Lake Nebagamon Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Lake Nebagamon, Superior, Solon Springs</strong> &amp; Douglas County.',
    footerLine: 'Proudly serving Lake Nebagamon, Superior, and Douglas County.',
    copyright: '© 2026 Up North Pressure Washing · Lake Nebagamon, WI · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'hibbing', name: 'Hibbing', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'hibbing-mn-pressure-washing.html', lat: 47.42715, lng: -92.93769, zip: '55746',
    possessive: "Hibbing's", region: 'Iron Range',
    nearby: ['Chisholm', 'Virginia', 'Eveleth', 'Nashwauk'],
    storyTitle: 'Iron Range Service — Hibbing',
    storyP1: 'Hibbing\'s Iron Range climate — heavy snow, mining dust, and long cold seasons — creates unique buildup on siding and concrete. Veteran-founded Up North Pressure Washing serves Hibbing with commercial-grade equipment and Range-tough methods.',
    storyBadge: 'Veteran-Founded · Iron Range Proud',
    heroEyebrow: "Hibbing's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Hibbing, MN',
    softWashCopy: '<strong>Soft washing</strong> removes algae and iron-range dust film from Hibbing homes in North Hibbing, Howard Yocum, and surrounding neighborhoods. Low-pressure cleaning protects aging and updated exteriors alike.',
    concreteCopy: 'Hibbing driveways and commercial lots collect <strong>road salt, taconite dust, and oil stains</strong>. Hot water pressure washing penetrates what cold water leaves behind on Bob Dylan Drive corridors and residential streets.',
    deckCopy: 'Hibbing decks endure long winters and short summers. Soft-wash restoration clears mildew and gray oxidation before you seal for the season.',
    commercialCopy: 'Hibbing retail, industrial, and municipal properties trust <strong>commercial pressure washing</strong> for heavy-duty Range conditions.',
    windowCopy: '<strong>Window cleaning in Hibbing</strong> removes dust, pollen, and hard-water spots from homes and businesses — streak-free results.',
    reviewsHeading: 'Rated 5 Stars by Hibbing Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Hibbing, Chisholm, Virginia, Eveleth</strong> &amp; the Iron Range.',
    footerLine: 'Proudly serving Hibbing, Chisholm, Virginia, and the Iron Range.',
    copyright: '© 2026 Up North Pressure Washing · Hibbing, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'virginia', name: 'Virginia', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'virginia-mn-pressure-washing.html', lat: 47.52326, lng: -92.53657, zip: '55792',
    possessive: "Virginia's", region: 'Iron Range',
    nearby: ['Eveleth', 'Hibbing', 'Mountain Iron', 'Gilbert'],
    storyTitle: 'Serving Virginia, MN — Iron Range',
    storyP1: 'Virginia sits at the heart of the Mesabi Range where mining heritage meets neighborhood pride. Our veteran-founded team delivers soft washing and hot-water concrete cleaning built for Virginia\'s winters, dust, and heavy municipal traffic.',
    storyBadge: 'Veteran-Founded · Iron Range Proud',
    heroEyebrow: "Virginia's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Virginia, MN',
    softWashCopy: '<strong>Soft washing</strong> clears algae and Range dust from Virginia homes near Olcott Park, North Virginia, and downtown corridors. Gentle methods protect brick, vinyl, and wood without surface damage.',
    concreteCopy: 'Virginia sidewalks, driveways, and commercial lots face <strong>salt, sand, and industrial dust</strong>. Hot water washing restores concrete across the Iron Range\'s queen city.',
    deckCopy: 'Virginia decks and porches benefit from soft-wash restoration that removes green growth and prepares wood for Minnesota\'s short staining window.',
    commercialCopy: 'Virginia businesses along Chestnut Street and industrial partners rely on <strong>commercial-grade washing</strong> for storefronts and equipment areas.',
    windowCopy: '<strong>Window cleaning in Virginia, MN</strong> delivers streak-free glass for homes and commercial buildings facing busy Range streets.',
    reviewsHeading: 'Rated 5 Stars by Virginia Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Virginia, Eveleth, Hibbing, Mountain Iron</strong> &amp; the Iron Range.',
    footerLine: 'Proudly serving Virginia, Eveleth, Hibbing, and the Iron Range.',
    copyright: '© 2026 Up North Pressure Washing · Virginia, MN · Fully Insured &amp; 5-Star Rated',
  },
  {
    slug: 'eveleth', name: 'Eveleth', state: 'MN', stateFull: 'Minnesota',
    hubFile: 'eveleth-mn-pressure-washing.html', lat: 47.46354, lng: -92.53991, zip: '55734',
    possessive: "Eveleth's", region: 'Iron Range',
    nearby: ['Virginia', 'Gilbert', 'Hibbing', 'Mountain Iron'],
    storyTitle: 'Eveleth & East Range Service',
    storyP1: 'Eveleth — home of the U.S. Hockey Hall of Fame — sees the same tough Range winters and road salt that stain every driveway and storefront. We serve Eveleth with veteran-led exterior cleaning and a satisfaction guarantee.',
    storyBadge: 'Veteran-Founded · Iron Range Proud',
    heroEyebrow: "Eveleth's Exterior Cleaning Specialists",
    heroH1: 'Soft Washing &amp; Pressure Washing in Eveleth, MN',
    softWashCopy: '<strong>Soft washing</strong> removes algae and grime from Eveleth homes in Fayal, James, and surrounding townships. Low-pressure cleaning protects siding through freeze-thaw cycles common on the East Range.',
    concreteCopy: 'Eveleth driveways and municipal concrete collect <strong>heavy salt and Range dust</strong>. Hot water pressure washing restores surfaces along Grant Avenue and residential neighborhoods.',
    deckCopy: 'Eveleth outdoor spaces turn green under snow cover. Soft-wash deck restoration clears mildew and prepares wood for stain before summer.',
    commercialCopy: 'Eveleth businesses and civic properties use our <strong>commercial washing</strong> for professional, salt-free curb appeal.',
    windowCopy: '<strong>Window cleaning in Eveleth</strong> removes dust, pollen, and hard-water film — streak-free for homes and local businesses.',
    reviewsHeading: 'Rated 5 Stars by Eveleth Homeowners',
    serviceAreaFooter: 'Proudly serving <strong>Eveleth, Virginia, Gilbert, Hibbing</strong> &amp; the Iron Range.',
    footerLine: 'Proudly serving Eveleth, Virginia, Gilbert, and the Iron Range.',
    copyright: '© 2026 Up North Pressure Washing · Eveleth, MN · Fully Insured &amp; 5-Star Rated',
  },
];

function stateSuffix(c) {
  return c.state === 'WI' ? 'wi' : 'mn';
}

function softWashFile(c) {
  return `soft-washing-${c.slug}-${stateSuffix(c)}.html`;
}

function concreteFile(c) {
  return `concrete-washing-${c.slug}-${stateSuffix(c)}.html`;
}

function commercialFile(c) {
  return `commercial-soft-washing-${c.slug}-${stateSuffix(c)}.html`;
}

function blogFile(c) {
  return `blog-soft-washing-home-value-${c.slug}.html`;
}

function fixGlobal(html) {
  return html
    .replace(/\(218\)\s*000-0000/g, PHONE)
    .replace(/\(218\) 000-0000/g, PHONE)
    .replace(/northpressurewashing\.com/g, 'upnorthpressurewashing.com')
    .replace(/hot-water-pressure-washing-duluth-mn\.html/g, 'concrete-washing-duluth-mn.html')
    .replace(/hot-water-pressure-washing-([a-z-]+)-(mn|wi)\.html/g, 'concrete-washing-$1-$2.html');
}

function fixHubLinks(html, city) {
  const suf = stateSuffix(city);
  let out = html;
  for (const c of CITIES) {
    const s = stateSuffix(c);
    out = out.replace(new RegExp(`soft-washing-${c.slug}(?!-${s})\\.html`, 'g'), softWashFile(c));
    out = out.replace(new RegExp(`concrete-washing-${c.slug}(?!-${s})\\.html`, 'g'), concreteFile(c));
  }
  out = out.replace(/soft-washing-duluth-mn\.html/g, softWashFile(city));
  out = out.replace(/concrete-washing-duluth-mn\.html/g, concreteFile(city));
  out = out.replace(/hot-water-pressure-washing-duluth-mn\.html/g, concreteFile(city));
  out = out.replace(/soft-washing-duluth\.html/g, softWashFile(city));
  out = out.replace(/concrete-washing-duluth\.html/g, concreteFile(city));
  return out;
}

function generateHubPage(template, city) {
  if (city.slug === 'duluth') return fixHubLinks(fixGlobal(template), city);

  let html = template;
  const suf = stateSuffix(city);
  const st = city.state;

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>Professional Soft Washing, Roof Cleaning &amp; Window Cleaning ${city.name} ${st} | Up North Pressure Washing</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${city.possessive} highest-rated soft washing, roof cleaning &amp; window cleaning. Veteran-founded, fully insured with $1M liability. Free estimates. 1-year growth-free guarantee on soft washes.">`
  );
  html = html.replace(/<meta name="geo\.placename" content="[^"]*">/, `<meta name="geo.placename" content="${city.name}, ${city.stateFull}">`);
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="Professional Soft Washing, Roof Cleaning &amp; Window Cleaning ${city.name} ${st}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${city.possessive} highest-rated exterior cleaning specialists. Veteran-founded. Fully insured. Free estimates.">`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${DOMAIN}/${city.hubFile}">`
  );
  html = html.replace(
    `"addressLocality": "Duluth"`,
    `"addressLocality": "${city.name}"`
  );
  html = html.replace(
    `"addressRegion": "MN"`,
    `"addressRegion": "${st}"`
  );

  html = html.replace(/Duluth&rsquo;s Exterior Cleaning Specialists/g, `${city.heroEyebrow.replace(/'/g, '&rsquo;').replace("'s", '&rsquo;s')}`);
  html = html.replace(
    /<h1>Soft Washing, Roof Cleaning &amp; Window Cleaning in Duluth, MN<\/h1>/,
    `<h1>${city.heroH1}</h1>`
  );
  html = html.replace(/<h2 id="story-h">Built in Duluth, Backed by Pride<\/h2>/, `<h2 id="story-h">${city.storyTitle}</h2>`);
  html = html.replace(
    /<p>Up North Pressure Washing was founded by a Duluth native who grew up on these North Shore streets — and still calls them home\. After years serving in the <strong>Army National Guard<\/strong>, he brought the same discipline, attention to detail, and follow-through to every property we clean\.<\/p>/,
    `<p>${city.storyP1}</p>`
  );
  html = html.replace(/Veteran-Founded · Duluth Proud/g, city.storyBadge);

  html = html.replace(/<h2>Soft Washing Duluth, MN<\/h2>/, `<h2>Soft Washing ${city.name}, ${st}</h2>`);
  html = html.replace(/<h2>Hot Water Pressure Washing Duluth, MN<\/h2>/, `<h2>Hot Water Pressure Washing ${city.name}, ${st}</h2>`);
  html = html.replace(/<h2>Deck &amp; Fence Restoration Duluth, MN<\/h2>/, `<h2>Deck &amp; Fence Restoration ${city.name}, ${st}</h2>`);
  html = html.replace(/<h2>Commercial Cleaning Duluth, MN<\/h2>/, `<h2>Commercial Cleaning ${city.name}, ${st}</h2>`);
  html = html.replace(/<h2>Window Cleaning Duluth, MN<\/h2>/, `<h2>Window Cleaning ${city.name}, ${st}</h2>`);

  html = html.replace(
    /<p class="copy"><strong>Soft washing<\/strong> is the safest way[\s\S]*?<\/p>\s*<a class="btn btn--secondary" href="soft-washing-duluth-mn\.html">/,
    `<p class="copy">${city.softWashCopy}</p>\n    <a class="btn btn--secondary" href="${softWashFile(city)}">`
  );
  html = html.replace(
    /<p class="copy"><strong>Hot water<\/strong> pressure washing delivers[\s\S]*?<\/p>\s*<a class="btn btn--secondary" href="(?:hot-water-pressure-washing|concrete-washing)-duluth-mn\.html">/,
    `<p class="copy">${city.concreteCopy}</p>\n    <a class="btn btn--secondary" href="${concreteFile(city)}">`
  );
  html = html.replace(
    /<p class="copy">Bring your outdoor spaces back to life[\s\S]*?<\/p>\s*<a class="btn btn--secondary" href="deck-restoration-duluth-mn\.html">/,
    `<p class="copy">${city.deckCopy}</p>\n    <a class="btn btn--secondary" href="deck-restoration-duluth-mn.html">`
  );

  // Commercial section copy - between closing div and quote
  html = html.replace(
    /<p class="copy">Your property's curb appeal is your first impression[\s\S]*?<\/p>\s*<a class="btn btn--quote" href="contact\.html">Get Your Free Quote<\/a>\s*<\/div>\s*<\/section>\s*<!-- WINDOW -->/,
    `<p class="copy">${city.commercialCopy}</p>\n    <a class="btn btn--quote" href="contact.html">Get Your Free Quote</a>\n  </div>\n</section>\n<!-- WINDOW -->`
  );

  html = html.replace(
    /<p class="copy">Crystal-clear windows make every property[\s\S]*?<\/p>\s*<a class="btn btn--secondary" href="window-cleaning-duluth-mn\.html">/,
    `<p class="copy">${city.windowCopy}</p>\n    <a class="btn btn--secondary" href="window-cleaning-duluth-mn.html">`
  );

  html = html.replace(/Rated 5 Stars by Duluth Homeowners/g, city.reviewsHeading);
  html = html.replace(
    /Proudly serving <strong>Duluth, Hermantown, Proctor, Cloquet, Two Harbors<\/strong> &amp; <strong>Superior, WI<\/strong> — within 100 miles of Duluth\./,
    city.serviceAreaFooter
  );
  html = html.replace(
    /Proudly serving Duluth, Hermantown, Proctor, Cloquet, and the North Shore\./,
    city.footerLine
  );
  html = html.replace(
    /© 2026 Up North Pressure Washing · Duluth, MN · Fully Insured &amp; 5-Star Rated/,
    city.copyright
  );

  // Alt text city names
  html = html.replace(/Duluth, MN/g, `${city.name}, ${st}`);
  html = html.replace(/ in Duluth/g, ` in ${city.name}`);
  html = html.replace(/Duluth properties/g, `${city.name} properties`);
  html = html.replace(/Duluth's/g, city.possessive);
  html = html.replace(/Duluth business/g, `${city.name} business`);
  html = html.replace(/any Duluth business/g, `any ${city.name} business`);
  html = html.replace(/Duluth homeowners/g, `${city.name} homeowners`);
  html = html.replace(/Duluth Home/g, `${city.name} Home`);
  html = html.replace(/<li><a href="index\.html">Duluth Home<\/a><\/li>/, `<li><a href="${city.hubFile}">${city.name} Home</a></li>`);
  html = html.replace(/<li><a href="index\.html">Duluth<\/a><\/li>/, `<li><a href="index.html">Duluth</a></li>\n      <li><a href="${city.hubFile}">${city.name}</a></li>`);

  html = fixHubLinks(fixGlobal(html), city);
  return html;
}

function copyIfExists(srcName, destName) {
  const src = path.join(DL, srcName);
  if (!fs.existsSync(src)) {
    console.warn('MISSING:', srcName);
    return false;
  }
  let html = fs.readFileSync(src, 'utf8');
  html = fixGlobal(html);
  fs.writeFileSync(path.join(SITE, destName), html);
  console.log('Copied:', destName);
  return true;
}

function main() {
  const template = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
  let count = 0;

  // Service pages
  for (const c of CITIES) {
    const slug = c.slug;
    copyIfExists(`soft-washing-${slug}.html`, softWashFile(c)) && count++;
    copyIfExists(`concrete-washing-${slug}.html`, concreteFile(c)) && count++;
    copyIfExists(`commercial-soft-washing-${slug}.html`, commercialFile(c)) && count++;
    copyIfExists(`blog-soft-washing-home-value-${slug}.html`, blogFile(c)) && count++;
  }
  copyIfExists('blog-index.html', 'blog-index.html') && count++;
  copyIfExists('soft-washing-duluth.html', softWashFile(CITIES[0])) && count++;

  // Hub pages
  for (const c of CITIES) {
    const dest = path.join(SITE, c.hubFile);
    if (c.slug === 'duluth') {
      let html = fixHubLinks(fixGlobal(template), c);
      fs.writeFileSync(dest, html);
      console.log('Updated hub:', c.hubFile);
      count++;
      continue;
    }
    if (c.existingHub && fs.existsSync(path.join(DL, c.existingHub))) {
      let html = fs.readFileSync(path.join(DL, c.existingHub), 'utf8');
      html = generateHubPage(html, c);
      fs.writeFileSync(dest, html);
      console.log('Copied+fixed hub:', c.hubFile);
    } else {
      let html = generateHubPage(template, c);
      fs.writeFileSync(dest, html);
      console.log('Generated hub:', c.hubFile);
    }
    count++;
  }

  // Fix all html in site folder
  for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
    const fp = path.join(SITE, f);
    let html = fs.readFileSync(fp, 'utf8');
    const fixed = fixGlobal(html);
    if (fixed !== html) fs.writeFileSync(fp, fixed);
  }

  // Update index nav with city links
  let index = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
  const cityNavLinks = CITIES.filter(c => c.slug !== 'duluth')
    .map(c => `<li><a href="${c.hubFile}">${c.name}</a></li>`)
    .join('\n    ');
  if (!index.includes('two-harbors-mn-pressure-washing.html')) {
    index = index.replace(
      /<li><a href="hermantown-mn-pressure-washing\.html">Hermantown<\/a><\/li>\s*<li><a href="superior-wi-pressure-washing\.html">Superior<\/a><\/li>\s*<li><a href="pressure-washing-cloquet-mn\.html">Cloquet<\/a><\/li>/,
      `<li><a href="hermantown-mn-pressure-washing.html">Hermantown</a></li>\n    <li><a href="superior-wi-pressure-washing.html">Superior</a></li>\n    <li><a href="pressure-washing-cloquet-mn.html">Cloquet</a></li>\n    <li><a href="two-harbors-mn-pressure-washing.html">Two Harbors</a></li>\n    <li><a href="esko-mn-pressure-washing.html">Esko</a></li>\n    <li><a href="hibbing-mn-pressure-washing.html">Hibbing</a></li>`
    );
    index = index.replace(
      /href="hot-water-pressure-washing-duluth-mn\.html"/g,
      `href="${concreteFile(CITIES[0])}"`
    );
    fs.writeFileSync(path.join(SITE, 'index.html'), index);
  }

  const total = fs.readdirSync(SITE).filter(x => x.endsWith('.html')).length;
  console.log(`\nDone. ${total} HTML files in site folder.`);
}

main();
