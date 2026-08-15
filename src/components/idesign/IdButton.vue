<template>
  <component
    :is="tag"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :class="[
      'id-btn',
      `btn-${variant}`,
      `color-${color}`,
      `size-${size}`,
      { 'is-disabled': disabled || loading, 'is-block': block, 'is-loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <Loader2 v-if="loading" class="btn-spinner" :size="iconSize" />
    <template v-else>
      <!-- Left Icon (via slot or iconLeft prop) -->
      <span v-if="$slots.iconLeft || iconLeft" class="btn-icon left">
        <slot name="iconLeft">
          <component :is="iconLeft" v-if="isComponent(iconLeft)" :size="iconSize" />
          <span v-else>{{ iconLeft }}</span>
        </slot>
      </span>

      <!-- Button Label -->
      <span v-if="$slots.default || label" class="btn-label">
        <slot>{{ label }}</slot>
      </span>

      <!-- Right Icon (via slot or iconRight prop) -->
      <span v-if="$slots.iconRight || iconRight" class="btn-icon right">
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

const props = defineProps({
  label: String,
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'secondary', 'outline', 'glass', 'dark', 'ghost', 'danger'].includes(v)
  },
  color: {
    type: String,
    default: 'blue',
    validator: v => ['blue', 'green', 'purple', 'orange', 'red', 'black', 'gray'].includes(v)
  },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  iconLeft: [Object, Function, String],
  iconRight: [Object, Function, String],
  href: String,
  type: { type: String, default: 'button' },
  disabled: Boolean,
  loading: Boolean,
  block: Boolean
})

defineEmits(['click'])

const tag = computed(() => props.href ? 'a' : 'button')
const iconSize = computed(() => props.size === 'sm' ? 14 : props.size === 'lg' ? 18 : 16)
const isComponent = (val) => typeof val === 'object' || typeof val === 'function'
</script>

<style scoped>
.id-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: var(--r-pill); font-family: var(--font); text-decoration: none; border: none;
  cursor: pointer; white-space: nowrap; transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  user-select: none;
}
.id-btn.is-block { width: 100%; display: flex; }
.id-btn:active:not(.is-disabled) { transform: scale(0.97); }

.size-sm { height: 36px; padding: 0 14px; font-size: 13px; font-weight: 550; }
.size-md { height: 44px; padding: 0 20px; font-size: 14.5px; font-weight: 600; }
.size-lg { height: 50px; padding: 0 26px; font-size: 16px; font-weight: 650; }

/* Base Variants */
.btn-primary { background: var(--accent); color: #ffffff; }
.btn-primary:hover:not(.is-disabled) { background: #0062c4; }

.btn-secondary {
  background: var(--surface); border: 1px solid var(--hairline);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); color: var(--text);
}
.btn-secondary:hover:not(.is-disabled) { background: var(--hover); box-shadow: var(--sh-card); }

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

/* Custom Color Overrides for Outline */
.color-green.btn-outline { border-color: #34c759; color: #34c759; }
.color-green.btn-outline:hover:not(.is-disabled) { background: rgba(52, 199, 89, 0.1); }

.color-purple.btn-outline { border-color: #af52de; color: #af52de; }
.color-purple.btn-outline:hover:not(.is-disabled) { background: rgba(175, 82, 222, 0.1); }

.color-orange.btn-outline { border-color: #ff9500; color: #ff9500; }
.color-orange.btn-outline:hover:not(.is-disabled) { background: rgba(255, 149, 0, 0.1); }

.color-red.btn-outline { border-color: #ff3b30; color: #ff3b30; }
.color-red.btn-outline:hover:not(.is-disabled) { background: rgba(255, 59, 48, 0.1); }

.color-black.btn-outline { border-color: var(--text); color: var(--text); }
.color-black.btn-outline:hover:not(.is-disabled) { background: var(--hover); }

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
</style>
