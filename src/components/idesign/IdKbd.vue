<template>
  <kbd :class="['id-kbd', `size-${size}`, `variant-${variant}`]">
    <span v-for="(key, idx) in formattedKeys" :key="idx" class="kbd-key">
      {{ key }}
    </span>
    <slot />
  </kbd>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  keys: {
    type: [String, Array],
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['xs', 'sm', 'md', 'lg'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'glass', 'outline'].includes(v)
  }
})

const symbolMap = {
  cmd: '⌘',
  command: '⌘',
  ctrl: '⌃',
  control: '⌃',
  opt: '⌥',
  option: '⌥',
  alt: '⌥',
  shift: '⇧',
  enter: '↵',
  return: '↵',
  esc: '⎋',
  escape: '⎋',
  tab: '⇥',
  backspace: '⌫',
  delete: '⌦',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→'
}

const formattedKeys = computed(() => {
  if (!props.keys) return []
  const rawList = Array.isArray(props.keys) ? props.keys : String(props.keys).split('+').map(s => s.trim())
  return rawList.map(k => {
    const lower = k.toLowerCase()
    return symbolMap[lower] || k.toUpperCase()
  })
})
</script>

<style scoped>
.id-kbd {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: var(--mono);
  font-weight: 600;
  line-height: 1;
  user-select: none;
  vertical-align: middle;
  background: var(--surface);
  color: var(--text-2);
  border: 1px solid var(--hairline);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
}

/* Sizes */
.size-xs {
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
  min-height: 16px;
}

.size-sm {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 5px;
  min-height: 20px;
}

.size-md {
  font-size: 12px;
  padding: 3px 7px;
  border-radius: 6px;
  min-height: 22px;
}

.size-lg {
  font-size: 13.5px;
  padding: 4px 9px;
  border-radius: 7px;
  min-height: 26px;
}

/* Variants */
.variant-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
:root.dark .variant-glass {
  background: rgba(255, 255, 255, 0.12);
  color: #f5f5f7;
}

.variant-outline {
  background: transparent;
  box-shadow: none;
  border-color: var(--faint);
}

.kbd-key {
  display: inline-block;
}
</style>
