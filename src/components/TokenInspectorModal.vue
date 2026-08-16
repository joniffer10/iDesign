<template>
  <IdModal
    :model-value="modelValue"
    title="Idesign — UI Guidelines & Tokens"
    max-width="820px"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="tokens-modal-content">
      <!-- Top Segmented Navigation Tab -->
      <div class="modal-segmented-wrap">
        <IdSegmentedControl
          v-model="activeTab"
          :options="[
            { id: 'tokens', label: 'Color & Radius Tokens' },
            { id: 'rules', label: '5 Philosophy Rules' },
            { id: 'ai-prompt', label: '✨ Vibe Coder AI Exporter' }
          ]"
          theme="black"
          block
        />
      </div>

      <!-- TAB 1: Color & Radius Tokens -->
      <div v-if="activeTab === 'tokens'" class="tab-pane">
        <!-- Color Tokens Palette Panel -->
        <div class="id-section">
          <h4 class="id-section-title">Color System Tokens</h4>
          <div class="swatches-grid">
            <div class="swatch-card" style="background:#f5f5f7; border:1px solid rgba(0,0,0,0.06); color:#1d1d1f;">
              <span class="swatch-label">--bg</span>
              <span class="swatch-val">#f5f5f7</span>
              <span class="swatch-desc">Cool Grey Ground</span>
            </div>
            <div class="swatch-card" style="background:#ffffff; border:1px solid rgba(0,0,0,0.1); color:#1d1d1f;">
              <span class="swatch-label">--surface</span>
              <span class="swatch-val">#ffffff</span>
              <span class="swatch-desc">Unified Panel Surface</span>
            </div>
            <div class="swatch-card" style="background:#1d1d1f; color:#ffffff;">
              <span class="swatch-label">--text</span>
              <span class="swatch-val">#1d1d1f</span>
              <span class="swatch-desc">Primary Typography</span>
            </div>
            <div class="swatch-card" style="background:#6e6e73; color:#ffffff;">
              <span class="swatch-label">--text-2</span>
              <span class="swatch-val">#6e6e73</span>
              <span class="swatch-desc">Secondary Meta</span>
            </div>
            <div class="swatch-card" style="background:#0071e3; color:#ffffff;">
              <span class="swatch-label">--accent</span>
              <span class="swatch-val">#0071e3</span>
              <span class="swatch-desc">System Blue Accent</span>
            </div>
            <div class="swatch-card" style="background:#ff6b00; color:#ffffff;">
              <span class="swatch-label">--heat</span>
              <span class="swatch-val">#ff6b00</span>
              <span class="swatch-desc">Heat / Warm Accent</span>
            </div>
            <div class="swatch-card" style="background:#30d158; color:#ffffff;">
              <span class="swatch-label">--live</span>
              <span class="swatch-val">#30d158</span>
              <span class="swatch-desc">Live Status Indicator</span>
            </div>
            <div class="swatch-card" style="background:rgba(0,0,0,0.04); border:1px dashed #ccc; color:#1d1d1f;">
              <span class="swatch-label">--hairline</span>
              <span class="swatch-val">rgba(0,0,0,0.07)</span>
              <span class="swatch-desc">Panel Divider</span>
            </div>
          </div>
        </div>

        <!-- Radius Semantic Scale Panel -->
        <div class="id-section" style="margin-top: 24px;">
          <h4 class="id-section-title">Radius Semantic Tier Tokens</h4>
          <div class="id-unified-panel">
            <div class="panel-row">
              <div class="row-meta">
                <span class="row-label">--r-pill</span>
                <span class="row-code">999px</span>
              </div>
              <div class="radius-demo r-pill">Pill Control / Tag</div>
            </div>
            <div class="panel-row">
              <div class="row-meta">
                <span class="row-label">--r-hero</span>
                <span class="row-code">26px</span>
              </div>
              <div class="radius-demo r-hero">Hero CTA Container</div>
            </div>
            <div class="panel-row">
              <div class="row-meta">
                <span class="row-label">--r-panel</span>
                <span class="row-code">22px</span>
              </div>
              <div class="radius-demo r-panel">Unified White Surface</div>
            </div>
            <div class="panel-row">
              <div class="row-meta">
                <span class="row-label">--r-card</span>
                <span class="row-code">18px</span>
              </div>
              <div class="radius-demo r-card">Interactive Card Box</div>
            </div>
            <div class="panel-row">
              <div class="row-meta">
                <span class="row-label">--r-thumb</span>
                <span class="row-code">12px</span>
              </div>
              <div class="radius-demo r-thumb">Avatar / Image Frame</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: 5 Philosophy Rules -->
      <div v-else-if="activeTab === 'rules'" class="tab-pane">
        <div class="id-section">
          <div class="section-subhead">
            <h4 class="id-section-title">The 5 Core Philosophy Rules</h4>
            <p class="section-lead">Decide every UI/UX layout and component choice by these rules, in exact priority order.</p>
          </div>

          <div class="id-unified-panel">
            <div class="rule-panel-row">
              <span class="rule-badge">1</span>
              <div class="rule-body">
                <h5 class="rule-title">Unified surface > fragmented cards</h5>
                <p class="rule-text">Sibling content items sit on <strong>ONE white panel with hairline dividers</strong> (<code>rgba(0,0,0,0.07)</code>), NOT a pile of separately-bordered or separately-tinted cards. Fragmentation is enemy #1.</p>
              </div>
            </div>

            <div class="rule-panel-row">
              <span class="rule-badge">2</span>
              <div class="rule-body">
                <h5 class="rule-title">Glass is seasoning, not the dish</h5>
                <p class="rule-text"><code>backdrop-filter</code> frost ONLY where <strong>layers actually overlap</strong>: sticky nav header, modals/popovers, and CTA overlays. Plain content areas stay solid <code>#ffffff</code> with soft elevation shadow — never glass.</p>
              </div>
            </div>

            <div class="rule-panel-row">
              <span class="rule-badge">3</span>
              <div class="rule-body">
                <h5 class="rule-title">Restraint is luxury</h5>
                <p class="rule-text">A thousand "no"s for one "yes". If whitespace and clean hierarchy can solve it, don't add borders, extra fills, icons, or decorative numbers.</p>
              </div>
            </div>

            <div class="rule-panel-row">
              <span class="rule-badge">4</span>
              <div class="rule-body">
                <h5 class="rule-title">Hierarchy from weight + size + grayscale, not color</h5>
                <p class="rule-text">The body world is black-white-grey. Reserve color strictly for <em>accent</em> (System Blue <code>#0071e3</code>), <em>heat</em> (Orange <code>#ff6b00</code>), or <em>live status</em> (Green <code>#30d158</code>).</p>
              </div>
            </div>

            <div class="rule-panel-row">
              <span class="rule-badge">5</span>
              <div class="rule-body">
                <h5 class="rule-title">Craft quality lives in details</h5>
                <p class="rule-text">Negative letter-spacing on titles (<code>-0.02em</code>), <code>tabular-nums</code> for data alignment, hairline dividers, gentle hover lifts, and 180% saturation blur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: Vibe Coder AI Exporter -->
      <div v-else-if="activeTab === 'ai-prompt'" class="tab-pane">
        <div class="id-section">
          <div class="section-subhead">
            <h4 class="id-section-title">✨ Vibe Coder AI System Prompt Exporter</h4>
            <p class="section-lead">Give Cursor, Gemini, Claude, ChatGPT, v0, or Bolt the exact Liquid Glass design system rules to baseline your project UI.</p>
          </div>

          <!-- Action Row Panel -->
          <div class="id-unified-panel" style="margin-bottom: 20px;">
            <div class="exporter-row" @click="copyPrompt">
              <div class="exporter-info">
                <div class="row-icon blue">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </div>
                <div>
                  <h5 class="exporter-title">Copy AI System Prompt Rulebook</h5>
                  <p class="exporter-sub">Copies full LLM system prompt markdown to your clipboard</p>
                </div>
              </div>
              <button type="button" class="id-action-btn primary">Copy Prompt</button>
            </div>

            <div class="exporter-row" @click="downloadTokens">
              <div class="exporter-info">
                <div class="row-icon purple">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div>
                  <h5 class="exporter-title">Download tokens.css</h5>
                  <p class="exporter-sub">Standalone CSS custom properties for your project root</p>
                </div>
              </div>
              <button type="button" class="id-action-btn secondary">Download CSS</button>
            </div>

            <div class="exporter-row" @click="downloadAgentsMd">
              <div class="exporter-info">
                <div class="row-icon grey">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <h5 class="exporter-title">Download AGENTS.md Rulebook</h5>
                  <p class="exporter-sub">Context file for Cursor / Antigravity AI agents</p>
                </div>
              </div>
              <button type="button" class="id-action-btn secondary">Download MD</button>
            </div>
          </div>

          <!-- Prompt Preview Box -->
          <div class="macos-code-window">
            <div class="window-bar">
              <div class="window-dots">
                <span class="dot close"></span>
                <span class="dot min"></span>
                <span class="dot max"></span>
              </div>
              <span class="window-title">AGENTS.md — System Prompt</span>
              <span class="window-copy-link" @click="copyPrompt">Copy Prompt</span>
            </div>
            <pre class="window-code-content"><code>{{ aiPromptText }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="modal-footer-flex">
        <button type="button" class="footer-btn secondary" @click="copyTokensCss">
          Copy tokens.css
        </button>

        <button type="button" class="footer-btn primary" @click="copyPrompt">
          ✨ Copy AI System Prompt
        </button>
      </div>
    </template>
  </IdModal>
</template>

<script setup>
import { ref } from 'vue'
import IdModal from './idesign/IdModal.vue'
import IdSegmentedControl from './idesign/IdSegmentedControl.vue'

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'toast'])

const activeTab = ref('tokens')

const aiPromptText = `# LIQUID GLASS DESIGN SYSTEM — AI SYSTEM PROMPT & AGENT RULEBOOK

You are designing and building UI in the **Liquid Glass design language**: calm, premium, restrained.
The goal is that a user feels "this looks clean, polished, and production-grade" within 1.5 seconds — not through gimmicks, but through the *sum of small correct decisions*.

> One sentence: **Cool light grey-white ground + unified white surfaces + hairline dividers; glass only where layers truly overlap. Restraint is the luxury.**

---

## 1. THE 5 PHILOSOPHY RULES (Decide by these, in order)

1. **Unified surface > fragmented cards.** Many sibling items go on **one white panel with hairline dividers** (\`rgba(0,0,0,0.07)\`), NOT a pile of separately-bordered, separately-tinted cards. Fragmentation is enemy #1.
2. **Glass is seasoning, not the dish.** \`backdrop-filter: saturate(180%) blur(20px)\` frost only where **layers actually overlap**: sticky nav, modals/popovers, colored CTA blocks. Plain content areas get solid \`#ffffff\` + soft elevation shadow — never glass. (Over-glassing reads as dirty.)
3. **Restraint is luxury.** A thousand "no"s for one "yes". If whitespace and hierarchy can solve it, don't add a border, fill, icon, or decorative number. Reject visual slop.
4. **Hierarchy from weight + size + grayscale, not color.** The body world is black-white-grey. Color is strictly reserved for *accent* (System Blue \`#0071e3\`), *heat* (Orange \`#ff6b00\`), and *live status* (Green \`#30d158\`). Never color to fill space.
5. **Quality lives in details.** Negative letter-spacing on titles (\`-0.02em\` to \`-0.035em\`), \`tabular-nums\` on figures, hairline dividers, gentle hover lifts, 180%-saturation glass — the total of these small things creates premium feel.

---

## 2. CSS TOKENS REFERENCE (\`tokens.css\`)

\`\`\`css
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
\`\`\`

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
- ❌ **Warm cream / beige / kraft "paper" ground:** the over-used AI look. → Cool \`#f5f5f7\`.
- ❌ **Purple-gradient-on-white hero, hard black borders, heavy single drop-shadows, emoji confetti.**
- ❌ **Even, timid spacing:** everything equally padded. → Intentional whitespace, sections breathe (\`clamp(34px, 6vw, 56px)\`).
- ❌ **Numbers/stats added to look "data-rich":** only meaningful numbers in \`tabular-nums\`.

---

## 5. SELF-CHECK (Gate Before Done)

- [ ] Ground is cool \`#f5f5f7\`, content on solid \`#ffffff\` surfaces, container centered (\`max-width\` 720 reading / 1120 grid).
- [ ] Sibling items use **one unified panel + hairline** (\`rgba(0,0,0,0.07)\`), not fragmented cards.
- [ ] Glass appears **only** on nav / overlay / CTA (\`backdrop-filter: saturate(180%) blur(20px)\`). Plain blocks are solid white + soft 2-layer shadow.
- [ ] Big titles have **negative letter-spacing** (\`-0.02em\` to \`-0.035em\`); long body line-height ≥ 1.85; numbers \`tabular-nums\`.
- [ ] Radius + shadow taken from the **named token tiers**, not ad-hoc values.
- [ ] Accent color is System Blue (\`#0071e3\`) / Heat Orange (\`#ff6b00\`) / Live Green (\`#30d158\`) only — everything else grayscale.
- [ ] Layout uses flex/grid + \`gap\`; touch targets ≥ 44px; responsive \`clamp()\`.
- [ ] Avoidable noise removed (extra icons, decorative borders, emoji confetti).
`

const tokensCssContent = `/* ════════════════════════════════════════════════════════════════
   Idesign — Liquid Glass Design Tokens
   Drop this file into your project root for CSS custom properties.
   ════════════════════════════════════════════════════════════════ */

:root {
  /* Neutrals */
  --bg: #f5f5f7;
  --surface: #ffffff;
  --hover: #fbfbfd;
  --text: #1d1d1f;
  --text-body: #424245;
  --text-2: #6e6e73;
  --text-3: #86868b;
  --text-4: #aeaeb2;
  --faint: #d2d2d7;
  --hairline: rgba(0,0,0,0.07);
  --track: #e8e8ed;

  /* Accents & Semantic States */
  --accent: #0071e3;
  --accent-hover: #0062c4;
  --accent-link: #0066cc;
  --indigo: #5e5ce6;
  --heat: #ff6b00;
  --heat-bg: rgba(255,107,0,0.1);
  --live: #30d158;
  --success: #30d158;
  --success-bg: rgba(48,209,88,0.12);
  --warning: #ff9f0a;
  --warning-bg: rgba(255,159,10,0.12);
  --danger: #ff3b30;
  --danger-bg: rgba(255,59,48,0.12);
  --info: #0a84ff;
  --info-bg: rgba(10,132,255,0.12);
  --focus-ring: 0 0 0 3px rgba(0, 113, 227, 0.35);

  /* Gradients */
  --grad-blue: linear-gradient(135deg, #0a84ff 0%, #5e5ce6 100%);
  --grad-warm: linear-gradient(135deg, #ff9f0a 0%, #ff375f 100%);
  --grad-green: linear-gradient(135deg, #30d158 0%, #0a84ff 100%);
  --grad-cta: linear-gradient(135deg, #0071e3 0%, #5e5ce6 100%);

  /* Typography */
  --font: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  --tracking-tightest: -0.035em;
  --tracking-tight: -0.02em;

  /* Spacing */
  --space-3xs: 2px;
  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Radius */
  --r-none: 0;
  --r-chip: 6px;
  --r-thumb: 12px;
  --r-sheet: 16px;
  --r-card: 18px;
  --r-panel: 22px;
  --r-hero: 26px;
  --r-pill: 999px;

  /* Shadows */
  --sh-card: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05);
  --sh-panel: 0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05);
  --sh-lift: 0 12px 32px rgba(0,0,0,0.1);
  --sh-cta: 0 20px 54px rgba(0,113,227,0.24);
  --sh-overlay: 0 2px 8px rgba(0,0,0,0.10), 0 30px 80px rgba(0,0,0,0.24);

  /* Motion */
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  /* Layout */
  --max-read: 720px;
  --max-grid: 1120px;
  --pad-x: 22px;
}

:root.dark {
  --bg: #000000;
  --surface: #1c1c1e;
  --hover: #2c2c2e;
  --text: #f5f5f7;
  --text-body: #d1d1d6;
  --text-2: #98989d;
  --text-3: #6e6e73;
  --text-4: #48484a;
  --faint: #3a3a3c;
  --hairline: rgba(255,255,255,0.12);
  --track: #3a3a3c;
  --accent: #0a84ff;
  --accent-link: #64b5f6;
  --indigo: #7d7aff;
  --heat: #ff9f0a;
  --heat-bg: rgba(255,159,10,0.15);
  --live: #30d158;
  --sh-card: 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4);
  --sh-panel: 0 1px 3px rgba(0,0,0,0.3), 0 14px 40px rgba(0,0,0,0.35);
  --sh-lift: 0 12px 32px rgba(0,0,0,0.5);
  --sh-cta: 0 20px 54px rgba(0,113,227,0.35);
  --sh-overlay: 0 2px 8px rgba(0,0,0,0.4), 0 30px 80px rgba(0,0,0,0.6);
}
`

const copyPrompt = () => {
  navigator.clipboard.writeText(aiPromptText)
  emit('toast', 'Copied AI System Prompt to clipboard!')
}

const copyTokensCss = () => {
  navigator.clipboard.writeText(tokensCssContent)
  emit('toast', 'Copied tokens.css to clipboard!')
}

const downloadFile = (filename, text) => {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const downloadTokens = () => {
  downloadFile('tokens.css', tokensCssContent)
  emit('toast', 'Downloaded tokens.css for your project!')
}

const downloadAgentsMd = () => {
  downloadFile('AGENTS.md', aiPromptText)
  emit('toast', 'Downloaded AGENTS.md rulebook!')
}
</script>

<style scoped>
.tokens-modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-segmented-wrap {
  margin-bottom: 4px;
}

.tab-pane {
  animation: fadeIn 0.25s var(--ease-out-quart);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}

.id-section-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 4px;
}

.section-subhead {
  margin-bottom: 16px;
}
.section-lead {
  font-size: 13.5px;
  color: var(--text-2);
  line-height: 1.5;
  margin-top: 2px;
}

/* ── Swatches Grid ── */
.swatches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 12px;
  margin-top: 12px;
}
.swatch-card {
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 84px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.swatch-label {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
}
.swatch-val {
  font-family: var(--mono);
  font-size: 11px;
  opacity: 0.85;
}
.swatch-desc {
  font-size: 11px;
  opacity: 0.75;
}

/* ── Unified Surface Panel ── */
.id-unified-panel {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-panel);
  box-shadow: var(--sh-panel);
  overflow: hidden;
}

.panel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-bottom: 1px solid var(--hairline);
}
.panel-row:last-child {
  border-bottom: none;
}
.row-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.row-label {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}
.row-code {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text-2);
}
.radius-demo {
  background: var(--bg);
  border: 1px solid var(--hairline);
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-2);
}
.r-pill { border-radius: 999px; }
.r-hero { border-radius: 26px; }
.r-panel { border-radius: 22px; }
.r-card { border-radius: 18px; }
.r-thumb { border-radius: 12px; }

/* ── Rule Panel Rows ── */
.rule-panel-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--hairline);
}
.rule-panel-row:last-child {
  border-bottom: none;
}
.rule-badge {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.rule-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.rule-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
}
.rule-text {
  font-size: 13.5px;
  color: var(--text-2);
  line-height: 1.55;
  margin: 0;
}
.rule-text code {
  font-family: var(--mono);
  font-size: 12px;
  background: var(--hover);
  padding: 1px 5px;
  border-radius: 4px;
  color: var(--accent);
}

/* ── Exporter Action Rows ── */
.exporter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--hairline);
  cursor: pointer;
  transition: background 0.15s ease;
}
.exporter-row:last-child {
  border-bottom: none;
}
.exporter-row:hover {
  background: var(--hover);
}
.exporter-info {
  display: flex;
  align-items: center;
  gap: 14px;
}
.row-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.row-icon.blue { background: rgba(0, 113, 227, 0.1); color: var(--accent); }
.row-icon.purple { background: rgba(175, 82, 222, 0.1); color: #af52de; }
.row-icon.grey { background: rgba(0, 0, 0, 0.05); color: var(--text); }

.exporter-title {
  font-size: 14px;
  font-weight: 650;
  color: var(--text);
}
.exporter-sub {
  font-size: 12.5px;
  color: var(--text-2);
  margin-top: 1px;
}

.id-action-btn {
  height: 34px;
  padding: 0 16px;
  border-radius: var(--r-pill);
  font-family: var(--font);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  flex-shrink: 0;
}
.id-action-btn.primary {
  background: var(--accent);
  color: #ffffff;
}
.id-action-btn.primary:hover {
  background: var(--accent-hover);
}
.id-action-btn.secondary {
  background: var(--surface);
  color: var(--text);
  border-color: var(--hairline);
}
.id-action-btn.secondary:hover {
  background: var(--hover);
}

/* ── macOS Code Window ── */
.macos-code-window {
  background: #1d1d1f;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--sh-panel);
}
.window-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #141416;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.window-dots {
  display: flex;
  gap: 6px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.close { background: #ff5f56; }
.dot.min { background: #ffbd2e; }
.dot.max { background: #27c93f; }

.window-title {
  font-family: var(--mono);
  font-size: 11.5px;
  color: rgba(255,255,255,0.6);
}
.window-copy-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
}
.window-code-content {
  padding: 16px;
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.6;
  color: #e3e3e3;
  max-height: 220px;
  overflow-y: auto;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ── Modal Footer ── */
.modal-footer-flex {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}
.footer-btn {
  height: 38px;
  padding: 0 18px;
  border-radius: var(--r-pill);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
}
.footer-btn.secondary {
  background: var(--surface);
  color: var(--text);
  border-color: var(--hairline);
}
.footer-btn.secondary:hover {
  background: var(--hover);
}
.footer-btn.primary {
  background: var(--accent);
  color: #ffffff;
}
.footer-btn.primary:hover {
  background: var(--accent-hover);
}
</style>
