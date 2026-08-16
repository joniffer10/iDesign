<template>
  <span :class="['id-tag', `tag-${computedVariant}`, `color-${currentColor}`, `size-${currentSize}`, `radius-${currentRadius}`, { 'is-removable': removable }, config.mergedUi.value.base]">
    <!-- Left Icon (via slot or iconLeft prop) -->
    <span v-if="$slots.iconLeft || iconLeft" :class="['tag-icon left', config.mergedUi.value.icon]">
      <slot name="iconLeft">
        <component :is="iconLeft" v-if="isComponent(iconLeft)" :size="iconSize" />
        <span v-else>{{ iconLeft }}</span>
      </slot>
    </span>

    <!-- Tag Label -->
    <span :class="['tag-label', config.mergedUi.value.label]">
      <slot>{{ label }}</slot>
    </span>

    <!-- Right Icon (via slot or iconRight prop) -->
    <span v-if="$slots.iconRight || iconRight" :class="['tag-icon right', config.mergedUi.value.icon]">
      <slot name="iconRight">
        <component :is="iconRight" v-if="isComponent(iconRight)" :size="iconSize" />
        <span v-else>{{ iconRight }}</span>
      </slot>
    </span>

    <!-- Removable Dismiss Button -->
    <button
      v-if="removable"
      type="button"
      :class="['remove-btn', config.mergedUi.value.removeButton]"
      aria-label="Remove tag"
      @click="$emit('remove', $event)"
    >
      <X :size="11" />
    </button>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { X } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  label: String,
  variant: {
    type: String,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  size: {
    type: String,
    default: undefined
  },
  radius: {
    type: String,
    default: undefined
  },
  iconLeft: [Object, Function, String],
  iconRight: [Object, Function, String],
  removable: Boolean,
  ui: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['remove'])

const config = useIdesignConfig('Tag', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'full')
const resolvedVariant = computed(() => config.resolvedVariant.value || 'plain')
const resolvedColor = computed(() => config.resolvedColor.value || 'default')

const computedVariant = computed(() => {
  // If variant is soft, we map it to colored classes based on resolvedColor
  const v = resolvedVariant.value
  if (v === 'default') return 'plain'
  if (v === 'soft') {
    const c = resolvedColor.value
    if (c === 'primary' || c === 'accent') return 'accent'
    if (c === 'success') return 'success'
    if (c === 'warning') return 'warning'
    if (c === 'danger') return 'danger'
    return 'plain'
  }
  return v
})

const currentColor = computed(() => {
  const c = resolvedColor.value
  if (c === 'default') return 'default'
  if (c === 'primary') return 'accent'
  return c
})

const iconSize = computed(() => currentSize.value === 'sm' ? 11 : currentSize.value === 'lg' ? 14 : 12.5)
const isComponent = (val) => typeof val === 'object' || typeof val === 'function'
</script>

<style scoped>
.id-tag {
  display: inline-flex; align-items: center; gap: 5px; font-family: var(--font);
  white-space: nowrap; border-radius: var(--r-pill); transition: all 0.15s ease;
  user-select: none;
}

/* Radius Classes */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip) !important; }
.radius-md { border-radius: var(--r-thumb) !important; }
.radius-lg { border-radius: var(--r-card) !important; }
.radius-full { border-radius: var(--r-pill) !important; }

/* Size Classes */
.size-xs { font-size: 10px; padding: 1px 5px; }
.size-sm { font-size: 10.5px; padding: 2px 7px; }
.size-md { font-size: 11.5px; padding: 3px 10px; }
.size-lg { font-size: 13px; padding: 4px 12px; }
.size-xl { font-size: 15px; padding: 6px 16px; }

.tag-plain { color: var(--text-2); background: var(--hover); border: 1px solid var(--hairline); }
.tag-accent { color: var(--accent); background: rgba(0, 113, 227, 0.1); border: 1px solid rgba(0, 113, 227, 0.2); font-weight: 600; }
.tag-success { color: #248a3d; background: rgba(52, 199, 89, 0.1); border: 1px solid rgba(52, 199, 89, 0.2); font-weight: 600; }
.tag-warning { color: #b25000; background: rgba(255, 159, 10, 0.1); border: 1px solid rgba(255, 159, 10, 0.2); font-weight: 600; }
.tag-danger { color: #d70015; background: rgba(255, 59, 48, 0.1); border: 1px solid rgba(255, 59, 48, 0.2); font-weight: 600; }
.tag-heat { color: #ff3b30; background: rgba(255, 59, 48, 0.12); font-weight: 650; }
.tag-mono { font-family: var(--mono); color: #ffffff; background: var(--text); padding: 2px 7px; border-radius: var(--r-chip); font-weight: 700; }

/* Outline variant support */
.tag-outline { color: var(--text-2); background: transparent; border: 1px solid var(--faint); }
.color-accent.tag-outline { color: var(--accent); border-color: var(--accent); }
.color-success.tag-outline { color: #248a3d; border-color: #248a3d; }
.color-warning.tag-outline { color: #b25000; border-color: #b25000; }
.color-danger.tag-outline { color: #d70015; border-color: #d70015; }

/* Dark mode explicit high-contrast text & background overlays */
:root.dark .tag-accent { color: #2997ff; background: rgba(41, 151, 255, 0.15); border-color: rgba(41, 151, 255, 0.3); }
:root.dark .tag-success { color: #34c759; background: rgba(52, 199, 89, 0.15); border-color: rgba(52, 199, 89, 0.3); }
:root.dark .tag-warning { color: #ff9500; background: rgba(255, 159, 10, 0.15); border-color: rgba(255, 159, 10, 0.3); }
:root.dark .tag-danger { color: #ff453a; background: rgba(255, 69, 58, 0.15); border-color: rgba(255, 69, 58, 0.3); }
:root.dark .tag-heat { color: #ff453a; background: rgba(255, 69, 58, 0.18); }
:root.dark .tag-mono { color: #000000; background: #ffffff; }

.tag-icon { display: inline-flex; align-items: center; }

.remove-btn {
  border: none; background: transparent; color: inherit; opacity: 0.65;
  cursor: pointer; padding: 0; display: flex; align-items: center; margin-left: 2px;
  transition: opacity 0.15s;
}
.remove-btn:hover { opacity: 1; }
</style>
