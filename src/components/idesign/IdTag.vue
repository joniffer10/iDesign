<template>
  <span :class="['id-tag', `tag-${variant}`, `size-${size}`, { 'is-removable': removable }]">
    <!-- Left Icon (via slot or iconLeft prop) -->
    <span v-if="$slots.iconLeft || iconLeft" class="tag-icon left">
      <slot name="iconLeft">
        <component :is="iconLeft" v-if="isComponent(iconLeft)" :size="iconSize" />
        <span v-else>{{ iconLeft }}</span>
      </slot>
    </span>

    <!-- Tag Label -->
    <span class="tag-label">
      <slot>{{ label }}</slot>
    </span>

    <!-- Right Icon (via slot or iconRight prop) -->
    <span v-if="$slots.iconRight || iconRight" class="tag-icon right">
      <slot name="iconRight">
        <component :is="iconRight" v-if="isComponent(iconRight)" :size="iconSize" />
        <span v-else>{{ iconRight }}</span>
      </slot>
    </span>

    <!-- Removable Dismiss Button -->
    <button
      v-if="removable"
      type="button"
      class="remove-btn"
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

const props = defineProps({
  label: String,
  variant: {
    type: String,
    default: 'plain',
    validator: v => ['plain', 'accent', 'success', 'warning', 'danger', 'heat', 'mono'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  iconLeft: [Object, Function, String],
  iconRight: [Object, Function, String],
  removable: Boolean
})

defineEmits(['remove'])

const iconSize = computed(() => props.size === 'sm' ? 11 : props.size === 'lg' ? 14 : 12.5)
const isComponent = (val) => typeof val === 'object' || typeof val === 'function'
</script>

<style scoped>
.id-tag {
  display: inline-flex; align-items: center; gap: 5px; font-family: var(--font);
  white-space: nowrap; border-radius: var(--r-pill); transition: all 0.15s ease;
  user-select: none;
}
.size-sm { font-size: 10.5px; padding: 2px 7px; }
.size-md { font-size: 11.5px; padding: 3px 10px; }
.size-lg { font-size: 13px; padding: 4px 12px; }

.tag-plain { color: var(--text-2); background: var(--hover); border: 1px solid var(--hairline); }
.tag-accent { color: var(--accent); background: rgba(0, 113, 227, 0.1); border: 1px solid rgba(0, 113, 227, 0.2); font-weight: 600; }
.tag-success { color: #248a3d; background: rgba(52, 199, 89, 0.1); border: 1px solid rgba(52, 199, 89, 0.2); font-weight: 600; }
.tag-warning { color: #b25000; background: rgba(255, 159, 10, 0.1); border: 1px solid rgba(255, 159, 10, 0.2); font-weight: 600; }
.tag-danger { color: #d70015; background: rgba(255, 59, 48, 0.1); border: 1px solid rgba(255, 59, 48, 0.2); font-weight: 600; }
.tag-heat { color: #ff3b30; background: rgba(255, 59, 48, 0.12); font-weight: 650; }
.tag-mono { font-family: var(--mono); color: #ffffff; background: var(--text); padding: 2px 7px; border-radius: var(--r-chip); font-weight: 700; }

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
