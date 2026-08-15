<template>
  <div class="id-slider-group">
    <div v-if="label || showValue" class="slider-header">
      <label v-if="label" class="slider-label">{{ label }}</label>
      <span v-if="showValue" class="slider-value">{{ modelValue }}</span>
    </div>
    <input type="range" :min="min" :max="max" :step="step" :value="modelValue" :disabled="disabled" class="id-slider"
      :style="trackStyle" :aria-label="label" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ modelValue: { type: Number, default: 50 }, min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, step: { type: Number, default: 1 }, label: String, showValue: { type: Boolean, default: true }, disabled: Boolean })
defineEmits(['update:modelValue'])
const trackStyle = computed(() => { const pct = ((props.modelValue - props.min) / (props.max - props.min)) * 100; return { '--pct': `${pct}%` } })
</script>
<style scoped>
.id-slider-group { width: 100%; }
.slider-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.slider-label { font-size: 13px; font-weight: 600; color: var(--text-2); }
.slider-value { font-size: 13px; font-weight: 600; color: var(--text); font-family: var(--mono); font-variant-numeric: tabular-nums; }
.id-slider {
  -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 999px;
  background: linear-gradient(to right, var(--accent) 0%, var(--accent) var(--pct), var(--track) var(--pct), var(--track) 100%);
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
