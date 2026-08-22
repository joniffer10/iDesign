<template>
  <kbd :class="['id-kbd', `size-${currentSize}`, `variant-${currentVariant}`, config.mergedUi.value.base]">
    <span v-for="(key, idx) in formattedKeys" :key="idx" :class="['kbd-key', config.mergedUi.value.key || config.mergedUi.value.kbdKey]">
      {{ key }}
    </span>
    <slot />
  </kbd>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  keys: {
    type: [String, Array],
    default: ''
  },
  size: {
    type: String,
    default: undefined
  },
  variant: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const config = useIdesignConfig('Kbd', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw)
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
  background: var(--variant-glass-bg);
  backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop);
  border: var(--variant-glass-border);
}

.variant-outline {
  background: transparent;
  box-shadow: none;
  border: var(--variant-outline-border);
}

.variant-soft {
  background: var(--variant-soft-bg);
  color: var(--variant-soft-color);
  border: none;
  box-shadow: none;
}

.variant-subtle {
  background: var(--variant-subtle-bg);
  border: var(--variant-subtle-border);
  box-shadow: none;
}

.kbd-key {
  display: inline-block;
}
</style>
