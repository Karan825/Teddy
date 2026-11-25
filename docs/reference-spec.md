# TeddyPups Reference Specification

> **Site Under Analysis**: `https://puppy.instabizweb.com/`  
> **Source Capture**: `reference-pack/` (Playwright captures: Desktop 1440×900, Tablet 768×1024, Traces, JSON data, Network snapshot, and Video recordings)  
> **Tech Stack of Reference**: Next.js App Router (React Server Components), Tailwind CSS, Lenis Smooth Scroll, Canvas 2D (Paw trails), SVG puppet animation system.

---

## 1. System Overview & Aesthetic

TeddyPups U.A.E. is a boutique luxury pet adoption service offering premium teacup and toy puppies in Dubai (in-person meetups and ethically sourced imports).

The aesthetic is **storybook luxury / whimsical editorial**:
- Warm, tactile, nostalgic palette (rich espresso cocoa, buttery honey, terracotta toffee, soft milk cream, blush pink, and sky blue).
- Handcrafted storybook typography pairing an expressive serif display with clean sans body text and spontaneous handwritten scrawl notes.
- Whimsical physical metaphors: letter-mail posting animations, rubber-inked inspection stamps, 3D rotating wooden doors, and interactive sketch cards.
- Live character animation: A dedicated mascot puppy ("Teddy") that navigates alongside the user down the entire page, shifting poses and reacting to sections, paired with a cursor-following paw-print trail on canvas.

---

## 2. Design System & Tokens

### 2.1 Color Palette

Extracted directly from compiled stylesheet custom properties:

| Variable Name | Hex Code | Role & Usage |
|---|---|---|
| `--color-milk` | `#fffdf8` | Primary document background, card interiors, speech bubbles |
| `--color-cocoa` | `#2a170e` | Primary text, borders, SVG strokes, deep buttons |
| `--color-cocoa-soft`| `#5a3a28` | Secondary body text, captions, metadata labels |
| `--color-toffee` | `#c2622b` | Primary warm accent, interactive links, heart particles |
| `--color-toffee-deep`| `#a24a1a` | Hover states, active accents, focus rings |
| `--color-toffee-ink` | `#8e3f15` | High-contrast accent text, stamp ink |
| `--color-honey` | `#f2be6b` | Puppy fur primary fill, sunny highlights, primary buttons |
| `--color-honey-soft`| `#fbe3b4` | Muzzle & belly fluff, subtle badge backgrounds, cards |
| `--color-blush` | `#f9cdbf` | Puppy cheek blushes, soft decorative tags |
| `--color-sky` | `#bfddf5` | Daylight accents, trust stamp highlights, sky gradient |
| `--color-sky-deep` | `#2f6e9e` | Deep sky blue text accents |

### 2.2 Typography

Declared fonts in CSS and runtime font loading:

1. **Display Font**: `Fraunces` (`font-display`, variable weight `100` to `900`)
   - Fallbacks: `ui-serif`, `Georgia`, `serif`
   - Usage: Page headings (`h1`, `h2`), section titles, prominent card titles.
2. **Body / Interface Sans**: `Figtree` (`font-sans`, variable weight `300` to `900`)
   - Fallbacks: `ui-sans-serif`, `system-ui`, `sans-serif`
   - Usage: Body copy, navigation links, metadata descriptions, form inputs.
3. **Handwritten / Script Accent**: `Shantell Sans` (`font-hand` / `font-scrawl`, variable weight `300` to `800`)
   - Fallbacks: `ui-rounded`, `"Comic Sans MS"`, `cursive`
   - Usage: Speech bubbles (`pup-bubble`), handwritten notes on letterforms, decorative stamps, handwritten sticky labels.

### 2.3 Layout Metrics & CSS Variables

- **Gutter**: `--gutter: clamp(1rem, 4vw, 3.5rem)`
- **Header Height**:
  - Desktop: `--header-h: 4.75rem` (76px)
  - Mobile/Tablet: `--header-h: 4rem` (64px)
- **Mobile Bottom Bar Height**:
  - Desktop: `--bar-h: 0px`
  - Mobile: `--bar-h: calc(4rem + env(safe-area-inset-bottom))`
- **Accent Color**: `var(--color-toffee-deep)`

### 2.4 Easing Curves

- `--ease-pounce`: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshooting elastic bounce for bubbles and badges)
- `--ease-silk`: `cubic-bezier(0.22, 1, 0.36, 1)` (smooth deceleration for doors and drawers)
- `--ease-snap`: `cubic-bezier(0.7, 0, 0.2, 1)` (snappy spring)
- `--ease-out`: `cubic-bezier(0, 0, 0.2, 1)`
- `--ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)`

---

## 3. Global Frameworks & Chronic Elements

### 3.1 Header (`tp-header`)
- **Structure**:
  - Fixed position: `fixed inset-x-0 top-0 z-50`
  - Height: `h-[var(--header-h)]`
  - Container: Max-width boxed with `--gutter` padding, flex align-center, justify-between.
  - Left: Logo lockup linking to `/` (`/brand/logo.png` + "TeddyPups" text).
  - Center: Nav link group (hidden on mobile, visible on `lg:`):
    - `Home` (`/`)
    - `Puppies` (`/puppies`)
    - `Happy families` (`/happy-families`)
    - `How it works` (`/how-it-works`)
    - `FAQ` (`/faq`)
    - `Visit & contact` (`/contact`)
  - Right:
    - WhatsApp pill button: `WhatsApp us` linking to `https://wa.me/919898124987`
    - Hamburger toggle button: `Menu` (visible `<lg`, triggers `MobileMenu`).
- **Scroll Behavior**: Backdrop blur/soft tint applied on scroll via `HeaderBehavior`.

### 3.2 Mobile Menu Drawer (`MobileMenu`)
- **Structure**:
  - Circular clip-path reveal animation:
    - Opening: `@keyframes tp-menu-in` (`clip-path: circle(0% at calc(100% - 3rem) 2rem)` → `circle(150%...)`)
    - Closing: `@keyframes tp-menu-out`
  - Fullscreen overlay with cocoa/milk styling.
  - Staggered navigation links with tilt entrance (`tp-menu-link`: translateY + rotate -2deg).
  - Quick contact details (WhatsApp, phone, location) inside the drawer.

### 3.3 Mobile Bottom Action Bar
- **Structure**:
  - CSS: `fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden`
  - Two primary action buttons:
    1. `WhatsApp us` (primary button, honey background with cocoa border)
    2. `Call` (`tel:+971500000000`, outlined pill)

### 3.4 Footer (`tp-footer`)
- **Structure**:
  - CSS: `tp-footer relative pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10 bg-cocoa`
  - **Basket Mascot Stop**: `<div class="pup-stop tp-basket__pup" data-pup-stop="true" data-pose="snug" data-act="basket" data-behind="true" data-lane="true">` — The floating puppy curls up and sleeps in a woven basket illustration at the top of the footer!
  - 3-column responsive grid:
    1. **Brand column**: Logo, short description, address ("Downtown Dubai, United Arab Emirates").
    2. **Explore Navigation**: Available puppies, Gone home, Happy families, How it works, Delivery & collection, FAQ, Visit & contact.
    3. **Say Hello / Contact**: Direct WhatsApp link (`+971 50 000 0000`), Email (`info@instabizweb.com`), Social pills (Instagram, TikTok, Facebook).
  - Bottom bar: Copyright `© 2026 TeddyPups U.A.E.`, legal disclaimer regarding ethical pet placement.

### 3.5 Global Interactive Canvas: `PawTrailCanvas`
- **Markup**: `<canvas aria-hidden="true" class="pointer-events-none fixed inset-0 z-[70] size-full" width="1440" height="900"></canvas>`
- **Behavior**:
  - Listens to global `pointermove` / `mousemove`.
  - Spawns pairs of alternating puppy paw prints (left paw, right paw) along the cursor path.
  - Each paw print renders 1 main paw pad + 4 toe pads in `--color-cocoa` at low initial opacity (~0.18-0.25), rotates towards mouse trajectory, and smoothly fades out over 1.2-1.8 seconds.
  - On touch devices (`(pointer: coarse)` or mobile viewports), the canvas disables particle generation to conserve CPU/battery.

### 3.6 Route Transition Curtain: `RouteCurtain`
- **Markup**: `<div class="tp-curtain fixed none none">`
- **Keyframe Sequence**:
  - Navigation start: `tp-curtain-cover` (slides up from `translateY(calc(100% + 44px))` to `translateY(0)`).
  - Center illustration: Running puppy character (`tp-runner-x`, `tp-runner-leg-a`, `tp-runner-leg-b`, `tp-runner-wag`, `tp-runner-ear`, leaving pawprints `tp-print-step`).
  - Page loaded: `tp-curtain-lift` (slides out to `translateY(calc(-100% - 44px))`), then `tp-curtain-rest` (`visibility: hidden`).

---

## 4. The Floating Mascot System ("Teddy")

The floating puppy mascot is the central interactive hallmark of the website. It is an SVG vector puppet controlled by a scroll-driven physics/state machine.

### 4.1 Architecture & DOM Elements

1. **Height Probe**: `<div class="pup-probe" aria-hidden="true"></div>`
   - Fixed invisible element (`width: 0; height: 100svh; position: fixed; top: 0; left: 0; visibility: hidden;`) used to compute true mobile/desktop viewport heights without URL bar jump artifacts.
2. **Fixed Layer**: `<div class="pup-layer" data-anchor="top" data-front="false"></div>`
   - `position: fixed; inset: 0; contain: layout paint style; pointer-events: none; overflow: clip;`
   - Depth sorting:
     - `data-front="false"`: `z-index: 15` (mascot floats behind foreground hero cards, bed baskets, or letter trays).
     - `data-front="true"`: `z-index: 30` (mascot floats on top of text, cards, and section boundaries).
3. **Actor Container**: `<div class="pup-actor" data-holding="true" style="transform: translate3d(x, y, 0px);">`
   - `position: absolute; top: 0; left: 0; will-change: transform;`
   - Direct translation based on interpolated coordinates.
4. **Actor Body & Scaling**: `<div class="pup-actor__body" style="transform: scale(s);">`
   - Width: `300px`; height: `240px`.
   - Scaled between 0.85 (compact/mobile) to 1.55 (desktop hero).
5. **Speech Bubble**: `<span class="pup-bubble-at"><span class="pup-bubble" data-show="true|false">Message</span></span>`
   - Styled with `--color-cocoa` border (2.5px), `--color-milk` fill, `--font-hand` font.
   - Bounces into view when certain stops are reached or when clicked.

### 4.2 SVG Puppet Rig Anatomy (`viewBox="0 0 300 240"`)

The mascot SVG consists of distinct semantic group elements tagged with `data-p`:
- `data-p="root"`: Master transform group, centering at `translate(150, 0) scale(facing, 1) translate(-150, 0)`.
- `data-p="shadow"`: Ellipse ground shadow (`cx="150" cy="230" rx="92" ry="7" fill="#2a170e"`), scales and fades with altitude.
- `data-p="body"`: Main body torso fluff paths (`#f2be6b` with `#2a170e` 3.4px outline).
- `data-p="bf"` / `data-p="bn"`: Back far leg and back near leg.
- `data-p="ff"` / `data-p="fn"`: Front far leg and front near leg.
- `data-p="tail"`: Tail path with rotating fluff tip (`rotate(deg 84 150)`).
- `data-p="head"`: Head fluff, cheeks (`#f9b9a6` blush circles at cx=181 and 243).
- `data-p="earL"` / `data-p="earR"`: Fluffy ears with independent twitch/angle (`rotate(-6 174 82)`).
- `data-p="eyes"`:
  - `data-p="open"`: Glossy black eyes (`#2a170e` ellipse with white specular reflections).
  - `data-p="blink"`: ScaleY collapse for blinking (`@keyframes tp-blink-open / tp-blink-shut`).
  - `data-p="happy"`: Curved happy eye arcs.
  - `data-p="shut"`: Closed sleeping eye lines.
- `data-p="tongue"`: Cute pink tongue (`#e98c8c`) that peeks out.
- `data-p="mouth"`: Open panting mouth shape.
- `data-p="ledge"`: Paws resting over a ledge (used during `peek` pose).

### 4.3 Mascot Poses & Actions

| Pose | Act | Facing | Description |
|---|---|---|---|
| `peek` | `peekaboo` | `right` | Puppy peeks over the hero card/border, paws resting on ledge, blinking. |
| `walk` | `treadmill` | `right` | Legs cycle (`tp-runner-leg-a / b`), tail wags, body bobs as user scrolls. |
| `sit` | `None` / `tilt`| `right` | Standard sitting posture, gentle breathing (`tp-breathe`), occasional head tilt. |
| `bow` | `None` | `right` | Playful bow (front paws extended down, tail up in greeting). |
| `snug` | `basket` | `right` | Curled up asleep in the footer basket (`data-p="shut"` eyes active). |

### 4.4 Waypoint Stops Across Routes

- **Homepage (`/`) Stops (9 total)**:
  1. `tp-hero__teddy`: Hero section top-right (`pose: peek`, `act: peekaboo`, `behind: true`).
  2. `tp-meet__teddy`: "Meet the pups" section (`pose: walk`, `act: treadmill`).
  3. `tp-fork__teddy`: "Two ways to meet your puppy" section (`pose: sit`).
  4. `tp-chat__teddy`: "Your puppy journey" chat simulation (`pose: sit`).
  5. `tp-book__teddy`: "Why families trust TeddyPups" guarantee stamps (`pose: sit`).
  6. `tp-dusk__teddy`: "Happy families" photo wall (`pose: sit`).
  7. `tp-night__teddy`: "Questions, answered" night sky section (`pose: sit`, `act: tilt`).
  8. `tp-house__teddy`: Final CTA house entrance (`pose: bow`).
  9. `tp-basket__pup`: Footer snuggle basket (`pose: snug`, `act: basket`, `behind: true`).
- **All Secondary Routes** (`/puppies`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, `/gone-home`, `/puppies/[slug]`):
  - Each secondary page has 1 primary mascot stop in the footer (`tp-basket__pup` snug in basket).

### 4.5 Interactive Mascot Reactions

- Clicking or tapping on the mascot:
  - Spawns floating hearts (`<span class="pup-heart">❤️</span>`) floating up and fading.
  - Triggers a playful tail wag and ear perk.
  - Toggles a random speech bubble ("Woof!", "Looking for a buddy?", "I'm ready for cuddles!").

---

## 5. Detailed Page-by-Page Specification

### 5.1 Route 1: Homepage (`/`)
- **Document Title**: `TeddyPups U.A.E. — Premium teacup puppies in Dubai`
- **Total Scroll Height (Desktop 1440px)**: 12,686 px (20 scroll viewport increments)
- **Sections in Exact Order**:

#### Section 1: Hero (`data-section="hero"`, class `tp-hero`)
- **Visuals**: Sunrise background glow (`tp-hero__sun` with animation `tp-sunrise`).
- **Headline (H1)**: "Premium teacup puppies in Dubai"
- **Subtitle**: "Ethically raised, health-checked teacup & toy puppies living in Dubai and available on request from trusted international partners."
- **CTA Actions**:
  - Primary button: "Meet available pups" (links to `/puppies`)
  - Secondary button: "Message on WhatsApp" (links to WhatsApp wa.me)
- **Interactive Element (`HeroLineup`)**:
  - A staggered curved lineup of 6 peeking puppy avatars (`tp-lineup__pup`, animation `tp-peek`).
  - Hovering/clicking a puppy highlights its breed and links directly to its detail page.
- **Mascot Stop 1**: `tp-hero__teddy` (peekaboo pose over the hero boundary).

#### Section 2: Meet the Pups (`data-section="meet"`)
- **Headline (H2)**: "Meet the pups"
- **Layout**: Sticky stage (`tp-meet__stage`).
- **Filter Tabs**: Breeds switcher (Korean Teacup, Maltipoo, Pomeranian, Toy Poodle).
- **Puppy Carousel**: Interactive cards with badges, age, gender, and price/enquiry.
- **Mascot Stop 2**: `tp-meet__teddy` (walks alongside the carousel).

#### Section 3: Two Ways to Meet Your Puppy (`data-section="paths"`)
- **Headline (H2)**: "Two ways to meet your puppy"
- **2-Column Path Cards**:
  1. **Path A (H3)**: "Puppies in Dubai"
     - Subtitle: "Meet today in Downtown Dubai"
     - Visual: 3D interactive opening door (`tp-door-open`, `tp-house-open`).
     - Features: Same-day take-home, in-person temperament check, complete vet health file.
  2. **Path B (H3)**: "Imported for you"
     - Subtitle: "Bespoke matchmaking from ethical breeders abroad"
     - Features: Selected from verified breeders in Korea & Europe, airport flight nanny, full quarantine clearance.
- **Mascot Stop 3**: `tp-fork__teddy` (sitting at the pathway fork).

#### Section 4: Your Puppy Journey (`data-section="journey"`)
- **Headline (H2)**: "Your puppy journey"
- **3 Process Steps**:
  1. "Choose your breed" (Consultation & lifestyle match)
  2. "Get photos & details" (HD video calls, pedigree check, vet certificate)
  3. "Secure & safe delivery" (Direct handover in Dubai or VIP home delivery)
- **Interactive Chat Widget (`Chat`, `tp-chat__side`)**:
  - Simulated WhatsApp phone interface with animated message bubbles (`tp-msg`, `tp-msg--them`, `tp-msg-in`).
  - Live typing indicator dots (`tp-dot`).
  - Embedded preview photos of puppies sent in chat.
- **Mascot Stop 4**: `tp-chat__teddy`.

#### Section 5: Why Families Trust TeddyPups (`data-section="trust"`)
- **Headline (H2)**: "Why families trust TeddyPups"
- **Trust Badges & Stamps**:
  - Tactile ink stamps (`tp-stamp--round`, `tp-stamp--ticket`, `tp-stamp--oval`, `tp-stamp--scallop`).
  - Staggered drop-in stamp animation with random tilt angles (`tp-stamp-in`, `tp-stamp-thump`).
  - Warranties highlighted: 1-Year Genetic Health Guarantee, Official Ministry of Climate Change & Environment (MOCCAE) certified import, Microchipped & fully vaccinated, 24/7 post-adoption care.
- **Mascot Stop 5**: `tp-book__teddy`.

#### Section 6: Happy Families & Puppies (`data-section="families"`)
- **Headline (H2)**: "Happy families & puppies"
- **Customer Review Wall**:
  - Grid of real customer photos with their adopted pups.
  - Video play buttons with real client captions:
    - "Lulu 🧸 with her new mummy ❤️"
    - "Adorable Maltipoo baby 🧸❤️"
    - "My new teddy puppy 🥰🧸"
    - "Our new puppies 🧸🥰🤗"
- **Mascot Stop 6**: `tp-dusk__teddy`.

#### Section 7: Questions, Answered (`data-section="questions"`)
- **Headline (H2)**: "Questions, answered"
- **Atmospheric Transition**:
  - Sunset horizon element (`tp-horizon__sun`, `tp-sun-set`).
  - Twinkling stars/sparkles overlay (`tp-twinkle`, `tp-night__wonder`, `tp-float`).
- **Accordion Preview**: 4 most frequent adoption questions.
- **Mascot Stop 7**: `tp-night__teddy` (head tilt wonder pose).

#### Section 8: Final CTA (`data-section="cta"`)
- **Headline (H2)**: "Ready to meet your new best friend?"
- **Visual**: Cozy house illustration with open door.
- **CTAs**: "Browse available puppies" & "Chat on WhatsApp".
- **Mascot Stop 8**: `tp-house__teddy` (welcoming bow pose).

---

### 5.2 Route 2: Available Puppies (`/puppies`)
- **Document Title**: `Available puppies | TeddyPups U.A.E.`
- **Total Scroll Height (Desktop)**: 3,679 px (Tablet: 5,720 px)
- **Sections in Order**:
  1. **Page Header**:
     - Headline (H1): "Available puppies"
     - Subtitle with live count of currently available pups in Dubai & incoming imports.
  2. **Filter Sticker Chips (`tp-sticker-chip`)**:
     - Buttons: `Everywhere`, `Imported`, `Korean Teacup`, `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`.
     - Active state: Inverted cocoa background with milk text; inactive: milk background with cocoa border.
  3. **Puppies Listing Grid**:
     - Responsive grid (1-col mobile, 2-col tablet, 3-col desktop).
     - Cards (`<a class="tp-sketch">`):
       - Aspect-ratio image with badge overlays: `Available`, `▶ video` indicator if clip exists.
       - Details: Name (e.g. "Max"), Breed ("Maltipoo"), Gender ("boy" / "girl"), Age ("3 months").
       - Location tag: "In Dubai" or "Imported for you".
  4. **"Already gone home" Preview Section (H2)**:
     - Teaser gallery of recently adopted puppies with a button linking to `/gone-home`.
  5. **Footer**: Includes mascot stop `tp-basket__pup`.

---

### 5.3 Route 3: Puppy Detail Template (`/puppies/[slug]`)
- **Example Page Analyzed**: `/puppies/maltipoo-max-male` ("Max, Maltipoo puppy")
- **Total Scroll Height (Desktop)**: 3,277 px
- **Sections in Order**:
  1. **Breadcrumbs**: `Home / Puppies / Max`
  2. **Hero Presentation & Media Gallery**:
     - Title (H1): "Max"
     - Interactive multi-photo slider with prev/next arrows (`‹`, `›`).
     - Video player modal trigger (`▶`).
     - Key Specs Definition List (`dl`):
       - Breed: `Maltipoo`
       - Gender: `Boy`
       - Age: `3 months`
       - Where: `Imported for you` (or `In Dubai`)
       - Expected Adult Weight: `2.0 - 2.5 kg`
       - Microchip Status: `Implanted & Registered`
  3. **"Every Teddy Pup comes" Guarantees (H2)**:
     - Vaccination certificate, Microchip ID, Passport, Health warranty, Vet inspection report.
  4. **"Coming home from abroad" 4-Step Process (H2)**:
     - Step 1 (H3): "Reserve your puppy"
     - Step 2 (H3): "Personalized consultation"
     - Step 3 (H3): "Import and arrival"
     - Step 4 (H3): "Welcome home"
  5. **Direct Inquiry Form (H2: "Ask about Max")**:
     - Fields: Name, Phone (+971 format), Email, Area in UAE, Puppy ID (preselected), Message.
     - Anti-spam hidden honeypot field (`website`).
     - Submit button: "Send enquiry".
     - Direct WhatsApp quick-chat link.
  6. **Footer**: Includes mascot stop `tp-basket__pup`.

---

### 5.4 Route 4: Happy Families (`/happy-families`)
- **Document Title**: `Happy families | TeddyPups U.A.E.`
- **Total Scroll Height (Desktop)**: 8,793 px (Tablet: 8,553 px)
- **Sections in Order**:
  1. **Hero & Intro**:
     - Headline (H1): "Happy families"
     - Subtitle celebrating over 500+ puppies placed in loving UAE homes.
  2. **Testimonial & Media Masonry Wall**:
     - 66 high-resolution photo and video review cards.
     - Each card features the adopted puppy with its new owner, customer name, neighborhood (e.g. "Dubai Hills", "Palm Jumeirah", "Abu Dhabi"), and video play button.
  3. **Video Lightbox Modal**:
     - Clicking any card with a video indicator opens an accessible dialog modal playing the customer clip with sound and playback controls.
  4. **Footer**: Includes mascot stop `tp-basket__pup`.

---

### 5.5 Route 5: How It Works (`/how-it-works`)
- **Document Title**: `How it works | TeddyPups U.A.E.`
- **Total Scroll Height (Desktop)**: 4,544 px (Tablet: 5,743 px)
- **Sections in Order**:
  1. **Hero**: Headline (H1): "How it works".
  2. **Dual-Mode Interactive Switcher (`tp-switch__tab`)**:
     - Toggle Button 1: "In Dubai — meet in person"
     - Toggle Button 2: "Imported — order upon request"
     - Switching between tabs updates the detailed roadmap, timelines, and payment stages without page reload.
  3. **Our Premium Puppy Promise (H2)**:
     - Ethical breeding guarantee, parent pedigree verification, socialization protocol.
  4. **Delivery & Collection (H2)**:
     - 4 Cards:
       1. "Take your puppy home the same day" (for Dubai residents visiting our lounge)
       2. "Delivery within Dubai" (VIP air-conditioned transport to your doorstep)
       3. "Safe international cargo" (IATA approved travel crate & nanny)
       4. "Worldwide delivery"
  5. **Why Choose Us (H2)**:
     - 3 Pillars: International cargo, Support 24/7, Health guarantee.
  6. **Unique and High Quality Puppies (H2)**: Closing banner with direct inquiry CTA.
  7. **Footer**: Includes mascot stop `tp-basket__pup`.

---

### 5.6 Route 6: FAQ (`/faq`)
- **Document Title**: `Questions & answers | TeddyPups U.A.E.`
- **Total Scroll Height (Desktop)**: 2,383 px (Tablet: 2,296 px)
- **Sections in Order**:
  1. **Hero**: Headline (H1): "Questions & answers".
  2. **Accordion Room (`tp-faqroom`)**:
     - 8 Expandable questions:
       1. "Are your puppies vaccinated and health-checked?"
       2. "Can I meet a puppy before I decide?"
       3. "Can I take my puppy home the same day?"
       4. "Do you import puppies from abroad?"
       5. "How does an imported puppy travel to Dubai?"
       6. "Will I see photos and health details first?"
       7. "Do you deliver?"
       8. "Which breeds do you usually have?"
     - Smooth height transition, rotating plus/minus icon indicator.
  3. **Footer**: Includes mascot stop `tp-basket__pup`.

---

### 5.7 Route 7: Contact & Visit (`/contact`)
- **Document Title**: `Visit & contact | TeddyPups U.A.E.`
- **Total Scroll Height (Desktop)**: 1,956 px (Tablet: 2,525 px)
- **Sections in Order**:
  1. **Hero**: Headline (H1): "Get in touch with us".
  2. **Interactive Letter Posting Form (`tp-letterform`)**:
     - Visual metaphor: A physical sheet of deckle-edged stationery with postage stamps (`tp-letter__stamp`).
     - Greeting: "Dear TeddyPups," (`font-scrawl tp-letterform__greeting`).
     - Form Lines:
       - Line 1: "My name is [name input] and you can reach me at [phone input] or [email input]."
       - Line 2: "I live in [area input] and I'm interested in [puppyId select dropdown]."
       - Note: Large multi-line textarea (`tp-letterform__note`, placeholder: "Anything else you'd like to tell us…").
     - Anti-spam hidden field: `website`.
     - Sign-off & Submit Button: "Post my letter" (`tp-letterform__sign`).
     - **Submission Physics & Animation**:
       1. Letter folds in 3D perspective (`@keyframes tp-letter-fold`).
       2. Envelope slides into view (`@keyframes tp-env-in`).
       3. Flap folds down (`@keyframes tp-flap`).
       4. Envelope drops into the mailbox (`@keyframes tp-env-post`).
       5. Mailbox door snaps shut (`@keyframes tp-box-up`).
       6. Red postal flag springs up (`@keyframes tp-flag`).
       7. Success seal displays: "Letter delivered! We'll reply within 2 hours" (`@keyframes tp-sent-in`).
  3. **Location & Visiting Details (H2: "Visit us in Downtown Dubai")**:
     - Visiting hours (10:00 AM – 8:00 PM daily by appointment).
     - Direct address & Google Maps navigation link.
     - Direct contact links: WhatsApp, Phone (`+971 50 000 0000`), Email (`info@instabizweb.com`).
  4. **Footer**: Includes mascot stop `tp-basket__pup`.

---

### 5.8 Route 8: Gone Home (`/gone-home`)
- **Document Title**: `Gone home | TeddyPups U.A.E.`
- **Total Scroll Height (Desktop)**: 3,071 px
- **Sections in Order**:
  1. **Hero**: Headline (H1): "Gone home" — celebration of puppies that have found their forever families.
  2. **Adopted Puppies Gallery Grid**:
     - 29 puppy cards with "Adopted" status badge.
     - Puppy name, breed, gender, and family placement year.
  3. **Footer**: Includes mascot stop `tp-basket__pup`.

---

## 6. Responsive Behavior & Breakpoints

Captured at 3 standard viewports:
1. **Desktop**: 1440 × 900 px
2. **Tablet**: 768 × 1024 px
3. **Mobile**: 390 × 844 px

### Key Responsive Adaptations:
- **Header**:
  - `Desktop (>= 1024px / lg)`: Full horizontal nav bar + WhatsApp pill button.
  - `Tablet & Mobile (< 1024px)`: Compact header with brand logo and `Menu` toggle button.
- **Mobile Bottom Action Bar**:
  - Active only on `< 768px (md:hidden)`.
  - Fixed at screen bottom with safe-area padding for iOS devices (`pb-[calc(0.6rem+env(safe-area-inset-bottom))]`).
- **Mascot Scale & Positioning**:
  - Desktop: Scale `1.55` in hero, `1.0` in sections; translates across full 1440px width.
  - Tablet/Mobile: Scales down to `0.85 - 1.05`; waypoint coordinates shift inward to stay within screen margins; pauses running animation if viewport width < 640px to prevent obstructing reading copy.
- **Grid Systems**:
  - Puppy listings: Desktop 3 cols → Tablet 2 cols → Mobile 1 col.
  - Footer: Desktop 3 cols horizontal → Tablet 2 cols → Mobile stacked single column.
  - Two Ways to Meet: Desktop 2 side-by-side cards → Tablet/Mobile stacked vertical cards.

---

## 7. Explicit Notes on Undetermined or Missing Evidence

To ensure complete accuracy without hallucination:
1. **Third-Party Video Streaming Source**:
   - The reference captures contain webm recordings of the browser viewport during Playwright execution, but external video embeds (e.g. Instagram Reels or Vimeo/Cloudflare video URLs) were referenced by internal proxy endpoints (`/_next/image` or script calls). The exact CDN streaming provider for client video playback is masked behind local endpoints.
2. **Backend Form Submission Endpoint**:
   - The letterform and enquiry forms submit to internal Next.js Server Actions. The server action hashes (`action="$$ACTION_ID"`) are present in HTML, but the backend CRM / WhatsApp webhook handling is server-side and invisible to client inspection.
3. **Mobile Trace Run**:
   - In `reference-pack/`, the desktop trace captured all 40 routes and tablet captured 23 routes before the Playwright crawler was stopped. Mobile CSS media queries and breakpoint behaviors are fully verified through the compiled Tailwind CSS stylesheet (`resources/88b85a219cd951f65ebcec396a876a2735629318.css`), which contains all `@media (min-width: 640px)`, `(min-width: 768px)`, `(min-width: 1024px)`, and `(pointer: coarse)` declarations.
