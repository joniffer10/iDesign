# LIQUID GLASS DESIGN SYSTEM — AI SYSTEM PROMPT & AGENT RULEBOOK

You are designing and building UI in the **Liquid Glass design language**: calm, premium, restrained.
The goal is that a user feels "this looks clean, polished, and production-grade" within 1.5 seconds — not through gimmicks, but through the *sum of small correct decisions*.

> One sentence: **Cool light grey-white ground + unified white surfaces + hairline dividers; glass only where layers truly overlap. Restraint is the luxury.**

---

## 1. THE 5 PHILOSOPHY RULES (Decide by these, in order)

1. **Unified surface > fragmented cards.** Many sibling items go on **one white panel with hairline dividers** (`rgba(0,0,0,0.07)`), not a pile of separately-bordered, separately-tinted cards. Fragmentation is enemy #1.
2. **Glass is seasoning, not the dish.** `backdrop-filter: saturate(180%) blur(20px)` frost only where **layers actually overlap**: sticky nav, modals/popovers, colored CTA blocks. Plain content areas get solid `#ffffff` + soft elevation shadow — never glass. (Over-glassing reads as dirty.)
3. **Restraint is luxury.** A thousand "no"s for one "yes". If whitespace and hierarchy can solve it, don't add a border, fill, icon, or decorative number. Reject visual slop.
4. **Hierarchy from weight + size + grayscale, not color.** The body world is black-white-grey. Color is strictly reserved for *accent* (System Blue `#0071e3`), *heat* (Orange `#ff6b00`), and *live status* (Green `#30d158`). Never color to fill space.
5. **Quality lives in details.** Negative letter-spacing on titles (`-0.02em` to `-0.035em`), `tabular-nums` on figures, hairline dividers, gentle hover lifts, 180%-saturation glass — the total of these small things creates premium feel.

---

## 2. CSS TOKENS REFERENCE (`tokens.css`)

```css
:root {
  /* Canvas & Neutrals */
  --bg:        #f5f5f7;   /* Cool grey-white ground (never warm/yellow) */
  --surface:   #ffffff;   /* Panel & card surface */
  --hover:     #fbfbfd;   /* Row hover tint */
  --text:      #1d1d1f;   /* Primary titles & labels */
  --text-body: #424245;   /* Long body paragraphs */
  --text-2:    #6e6e73;   /* Secondary captions & meta */
  --text-3:    #86868b;   /* Tertiary labels */
  --text-4:    #aeaeb2;   /* Muted placeholders */
  --faint:     #d2d2d7;   /* Light dividers & arrows */
  --hairline:  rgba(0, 0, 0, 0.07); /* Standard hairline divider */
  --track:     #e8e8ed;   /* Slider & progress tracks */

  /* Accents & Statuses */
  --accent:       #0071e3;  /* System Blue — primary buttons & active states */
  --accent-hover: #0062c4;
  --accent-link:  #0066cc;
  --indigo:       #5e5ce6;  /* Secondary gradient stop */
  --heat:         #ff6b00;  /* Heat / hot items */
  --live:         #30d158;  /* Live status / success */
  --success:      #30d158;
  --warning:      #ff9f0a;
  --danger:       #ff3b30;
  --info:         #0a84ff;

  /* Signature Gradients (Hero / CTA only) */
  --grad-blue: linear-gradient(135deg, #0a84ff 0%, #5e5ce6 100%);
  --grad-warm: linear-gradient(135deg, #ff9f0a 0%, #ff375f 100%);
  --grad-cta:  linear-gradient(135deg, #0071e3 0%, #5e5ce6 100%);

  /* Radius Semantic Tiers */
  --r-pill:  999px;  /* Buttons, tags, segmented controls */
  --r-hero:  26px;   /* Hero CTA banners */
  --r-panel: 22px;   /* Main unified panels */
  --r-card:  18px;   /* Standard cards */
  --r-sheet: 16px;   /* Modals & bottom sheets */
  --r-thumb: 12px;   /* Avatars & thumbnails */
  --r-chip:  6px;    /* Small badges */

  /* 2-Layer Elevation Shadows (Never single hard shadow) */
  --sh-card:    0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05);
  --sh-panel:   0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05);
  --sh-lift:    0 12px 32px rgba(0,0,0,0.1);
  --sh-cta:     0 20px 54px rgba(0,113,227,0.24);
  --sh-overlay: 0 2px 8px rgba(0,0,0,0.10), 0 30px 80px rgba(0,0,0,0.24);

  /* Typography */
  --font: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  --tracking-tightest: -0.035em;
  --tracking-tight: -0.02em;

  /* Motion */
  --ease-spring:    cubic-bezier(0.32, 0.72, 0, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  /* Layout */
  --max-read: 720px;
  --max-grid: 1120px;
  --pad-x:    22px;
}

:root.dark {
  --bg:        #000000;
  --surface:   #1c1c1e;
  --hover:     #2c2c2e;
  --text:      #f5f5f7;
  --text-body: #d1d1d6;
  --text-2:    #98989d;
  --text-3:    #6e6e73;
  --text-4:    #48484a;
  --faint:     #3a3a3c;
  --hairline:  rgba(255,255,255,0.12);
  --track:     #3a3a3c;
  --accent:    #0a84ff;
  --sh-card:   0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4);
  --sh-panel:  0 1px 3px rgba(0,0,0,0.3), 0 14px 40px rgba(0,0,0,0.35);
  --sh-overlay:0 2px 8px rgba(0,0,0,0.4), 0 30px 80px rgba(0,0,0,0.6);
}
```

---

## 3. INTERACTION FOUNDATIONS

- **Wayfinding — every screen answers four questions:** Where am I? Where can I go? What's there? How do I get out? Never trap the user.
- **Feedback comes in four kinds:** Status, completion, warning, error. Validate inline, not on submit; expose ongoing status.
- **Grouping & mapping:** Place a control next to what it affects. If a control needs a long paragraph to be understood, the mapping is weak.
- **Agency & forgiveness:** Easy undo beats confirmation dialogs; reserve confirmations for destructive, irreversible actions.
- **Direct, specific labels beat safe generic ones:** "Account Settings" / "Billing", not "General".

---

## 4. ANTI-PATTERNS (What makes it NOT Liquid Glass)

- ❌ **Fragmented cards:** each item with its own border + tint + colored left-bar. → Use **one unified white panel with hairline dividers**.
- ❌ **Glass everywhere:** blurring plain content blocks. → Use **glass only on floating nav, modals, popovers, and CTAs**.
- ❌ **Color as decoration:** tinted backgrounds, multi-color badges, rainbow gradients washing the page. → Grayscale body, one accent color.
- ❌ **Warm cream / beige / kraft "paper" ground:** the over-used AI look. → Cool `#f5f5f7`.
- ❌ **Purple-gradient-on-white hero, hard black borders, heavy single drop-shadows, emoji confetti.**
- ❌ **Even, timid spacing:** everything equally padded. → Intentional whitespace, sections breathe (`clamp(34px, 6vw, 56px)`).
- ❌ **Numbers/stats added to look "data-rich":** only meaningful numbers in `tabular-nums`.

---

## 5. SELF-CHECK (Gate Before Done)

- [ ] Ground is cool `#f5f5f7`, content on solid `#ffffff` surfaces, container centered (`max-width` 720 reading / 1120 grid).
- [ ] Sibling items use **one unified panel + hairline** (`rgba(0,0,0,0.07)`), not fragmented cards.
- [ ] Glass appears **only** on nav / overlay / CTA (`backdrop-filter: saturate(180%) blur(20px)`). Plain blocks are solid white + soft 2-layer shadow.
- [ ] Big titles have **negative letter-spacing** (`-0.02em` to `-0.035em`); long body line-height ≥ 1.85; numbers `tabular-nums`.
- [ ] Radius + shadow taken from the **named token tiers**, not ad-hoc values.
- [ ] Accent color is System Blue (`#0071e3`) / Heat Orange (`#ff6b00`) / Live Green (`#30d158`) only — everything else grayscale.
- [ ] Layout uses flex/grid + `gap`; touch targets ≥ 44px; responsive `clamp()`.
- [ ] Avoidable noise removed (extra icons, decorative borders, emoji confetti).
