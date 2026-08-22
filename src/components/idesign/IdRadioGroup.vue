<template>
  <div :class="['id-radio-group', config.mergedUi.value.base]" role="radiogroup" :aria-label="label">
    <span v-if="label" :class="['radio-group-label', config.mergedUi.value.label]">{{ label }}</span>
    <div :class="['radio-options', currentDirection === 'horizontal' ? 'horizontal' : 'vertical', `size-${currentSize}`, `variant-${currentVariant}`, `color-${currentColor}`]">
      <label v-for="opt in normalizedOptions" :key="opt.value" :class="['radio-item', { 'is-selected': modelValue === opt.value, 'is-disabled': disabled }, config.mergedUi.value.option]">
        <input type="radio" :value="opt.value" :checked="modelValue === opt.value" :disabled="disabled" :name="groupName" :class="['sr-only', config.mergedUi.value.input]" @change="$emit('update:modelValue', opt.value)" />
        <span :class="['radio-circle', config.mergedUi.value.circle]"><span class="radio-dot" /></span>
        <span class="radio-label">{{ opt.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, required: true },
  label: String,
  direction: { type: String, default: undefined },
  disabled: Boolean,
  size: { type: String, default: undefined },
  color: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['update:modelValue'])

const config = useIdesignConfig('RadioGroup', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))
const currentDirection = computed(() => config.resolvedDirection.value || 'vertical')
const currentColor = computed(() => {
  const c = config.resolvedColor.value || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  if (c === 'success') return 'green'
  if (c === 'warning') return 'orange'
  if (c === 'danger') return 'red'
  return c
})

const groupName = `radio-${Math.random().toString(36).substring(2, 8)}`
const normalizedOptions = computed(() => props.options.map(o => typeof o === 'object' ? o : { value: o, label: String(o) }))
</script>

<style scoped>
.radio-group-label { font-size: 13px; font-weight: 600; color: var(--text-2); display: block; margin-bottom: 8px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
.radio-options.vertical { display: flex; flex-direction: column; gap: 10px; }
.radio-options.horizontal { display: flex; flex-wrap: wrap; gap: 16px; }
.radio-item { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }

/* Size Variants */
.size-sm .radio-circle { width: 18px; height: 18px; }
.size-sm .radio-dot { width: 6px; height: 6px; }
.size-sm .radio-label { font-size: 12.5px; }

.size-md .radio-circle { width: 22px; height: 22px; }
.size-md .radio-dot { width: 8px; height: 8px; }
.size-md .radio-label { font-size: 14px; }

.size-lg .radio-circle { width: 26px; height: 26px; }
.size-lg .radio-dot { width: 10px; height: 10px; }
.size-lg .radio-label { font-size: 15.5px; }

.radio-circle {
  width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--faint);
  background: var(--surface); display: flex; align-items: center; justify-content: center;
  transition: all .2s var(--ease-out-quart); flex-shrink: 0;
}
.radio-dot { width: 0; height: 0; border-radius: 50%; background: #fff; transition: all .2s var(--ease-spring); }
.is-selected .radio-circle { border-color: var(--accent); background: var(--accent); }
.is-selected .radio-dot { width: 8px; height: 8px; }

.size-sm.is-selected .radio-dot { width: 6px; height: 6px; }
.size-md.is-selected .radio-dot { width: 8px; height: 8px; }
.size-lg.is-selected .radio-dot { width: 10px; height: 10px; }

/* Colors mapping */
.color-green.is-selected .radio-circle { border-color: #34c759; background: #34c759; }
.color-purple.is-selected .radio-circle { border-color: #af52de; background: #af52de; }
.color-orange.is-selected .radio-circle { border-color: #ff9500; background: #ff9500; }
.color-red.is-selected .radio-circle { border-color: #ff3b30; background: #ff3b30; }

.radio-label { font-size: 14px; color: var(--text); font-weight: 500; }
.is-disabled { opacity: .5; cursor: not-allowed; }
</style>
