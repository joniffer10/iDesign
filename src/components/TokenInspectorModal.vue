<template>
  <IdModal
    :model-value="modelValue"
    title="Apple Liquid Glass — Tokens & Rules"
    max-width="840px"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="tokens-layout">
      <!-- 5 Philosophy Rules -->
      <div class="rules-box">
        <h4 class="section-heading">The 5 Core Philosophy Rules</h4>
        <div class="rules-list">
          <div class="rule-card">
            <span class="rule-num">1</span>
            <div>
              <strong>Unified surface > fragmented cards:</strong> Sibling items belong on one white panel with hairline dividers.
            </div>
          </div>
          <div class="rule-card">
            <span class="rule-num">2</span>
            <div>
              <strong>Glass is seasoning, not the dish:</strong> `backdrop-filter` frost ONLY where layers actually overlap. Plain content areas stay solid white.
            </div>
          </div>
          <div class="rule-card">
            <span class="rule-num">3</span>
            <div>
              <strong>Restraint is luxury:</strong> If whitespace and clean hierarchy can solve it, don't add borders, fills, or decorative icons.
            </div>
          </div>
          <div class="rule-card">
            <span class="rule-num">4</span>
            <div>
              <strong>Hierarchy from weight & size, not color:</strong> Body interface is black-white-grey. Reserve color for accent (blue), heat (orange), live.
            </div>
          </div>
          <div class="rule-card">
            <span class="rule-num">5</span>
            <div>
              <strong>Apple details:</strong> Negative tracking on titles, `tabular-nums` for data, 180% saturation blur, spring-like easing.
            </div>
          </div>
        </div>
      </div>

      <!-- Color Tokens Palette -->
      <div class="tokens-section">
        <h4 class="section-heading">Color Palette Tokens</h4>
        <div class="swatches-grid">
          <div class="swatch-card" style="background:#f5f5f7;">
            <span class="swatch-label">--bg (#f5f5f7)</span>
            <span class="swatch-desc">Cool Grey Ground</span>
          </div>
          <div class="swatch-card" style="background:#ffffff; border:1px solid #e5e5e5; color:#111;">
            <span class="swatch-label">--surface (#ffffff)</span>
            <span class="swatch-desc">Panel / Surface</span>
          </div>
          <div class="swatch-card" style="background:#1d1d1f; color:#fff;">
            <span class="swatch-label">--text (#1d1d1f)</span>
            <span class="swatch-desc">Primary Titles</span>
          </div>
          <div class="swatch-card" style="background:#6e6e73; color:#fff;">
            <span class="swatch-label">--text-2 (#6e6e73)</span>
            <span class="swatch-desc">Secondary Meta</span>
          </div>
          <div class="swatch-card" style="background:#0071e3; color:#fff;">
            <span class="swatch-label">--accent (#0071e3)</span>
            <span class="swatch-desc">Apple Blue</span>
          </div>
          <div class="swatch-card" style="background:#ff6b00; color:#fff;">
            <span class="swatch-label">--heat (#ff6b00)</span>
            <span class="swatch-desc">Heat Accent</span>
          </div>
          <div class="swatch-card" style="background:#30d158; color:#fff;">
            <span class="swatch-label">--live (#30d158)</span>
            <span class="swatch-desc">Live Status</span>
          </div>
          <div class="swatch-card" style="background:rgba(0,0,0,0.07); border:1px solid #ccc; color:#111;">
            <span class="swatch-label">--hairline</span>
            <span class="swatch-desc">rgba(0,0,0,0.07)</span>
          </div>
        </div>
      </div>

      <!-- Radius Semantic Tiers -->
      <div class="tokens-section">
        <h4 class="section-heading">Radius Semantic Tiers</h4>
        <div class="radius-flex">
          <div class="radius-box r-pill">--r-pill (999px)</div>
          <div class="radius-box r-hero">--r-hero (26px)</div>
          <div class="radius-box r-panel">--r-panel (22px)</div>
          <div class="radius-box r-card">--r-card (18px)</div>
          <div class="radius-box r-thumb">--r-thumb (12px)</div>
          <div class="radius-box r-chip">--r-chip (6px)</div>
        </div>
      </div>
    </div>

    <template #footer>
      <button type="button" class="copy-tokens-btn" @click="copyTokensCss">
        Copy Full tokens.css File
      </button>
    </template>
  </IdModal>
</template>

<script setup>
import IdModal from './idesign/IdModal.vue'

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'toast'])

const copyTokensCss = () => {
  const css = `:root {
  --bg: #f5f5f7; --surface: #ffffff; --text: #1d1d1f; --text-2: #6e6e73;
  --hairline: rgba(0,0,0,0.07); --accent: #0071e3; --live: #30d158;
  --r-pill: 999px; --r-card: 18px; --r-panel: 22px; --r-hero: 26px;
  --sh-card: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05);
  --sh-panel: 0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05);
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
}`
  navigator.clipboard.writeText(css)
  emit('toast', 'Copied Apple tokens.css to clipboard!')
}
</script>

<style scoped>
.tokens-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.section-heading {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
  color: var(--text);
}
.rules-box {
  background: var(--bg);
  border-radius: var(--r-card);
  padding: 18px;
}
.rules-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rule-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13.5px;
  color: var(--text-body);
  line-height: 1.5;
}
.rule-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.swatches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px;
}
.swatch-card {
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.swatch-label {
  font-family: var(--mono);
  font-size: 11.5px;
  font-weight: 600;
}
.swatch-desc {
  font-size: 11px;
  opacity: 0.8;
}

.radius-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.radius-box {
  background: var(--bg);
  border: 1px solid var(--hairline);
  padding: 10px 14px;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
}
.r-pill { border-radius: 999px; }
.r-hero { border-radius: 26px; }
.r-panel { border-radius: 22px; }
.r-card { border-radius: 18px; }
.r-thumb { border-radius: 12px; }
.r-chip { border-radius: 6px; }

.copy-tokens-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  font-family: var(--font);
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: var(--r-pill);
  cursor: pointer;
}
</style>
