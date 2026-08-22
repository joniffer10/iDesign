<template>
  <div :class="['id-slider-group', `size-${currentSize}`, `variant-${currentVariant}`, `color-${currentColor}`, config.mergedUi.value.base]">
    <div v-if="label || showValue" :class="['slider-header', config.mergedUi.value.header]">
      <label v-if="label" :class="['slider-label', config.mergedUi.value.label]">{{ label }}</label>
      <span v-if="showValue" :class="['slider-value', config.mergedUi.value.value]">{{ modelValue }}</span>
    </div>
    <input type="range" :min="min" :max="max" :step="step" :value="modelValue" :disabled="disabled" :class="['id-slider', config.mergedUi.value.slider]"
      :style="trackStyle" :aria-label="label" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: Number, default: 50 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  label: String,
  showValue: { type: Boolean, default: true },
  disabled: Boolean,
  size: { type: String, default: undefined },
  color: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['update:modelValue'])

const config = useIdesignConfig('Slider', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))
const currentColor = computed(() => {
  const c = config.resolvedColor.value || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  if (c === 'success') return 'green'
  if (c === 'warning') return 'orange'
  if (c === 'danger') return 'red'
  return c
})

const trackStyle = computed(() => {
  const pct = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return { '--pct': `${pct}%` }
})
</script>

<style scoped>
.id-slider-group { width: 100%; }
.slider-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.slider-label { font-size: 13px; font-weight: 600; color: var(--text-2); }
.slider-value { font-size: 13px; font-weight: 600; color: var(--text); font-family: var(--mono); font-variant-numeric: tabular-nums; }

/* Size support */
.size-sm .id-slider { height: 4px; }
.size-sm .id-slider::-webkit-slider-thumb { width: 18px; height: 18px; }
.size-sm .id-slider::-moz-range-thumb { width: 18px; height: 18px; }

.size-md .id-slider { height: 6px; }
.size-md .id-slider::-webkit-slider-thumb { width: 22px; height: 22px; }
.size-md .id-slider::-moz-range-thumb { width: 22px; height: 22px; }

.size-lg .id-slider { height: 8px; }
.size-lg .id-slider::-webkit-slider-thumb { width: 26px; height: 26px; }
.size-lg .id-slider::-moz-range-thumb { width: 26px; height: 26px; }

/* Color support */
.color-green { --slider-fill: #34c759; }
.color-purple { --slider-fill: #af52de; }
.color-orange { --slider-fill: #ff9500; }
.color-red { --slider-fill: #ff3b30; }

.id-slider {
  -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 999px;
  background: linear-gradient(to right, var(--slider-fill, var(--accent)) 0%, var(--slider-fill, var(--accent)) var(--pct), var(--track) var(--pct), var(--track) 100%);
  outline: none; cursor: pointer;
}
.id-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%;
  background: #ffffff; border: none; box-shadow: 0 1px 4px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06);
  cursor: grab; transition: transform .15s var(--ease-out-quart);
}
.id-slider::-webkit-slider-thumb:active { transform: scale(1.15); cursor: grabbing; }
.id-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #fff; border: none; box-shadow: 0 1px 4px rgba(0,0,0,0.2); cursor: grab; }
</style>
