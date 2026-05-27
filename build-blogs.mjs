import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';
const PHONE = '218-576-8610';
const BRAND = 'Up North Pressure Washing';

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrStart = code.indexOf('[', start);
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(arrStart, arrEnd + 1));
}

const CITIES = loadCities();

const TOPICS = [
  {
    id: 'soft-washing-guide',
    tag: 'Soft Washing',
    file: slug => `blog-soft-washing-guide-${slug}.html`,
    image: 'images/house-wash-after.jpg',
    imageAlt: c => `Professional soft washing results on a home in ${c.name}, ${c.state} — clean siding after low-pressure treatment`,
    primary: slug => `soft-washing-${slug}.html`,
    cta: c => `Get My Free ${c.name} Soft Wash Quote`,
    title: c => `The Complete Soft Washing Guide for ${c.name}, ${c.state} Homeowners`,
    meta: c => `Soft washing in ${c.name}, ${c.state}: when to schedule, why low pressure beats blasting, and how it protects siding through ${c.region}'s tough seasons. Free quote.`,
    eyebrow: c => `${c.name} · Soft Washing`,
    related: slug => [
      ['Residential Soft Wash', `soft-washing-${slug}.html`, 'Gentle low-pressure cleaning for homes.'],
      ['Commercial Soft Wash', `commercial-soft-washing-${slug}.html`, 'Storefronts and building exteriors.'],
      ['Concrete Washing', `concrete-washing-${slug}.html`, 'Driveways, walks, and patios.'],
    ],
    content: c => {
      const loc = `${c.name}, ${c.state}`;
      return {
        lead: `If you own a home in ${loc}, you've seen green algae streaks, black mold spots, and gray weathering appear faster than you'd expect. ${c.possessive} mix of humidity, shade, and long winters creates perfect conditions for organic growth on siding — and soft washing is the safest, most effective way to stop it.`,
        takeaways: [
          `Soft washing uses low pressure and cleaners that kill algae at the root — ideal for ${loc} homes.`,
          `High-pressure blasting can damage vinyl, stucco, and wood; soft washing won't.`,
          `Annual soft washing protects siding and keeps curb appeal strong across ${c.region}.`,
          `Listing photos and first impressions improve dramatically after a professional soft wash.`,
        ],
        sections: [
          { h: `Why ${c.name} siding gets dirty <span class="ice">so fast</span>`, p: `Properties across ${c.region} deal with moisture that lingers on north-facing walls, tree shade that blocks drying sun, and seasonal pollen that feeds organic growth. Over time, that buildup holds water against your siding — exactly what algae and mildew need to thrive.` },
          { h: `Soft washing vs. pressure washing in <span class="gold">${c.name}</span>`, p: `Traditional pressure washing can force water behind panels, strip paint, and etch soft surfaces. Soft washing treats the biology causing the stain, then rinses gently. Results last longer because the spores are eliminated — not just pushed around.` },
          { h: `Best time to schedule in ${c.stateFull}`, p: `Most ${c.name} homeowners schedule between late spring and early fall, once pollen season slows and before freeze-up. If you're preparing to sell, plan your soft wash one to two weeks before listing photos.` },
          { h: `What a professional soft wash includes`, p: `A full soft wash covers siding, soffits, and problem areas where ${c.possessive} weather leaves heavy staining. We use commercial-grade, biodegradable solutions and protect landscaping throughout the process.` },
        ],
        pullquote: `Clean siding isn't vanity in ${c.name} — it's protection against moisture, mold, and the wear that costs far more to fix later.`,
        ctaHead: `Ready for a cleaner home in <span class="gold">${c.name}</span>?`,
        ctaBody: `See why homeowners across ${c.region} trust ${BRAND} for soft washing that protects finishes and delivers lasting results.`,
      };
    },
  },
  {
    id: 'parking-lot-cleaning',
    tag: 'Commercial',
    file: slug => `blog-parking-lot-cleaning-${slug}.html`,
    image: 'images/commercial-after.jpg',
    imageAlt: c => `After commercial parking lot pressure washing in ${c.name}, ${c.state} — clean concrete and professional curb appeal`,
    primary: slug => `commercial-soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Commercial Quote`,
    title: c => `Parking Lot Cleaning in ${c.name}, ${c.state}: Why Businesses Can't Skip It`,
    meta: c => `Commercial parking lot cleaning in ${c.name}, ${c.state} — remove oil, salt, grease, and grime with hot-water pressure washing. Insured crews. Free estimates.`,
    eyebrow: c => `${c.name} · Parking Lots`,
    related: slug => [
      ['Commercial Cleaning', `commercial-soft-washing-${slug}.html`, 'Building exteriors and pads.'],
      ['Concrete Washing', `concrete-washing-${slug}.html`, 'Hot-water flatwork cleaning.'],
      ['Soft Washing', `soft-washing-${slug}.html`, 'Storefront and facade care.'],
    ],
    content: c => ({
      lead: `Your parking lot is the first physical touchpoint customers have with your ${c.name} business. Oil stains, salt residue, and gum buildup send the wrong message — and in ${c.region}, winter tracking makes lot maintenance non-negotiable.`,
      takeaways: [
        'Hot-water cleaning breaks down grease and oil cold water leaves behind.',
        `Safer footing for customers and staff after algae and slime are removed.`,
        `Protects asphalt and concrete from premature breakdown caused by chemical exposure.`,
        `Boosts curb appeal for retail, medical, and multi-tenant properties in ${c.name}.`,
      ],
      sections: [
        { h: `What builds up on <span class="ice">${c.name} lots</span>`, p: `Vehicle fluids, sand, salt, food grease, and organic growth combine into a slippery, stained surface. Left untreated, stains become permanent and liability risk increases — especially during wet seasons in ${c.region}.` },
        { h: `Hot water vs. cold for <span class="gold">commercial concrete</span>`, p: `Heated water emulsifies oil and cuts through compacted grime faster, reducing downtime for your operation. We schedule around business hours whenever possible.` },
        { h: `How often ${c.name} properties should clean`, p: `High-traffic lots often benefit from spring and fall service — after winter salt season and before holiday rushes. Medical and food-service sites may need more frequent maintenance.` },
        { h: 'Dumpster pads, entries, and loading zones', p: `Parking lot packages often include dumpster pads and main entrances where grease concentration is highest — the areas inspectors and customers notice first.` },
      ],
      pullquote: `A clean lot tells ${c.name} customers you run a professional operation before they ever walk through the door.`,
      ctaHead: `Need a cleaner lot in <span class="gold">${c.name}</span>?`,
      ctaBody: `Insured commercial crews, hot-water equipment, and flexible scheduling for ${c.region} businesses.`,
    }),
  },
  {
    id: 'window-cleaning-guide',
    tag: 'Window Cleaning',
    file: slug => `blog-window-cleaning-guide-${slug}.html`,
    image: 'images/window-res-after.jpg',
    imageAlt: c => `Streak-free window cleaning results in ${c.name}, ${c.state} — crystal clear residential glass`,
    primary: slug => `residential-window-cleaning-${slug}.html`,
    cta: c => `Get My ${c.name} Window Cleaning Quote`,
    title: c => `Window Cleaning in ${c.name}, ${c.state}: Streak-Free Results That Last`,
    meta: c => `Professional window cleaning in ${c.name}, ${c.state}. Remove hard-water spots, salt film, and pollen — interior and exterior. Same-window results. Free quote.`,
    eyebrow: c => `${c.name} · Window Cleaning`,
    related: slug => [
      ['Residential Windows', `residential-window-cleaning-${slug}.html`, 'Homes — inside & out.'],
      ['Commercial Windows', `commercial-window-cleaning-${slug}.html`, 'Storefronts & offices.'],
      ['Window Hub', `window-cleaning-${slug}.html`, 'All window services.'],
    ],
    content: c => ({
      lead: `Clean windows change how your ${c.name} home or business feels — more light, sharper curb appeal, and clearer views. In ${c.region}, hard-water spotting, salt film, and pollen accumulate fast on glass.`,
      takeaways: [
        'Professional squeegee and pure-water methods prevent streaks DIY tools leave behind.',
        `Interior and exterior service available for ${c.name} homes and storefronts.`,
        'Hard-water stains and salt film require proper technique — not just Windex and paper towels.',
        'Scheduled maintenance keeps glass clear through pollen and winter tracking seasons.',
      ],
      sections: [
        { h: `Why ${c.name} glass gets hazy <span class="ice">so quickly</span>`, p: `Lake humidity, road dust, pollen, and mineral-rich water leave films that bake onto glass. The result is cloudy views and a tired-looking exterior — even when the rest of the property is maintained.` },
        { h: `Same-window before &amp; after <span class="gold">matters</span>`, p: `True window cleaning results show the same pane transformed — filmy and streaked on one side, crystal clear on the other. That's the standard we hold every ${c.name} job to.` },
        { h: 'Commercial storefront glass', p: `Retail and office entryways are high-visibility. Clean glass improves customer confidence and makes signage, displays, and interiors look intentional.` },
        { h: `How often to clean in ${c.stateFull}`, p: `Many ${c.name} homeowners choose twice-yearly service — spring after pollen and fall before the holidays. Lakefront and commercial properties often schedule quarterly.` },
      ],
      pullquote: `Streak-free glass is one of the fastest ways to make a ${c.name} property look sharper — inside and out.`,
      ctaHead: `Want streak-free windows in <span class="gold">${c.name}</span>?`,
      ctaBody: `Residential and commercial window cleaning tuned for ${c.region}'s hard-water and salt challenges.`,
    }),
  },
  {
    id: 'deck-fence-restoration',
    tag: 'Deck & Fence',
    file: slug => `blog-deck-fence-restoration-${slug}.html`,
    image: 'images/deck-after.jpg',
    imageAlt: c => `After deck restoration in ${c.name}, ${c.state} — stain-ready wood deck boards and bright rails`,
    primary: slug => `deck-restoration-${slug}.html`,
    cta: c => `Get My ${c.name} Deck Restoration Quote`,
    title: c => `Deck & Fence Restoration in ${c.name}, ${c.state}: Wood-Safe Cleaning Before Stain`,
    meta: c => `Deck and fence restoration in ${c.name}, ${c.state}. Remove algae, gray weathering, and slippery growth — soft-wash wood care, never harsh blasting. Free quote.`,
    eyebrow: c => `${c.name} · Deck & Fence`,
    related: slug => [
      ['Deck Restoration', `deck-restoration-${slug}.html`, 'Wood-safe soft-wash restoration.'],
      ['Soft Washing', `soft-washing-${slug}.html`, 'Home exterior cleaning.'],
      ['Concrete Washing', `concrete-washing-${slug}.html`, 'Patios and walkways beside decks.'],
    ],
    content: c => ({
      lead: `${c.name} decks and fences turn gray, green, and slippery under ${c.region}'s moisture. Before you stain or seal, wood needs proper restoration — not destructive pressure that furring and splinters boards.`,
      takeaways: [
        'Soft-wash wood cleaning removes algae and mildew without gouging cedar or pine.',
        'Stain-ready surfaces absorb sealant evenly for longer-lasting color.',
        'Safer footing when slippery green growth is removed from wet boards.',
        'Fence, rail, dock, and pergola care available in one coordinated visit.',
      ],
      sections: [
        { h: `Why ${c.name} wood turns <span class="ice">green and gray</span>`, p: `Shade, snow load, and humidity keep boards damp for weeks. Organic growth eats into the surface layer, creating that silvery weathered look and slick texture underfoot.` },
        { h: `Restoration before <span class="gold">stain or seal</span>`, p: `Staining over dirty wood traps mildew beneath the finish — leading to peeling within a season. Restoration opens the grain so stain bonds properly.` },
        { h: 'Fence and rail brightening', p: `Privacy fences and railing systems benefit from the same gentle process as deck boards — lifted grime without damaging fasteners or lattice.` },
        { h: `Pair with patio cleaning in ${c.name}`, p: `Many homeowners bundle adjacent concrete flatwork so the entire outdoor space feels reset for summer.` },
      ],
      pullquote: `A restored deck in ${c.name} isn't just prettier — it's safer, longer-lasting, and ready for the stain season.`,
      ctaHead: `Restore your ${c.name} deck or fence?`,
      ctaBody: `Wood-safe soft washing across ${c.region} — never harsh blasting on cedar, pine, or composite.`,
    }),
  },
  {
    id: 'oxidation-removal',
    tag: 'Oxidation Removal',
    file: slug => `blog-oxidation-removal-${slug}.html`,
    image: 'images/oxidation-siding.jpg',
    imageAlt: c => `Oxidation and chalky siding before professional cleaning in ${c.name}, ${c.state}`,
    primary: slug => `soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Oxidation Removal Quote`,
    title: c => `Oxidation Removal in ${c.name}, ${c.state}: Fix Chalky, Faded Siding`,
    meta: c => `Remove oxidation and chalky residue from siding in ${c.name}, ${c.state}. Professional soft washing restores color without repainting. Free local quote.`,
    eyebrow: c => `${c.name} · Oxidation`,
    related: slug => [
      ['Soft Washing', `soft-washing-${slug}.html`, 'Full exterior restoration.'],
      ['Commercial Cleaning', `commercial-soft-washing-${slug}.html`, 'Building facades.'],
      ['Concrete Washing', `concrete-washing-${slug}.html`, 'Flatwork and walks.'],
    ],
    content: c => ({
      lead: `That chalky white haze on siding around ${c.name} isn't always dirt — it's often oxidation, a breakdown of factory finishes accelerated by UV, moisture, and ${c.possessive} freeze-thaw cycles.`,
      takeaways: [
        'Oxidation makes vinyl and metal siding look prematurely aged.',
        'Proper cleaning can restore color without the cost of full repainting.',
        'Soft washing treats oxidation without abrasive damage to fragile finishes.',
        'Early treatment prevents deeper material breakdown on ${c.region} homes.',
      ],
      sections: [
        { h: `Oxidation vs. algae in <span class="ice">${c.name}</span>`, p: `Green streaks are organic growth; chalky white rub-off on your hand is oxidation. Both require different chemistry — guessing wrong wastes time and can set stains.` },
        { h: `Why repainting isn't always <span class="gold">the first answer</span>`, p: `Professional oxidation removal costs a fraction of repainting and can add years before you need a full paint job — especially on well-maintained ${c.name} homes.` },
        { h: 'Metal and vinyl facades', p: `Garage doors, trim, and vinyl lap siding around ${c.region} respond well to targeted soft-wash restoration when handled by trained crews.` },
        { h: 'Protect your investment', p: `Regular exterior maintenance prevents oxidation from bonding permanently — saving thousands in premature siding replacement.` },
      ],
      pullquote: `Don't replace chalky siding in ${c.name} until you've seen what professional oxidation removal can do.`,
      ctaHead: `Chalky siding in <span class="gold">${c.name}</span>?`,
      ctaBody: `We restore faded exteriors across ${c.region} with finish-safe soft washing.`,
    }),
  },
  {
    id: 'concrete-driveway-cleaning',
    tag: 'Concrete',
    file: slug => `blog-concrete-driveway-cleaning-${slug}.html`,
    image: 'images/concrete-after.jpg',
    imageAlt: c => `After hot-water concrete driveway cleaning in ${c.name}, ${c.state} — bright clean flatwork`,
    primary: slug => `concrete-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Concrete Quote`,
    title: c => `Concrete Driveway Cleaning in ${c.name}, ${c.state}: Hot Water vs. Cold`,
    meta: c => `Driveway and concrete cleaning in ${c.name}, ${c.state}. Hot-water pressure washing removes oil, salt, and tire marks. Even surface-cleaner finish. Free quote.`,
    eyebrow: c => `${c.name} · Concrete`,
    related: slug => [
      ['Concrete Washing', `concrete-washing-${slug}.html`, 'Driveways, walks, patios.'],
      ['Commercial Cleaning', `commercial-soft-washing-${slug}.html`, 'Lots and loading areas.'],
      ['Deck Restoration', `deck-restoration-${slug}.html`, 'Wood beside concrete patios.'],
    ],
    content: c => ({
      lead: `Driveways and walkways in ${c.name} absorb oil drips, road salt, sand, and leaf tannins until the concrete looks decades older than it is. Hot-water cleaning is the difference between " rinsed " and truly restored.`,
      takeaways: [
        'Hot water emulsifies oil and grease that cold rinsing spreads around.',
        'Surface cleaner attachments prevent wand stripes on large slabs.',
        'Spring cleaning removes winter salt before it etches deeper.',
        'Clean concrete boosts curb appeal before listing a ${c.name} home.',
      ],
      sections: [
        { h: `What stains ${c.name} <span class="ice">concrete</span>`, p: `Vehicle fluids, rust, fertilizer rust stains, and compacted grime from ${c.region} winters embed into porous flatwork. Surface dirt is only half the battle.` },
        { h: `Hot water for <span class="gold">deeper results</span>`, p: `Our commercial hot-water system breaks down petroleum residues and lifts embedded salt — delivering an even, bright finish across the full driveway.` },
        { h: 'Garage aprons and walkways', p: `Bundle front walks, porches, and garage aprons so your entire approach looks cohesive — not just one clean patch.` },
        { h: 'Safe for sealed and broom-finished concrete', p: `Technique matters. We adjust pressure and temperature for aged, stamped, or broom-finished slabs common on ${c.name} homes.` },
      ],
      pullquote: `A bright driveway is one of the highest-impact curb appeal upgrades you can make in ${c.name} — often in a single visit.`,
      ctaHead: `Ready to reset your ${c.name} concrete?`,
      ctaBody: `Hot-water driveway and patio cleaning across ${c.region}.`,
    }),
  },
  {
    id: 'commercial-building-cleaning',
    tag: 'Commercial',
    file: slug => `blog-commercial-building-cleaning-${slug}.html`,
    image: 'images/window-after.jpg',
    imageAlt: c => `Commercial building exterior and glass cleaning in ${c.name}, ${c.state}`,
    primary: slug => `commercial-soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Commercial Quote`,
    title: c => `Commercial Building Cleaning in ${c.name}, ${c.state}: Curb Appeal That Converts`,
    meta: c => `Commercial building cleaning in ${c.name}, ${c.state}. Soft-wash facades, storefronts, and pads. Insured crews, after-hours options. Free commercial quote.`,
    eyebrow: c => `${c.name} · Commercial`,
    related: slug => [
      ['Commercial Soft Wash', `commercial-soft-washing-${slug}.html`, 'Facades and storefronts.'],
      ['Window Cleaning', `window-cleaning-${slug}.html`, 'Entry glass and display windows.'],
      ['Parking Lot Cleaning', `blog-parking-lot-cleaning-${slug}.html`, 'Lot and dumpster pad care.'],
    ],
    content: c => ({
      lead: `Customers judge ${c.name} businesses in seconds — and your building exterior is the billboard. Soft-wash commercial cleaning removes the grime ${c.region} weather deposits on facades, signage, and entryways.`,
      takeaways: [
        'Low-pressure methods protect EIFS, stucco, brick, and painted surfaces.',
        'After-hours scheduling minimizes disruption to ${c.name} tenants and shoppers.',
        'Multi-property maintenance plans keep portfolios consistent.',
        'Insured crews with commercial-grade equipment and hot-water capability.',
      ],
      sections: [
        { h: `Why ${c.name} storefronts fade <span class="ice">fast</span>`, p: `Traffic dust, salt spray, pollution, and organic growth dull facades along high-visibility corridors in ${c.region}. That " tired " look costs foot traffic.` },
        { h: `Soft wash for <span class="gold">every facade type</span>`, p: `From brick and block to vinyl and composite panels, chemistry and pressure must match the substrate — one-size-fits-all blasting causes expensive damage.` },
        { h: 'Property managers and HOAs', p: `Scheduled maintenance across multiple ${c.name} addresses keeps brand standards consistent and reduces emergency callouts.` },
        { h: 'Bundle glass, pads, and facades', p: `Storefront glass, dumpster pads, and sidewalk entries can be coordinated in one visit for maximum impact per dollar.` },
      ],
      pullquote: `In ${c.name}, a clean building exterior is marketing you don't have to advertise — customers feel the difference immediately.`,
      ctaHead: `Elevate your ${c.name} property?`,
      ctaBody: `Commercial soft washing and exterior maintenance for ${c.region} businesses.`,
    }),
  },
  {
    id: 'roof-soft-washing',
    tag: 'Roof Care',
    file: slug => `blog-roof-soft-washing-${slug}.html`,
    image: 'images/ba/roof-after.jpg',
    imageAlt: c => `After roof soft washing in ${c.name}, ${c.state} — clean shingles without harsh pressure damage`,
    primary: slug => `roof-soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Roof Soft Wash Quote`,
    title: c => `Roof Soft Washing in ${c.name}, ${c.state}: Remove Moss & Black Streaks Safely`,
    meta: c => `Roof soft washing in ${c.name}, ${c.state}. Remove moss, algae, and black streaks without voiding shingle warranties. Gentle process. Free quote.`,
    eyebrow: c => `${c.name} · Roof Care`,
    related: slug => [
      ['Roof Soft Washing', `roof-soft-washing-${slug}.html`, 'Black streak and moss removal.'],
      ['Gutter Cleaning', `gutter-fascia-cleaning-${slug}.html`, 'Bright gutters and fascia.'],
      ['Soft Washing', `soft-washing-${slug}.html`, 'Siding and full exterior.'],
    ],
    content: c => ({
      lead: `Black streaks on ${c.name} roofs aren't just ugly — they're Gloeocapsa magma algae feeding on limestone filler in shingles. Left alone, it holds moisture and shortens roof life in ${c.region}'s damp climate.`,
      takeaways: [
        'Never pressure-wash asphalt shingles — soft wash is the manufacturer-approved approach.',
        'Treatments kill moss and algae at the root for longer-lasting results.',
        'Cleaner roofs improve curb appeal before selling in ${c.name}.',
        'Extends time before costly premature replacement.',
      ],
      sections: [
        { h: `Why ${c.name} roofs turn <span class="ice">black</span>`, p: `North-facing slopes and tree cover stay damp — perfect for algae and moss. ${c.possessive} freeze-thaw cycles worsen granule loss when organic growth traps moisture.` },
        { h: `Soft wash protects <span class="gold">your warranty</span>`, p: `High pressure strips protective granules and voids many manufacturer warranties. Low-pressure application with proper chemistry is the industry standard.` },
        { h: 'When to schedule roof cleaning', p: `Late spring through early fall is ideal in ${c.stateFull} — after heavy pollen and before ice season. Visible streaks mean you're already overdue.` },
        { h: 'Pair with gutter and siding care', p: `Full exterior packages prevent runoff from re-staining cleaned surfaces — one coordinated visit, one crew.` },
      ],
      pullquote: `A clean roof in ${c.name} protects your biggest asset — and costs far less than replacing shingles early.`,
      ctaHead: `Black streaks on your ${c.name} roof?`,
      ctaBody: `Gentle roof soft washing across ${c.region} — no harsh blasting.`,
    }),
  },
  {
    id: 'salt-stain-removal',
    tag: 'Salt & Winter',
    file: slug => `blog-salt-stain-removal-${slug}.html`,
    image: 'images/concrete-before.jpg',
    imageAlt: c => `Road salt and winter staining on concrete in ${c.name}, ${c.state} before professional cleaning`,
    primary: slug => `concrete-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Salt Removal Quote`,
    title: c => `Salt Stain Removal in ${c.name}, ${c.state}: Post-Winter Concrete & Siding Care`,
    meta: c => `Remove road salt stains from driveways and walkways in ${c.name}, ${c.state}. Post-winter hot-water cleaning protects concrete and boosts curb appeal. Free quote.`,
    eyebrow: c => `${c.name} · Salt Removal`,
    related: slug => [
      ['Concrete Washing', `concrete-washing-${slug}.html`, 'Driveways and walks.'],
      ['Soft Washing', `soft-washing-${slug}.html`, 'Salt film on siding.'],
      ['Commercial Cleaning', `commercial-soft-washing-${slug}.html`, 'Commercial entries and lots.'],
    ],
    content: c => ({
      lead: `Every ${c.name} winter leaves behind more than snow — sand, salt, and brine track onto driveways, garage aprons, and lower siding. If you don't remove it in spring, stains set and concrete starts to pit.`,
      takeaways: [
        'Salt accelerates concrete spalling and metal corrosion on fixtures.',
        'Hot-water cleaning lifts embedded salt better than cold rinsing.',
        'Lower siding and brick can be treated with soft washing to remove salt film.',
        'Spring cleanup protects property value across ${c.region}.',
      ],
      sections: [
        { h: `How salt damages ${c.name} <span class="ice">property</span>`, p: `Chlorides penetrate porous concrete and wick into masonry. Repeated freeze-thaw cycles expand micro-cracks until surfaces flake and pit.` },
        { h: `Spring is the critical <span class="gold">window</span>`, p: `Schedule salt removal as soon as snow melts — before summer heat bakes residue into permanent stains on ${c.name} flatwork.` },
        { h: 'Garage interiors and aprons', p: `Vehicles drip brine onto aprons all season. Hot-water degreasing restores the transition zone between street and home.` },
        { h: "Don't forget the siding splash zone", p: `Salt-laden splash up to 24 inches off grade discolors vinyl and wood. Soft washing clears it before oxidation starts.` },
      ],
      pullquote: `Post-winter cleanup in ${c.name} isn't optional maintenance — it's how you avoid expensive concrete and siding repairs.`,
      ctaHead: `Salt stains in <span class="gold">${c.name}</span>?`,
      ctaBody: `Post-winter hot-water and soft-wash packages for ${c.region} homes and businesses.`,
    }),
  },
  {
    id: 'gutter-fascia-cleaning',
    tag: 'Gutters & Fascia',
    file: slug => `blog-gutter-fascia-cleaning-${slug}.html`,
    image: 'images/house-wash-before.jpg',
    imageAlt: c => `Dirty gutters and fascia on a home in ${c.name}, ${c.state} before professional exterior cleaning`,
    primary: slug => `gutter-fascia-cleaning-${slug}.html`,
    cta: c => `Get My ${c.name} Gutter Cleaning Quote`,
    title: c => `Gutter & Fascia Cleaning in ${c.name}, ${c.state}: Stop Overflow Before Damage Starts`,
    meta: c => `Gutter and fascia cleaning in ${c.name}, ${c.state}. Remove black streaks, algae, and grime from soffits and gutters with soft washing. Free quote.`,
    eyebrow: c => `${c.name} · Gutters & Fascia`,
    related: slug => [
      ['Gutter Cleaning', `gutter-fascia-cleaning-${slug}.html`, 'Bright gutters and fascia.'],
      ['Roof Soft Washing', `roof-soft-washing-${slug}.html`, 'Remove algae before it runs into gutters.'],
      ['Soft Washing', `soft-washing-${slug}.html`, 'Full siding and soffit care.'],
    ],
    content: c => ({
      lead: `Overflowing gutters and black-streaked fascia boards are everywhere on ${c.name} homes after ${c.region}'s long winters. What looks like cosmetic grime is often algae feeding on organic debris — and clogged gutters push water behind siding where repair bills start.`,
      takeaways: [
        'Soft washing clears tiger stripes on gutters without denting aluminum.',
        'Clean fascia and soffits brighten the entire roofline on ${c.name} homes.',
        'Pair gutter brightening with roof and siding care in one visit.',
        'Prevents ice dam staining and fascia rot from trapped moisture.',
      ],
      sections: [
        { h: `Why ${c.name} gutters turn <span class="ice">black</span>`, p: `Pollen, roof runoff, and organic growth combine into those vertical streaks on white aluminum. ${c.possessive} humid seasons keep surfaces damp long enough for algae to take hold — and it spreads fast on north-facing runs.` },
        { h: `Soft wash vs. scrubbing <span class="gold">by hand</span>`, p: `Hand scrubbing gutters from a ladder is slow, inconsistent, and risky. Low-pressure soft washing treats the biology causing the stain and rinses evenly across long fascia runs.` },
        { h: 'Bundle with roof and siding', p: `Most ${c.name} homeowners save by coordinating gutter brightening with roof soft washing and siding care — one crew, one setup, one cohesive result.` },
        { h: 'Commercial box gutters and canopies', p: `Retail and office buildings in ${c.region} often have visible box gutters and entry canopies that customers notice immediately. Scheduled cleaning keeps portfolios looking sharp.` },
      ],
      pullquote: `Clean gutters and fascia in ${c.name} protect your roofline — and make the whole house look years newer from the street.`,
      ctaHead: `Black streaks on gutters in <span class="gold">${c.name}</span>?`,
      ctaBody: `Finish-safe gutter and fascia soft washing across ${c.region}.`,
    }),
  },
  {
    id: 'algae-mold-siding',
    tag: 'Algae & Mold',
    file: slug => `blog-algae-mold-siding-${slug}.html`,
    image: 'images/soft-before.jpg',
    imageAlt: c => `Green algae and black mold streaks on siding in ${c.name}, ${c.state} before soft washing`,
    primary: slug => `soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Soft Wash Quote`,
    title: c => `Algae & Mold on Siding in ${c.name}, ${c.state}: What It Is and How to Remove It`,
    meta: c => `Remove green algae and black mold from siding in ${c.name}, ${c.state}. Professional soft washing kills growth at the root. Protect your home. Free quote.`,
    eyebrow: c => `${c.name} · Algae & Mold`,
    related: slug => [
      ['Soft Washing Guide', `blog-soft-washing-guide-${slug}.html`, 'Complete homeowner guide.'],
      ['Oxidation Removal', `blog-oxidation-removal-${slug}.html`, 'Fix chalky faded siding.'],
      ['Roof Soft Washing', `blog-roof-soft-washing-${slug}.html`, 'Stop roof runoff re-staining walls.'],
    ],
    content: c => ({
      lead: `Green streaks running down ${c.name} siding and black spots around windows are not just dirt — they are living algae and mildew colonies thriving in ${c.region}'s shade and moisture. Left untreated, they hold water against your walls and spread every season.`,
      takeaways: [
        'Algae and mold are organic — they require treatment, not just rinsing.',
        'North-facing walls and tree shade accelerate growth on ${c.name} homes.',
        'Soft washing kills spores so results last longer than pressure rinsing alone.',
        'Early removal protects paint, vinyl, and wood from premature breakdown.',
      ],
      sections: [
        { h: `Green vs. black growth on <span class="ice">${c.name} siding</span>`, p: `Green streaks are typically algae or moss runoff from roofs. Black spots are often mildew colonies around damp trim and window sills. Both need proper chemistry — blasting with pressure alone spreads spores without killing them.` },
        { h: `Health and <span class="gold">home value</span> concerns`, p: `Organic growth on exterior walls can indicate moisture problems and creates an unkempt appearance that hurts appraisals and showings across ${c.region}.` },
        { h: `Why DIY bleach mixes fail`, p: `Household bleach without surfactants runs off vertical siding before it works, kills plants when not buffered, and often leaves streaks. Professional soft-wash blends are calibrated for each surface.` },
        { h: 'Stop the cycle with maintenance', p: `Annual or biennial soft washing on ${c.name} homes prevents colonies from re-establishing — especially after wet springs and heavy pollen seasons.` },
      ],
      pullquote: `Killing algae at the root is the only way to keep ${c.name} siding clean through ${c.region}'s wet seasons.`,
      ctaHead: `Green or black streaks in <span class="gold">${c.name}</span>?`,
      ctaBody: `Professional algae and mold removal with soft washing — safe for siding, soffits, and trim.`,
    }),
  },
  {
    id: 'curb-appeal-checklist',
    tag: 'Curb Appeal',
    file: slug => `blog-curb-appeal-checklist-${slug}.html`,
    image: 'images/ba/hero-after.jpg',
    imageAlt: c => `Improved curb appeal after exterior cleaning on a home in ${c.name}, ${c.state}`,
    primary: slug => `soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Curb Appeal Quote`,
    title: c => `${c.name}, ${c.state} Curb Appeal Checklist: Exterior Cleaning Before You List`,
    meta: c => `Curb appeal checklist for ${c.name}, ${c.state} homeowners. Siding, windows, concrete, and deck cleaning before listing photos. Free exterior cleaning quote.`,
    eyebrow: c => `${c.name} · Curb Appeal`,
    related: slug => [
      ['Home Value Blog', `blog-soft-washing-home-value-${slug}.html`, 'ROI before selling.'],
      ['Window Cleaning', `window-cleaning-${slug}.html`, 'Streak-free listing photos.'],
      ['Concrete Cleaning', `blog-concrete-driveway-cleaning-${slug}.html`, 'Bright driveways and walks.'],
    ],
    content: c => ({
      lead: `Listing a home in ${c.name}? Buyers form opinions in seconds — and exterior condition drives showing traffic more than most sellers expect. This checklist covers the high-impact cleaning tasks that make ${c.region} properties photograph well and show like move-in ready.`,
      takeaways: [
        'Soft wash siding 1–2 weeks before professional listing photos.',
        'Clean windows, driveway, and front walk for instant brightness.',
        'Restore decks and fences before open houses — buyers test outdoor spaces.',
        'Commercial storefronts benefit from the same first-impression logic.',
      ],
      sections: [
        { h: `Start with the <span class="gold">street view</span>`, p: `Stand at the curb and scan rooflines, siding color, driveway stains, and entry glass. Those four zones define first impressions on ${c.name} listings.` },
        { h: `Siding and <span class="ice">roof touch-ups</span>`, p: `Green algae streaks and black roof lines photograph as neglect even when interiors are pristine. Soft washing both before photos prevents reshoots.` },
        { h: 'Concrete, walks, and garage aprons', p: `Salt-stained driveways and dark front walks shrink perceived home size in photos. Hot-water concrete cleaning delivers one of the fastest ROI boosts in ${c.region}.` },
        { h: 'Windows, decks, and outdoor living', p: `Clear glass and stain-ready decks signal maintenance pride — especially on lakefront and wooded ${c.name} properties where buyers expect outdoor lifestyle.` },
      ],
      pullquote: `In ${c.name}, the best interior staging in the world cannot overcome a dirty exterior in listing photos.`,
      ctaHead: `Listing in <span class="gold">${c.name}</span> soon?`,
      ctaBody: `Bundle soft washing, windows, and concrete for show-ready curb appeal across ${c.region}.`,
    }),
  },
  {
    id: 'lakefront-exterior-care',
    tag: 'Lakefront Care',
    file: slug => `blog-lakefront-exterior-care-${slug}.html`,
    image: 'images/duluth-lift-bridge.jpg',
    imageAlt: c => `Lakefront property exterior maintenance near ${c.name}, ${c.state} — docks, siding, and waterfront cleaning`,
    primary: slug => `deck-restoration-${slug}.html`,
    cta: c => `Get My ${c.name} Lakefront Cleaning Quote`,
    title: c => `Lakefront Exterior Care in ${c.name}, ${c.state}: Docks, Decks & Siding Near the Water`,
    meta: c => `Lakefront exterior cleaning in ${c.name}, ${c.state}. Soft-wash docks, decks, siding, and glass exposed to lake spray and humidity. Free quote.`,
    eyebrow: c => `${c.name} · Lakefront`,
    related: slug => [
      ['Deck Restoration', `deck-restoration-${slug}.html`, 'Wood-safe dock and deck care.'],
      ['Soft Washing', `soft-washing-${slug}.html`, 'Siding and soffits near the shore.'],
      ['Window Cleaning', `window-cleaning-${slug}.html`, 'Hard-water and lake spray on glass.'],
    ],
    content: c => ({
      lead: `Properties near ${c.name}'s lakes and rivers face a tougher maintenance cycle — constant humidity, wind-driven spray, sand tracking, and organic growth that inland homes never see. Lakefront exteriors need a coordinated plan, not spot cleaning.`,
      takeaways: [
        'Lake spray accelerates algae on siding, docks, and rails facing the water.',
        'Soft-wash wood restoration preps docks and decks for stain without splintering.',
        'Hard-water and mineral film on lake-facing windows needs professional technique.',
        'Spring and fall maintenance prevents slippery green growth on wet boards.',
      ],
      sections: [
        { h: `What lake exposure does to <span class="ice">${c.name} exteriors</span>`, p: `Moisture lingers on lake-facing walls and decking. Sand and pollen stick to damp surfaces. Within one season, green algae and gray weathering appear faster than on sheltered suburban homes in ${c.region}.` },
        { h: `Dock and deck <span class="gold">restoration</span>`, p: `Slippery dock boards are a liability. Wood-safe soft washing removes algae and mildew without the furring and splintering that pressure blasting causes on cedar and treated pine.` },
        { h: 'Siding and soffits on waterfront homes', p: `Homes along ${c.region} shorelines often show heavy staining on lake-facing elevations. Soft washing treats organic growth and salt film while protecting finishes.` },
        { h: 'Glass with hard-water and spray film', p: `Lake-facing windows collect mineral spotting and persistent haze. Pure-water and squeegee methods restore views without scratching glass.` },
      ],
      pullquote: `Lakefront living in ${c.name} is worth it — but only if your dock, deck, and siding can handle the moisture.`,
      ctaHead: `Waterfront property in <span class="gold">${c.name}</span>?`,
      ctaBody: `Coordinated dock, deck, siding, and window care for ${c.region} lake homes.`,
    }),
  },
  {
    id: 'composite-deck-cleaning',
    tag: 'Composite Decks',
    file: slug => `blog-composite-deck-cleaning-${slug}.html`,
    image: 'images/deck-process-after.jpg',
    imageAlt: c => `After composite and wood deck cleaning in ${c.name}, ${c.state} — bright restored outdoor boards`,
    primary: slug => `deck-restoration-${slug}.html`,
    cta: c => `Get My ${c.name} Deck Cleaning Quote`,
    title: c => `Composite Deck Cleaning in ${c.name}, ${c.state}: Safe Methods That Won't Void Warranties`,
    meta: c => `Composite deck cleaning in ${c.name}, ${c.state}. Remove mold, pollen, and slippery growth without damaging Trex-style boards. Soft-wash safe. Free quote.`,
    eyebrow: c => `${c.name} · Composite Decks`,
    related: slug => [
      ['Deck & Fence Guide', `blog-deck-fence-restoration-${slug}.html`, 'Wood restoration before stain.'],
      ['Soft Washing', `soft-washing-${slug}.html`, 'Home exterior packages.'],
      ['Concrete Washing', `concrete-washing-${slug}.html`, 'Patios beside composite decks.'],
    ],
    content: c => ({
      lead: `Composite decking is popular across ${c.name} because it resists rot — but it still collects mold, pollen, and slippery green film in ${c.region}'s damp seasons. Clean it wrong and you can void manufacturer warranties or leave permanent scuff marks.`,
      takeaways: [
        'Never use pressure over 1,500 PSI on composite boards — soft wash instead.',
        'Mold on composite is surface-level but creates dangerous slick spots.',
        'Manufacturer guidelines favor low-pressure cleaning with approved solutions.',
        'Bundle adjacent concrete patios for a full outdoor reset.',
      ],
      sections: [
        { h: `Why composite still gets <span class="ice">slippery</span> in ${c.name}`, p: `Pollen, leaf tannins, and mildew form a biofilm on textured composite surfaces. ${c.possessive} wet springs keep boards damp for weeks — perfect for slick organic growth underfoot.` },
        { h: `Pressure washing mistakes that <span class="gold">void warranties</span>`, p: `High pressure opens the cap layer on composite boards, causing fuzzing and permanent damage. Soft washing lifts growth without abrasive force.` },
        { h: 'Wood decks need different chemistry', p: `If your ${c.name} property mixes cedar rails with composite field boards, each material needs adjusted technique — one reason professional crews save money long-term.` },
        { h: 'Prep before stain on wood sections', p: `Many ${c.region} decks combine materials. We restore wood sections for stain while safely brightening composite in the same visit.` },
      ],
      pullquote: `Composite decks in ${c.name} need gentle professional cleaning — not the same pressure you'd use on concrete.`,
      ctaHead: `Slippery composite deck in <span class="gold">${c.name}</span>?`,
      ctaBody: `Warranty-safe composite and wood deck cleaning across ${c.region}.`,
    }),
  },
  {
    id: 'seasonal-maintenance-guide',
    tag: 'Seasonal Guide',
    file: slug => `blog-seasonal-maintenance-guide-${slug}.html`,
    image: 'images/ba/hero-before.jpg',
    imageAlt: c => `Seasonal exterior maintenance planning for a home in ${c.name}, ${c.state}`,
    primary: slug => `soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Maintenance Quote`,
    title: c => `Seasonal Exterior Maintenance Guide for ${c.name}, ${c.state} Homeowners`,
    meta: c => `Year-round exterior maintenance calendar for ${c.name}, ${c.state}. When to soft wash, clean concrete, restore decks, and wash windows in ${c.region}. Free quote.`,
    eyebrow: c => `${c.name} · Seasonal Guide`,
    related: slug => [
      ['Salt Stain Removal', `blog-salt-stain-removal-${slug}.html`, 'Post-winter cleanup.'],
      ['Pollen Cleanup', `blog-pollen-spring-cleanup-${slug}.html`, 'Spring siding refresh.'],
      ['Soft Washing Guide', `blog-soft-washing-guide-${slug}.html`, 'Deep dive on soft washing.'],
    ],
    content: c => ({
      lead: `${c.stateFull} seasons hit ${c.name} exteriors hard — salt in winter, pollen in spring, algae in summer, and leaf tannins in fall. A simple seasonal plan keeps siding, concrete, decks, and glass looking sharp year-round without emergency callouts.`,
      takeaways: [
        'Spring: salt removal, pollen wash, and deck inspection after freeze-up.',
        'Summer: algae treatment on north-facing siding and roof touch-ups.',
        'Fall: leaf stain prevention on concrete and gutter brightening.',
        'Winter: plan ahead — book spring slots early across ${c.region}.',
      ],
      sections: [
        { h: `<span class="ice">Spring</span> — post-winter reset`, p: `As snow melts in ${c.name}, remove road salt from driveways and garage aprons with hot-water cleaning. Soft wash lower siding splash zones and clear pollen before it bakes onto glass.` },
        { h: `<span class="gold">Summer</span> — growth control`, p: `Peak humidity fuels algae on siding and roofs. Schedule soft washing on shaded elevations and address slippery deck boards before peak outdoor season.` },
        { h: 'Fall — protect before freeze', p: `Clean gutters and fascia, wash leaf tannins off concrete, and restore decks if you plan to stain before ${c.region} winter.` },
        { h: 'Winter — plan and prioritize', p: `Use the off-season to schedule ${c.name} spring packages. High-demand weeks fill quickly after first thaw.` },
      ],
      pullquote: `A seasonal plan for your ${c.name} home beats reactive cleaning every time — and costs less over five years.`,
      ctaHead: `Build your ${c.name} maintenance plan?`,
      ctaBody: `Custom seasonal packages for siding, concrete, decks, and windows across ${c.region}.`,
    }),
  },
  {
    id: 'pollen-spring-cleanup',
    tag: 'Spring Cleanup',
    file: slug => `blog-pollen-spring-cleanup-${slug}.html`,
    image: 'images/soft-after.jpg',
    imageAlt: c => `After spring pollen cleanup and soft washing on a home in ${c.name}, ${c.state}`,
    primary: slug => `soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Spring Cleanup Quote`,
    title: c => `Spring Pollen Cleanup in ${c.name}, ${c.state}: Siding, Windows & Concrete`,
    meta: c => `Spring pollen cleanup in ${c.name}, ${c.state}. Remove yellow pollen film from siding, windows, and walks with professional soft washing. Free quote.`,
    eyebrow: c => `${c.name} · Spring Cleanup`,
    related: slug => [
      ['Window Cleaning', `window-cleaning-${slug}.html`, 'Clear pollen off glass.'],
      ['Seasonal Guide', `blog-seasonal-maintenance-guide-${slug}.html`, 'Full year calendar.'],
      ['Salt Stain Removal', `blog-salt-stain-removal-${slug}.html`, 'Finish winter cleanup first.'],
    ],
    content: c => ({
      lead: `Every spring, ${c.name} turns yellow — pine pollen, bud dust, and tree debris coat siding, windows, and front walks across ${c.region}. If you wait until summer, that film bonds with heat and becomes much harder to remove.`,
      takeaways: [
        'Pollen feeds algae when it mixes with spring moisture on siding.',
        'Windows look hazy within days — professional cleaning restores clarity fast.',
        'Concrete walks turn green-yellow when pollen compacts with foot traffic.',
        'Early spring soft washing prevents a second cleanup in mid-summer.',
      ],
      sections: [
        { h: `Why ${c.name} pollen is <span class="ice">different</span>`, p: `${c.region} has dense conifer and hardwood cover. Long pollen seasons and lake humidity keep surfaces sticky for weeks — not just a few dry days like inland climates.` },
        { h: `Siding that looks <span class="gold">dull overnight</span>`, p: `Vinyl and painted wood collect a fine yellow film that holds moisture. That combination jump-starts mildew on north-facing walls in ${c.name}.` },
        { h: 'Windows and screens', p: `Pollen between screen mesh and glass creates persistent haze. Exterior window cleaning after peak pollen removes the layer before hard-water spots form.` },
        { h: 'Bundle with salt removal', p: `Many ${c.name} homeowners combine post-winter salt cleaning on concrete with a full exterior pollen wash — one visit, full reset.` },
      ],
      pullquote: `Do not wait until July — spring pollen in ${c.name} only gets harder to remove as temperatures rise.`,
      ctaHead: `Yellow pollen coating in <span class="gold">${c.name}</span>?`,
      ctaBody: `Spring soft washing and window cleaning packages across ${c.region}.`,
    }),
  },
  {
    id: 'rust-stain-removal',
    tag: 'Rust & Stains',
    file: slug => `blog-rust-stain-removal-${slug}.html`,
    image: 'images/concrete-before.jpg',
    imageAlt: c => `Rust and fertilizer stains on concrete in ${c.name}, ${c.state} before professional removal`,
    primary: slug => `concrete-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Stain Removal Quote`,
    title: c => `Rust Stain Removal in ${c.name}, ${c.state}: Concrete, Walks & Driveways`,
    meta: c => `Rust and fertilizer stain removal on concrete in ${c.name}, ${c.state}. Hot-water pressure washing and targeted treatment for driveways and walks. Free quote.`,
    eyebrow: c => `${c.name} · Rust & Stains`,
    related: slug => [
      ['Concrete Cleaning', `blog-concrete-driveway-cleaning-${slug}.html`, 'Full driveway restoration.'],
      ['Parking Lot Cleaning', `blog-parking-lot-cleaning-${slug}.html`, 'Commercial flatwork care.'],
      ['Salt Stain Removal', `blog-salt-stain-removal-${slug}.html`, 'Post-winter concrete care.'],
    ],
    content: c => ({
      lead: `Orange rust streaks and fertilizer spots on ${c.name} driveways are stubborn — and they get worse every season they sit. ${c.region}'s freeze-thaw cycles push stains deeper into porous concrete until standard rinsing will not touch them.`,
      takeaways: [
        'Rust from well water, rebar, and metal furniture leaves orange streaks on concrete.',
        'Fertilizer iron pellets cause distinct orange spots on front walks.',
        'Hot-water cleaning plus targeted treatment lifts stains cold rinsing spreads.',
        'Early treatment prevents permanent discoloration on ${c.name} flatwork.',
      ],
      sections: [
        { h: `Common rust sources in <span class="ice">${c.name}</span>`, p: `Irrigation well water, metal patio furniture, battery drips in garages, and rebar bleed-through on older slabs all leave rust on ${c.region} concrete. Each source needs slightly different approach.` },
        { h: `Fertilizer stains on <span class="gold">front walks</span>`, p: `Iron-rich lawn fertilizer pellets left on concrete dissolve into bright orange spots — especially visible on light broom-finish walks common in ${c.name} subdivisions.` },
        { h: 'Hot water makes the difference', p: `Heated water emulsifies oily residues and opens pores so treatment reaches embedded rust. Surface cleaners keep results even across large driveways.` },
        { h: 'When to call a pro', p: `DIY acid treatments risk etching concrete and harming adjacent landscaping. Professional crews test, treat, and rinse safely on ${c.region} properties.` },
      ],
      pullquote: `Rust stains on ${c.name} concrete rarely disappear on their own — but they do not have to be permanent.`,
      ctaHead: `Rust or fertilizer stains in <span class="gold">${c.name}</span>?`,
      ctaBody: `Hot-water concrete cleaning and stain treatment across ${c.region}.`,
    }),
  },
  {
    id: 'hoa-property-maintenance',
    tag: 'HOA & Property Mgmt',
    file: slug => `blog-hoa-property-maintenance-${slug}.html`,
    image: 'images/commercial-before.jpg',
    imageAlt: c => `Multi-property exterior maintenance for HOAs and property managers in ${c.name}, ${c.state}`,
    primary: slug => `commercial-soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Commercial Quote`,
    title: c => `HOA & Property Manager Exterior Maintenance in ${c.name}, ${c.state}`,
    meta: c => `HOA and property manager exterior cleaning in ${c.name}, ${c.state}. Scheduled soft washing, lots, and building care for multi-unit portfolios. Insured. Free quote.`,
    eyebrow: c => `${c.name} · HOA & Property Mgmt`,
    related: slug => [
      ['Commercial Building Cleaning', `blog-commercial-building-cleaning-${slug}.html`, 'Facade and storefront care.'],
      ['Parking Lot Cleaning', `blog-parking-lot-cleaning-${slug}.html`, 'Lot and pad maintenance.'],
      ['Seasonal Guide', `blog-seasonal-maintenance-guide-${slug}.html`, 'Annual maintenance calendar.'],
    ],
    content: c => ({
      lead: `Property managers and HOA boards across ${c.name} juggle dozens of buildings — and exterior appearance drives tenant retention, assessment values, and complaint volume. A scheduled soft-wash and flatwork program keeps ${c.region} portfolios consistent without last-minute emergency pricing.`,
      takeaways: [
        'Multi-building scheduling reduces per-site setup costs.',
        'Documented maintenance supports reserve planning and board reporting.',
        'Insured crews with commercial hot-water capability for lots and pads.',
        'After-hours options for retail and medical tenants in ${c.name}.',
      ],
      sections: [
        { h: `What ${c.name} boards notice <span class="ice">first</span>`, p: `Black streaks on gutters, green algae on townhome siding, stained entry walks, and faded storefront glass generate the most resident complaints across ${c.region} associations.` },
        { h: `Scheduled vs. reactive <span class="gold">maintenance</span>`, p: `Annual or semi-annual soft washing costs less than emergency callouts after years of neglect — and keeps property values stable for ${c.name} unit owners.` },
        { h: 'Common area concrete and entries', p: `Sidewalks, parking areas, and pool decks benefit from hot-water cleaning on a spring/fall rhythm — especially after ${c.region} winters.` },
        { h: 'Vendor consistency matters', p: `One trusted partner for soft washing, window cleaning, and lot work simplifies billing, insurance certificates, and quality control for ${c.name} managers.` },
      ],
      pullquote: `HOA curb appeal in ${c.name} is a retention strategy — not just a line item.`,
      ctaHead: `Managing properties in <span class="gold">${c.name}</span>?`,
      ctaBody: `Multi-site exterior maintenance plans for ${c.region} HOAs and property managers.`,
    }),
  },
  {
    id: 'brick-stone-cleaning',
    tag: 'Brick & Stone',
    file: slug => `blog-brick-stone-cleaning-${slug}.html`,
    image: 'images/ba/stucco-after.jpg',
    imageAlt: c => `After soft washing on brick and masonry exterior in ${c.name}, ${c.state}`,
    primary: slug => `soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Masonry Cleaning Quote`,
    title: c => `Brick & Stone Cleaning in ${c.name}, ${c.state}: Soft Wash for Masonry Facades`,
    meta: c => `Brick and stone cleaning in ${c.name}, ${c.state}. Remove algae, efflorescence, and grime from masonry without damage. Professional soft washing. Free quote.`,
    eyebrow: c => `${c.name} · Brick & Stone`,
    related: slug => [
      ['Commercial Cleaning', `commercial-soft-washing-${slug}.html`, 'Building facades.'],
      ['Oxidation Removal', `blog-oxidation-removal-${slug}.html`, 'Chalky siding and trim.'],
      ['Algae & Mold', `blog-algae-mold-siding-${slug}.html`, 'Organic growth on walls.'],
    ],
    content: c => ({
      lead: `Brick, block, and stone exteriors on ${c.name} homes and commercial buildings collect algae, efflorescence, and ${c.region} road dust — but masonry cannot tolerate the same pressure you'd use on concrete. Soft washing is the safe standard for lasting results.`,
      takeaways: [
        'High pressure erodes mortar joints and forces water into porous masonry.',
        'Soft washing treats biological growth without blasting away joint sand.',
        'Efflorescence and white mineral deposits need proper chemistry, not brute force.',
        'Historic and commercial facades across ${c.name} benefit from low-pressure methods.',
      ],
      sections: [
        { h: `Why masonry stains differently in <span class="ice">${c.name}</span>`, p: `Porous brick wicks moisture through ${c.region} freeze-thaw cycles. Algae roots in rough surfaces while salt and minerals leave white efflorescence bands near grade.` },
        { h: `Soft wash for <span class="gold">mortar-safe</span> results`, p: `Professional crews dial pressure down and use surfactant blends that dwell on vertical masonry long enough to work — then rinse gently from top to bottom.` },
        { h: 'Commercial block and mixed facades', p: `${c.name} retail and industrial buildings often combine brick, EIFS, and metal panels. Each zone needs adjusted technique in one coordinated visit.` },
        { h: 'Pair with concrete entries', p: `Matching clean masonry with bright entry walks and dumpster pads gives ${c.region} properties a cohesive professional look.` },
      ],
      pullquote: `Brick and stone in ${c.name} deserve soft washing — not the pressure you'd use on a driveway.`,
      ctaHead: `Stained masonry in <span class="gold">${c.name}</span>?`,
      ctaBody: `Mortar-safe brick and stone cleaning across ${c.region}.`,
    }),
  },
  {
    id: 'restaurant-grease-cleaning',
    tag: 'Restaurant & Grease',
    file: slug => `blog-restaurant-grease-cleaning-${slug}.html`,
    image: 'images/commercial-after.jpg',
    imageAlt: c => `After commercial grease and flatwork cleaning at a restaurant in ${c.name}, ${c.state}`,
    primary: slug => `commercial-soft-washing-${slug}.html`,
    cta: c => `Get My ${c.name} Restaurant Cleaning Quote`,
    title: c => `Restaurant Grease & Flatwork Cleaning in ${c.name}, ${c.state}`,
    meta: c => `Restaurant grease cleaning in ${c.name}, ${c.state}. Hot-water pressure washing for dumpster pads, entries, and drive-through lanes. Health-code ready. Free quote.`,
    eyebrow: c => `${c.name} · Restaurant & Grease`,
    related: slug => [
      ['Parking Lot Cleaning', `blog-parking-lot-cleaning-${slug}.html`, 'Lot and pad degreasing.'],
      ['Commercial Building Cleaning', `blog-commercial-building-cleaning-${slug}.html`, 'Storefront facades.'],
      ['HOA Maintenance', `blog-hoa-property-maintenance-${slug}.html`, 'Multi-site scheduling.'],
    ],
    content: c => ({
      lead: `Restaurants, bars, and food-service sites in ${c.name} face grease buildup that cold water cannot touch — dumpster pads, drive-through lanes, and rear entries become slip hazards and inspection flags. Hot-water commercial cleaning is the standard ${c.region} operators rely on.`,
      takeaways: [
        'Hot water emulsifies cooking grease that cold pressure spreads.',
        'Dumpster pads and grease traps areas need scheduled degreasing.',
        'After-hours service limits disruption to ${c.name} dining rooms.',
        'Clean entries and sidewalks improve customer perception immediately.',
      ],
      sections: [
        { h: `Where grease concentrates in <span class="ice">${c.name}</span>`, p: `Kitchen exhaust runoff, fryer oil drips, and delivery traffic compact grease into porous concrete behind ${c.region} restaurants. Slopes and drains clog faster when film builds.` },
        { h: `Hot water for <span class="gold">health-code readiness</span>`, p: `Inspectors notice pads, rear doors, and drive-through lanes first. Scheduled hot-water cleaning keeps surfaces defensible and staff safe.` },
        { h: 'Storefront and awning care', p: `Grease aerosolizes onto stucco, brick, and signage near kitchen vents. Soft washing facades pairs well with flatwork degreasing on ${c.name} commercial sites.` },
        { h: 'Recurring maintenance plans', p: `Monthly or quarterly pad cleaning costs less than slip-and-fall liability and emergency weekend callouts across ${c.region}.` },
      ],
      pullquote: `A clean dumpster pad in ${c.name} is not optional for food-service operators — it is risk management.`,
      ctaHead: `Grease buildup at your ${c.name} site?`,
      ctaBody: `Hot-water degreasing and commercial soft washing for ${c.region} restaurants and food service.`,
    }),
  },
];

function blogHtml(city, topic, body) {
  const filename = topic.file(city.slug);
  const url = `${DOMAIN}/${filename}`;
  const hub = city.hubFile;
  const related = topic.related(city.slug).map(([t, h, d]) =>
    `<a class="rc" href="${h}"><div class="t">${t}</div><div class="d">${d}</div><div class="go">View →</div></a>`
  ).join('\n      ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${topic.title(city)} | ${BRAND}</title>
<meta name="description" content="${topic.meta(city).replace(/"/g, '&quot;')}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="geo.region" content="US-${city.state}">
<meta name="geo.placename" content="${city.name}, ${city.stateFull}">
<meta property="og:type" content="article">
<meta property="og:title" content="${topic.title(city).replace(/"/g, '&quot;')}">
<meta property="og:description" content="${topic.meta(city).replace(/"/g, '&quot;')}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${DOMAIN}/${topic.image}">
<meta property="og:image:alt" content="${topic.imageAlt(city).replace(/"/g, '&quot;')}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,400..700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--navy-900:#0c1824;--navy-800:#10212f;--ice:#7fc6e8;--gold:#e3b53e;--gold-deep:#caa033;--text:#e9f1f6;--text-dim:#b3c4cf;--line:rgba(150,190,215,.18);--glass:rgba(255,255,255,.045);--glass-line:rgba(160,200,225,.16)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:var(--navy-900);color:var(--text);line-height:1.7;-webkit-font-smoothing:antialiased}
.atmosphere{position:fixed;inset:0;z-index:-2;background:radial-gradient(120% 80% at 80% -10%,#1c4259 0%,transparent 55%),radial-gradient(100% 70% at 10% 0%,#15303f 0%,transparent 50%),linear-gradient(180deg,#0e1d2a 0%,#0c1824 40%,#0b1622 100%)}
.wrap{max-width:760px;margin:0 auto;padding:0 22px}
h1,h2,h3{font-family:'Fraunces',serif;font-weight:600;line-height:1.1;letter-spacing:-.01em}
.gold{color:var(--gold)}.ice{color:var(--ice)}
header.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);background:rgba(11,22,34,.72);border-bottom:1px solid var(--line)}
.nav-in{max-width:1180px;margin:0 auto;padding:0 22px;display:flex;align-items:center;justify-content:space-between;height:70px}
.brand{display:flex;align-items:center;gap:11px;font-family:'Fraunces',serif;font-weight:600;font-size:1.18rem;color:#fff;text-decoration:none}
.brand .mark{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(140deg,#1d3a4d,#102330);border:1px solid var(--glass-line)}
.brand small{display:block;font-family:'Outfit';font-weight:400;font-size:.6rem;letter-spacing:.28em;color:var(--ice);text-transform:uppercase;margin-top:1px}
.nav-cta{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#1a1305;padding:11px 22px;border-radius:40px;font-weight:700;font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;text-decoration:none}
article{padding:54px 0 40px}
.crumb{font-size:.82rem;color:var(--text-dim);margin-bottom:22px}.crumb a{color:var(--ice);text-decoration:none}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ice);font-weight:600;margin-bottom:18px;border:1px solid var(--glass-line);background:var(--glass);padding:7px 15px;border-radius:40px}
.eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--ice);box-shadow:0 0 12px var(--ice)}
article h1{font-size:clamp(2rem,5.5vw,3.1rem);margin-bottom:18px}
.meta{font-size:.86rem;color:var(--text-dim);margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid var(--line)}
article p{margin-bottom:20px;font-size:1.07rem;color:#dde7ed}
article h2{font-size:1.7rem;margin:42px 0 16px}
.lead{font-size:1.18rem;color:var(--text);line-height:1.65}
.feat{margin:28px 0 34px;border-radius:16px;overflow:hidden;border:1px solid var(--glass-line)}
.feat img{width:100%;height:auto;display:block;aspect-ratio:16/9;object-fit:cover}
.feat figcaption{font-size:.82rem;color:var(--text-dim);padding:12px 16px;background:var(--glass)}
.takeaways{background:var(--glass);border:1px solid var(--glass-line);border-left:3px solid var(--gold);border-radius:14px;padding:24px 26px;margin:30px 0}
.takeaways h3{font-size:.82rem;color:var(--gold);letter-spacing:.02em;margin-bottom:14px;font-family:'Outfit';font-weight:700;text-transform:uppercase}
.takeaways ul{list-style:none;display:flex;flex-direction:column;gap:11px}
.takeaways li{display:flex;gap:12px;font-size:.99rem;color:var(--text-dim)}
.takeaways li .ck{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:rgba(127,198,232,.14);border:1px solid var(--ice);display:grid;place-items:center;margin-top:2px}
.takeaways li .ck svg{width:12px;height:12px;stroke:var(--ice)}
.pullquote{font-family:'Fraunces',serif;font-style:italic;font-size:1.35rem;line-height:1.5;color:#fff;border-left:3px solid var(--ice);padding:6px 0 6px 24px;margin:32px 0}
.cta-block{background:linear-gradient(140deg,rgba(127,198,232,.08),rgba(227,181,62,.06));border:1px solid var(--glass-line);border-radius:20px;padding:34px 30px;margin:44px 0 10px;text-align:center}
.cta-block h3{font-size:1.5rem;margin-bottom:10px}
.cta-block p{font-size:1rem;color:var(--text-dim);margin-bottom:22px;max-width:480px;margin-left:auto;margin-right:auto}
.btn-gold{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#1a1305;padding:15px 30px;border-radius:46px;font-weight:700;font-size:.94rem;text-decoration:none;box-shadow:0 10px 30px rgba(227,181,62,.3)}
.btn-ghost{display:inline-flex;margin-top:12px;color:var(--ice);text-decoration:none;font-weight:600}
.related{margin:38px 0}.related h3{font-size:.82rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ice);font-family:'Outfit';font-weight:700;margin-bottom:16px}
.related-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.rc{display:block;background:var(--glass);border:1px solid var(--glass-line);border-radius:14px;padding:20px 18px;text-decoration:none;transition:border-color .25s,transform .25s}
.rc:hover{border-color:var(--ice);transform:translateY(-3px)}
.rc .t{font-family:'Fraunces',serif;font-size:1.08rem;color:#fff;margin-bottom:6px}
.rc .d{font-size:.84rem;color:var(--text-dim)}.rc .go{font-size:.8rem;color:var(--ice);margin-top:10px;font-weight:600}
footer{border-top:1px solid var(--line);padding:40px 0;margin-top:30px;text-align:center;color:var(--text-dim);font-size:.86rem}footer a{color:var(--ice);text-decoration:none}
@media(max-width:620px){.related-cards{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="atmosphere"></div>
<header class="nav"><div class="nav-in">
  <a href="${hub}" class="brand"><span class="mark"><svg viewBox="0 0 24 24" fill="none" width="21" height="21"><path d="M12 2L4 9v11h5v-6h6v6h5V9z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></span><span>Up North<small>Pressure Washing</small></span></a>
  <a href="#quote-cta" class="nav-cta">Free Quote</a>
</div></header>
<main id="main">
<article class="wrap">
  <div class="crumb"><a href="${hub}">Home</a> › <a href="blog-index.html">Learning Center</a> › ${city.name}</div>
  <span class="eyebrow"><span class="dot"></span>${topic.eyebrow(city)}</span>
  <h1>${topic.title(city)}</h1>
  <div class="meta">By ${BRAND} · ${topic.tag} · ${city.name}, ${city.state} · Updated May 2026</div>
  <figure class="feat">
    <img src="${topic.image}" alt="${topic.imageAlt(city).replace(/"/g, '&quot;')}" width="1200" height="675" loading="eager" decoding="async" fetchpriority="high">
    <figcaption>${topic.imageAlt(city)}</figcaption>
  </figure>
  <p class="lead">${body.lead}</p>
  <div class="takeaways"><h3>Quick Takeaways</h3><ul>
    ${body.takeaways.map(t => `<li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>${t}</span></li>`).join('\n    ')}
  </ul></div>
  ${body.sections.map(s => `<h2>${s.h}</h2><p>${s.p}</p>`).join('\n  ')}
  <div class="pullquote">${body.pullquote}</div>
  <div class="related">
    <h3>Related Services in ${city.name}</h3>
    <div class="related-cards">${related}</div>
  </div>
  <div class="cta-block" id="quote-cta">
    <h3>${body.ctaHead}</h3>
    <p>${body.ctaBody}</p>
    <a href="${topic.primary(city.slug)}#quote" class="btn-gold">${topic.cta(city)} →</a>
    <br><a href="tel:+12185768610" class="btn-ghost">Or call ${PHONE}</a>
  </div>
</article>
</main>
<footer class="wrap">© 2026 ${BRAND} · ${city.name}, ${city.state} · <a href="blog-index.html">Learning Center</a> · <a href="${hub}">${city.name} Home</a></footer>
</body>
</html>`;
}

// Generate blogs
let created = 0;
const indexCards = [];

for (const topic of TOPICS) {
  indexCards.push({ section: topic.tag, cards: [] });
  const section = indexCards[indexCards.length - 1];
  for (const city of CITIES) {
    const body = topic.content(city);
    const filename = topic.file(city.slug);
    fs.writeFileSync(path.join(SITE, filename), blogHtml(city, topic, body));
    created++;
    section.cards.push({ filename, tag: topic.tag, title: topic.title(city), excerpt: topic.meta(city).slice(0, 120) + '…' });
  }
}

// Fix existing home-value blog crumbs
for (const city of CITIES) {
  const f = `blog-soft-washing-home-value-${city.slug}.html`;
  const fp = path.join(SITE, f);
  if (!fs.existsSync(fp)) continue;
  let h = fs.readFileSync(fp, 'utf8');
  h = h.replace(/href="blog"/g, 'href="blog-index.html"');
  h = h.replace(/<div class="crumb"><a href="index\.html">Home<\/a> › <a href="blog">Learning Center<\/a>/,
    `<div class="crumb"><a href="${city.hubFile}">Home</a> › <a href="blog-index.html">Learning Center</a>`);
  if (!h.includes('class="feat"')) {
    h = h.replace('<p class="lead">',
      `<figure class="feat"><img src="images/house-wash-after.jpg" alt="Soft washing curb appeal boost for a home in ${city.name}, ${city.state}" width="1200" height="675" loading="eager" decoding="async"><figcaption>Professional soft washing improves curb appeal before listing in ${city.name}.</figcaption></figure>\n  <p class="lead">`);
    if (!h.includes('.feat img')) {
      h = h.replace('.lead{font-size', '.feat{margin:28px 0 34px;border-radius:16px;overflow:hidden;border:1px solid var(--glass-line)}.feat img{width:100%;height:auto;display:block;aspect-ratio:16/9;object-fit:cover}.feat figcaption{font-size:.82rem;color:var(--text-dim);padding:12px 16px;background:var(--glass)}.lead{font-size');
    }
  }
  fs.writeFileSync(fp, h);
  indexCards[0]?.cards.unshift({
    filename: f,
    tag: 'Home Value',
    title: `Why a Soft Wash Adds Value Before Selling Your ${city.name} Home`,
    excerpt: `How soft washing lifts curb appeal in ${city.name} before you list.`,
  });
}

// Rebuild blog-index.html
const homeValueCards = CITIES.map(c => {
  const st = c.state === 'WI' ? `, ${c.state}` : '';
  return `<a class="post-card" href="blog-soft-washing-home-value-${c.slug}.html"><span class="tag">Home Value</span><h3>Why a Soft Wash Adds Value Before Selling Your ${c.name}${st} Home</h3><p>Curb appeal, siding protection, and listing photos for ${c.name} sellers.</p><span class="go">Read article →</span></a>`;
}).join('\n    ');

const topicSections = TOPICS.map(topic => {
  const cards = CITIES.map(c => {
    const st = c.state === 'WI' ? `, ${c.state}` : '';
    const shortTitle = topic.title(c).replace(` | ${BRAND}`, '').replace(`${c.name}, ${c.state}: `, '').replace(`${c.name}, ${c.state} `, '');
    return `<a class="post-card" href="${topic.file(c.slug)}"><span class="tag">${topic.tag}</span><h3>${shortTitle} — ${c.name}${st}</h3><p>${topic.meta(c).slice(0, 100)}…</p><span class="go">Read article →</span></a>`;
  }).join('\n    ');
  return `  <div class="section-label">${topic.tag} — By City</div>\n  <div class="grid">\n    ${cards}\n  </div>`;
}).join('\n');

const blogIndex = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Learning Center | Exterior Cleaning Guides | ${BRAND}</title>
<meta name="description" content="Local guides on soft washing, window cleaning, deck restoration, parking lots, oxidation removal, lakefront care, HOA maintenance, and more across Duluth, the North Shore, Iron Range, and northern Wisconsin.">
<link rel="canonical" href="${DOMAIN}/blog-index.html">
<meta name="robots" content="index,follow">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--navy-900:#0c1824;--ice:#7fc6e8;--gold:#e3b53e;--gold-deep:#caa033;--text:#e9f1f6;--text-dim:#b3c4cf;--line:rgba(150,190,215,.18);--glass:rgba(255,255,255,.045);--glass-line:rgba(160,200,225,.16)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:var(--navy-900);color:var(--text);line-height:1.7}
.atmosphere{position:fixed;inset:0;z-index:-2;background:radial-gradient(120% 80% at 80% -10%,#1c4259 0,transparent 55%),linear-gradient(180deg,#0e1d2a,#0c1824)}
.wrap{max-width:1100px;margin:0 auto;padding:0 22px}
h1,h2{font-family:'Fraunces',serif;font-weight:600}.gold{color:var(--gold)}.ice{color:var(--ice)}
header.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);background:rgba(11,22,34,.72);border-bottom:1px solid var(--line)}
.nav-in{max-width:1180px;margin:0 auto;padding:0 22px;display:flex;align-items:center;justify-content:space-between;height:70px}
.brand{display:flex;align-items:center;gap:11px;font-family:'Fraunces',serif;font-weight:600;font-size:1.18rem;color:#fff;text-decoration:none}
.brand .mark{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(140deg,#1d3a4d,#102330);border:1px solid var(--glass-line)}
.brand small{display:block;font-family:'Outfit';font-size:.6rem;letter-spacing:.28em;color:var(--ice);text-transform:uppercase}
.nav-cta{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#1a1305;padding:11px 22px;border-radius:40px;font-weight:700;font-size:.85rem;text-decoration:none}
.hero{padding:64px 0 30px;text-align:center}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ice);font-weight:600;margin-bottom:20px;border:1px solid var(--glass-line);background:var(--glass);padding:7px 15px;border-radius:40px}
.hero h1{font-size:clamp(2.3rem,6vw,3.6rem)}
.hero p{color:var(--text-dim);max-width:680px;margin:18px auto 0;font-size:1.1rem}
.section-label{font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ice);font-weight:700;margin:40px 0 18px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding-bottom:20px}
.post-card{display:flex;flex-direction:column;background:var(--glass);border:1px solid var(--glass-line);border-radius:18px;padding:26px 24px;text-decoration:none;transition:border-color .25s,transform .25s}
.post-card:hover{border-color:var(--ice);transform:translateY(-4px)}
.post-card .tag{align-self:flex-start;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(227,181,62,.4);border-radius:30px;padding:4px 11px;margin-bottom:14px}
.post-card h3{font-size:1.05rem;color:#fff;margin-bottom:10px;line-height:1.25;font-family:'Fraunces',serif}
.post-card p{font-size:.92rem;color:var(--text-dim);flex:1}
.post-card .go{margin-top:16px;font-size:.85rem;color:var(--ice);font-weight:600}
footer{border-top:1px solid var(--line);padding:40px 0 60px;text-align:center;color:var(--text-dim);font-size:.86rem}footer a{color:var(--ice);text-decoration:none}
@media(max-width:860px){.grid{grid-template-columns:1fr 1fr}}
@media(max-width:580px){.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="atmosphere"></div>
<header class="nav"><div class="nav-in">
  <a href="index.html" class="brand"><span class="mark"><svg viewBox="0 0 24 24" fill="none" width="21" height="21"><path d="M12 2L4 9v11h5v-6h6v6h5V9z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></span><span>Up North<small>Pressure Washing</small></span></a>
  <a href="index.html#quote" class="nav-cta">Free Quote</a>
</div></header>
<section class="hero wrap">
  <span class="eyebrow"><span class="dot"></span>Learning Center</span>
  <h1>Local Guides on <span class="gold">Exterior Cleaning</span> &amp; <span class="ice">Curb Appeal</span></h1>
  <p>${created + CITIES.length}+ city-specific articles for homeowners and businesses across the Twin Ports, North Shore, Iron Range, and northern Wisconsin.</p>
</section>
<div class="wrap">
  <div class="section-label">Soft Washing &amp; Home Value — By City</div>
  <div class="grid">${homeValueCards}</div>
${topicSections}
</div>
<footer class="wrap">© 2026 ${BRAND} · <a href="index.html">Home</a> · <a href="tel:+12185768610">${PHONE}</a></footer>
</body>
</html>`;

fs.writeFileSync(path.join(SITE, 'blog-index.html'), blogIndex);

console.log(`Created ${created} new blog articles (${TOPICS.length} topics × ${CITIES.length} cities)`);
console.log(`Total blogs with home-value: ${created + CITIES.length}`);
console.log('Run: node build-city-links.mjs && node build-sitemap.mjs');
