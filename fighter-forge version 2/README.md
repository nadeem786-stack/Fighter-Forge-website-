# FIGHTER FORGE — OFFICIAL PRODUCTION PLATFORM
**BUILT FOR CHAMPIONS • FORGED FOR THE FIGHT • DISCIPLINE BUILDS CHAMPIONS**

A complete, production-grade e-commerce & arena quotation website for **FIGHTER FORGE**, manufacturers of championship-grade Boxing Rings, MMA Cages, and upcoming combat sports gear.

---

## 🥊 BRAND & VISUAL IDENTITY
Strictly adhering to the Fighter Forge brand guidelines:
- **Fight Red (#E10B1F):** Primary CTAs, active badges, red glow highlights, diagonal slash accents
- **Deep Black (#0A0A0A):** Main arena background and cinematic contrast
- **Charcoal (#1A1A1A / #141414):** Cards, section backgrounds, chamfered containers
- **Pure White (#FFFFFF):** Headings and crisp readability
- **Steel Gray (#8C8C8C):** Secondary technical specs, borders, and sub-labels
- **Forge Gold (#C9A24B):** 3 ft (100 cm) Pro Competition badges, thin foil lines, and bespoke CAD touches
- **Typography:** Heavy condensed display headings (`Bebas Neue` / `Anton` / `Teko`) with uppercase tracking and modern sans (`Barlow` / `Inter`) body copy.
- **Logos:** The exact Fighter Forge horizontal logo is featured in the Sticky Navbar and Footer, the shield icon powers the Favicon, loading screen, and large faded watermarks.

---

## ⚡ ALL CONFIG IN ONE PLACE
All business-editable values are consolidated into a single configuration file:
📁 **`src/config/siteConfig.js`**

Open this file to edit:
1. **WhatsApp Number:** `whatsappNumber` (e.g. `+919876543210` or your actual number)
2. **Contact Info:** Business email, factory address, social media links
3. **Products & Catalog:** Sizing, heights, spec chips, pricing (or "PRICE ON WHATSAPP")
4. **Elevation Standards:** 0 ft Floor, 1–2 ft Training, 3 ft (≈100 cm) Pro Competition
5. **Client Logos:** Gym names, cities, and categories for the moving marquee strip
6. **Brand Slogans:** Animated marquee strings
7. **Stories (Blog):** SEO articles on athletes, ring engineering, cage standards, and upcoming gear
8. **Stats Counter:** Arenas outfitted, championship builds, structural steel rating

---

## 🚀 HOW TO RUN

### Option 1: Unified Server (Instant zero-dependency launch)
Run the pre-configured launcher:
```bash
start.bat
```
Or with Node:
```bash
node server.js
```
Open **`http://localhost:3000`** in your browser.

### Option 2: Python FastAPI + MongoDB Backend
1. Install requirements:
```bash
pip install -r backend/requirements.txt
```
2. Start MongoDB (optional, automatic JSON backup fallback if MongoDB is not running).
3. Run the API:
```bash
uvicorn backend.main:app --reload --port 8000
```

---

## 🌐 PAGES & FEATURES INCLUDED
1. **HOME PAGE (`/`):**
   - Full-bleed dark arena hero with spotlights, "BUILT FOR CHAMPIONS", dual CTAs
   - **Client Logo Moving Strip:** Continuous right-to-left marquee showcasing elite academies
   - **Two Big Category Cards:** Split screen Boxing Rings & MMA Cages with red slash accents
   - **Slogan Marquee:** "BUILT FOR CHAMPIONS • DISCIPLINE BUILDS CHAMPIONS"
   - **Why Fighter Forge:** 6 structural engineering feature blocks
   - **Elevation Spotlight:** Interactive side-view blueprint diagram (Floor vs 1-2 ft vs 3 ft Pro)
   - **Customize Section:** "YOUR RING. YOUR CAGE. YOUR BRAND."
   - **How It Works:** 4 transparent steps from cart to WhatsApp quote
   - **Gear Locker Teaser:** "Boxing Gloves & More Combat Gear: Coming Soon" + Community Idea Builder
   - **Animated Stats Bar:** Interactive counters on scroll
   - **Final CTA Banner:** "READY TO BUILD YOUR ARENA?"

2. **BOXING RINGS (`#/boxing-rings`):**
   - Filter tabs: All Rings | Floor-Level Rings | Elevated Rings
   - Height selector with 1–2 ft and **3 ft (≈100 cm) Pro Competition** with Gold Badge
   - Product cards with size selection (12×12 up to 24×24 ft), quantity stepper, Add to Cart
   - Quick-view modal with full blueprints and specs

3. **MMA CAGES (`#/mma-cages`):**
   - Floor Octagons and Elevated Cages (1-2 ft & 3 ft Pro)
   - Diameters: 16 ft, 20 ft, 24 ft, 30 ft + Hexagon training cages
   - High-impact post bumper specs, 9-gauge vinyl-dipped mesh, security door options

4. **YOUR ENQUIRY CART (`#/cart`):**
   - Browser-persisted cart (localStorage)
   - Factory Direct Policy Notice (No online payment, WhatsApp quotation)
   - Dispatch Logistics Form (Name, Phone, City, Notes)
   - **"SEND ENQUIRY ON WHATSAPP"**: Saves to backend database and opens pre-filled WhatsApp chat

5. **CUSTOMIZE YOUR RING / CAGE (`#/customize`):**
   - Step 1: Pick Boxing Ring vs MMA Cage
   - Step 2: Custom size, rope colors, canvas color, corner pads, branding toggle, stairs
   - Step 3: Drag-and-drop reference photo & logo upload (up to 5 photos, max 10MB)
   - Generates bespoke WhatsApp message with photo links

6. **STORIES / BLOG (`#/stories`):**
   - Combat Science, Ring Engineering, Cage Standards, and News for SEO
   - 5 seeded in-depth articles with author, reading time, tags, and reading modal
   - "Consult on WhatsApp" CTA inside articles

7. **GLOBAL COMPONENTS:**
   - Sticky Navbar with horizontal logo, prominent Rings & Cages links, cart badge, "GET A QUOTE" button
   - Floating WhatsApp button with pulse glow and greeting tooltip
   - Loading screen featuring pulsing Fighter Forge shield
   - Footer with tagline, contact details, social links, and upcoming gear notice
