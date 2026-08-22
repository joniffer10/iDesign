<template>
  <component
    :is="tag"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :class="[
      'id-btn',
      `btn-${currentVariant}`,
      `color-${currentColor}`,
      `size-${currentSize}`,
      `density-${currentDensity}`,
      `radius-${currentRadius}`,
      { 'is-disabled': disabled || loading, 'is-block': block, 'is-loading': loading },
      config.mergedUi.value.base
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="$emit('click', $event)"
  >
    <Loader2 v-if="loading" :class="['btn-spinner', config.mergedUi.value.spinner]" :size="iconSize" />
    <template v-else>
      <!-- Left Icon (via slot or iconLeft prop) -->
      <span v-if="$slots.iconLeft || iconLeft" :class="['btn-icon left', config.mergedUi.value.icon]">
        <slot name="iconLeft">
          <component :is="iconLeft" v-if="isComponent(iconLeft)" :size="iconSize" />
          <span v-else>{{ iconLeft }}</span>
        </slot>
      </span>

      <!-- Button Label -->
      <span v-if="$slots.default || label" :class="['btn-label', config.mergedUi.value.label]">
        <slot>{{ label }}</slot>
      </span>

      <!-- Right Icon (via slot or iconRight prop) -->
      <span v-if="$slots.iconRight || iconRight" :class="['btn-icon right', config.mergedUi.value.icon]">
        <slot name="iconRight">
          <component :is="iconRight" v-if="isComponent(iconRight)" :size="iconSize" />
          <span v-else>{{ iconRight }}</span>
        </slot>
      </span>
    </template>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { Loader2 } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  label: String,
  variant: { type: String, default: undefined },
  color: { type: String, default: undefined },
  size: { type: String, default: undefined },
  density: { type: String, default: undefined },
  iconLeft: [Object, Function, String],
  iconRight: [Object, Function, String],
  href: String,
  type: { type: String, default: 'button' },
  disabled: Boolean,
  loading: Boolean,
  block: Boolean,
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['click'])

const config = useIdesignConfig('Button', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentDensity = computed(() => config.resolvedDensity.value || 'comfortable')

const currentRadius = computed(() => {
  // pill variant forces full radius
  const v = resolvedVariantRaw.value
  if (v === 'pill') return 'full'
  return config.resolvedRadius.value || 'full'
})

const resolvedVariantRaw = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'primary': 'solid',
    'filled': 'solid',
    'tinted': 'soft'
  })
})

const currentVariant = computed(() => {
  const v = resolvedVariantRaw.value
  // Map canonical variants to CSS class names
  if (v === 'default' || v === 'solid') return 'primary'
  if (v === 'soft') return 'soft'
  if (v === 'subtle') return 'subtle'
  if (v === 'pill') return 'primary' // pill changes radius, not surface treatment
  return v
})

const currentColor = computed(() => {
  const c = config.resolvedColor.value || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  if (c === 'success') return 'green'
  if (c === 'warning') return 'orange'
  if (c === 'danger') return 'red'
  return c
})

const tag = computed(() => props.href ? 'a' : 'button')
const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 12 : sz === 'sm' ? 14 : sz === 'lg' ? 18 : sz === 'xl' ? 20 : 16
})

const isComponent = (val) => typeof val === 'object' || typeof val === 'function'
</script>

<style scoped>
.id-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: var(--r-pill); font-family: var(--font); text-decoration: none; border: none;
  cursor: pointer; white-space: nowrap; transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  user-select: none;
  outline: none;
}
.id-btn:focus-visible {
  box-shadow: var(--focus-ring);
}
.id-btn.is-block { width: 100%; display: flex; }
.id-btn:active:not(.is-disabled) { transform: scale(0.97); }

/* Radius Classes */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip) !important; }
.radius-md { border-radius: var(--r-thumb) !important; }
.radius-lg { border-radius: var(--r-card) !important; }
.radius-full { border-radius: var(--r-pill) !important; }

/* Size Variants */
.size-xs { height: 28px; padding: 0 10px; font-size: 12px; font-weight: 550; }
.size-sm { height: 36px; padding: 0 14px; font-size: 13px; font-weight: 550; }
.size-md { height: 44px; padding: 0 20px; font-size: 14.5px; font-weight: 600; }
.size-lg { height: 50px; padding: 0 26px; font-size: 16px; font-weight: 650; }
.size-xl { height: 56px; padding: 0 30px; font-size: 17.5px; font-weight: 700; }

/* Density Modifiers */
.density-compact.size-sm { height: 32px; padding: 0 10px; }
.density-compact.size-md { height: 38px; padding: 0 14px; }
.density-spacious.size-md { height: 48px; padding: 0 24px; }

/* Base Variants */
.btn-primary { background: var(--accent); color: #ffffff; }
.btn-primary:hover:not(.is-disabled) { background: #0062c4; }

.btn-secondary {
  background: var(--surface); border: 1px solid var(--hairline);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); color: var(--text);
}
.btn-secondary:hover:not(.is-disabled) { background: var(--hover); box-shadow: var(--sh-card); }

.btn-subtle {
  background: rgba(0, 113, 227, 0.08); color: var(--accent); border: none;
}
.btn-subtle:hover:not(.is-disabled) { background: rgba(0, 113, 227, 0.15); }
:root.dark .btn-subtle { background: rgba(10, 132, 255, 0.15); color: #0a84ff; }
:root.dark .btn-subtle:hover:not(.is-disabled) { background: rgba(10, 132, 255, 0.25); }

.btn-outline {
  background: transparent; border: 1.5px solid var(--accent); color: var(--accent);
}
:root.dark .btn-outline { color: #2997ff; border-color: #2997ff; }
.btn-outline:hover:not(.is-disabled) { background: rgba(0, 113, 227, 0.08); }
:root.dark .btn-outline:hover:not(.is-disabled) { background: rgba(41, 151, 255, 0.12); }

.btn-glass {
  background: rgba(255, 255, 255, 0.16); border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: var(--text);
}
.btn-glass:hover:not(.is-disabled) { background: rgba(255, 255, 255, 0.26); }

.btn-dark { background: var(--text); color: var(--bg); }
.btn-dark:hover:not(.is-disabled) { opacity: .9; }

.btn-ghost { background: transparent; color: var(--text-2); }
.btn-ghost:hover:not(.is-disabled) { background: var(--hover); color: var(--text); }

.btn-danger { background: #ff3b30; color: #ffffff; }
.btn-danger:hover:not(.is-disabled) { background: #d70015; }

.btn-soft {
  background: var(--variant-soft-bg); color: var(--variant-soft-color); border: none;
}
.btn-soft:hover:not(.is-disabled) { background: var(--variant-soft-bg-hover); }

.btn-hero {
  background: var(--variant-hero-bg); border: var(--variant-hero-border);
  color: var(--text); box-shadow: var(--variant-hero-shadow);
}
.btn-hero:hover:not(.is-disabled) { box-shadow: var(--variant-hero-shadow), var(--sh-lift); transform: translateY(-1px); }

/* Custom Color Overrides for Primary */
.color-green.btn-primary { background: #34c759; color: #ffffff; }
.color-green.btn-primary:hover:not(.is-disabled) { background: #28a745; }

.color-purple.btn-primary { background: #af52de; color: #ffffff; }
.color-purple.btn-primary:hover:not(.is-disabled) { background: #9b30d0; }

.color-orange.btn-primary { background: #ff9500; color: #ffffff; }
.color-orange.btn-primary:hover:not(.is-disabled) { background: #e08200; }

.color-red.btn-primary { background: #ff3b30; color: #ffffff; }
.color-red.btn-primary:hover:not(.is-disabled) { background: #d70015; }

.color-black.btn-primary { background: var(--text); color: var(--bg); }
.color-black.btn-primary:hover:not(.is-disabled) { opacity: 0.9; }

.is-disabled {
  opacity: 0.45 !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
  box-shadow: none !important;
  transform: none !important;
}
.btn-icon { display: flex; align-items: center; }

.btn-spinner { animation: btn-spin 0.8s linear infinite; }
@keyframes btn-spin { to { transform: rotate(360deg); } }

@media (max-width: 640px) {
  /* Collapse button text and leave only the icon on small screens */
  .id-btn:has(.btn-icon):has(.btn-label) .btn-label,
  .id-btn:has(.btn-spinner):has(.btn-label) .btn-label {
    display: none;
  }
  .id-btn:has(.btn-icon):has(.btn-label),
  .id-btn:has(.btn-spinner):has(.btn-label) {
    padding: 0 !important;
    justify-content: center;
  }
  .id-btn:has(.btn-icon):has(.btn-label).size-xs,
  .id-btn:has(.btn-spinner):has(.btn-label).size-xs { width: 28px; }
  .id-btn:has(.btn-icon):has(.btn-label).size-sm,
  .id-btn:has(.btn-spinner):has(.btn-label).size-sm { width: 36px; }
  .id-btn:has(.btn-icon):has(.btn-label).size-md,
  .id-btn:has(.btn-spinner):has(.btn-label).size-md { width: 44px; }
  .id-btn:has(.btn-icon):has(.btn-label).size-lg,
  .id-btn:has(.btn-spinner):has(.btn-label).size-lg { width: 50px; }
  .id-btn:has(.btn-icon):has(.btn-label).size-xl,
  .id-btn:has(.btn-spinner):has(.btn-label).size-xl { width: 56px; }
}
</style>
