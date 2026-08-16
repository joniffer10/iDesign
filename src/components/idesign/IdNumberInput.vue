<template>
  <div :class="['id-number-input', `size-${size}`, { 'is-disabled': disabled, 'has-error': error, 'is-focused': isFocused }]">
    <label v-if="label" class="number-label">{{ label }}</label>

    <div class="number-input-box">
      <!-- Decrement Button -->
      <button
        type="button"
        class="stepper-btn decrement"
        :disabled="disabled || readonly || (min !== undefined && modelValue <= min)"
        aria-label="Decrement value"
        @click="step(-1)"
      >
        −
      </button>

      <!-- Value Input -->
      <input
        ref="inputRef"
        type="number"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="stepVal"
        :disabled="disabled"
        :readonly="readonly"
        class="number-native-input"
        @input="onInput"
        @blur="onBlur"
        @focus="isFocused = true"
      />

      <!-- Unit Suffix (e.g. px, %, ms, kg) -->
      <span v-if="unit" class="number-unit">{{ unit }}</span>

      <!-- Increment Button -->
      <button
        type="button"
        class="stepper-btn increment"
        :disabled="disabled || readonly || (max !== undefined && modelValue >= max)"
        aria-label="Increment value"
        @click="step(1)"
      >
        +
      </button>
    </div>

    <span v-if="errorText" class="number-error-text">{{ errorText }}</span>
    <span v-else-if="hint" class="number-hint-text">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  stepVal: {
    type: Number,
    default: 1
  },
  unit: String,
  label: String,
  hint: String,
  errorText: String,
  error: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const inputRef = ref(null)
const isFocused = ref(false)

const clamp = (val) => {
  let num = Number(val)
  if (isNaN(num)) num = props.min !== undefined ? props.min : 0
  if (props.min !== undefined && num < props.min) num = props.min
  if (props.max !== undefined && num > props.max) num = props.max
  return num
}

const step = (direction) => {
  if (props.disabled || props.readonly) return
  const current = props.modelValue ?? 0
  const updated = clamp(current + direction * props.stepVal)
  emit('update:modelValue', updated)
  emit('change', updated)
}

const onInput = (e) => {
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    emit('update:modelValue', val)
  }
}

const onBlur = (e) => {
  isFocused.value = false
  const val = parseFloat(e.target.value)
  const clamped = clamp(val)
  emit('update:modelValue', clamped)
  emit('change', clamped)
}
</script>

<style scoped>
.id-number-input {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font);
}

.number-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.number-input-box {
  display: inline-flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-sheet);
  padding: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.is-focused .number-input-box {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

.stepper-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--hover);
  border: 1px solid var(--hairline);
  color: var(--text);
  font-size: 15px;
  font-weight: 650;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  outline: none;
}

.stepper-btn:hover:not(:disabled) {
  background: var(--track);
  transform: scale(1.05);
}

.stepper-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.number-native-input {
  width: 60px;
  text-align: center;
  font-family: var(--mono);
  font-weight: 700;
  font-size: 14px;
  color: var(--text);
  background: transparent;
  border: none;
  outline: none;
  padding: 4px 6px;
  -moz-appearance: textfield;
}

.number-native-input::-webkit-outer-spin-button,
.number-native-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-unit {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-3);
  padding-right: 6px;
}

/* Sizes */
.size-sm .stepper-btn { width: 24px; height: 24px; font-size: 13px; }
.size-sm .number-native-input { width: 48px; font-size: 12.5px; }

.size-lg .stepper-btn { width: 36px; height: 36px; font-size: 18px; }
.size-lg .number-native-input { width: 72px; font-size: 16px; }

.number-error-text {
  font-size: 12px;
  color: var(--danger);
}

.number-hint-text {
  font-size: 12px;
  color: var(--text-3);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
