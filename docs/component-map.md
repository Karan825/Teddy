# TeddyPups Reusable Component Map

This document catalogues every reusable component identified across the reference website, detailing its role, interface, visual styling, interactive mechanics, and route usage.

---

## 1. Global & Layout Components

### 1.1 `AppLayout`
- **Role**: Root application shell wrapping every route.
- **Children**: `RouteCurtain`, `Header`, `PawTrailCanvas`, `PupLayer` (mascot overlay), page content (`main`), `MobileBottomBar`, `Footer`.
- **Used On**: All routes (`/`, `/puppies`, `/puppies/[slug]`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, `/gone-home`).

### 1.2 `Header` & `HeaderBehavior`
- **Role**: Sticky top navigation bar.
- **CSS Classes**: `tp-header fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-transparent transition-all`
- **Interactive State**:
  - Detects scroll position: When `scrollY > 20px`, adds background tint (`bg-milk/90 backdrop-blur-md border-cocoa/10 shadow-sm`).
  - Mobile menu toggle button (`Menu` / `Close`).
- **Internal Elements**:
  - `BrandLogo`: Logo link to `/`.
  - `NavLinks`: Desktop horizontal nav (`Home`, `Puppies`, `Happy families`, `How it works`, `FAQ`, `Visit & contact`).
  - `WhatsAppPill`: Direct WhatsApp CTA button.
  - `MobileMenuTrigger`: Visible `<lg` to open the mobile drawer.
- **Used On**: All routes.

### 1.3 `MobileMenu`
- **Role**: Fullscreen overlay drawer for mobile navigation.
- **CSS Animation**:
  - Open: `@keyframes tp-menu-in` (`clip-path: circle(...)`)
  - Close: `@keyframes tp-menu-out`
  - Links entrance: `@keyframes tp-menu-link`
- **Interactive State**:
  - Traps focus when open, prevents background document scroll (`@keyframes tp-hold-still`).
  - Closes on route change or when pressing Escape / "Close" button.
- **Used On**: All routes (mobile/tablet viewport).

### 1.4 `MobileBottomBar`
- **Role**: Quick contact floating dock pinned to the bottom of the viewport on small screens.
- **CSS Classes**: `fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden flex items-center justify-between gap-3`
- **Items**:
  - Primary button: "WhatsApp us" (`bg-honey text-cocoa font-semibold`)
  - Secondary button: "Call" (`tel:+971500000000`)
- **Used On**: All routes (`< 768px`).

### 1.5 `Footer`
- **Role**: Site footer and resting sanctuary for the floating mascot.
- **CSS Classes**: `tp-footer relative pb-[calc(var(--bar-h)+2rem)] text-milk md:pb-10 bg-cocoa`
- **Key Sub-element**:
  - `BasketStop` (`<div class="pup-stop tp-basket__pup" data-pup-stop="true" data-pose="snug" data-act="basket" data-behind="true">`): Woven basket where the mascot settles to sleep.
  - Navigation columns, social media badges (Instagram, TikTok, Facebook), contact phone/email, legal copyright.
- **Used On**: All routes.

### 1.6 `RouteCurtain`
- **Role**: Animated transition overlay on client route changes.
- **CSS Classes**: `tp-curtain fixed inset-0 z-[100]`
- **Animation Sequence**:
  - Curtain cover: `@keyframes tp-curtain-cover` (bottom to top slide).
  - Centered mascot runner: Running dog animation (`tp-runner-x`, `tp-runner-leg-a`, `tp-runner-leg-b`, `tp-runner-wag`, `tp-runner-ear`, leaving pawprints `tp-print-step`).
  - Curtain reveal: `@keyframes tp-curtain-lift` (slide upward and out).
- **Used On**: Global shell.

### 1.7 `SmoothScroll`
- **Role**: Smooth momentum scroll provider powered by Lenis (`@studio-freight/lenis`).
- **Classes**: Adds `.lenis` class to `<html>` element.
- **Mechanics**: Normalizes wheel and touch scroll velocity to ensure continuous scroll-driven mascot interpolation.
- **Used On**: All routes.

### 1.8 `PawTrailCanvas`
- **Role**: Fullscreen ambient particle canvas rendering fading puppy footprints along cursor path.
- **Markup**: `<canvas class="pointer-events-none fixed inset-0 z-[70] size-full"></canvas>`
- **Behavior**:
  - Calculates mouse velocity and trajectory angle.
  - Draws vector paw print (1 palm pad + 4 toe pads) alternating between left paw and right paw.
  - Automatically disabled on touch-primary viewports to preserve mobile battery.
- **Used On**: All routes.

---

## 2. Mascot System Components

### 2.1 `PupLayer`
- **Role**: Fixed screen-space viewport overlay hosting the active puppet actor.
- **CSS Classes**: `pup-layer fixed inset-0 contain: layout paint style pointer-events-none overflow-clip`
- **Props / Attributes**:
  - `data-anchor`: `"top"` (default) or `"bottom"` (for sticky footer docking).
  - `data-front`: `"true"` (z-index 30, in front of text/cards) or `"false"` (z-index 15, behind foreground cards).
- **Used On**: All routes.

### 2.2 `PupActor`
- **Role**: The animated physical mascot character container.
- **CSS Classes**: `pup-actor absolute top-0 left-0 will-change-transform`
- **Transform**: `translate3d(x px, y px, 0px)`
- **Sub-components**:
  - `PupBody` (`.pup-actor__body`): Contains the full SVG puppet rig (`viewBox="0 0 300 240"`), scales between `0.85` and `1.55`.
  - `PupBubble` (`.pup-bubble-at > .pup-bubble`): Dynamic speech bubble.
- **Used On**: Inside `PupLayer`.

### 2.3 `PupStop`
- **Role**: Invisible/structural anchor placed in page sections to define waypoints for the mascot.
- **Markup Example**:
  ```html
  <div class="pup-stop tp-hero__teddy" 
       data-pup-stop="true" 
       data-pose="peek" 
       data-facing="right" 
       data-act="peekaboo" 
       data-behind="true" 
       data-lane="true">
  </div>
  ```
- **Attributes**:
  - `data-pup-stop`: `"true"`
  - `data-pose`: `"peek"` | `"walk"` | `"sit"` | `"bow"` | `"snug"`
  - `data-act`: `"peekaboo"` | `"treadmill"` | `"tilt"` | `"basket"` | `null`
  - `data-facing`: `"right"` | `"left"`
  - `data-behind`: `"true"` | `null`
  - `data-lane`: `"true"` | `null`
- **Used On**:
  - `/` (9 stops: hero, meet, paths, journey, trust, families, questions, cta, footer basket)
  - All other routes (1 stop: footer basket).

### 2.4 `PupBubble`
- **Role**: Comic-style speech bubble floating above the mascot.
- **CSS Classes**: `pup-bubble border-[2.5px] border-cocoa bg-milk font-hand rounded-[1.1rem_1.1rem_1.1rem_0.25rem] px-3.5 py-1 text-sm shadow-[2px_3px_#2a170e2e]`
- **Animation**: Elastic scale in/out (`--ease-pounce`, `@keyframes tp-pop-up`).
- **Used On**: Embedded in `PupActor`.

---

## 3. Interactive & Visual Feature Components

### 3.1 `HeroLineup`
- **Role**: Hero section interactive puppy parade.
- **CSS Classes**: `.tp-lineup__pup` (relative, animated with `@keyframes tp-peek`).
- **Behavior**:
  - 6 puppy avatar badges arranged in a gentle curved baseline.
  - Hovering lifts the puppy, plays an ear-wiggle, and surfaces an info tag.
  - Clicking navigates directly to the puppy's profile.
- **Used On**: Homepage (`/`).

### 3.2 `PuppyCard` (`tp-sketch`)
- **Role**: Standard card for displaying an available or adopted puppy in grid listings.
- **Markup**: `<a class="tp-sketch" href="/puppies/[slug]">`
- **Structure**:
  - Aspect-ratio image container (rounded card, crisp cocoa outline).
  - Overlay badges: Status pill (`Available` / `Adopted`), Video indicator (`▶ video`).
  - Text meta: Puppy name (e.g. "Max"), Breed ("Maltipoo"), Gender badge ("boy" / "girl"), Age ("3 months").
  - Price / Location ("In Dubai" / "Imported for you").
- **Hover Effect**: Subtle scale and shadow tilt.
- **Used On**:
  - `/puppies` (Available list)
  - `/gone-home` (Adopted list)
  - `/` (Homepage "Meet the pups" & "Gone home" teasers)
  - `/puppies/[slug]` (Related puppies carousel)

### 3.3 `FilterBar` (`tp-sticker-chip`)
- **Role**: Horizontal scrolling breed & origin filter buttons.
- **Buttons**: `Everywhere`, `Imported`, `Korean Teacup`, `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`.
- **CSS Classes**: `.tp-sticker-chip`
- **Behavior**: Instant client-side filtering of the puppy grid without page reload.
- **Used On**: `/puppies`.

### 3.4 `DualModeSwitcher` (`tp-switch__tab`)
- **Role**: Segmented control switching adoption roadmaps.
- **Tabs**:
  1. "In Dubai — meet in person"
  2. "Imported — order upon request"
- **Behavior**: Switches visible roadmap panels, delivery guarantees, and timelines with animated tab indicator.
- **Used On**: `/how-it-works`.

### 3.5 `ChatSimulation` (`Chat`)
- **Role**: Simulated WhatsApp phone chat illustrating customer communication.
- **CSS Classes**: `tp-chat__side`, `tp-msg`, `tp-msg--them`, `tp-msg--media`, `tp-dot`
- **Animation**:
  - Staggered bubble entrance: `@keyframes tp-msg-in`
  - Pulsing typing dots: `@keyframes tp-dot`
- **Content**: Simulated message thread showing puppy photo sharing, health certificate upload, and appointment scheduling.
- **Used On**: Homepage (`/` section "journey").

### 3.6 `StampBadge` (`tp-stamp`)
- **Role**: Rubber-stamp inspection badges highlighting guarantees and certifications.
- **CSS Variants**:
  - `tp-stamp--round` (Circular seal)
  - `tp-stamp--ticket` (Notched ticket)
  - `tp-stamp--oval` (Elliptical badge)
  - `tp-stamp--scallop` (Scalloped edge)
- **Animation**: Stamped thump entrance with variable rotation tilt (`@keyframes tp-stamp-in`, `@keyframes tp-stamp-thump`).
- **Used On**:
  - Homepage (`/` section "trust")
  - `/how-it-works` (Promise section)
  - `/contact` (Letter stationery corner stamp)

### 3.7 `Accordion` (`tp-faqroom`)
- **Role**: Expandable Q&A accordion list.
- **Behavior**:
  - Single or multi-expand support.
  - Smooth height transition (`grid-template-rows: 0fr` to `1fr` or CSS height transition).
  - Plus icon rotates 45 degrees to become an "x".
- **Used On**:
  - `/faq` (Full 8 questions)
  - Homepage (`/` section "questions", top 4 questions)

### 3.8 `LetterMailboxForm` (`tp-letterform`)
- **Role**: Whimsical postal stationery contact form.
- **CSS Classes**: `tp-letterform`, `tp-letterform__greeting`, `tp-letterform__line`, `tp-letterform__note`, `tp-letterform__sign`
- **Fields**:
  - `name`: Text input (required)
  - `phone`: Tel input (required, placeholder: `+971 50 123 4567`)
  - `email`: Email input (optional)
  - `area`: Area/neighborhood input (e.g. `Dubai Marina`)
  - `puppyId`: Select dropdown (all available puppies + "Not sure / general question")
  - `message`: Textarea for notes
  - `website`: Hidden anti-spam honeypot
- **Submission Sequence**:
  - Form valid → Trigger postal animation:
    1. Sheet folds down (`tp-letter-fold`)
    2. Enters envelope (`tp-env-in`, `tp-flap`)
    3. Posts into red mailbox (`tp-env-post`)
    4. Box snaps shut (`tp-box-up`)
    5. Mailbox flag raises (`tp-flag`)
    6. Confirmation card appears (`tp-sent-in`)
- **Used On**: `/contact`.

### 3.9 `PuppyMediaGallery`
- **Role**: Interactive multi-photo gallery and video launcher on puppy detail pages.
- **Controls**: Prev/Next chevron buttons (`‹`, `›`), thumbnail indicators, video play button (`▶`).
- **Used On**: `/puppies/[slug]`.

### 3.10 `VideoLightboxModal`
- **Role**: Accessible modal dialog playing customer video testimonials.
- **Features**: Focus trap, backdrop blur, click-outside-to-close, ESC key handling, HTML5 video player with mute/volume controls.
- **Used On**:
  - `/happy-families`
  - Homepage (`/` section "families")
  - `/puppies/[slug]`

---

## 4. Component Usage Matrix Across Routes

| Component | Home (`/`) | Puppies (`/puppies`) | Puppy Detail (`/puppies/[slug]`) | Happy Families (`/happy-families`) | How It Works (`/how-it-works`) | FAQ (`/faq`) | Contact (`/contact`) | Gone Home (`/gone-home`) |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `AppLayout` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `Header` & `HeaderBehavior` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `MobileMenu` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `MobileBottomBar` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `Footer` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `RouteCurtain` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `SmoothScroll` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `PawTrailCanvas` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `PupLayer` & `PupActor` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `PupStop` (Multiple stops) | Yes (9) | - | - | - | - | - | - | - |
| `PupStop` (Footer basket) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| `HeroLineup` | Yes | - | - | - | - | - | - | - |
| `PuppyCard` | Yes | Yes | Yes (Related) | - | - | - | - | Yes |
| `FilterBar` | - | Yes | - | - | - | - | - | - |
| `DualModeSwitcher` | - | - | - | - | Yes | - | - | - |
| `ChatSimulation` | Yes | - | - | - | - | - | - | - |
| `StampBadge` | Yes | - | Yes | - | Yes | - | Yes | - |
| `Accordion` | Yes (4) | - | - | - | - | Yes (8) | - | - |
| `LetterMailboxForm` | - | - | Yes (Compact) | - | - | - | Yes (Full) | - |
| `PuppyMediaGallery` | - | - | Yes | - | - | - | - | - |
| `VideoLightboxModal` | Yes | - | Yes | Yes | - | - | - | - |
