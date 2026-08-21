<template>
  <!-- Variant 1: Segmented 3-Way Control (Light | Dark | Auto) -->
  <div
    v-if="variant === 'segmented'"
    :class="[
      'id-theme-toggle-segmented',
      `size-${size}`,
      { 'is-disabled': disabled },
      config.mergedUi.value.base
    ]"
    role="radiogroup"
    aria-label="Color Scheme Preference"
  >
    <button
      type="button"
      role="radio"
      :aria-checked="currentTheme === 'light'"
      :disabled="disabled"
      :class="['segmented-item', { active: currentTheme === 'light' }]"
      @click="handleSelectTheme('light', $event)"
    >
      <span class="theme-icon-box light-icon">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </span>
      <span v-if="showLabel" class="segmented-label">{{ lightLabel }}</span>
    </button>

    <button
      type="button"
      role="radio"
      :aria-checked="currentTheme === 'dark'"
      :disabled="disabled"
      :class="['segmented-item', { active: currentTheme === 'dark' }]"
      @click="handleSelectTheme('dark', $event)"
    >
      <span class="theme-icon-box dark-icon">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      </span>
      <span v-if="showLabel" class="segmented-label">{{ darkLabel }}</span>
    </button>

    <button
      type="button"
      role="radio"
      :aria-checked="currentTheme === 'auto'"
      :disabled="disabled"
      :class="['segmented-item', { active: currentTheme === 'auto' }]"
      @click="handleSelectTheme('auto', $event)"
    >
      <span class="theme-icon-box auto-icon">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2"/>
          <line x1="8" x2="16" y1="21" y2="21"/>
          <line x1="12" x2="12" y1="17" y2="21"/>
        </svg>
      </span>
      <span v-if="showLabel" class="segmented-label">{{ autoLabel }}</span>
    </button>
  </div>

  <!-- Variant 2: Switch / Slider Track -->
  <button
    v-else-if="variant === 'switch'"
    type="button"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :disabled="disabled"
    :class="[
      'id-theme-toggle-switch',
      `size-${size}`,
      { 'is-dark': isDark, 'is-disabled': disabled },
      config.mergedUi.value.base
    ]"
    @click="handleToggleClick"
  >
    <span class="switch-track-icons">
      <span class="track-sun">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </span>
      <span class="track-moon">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      </span>
    </span>
    <span class="switch-thumb">
      <span :class="['thumb-icon-wrapper', { 'is-dark': isDark }]">
        <svg v-if="isDark" class="thumb-moon" viewBox="0 0 24 24" width="13" height="13" fill="currentColor" stroke="currentColor" stroke-width="1.5">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
        <svg v-else class="thumb-sun" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </span>
    </span>
  </button>

  <!-- Variant 3: Standard Button, Icon Only, or Glass Chip -->
  <button
    v-else
    type="button"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    :disabled="disabled"
    :class="[
      'id-theme-toggle-btn',
      `variant-${variant}`,
      `size-${size}`,
      { 'is-dark': isDark, 'is-disabled': disabled, 'icon-only': variant === 'icon' || !showLabel },
      config.mergedUi.value.base
    ]"
    @click="handleToggleClick"
  >
    <div class="toggle-icon-container" :class="{ 'is-dark': isDark }">
      <!-- Sun Icon (Active when Light, morphs out when Dark) -->
      <span class="icon-layer icon-sun" aria-hidden="true">
        <svg viewBox="0 0 24 24" :width="iconSize" :height="iconSize" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </span>

      <!-- Moon Icon (Active when Dark, morphs in) -->
      <span class="icon-layer icon-moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" :width="iconSize" :height="iconSize" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      </span>
    </div>

    <span v-if="showLabel && variant !== 'icon'" class="toggle-label-text">
      {{ isDark ? lightLabel : darkLabel }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { useTheme } from '../../composables/useTheme'

const props = defineProps({
  modelValue: {
    type: [String, Boolean],
    default: undefined
  },
  variant: {
    type: String,
    default: 'button', // 'button' | 'icon' | 'segmented' | 'switch' | 'glass'
    validator: (v) => ['button', 'icon', 'segmented', 'switch', 'glass'].includes(v)
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  lightLabel: {
    type: String,
    default: 'Light'
  },
  darkLabel: {
    type: String,
    default: 'Dark'
  },
  autoLabel: {
    type: String,
    default: 'Auto'
  },
  animated: {
    type: Boolean,
    default: true
  },
  transitionEffect: {
    type: String,
    default: 'reveal', // 'reveal' | 'fade' | 'none'
    validator: (v) => ['reveal', 'fade', 'none'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const config = useIdesignConfig('ThemeToggle', props)
const globalTheme = useTheme()

// Determine if controlled or uncontrolled
const isControlled = computed(() => props.modelValue !== undefined)

const currentTheme = computed(() => {
  if (isControlled.value) {
    if (typeof props.modelValue === 'boolean') {
      return props.modelValue ? 'dark' : 'light'
    }
    return props.modelValue || 'light'
  }
  return globalTheme.theme.value
})

const isDark = computed(() => {
  if (isControlled.value) {
    if (typeof props.modelValue === 'boolean') return props.modelValue
    return props.modelValue === 'dark'
  }
  return globalTheme.isDark.value
})

const iconSize = computed(() => {
  if (props.size === 'sm') return 14
  if (props.size === 'lg') return 18
  return 15
})

const handleToggleClick = (event) => {
  if (props.disabled) return

  const effect = props.animated ? props.transitionEffect : 'none'
  const nextDark = !isDark.value
  const nextTheme = nextDark ? 'dark' : 'light'

  if (isControlled.value) {
    emit('update:modelValue', typeof props.modelValue === 'boolean' ? nextDark : nextTheme)
    emit('change', nextTheme)
  }

  // Animate global theme transition
  globalTheme.toggleTheme({
    event,
    effect
  })
}

const handleSelectTheme = (targetTheme, event) => {
  if (props.disabled || currentTheme.value === targetTheme) return

  const effect = props.animated ? props.transitionEffect : 'none'

  if (isControlled.value) {
    emit('update:modelValue', typeof props.modelValue === 'boolean' ? (targetTheme === 'dark') : targetTheme)
    emit('change', targetTheme)
  }

  globalTheme.setTheme(targetTheme, {
    event,
    effect
  })
}
</script>

<style scoped>
/* ════════════════════════════════════════════════════════════════
   1. Standard Button & Glass Toggle Variant
   ════════════════════════════════════════════════════════════════ */
.id-theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: var(--r-pill);
  font-family: var(--font);
  font-weight: 550;
  cursor: pointer;
  user-select: none;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-xs);
  transition: background 0.2s var(--ease-out-quart),
              color 0.2s var(--ease-out-quart),
              border-color 0.2s var(--ease-out-quart),
              box-shadow 0.2s var(--ease-out-quart),
              transform 0.15s var(--ease-spring);
  outline: none;
}

.id-theme-toggle-btn:hover:not(:disabled) {
  background: var(--hover);
  border-color: rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

:root.dark .id-theme-toggle-btn:hover:not(:disabled),
html[data-theme="dark"] .id-theme-toggle-btn:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.2);
}

.id-theme-toggle-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.id-theme-toggle-btn:focus-visible {
  box-shadow: var(--focus-ring);
}

.id-theme-toggle-btn.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Glass Variant */
.id-theme-toggle-btn.variant-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  border-color: rgba(255, 255, 255, 0.4);
}

:root.dark .id-theme-toggle-btn.variant-glass,
html[data-theme="dark"] .id-theme-toggle-btn.variant-glass {
  background: rgba(44, 44, 46, 0.75);
  border-color: rgba(255, 255, 255, 0.15);
}

/* Sizing Scale */
.id-theme-toggle-btn.size-sm {
  height: 28px;
  padding: 0 10px;
  font-size: 12.5px;
}
.id-theme-toggle-btn.size-sm.icon-only {
  width: 28px;
  padding: 0;
}

.id-theme-toggle-btn.size-md {
  height: 34px;
  padding: 0 13px;
  font-size: 13.5px;
}
.id-theme-toggle-btn.size-md.icon-only {
  width: 34px;
  padding: 0;
}

.id-theme-toggle-btn.size-lg {
  height: 42px;
  padding: 0 16px;
  font-size: 15px;
}
.id-theme-toggle-btn.size-lg.icon-only {
  width: 42px;
  padding: 0;
}

/* ════════════════════════════════════════════════════════════════
   2. Restrained Morphing Icon Motion Container
   ════════════════════════════════════════════════════════════════ */
.toggle-icon-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.icon-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.28s var(--ease-spring),
              opacity 0.22s var(--ease-out-quart);
}

/* When label is "Dark" (Light environment): Moon visible */
.icon-moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
  color: var(--text-2);
}
.icon-sun {
  opacity: 0;
  transform: rotate(35deg) scale(0.6);
  color: #ff9f0a;
}

/* When label is "Light" (Dark environment): Sun visible */
.toggle-icon-container.is-dark .icon-moon {
  opacity: 0;
  transform: rotate(-35deg) scale(0.6);
}
.toggle-icon-container.is-dark .icon-sun {
  opacity: 1;
  transform: rotate(0deg) scale(1);
  color: #ff9f0a;
}

.toggle-label-text {
  letter-spacing: -0.01em;
}

/* ════════════════════════════════════════════════════════════════
   3. Segmented 3-Way Control Variant
   ════════════════════════════════════════════════════════════════ */
.id-theme-toggle-segmented {
  display: inline-flex;
  align-items: center;
  padding: 3px;
  background: var(--track);
  border-radius: var(--r-pill);
  gap: 2px;
  user-select: none;
}

.id-theme-toggle-segmented.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.segmented-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  border: none;
  background: transparent;
  color: var(--text-2);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  transition: all 0.2s var(--ease-out-quart);
  outline: none;
}

.segmented-item:hover:not(:disabled):not(.active) {
  color: var(--text);
}

.segmented-item.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
}

.segmented-item:focus-visible {
  box-shadow: var(--focus-ring);
}

.size-sm .segmented-item {
  padding: 3px 8px;
  font-size: 12px;
}
.size-lg .segmented-item {
  padding: 6px 14px;
  font-size: 14.5px;
}

.theme-icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* ════════════════════════════════════════════════════════════════
   4. Native Switch Variant
   ════════════════════════════════════════════════════════════════ */
.id-theme-toggle-switch {
  position: relative;
  width: 52px;
  height: 30px;
  padding: 2px;
  border-radius: var(--r-pill);
  background: var(--track);
  border: none;
  cursor: pointer;
  outline: none;
  transition: background 0.25s var(--ease-out-quart), box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.id-theme-toggle-switch.is-dark {
  background: #3a3a3c;
}

.id-theme-toggle-switch:focus-visible {
  box-shadow: var(--focus-ring);
}

.switch-track-icons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px;
  pointer-events: none;
  color: var(--text-3);
  opacity: 0.6;
}

.switch-thumb {
  position: relative;
  z-index: 2;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s var(--ease-spring), background 0.2s ease;
  transform: translateX(0);
}

.id-theme-toggle-switch.is-dark .switch-thumb {
  transform: translateX(22px);
  background: #1c1c1e;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

.thumb-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff9f0a;
  transition: transform 0.25s var(--ease-spring);
}

.thumb-icon-wrapper.is-dark {
  color: #d1d1d6;
}

.size-sm.id-theme-toggle-switch {
  width: 42px;
  height: 24px;
}
.size-sm .switch-thumb {
  width: 20px;
  height: 20px;
}
.size-sm.id-theme-toggle-switch.is-dark .switch-thumb {
  transform: translateX(18px);
}

.size-lg.id-theme-toggle-switch {
  width: 62px;
  height: 36px;
}
.size-lg .switch-thumb {
  width: 32px;
  height: 32px;
}
.size-lg.id-theme-toggle-switch.is-dark .switch-thumb {
  transform: translateX(26px);
}
</style>
