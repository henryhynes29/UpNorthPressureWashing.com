/**
 * Elite, city-specific SEO copy — one unique voice per city × service.
 * Used by patch-elite-city-seo.mjs (idempotent sitewide patches).
 */

/** @typedef {{ intro: string, bullets: string[], close: string, builtFor?: string, guarantee?: string, resultsEyebrow?: string }} ChallengeBlock */

/** @type {Record<string, Record<string, ChallengeBlock & { blogSpotlight?: string }>>} */
export const CITY_ELITE = {
  duluth: {
    soft: {
      intro: 'Duluth sits on a Lake Superior hillside where fog, harbor wind, and north-shade lots keep siding damp most of the year. Green-black algae on vinyl near Lakeside, lichen on cedar in Piedmont Heights, and mold behind west-facing trim are routine — not a sign you are neglecting your home.',
      bullets: [
        '<b>Lake-effect moisture never fully dries.</b> Superior humidity feeds Gloeocapsa magma — the dark streaking algae you see on north slopes from Canal Park to Woodland.',
        '<b>Hillside shade blocks UV kill-off.</b> Duluth&apos;s tree canopy and orientation mean algae survives longer on walls that never see afternoon sun.',
        '<b>Road salt and sand embed in spring.</b> Freeze-thaw cycles along I-35 and local plow routes push grime into siding seams before pollen season even starts.',
        '<b>Pressure washing makes it worse.</b> High PSI strips paint, forces water behind LP SmartSide, and does not kill spores — algae returns within a season on Duluth homes.',
      ],
      close: 'Soft washing uses low pressure and biodegradable chemistry to kill algae at the root — the approach we use from West Duluth lakefront ranches to East Hillside two-stories. Results typically hold 12–24 months on maintained Duluth properties.',
      builtFor: 'Formulas tuned for Duluth&apos;s Lake Superior moisture, hillside shade, and long North Shore winters — not generic national templates.',
      guarantee: 'Every soft washing job we complete in Duluth is backed by a full one-year regrowth guarantee — built for hillside moisture, harbor salt, and the shade that defines North Shore living.',
      resultsEyebrow: 'Real Duluth Results',
    },
    concrete: {
      intro: 'Duluth driveways and alleys take punishment that cold-water rinsing cannot fix — plow sand embedded in hillside concrete, oil from tight garages, and salt tracked off I-35 and Superior Street all bond to flatwork through freeze-thaw cycles.',
      bullets: [
        '<b>Hot water breaks down road salt films.</b> Duluth winters leave chloride layers that cold pressure merely spreads across the slab.',
        '<b>Hillside runoff stains aprons.</b> Properties from Lakeside to Piedmont see rust-orange streaks where mineral-rich water sits on concrete.',
        '<b>Commercial pads need degreasing.</b> Canal Park alleys and West Duluth shop floors collect grease that requires heated water, not a garden hose.',
        '<b>Surface cleaner = even finish.</b> We use commercial flatwork tools so Duluth driveways come out uniform — no wand marks on steep approaches.',
      ],
      close: 'Hot-water concrete washing restores Duluth flatwork faster than cold rinses and holds up through the next salt season when scheduled in spring or fall.',
      builtFor: 'Hot-water systems sized for Duluth salt load, hillside runoff, and the heavy sand Minnesota plows leave behind.',
      resultsEyebrow: 'Real Duluth Concrete Results',
    },
    deck: {
      intro: 'Duluth decks face lake breeze, long snow load, and shade moisture that turns cedar and treated pine green within a single season — especially on properties with partial Lake Superior views.',
      bullets: [
        '<b>Algae makes boards slippery.</b> Lake humidity keeps deck surfaces damp on north-facing rails and shaded steps.',
        '<b>Gray oxidation hides before stain season.</b> Duluth homeowners who restain without soft washing lock mildew under new coat within a year.',
        '<b>Composite still needs chemistry.</b> Timbertech and Trex in Duluth collect pollen film and organic growth — low-pressure treatment is manufacturer-safe.',
        '<b>Fence lines match deck care.</b> We brighten perimeter fencing on the same visit so the whole outdoor space reads clean from the street.',
      ],
      close: 'Wood-safe soft washing clears algae and gray weathering without splintering boards — the right prep step before sealing for Duluth&apos;s short staining window.',
      builtFor: 'Deck restoration tuned for Duluth lake breeze, freeze-thaw wood movement, and North Shore pollen seasons.',
      resultsEyebrow: 'Real Duluth Deck Results',
    },
    window: {
      intro: 'Duluth glass battles harbor salt film, hard-water spotting from hillside wells, and pollen that bakes onto south-facing panes — streak-free work requires professional squeegee technique, not Windex and paper towels.',
      bullets: [
        '<b>Salt spray etches untreated glass.</b> Properties near the lake and harbor see mineral haze that DIY tools smear rather than remove.',
        '<b>Interior + exterior on one schedule.</b> Duluth homeowners often bundle both sides before listing or after winter tracking season.',
        '<b>Tracks and screens matter.</b> We wipe frames and sills — not just panes — so windows look finished from inside and out.',
        '<b>Multi-story lake homes.</b> Pure-water pole systems reach upper Duluth elevations without ladder streaks on siding below.',
      ],
      close: 'Professional window cleaning in Duluth removes what household tools leave behind — clearer views, sharper curb appeal, and glass that photographs well for listings.',
      builtFor: 'Streak-free methods built for Duluth harbor winds, hard-water minerals, and heavy spring pollen.',
      resultsEyebrow: 'Real Duluth Window Results',
    },
    commercial: {
      intro: 'Duluth businesses from Canal Park tourism corridors to West Duluth industrial pads need exteriors that survive salt, grease, and foot traffic — first impressions on the North Shore start at the sidewalk.',
      bullets: [
        '<b>Storefront glass and facades together.</b> We coordinate window and soft-wash packages so Tower Avenue and waterfront properties look uniformly sharp.',
        '<b>Dumpster pads and loading docks.</b> Hot-water degreasing handles what cold rinses leave slippery for staff and delivery drivers.',
        '<b>After-hours scheduling.</b> Duluth retail and medical sites often need cleaning before opening — we plan around your traffic.',
        '<b>COI and insured crews.</b> Property managers across St. Louis County get documentation with every commercial visit.',
      ],
      close: 'Commercial-grade soft washing and hot-water flatwork keep Duluth properties guest-ready and inspection-defensible year-round.',
      builtFor: 'Commercial crews equipped for Duluth salt seasons, harbor grease, and high-traffic concrete.',
      resultsEyebrow: 'Real Duluth Commercial Results',
    },
    blogSpotlight: 'Duluth homeowners deal with hillside shade, Lake Superior humidity, and some of the longest winters in the Lower 48 — exterior cleaning here is maintenance, not vanity. From Lakeside colonials to Piedmont vinyl, local conditions dictate when and how you clean.',
  },

  hermantown: {
    soft: {
      intro: 'Hermantown&apos;s shaded, tree-lined lots along the Miller Trunk corridor stay damp longer than open-sun properties — LP SmartSide, vinyl, and stucco all develop green-black streaking on north walls while south faces still look fine.',
      bullets: [
        '<b>Miller Trunk humidity lingers.</b> Subdivision lots with mature maples hold moisture against siding through Adolph and the City of Quality Living neighborhoods.',
        '<b>North-face algae is predictable.</b> Homes near the airport corridor and Highway 53 see Gloeocapsa streaks that pressure washing only scatters.',
        '<b>Vinyl safe, wood safer.</b> Hermantown&apos;s mix of newer builds and updated ranches needs low pressure — not the 4,000 PSI rigs some operators bring from out of town.',
        '<b>Pre-listing curb appeal.</b> Hermantown sellers near top-rated schools photograph dramatically better after a full soft wash before Zillow goes live.',
      ],
      close: 'Soft washing kills algae at the root on Hermantown homes — protecting finishes on the lots that made this one of St. Louis County&apos;s fastest-growing communities.',
      builtFor: 'Low-pressure chemistry tuned for Hermantown tree shade, Miller Trunk humidity, and Lake Superior-influenced pollen seasons.',
      guarantee: 'Every Hermantown soft wash is backed by our one-year regrowth guarantee — designed for shaded lots and the damp that lingers under mature canopy.',
      resultsEyebrow: 'Real Hermantown Results',
    },
    concrete: {
      intro: 'Hermantown driveways, RV pads, and triple garages collect road salt from Highway 53 and Miller Trunk plow routes — hot water is the difference between a bright apron and a streaky cold rinse.',
      bullets: [
        '<b>Salt bonds to newer concrete too.</b> Subdivision pours from the 2000s still hold chloride if not hot-washed each spring.',
        '<b>Oil from long commutes.</b> Garage aprons on acreage properties toward Adolph see drip stains that need heated degreasing.',
        '<b>Even surface-cleaner passes.</b> Wide Hermantown driveways come out uniform — critical for HOA neighborhoods and listing photos.',
        '<b>Bundle with house wash.</b> Many Hermantown homeowners schedule concrete and soft washing the same day — one crew, one visit.',
      ],
      close: 'Hot-water concrete washing restores Hermantown flatwork after winter sand and salt — before summer pollen and mower traffic add another layer.',
      builtFor: 'Hot-water flatwork cleaning for Hermantown salt, sand, and suburban garage oil stains.',
      resultsEyebrow: 'Real Hermantown Concrete Results',
    },
    deck: { intro: 'Hermantown decks sit under heavy canopy — algae and mildew turn boards green and slippery before summer cookouts even start.', bullets: ['<b>Shade-fed mildew.</b> North Hermantown lots need annual soft-wash maintenance, not just stain.', '<b>Composite deck care.</b> Modern decks still collect organic film under pines.', '<b>Rail and step safety.</b> Slippery algae on stairs is a liability before guests arrive.', '<b>Stain prep included.</b> We brighten wood safely before your contractor seals.'], close: 'Deck restoration in Hermantown extends stain life and keeps outdoor spaces safe under tree cover.', builtFor: 'Wood-safe soft washing for Hermantown canopy shade and Minnesota freeze-thaw cycles.', resultsEyebrow: 'Real Hermantown Deck Results' },
    window: { intro: 'Hermantown glass picks up Lake Superior humidity film, pollen from dense tree cover, and hard-water spots on well-fed rural lots toward Adolph.', bullets: ['<b>Twice-yearly maintenance.</b> Spring pollen and fall dust both warrant scheduled cleaning.', '<b>Interior bundles popular.</b> Full home packages before holidays and open houses.', '<b>Hard-water on south glass.</b> Mineral spotting needs proper technique — not vinegar shortcuts.', '<b>Screen and track detail.</b> Finished look means frames, not just panes.'], close: 'Streak-free window cleaning keeps Hermantown homes bright against wooded backdrops.', builtFor: 'Window methods tuned for Hermantown humidity, pollen, and suburban hard-water spotting.', resultsEyebrow: 'Real Hermantown Window Results' },
    commercial: { intro: 'Hermantown businesses along Highway 53 and the Miller Trunk depend on clean storefronts and parking lots for customers who choose local over driving to Duluth.', bullets: ['<b>Retail pad degreasing.</b> Food and auto-related stains need hot water.', '<b>Building exteriors.</b> Soft wash removes algae from stucco and EIFS facades.', '<b>Flexible scheduling.</b> Before-hours service for medical and professional offices.', '<b>Recurring plans.</b> Quarterly maintenance beats one emergency deep clean.'], close: 'Commercial washing keeps Hermantown properties sharp for the customers who live right here.', builtFor: 'Commercial crews for Hermantown retail pads, medical offices, and Miller Trunk traffic.', resultsEyebrow: 'Real Hermantown Commercial Results' },
    blogSpotlight: 'Hermantown sits between Duluth and open Carlton County acreage — shaded subdivisions, Highway 53 salt, and Lake Superior-influenced humidity create a distinct maintenance rhythm from the hillside homes ten minutes east.',
  },

  proctor: {
    soft: {
      intro: 'Proctor&apos;s mix of historic homes near downtown and updated ranches on Thompson Hill faces wind off the lake and shade under mature pines — algae and lichen collect on north slopes while south walls still look clean.',
      bullets: [
        '<b>Thompson Hill wind exposure.</b> Lake air accelerates grime on west-facing siding above US-2.',
        '<b>Historic trim needs gentle care.</b> Older wood and mixed siding on Proctor originals cannot take high-pressure blasting.',
        '<b>Lichen on shaded roofs.</b> Mature pines drop moisture that feeds growth on north roof slopes.',
        '<b>Iron Range gateway dust.</b> MN-210 traffic adds film to exteriors facing the corridor toward Duluth.',
      ],
      close: 'Soft washing protects Proctor finishes while eliminating the organic growth that makes well-maintained homes look tired from the curb.',
      builtFor: 'Gentle exterior cleaning for Proctor historic siding, Thompson Hill wind exposure, and pine-shade moisture.',
      guarantee: 'Proctor soft washes include our one-year regrowth guarantee — calibrated for lake air, pine shade, and Range-gateway dust.',
      resultsEyebrow: 'Real Proctor Results',
    },
    concrete: { intro: 'Proctor walkways and driveways take heavy salt from MN-210 and local plow routes — embedded sand does not rinse away with a cold garden sprayer.', bullets: ['<b>Municipal sidewalk standards.</b> Downtown Proctor flatwork sees foot traffic and salt daily.', '<b>Residential aprons.</b> Thompson Hill driveways need hot water after long winters.', '<b>Paver and asphalt care.</b> Correct pressure and heat protect joints and edges.', '<b>Spring booking peak.</b> Schedule before summer stains bake in.'], close: 'Hot-water washing lifts Proctor winter contamination without the patchy marks cold equipment leaves behind.', builtFor: 'Concrete cleaning for Proctor MN-210 salt load and Thompson Hill residential flatwork.', resultsEyebrow: 'Real Proctor Concrete Results' },
    deck: { intro: 'Proctor decks endure snow load and shade moisture — boards gray and green long before homeowners notice from inside.', bullets: ['<b>Snow mold on boards.</b> Spring reveal often shows green film across shaded rails.', '<b>Historic porch wood.</b> Gentle chemistry preserves old-growth trim near downtown.', '<b>Fence brightening.</b> Perimeter wood matches deck restoration on same visit.', '<b>Stain-season prep.</b> Book before June humidity complicates drying.'], close: 'Soft-wash deck care in Proctor removes mildew safely and preps wood for sealant that survives Range winters.', builtFor: 'Deck restoration for Proctor snow load, pine shade, and historic wood porches.', resultsEyebrow: 'Real Proctor Deck Results' },
    window: { intro: 'Proctor residential and commercial glass collects pollen, Thompson Hill dust, and hard-water spotting — professional cleaning improves light and street presentation.', bullets: ['<b>School-community pride.</b> Homes near Proctor schools photograph better with clear glass.', '<b>Hard-water wells.</b> Rural-edge properties need mineral-spot treatment.', '<b>Storefront clarity.</b> Downtown businesses benefit from scheduled glass care.', '<b>Interior available.</b> Full packages before events and listings.'], close: 'Window cleaning in Proctor delivers streak-free results year-round.', builtFor: 'Window cleaning for Proctor pollen, dust, and mixed residential-commercial glass.', resultsEyebrow: 'Real Proctor Window Results' },
    commercial: { intro: 'Proctor shops, schools, and municipal buildings need professional curb appeal without disrupting daily operations.', bullets: ['<b>Sidewalk salt removal.</b> Entry paths safe for students and customers.', '<b>Loading areas.</b> Degreased pads behind retail and service businesses.', '<b>Building wash.</b> Algae removal from brick and vinyl exteriors.', '<b>Insured documentation.</b> COI for schools and municipal contracts.'], close: 'Commercial pressure washing keeps Proctor properties welcoming through every season.', builtFor: 'Commercial service for Proctor schools, retail, and municipal exteriors.', resultsEyebrow: 'Real Proctor Commercial Results' },
    blogSpotlight: 'Proctor blends Iron Range gateway character with Thompson Hill lake breeze — a smaller market than Duluth, but exterior buildup from MN-210 salt, pine shade, and historic mixed siding is just as real.',
  },

  cloquet: {
    soft: {
      intro: 'Cloquet sits in a river valley where the St. Louis River and heavy timber shade keep north-facing siding damp — craftsman homes near Pinehurst Park and ranches along the corridor see algae months before sunnier climates would.',
      bullets: [
        '<b>River-valley humidity.</b> Moisture rises from the St. Louis River and lingers on shaded walls.',
        '<b>Pulp-mill and road film.</b> Industrial dust and MN-33 traffic add gray film to exteriors facing the corridor.',
        '<b>Craftsman and vinyl mix.</b> Cloquet&apos;s housing stock needs chemistry matched to material — not one PSI for everything.',
        '<b>Scanlon overflow conditions.</b> Same valley moisture affects sister communities — treatment approach is identical, scheduling is local.',
      ],
      close: 'Soft washing removes valley-fed algae on Cloquet siding without forcing water behind trim — protecting finishes through Carlton County&apos;s wet springs.',
      builtFor: 'Soft wash chemistry for Cloquet river humidity, timber shade, and Carlton County freeze-thaw.',
      guarantee: 'Cloquet jobs carry our one-year regrowth guarantee — built for river-valley damp and the shade that defines Pinehurst-area lots.',
      resultsEyebrow: 'Real Cloquet Results',
    },
    concrete: { intro: 'Cloquet driveways and shop floors collect road salt, pulp-mill dust, and winter sand — hot water reaches into pores cold rinses never touch.', bullets: ['<b>Industrial corridor grime.</b> Commercial lots along the river need degreasing.', '<b>Residential river lots.</b> Humidity plus salt stains aprons near the water.', '<b>Downtown walks.</b> Municipal flatwork benefits from spring hot-wash schedules.', '<b>Scanlon-Cloquet routes.</b> Same crew serves both valley communities efficiently.'], close: 'Hot-water concrete washing restores Cloquet and Scanlon flatwork after Minnesota winters.', builtFor: 'Hot-water concrete care for Cloquet salt, mill dust, and river-valley flatwork.', resultsEyebrow: 'Real Cloquet Concrete Results' },
    deck: { intro: 'Cloquet wooded lots keep decks damp — green boards and slippery steps are normal by June without maintenance.', bullets: ['<b>Valley shade decks.</b> Limited sun means algae thrives on treads and rails.', '<b>Pre-stain restoration.</b> Remove gray oxidation before summer sealing.', '<b>Composite and wood.</b> Material-appropriate low pressure on every job.', '<b>Dock-adjacent wood.</b> River properties need extra attention on lake-facing rails.'], close: 'Deck soft washing in Cloquet clears years of mildew without splintering boards.', builtFor: 'Deck care for Cloquet timber shade, river humidity, and Minnesota restain windows.', resultsEyebrow: 'Real Cloquet Deck Results' },
    window: { intro: 'Cloquet glass collects river-humidity film, pollen, and hard-water stains — inside and out service keeps homes and storefronts bright.', bullets: ['<b>River-fog residue.</b> Lake-effect moisture reaches inland along the valley.', '<b>Storefront schedules.</b> Downtown Cloquet businesses need reliable glass care.', '<b>Pollen spring rush.</b> Book before green film bakes onto south panes.', '<b>Track and sill wipe-down.</b> Detail work separates pro results from DIY streaks.'], close: 'Professional window cleaning in Cloquet maximizes natural light through every season.', builtFor: 'Window cleaning for Cloquet river humidity, pollen, and commercial storefront glass.', resultsEyebrow: 'Real Cloquet Window Results' },
    commercial: { intro: 'From downtown Cloquet storefronts to industrial sites along the river, commercial exteriors face grease, salt, and heavy traffic.', bullets: ['<b>Storefront + pad packages.</b> Glass and concrete together on one invoice.', '<b>Industrial flatwork.</b> Hot water for oil and process dust.', '<b>After-hours available.</b> Retail and food service scheduling flexibility.', '<b>Property manager plans.</b> Recurring maintenance across multiple Cloquet sites.'], close: 'Commercial washing keeps Cloquet businesses inspection-ready and customer-facing.', builtFor: 'Commercial crews for Cloquet river-corridor industry and downtown retail.', resultsEyebrow: 'Real Cloquet Commercial Results' },
    blogSpotlight: 'Cloquet&apos;s St. Louis River valley traps humidity against north-facing walls while MN-33 and local industry add dust film — homeowners here see green siding earlier than open-country properties just twenty miles south.',
  },

  superior: {
    soft: {
      intro: 'Superior properties in Billings Park, South Superior, and the North End face Wisconsin-side lake humidity and bay winds that drive algae on vinyl and aluminum — different state, same relentless Lake Superior moisture.',
      bullets: [
        '<b>Bay-side exposure.</b> Properties facing the harbor collect salt and fog residue faster than inland WI lots.',
        '<b>Blatnik Bridge corridor dust.</b> I-535 traffic adds film to exteriors along Tower Avenue approaches.',
        '<b>Aluminum siding common.</b> Soft wash prevents denting that pressure washing causes on Superior homes.',
        '<b>Twin Ports scheduling.</b> We serve Superior from our Duluth base — same crew, Wisconsin-side expertise.',
      ],
      close: 'Soft washing protects Superior finishes while removing the algae bay humidity feeds — without the damage high PSI causes on Wisconsin-side homes.',
      builtFor: 'Soft washing for Superior bay humidity, harbor salt, and Twin Ports Wisconsin siding types.',
      guarantee: 'Superior soft washes include our one-year regrowth guarantee — tuned for bay-side damp and Douglas County winters.',
      resultsEyebrow: 'Real Superior Results',
    },
    concrete: { intro: 'Superior driveways and Tower Avenue commercial lots face harbor salt, sand, and vehicle fluids year-round — Wisconsin winters are just as hard on concrete as Minnesota&apos;s.', bullets: ['<b>Harbor salt penetration.</b> Bay-side aprons need spring hot-water treatment.', '<b>Waterfront industrial pads.</b> Degreasing for shipping-adjacent sites.', '<b>Residential Billings Park.</b> Even suburban concrete holds winter chloride.', '<b>Cross-bridge service.</b> We schedule Superior routes efficiently from Duluth.'], close: 'Hot-water washing restores Superior concrete after Douglas County salt seasons.', builtFor: 'Concrete washing for Superior harbor salt, bay runoff, and Tower Avenue commercial pads.', resultsEyebrow: 'Real Superior Concrete Results' },
    deck: { intro: 'Superior decks and docks see constant bay moisture — slippery algae is a safety issue on lake-facing properties.', bullets: ['<b>Dock and deck packages.</b> Waterfront wood needs seasonal soft wash.', '<b>Bay wind grime.</b> Horizontal surfaces collect film faster than inland decks.', '<b>Composite waterfront.</b> Low-pressure safe for modern dock decking.', '<b>Pre-season booking.</b> Schedule before Memorial Day traffic on the lake.'], close: 'Deck restoration in Superior removes algae safely before summer on the bay.', builtFor: 'Deck and dock care for Superior bay moisture and Wisconsin freeze-thaw.', resultsEyebrow: 'Real Superior Deck Results' },
    window: { intro: 'Superior glass cuts through salt spray, pollen, and hard-water spotting — streak-free results for homes and buildings facing the lake.', bullets: ['<b>Harbor salt film.</b> Professional removal requires squeegee discipline.', '<b>Tower Avenue storefronts.</b> Commercial glass on busy corridors.', '<b>Interior + exterior.</b> Full packages for lake-view homes.', '<b>Hard-water minerals.</b> Spot treatment on south-facing panes.'], close: 'Window cleaning in Superior WI keeps lake views clear through harsh harbor winds.', builtFor: 'Window cleaning for Superior salt spray, bay fog, and commercial Tower Avenue glass.', resultsEyebrow: 'Real Superior Window Results' },
    commercial: { intro: 'Superior businesses along Tower Avenue and the waterfront industrial corridor need curb appeal that survives Wisconsin winters.', bullets: ['<b>Storefront presentation.</b> Glass and facade washing together.', '<b>Equipment pads.</b> Hot-water degreasing for industrial sites.', '<b>Multi-tenant scheduling.</b> After-hours for retail tenants.', '<b>Cross-state insured.</b> Fully documented Wisconsin service.'], close: 'Commercial-grade cleaning for Superior WI properties facing the bay and highway traffic.', builtFor: 'Commercial washing for Superior waterfront industry and Tower Avenue retail.', resultsEyebrow: 'Real Superior Commercial Results' },
    blogSpotlight: 'Superior WI shares Lake Superior with Duluth but faces its own bay-side salt, Tower Avenue grit, and Douglas County humidity — Wisconsin homeowners need local pages, not Minnesota templates with the city name swapped.',
  },

  'two-harbors': {
    soft: {
      intro: 'Two Harbors endures relentless Lake Superior spray, Agate Bay fog, and coastal wind that colonizes siding on Highway 61 lakefront cabins and downtown historic districts alike — algae here is aggressive even by North Shore standards.',
      bullets: [
        '<b>Direct lake wind.</b> Properties facing Superior see spores deposited daily on west and north walls.',
        '<b>Historic cedar and vinyl.</b> Downtown districts need finish-safe chemistry — not tourist-season pressure blasting.',
        '<b>Agate Bay humidity.</b> Harbor fog keeps rooflines damp through shoulder seasons.',
        '<b>Cabin seasonal turnover.</b> Pre-summer soft washes book fast — schedule before June occupancy.',
      ],
      close: 'North Shore soft washing in Two Harbors removes coastal algae without damaging cedar, vinyl, or metal siding battered by Superior storms.',
      builtFor: 'Soft washing for Two Harbors lake spray, Agate Bay fog, and North Shore coastal exposure.',
      guarantee: 'Two Harbors soft washes carry our one-year regrowth guarantee — built for direct Superior exposure and North Shore winters.',
      resultsEyebrow: 'Real Two Harbors Results',
    },
    concrete: { intro: 'Two Harbors driveways and marina-adjacent concrete collect road salt, iron-rich lake spray, and RV traffic stains along Highway 61.', bullets: ['<b>Lake spray minerals.</b> Iron-rich film stains aprons near the shore.', '<b>Highway 61 commercial.</b> Tourism corridors need spring pad washing.', '<b>RV pad degreasing.</b> Seasonal properties see oil and road film buildup.', '<b>Even flatwork finish.</b> Surface cleaners for long rural driveways.'], close: 'Hot-water concrete washing restores North Shore flatwork after winter salt and lake minerals.', builtFor: 'Concrete care for Two Harbors lake spray, Highway 61 salt, and marina-adjacent pads.', resultsEyebrow: 'Real Two Harbors Concrete Results' },
    deck: { intro: 'Lake-facing decks in Two Harbors need algae control before summer — Superior storms keep wood damp and green.', bullets: ['<b>Coastal deck algae.</b> Slippery steps are common without annual care.', '<b>Cedar cabin decks.</b> Gentle wash preserves rustic finishes.', '<b>Highway 61 rentals.</b> Turnover cleaning between guest seasons.', '<b>Rail and tread focus.</b> Safety-critical surfaces cleaned first.'], close: 'Deck soft washing extends wood life on North Shore properties facing Superior.', builtFor: 'Deck restoration for Two Harbors lake storms, coastal humidity, and cedar cabin care.', resultsEyebrow: 'Real Two Harbors Deck Results' },
    window: { intro: 'Two Harbors glass battles salt film and fog residue — clear panes are the difference between a lake view and a hazy blur.', bullets: ['<b>Salt film removal.</b> Harbor properties need twice-yearly glass care.', '<b>Lodging turnover.</b> Rental cabins benefit from scheduled window packages.', '<b>Interior + exterior.</b> Full clarity for summer occupancy.', '<b>Hard-water at shore.</b> Mineral spots from lake-side exposure.'], close: 'Window cleaning in Two Harbors keeps Superior views crystal clear.', builtFor: 'Window cleaning for Two Harbors salt film, fog residue, and North Shore rentals.', resultsEyebrow: 'Real Two Harbors Window Results' },
    commercial: { intro: 'Tourism, shipping, and Highway 61 shops in Two Harbors depend on clean exteriors for the summer season rush.', bullets: ['<b>Lodging curb appeal.</b> Hotels and rentals guest-ready before peak season.', '<b>Marina-adjacent sites.</b> Salt and grease on commercial pads.', '<b>Historic district facades.</b> Soft wash for aged brick and wood storefronts.', '<b>Pre-season scheduling.</b> Book commercial routes before Memorial Day.'], close: 'Commercial washing prepares Two Harbors businesses for North Shore tourism season.', builtFor: 'Commercial service for Two Harbors tourism, lodging, and Highway 61 retail.', resultsEyebrow: 'Real Two Harbors Commercial Results' },
    blogSpotlight: 'Two Harbors is among the most lake-exposed communities we serve — Agate Bay fog, Highway 61 salt, and direct Superior wind mean exterior cleaning is annual maintenance for most lake-facing properties.',
  },

  esko: {
    soft: {
      intro: 'Esko properties from school-district neighborhoods out toward Thomson sit on shaded, pine-lined lots where algae appears on north walls while south siding still looks new — country acreage and suburban homes share the same damp-under-trees problem.',
      bullets: [
        '<b>Pine-shade moisture.</b> Limited sunlight on north faces feeds green-black streaking.',
        '<b>Long driveways, same siding issues.</b> Rural Esko homes still need low-pressure chemistry on the house itself.',
        '<b>County road dust.</b> Gravel and dust film add gray haze to exteriors facing township roads.',
        '<b>Multi-acre scheduling.</b> We coordinate house wash with concrete on spread-out properties.',
      ],
      close: 'Soft washing clears Esko algae without damaging LP SmartSide, vinyl, or wood on country and suburban lots alike.',
      builtFor: 'Soft washing for Esko pine shade, Carlton County dust, and rural-suburban mixed siding.',
      guarantee: 'Esko soft washes include our one-year regrowth guarantee — for shaded lots from the school district toward Thomson.',
      resultsEyebrow: 'Real Esko Results',
    },
    concrete: { intro: 'Esko driveways and shop floors see salt, gravel dust, and oil from long rural approaches — hot water reaches stains cold equipment skims over.', bullets: ['<b>Long apron cleaning.</b> Country driveways need surface cleaners for even results.', '<b>Farm-adjacent oil.</b> Shop floors and equipment pads degreased properly.', '<b>Winter plow damage film.</b> Sand embedded in spring — hot wash lifts it.', '<b>Bundle with house wash.</b> One trip for spread-out Esko properties.'], close: 'Hot-water washing restores Esko concrete on country roads and in the school-community neighborhoods.', builtFor: 'Concrete washing for Esko rural driveways, shop floors, and county-road salt.', resultsEyebrow: 'Real Esko Concrete Results' },
    deck: { intro: 'Esko decks under heavy tree cover turn green fast — mildew and algae before summer is the norm, not the exception.', bullets: ['<b>Canopy-fed mildew.</b> Pine shade decks need annual soft wash.', '<b>Pre-stain brightening.</b> Safe prep before contractors seal.', '<b>Fence lines included.</b> Match deck and perimeter wood care.', '<b>Composite decks too.</b> Manufacturer-safe low pressure.'], close: 'Deck restoration keeps Esko outdoor spaces safe and bright under tree cover.', builtFor: 'Deck care for Esko pine canopy, rural humidity, and Minnesota stain seasons.', resultsEyebrow: 'Real Esko Deck Results' },
    window: { intro: 'Esko country homes and local businesses need pollen, hard-water, and road dust removed from glass — streak-free work across long driveways worth the trip.', bullets: ['<b>Road dust film.</b> County gravel adds haze to south-facing glass.', '<b>Hard-water spots.</b> Well water minerals on rural lots.', '<b>Interior packages.</b> Full home clarity before events.', '<b>Local business glass.</b> Esko storefront and office schedules.'], close: 'Window cleaning in Esko delivers professional clarity for country and community properties.', builtFor: 'Window cleaning for Esko road dust, well-water spots, and rural home glass.', resultsEyebrow: 'Real Esko Window Results' },
    commercial: { intro: 'Esko-area agricultural operations and local businesses need clean premises without downtown Duluth pricing surprises.', bullets: ['<b>Outbuilding pads.</b> Hot-water wash for shop and barn aprons.', '<b>Storefront care.</b> Community-facing businesses along main routes.', '<b>Agricultural dust.</b> Seasonal film removal from building exteriors.', '<b>Flexible rural scheduling.</b> We plan efficient Esko-Thomson routes.'], close: 'Commercial washing for Esko agricultural and community business properties.', builtFor: 'Commercial service for Esko agricultural sites and Carlton County businesses.', resultsEyebrow: 'Real Esko Commercial Results' },
    blogSpotlight: 'Esko sits at the crossroads of rural Carlton County — pine-shaded acreage, school-community neighborhoods, and county-road dust create exterior challenges distinct from river-valley Cloquet just minutes north.',
  },

  carlton: {
    soft: {
      intro: 'Carlton homes in the Nemadji valley and near Jay Cooke State Park face river-bottom humidity and heavy timber shade — algae streaks north-facing craftsman walls while downtown county-seat buildings collect road film from MN-210.',
      bullets: [
        '<b>Nemadji valley damp.</b> River-bottom moisture feeds mold on shaded siding.',
        '<b>Jay Cooke gateway properties.</b> Tourism traffic and forest humidity combine on park-adjacent homes.',
        '<b>Historic downtown brick.</b> Gentle soft wash preserves aged masonry and wood trim.',
        '<b>Countryside ranches.</b> Spread-out Carlton County lots still need chemistry matched to vinyl and wood.',
      ],
      close: 'Soft washing protects Carlton finishes from valley humidity and timber shade — without high-pressure damage to craftsman details or rural ranch siding.',
      builtFor: 'Soft washing for Carlton Nemadji humidity, Jay Cooke gateway exposure, and county-seat mixed housing.',
      guarantee: 'Carlton soft washes carry our one-year regrowth guarantee — for river-gorge damp and forest shade unique to this corridor.',
      resultsEyebrow: 'Real Carlton Results',
    },
    concrete: { intro: 'Carlton driveways and municipal walks along MN-210 hold winter sand and salt from plow routes through the county seat — spring hot washing is standard maintenance.', bullets: ['<b>MN-210 corridor salt.</b> Highway-facing aprons need heated treatment.', '<b>Downtown municipal walks.</b> County-seat flatwork sees daily foot traffic.', '<b>Rural ranch driveways.</b> Long approaches toward Jay Cooke cleaned evenly.', '<b>Paver care.</b> Correct heat and pressure for jointed surfaces.'], close: 'Hot-water concrete washing restores Carlton flatwork from downtown to countryside ranches.', builtFor: 'Concrete care for Carlton MN-210 salt, Nemadji valley runoff, and county-seat walks.', resultsEyebrow: 'Real Carlton Concrete Results' },
    deck: { intro: 'Carlton wood decks and fences under pines need soft washing — not blasting — before stain season in Minnesota&apos;s short summer window.', bullets: ['<b>Valley shade decks.</b> Limited sun means green boards by June.', '<b>Historic porch wood.</b> Downtown homes need gentle restoration.', '<b>Fence brightening.</b> Perimeter wood on country properties.', '<b>Stain prep standard.</b> Remove gray oxidation before sealing.'], close: 'Deck restoration in Carlton preps wood safely for sealant that survives Nemadji valley humidity.', builtFor: 'Deck care for Carlton timber shade, valley moisture, and historic porch wood.', resultsEyebrow: 'Real Carlton Deck Results' },
    window: { intro: 'Carlton homes and offices need pollen, dust, and hard-water film removed — streak-free glass for county-seat properties and rural ranches alike.', bullets: ['<b>Valley humidity haze.</b> Glass fogs faster near the Nemadji.', '<b>Downtown office glass.</b> Professional schedules for county-seat businesses.', '<b>Hard-water on wells.</b> Rural Carlton lots need spot treatment.', '<b>Pre-listing clarity.</b> Bright glass for Carlton County sellers.'], close: 'Window cleaning in Carlton MN delivers streak-free results inside and out.', builtFor: 'Window cleaning for Carlton valley humidity, pollen, and county-seat commercial glass.', resultsEyebrow: 'Real Carlton Window Results' },
    commercial: { intro: 'Carlton businesses and county facilities along MN-210 need sidewalks, loading docks, and building exteriors that look maintained through harsh winters.', bullets: ['<b>County facility walks.</b> Municipal standards for clean entries.', '<b>Retail MN-210 frontage.</b> Storefront and pad packages.', '<b>Industrial dock areas.</b> Degreased loading zones.', '<b>Recurring contracts.</b> Quarterly maintenance beats emergency calls.'], close: 'Commercial pressure washing for Carlton county-seat and corridor businesses.', builtFor: 'Commercial washing for Carlton municipal, retail, and MN-210 corridor sites.', resultsEyebrow: 'Real Carlton Commercial Results' },
    blogSpotlight: 'Carlton combines Nemadji river-bottom humidity, Jay Cooke tourism traffic, and MN-210 salt — a county-seat community where forest shade and highway exposure hit different walls of the same home.',
  },

  scanlon: {
    soft: {
      intro: 'Scanlon&apos;s quiet, tree-lined streets near the Cloquet river corridor stay humid and shaded — vinyl and wood siding develop algae quietly on north walls while the home still looks fine from the street-facing south side.',
      bullets: [
        '<b>Cloquet river corridor damp.</b> Valley moisture reaches Scanlon lots minutes from downtown Cloquet.',
        '<b>Residential shade patterns.</b> Mature trees on established streets block drying sun.',
        '<b>Suburban vinyl care.</b> Low pressure protects trim and J-channel from forced water intrusion.',
        '<b>Sister-city scheduling.</b> We route Scanlon and Cloquet together for efficient service.',
      ],
      close: 'Soft washing removes Scanlon algae at the root — protecting the quiet residential character that draws families to this Cloquet-area community.',
      builtFor: 'Soft washing for Scanlon river-corridor humidity, tree shade, and residential vinyl.',
      guarantee: 'Scanlon soft washes include our one-year regrowth guarantee — for valley damp and shaded residential lots.',
      resultsEyebrow: 'Real Scanlon Results',
    },
    concrete: { intro: 'Scanlon driveways and patio slabs need hot-water cleaning to remove embedded salt and sand — the same winter contamination Cloquet sees spills into this residential community.', bullets: ['<b>Residential apron salt.</b> Garage approaches hold chloride after plow season.', '<b>Walkway safety.</b> Algae on shaded concrete creates slip hazards.', '<b>Patio refresh.</b> Even stamped concrete needs heated treatment.', '<b>Cloquet-area routing.</b> Efficient scheduling with neighboring Cloquet.'], close: 'Hot-water washing restores Scanlon concrete after Minnesota winters.', builtFor: 'Concrete washing for Scanlon residential salt, river-valley damp, and patio algae.', resultsEyebrow: 'Real Scanlon Concrete Results' },
    deck: { intro: 'Scanlon decks and fences benefit from soft-wash restoration that clears mildew before stain — preparing wood for sealing that lasts.', bullets: ['<b>Shaded backyard decks.</b> Green film on steps by late spring.', '<b>Fence matching.</b> Perimeter wood cleaned with deck on same visit.', '<b>Safe for family use.</b> Remove slippery algae before summer play.', '<b>Wood and composite.</b> Correct method per material.'], close: 'Deck care in Scanlon keeps outdoor spaces safe through wet Carlton County seasons.', builtFor: 'Deck restoration for Scanlon shade moisture and residential wood decks.', resultsEyebrow: 'Real Scanlon Deck Results' },
    window: { intro: 'Scanlon residential glass collects humidity film and pollen — streak-free cleaning improves light in tree-lined homes near the Cloquet river.', bullets: ['<b>Humidity film.</b> River-corridor moisture hazes glass.', '<b>Pollen seasons.</b> Spring and early summer scheduling peaks.', '<b>Interior + exterior.</b> Popular before holidays and listings.', '<b>Detail on tracks.</b> Full finish, not just squeegee on panes.'], close: 'Window cleaning in Scanlon delivers professional streak-free clarity.', builtFor: 'Window cleaning for Scanlon humidity film, pollen, and residential glass.', resultsEyebrow: 'Real Scanlon Window Results' },
    commercial: { intro: 'Scanlon and Cloquet-area local businesses trust professional washing for customer-facing exteriors without chain-store blandness.', bullets: ['<b>Small-business storefronts.</b> Glass and sidewalk packages.', '<b>Office entries.</b> Clean walks for professional suites.', '<b>After-hours service.</b> Minimal disruption to business hours.', '<b>Local reputation focus.</b> Curb appeal matters in tight communities.'], close: 'Commercial washing for Scanlon-area businesses serving the Cloquet river corridor.', builtFor: 'Commercial care for Scanlon local retail and professional offices.', resultsEyebrow: 'Real Scanlon Commercial Results' },
    blogSpotlight: 'Scanlon shares Cloquet&apos;s river-valley humidity but sits on quieter residential streets — shaded lots and Cloquet-corridor damp mean algae shows up on north walls long before homeowners notice from the curb.',
  },

  wrenshall: {
    soft: {
      intro: 'Wrenshall along the Highway 61 south corridor mixes small-town homes, farmsteads, and I-35 exposure — pines and birch shade siding while road dust and winter salt film add gray haze to south-facing walls.',
      bullets: [
        '<b>Highway 61 south exposure.</b> Traffic dust settles on exteriors facing the corridor.',
        '<b>Pine and birch shade.</b> North walls stay damp under Carlton County canopy.',
        '<b>Township acreage homes.</b> Spread-out properties from downtown to rural edges.',
        '<b>Farm outbuilding siding.</b> Barns and shops benefit from same low-pressure approach.',
      ],
      close: 'Soft washing clears Wrenshall algae and road film without damaging siding on town homes or countryside farmsteads.',
      builtFor: 'Soft washing for Wrenshall highway dust, pine shade, and south Carlton County acreage.',
      guarantee: 'Wrenshall soft washes carry our one-year regrowth guarantee — for corridor dust and shaded Carlton County lots.',
      resultsEyebrow: 'Real Wrenshall Results',
    },
    concrete: { intro: 'Wrenshall driveways and shop floors collect salt, gravel, and agricultural dust — hot water is essential on long rural approaches.', bullets: ['<b>I-35 corridor salt.</b> Plow sand embeds in township driveways.', '<b>Agricultural oil.</b> Shop aprons need degreasing.', '<b>Farm lane length.</b> Surface cleaners for even long passes.', '<b>Seasonal cabin concrete.</b> Pre-summer pad washing for lake traffic properties.'], close: 'Hot-water washing restores Wrenshall concrete on farmsteads and in-town homes alike.', builtFor: 'Concrete care for Wrenshall salt, agricultural dust, and long rural driveways.', resultsEyebrow: 'Real Wrenshall Concrete Results' },
    deck: { intro: 'Country decks around Wrenshall turn green under tree canopy — slippery algae before July is preventable with spring soft washing.', bullets: ['<b>Canopy algae.</b> Birch and pine shade feeds green boards.', '<b>Farm deck safety.</b> Steps and rails cleaned for family use.', '<b>Pre-stain prep.</b> Brighten before summer sealing window.', '<b>Fence bundles.</b> Match perimeter wood on same visit.'], close: 'Deck restoration in Wrenshall removes slippery growth safely under Carlton County trees.', builtFor: 'Deck care for Wrenshall tree canopy, farm properties, and Minnesota stain prep.', resultsEyebrow: 'Real Wrenshall Deck Results' },
    window: { intro: 'Wrenshall country homes need road dust, pollen, and hard-water stains removed — streak-free glass for properties along Highway 61 south.', bullets: ['<b>Road dust haze.</b> Corridor-facing glass dulls quickly.', '<b>Well-water spots.</b> Rural mineral film on south panes.', '<b>Interior service.</b> Full home packages popular.', '<b>Seasonal cabins.</b> Pre-occupancy window cleaning.'], close: 'Window cleaning keeps Wrenshall homes bright against wooded backdrops.', builtFor: 'Window cleaning for Wrenshall road dust, well-water spots, and rural glass.', resultsEyebrow: 'Real Wrenshall Window Results' },
    commercial: { intro: 'Wrenshall-area commercial and agricultural properties need professional pads and outbuildings cleaned for customer-facing presentation.', bullets: ['<b>Agricultural outbuildings.</b> Exterior wash for shop and barn siding.', '<b>Customer-facing farms.</b> Retail ag operations need clean entries.', '<b>Local business walks.</b> Salt and dust removal from entries.', '<b>Rural route efficiency.</b> Bundled Wrenshall-Carlton scheduling.'], close: 'Commercial washing for Wrenshall agricultural and community business sites.', builtFor: 'Commercial service for Wrenshall farms, outbuildings, and Highway 61 businesses.', resultsEyebrow: 'Real Wrenshall Commercial Results' },
    blogSpotlight: 'Wrenshall straddles small-town Minnesota and rural Carlton County — Highway 61 dust, I-35 salt, and pine-shaded lots create a maintenance profile closer to farm country than to Duluth hillside homes.',
  },

  barnum: {
    soft: {
      intro: 'Barnum year-round and seasonal homes around local lakes face humidity-driven algae on lakefront siding, cabins under birch shade, and farm outbuildings that green before summer occupancy.',
      bullets: [
        '<b>Lake-humidity streaks.</b> North shores and shaded cabins collect mold faster than open lots.',
        '<b>Seasonal cabin turnover.</b> Pre-opening soft wash books every May across lake country.',
        '<b>Farm house and barn siding.</b> Low pressure safe on metal and wood agricultural buildings.',
        '<b>Full-time residences too.</b> Barnum is not only cabins — maintained homes need annual care.',
      ],
      close: 'Soft washing protects Barnum lakefront siding, cabins, and farmsteads from algae that humidity and shade feed all summer.',
      builtFor: 'Soft washing for Barnum lake humidity, seasonal cabins, and farm outbuilding siding.',
      guarantee: 'Barnum soft washes include our one-year regrowth guarantee — for lake-country damp and cabin-season turnover.',
      resultsEyebrow: 'Real Barnum Results',
    },
    concrete: { intro: 'Barnum driveways and lake-access walks see sand, salt, and boat-trailer grime — hot water restores patios and garage aprons before cabin season.', bullets: ['<b>Boat trailer oil.</b> Lake-access aprons need degreasing.', '<b>Cabin driveway salt.</b> Seasonal properties sit untreated all winter.', '<b>Resort and rental pads.</b> Guest-ready flatwork before peak weeks.', '<b>Farm concrete.</b> Shop floors and equipment aprons.'], close: 'Hot-water concrete washing prepares Barnum properties for lake season and year-round living.', builtFor: 'Concrete washing for Barnum lake-access grime, cabin driveways, and farm aprons.', resultsEyebrow: 'Real Barnum Concrete Results' },
    deck: { intro: 'Lake decks and docks around Barnum need algae removed safely — slippery wood is a liability before guests arrive.', bullets: ['<b>Dock-side algae.</b> Water-adjacent boards green early.', '<b>Cedar cabin decks.</b> Gentle wash before summer occupancy.', '<b>Rental turnover.</b> Fast deck refresh between guest weeks.', '<b>Stain prep.</b> Brighten wood for seasonal sealing.'], close: 'Deck and dock soft washing in Barnum clears slippery growth without damaging cedar or treated lumber.', builtFor: 'Deck and dock care for Barnum lake properties, cabins, and seasonal rentals.', resultsEyebrow: 'Real Barnum Deck Results' },
    window: { intro: 'Barnum window cleaning maximizes lake views — water spots, pollen, and grime dull glass on properties that sell on the view.', bullets: ['<b>Lake-view clarity.</b> Professional cleaning for waterfront panes.', '<b>Cabin interior + exterior.</b> Turnover packages before guests.', '<b>Hard-water at shore.</b> Mineral spots from lake-side spray.', '<b>Year-round homes.</b> Scheduled maintenance like any metro property.'], close: 'Streak-free windows in Barnum — clearer views and sharper curb appeal for lake country homes.', builtFor: 'Window cleaning for Barnum lake views, cabin turnover, and waterfront hard-water.', resultsEyebrow: 'Real Barnum Window Results' },
    commercial: { intro: 'Barnum businesses, resorts, and rental properties need guest-ready exteriors — curb appeal is revenue in lake country.', bullets: ['<b>Resort presentation.</b> Facades and walks before peak season.', '<b>Rental property turnover.</b> Fast exterior packages between bookings.', '<b>Local retail entries.</b> Clean walks and glass for community businesses.', '<b>Dock-adjacent commercial.</b> Salt and organic film on lake-facing sites.'], close: 'Commercial exterior cleaning keeps Barnum lake-country properties guest-ready.', builtFor: 'Commercial washing for Barnum resorts, rentals, and lake-country businesses.', resultsEyebrow: 'Real Barnum Commercial Results' },
    blogSpotlight: 'Barnum is lake country — seasonal cabins, year-round lake homes, and farm properties share humidity-driven algae that hits north shores and shaded docks weeks before open-country homes show any green.',
  },

  'moose-lake': {
    soft: {
      intro: 'Moose Lake blends I-35 traffic, state park tourism, and small-town neighborhoods — homes near the park, downtown, and surrounding lakes all face pollen, humidity, and shade-driven algae at different intensities.',
      bullets: [
        '<b>State park gateway humidity.</b> Wooded lots near the park stay damp under canopy.',
        '<b>I-35 dust and salt.</b> Corridor-facing exteriors collect road film year-round.',
        '<b>Seasonal cabin stock.</b> Summer homes need pre-season soft wash every spring.',
        '<b>Downtown mixed housing.</b> Ranch and two-story homes need material-matched chemistry.',
      ],
      close: 'Soft washing clears Moose Lake algae on cabins, park-adjacent homes, and year-round residences facing I-35 lake country conditions.',
      builtFor: 'Soft washing for Moose Lake park humidity, I-35 exposure, and lake-country cabins.',
      guarantee: 'Moose Lake soft washes carry our one-year regrowth guarantee — for park shade, corridor dust, and cabin-season prep.',
      resultsEyebrow: 'Real Moose Lake Results',
    },
    concrete: { intro: 'Moose Lake concrete — from downtown sidewalks to lake-home driveways — holds salt, sand, and RV traffic stains that need hot-water treatment each spring.', bullets: ['<b>I-35 commercial pads.</b> Corridor businesses see heavy winter salt.', '<b>RV pad stains.</b> Seasonal properties and campground-adjacent sites.', '<b>Downtown walks.</b> Municipal and retail flatwork.', '<b>Lake-home aprons.</b> Boat and trailer grime at shore properties.'], close: 'Hot-water washing restores Moose Lake flatwork for downtown, corridor, and lake properties.', builtFor: 'Concrete care for Moose Lake I-35 salt, RV traffic, and state-park-area homes.', resultsEyebrow: 'Real Moose Lake Concrete Results' },
    deck: { intro: 'Restore Moose Lake decks before summer — algae and gray wood under snow cover surprise owners every May.', bullets: ['<b>Park-adjacent shade decks.</b> Limited sun feeds green boards.', '<b>Cabin deck turnover.</b> Pre-season safety on steps and rails.', '<b>Composite decking.</b> Low-pressure manufacturer-safe care.', '<b>Pre-stain window.</b> Book before June humidity.'], close: 'Deck soft washing in Moose Lake prepares outdoor spaces for state park season and lake summer.', builtFor: 'Deck restoration for Moose Lake cabins, park shade, and I-35 lake country homes.', resultsEyebrow: 'Real Moose Lake Deck Results' },
    window: { intro: 'Moose Lake window cleaning keeps lake views and storefront glass streak-free through pollen season and winter salt spray.', bullets: ['<b>Tourism-season clarity.</b> Lodging and rental glass before peak weeks.', '<b>Pollen spring film.</b> Schedule before bake-on haze.', '<b>Downtown storefronts.</b> I-35 corridor business presentation.', '<b>Cabin packages.</b> Interior and exterior turnover cleaning.'], close: 'Professional window cleaning for Moose Lake homes, cabins, and corridor businesses.', builtFor: 'Window cleaning for Moose Lake pollen, salt spray, and tourism-season turnover.', resultsEyebrow: 'Real Moose Lake Window Results' },
    commercial: { intro: 'Moose Lake shops, lodging, and municipal buildings along I-35 and downtown need professional curb appeal for tourism and local traffic.', bullets: ['<b>Lodging exteriors.</b> Guest-ready before park season peaks.', '<b>Corridor retail pads.</b> Salt and oil degreasing.', '<b>Municipal walks.</b> Clean entries for public buildings.', '<b>Multi-site scheduling.</b> Efficient I-35 lake country routes.'], close: 'Commercial washing for Moose Lake tourism, corridor retail, and municipal properties.', builtFor: 'Commercial service for Moose Lake lodging, I-35 retail, and park-season tourism.', resultsEyebrow: 'Real Moose Lake Commercial Results' },
    blogSpotlight: 'Moose Lake sits on the I-35 lake corridor with state park tourism, cabin stock, and downtown neighborhoods — each faces different exterior buildup, but all share Minnesota humidity and corridor salt.',
  },

  'silver-bay': {
    soft: {
      intro: 'Silver Bay faces some of the North Shore&apos;s harshest direct lake exposure — constant Superior wind, fog, and mineral-rich spray stain siding and roofs on multi-family buildings and lake-facing homes alike.',
      bullets: [
        '<b>Direct Superior wind.</b> Few barriers between lake and siding on north and west walls.',
        '<b>Mineral-rich spray.</b> Iron-heavy lake air leaves film on metal and vinyl.',
        '<b>Multi-family and single-family.</b> Low-pressure approach scales to building type.',
        '<b>Long winter snow load.</b> Organic debris under snow feeds spring algae blooms.',
      ],
      close: 'North Shore soft washing in Silver Bay protects exteriors from aggressive coastal algae without high-pressure damage.',
      builtFor: 'Soft washing for Silver Bay direct lake wind, mineral spray, and North Shore snow load.',
      guarantee: 'Silver Bay soft washes include our one-year regrowth guarantee — for the harshest North Shore lake exposure we serve.',
      resultsEyebrow: 'Real Silver Bay Results',
    },
    concrete: { intro: 'Silver Bay driveways and Highway 61 commercial lots endure road salt, iron-rich spray, and heavy sand — North Shore flatwork needs hot water every spring.', bullets: ['<b>Lake mineral film.</b> Iron-rich spray stains shore-adjacent concrete.', '<b>Highway 61 salt.</b> Commercial corridor winter damage.', '<b>Residential steep approaches.</b> Even finish on hillside driveways.', '<b>Industrial-adjacent pads.</b> Heavy-duty degreasing available.'], close: 'Hot-water concrete washing restores Silver Bay flatwork after North Shore winters.', builtFor: 'Concrete care for Silver Bay lake minerals, Highway 61 salt, and North Shore flatwork.', resultsEyebrow: 'Real Silver Bay Concrete Results' },
    deck: { intro: 'Lake-facing decks in Silver Bay need regular algae control — Superior storms keep wood damp and walk surfaces slippery.', bullets: ['<b>Coastal slip hazard.</b> Algae on steps before summer occupancy.', '<b>Wind-driven grime.</b> Horizontal surfaces collect film fast.', '<b>Cedar and treated pine.</b> Material-safe soft wash only.', '<b>Pre-season safety.</b> Book before peak North Shore weeks.'], close: 'Deck soft washing keeps Silver Bay outdoor surfaces safe under direct Superior exposure.', builtFor: 'Deck care for Silver Bay lake wind, coastal algae, and North Shore cedar decks.', resultsEyebrow: 'Real Silver Bay Deck Results' },
    window: { intro: 'Silver Bay window cleaning removes salt film and fog residue — Superior views deserve clear glass, not permanent haze.', bullets: ['<b>Coastal salt film.</b> Professional removal twice yearly recommended.', '<b>Fog residue.</b> Harbor moisture hazes lake-facing panes.', '<b>Multi-unit buildings.</b> Scheduled routes for recurring clients.', '<b>Interior + exterior.</b> Full clarity packages.'], close: 'Streak-free windows in Silver Bay — clear North Shore views through every season.', builtFor: 'Window cleaning for Silver Bay salt film, fog residue, and North Shore lake views.', resultsEyebrow: 'Real Silver Bay Window Results' },
    commercial: { intro: 'Silver Bay businesses and public-facing properties along Highway 61 rely on professional washing for North Shore presentation.', bullets: ['<b>Highway corridor retail.</b> Storefront and walk packages.', '<b>Public building entries.</b> Municipal curb appeal standards.', '<b>Industrial site pads.</b> Heavy-duty flatwork degreasing.', '<b>Pre-tourism season.</b> Schedule before summer traffic peaks.'], close: 'Commercial washing for Silver Bay North Shore businesses and public properties.', builtFor: 'Commercial service for Silver Bay Highway 61 retail and North Shore public buildings.', resultsEyebrow: 'Real Silver Bay Commercial Results' },
    blogSpotlight: 'Silver Bay takes direct Lake Superior wind with less harbor shelter than Two Harbors — mineral-rich spray and coastal algae make exterior cleaning essential, not optional, on lake-facing properties.',
  },

  'lake-nebagamon': {
    soft: {
      intro: 'Lake Nebagamon village and surrounding Douglas County townships battle lake-humidity streaks on shaded north shores, seasonal cabin siding, and full-time log and vinyl homes under dense pine canopy.',
      bullets: [
        '<b>North-shore lake humidity.</b> Shaded waterfront lots stay damp into fall.',
        '<b>Cabin and year-round mix.</b> Turnover cleaning and maintenance schedules differ — we plan both.',
        '<b>Log and cedar siding.</b> Gentle chemistry preserves rustic finishes on lake homes.',
        '<b>Wisconsin-side pollen.</b> Douglas County spring pollen bakes onto south walls by June.',
      ],
      close: 'Soft washing protects Lake Nebagamon log, vinyl, and cedar siding from humidity-driven algae without damaging lake-country finishes.',
      builtFor: 'Soft washing for Lake Nebagamon north-shore humidity, cabin siding, and Douglas County pine shade.',
      guarantee: 'Lake Nebagamon soft washes carry our one-year regrowth guarantee — for lake-country damp and shaded waterfront lots.',
      resultsEyebrow: 'Real Lake Nebagamon Results',
    },
    concrete: { intro: 'Lake Nebagamon driveways and boat-access concrete see sand, salt, and organic stains — hot water restores walkways and garage aprons across the lake community.', bullets: ['<b>Boat access aprons.</b> Trailer oil and lake organic stains.', '<b>Seasonal cabin drives.</b> Winter salt sits untouched until May.', '<b>Village walks.</b> Community flatwork and retail entries.', '<b>Sand and salt combo.</b> Heated treatment lifts embedded winter film.'], close: 'Hot-water washing restores Lake Nebagamon concrete for village homes and waterfront cabins.', builtFor: 'Concrete care for Lake Nebagamon boat access, cabin driveways, and village walks.', resultsEyebrow: 'Real Lake Nebagamon Concrete Results' },
    deck: { intro: 'Dock-side and lake-facing decks at Lake Nebagamon need soft washing to remove slippery algae before summer on the water.', bullets: ['<b>Dock algae safety.</b> Slippery surfaces before guest season.', '<b>Log cabin decks.</b> Gentle wash preserves rustic character.', '<b>Waterfront rails.</b> Priority cleaning on lake-facing treads.', '<b>Pre-stain prep.</b> Brighten before short WI sealing window.'], close: 'Deck restoration at Lake Nebagamon clears algae safely on docks and lake decks.', builtFor: 'Deck and dock care for Lake Nebagamon waterfront properties and log cabins.', resultsEyebrow: 'Real Lake Nebagamon Deck Results' },
    window: { intro: 'Lake Nebagamon window cleaning maximizes water views — streak-free glass inside and out for village homes and lake cabins.', bullets: ['<b>Water-view priority.</b> Lake-facing panes cleaned first.', '<b>Cabin turnover.</b> Interior and exterior before opening weekend.', '<b>Hard-water spots.</b> Mineral film on waterfront glass.', '<b>Village business glass.</b> Local retail and office schedules.'], close: 'Professional window cleaning at Lake Nebagamon — clearer views and guest-ready cabins.', builtFor: 'Window cleaning for Lake Nebagamon water views, cabin turnover, and village glass.', resultsEyebrow: 'Real Lake Nebagamon Window Results' },
    commercial: { intro: 'Lake Nebagamon-area businesses and rental properties need guest-ready curb appeal for Douglas County lake season.', bullets: ['<b>Rental turnover exteriors.</b> Fast facade and walk packages.', '<b>Lake resort presentation.</b> Before Memorial Day occupancy peaks.', '<b>Local retail entries.</b> Community business glass and walks.', '<b>Multi-cabin owners.</b> Route scheduling for portfolio properties.'], close: 'Commercial exterior cleaning for Lake Nebagamon rentals and lake-country businesses.', builtFor: 'Commercial washing for Lake Nebagamon rentals, resorts, and village businesses.', resultsEyebrow: 'Real Lake Nebagamon Commercial Results' },
    blogSpotlight: 'Lake Nebagamon is a Douglas County lake community — north-shore shade, cabin turnover, and log siding maintenance differ sharply from Twin Ports urban homes just across the state line.',
  },

  hibbing: {
    soft: {
      intro: 'Hibbing homes in North Hibbing, Howard Yocum, and along Bob Dylan Drive face Iron Range dust, long shaded winters, and algae on siding that has nothing to do with Lake Superior — mining-country grime and freeze-thaw cycles are the real drivers here.',
      bullets: [
        '<b>Taconite and road dust film.</b> Range traffic adds gray film to exteriors facing MN-169 and corridor roads.',
        '<b>Heavy winter snow load.</b> Organic debris under snowpack feeds spring mold on north walls.',
        '<b>North-slope shade.</b> Mature neighborhoods stay damp without lake humidity — shade alone is enough.',
        '<b>Updated and aging exteriors.</b> Low pressure protects both 1970s vinyl and renovated LP SmartSide.',
      ],
      close: 'Soft washing removes Range dust and algae from Hibbing siding without the damage pressure washing causes on Iron Range homes.',
      builtFor: 'Soft washing for Hibbing mining dust, Iron Range winters, and Mesabi neighborhood shade.',
      guarantee: 'Hibbing soft washes include our one-year regrowth guarantee — built for Range dust, long winters, and north-slope shade.',
      resultsEyebrow: 'Real Hibbing Results',
    },
    concrete: { intro: 'Hibbing driveways and commercial lots collect road salt, taconite dust, and oil stains — Bob Dylan Drive corridors and residential streets both need hot-water treatment after Range winters.', bullets: ['<b>Taconite dust embeds.</b> Mining-country film bonds to porous concrete.', '<b>Commercial lot oil.</b> Retail and industrial pads need degreasing.', '<b>Residential salt damage.</b> Every Range driveway holds chloride after plow season.', '<b>Hot water mandatory.</b> Cold rinses spread Range dust without removing it.'], close: 'Hot-water concrete washing penetrates what cold water leaves on Hibbing flatwork.', builtFor: 'Concrete washing for Hibbing taconite dust, road salt, and Iron Range commercial pads.', resultsEyebrow: 'Real Hibbing Concrete Results' },
    deck: { intro: 'Hibbing decks endure long winters and short summers — mildew and gray oxidation appear the moment snow melts.', bullets: ['<b>Snow mold on boards.</b> Spring green film across shaded decks.', '<b>Short stain window.</b> Prep wood fast before June rain.', '<b>North Hibbing shade.</b> Lots under mature trees need annual care.', '<b>Porch safety.</b> Slippery steps before summer gatherings.'], close: 'Deck soft washing in Hibbing clears mildew before the short Range sealing season closes.', builtFor: 'Deck restoration for Hibbing snow mold, Range winters, and shaded neighborhood decks.', resultsEyebrow: 'Real Hibbing Deck Results' },
    window: { intro: 'Hibbing window cleaning removes Range dust, pollen, and hard-water spots from homes and businesses — streak-free glass on the Mesabi.', bullets: ['<b>Mining dust haze.</b> Fine film dulls glass facing corridor roads.', '<b>Hard-water minerals.</b> Spot treatment on south-facing panes.', '<b>Commercial storefronts.</b> Bob Dylan Drive and downtown glass.', '<b>Interior bundles.</b> Full packages for maintained homes.'], close: 'Professional window cleaning in Hibbing — clearer light and sharper curb appeal on the Range.', builtFor: 'Window cleaning for Hibbing Range dust, pollen, and commercial storefront glass.', resultsEyebrow: 'Real Hibbing Window Results' },
    commercial: { intro: 'Hibbing retail, industrial, and municipal properties trust commercial-grade washing for heavy-duty Range conditions.', bullets: ['<b>Industrial equipment areas.</b> Degreased pads and loading zones.', '<b>Retail corridor storefronts.</b> Glass and facade together.', '<b>Municipal walks.</b> Salt removal for public entries.', '<b>COI for contracts.</b> Documentation for Range facilities.'], close: 'Commercial pressure washing built for Hibbing Iron Range industry and retail.', builtFor: 'Commercial washing for Hibbing industrial sites, retail corridors, and municipal properties.', resultsEyebrow: 'Real Hibbing Commercial Results' },
    blogSpotlight: 'Hibbing is Iron Range — taconite dust, MN-169 corridor film, and six-month winters define exterior maintenance here, not Lake Superior humidity. Range homeowners need copy that reflects mining-country reality.',
  },

  virginia: {
    soft: {
      intro: 'Virginia — the Mesabi Range&apos;s queen city — sees algae and Range dust on homes near Olcott Park, North Virginia, and downtown corridors where brick, vinyl, and wood exteriors all need finish-safe cleaning.',
      bullets: [
        '<b>Mesabi dust and pollen combo.</b> Industrial corridor film plus spring pollen coats south walls.',
        '<b>Olcott Park shade trees.</b> Historic neighborhood north faces stay damp under canopy.',
        '<b>Brick and vinyl mix.</b> Chemistry adjusted per material — one process does not fit all.',
        '<b>Busy Chestnut Street exposure.</b> Road film adds to organic growth on front-facing siding.',
      ],
      close: 'Soft washing clears Virginia Range dust and algae without surface damage — protecting the queen city&apos;s mix of historic and updated exteriors.',
      builtFor: 'Soft washing for Virginia Mesabi dust, Olcott Park shade, and mixed brick-vinyl exteriors.',
      guarantee: 'Virginia soft washes carry our one-year regrowth guarantee — for Range dust, park shade, and downtown corridor exposure.',
      resultsEyebrow: 'Real Virginia Results',
    },
    concrete: { intro: 'Virginia sidewalks, driveways, and commercial lots face salt, sand, and industrial dust — the queen city&apos;s concrete needs hot-water treatment after every Range winter.', bullets: ['<b>Chestnut Street walks.</b> Heavy foot and road traffic film.', '<b>Industrial dust embeds.</b> Mesabi film bonds without heated treatment.', '<b>Residential driveways.</b> North Virginia and Olcott Park aprons.', '<b>Municipal standards.</b> Clean public walks for downtown presentation.'], close: 'Hot-water washing restores Virginia concrete across the Iron Range&apos;s queen city.', builtFor: 'Concrete care for Virginia industrial dust, road salt, and downtown municipal walks.', resultsEyebrow: 'Real Virginia Concrete Results' },
    deck: { intro: 'Virginia decks and porches benefit from soft-wash restoration before Minnesota&apos;s short staining window — green growth under snow is normal here.', bullets: ['<b>Olcott Park neighborhood decks.</b> Shaded wood turns gray by May.', '<b>Porch safety.</b> Slippery steps on historic homes.', '<b>Pre-stain brightening.</b> Range homeowners book in late spring.', '<b>Fence coordination.</b> Match deck and perimeter on one visit.'], close: 'Deck restoration in Virginia preps wood for sealant that survives Iron Range winters.', builtFor: 'Deck care for Virginia historic porches, Olcott Park shade, and Range stain seasons.', resultsEyebrow: 'Real Virginia Deck Results' },
    window: { intro: 'Virginia window cleaning delivers streak-free glass for homes and commercial buildings facing busy Range streets.', bullets: ['<b>Downtown commercial glass.</b> Chestnut Street storefront schedules.', '<b>Range dust film.</b> Corridor-facing residential panes.', '<b>Hard-water treatment.</b> Mineral spots on older housing stock.', '<b>Interior + exterior.</b> Full clarity for maintained homes.'], close: 'Professional window cleaning in Virginia MN — bright glass on the Mesabi Range.', builtFor: 'Window cleaning for Virginia Range dust, downtown commercial glass, and residential hard-water.', resultsEyebrow: 'Real Virginia Window Results' },
    commercial: { intro: 'Virginia businesses along Chestnut Street and industrial partners need storefronts and equipment areas that look professional through Range winters.', bullets: ['<b>Downtown retail facades.</b> Glass, walks, and awning areas.', '<b>Industrial partners.</b> Heavy-duty pad degreasing.', '<b>Civic properties.</b> Municipal presentation standards.', '<b>Recurring maintenance.</b> Quarterly beats one emergency wash.'], close: 'Commercial-grade washing for Virginia MN retail, industrial, and civic properties.', builtFor: 'Commercial service for Virginia downtown retail, industrial partners, and civic sites.', resultsEyebrow: 'Real Virginia Commercial Results' },
    blogSpotlight: 'Virginia sits at the heart of the Mesabi Range — Olcott Park historic homes, Chestnut Street commercial dust, and industrial corridor film require local expertise, not North Shore lake templates.',
  },

  eveleth: {
    soft: {
      intro: 'Eveleth homes in Fayal, James, and surrounding townships see algae and grime from East Range freeze-thaw cycles — U.S. Hockey Hall of Fame pride meets the same tough winters and road salt that stain every Range community.',
      bullets: [
        '<b>East Range freeze-thaw.</b> Siding seams open and close with temperature swings — organic matter embeds deeper.',
        '<b>Grant Avenue corridor dust.</b> Road film adds gray haze to front-facing exteriors.',
        '<b>Township acreage and in-town homes.</b> Low pressure scales from Fayal ranches to city ranches.',
        '<b>Pre-winter maintenance.</b> Fall soft wash prevents mold under first snowpack.',
      ],
      close: 'Soft washing protects Eveleth siding through freeze-thaw cycles — removing algae and Range film without high-pressure damage.',
      builtFor: 'Soft washing for Eveleth East Range freeze-thaw, Grant Avenue dust, and township mixed siding.',
      guarantee: 'Eveleth soft washes include our one-year regrowth guarantee — for East Range winters and corridor dust exposure.',
      resultsEyebrow: 'Real Eveleth Results',
    },
    concrete: { intro: 'Eveleth driveways and municipal concrete along Grant Avenue collect heavy salt and Range dust — hot-water washing restores surfaces before summer stains set.', bullets: ['<b>Grant Avenue municipal walks.</b> Public flatwork and retail entries.', '<b>Residential salt embed.</b> Standard Range driveway maintenance each spring.', '<b>Township long drives.</b> Surface cleaners for rural approaches.', '<b>Industrial-adjacent oil.</b> Degreasing where needed.'], close: 'Hot-water concrete washing for Eveleth municipal, residential, and township flatwork.', builtFor: 'Concrete care for Eveleth road salt, Range dust, and Grant Avenue municipal walks.', resultsEyebrow: 'Real Eveleth Concrete Results' },
    deck: { intro: 'Eveleth outdoor spaces turn green under snow cover — soft-wash deck restoration clears mildew before summer on the East Range.', bullets: ['<b>Spring reveal surprise.</b> Green boards when snow melts in Fayal and James.', '<b>Short summer window.</b> Stain prep must happen early.', '<b>Porch and deck combos.</b> Historic homes with multi-level wood.', '<b>Safe for kids and guests.</b> Remove slippery algae before gatherings.'], close: 'Deck restoration in Eveleth prepares wood for the East Range&apos;s brief sealing season.', builtFor: 'Deck care for Eveleth snow mold, East Range winters, and township deck properties.', resultsEyebrow: 'Real Eveleth Deck Results' },
    window: { intro: 'Eveleth window cleaning removes dust, pollen, and hard-water film — streak-free for homes and local businesses on the East Range.', bullets: ['<b>Range dust on glass.</b> Corridor and township road film.', '<b>Local business storefronts.</b> Grant Avenue and downtown schedules.', '<b>Hard-water spots.</b> Mineral treatment on older panes.', '<b>Interior service.</b> Full home packages available.'], close: 'Window cleaning in Eveleth — professional clarity for East Range homes and businesses.', builtFor: 'Window cleaning for Eveleth Range dust, pollen, and local business glass.', resultsEyebrow: 'Real Eveleth Window Results' },
    commercial: { intro: 'Eveleth businesses and civic properties use commercial washing for professional, salt-free curb appeal through Range seasons.', bullets: ['<b>Civic building entries.</b> Municipal walks and glass.', '<b>Retail Grant Avenue.</b> Storefront presentation for local traffic.', '<b>Industrial flatwork.</b> Heavy-duty degreasing when required.', '<b>Event-season prep.</b> Hockey hall area businesses before tourism peaks.'], close: 'Commercial washing for Eveleth East Range businesses and civic properties.', builtFor: 'Commercial service for Eveleth civic sites, Grant Avenue retail, and East Range industry.', resultsEyebrow: 'Real Eveleth Commercial Results' },
    blogSpotlight: 'Eveleth is East Range — Fayal township acreage, Grant Avenue storefronts, and U.S. Hockey Hall of Fame tourism share freeze-thaw damage and road salt, not Lake Superior fog. Local copy should say Range, not shoreline.',
  },
};

export const SERVICE_PREFIX = {
  soft: 'soft-washing',
  concrete: 'concrete-washing',
  deck: 'deck-restoration',
  window: 'window-cleaning',
  resWindow: 'residential-window-cleaning',
  comWindow: 'commercial-window-cleaning',
  commercial: 'commercial-soft-washing',
  roof: 'roof-soft-washing',
  gutter: 'gutter-fascia-cleaning',
};

/** Map file prefix to elite data key */
export const FILE_TO_SERVICE = {
  'soft-washing': 'soft',
  'concrete-washing': 'concrete',
  'deck-restoration': 'deck',
  'window-cleaning': 'window',
  'residential-window-cleaning': 'resWindow',
  'commercial-window-cleaning': 'comWindow',
  'commercial-soft-washing': 'commercial',
  'roof-soft-washing': 'roof',
  'gutter-fascia-cleaning': 'gutter',
};

export function eliteFor(city, serviceKey) {
  const row = CITY_ELITE[city.slug];
  if (!row) return null;
  if (serviceKey === 'resWindow' || serviceKey === 'comWindow') {
    return row.window || null;
  }
  if (serviceKey === 'roof' || serviceKey === 'gutter') {
    return row.soft || null;
  }
  return row[serviceKey] || null;
}

export function blogSpotlight(city) {
  return CITY_ELITE[city.slug]?.soft?.blogSpotlight || CITY_ELITE[city.slug]?.blogSpotlight || null;
}
