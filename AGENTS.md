# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.

## Design rules

These rules compile what is defined in `src/index.css` (tokens and comments), the design critique in `DESIGN-CRITIQUE.md`, the `public/case-studies/*/README.md` conventions, and the decisions closed during the brand refresh. **Follow them for any UI change.** Where code and this file disagree, ask before changing either.

### Brand brief
Sober, with a few relaxed touches. **Blue is the voice** (rigor, structure, action). **Orange is the human moment** (curiosity, a wink). If a screen has no reason for orange, it has none.

### Colour
- Blue tokens only: `--color-primary #002FA7` (actions, links, numbers), `--ink-headline #3F4559` (headings), body ink `#12141F`, secondary text `#5A5F73`. Do not introduce new blues or greys; use the existing set.
- Orange `--color-accent #FF6F00` is **decorative only** (2.8:1 on white): never for text. Use `--color-accent-icon` for icons/arrows and `--color-accent-text` if small orange text is unavoidable.
- Orange appears **only** in these places, and the list is a ceiling, not a target:
  1. The section bar (`.section-bar`, 32×3px) that closes a section on About and case studies.
  2. The bar beside a "Result" line or a pulled brief/note.
  3. One graphic accent per hero-level card (the Work card circle, the closing-block circle, the hero dot) and one dot on the key metric of each case header.
  Legacy small dots still in use and not to be multiplied: eyebrow/label dots (`.label-dot`) and the philosophy list dots on About.
  4. Tiny moments of voice: the footer line and the 404 dot.
- Semantic colours stay semantic: red = rejected/critical, green = shipped/positive.
- **Index numbers (01, 02…)** use `--color-index` (`#46537F`, a desaturated slate blue, 7.5:1 on white) so they read as labels, never as actions. Numbers appear at **one level only**: the section (case-study sections, listing cards, stepper steps). Never number items inside a numbered section (rows, decisions, modules, deliverables): two levels of 01, 02 read as a sequence and confuse. Outputs/deliverables are never numbered. Use the `.idx` class for inline numbers before titles. Cards that are not ordered (Contact) show an icon instead of a number.
- Pull quotes: one large blue opening glyph centred above the quote, no extra quote marks around the text.

### Typography
- Large headings (H1, H2, display numbers): **Plus Jakarta Sans** (`--font-display`), weight 800, tracking `-0.025em`. Everything else: **Inter**.
- Do not use weight 900 on headings; do not override heading tracking per page.

### Containers (three kinds, nothing else)
1. **No box** (default): text, subtitles, lists sit directly on the page.
2. **Tinted blue box** (`#F2F6FF`/`#F8FAFF`): only for real data (tables, metric strips, before/after comparisons).
3. **Dark box** (`DarkBox`, `#12141F`): only for the one insight or principle of a section.
- Text lists and notes are **hairline rows**, not cards: `.cs-rows` + `.cs-row`, `.cs-numlist` + `.cs-numrow`, `.cs-decisions`. A note or brief is a pulled passage with an orange bar (`.cs-brief`). A user quote has a blue bar and no fill.
- Do not nest a box inside a box.
- Cards that are **not clickable** (methodologies, education, certifications) use the quiet tint `rgba(0,47,167,0.05)`, no border, no shadow, no hover lift. White outline cards are for things that link somewhere, with one exception: the Contact info cards, which are outline cards that hold their own primary and secondary buttons (only the buttons click).

### Dividers
- Hairlines (`rgba(18,20,31,0.12)`) appear **only between rows**: none under the heading, none after the last row (the orange section bar closes the section). The existing classes already do this; do not add borders by hand.
- One decorative divider across the site: the orange section bar. No glyph dividers.

### Case studies and About
- Case study pages use `<CaseStudyShell refined>`: numbered sections, orange section bar, hairline rows. Keep the structure Hook, Research, Define, Design, Impact.
- Section numbers are CSS counters; do not type numbers into headings.
- About uses eyebrow labels (not numbers) and the same section bar.

### Action shapes and hierarchy
- **Shape = role.** Rectangle with 12px radius: navigate or commit (`.primary-btn`, `.secondary-btn`). Pill (full radius): a clickable state or selection (filters, stepper steps, toggles, active nav). Circle: icon-only control (carousel arrows, back to top). Text link with chevron: lightweight navigation (`.hs-cta`).
- **A pill always clicks.** Things that do not click (tags, severity, "+N") use an 8px radius and a quiet fill, never a pill.
- **One primary per page**, in the place where the visitor decides. Home: "View work". Case studies: "Get in touch" in the closing block. Contact: "Send an email". 404: "View work". Pages with no decision (Work, Journey, About) have none; do not add one for symmetry.
- A second action on the same page is a `.secondary-btn` or a text link, never a second primary. Do not repeat the same destination twice as buttons.
- **One toggle**: `.engagement-toggle` (pill, `#F2F6FF`, 6/14px, chevron). `.cs-details-toggle` matches it. No inline-styled toggles.
- One button size (padding 16/32, 15px/600). Never set padding, colour or radius inline on `.primary-btn` / `.secondary-btn`; a smaller variant must be added to the CSS, not to a page.
- The footer wordmark stays small (150px wide): it must not compete with the closing block above it.
- Round controls keep a 44px hit area (invisible padding) even when drawn at 36px.
- Case studies and the Contact page end with `CaseEndBlock`: the homepage Work card treatment, horizontal, with two `.related-card`s (the same `.related-card` used in the sidebar of the ERA and EDP pages). It replaces "next case" and "back to work" text links. The two cases are **random** (`randomCases`): never the current case and never the pair shown in the previous closing block, so no case is always promoted. Do not hard-code which cases appear.

- **Home Work card:** the card as a whole opens `/work` ("See the work" is the stretched link). The image and the "Featured: IntelliForge SR2R" link open the featured case, and they answer each other on hover (image zooms, link underlines). Labels stay short enough for one line on a 375px screen in EN and PT ("Featured: …" / "Em destaque: …").

### Buttons and links (reuse, never invent)
- Primary action: `.primary-btn` (blue fill, 12px radius, padding 16/32, 15px/600).
- Secondary action: `.secondary-btn` (1.5px blue border, 12px radius).
- Text link with chevron: `.hs-cta` (blue, 15px/600). It is the only text-link style; set the colour through the class, not `inherit`.
- No pill-shaped *actions* (buttons that navigate or commit) and no new button shapes. Full-radius pills exist only for selection state: filters, stepper steps, toggles, active nav (see "Action shapes and hierarchy").
- A card with two actions uses one stretched link plus one link above it (`z-index`), never nested anchors.
- Touch targets are at least 44px on `pointer: coarse`.

### Radius and spacing
- Radius language: 8px labels (tags, severity), 12px buttons and small controls, 16–20px cards, 24–28px hero and closing blocks, 10–14px for media inside a card, full radius only for selection pills and round icon controls. Do not mix other radii.
- Vertical rhythm between sections uses `--section-gap`; give a section extra room before the contact block rather than shrinking it.

### Motion (Emil Kowalski principles)
- Easing: `--ease-out` for anything that enters or responds; `--ease-out-back` only for the orange touches. Never `ease` by default.
- Durations: UI feedback under 300 ms, reveals 380–420 ms, no `transition: all`; animate `transform` and `opacity`.
- Pressed state: `:active { transform: scale(0.97) }` on buttons (120 ms).
- Never animate from `scale(0)`; stagger steps are 30–80 ms.
- Hover effects (anything that moves, shadows or recolours) live inside `@media (hover: hover) and (pointer: fine)`. Rules that also style `:focus-visible` stay outside so keyboard users keep the feedback; keep the hover half of those in the media query.
- No heading weight above 800 (no 900) anywhere, CSS or inline.
- Always honour `prefers-reduced-motion`: keep fades, drop movement.
- Marquees and loops pause on hover and in reduced motion. At most one continuous animation per viewport.

### Carousels and steppers
- Every carousel supports the **swipe gesture** (touch) and horizontal trackpad scroll, as well as arrows and dots. Use `useSwipe` from `src/components/useSwipe.ts` and spread it on the viewport; it also adds `.swipe-x` (`touch-action: pan-y`).
- How I Work is a **stepper** (one phase open at a time, swipe/arrow-key navigation), not a row of expandable cards. The steps reuse the Work page filter control (`.work-filter-track` / `.work-filter-tab`); do not restyle it. No ghost numerals or decorative repeated numbers. Do not add auto-rotation.
  Panel hierarchy is four levels: the question is the panel headline (20px/700, with a caps label), then one body paragraph whose first sentence is 600 and the rest 400, then the deliverables list with its caps label and the proof link. Do not add a second headline.

### Images and video
- Artwork with transparency (e.g. `hero.webp`) goes straight on the surface: no blend modes, no extra shadow or radius.
- Thumbnails of case studies must not show a play overlay; a video thumbnail is a clean screenshot. Case pages keep their video poster.
- Case-study carousel images follow the `README.md` in their folder (exact filenames, 390:844 for phone frames).
- Do not ship screenshots of the complete UI as an image where editable layers are expected (Figma imports).

### Language and copy
- EN and PT copy stay in step: every string added to one language is added to the other.
- Hero copy stays at three short levels: eyebrow "Lead UX/UI & Product Designer · Lisbon", H1 "Product systems for high-stakes decisions.", one-sentence subtitle (about 14 words). No pipes, no second sentence in the subtitle. Buttons: "View work" / "Get in touch" ("Ver trabalho" / "Contactar").
- Tone: calm and precise, with at most one dry wink per page.

### Process
- Work on a `preview/...` branch. Never push to `main` or merge to production without being asked.
- `npm run build` writes to `docs/`, which is tracked and served. Build to a temp folder instead (`vite build --outDir <tmp>`) and never commit `docs/` from a feature branch.
- There are two repositories (`nelson-portfolio` and `nelson-portfolio-2`, the latter with fewer case studies). Design changes are made in both; keep them in sync.
- Verify in a browser (desktop, tablet 820px, mobile 390px) before calling UI work done, and say what was not checked.
