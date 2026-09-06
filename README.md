# John Cinematics

Next.js 15 (App Router) + React 19 + Tailwind v4. Static-rendered, no client
data fetching.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

> Stop the dev server before running `npm run build`. Both write to `.next`,
> and building over a running dev server leaves it serving 404s for
> `main-app.js`. If that happens: stop it, `rm -rf .next`, start it again.

## Where to change things

| What | Where |
| --- | --- |
| Colours, glass recipe, grain, animations | `app/globals.css` |
| All copy, work items, services, stats | `lib/content.ts` |
| Section order | `app/page.tsx` |

### Palette

Six tokens at the top of `app/globals.css` drive the whole site. Change
`--color-ink` and everything re-skins:

```css
--color-ink:   #191920;  /* charcoal page base */
--color-ink-2: #212129;  /* raised surface     */
--color-ink-3: #33333e;  /* hairlines          */
--color-bone:  #f6f5f2;  /* primary text       */
--color-ash:   #9a9aa6;  /* secondary text     */
--color-ember: #e8b04b;  /* accent             */
```

### Photos

Two folders, and the split matters:

```
assets/<collection>/     full-res masters — git-ignored, never deployed
public/work/<collection>/  web derivatives — committed, this is what ships
```

Drop masters into `assets/proposals/`, `assets/pre-wedding/` and so on, then:

```bash
npm run optimize:images
```

That resizes to 2560px on the long edge, converts to sRGB, re-encodes at
quality 88, **strips all metadata** (which matters here: it drops the GPS
coordinates of venues and homes), and writes `lib/generated-images.ts` with
each image's real dimensions and a blur placeholder. Idempotent — rerun it
whenever you add photos. The first run took 168MB of masters down to 8.6MB.

Then register the collection in `lib/content.ts`:

```ts
export const collections: Collection[] = [
  {
    slug: "proposals",          // becomes /work/proposals
    name: "Proposals",
    blurb: "...",
    images: [
      // images[0] is the COVER: it's what the home grid shows,
      // and it leads the collection's own page.
      { id: "...", category: "Proposals", ratio: "landscape",
        src: "/work/proposals/John-09426_edited.jpg" },
    ],
  },
];
```

`title` and `year` are optional — leave them off rather than guessing, and the
caption falls back to the collection name and drops the date cleanly.

Ratios: `portrait` (2:3), `landscape` (3:2), `square`, `cinema` (21:9).
Only `ratio` affects layout — portrait and square take a third of the row,
landscape and cinema take two thirds.

### Routes

```
/                  hero, selected work (one cover per collection), services, CTA
/about             bio, timeline, the approach
/work/<slug>       cover at full width, then the rest of the set
```

`/work/[slug]` is statically generated from `collections` via
`generateStaticParams`, so adding a collection adds a prerendered page with no
further wiring.


## Design notes

**Typography.** Display face is Anton — a free stand-in for the compressed
grotesque air.inc uses. Its cap height nearly fills the em box, so `.display`
sets `line-height: 0.92`; anything tighter makes wrapped lines collide. The
hero overrides this per line because each is a single line.

**Hero sizing.** The wordmark is sized in `vw` so it spans the viewport edge to
edge, with a `vh` term in `min()` capping it on short or landscape screens so
the CTA stays above the fold. Width-filling gives way to fitting, never the
other way round.

**Glass.** `backdrop-filter` samples what is painted *behind* an element, so a
glass panel over a flat background is just a grey rectangle. Every `.glass`
surface sits over an `<Aurora />` colour field — that is what the blur is for.
If you add a glass panel somewhere new, give it something luminous behind it.
The effect reads best over photographs, which is why the work-grid captions
sit on the frames rather than under them.

**Cascade layers.** Everything custom in `globals.css` lives inside
`@layer base` / `@layer components` on purpose. Unlayered CSS beats *any*
layered CSS regardless of specificity, so a bare `.glass { position: relative }`
would silently override a `absolute` utility on the same element. Keeping
these in `components` puts Tailwind's `utilities` layer above them, which is
what you expect when you add a utility to a `.glass` element. The one
deliberate exception is the `prefers-reduced-motion` block, which is unlayered
so it outranks everything.

**Animated edge.** `.edge` puts a travelling light around a card's border,
the same way air.inc does it: an oversized square carrying a conic gradient
spins behind the card, and the card's own content covers all but a 1px ring of
it. 178% is the magic number — a square that size still covers the box's
corners at every rotation angle, so the ring never breaks.

Two rules matter if you reuse it:

- The wrapper's radius must be exactly 1px larger than the content's
  (`rounded-2xl` outside, `rounded-[15px]` inside). `Frame` deliberately sets
  no radius of its own for this reason.
- The content must be opaque — it *is* the mask. Over a translucent panel the
  gradient shows through the middle, and you'd need a real mask instead.

Stagger multiple cards with a negative `--edge-delay` so the beams don't
travel in lockstep. Hover brightens rather than speeding up, because changing
`animation-duration` mid-cycle makes the beam jump.

**Two image components, and the difference matters.**

- `<Frame />` — for cards that carry an overlaid glass caption (the home grid).
  It paints a bottom vignette so the caption stays legible on a bright photo.
- `<Photo />` — for galleries. No vignette, no hover transform, no animated
  border. Use this anywhere the photograph is the whole point.

Reaching for `Frame` on a caption-less gallery is what washes out the bottom of
every image. That is what the scrim is *for*; it just has no business being
there when there's no caption to protect.

Two traps in `Photo`, both around `fillHeight`:

- It adds `h-full` **on top of** the ratio class, never instead of it. The
  ratio is what gives the box an intrinsic height for the grid row to size
  from — swap one for the other and every row collapses to zero, because then
  no item in it has a height of its own.
- It also needs `max-w-full`. Once the row makes the height definite, the
  browser derives **width** from the aspect ratio instead of filling the cell:
  a 3:2 box in a 344px row computes to 516px, overflows its 483px column and
  eats the grid gap, so the landscape visually touches its neighbour. The clamp
  keeps it in the cell. It cannot be `w-full` instead — that makes both
  dimensions definite and you're back to collapsed rows.

**Image sizing.** The `sizes` prop is what decides which generated variant a
browser downloads, so it has to match the real rendered width — get it wrong
and you either over-fetch or render soft on retina. Values are derived from the
grid: a 1400px container less 64px padding, 6 columns, 24px gaps, so a narrow
card lands at ~430px and a wide one at ~890px. If you change the grid, change
these.

**Motion.** No animation library. `<Reveal />` is one `IntersectionObserver`
that unobserves after firing; marquees and the ambient drift are CSS
keyframes. Everything is disabled under `prefers-reduced-motion`.

The reveal's hidden state sits behind `@media (scripting: enabled)`, so with
JS off the content renders visible instead of sitting at `opacity: 0` forever.
Doing that in CSS rather than with a class set by an inline script keeps
server and client markup identical, so there is no hydration mismatch.
