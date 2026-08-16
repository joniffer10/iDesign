<template>
  <div :class="['id-toggle-container', `size-${currentSize}`, { 'is-disabled': disabled }, config.mergedUi.value.base]">
    <span v-if="label" :class="['toggle-label', config.mergedUi.value.label]">{{ label }}</span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :class="['id-toggle', `variant-${currentColor}`, { 'is-active': modelValue }, config.mergedUi.value.track]"
      :disabled="disabled"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span :class="['toggle-thumb', config.mergedUi.value.thumb]" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
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
  disabled: Boolean,
  ui: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['update:modelValue'])

const config = useIdesignConfig('Toggle', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentColor = computed(() => {
  const c = props.color || config.resolvedColor.value || props.variant || 'success'
  if (c === 'default') return 'success'
  if (c === 'primary') return 'primary'
  if (c === 'success') return 'success'
  if (c === 'warning') return 'orange'
  if (c === 'danger') return 'red'
  return c
})
</script>

<style scoped>
.id-toggle-container {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  font-family: var(--font);
}

.size-sm .toggle-label { font-size: 12.5px; }
.size-md .toggle-label { font-size: 14px; }
.size-lg .toggle-label { font-size: 16px; }

.toggle-label {
  font-weight: 550;
  color: var(--text);
}

.size-sm .id-toggle { width: 38px; height: 22px; padding: 2px; }
.size-sm .toggle-thumb { width: 18px; height: 18px; }
.size-sm .id-toggle.is-active .toggle-thumb { transform: translateX(16px); }

.size-md .id-toggle { width: 48px; height: 28px; padding: 2px; }
.size-md .toggle-thumb { width: 24px; height: 24px; }
.size-md .id-toggle.is-active .toggle-thumb { transform: translateX(20px); }

.size-lg .id-toggle { width: 58px; height: 34px; padding: 2px; }
.size-lg .toggle-thumb { width: 30px; height: 30px; }
.size-lg .id-toggle.is-active .toggle-thumb { transform: translateX(24px); }

.id-toggle {
  position: relative;
  border-radius: var(--r-pill);
  background: var(--track);
  border: none;
  cursor: pointer;
  transition: background 0.25s var(--ease-out-quart), box-shadow 0.2s ease;
  flex-shrink: 0;
  outline: none;
}

.id-toggle:focus-visible {
  box-shadow: var(--focus-ring);
}

.id-toggle.is-active.variant-success { background: #34c759; }
.id-toggle.is-active.variant-primary { background: #0071e3; }
.id-toggle.is-active.variant-purple { background: #af52de; }
.id-toggle.is-active.variant-orange { background: #ff9500; }
.id-toggle.is-active.variant-red { background: #ff3b30; }

.toggle-thumb {
  display: block;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.3);
  transition: transform 0.25s var(--ease-out-quart);
}

/* RTL Support */
[dir="rtl"] .size-sm .id-toggle.is-active .toggle-thumb { transform: translateX(-16px); }
[dir="rtl"] .size-md .id-toggle.is-active .toggle-thumb { transform: translateX(-20px); }
[dir="rtl"] .size-lg .id-toggle.is-active .toggle-thumb { transform: translateX(-24px); }

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
