# Implementation Plan: Responsive Width Scaling

## Overview

The site currently hard-caps at `max-w-3xl` (768px). On a 1920px monitor that means ~60% of the screen is empty side gutter; on a 3440px ultrawide it's ~78%. Goal is to make the layout breathe at large breakpoints **without breaking typographic discipline** (prose still needs a readable ~65-75ch line length). This is not "stretch everything to fill the screen" — it's "let the right things grow."

Frontend principles guiding the approach:
- **Prose has a cap.** About paragraphs and timeline descriptions stay narrow even when the container grows. Long lines kill readability.
- **Grids and asymmetric layouts use width well.** Projects, hero, and skills can expand into the extra space.
- **Whitespace is intentional.** A `max-w-7xl` container on 3440px still leaves ~1100px of gutter — that's fine. We're not trying to fill the monitor.
- **Mobile-first stays intact.** All current sm/md behavior is preserved; we add lg/xl/2xl tiers on top.

## Architecture decisions

**Approach: tiered max-width + per-section width control (Option A).**

Considered and rejected:
- *Option B (sticky sidebar at xl+):* Restructure homepage so hero becomes a sticky left rail (~320px) and content scrolls in a right column. Modern dev-portfolio pattern (Leerob, etc.), uses width best, but a much bigger structural change. Worth doing later if you want a v2 redesign — not this round.
- *Option C (merge hero + about into 2-col grid at xl):* Saves vertical space, but breaks the current narrative scroll order. Skip.

**Root container tiering:** `max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl` plus matching `px-` ramp so wide screens get more breathing room at the edges.

**Per-section override pattern:** Sections that hold prose (About, Timeline descriptions) get their own inner `max-w-*` so they don't inherit the wider root. Grid/list sections inherit fully.

## Task list

### Phase 1: Foundation

**Task 1: Tiered root container width**
- **Description:** Bump `<body>` in `src/app/layout.tsx` from `max-w-3xl px-8` to a responsive ramp.
- **Acceptance criteria:**
  - [ ] Body class: `max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16`
  - [ ] No horizontal scroll at any width between 320px and 3440px
  - [ ] Existing sm/md appearance unchanged (cap still ~768px below lg)
- **Files:** `src/app/layout.tsx`
- **Verification:** DevTools responsive mode at 375, 768, 1024, 1280, 1440, 1920, 2560 — confirm container widens at each tier without overflow.
- **Size:** XS (1 file)

### Checkpoint A
- [ ] Container widens visibly at lg/xl/2xl
- [ ] No overflow / horizontal scrollbar at any width
- [ ] Mobile still looks identical

---

### Phase 2: Per-section width discipline

**Task 2: Cap About prose width**
- **Description:** About inherits the wider container at xl+ which would push paragraphs past 100ch. Cap at a readable width.
- **Acceptance criteria:**
  - [ ] About text block wrapped in `max-w-2xl` (~672px = ~70ch at body size)
  - [ ] Heading still aligns to the section's left edge (full-width heading, capped body)
- **Files:** `src/components/About.tsx`
- **Verification:** At 1920px, paragraphs are ~672px wide, not ~1100px.
- **Size:** XS (1 file)

**Task 3: Cap Timeline description prose width**
- **Description:** TimelineItem descriptions are prose and need the same treatment so a wider card doesn't stretch bullets to 1000+px.
- **Acceptance criteria:**
  - [ ] `<ul>` containing description bullets gets `max-w-2xl` (or similar)
  - [ ] Avatar position and date line unaffected
- **Files:** `src/components/TimelineItem.tsx`
- **Verification:** At 1920px, bullet text doesn't stretch across the full card width.
- **Size:** XS (1 file)

### Checkpoint B
- [ ] About + Timeline prose stays narrow at xl+
- [ ] Headings still span full section width (visual hierarchy preserved)

---

### Phase 3: Grids and asymmetric layouts use the space

**Task 4: Projects grid expands columns**
- **Description:** Currently `grid-cols-1 sm:grid-cols-2`. Add tiers so wider screens show more cards per row.
- **Acceptance criteria:**
  - [ ] Class becomes `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`
  - [ ] On `/projects` page (no limit, 6 cards): renders 3 across on xl+
  - [ ] On homepage (`limit=4`): renders 4 across on xl+ when there's room — bump featured `LIMIT` from 4 to either 3 or 6 to match grid evenly (recommend keeping LIMIT=4 and accepting a 3+1 layout on xl, OR bumping to LIMIT=3 for clean 3-across)
- **Files:** `src/components/Projects.tsx`, possibly `src/app/page.tsx` (LIMIT)
- **Verification:** Resize through breakpoints, count columns at each tier.
- **Size:** S (1-2 files)
- **Open question:** Do we want featured projects to be 3 (clean 3-across at xl) or stay 4 (3+1 layout at xl)?

**Task 5: Hero typography and asymmetry at large widths**
- **Description:** Use the extra horizontal space at xl+ for monumental hero typography and a slightly larger image. The current `text-5xl` hero stays the same on mobile but scales up on wide screens.
- **Acceptance criteria:**
  - [ ] `<h1>` becomes `text-5xl lg:text-6xl xl:text-7xl`
  - [ ] Hero image: width/height `220` on mobile/md, bumped to `280` at xl (use responsive class or two `<Image>` instances if needed)
  - [ ] Tagline + age line: scale up `lg:text-lg xl:text-xl` so they don't look orphaned next to the larger h1
  - [ ] `max-w-sm` on tagline relaxed to `xl:max-w-md` so it doesn't wrap awkwardly
- **Files:** `src/app/page.tsx`
- **Verification:** Hero looks intentional and balanced at 1280, 1920, 2560 — not stretched, not floating.
- **Size:** S (1 file)

### Checkpoint C
- [ ] Projects grid uses the extra width
- [ ] Hero looks deliberate at xl+, not just bigger

---

### Phase 4: Skills polish (optional)

**Task 6: Skills categories side-by-side at xl+**
- **Description:** Currently each category is a stacked block. At xl+, render in 2 columns to use space and reduce vertical scroll.
- **Acceptance criteria:**
  - [ ] Skills container becomes `grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-6` (or equivalent)
  - [ ] Categories balance roughly evenly across columns
- **Files:** `src/components/Skills.tsx`
- **Verification:** At xl+, skills section is roughly half the height it was, organized into 2 columns of categories.
- **Size:** XS (1 file)
- **Optional:** Skip if you'd rather keep the linear vertical rhythm.

### Checkpoint D (final)
- [ ] Visual pass at 375, 768, 1024, 1280, 1440, 1920, 2560 — all look intentional
- [ ] No horizontal scroll at any width
- [ ] Dark mode unchanged
- [ ] `npm run build` clean

---

## Open questions

1. **Featured project count:** keep LIMIT=4 (3+1 on xl) or drop to LIMIT=3 for clean 3-across?
2. **Skills two-column layout (Task 6):** include or skip for now?
3. **Sidebar redesign (Option B):** want to schedule this as a follow-up plan, or leave that direction off the table?
4. **2xl tier:** the current 2xl breakpoint is 1536px. Want me to bump the breakpoint upward for ultrawides (e.g., add a custom `3xl` at 1920px) — or is the standard Tailwind ramp enough?

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Wider container reveals layout bugs that were hidden by narrow width | Med | Verify at each breakpoint in DevTools after Phase 1 before continuing |
| Hero image scaled up via responsive class can shift LCP / cause CLS | Low | Keep image at fixed dimensions and use CSS `width/height` rather than swapping `<Image>` widths |
| Project cards stretched horizontally look bad if image has fixed aspect | Low | Card image is already `h-40 w-full object-cover` — fine |
| LIMIT change breaks the homepage's 2x2 grid intent | Low | Surface as open question above |

## What's NOT in scope this round

- Sidebar layout / homepage rearchitecture (Option B above)
- Responsive font scaling via `clamp()` — sticking to Tailwind's tier classes
- Custom Tailwind breakpoint additions (e.g., `3xl`) unless flagged in the open questions
- Animation / scroll effects
- Card hover states (already present, untouched)
