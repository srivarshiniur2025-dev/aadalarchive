# Aadal Archive Design System — Master

> Source of truth for product UI. Page overrides live in `pages/`.
> Product: **Aadal Archive** — Where movement becomes memory.

## Brand statement

From inspiration to rehearsal to performance, every movement deserves a place.

Feel like: digital temple stage · premium visual archive · classical moodboard · choreography studio · cinematic performance · personal artistic memory space.

Do **not** feel like: generic social media · cloud storage · school LMS · corporate SaaS.

## Color (use sparingly for gold)

| Token | Hex | Role |
|-------|-----|------|
| Obsidian | `#120B0A` | Page foundation |
| Deep charcoal | `#1B1210` | Elevated surfaces, sticky nav |
| Dark maroon | `#321416` | Immersive panels, curtains |
| Temple maroon | `#641C25` | Accents, gradients |
| Vermilion | `#A83E32` | Record, errors (muted), heat |
| Antique gold | `#C29447` | Rare: CTA, focus, active, loaders |
| Bright brass | `#E1B861` | Hover gold, illuminated points |
| Warm ivory | `#F3E7D0` | Primary text on dark, editorial cards |
| Sandalwood | `#C3A276` | Secondary text, metadata |
| Bronze | `#80603B` | Borders, muted chrome |
| Deep green | `#20382F` | Success / forest accent |
| Muted rose | `#8C4E4C` | Soft secondary accent |

**Gold rule:** only active nav, primary CTA, focus, dividers, progress, selected, loaders, album outlines, timeline markers.

Gradients allowed: obsidian→maroon, maroon→vermilion, charcoal→bronze, ivory→sandalwood, gold→brass. Never neon / purple / blue SaaS gradients.

## Typography

| Level | Face | Use |
|-------|------|-----|
| Display | Cormorant Garamond | Hero + major statements only |
| Page title | Cormorant Garamond | Page H1 |
| Section | Cormorant / Cinzel labels | Section titles + gold rules |
| UI label | Outfit uppercase tracked | Nav, chips, metadata keys |
| Body | Outfit | Readable copy |
| Meta | Outfit small | Bronze/sandalwood timestamps |

Ivory/sandalwood on dark; charcoal on ivory surfaces. Generous line-height. Tamil/Sanskrit only as non-essential accent.

## Spacing & grid

- Max: 1440px · content: 1200–1280px
- Desktop margins 64–96px · 12-col · gap 20–32px · sections 120–180px
- Tablet margins 32–48px · 8-col · sections 80–120px
- Mobile margins 16–20px · 4-col · sections 64–96px · touch ≥44px

## Motion

| Kind | Duration |
|------|----------|
| Micro | 150–250ms |
| Hover | 180–240ms |
| Card hover | 250–400ms |
| Modal | 300–450ms |
| Page | 500–900ms |
| Hero open | 2–6s |
| Album open | ≤1.2s |

Easing: dance `cubic-bezier(0.22, 1, 0.36, 1)` · silk `cubic-bezier(0.45, 0.05, 0.25, 1)`. No bounce on core nav. Honor `prefers-reduced-motion`.

## Components (principles)

- **Buttons:** ceremonial plaque / stage doorway — not pill SaaS. Gold outline or maroon fill.
- **Cards:** editorial; soft or sharp corners; warm shadow; hover zoom ≤1.05; translate ≤4px.
- **Icons:** custom line-art; ivory inactive / gold active on dark.
- **Loaders:** salangai orbit, lamp glow, gold frame draw — stop when content ready.
- **Empty states:** poetic line + clear CTA + unfinished kolam/frame/lamp.

## Anti-patterns

Random Indian ornament pile · emoji icons · gold everywhere · glassmorphism neon · follower-count vanity · hover-only critical actions · layout-shifting animation.
