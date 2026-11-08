/**
 * FIGHTER FORGE - MASTER SITE CONFIGURATION
 * 
 * ALL business-editable values are located in this ONE file.
 * Modify WhatsApp number, products, pricing, sizes, heights, stories,
 * and company details below without touching application code.
 */

export const siteConfig = {
  // ==========================================
  // BUSINESS DETAILS
  // ==========================================
  brandName: "FIGHTER FORGE",
  tagline: "BUILT FOR CHAMPIONS.",
  subTagline: "Premium Boxing Rings & MMA Cages, manufactured for fighters, gyms and pro events.",
  whatsappNumber: "+917838966576", // Official WhatsApp Number: +91 78389 66576
  email: "sales@fighterforge.com",
  phoneDisplay: "+91 78389 66576",
  address: {
    line1: "Fighter Forge Manufacturing Arena",
    line2: "Plot 88, Heavy Industrial Cluster, Phase II",
    city: "New Delhi",
    country: "India",
    pin: "110020"
  },
  socials: {
    instagram: "https://instagram.com/fighterforge",
    youtube: "https://youtube.com/@fighterforge",
    facebook: "https://facebook.com/fighterforge",
    linkedin: "https://linkedin.com/company/fighterforge"
  },
  communityWhatsappGroup: "https://chat.whatsapp.com/invite/FighterForgeInsidersPlaceholder",

  // ==========================================
  // BRAND COLORS & VISUAL TOKENS
  // ==========================================
  colors: {
    fightRed: "#E10B1F",
    deepBlack: "#0A0A0A",
    charcoal: "#1A1A1A",
    pureWhite: "#FFFFFF",
    steelGray: "#8C8C8C",
    forgeGold: "#C9A24B",
    charcoalDark: "#121212",
    charcoalLight: "#262626"
  },

  // ==========================================
  // BRAND COPY & SLOGANS
  // ==========================================
  slogans: [
    "BUILT FOR CHAMPIONS",
    "FORGED FOR THE FIGHT",
    "DISCIPLINE BUILDS CHAMPIONS",
    "THE ARENA STARTS HERE",
    "NO COMPROMISE. NO SHORTCUTS"
  ],

  // ==========================================
  // ELEVATION HEIGHT STANDARDS
  // ==========================================
  elevationStandards: {
    floor: {
      id: "floor",
      name: "Floor-Level",
      heightDescription: "0 ft (Flush ground mounting)",
      badge: "Gym & Sparring",
      badgeColor: "steel",
      description: "Direct ground bolt-down system. Low profile, fast installation, ideal for standard ceiling heights and heavy daily sparring."
    },
    training: {
      id: "1-2ft",
      name: "1–2 ft Elevated",
      heightDescription: "1–2 ft (≈30–60 cm)",
      badge: "Training & Event",
      badgeColor: "red",
      description: "Intermediate elevated arena feel. Superior spectator visibility, rigid steel substructure, ideal for showcase gyms, fight nights, and club competitions."
    },
    pro: {
      id: "3ft",
      name: "3 ft (≈100 cm)",
      heightDescription: "3 ft (≈100 cm) Official Pro Level",
      badge: "PRO COMPETITION HEIGHT",
      badgeColor: "gold",
      isPro: true,
      description: "Official sanctioning-body championship elevation. Engineered with multi-truss acoustic absorption, dual safety stairs, and judges platform mount points."
    }
  },

  // ==========================================
  // STATS (ANIMATED COUNTERS ON HOME)
  // ==========================================
  stats: [
    { label: "Years of Experience", value: 20, suffix: "+", description: "Heavy steel combat arena engineering & fabrication" },
    { label: "Arenas & Pro Championship Builds", value: 120, suffix: "+", description: "Sanctioned MMA & Boxing title fights and pro gyms outfitted" },
    { label: "Structural Steel Grade", value: 100, suffix: "%", description: "Heavy-gauge ISI certified high-tensile steel" },
    { label: "Customer Satisfaction", value: 99.8, suffix: "%", description: "Direct-from-factory warranty & support" }
  ],

  // ==========================================
  // CLIENT LOGOS (MOVING STRIP ON HOMEPAGE)
  // ==========================================
  clients: [
    { name: "APEX COMBAT CLUB", city: "Mumbai", category: "Pro MMA Gym" },
    { name: "IRON FIST BOXING ACADEMY", city: "Delhi NCR", category: "Elite Boxing" },
    { name: "TITAN FIGHT LEAGUE", city: "Bangalore", category: "Championship Promotion" },
    { name: "REDLINE COMBAT SPORTS", city: "Hyderabad", category: "Combat Arena" },
    { name: "STRIKE FORCE ARENA", city: "Pune", category: "Fight Training Center" },
    { name: "VALOR WARRIORS MMA", city: "Chandigarh", category: "Championship Cage" },
    { name: "BLACK BELT SANCTUARY", city: "Goa", category: "Combat Academy" },
    { name: "RUMBLE TITLE FIGHTS", city: "Kolkata", category: "Boxing Promotion" }
  ],

  // ==========================================
  // WHY FIGHTER FORGE (6 FEATURE BLOCKS)
  // ==========================================
  whyUs: [
    {
      icon: "ShieldAlert",
      title: "PRO-GRADE STEEL BUILD",
      description: "Constructed with cold-rolled, heavy-gauge structural steel tubes. Zero wobble, rock-solid anchor posts designed to withstand heavyweight world-class impact."
    },
    {
      icon: "Award",
      title: "COMPETITION-STANDARD SPECS",
      description: "Manufactured strictly adhering to Olympic Boxing, IBA, and Unified Rules of MMA dimensions, rope tensions, and safety clearances."
    },
    {
      icon: "Layers",
      title: "FLOOR & ELEVATED OPTIONS",
      description: "Available from space-saving floor-level setups up to our flagship 3 ft (100 cm) Pro Competition stage with vibration dampening."
    },
    {
      icon: "Palette",
      title: "FULLY CUSTOMIZABLE BRANDING",
      description: "Your gym logo printed high-contrast onto anti-slip canvas, corner pads, vinyl cage rail bumpers, and ring skirts. Own your arena."
    },
    {
      icon: "ShieldCheck",
      title: "SAFE PADDED FINISH",
      description: "High-density bonded EVA foam underlayment and heavy-duty ripstop vinyl cushions protect fighters' joints during heavy throws and takedowns."
    },
    {
      icon: "DollarSign",
      title: "DIRECT-FROM-FACTORY PRICING",
      description: "We manufacture every weld, bolt, canvas, and pad in-house. No reseller markups, no agency margins—pure direct factory value."
    }
  ],

  // ==========================================
  // HOW IT WORKS (4 STEPS)
  // ==========================================
  howItWorks: [
    {
      step: "01",
      title: "CHOOSE YOUR SETUP",
      description: "Select Boxing Ring or MMA Cage, pick your size, and choose floor-level or elevated height (1-2 ft or 3 ft Pro)."
    },
    {
      step: "02",
      title: "ADD TO ENQUIRY CART",
      description: "Bundle multiple arena units or gear items into your enquiry cart with your preferred quantities."
    },
    {
      step: "03",
      title: "SEND ON WHATSAPP",
      description: "Click once to dispatch your exact specifications, gym location, and custom requests directly to our head engineer's WhatsApp."
    },
    {
      step: "04",
      title: "GET PRICE & CONFIRM",
      description: "Receive instant factory pricing, floor-plan CAD blueprints, delivery timeline, and direct manufacturing confirmation."
    }
  ],

  // ==========================================
  // PRODUCT CATALOG: BOXING RINGS
  // ==========================================
  boxingRings: [
    {
      id: "ring-floor-01",
      name: "Floor Boxing Ring",
      category: "floor",
      tagline: "Low-Profile Daily Training & Hard Sparring Ring",
      price: null, // null = Show "PRICE ON WHATSAPP"
      priceNumeric: 185000,
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      badge: "POPULAR FOR GYMS",
      elevationType: "Floor-Level",
      elevationHeight: "0 ft (Flush ground frame)",
      sizes: ["12×12 ft", "14×14 ft", "16×16 ft", "18×18 ft", "20×20 ft"],
      defaultSize: "16×16 ft",
      specs: [
        "Heavy-duty 4-inch square steel corner posts",
        "4-strand synthetic leather wrapped competition ropes",
        "4 heavy corner cushions (1 Red, 1 Blue, 2 White/Black)",
        "Heavy duty turnbuckles with protective padded sleeves",
        "Anti-slip commercial heavy canvas with grommets",
        "Floor bolt anchoring hardware included"
      ],
      description: "Designed for gyms wanting pro boxing ring authenticity without requiring elevated structural clearance. Features our signature high-tensile 4-rope system and thick padded corner cushions."
    },
    {
      id: "ring-elevated-training-02",
      name: "Elevated Boxing Ring (1–2 ft)",
      category: "elevated",
      tagline: "Showcase Gym & Club Fight Night Elevation",
      price: null,
      priceNumeric: 295000,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      badge: "1–2 FT EVENT ELEVATION",
      elevationType: "1–2 ft Elevated",
      elevationHeight: "1–2 ft (≈30–60 cm)",
      heightOptions: ["1 ft (30 cm)", "1.5 ft (45 cm)", "2 ft (60 cm)"],
      defaultHeight: "2 ft (60 cm)",
      sizes: ["14×14 ft", "16×16 ft", "18×18 ft", "20×20 ft"],
      defaultSize: "18×18 ft",
      specs: [
        "Heavy I-beam steel interlocking subfloor frame",
        "Modular quick-connect steel cross members",
        "30mm sound-dampening acoustic subfloor panels",
        "High-density 25mm EVA shock absorption underlayment",
        "1 set of heavy steel access stairs",
        "Full wraparound branded ring apron skirt"
      ],
      description: "The ideal elevated platform for premium combat gyms and club fight events. Elevates fighters into clear view while keeping structural ceiling requirements accessible."
    },
    {
      id: "ring-elevated-pro-03",
      name: "Elevated Boxing Ring 3 ft Pro Competition",
      category: "elevated",
      tagline: "Official Championship Arena Height with Gold Pro Certification",
      price: null,
      priceNumeric: 440000,
      image: "https://images.unsplash.com/photo-1509563459871-33161a0eb649?q=80&w=1200&auto=format&fit=crop",
      badge: "PRO COMPETITION (3 FT)",
      isPro: true,
      elevationType: "3 ft (≈100 cm) Pro Level",
      elevationHeight: "3 ft (≈100 cm Official Pro Height)",
      heightOptions: ["3 ft (≈100 cm) Official Pro Height"],
      defaultHeight: "3 ft (≈100 cm) Official Pro Height",
      sizes: ["16×16 ft", "18×18 ft", "20×20 ft", "22×22 ft", "24×24 ft Championship"],
      defaultSize: "20×20 ft",
      specs: [
        "Full 3 ft (100 cm) pro championship clearance",
        "Industrial structural box-truss steel frame",
        "2 sets of welded steel stairs (Red and Blue corners)",
        "2 integrated corner stools (swivel or fold-away)",
        "Heavy acoustic vibration isolation pads on all footing posts",
        "Heavy-duty ring skirts with custom sponsor logo printing",
        "International Boxing Federation & Olympic compliance geometry"
      ],
      description: "The undisputed apex of fight manufacturing. Built strictly to international championship sanctioning standards with 100 cm elevation, dual fighter staircases, and heavy acoustic dampening."
    }
  ],

  // ==========================================
  // PRODUCT CATALOG: MMA CAGES
  // ==========================================
  mmaCages: [
    {
      id: "cage-floor-01",
      name: "Floor MMA Cage (Octagon)",
      category: "floor",
      tagline: "Heavy-Gauge 8-Sided Daily Sparring Octagon",
      price: null,
      priceNumeric: 260000,
      image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1200&auto=format&fit=crop",
      badge: "PRO GYM FAVORITE",
      elevationType: "Floor-Level",
      elevationHeight: "0 ft (Flush ground frame)",
      shapes: ["Octagon (8-Sided)"],
      sizes: ["16 ft Diameter", "20 ft Diameter", "24 ft Diameter", "30 ft Pro Diameter"],
      defaultSize: "20 ft Diameter",
      specs: [
        "Heavy steel tubular fence panel frames (6 ft fence height)",
        "Vinyl-coated heavy 9-gauge steel chainlink mesh (anti-catch)",
        "8 high-density foam upright post cushions with vinyl covers",
        "Heavy-duty secure latching steel access door",
        "Heavy ground anchor locking flanges",
        "Complete mat and canvas underlay system available"
      ],
      description: "The workhorse cage of top MMA fight camps. Mounts flush to the gym floor, delivering zero-sag fence panels and heavy vinyl coating that protects fighters' knuckles and toes during wall grappling."
    },
    {
      id: "cage-elevated-training-02",
      name: "Elevated MMA Cage (1–2 ft)",
      category: "elevated",
      tagline: "Tournament & Fight Night Octagon with Elevated Visibility",
      price: null,
      priceNumeric: 395000,
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop",
      badge: "1–2 FT ARENA CAGE",
      elevationType: "1–2 ft Elevated",
      elevationHeight: "1–2 ft (≈30–60 cm)",
      heightOptions: ["1 ft (30 cm)", "1.5 ft (45 cm)", "2 ft (60 cm)"],
      defaultHeight: "2 ft (60 cm)",
      shapes: ["Octagon (8-Sided)", "Hexagon (6-Sided)"],
      sizes: ["16 ft Diameter", "20 ft Diameter", "24 ft Diameter", "30 ft Pro Diameter"],
      defaultSize: "20 ft Diameter",
      specs: [
        "Interlocking structural steel floor framework",
        "Rigid tongue-and-groove acoustic wooden subfloor panels",
        "Seamless anti-tear vinyl mat with custom center logo",
        "1 access door with double fail-safe lock mechanism",
        "1 heavy steel stairway with non-slip treads",
        "Full 360-degree perimeter tension cabling"
      ],
      description: "Elevate your promotion or training academy. Engineered for quick assembly and structural stability, giving spectators an unobstructed view of brutal wall work and takedowns."
    },
    {
      id: "cage-elevated-pro-03",
      name: "Elevated MMA Cage 3 ft Pro Competition",
      category: "elevated",
      tagline: "Unified Rules UFC-Grade Championship Octagon Platform",
      price: null,
      priceNumeric: 580000,
      image: "https://images.unsplash.com/photo-1517438984742-1262db3b32bc?q=80&w=1200&auto=format&fit=crop",
      badge: "PRO COMPETITION (3 FT)",
      isPro: true,
      elevationType: "3 ft (≈100 cm) Pro Level",
      elevationHeight: "3 ft (≈100 cm Official Championship Height)",
      heightOptions: ["3 ft (≈100 cm) Championship Height"],
      defaultHeight: "3 ft (≈100 cm) Championship Height",
      shapes: ["Octagon (8-Sided)"],
      sizes: ["20 ft Diameter", "24 ft Diameter", "27 ft Championship", "30 ft Pro Stadium"],
      defaultSize: "24 ft Diameter",
      specs: [
        "Exact 3 ft (100 cm) pro stadium elevation clearance",
        "Dual heavy security doors (Fighter entry & Medic/Cutman entry)",
        "2 steel entrance staircases with safety handrails",
        "Ultra-heavy 100x100mm structural steel corner uprights",
        "Heavy acoustic subfloor dampening with zero reverberation",
        "Full vinyl perimeter skirts with sponsor print readiness",
        "Full certification report for sanctioning athletic commissions"
      ],
      description: "The definitive championship arena octagon. Manufactured for televised combat promotions and world-class MMA arenas demanding uncompromising safety, structural rigidity, and broadcast-ready aesthetics."
    },
    {
      id: "cage-hexagon-04",
      name: "Hexagon MMA Training Cage (Floor / Raised)",
      category: "floor",
      tagline: "Compact 6-Sided Training Cage for Space-Constrained Academies",
      price: null,
      priceNumeric: 220000,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      badge: "COMPACT FOOTPRINT",
      elevationType: "Floor / 1 ft Optional",
      elevationHeight: "0–1 ft",
      shapes: ["Hexagon (6-Sided)"],
      sizes: ["14 ft Diameter", "16 ft Diameter", "18 ft Diameter"],
      defaultSize: "16 ft Diameter",
      specs: [
        "Space-saving 6-panel geometry",
        "Quick-latch pin connection system for fast installation",
        "Heavy 9-gauge smooth vinyl dip mesh",
        "6 thick bumper pads with gym color customization",
        "Single outward-opening access door",
        "Optimized for cage grappling drilling"
      ],
      description: "Ideal for martial arts academies that need cage wall training but have limited square footage. Fast to erect and easy to relocate."
    }
  ],

  // ==========================================
  // STORIES / BLOG FOR ATHLETES, RINGS & SEO
  // ==========================================
  stories: [
    {
      id: "pro-elevation-standard-3ft",
      slug: "why-3ft-elevated-boxing-rings-are-pro-gold-standard",
      title: "Why 3 ft (100 cm) Elevated Rings are the Gold Standard for Championship Boxing",
      category: "Ring Engineering",
      author: "Vikram Rathore, Lead Arena Structural Engineer",
      date: "October 24, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      excerpt: "From spectator eye-line physics to judge sightlines and subfloor shock acoustics, discover why sanctioning bodies require 100 cm elevation for title fights.",
      content: `
When a world-class fighter steps onto an elevated canvas, milliseconds and millimeters matter. In professional boxing, the height of the platform is far from an aesthetic choice—it is a tightly regulated structural standard.

### 1. The Physics of Spectator & Judge Eye-Levels
A 3 ft (approximately 100 cm) platform raises the ring canvas precisely into the natural horizontal eye-level of ringside judges and medics sitting in arena seating. When judges view footwork from below, subtle shifts in balance, pivot slips, and low blows become unmistakably visible.

### 2. Acoustic Absorption and Canvas Rebound
Fighter Forge 3 ft Pro Competition rings incorporate an acoustic vibration-dampening box truss. When two heavyweights clash, standard timber platforms amplify the vibration, causing canvas bounce that fatigues ankle tendons. Our dual-layer subfloor with industrial elastomer dampers absorbs impact while returning firm traction.

### 3. Safety Clearances and Corner Rigidity
At 100 cm elevation, structural corner posts must resist over 2,200 kg of lateral rope tension. Fighter Forge builds with cold-rolled industrial square steel and heavy base gussets, guaranteeing zero post deflection when fighters lean hard on the ropes.
      `,
      tags: ["Boxing Rings", "Pro Arena", "Engineering", "Championship Specs"]
    },
    {
      id: "cage-geometry-octagon-vs-hexagon",
      slug: "octagon-vs-hexagon-engineering-cage-geometry",
      title: "Octagon vs Hexagon: Engineering Cage Geometry for Fighter Safety and Flow",
      category: "Cage Standards",
      author: "Coach Aryan Sen, Combat Sports Director",
      date: "October 18, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1200&auto=format&fit=crop",
      excerpt: "How wall angles impact takedown defense, corner trapping, and fighter safety. A complete breakdown for gym owners planning their cage installation.",
      content: `
Choosing the right cage geometry is one of the most critical investments an MMA gym owner makes. While the Octagon remains the worldwide standard made famous by the UFC, 6-sided Hexagons have carved out a strategic training role.

### The Octagon (135° Angles)
The 8-sided geometry creates wide 135-degree interior angles. This prevents fighters from getting trapped in tight 90-degree corners, forcing continuous circular movement, lateral pivoting, and technical wall-walks. It mimics the exact arena dimensions fighters face in professional bouts.

### The Hexagon (120° Angles)
For gyms with space constraints under 600 sq ft, the 6-sided cage allows an effective training radius with fewer modular sections. The slightly tighter 120-degree angles are exceptional for teaching takedown containment and corner cutting during sparring drills.

### Mesh Tension and Vinyl Dipping
Regardless of shape, wire gauge makes or breaks safety. Fighter Forge utilizes heavy 9-gauge steel wire dipped in smooth, medical-grade vinyl. This eliminates burrs that cause cuts during takedown drives and ensures zero finger-snag.
      `,
      tags: ["MMA Cages", "Cage Geometry", "Gym Planning", "Fighter Safety"]
    },
    {
      id: "pro-fight-gym-equipment-blueprint",
      slug: "from-gym-to-glory-choosing-arena-grade-equipment",
      title: "From Gym to Glory: The Blueprint for Choosing Elite Combat Sports Equipment",
      category: "Athletes & Fight Science",
      author: "Devraj Chauhan, Strength & Combat Conditioning",
      date: "October 12, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Elite athletes don't train on wobbling equipment. Learn how top-tier gyms build training environments that forge national and world champions.",
      content: `
A fight gym is defined by its steel. When fighters enter an arena, confidence comes from familiarity with professional-grade surfaces.

### 1. Eliminating Wobble
Cheap imported rings shake on every step. That vibration ruins rhythm and telegraphs movement. Fighter Forge interlocking structural cross-beams eliminate 98% of sway, creating an unwavering stage.

### 2. High-Density EVA Foam vs Cheap Polyethylene
Standard foam bottoms out within six months under heavy sparring, exposing plywood beneath. Fighter Forge specifies 25mm to 30mm high-density cross-linked EVA foam that maintains shock absorption for years.

### 3. The Psychology of Custom Branding
When fighters see their team insignia emblazoned sharply across the canvas and corner pads, pride and discipline surge. Our dye-sublimated non-slip vinyls maintain grip even when drenched in sweat.
      `,
      tags: ["Gym Blueprint", "Combat Athletes", "Pro Gear", "Discipline"]
    },
    {
      id: "inside-the-steel-manufacturing",
      slug: "inside-the-steel-what-separates-fighter-forge-manufacturing",
      title: "Inside the Steel: What Separates Fighter Forge from Commercial Clones",
      category: "Ring Engineering",
      author: "Fighter Forge Fabrication Lab",
      date: "October 05, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop",
      excerpt: "A behind-the-scenes look at our laser cutting, precision robotic welding, high-tensile turnbuckles, and zero-compromise quality tests.",
      content: `
We founded Fighter Forge with one rule: **No Compromise. No Shortcuts.**

Every weld in our New Delhi manufacturing facility is executed to structural architectural standards. We don't use hollow sheet-metal tubes that dent when a 90kg fighter crashes into them. We use certified structural tubing, heavy gusset plates, and electrostatically powder-coated finishes that resist sweat corrosion for a lifetime.

When you purchase Fighter Forge, you deal directly with the engineers who cut, weld, and inspect your arena.
      `,
      tags: ["Manufacturing", "Steel Fabrication", "Quality Control", "Made In India"]
    },
    {
      id: "upcoming-combat-gear-ergonomics",
      slug: "upcoming-gear-science-behind-fighter-forge-boxing-gloves",
      title: "Upcoming Combat Gear: The Science Behind Fighter Forge Ergonomic Gloves & Armor",
      category: "Arena News & Events",
      author: "Fighter Forge R&D Team",
      date: "September 28, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1509563459871-33161a0eb649?q=80&w=1200&auto=format&fit=crop",
      excerpt: "A preview of our upcoming pro sparring gloves, shin guards, and combat duffels—engineered with multi-layered shock dissipation foam.",
      content: `
After outfitting hundreds of fight gyms with rings and cages, our fighters demanded gear forged with the same brutal standard.

Coming soon from Fighter Forge:
- **Pro Sparring Boxing Gloves (12oz, 14oz, 16oz):** Anatomical fist alignment with triple-density injection foam and reinforced wrist stability.
- **MMA Competition Gloves:** Ergonomic curve to minimize eye poke risk while maximizing thumb articulation for submissions.
- **Heavy Combat Duffel Bags:** Military-grade ripstop fabric with ventilated wet gear compartments.

Join our Insider WhatsApp Group or submit your gear design ideas below to get early prototype testing access!
      `,
      tags: ["Combat Gear", "Boxing Gloves", "Coming Soon", "Gear R&D"]
    }
  ],

  // ==========================================
  // COMING SOON GEAR & COMMUNITY INITIATIVES
  // ==========================================
  upcomingGear: {
    title: "GEAR LOCKER: COMING SOON",
    subtitle: "BOXING GLOVES & MORE COMBAT GEAR",
    description: "We are finalizing our pro-grade sparring gloves, fight shorts, shin armor, and heavy combat bags. Built with genuine leather, high-density multi-layer foam, and the Fighter Forge shield.",
    categories: [
      { name: "Pro Boxing Gloves (12oz, 14oz, 16oz)", status: "Prototype Testing" },
      { name: "MMA Pro Sparring & Fight Gloves", status: "Design Finalized" },
      { name: "Heavy Combat Duffels & Gear Bags", status: "Materials Sourcing" },
      { name: "Muay Thai & MMA Shin Guards", status: "Engineering Phase" }
    ]
  },

  // ==========================================
  // EVENT RENTALS (NATIONWIDE INDIA - IPBL & PRO MMA)
  // ==========================================
  eventRentals: {
    badge: "NATIONWIDE EVENT RENTALS",
    title: "RENT BOXING RINGS & MMA CAGES FOR EVENTS IN INDIA",
    tagline: "Official Arena Rental Partner for IPBL (India Pro Boxing League) & Pro MMA Events",
    description: "We provide competition-standard Boxing Rings and MMA Cages on rental for professional events across India—including IPBL (India Pro Boxing League), state championships, and mid-pro to UFC-level fight promotions. Complete package includes structural steel arena, shock-absorbing platform, on-site setup crew, and teardown.",
    features: [
      "Official IPBL (India Pro Boxing League) standard rings",
      "Unified Rules 20ft & 24ft Elevated Championship MMA Octagons",
      "Full professional setup, leveling & dismantle crew included",
      "Custom sponsor branding available for canvas, skirts & corner pads",
      "Heavy acoustic subfloor dampening for zero camera bounce",
      "Nationwide express logistics & on-time event dispatch across India"
    ],
    supportedEvents: [
      "IPBL (India Pro Boxing League)",
      "Pro MMA Fight Nights & Title Fights",
      "State & National Boxing Tournaments",
      "Broadcast, OTT & Televised Combat Shows",
      "Collegiate & Invitational Fight Galas"
    ]
  }
};
