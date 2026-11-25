# TeddyPups Asset Map

This document catalogues all original assets referenced across the TeddyPups website, specifying their origin, category, intended location, and role in the rebuilt application.

---

## 1. Typography & Font Assets

The reference website loads 3 primary variable web fonts via Next.js Font Optimization (`next/font/google` or local woff2 files):

| Font Family | Styles / Weights | Classification | Original File Reference | Recreation Target |
|---|---|---|---|---|
| **Fraunces** | Variable (`100` – `900`, optical size `9` – `144`) | Serif Display | `media/a5a3076f5a3c2968-s.09mqwf_zjnrdf.woff2` | Google Fonts / `next/font/google` |
| **Figtree** | Variable (`300` – `900`, normal & italic) | Clean Sans-Serif | `Figtree` woff2 chunks | Google Fonts / `next/font/google` |
| **Shantell Sans** | Variable (`300` – `800`, normal & italic) | Handwritten Casual | `Shantell Sans` woff2 chunks | Google Fonts / `next/font/google` |

---

## 2. Brand & Identity Assets

| Asset Path | Format | Role | Description |
|---|---|---|---|
| `/brand/logo.png` | PNG (transparent) | Primary Brand Logo | Teddy puppy silhouette with typography in cocoa brown. Displayed in Header and Footer. |
| `/favicon.ico` | ICO | Browser tab favicon | Standard 32x32 puppy paw / head icon. |
| `/apple-touch-icon.png` | PNG | iOS home screen icon | 180x180 high-res icon. |

---

## 3. Vector & SVG Rig Assets

All SVG assets are rendered as inline components or inline definitions within the reference markup, ensuring maximum fidelity, sharpness, and CSS/JS animatability:

### 3.1 Mascot Vector Rig (`PupActor` SVG, `viewBox="0 0 300 240"`)
- **Semantic Components**:
  - `ground-shadow`: Elliptical soft shadow (`cx="150" cy="230" rx="92" ry="7" fill="#2a170e"`).
  - `leg-back-far` (`data-p="bf"`) & `leg-front-far` (`data-p="ff"`): `#e4a352` with `#2a170e` 3.4px stroke.
  - `leg-back-near` (`data-p="bn"`) & `leg-front-near` (`data-p="fn"`): `#f2be6b` with `#2a170e` 3.4px stroke.
  - `tail` (`data-p="tail"`): Curved plume with cloud-fluff tip.
  - `body-torso` (`data-p="body"`): Organic fluffy curves defining the golden honey pup coat.
  - `haunch` (`data-p="haunch"`): Sitting rear thigh curve.
  - `head` (`data-p="head"`): Fluffy round head, topknot tuft, blush cheeks (`#f9b9a6`).
  - `ears` (`data-p="earL"` & `data-p="earR"`): Fluffy floppy ears with independent tilt angles.
  - `muzzle`: Rounded cream snout patch (`#fbe3b4`).
  - `eyes` (`data-p="eyes"`):
    - `open`: Black glossy ovals (`#2a170e`) with dual white highlight reflections.
    - `blink`: Flattened scale for blinking.
    - `happy`: Curved upward smiling arcs.
    - `shut`: Gentle resting downward curves.
  - `nose & mouth`: Deep cocoa heart-rounded nose with philtrum and smile lines.
  - `tongue` (`data-p="tongue"`): Playful pink tongue (`#e98c8c`).
  - `ledge-paws` (`data-p="ledge"`): Pair of paws resting over a horizontal boundary for peekaboo pose.

### 3.2 UI & Decorative SVGs
- `IconMark`: Custom puppy emblem badge.
- `tp-twinkle`: 4-point golden star/sparkle SVG (`fill="#f2be6b"`).
- `tp-hero__sun`: Golden radial sunburst SVG.
- `tp-stamp` vectors: Stamped rubber seal contours (round, ticket, oval, scallop).
- `tp-letterform` postal vectors: Postage stamps, airmail borders, mailbox slot, red post flag.
- Social icons: Instagram, TikTok, Facebook (in Footer).
- Action icons: Phone receiver, WhatsApp speech bubble, Close "x", Menu hamburger lines, Chevron arrows (`‹`, `›`), Play triangle (`▶`).

---

## 4. Media & Content Images (182 Source Assets)

The reference capture contains 182 distinct source images, which Next.js served dynamically at responsive widths (`w=128`, `w=384`, `w=750`, `w=1080`, `w=1920`, `w=3840`).

### 4.1 Puppy Profile Photo Sets (42 Puppies)
Each puppy profile contains 1 hero photo + 3–6 additional photos showing angles, scale, and playfulness.

#### Sample Puppy Roster & Source Image Paths:
1. **Max (Maltipoo Boy)** — `/puppies/maltipoo-max-male`
   - Hero: `/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp`
   - Alt Angle 1: `/media/RH7J577OfQ7f/e776d07dbd/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67f000.jpg`
   - Alt Angle 2: `/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg`
2. **Korean Teacup Maltipoo Girl** — `/puppies/korean-teacup-maltipoo-female`
   - Image 1: `/media/159oT4F46uhk/b66c2be87f/27b888_ea6e7e0fcd43447d854657b6de98d4cb-mv2.avif`
   - Image 2: `/media/2BoSaeBhLer8/05c9d02f5a/27b888_48694c17ac634f32b63bcd21052c10c3-mv2.jpg`
3. **Korean Teacup Poodle Girl** — `/puppies/korean-teacup-poodle-female`
   - Image 1: `/media/0c1rFiKXQLLk/75c6a20e15/27b888_b22287e7c1594de7ab2fba46eabea376-mv2.avif`
4. **Maltipoo Cavapoo Boy** — `/puppies/maltipoo-cavapoo-male`
   - Image 1: `/media/0mLBLYUEZO0F/69719f9b64/27b888_fedd02dfc8194be3b4457dea89e42b6a-mv2.avif`
5. **Toy Poodle Male & Female** — `/puppies/toy-poodle-male-female`
   - Image 1: `/media/0wEBefsp1F5j/1b67ab78e0/27b888_8727fecbf89b4648b443b9bfab83fffd-mv2.jpg`
6. **Blue Marle Pomeranian** — `/puppies/blue-marle-pomeranian`
   - Image 1: `/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg`
7. **Pomsky Ollie Boy** — `/puppies/pomsky-ollie-boy`
   - Image 1: `/media/3brH1qwkxHa9/5f4c527879/b942a5_4b29b9e240d145ce8673732fa58dc7ec-mv2.jpg`
8. **Shih Tzu Boy & Girl** — `/puppies/shitzu-male` & `/puppies/shitzu-female`
   - Image 1: `/media/2ZpD4FCAriYZ/56ea196e78/27b888_160a7ee974d74fc7ae452afc6e5fccea-mv2.jpg`
   - Image 2: `/media/2stMgxztsgXb/8b643b4842/b942a5_ce135cde6ebe45abb75435a7ce7d6910-mv2.jpg`

*(Complete list of 182 media assets is indexed in `reference-pack/desktop/*/assets.json`)*.

### 4.2 Happy Families Testimonial Images (66 Assets)
- Located on `/happy-families` and `/` (section "families").
- Images depict real families in Dubai residences (Dubai Marina, Downtown, Palm Jumeirah) holding their puppies.
- Each photo is associated with a client review quote, customer handle, and video indicator where applicable.

### 4.3 Gone Home Gallery Images (29 Assets)
- Located on `/gone-home` and `/puppies` (preview section).
- Commemorative portrait cards marked with adoption badges.

---

## 5. Video & Motion Recordings

In the `reference-pack/` directory:
- `videos/desktop/*.webm`: 40 full-scroll video captures recording the complete scrolling interaction of each desktop route.
- `desktop/<route>/scroll.webm`: Individual scroll recording for each captured route.
- These videos serve as the visual ground truth for fine-tuning scroll animation timing, mascot path trajectories, and UI transitions.

---

## 6. Asset Strategy for Recreation Project

1. **Static Files (`public/`)**:
   - `public/brand/`: Place `logo.png`, `favicon.ico`, `apple-touch-icon.png`.
   - `public/media/`: Replicate the `/media/...` directory structure or map to a structured `public/images/puppies/`, `public/images/families/`, and `public/images/ui/` structure with clean, descriptive filenames.
2. **Icons (`components/icons/`)**:
   - Maintain pure SVG components for icons and stamps to preserve vector crispness and support dynamic CSS color inheritance (`currentColor`).
3. **Mascot SVG (`components/mascot/PupActor.tsx`)**:
   - Encapsulate the full 300x240 puppet rig as a React SVG component with ref hooks for head rotation, eye blinking, and tail wagging.
