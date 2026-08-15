<template>
  <IdModal
    :model-value="modelValue"
    title="Install Idesign to Any Vue 3 / Nuxt 3 Project"
    max-width="640px"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="install-guide-layout">
      <!-- Option 1: Automatic CLI -->
      <div class="option-card">
        <div class="option-badge">Option 1 (Recommended)</div>
        <h4 class="option-title">Add Components via CLI</h4>
        <p class="option-desc">Install Idesign tokens and add individual components directly into your project's `components/` folder.</p>

        <div class="terminal-block">
          <code>npx idesign init</code>
          <button class="copy-small-btn" @click="copyText('npx idesign init', 'CLI init command')">Copy</button>
        </div>

        <div class="terminal-block mt-2">
          <code>npx idesign add button panel hero-cta glass-nav</code>
          <button class="copy-small-btn" @click="copyText('npx idesign add button panel hero-cta glass-nav', 'CLI add command')">Copy</button>
        </div>
      </div>

      <!-- Option 2: Nuxt 3 Module / Auto-Imports -->
      <div class="option-card">
        <div class="option-badge">Option 2</div>
        <h4 class="option-title">Nuxt 3 Auto-Import Integration</h4>
        <p class="option-desc">Drop components into your Nuxt 3 <code>components/idesign/</code> directory. Nuxt 3 auto-imports them with zero configuration required!</p>

        <div class="terminal-block">
          <code>npm install @idesign/vue-core lucide-vue-next</code>
          <button class="copy-small-btn" @click="copyText('npm install @idesign/vue-core lucide-vue-next', 'npm install command')">Copy</button>
        </div>
      </div>

      <!-- Option 3: Manual Copy SFC -->
      <div class="option-card">
        <div class="option-badge">Option 3</div>
        <h4 class="option-title">Manual Copy-Paste</h4>
        <p class="option-desc">Click <strong>Inspect & Test</strong> on any component card in the catalog, click <strong>Copy Code</strong>, and save as <code>.vue</code> in your codebase.</p>
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

const copyText = (text, label) => {
  navigator.clipboard.writeText(text)
  emit('toast', `Copied ${label}!`)
}
</script>

<style scoped>
.install-guide-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.option-card {
  background: var(--bg);
  border-radius: var(--r-card);
  padding: 18px;
  border: 1px solid var(--hairline);
}
.option-badge {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}
.option-title {
  font-size: 16px;
  font-weight: 650;
  margin-bottom: 4px;
  color: var(--text);
}
.option-desc {
  font-size: 13.5px;
  color: var(--text-2);
  margin-bottom: 12px;
  line-height: 1.5;
}
.terminal-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1d1d1f;
  color: #ffffff;
  padding: 10px 14px;
  border-radius: 10px;
  font-family: var(--mono);
  font-size: 13px;
}
.copy-small-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  font-family: var(--font);
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--r-pill);
  cursor: pointer;
}
.mt-2 { margin-top: 8px; }
</style>
