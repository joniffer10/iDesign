<template>
  <section class="hero-section">
    <div class="hero-container">
      <!-- Live Indicator Header -->
      <div class="live-status">
        <span class="pulse-dot"></span>
        <span class="live-text">VUE 3 & NUXT 3 READY</span>
      </div>

      <!-- Main Headline -->
      <h1 class="hero-title">
        Apple-Grade UI Components.<br />
        <span class="gradient-text">Copy, Paste, or Install.</span>
      </h1>

      <p class="hero-subtitle">
        Built strictly on Liquid Glass design tokens — calm light grey ground, unified white surfaces, hairline dividers, negative tracking typography, and frosted glass.
      </p>

      <!-- Quick Command Bar -->
      <div class="command-bar">
        <div class="code-terminal">
          <span class="prompt">$</span>
          <span class="cmd">npx idesign init</span>
        </div>
        <button type="button" class="copy-cmd-btn" @click="copyCommand">
          <svg v-if="copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span>{{ copied ? 'Copied!' : 'Copy CLI' }}</span>
        </button>
      </div>

      <!-- Live Feature Chips -->
      <div class="feature-chips">
        <span class="chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          No Fragmented Cards
        </span>
        <span class="chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
          Glass Only on Overlap
        </span>
        <span class="chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Vue 3 & Nuxt 3 SFC
        </span>
        <span class="chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Zero Weight Runtime
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toast'])
const copied = ref(false)

const copyCommand = () => {
  navigator.clipboard.writeText('npx idesign init')
  copied.value = true
  emit('toast', 'Copied "npx idesign init" to clipboard!')
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.hero-section {
  max-width: var(--max-grid);
  margin: 0 auto;
  padding: clamp(40px, 7vw, 70px) var(--pad-x) clamp(24px, 4vw, 40px);
  text-align: center;
}
.hero-container {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.live-status {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  padding: 6px 14px;
  border-radius: var(--r-pill);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  margin-bottom: 20px;
}
.live-text {
  font-size: 11.5px;
  font-weight: 650;
  letter-spacing: 0.12em;
  color: var(--text-2);
}

.hero-title {
  font-size: clamp(34px, 6vw, 56px);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.08;
  color: var(--text);
}
.gradient-text {
  background: var(--grad-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  margin-top: 18px;
  font-size: clamp(16px, 2.4vw, 19px);
  color: var(--text-2);
  line-height: 1.6;
  max-width: 640px;
}

.command-bar {
  margin-top: 28px;
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-pill);
  padding: 6px 8px 6px 20px;
  box-shadow: var(--sh-card);
  gap: 16px;
}
.code-terminal {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 14px;
}
.prompt {
  color: var(--accent);
  font-weight: 700;
}
.cmd {
  color: var(--text);
  font-weight: 600;
}
.copy-cmd-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border-radius: var(--r-pill);
  background: var(--hover);
  color: var(--text);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--hairline);
  cursor: pointer;
  transition: all 0.15s ease;
}
.copy-cmd-btn:hover {
  background: var(--track);
}

.feature-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 550;
  color: var(--text-2);
  background: var(--surface);
  border: 1px solid var(--hairline);
  padding: 5px 12px;
  border-radius: var(--r-pill);
}

@media (max-width: 600px) {
  .command-bar {
    width: 100%;
    justify-content: space-between;
    padding: 6px 6px 6px 14px;
  }
  .code-terminal {
    font-size: 12.5px;
  }
  .chip {
    font-size: 11.5px;
    padding: 4px 10px;
  }
}
</style>
