<template>
  <IdModal
    :model-value="modelValue"
    title="Installation & Setup Guide"
    subtitle="Add Liquid Glass components to any Vue 3 or Nuxt 3 project"
    max-width="680px"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="install-guide-layout">
      <!-- Option 1: Automatic CLI (Recommended) -->
      <div class="option-card is-primary">
        <div class="card-header-row">
          <span class="option-badge recommended">Option 1 • Recommended</span>
          <span class="time-estimate">~30 seconds</span>
        </div>
        <h4 class="option-title">Zero-Bloat CLI Scaffolding</h4>
        <p class="option-desc">
          Scaffold pure SFC source code directly into your <code>components/idesign/</code> directory with zero runtime lock-in.
        </p>

        <div class="terminal-container">
          <div class="terminal-block">
            <div class="code-line">
              <span class="prompt-sym">$</span>
              <code>npx idesign init</code>
            </div>
            <button
              type="button"
              class="terminal-copy-btn"
              @click="copyText('npx idesign init', 'CLI init command')"
            >
              Copy
            </button>
          </div>

          <div class="terminal-block">
            <div class="code-line">
              <span class="prompt-sym">$</span>
              <code>npx idesign add button card modal input</code>
            </div>
            <button
              type="button"
              class="terminal-copy-btn"
              @click="copyText('npx idesign add button card modal input', 'CLI add command')"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <!-- Option 2: Nuxt 3 Module -->
      <div class="option-card">
        <div class="card-header-row">
          <span class="option-badge">Option 2</span>
          <span class="tech-pill">Nuxt 3 Module</span>
        </div>
        <h4 class="option-title">Full Package & Nuxt Auto-Imports</h4>
        <p class="option-desc">
          Install the complete component library package with automatic token injection and auto-imports.
        </p>

        <div class="terminal-container">
          <div class="terminal-block">
            <div class="code-line">
              <span class="prompt-sym">$</span>
              <code>npm install @idesign/vue</code>
            </div>
            <button
              type="button"
              class="terminal-copy-btn"
              @click="copyText('npm install @idesign/vue', 'npm install command')"
            >
              Copy
            </button>
          </div>
        </div>

        <div class="nuxt-config-box">
          <span class="nuxt-config-label">nuxt.config.ts</span>
          <pre class="nuxt-config-code"><code>export default defineNuxtConfig({
  modules: ['@idesign/vue/nuxt']
})</code></pre>
        </div>
      </div>

      <!-- Option 3: CDN Stylesheet -->
      <div class="option-card">
        <div class="card-header-row">
          <span class="option-badge">Option 3</span>
          <span class="tech-pill">HTML + CSS / CDN</span>
        </div>
        <h4 class="option-title">Instant Unpkg CDN Stylesheet</h4>
        <p class="option-desc">
          Include our pre-bundled Liquid Glass stylesheet in any vanilla HTML or multi-page app:
        </p>

        <div class="terminal-container">
          <div class="terminal-block">
            <div class="code-line">
              <code>&lt;link rel="stylesheet" href="https://unpkg.com/@idesign/vue@latest/dist/idesign.css"&gt;</code>
            </div>
            <button
              type="button"
              class="terminal-copy-btn"
              @click="copyText(cdnLink, 'CDN link')"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  </IdModal>
</template>

<script setup>
import IdModal from './idesign/IdModal.vue'

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'toast'])

const cdnLink = '<link rel="stylesheet" href="https://unpkg.com/@idesign/vue@latest/dist/idesign.css">'

const copyText = (text, label) => {
  navigator.clipboard.writeText(text)
  emit('toast', `Copied ${label}!`)
}
</script>

<style scoped>
.install-guide-layout {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: var(--font);
}

.option-card {
  background: var(--surface);
  border-radius: var(--r-panel, 20px);
  padding: 18px 20px;
  border: 1px solid var(--hairline);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: all 0.2s var(--ease-spring);
}

.option-card.is-primary {
  border-color: rgba(0, 113, 227, 0.25);
  background: linear-gradient(180deg, rgba(0, 113, 227, 0.02) 0%, var(--surface) 100%);
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.option-badge {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.option-badge.recommended {
  color: var(--accent);
}

.time-estimate,
.tech-pill {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-3);
  background: var(--hover);
  padding: 2px 8px;
  border-radius: var(--r-pill);
  border: 1px solid var(--hairline);
}

.option-title {
  font-size: 15.5px;
  font-weight: 650;
  margin: 0 0 4px;
  color: var(--text);
  letter-spacing: var(--tracking-tight, -0.02em);
}

.option-desc {
  font-size: 13px;
  color: var(--text-2);
  margin: 0 0 12px;
  line-height: 1.5;
}

.option-desc code {
  font-family: var(--mono);
  background: var(--hover);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid var(--hairline);
}

.terminal-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terminal-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #1d1d1f;
  color: #ffffff;
  padding: 8px 12px 8px 14px;
  border-radius: var(--r-card, 12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.code-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 12.5px;
  min-width: 0;
  overflow: hidden;
}

.code-line code {
  font-family: var(--mono);
  color: #f5f5f7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.prompt-sym {
  color: #30d158;
  font-weight: 700;
  user-select: none;
}

.terminal-copy-btn {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--r-pill);
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.terminal-copy-btn:hover {
  background: var(--accent);
  border-color: transparent;
}

.terminal-copy-btn:active {
  transform: scale(0.95);
}

.nuxt-config-box {
  margin-top: 10px;
  background: var(--hover);
  border: 1px solid var(--hairline);
  border-radius: var(--r-card, 12px);
  padding: 10px 14px;
}

.nuxt-config-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-3);
  margin-bottom: 4px;
  letter-spacing: 0.04em;
}

.nuxt-config-code {
  margin: 0;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text);
  line-height: 1.45;
}

:root.dark .option-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.1);
}
:root.dark .terminal-block {
  background: #000000;
}
</style>
