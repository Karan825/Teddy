# Parallel Work Contract

## Shared foundation ownership

The following files are global infrastructure. Do not edit them for a route-specific implementation without coordinating the change with the foundation owner.

| Area | Owner files | Rules |
| --- | --- | --- |
| Design tokens and shared visual primitives | `app/globals.css`, `components/ui/*` | Use existing `--color-*`, layout, button, and heading APIs. Add a token only when it is reused across routes and grounded in the reference. |
| Root shell | `app/layout.tsx` | This is the only shared layout boundary. Route teams provide page content through `children`; they must not render another header, footer, or mobile action dock. |
| Navigation and footer | `components/layout/*` | Keep navigation labels, contact details, and the footer mascot stop consistent. Route teams must not copy their markup. |
| Puppy domain model | `types/puppy.ts` | All puppy listing, detail, gallery, and filter work imports these types. Extend optional fields rather than creating competing puppy interfaces. |
| Captured assets | `app/fonts/*`, `public/brand/*` | Exact font and logo files fetched from URLs recorded in `reference-pack`; do not replace them with substitutes. |

## Component APIs

### `Container`

`<Container className?: string>` renders the centered `--content-max` frame with the shared responsive `--gutter`. Use it as the outer element of each route section.

### `Button` and `ButtonLink`

- `Button`: native button for in-page state changes.
- `ButtonLink`: internal Next route or external/tel/mailto action.
- Variants: `primary` (honey), `secondary` (milk outline), `toffee` (warm accent).
- Always supply a clear text label; icon-only controls need `aria-label`.

### `SectionHeading`

`<SectionHeading title eyebrow? description? as? />` creates a reference-aligned display heading. `as` defaults to `h2`; pass `h1` only once per page. Route CSS may position the component, but should not restyle its core typography.

### `PuppyProfile`

Each dog needs a stable `id`, URL-safe `slug`, `availability`, `origin`, accessible media alt text, and `media`. Use `locationLabel` exactly as rendered content; do not infer it from `origin` in card components.

## Route ownership rules

- Route teams own only their folders under `app/` and their route-specific components under `components/<route-name>/`.
- Shared component changes require backwards-compatible props and an update here when the public API changes.
- Do not add individual home, listing, detail, gallery, FAQ, or mascot section markup to the root layout. The home page remains intentionally empty until its page owner begins Phase 4.
- The footer contains a static `data-pup-stop` basket reservation. Do not build the animated Teddy rig or scroll controller in this foundation phase.
- Do not add imagery by substitution. Use a file from `reference-pack` or a source URL explicitly recorded in its asset manifests.
