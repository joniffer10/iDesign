<template>
  <div
    :class="[
      'id-number-input-group',
      `size-${currentSize}`,
      `radius-${currentRadius}`,
      `direction-${currentDirection}`,
      `color-${currentColor}`,
      `variant-${currentVariant}`,
      {
        'has-error': currentVariant === 'error' || hasError,
        'has-success': currentVariant === 'success' || hasSuccess,
        'has-warning': currentVariant === 'warning' || hasWarning,
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-loading': loading,
        'is-focused': isFocused
      },
      config.mergedUi.value.base
    ]"
    :data-size="currentSize"
    :data-direction="currentDirection"
    :data-disabled="disabled || undefined"
    :data-readonly="readonly || undefined"
  >
    <!-- Label Area -->
    <label
      v-if="label || $slots.label"
      :for="inputId"
      :class="['number-label', config.mergedUi.value.label]"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="required-star" aria-hidden="true">*</span>
    </label>

    <!-- Main Stepper Surface Box -->
    <div
      :class="[
        'number-stepper-box',
        {
          'is-focused': isFocused,
          'is-horizontal': currentDirection === 'horizontal',
          'is-vertical': currentDirection === 'vertical'
        },
        config.mergedUi.value.wrapper
      ]"
    >
      <!-- Vertical Top Control: Increment -->
      <button
        v-if="currentDirection === 'vertical'"
        type="button"
        :class="['stepper-btn increment vertical-top', config.mergedUi.value.increment]"
        :disabled="isIncrementDisabled"
        :aria-disabled="isIncrementDisabled"
        aria-label="Increment value"
        tabindex="-1"
        @mousedown="handleMouseDown(1, $event)"
        @touchstart.passive="handleTouchStart(1, $event)"
        @click="handleClick(1)"
      >
        <slot name="incrementIcon">
          <slot name="increment-icon">
            <ChevronUp :size="iconSize" :class="['stepper-icon', config.mergedUi.value.icon]" />
          </slot>
        </slot>
      </button>

      <!-- Horizontal Left Control: Decrement -->
      <button
        v-if="currentDirection === 'horizontal'"
        type="button"
        :class="['stepper-btn decrement horizontal-left', config.mergedUi.value.decrement]"
        :disabled="isDecrementDisabled"
        :aria-disabled="isDecrementDisabled"
        aria-label="Decrement value"
        tabindex="-1"
        @mousedown="handleMouseDown(-1, $event)"
        @touchstart.passive="handleTouchStart(-1, $event)"
        @click="handleClick(-1)"
      >
        <slot name="decrementIcon">
          <slot name="decrement-icon">
            <Minus :size="iconSize" :class="['stepper-icon', config.mergedUi.value.icon]" />
          </slot>
        </slot>
      </button>

      <!-- Center Interactive Value Container -->
      <div
        :class="['number-value-wrapper', config.mergedUi.value.inputWrapper]"
        @click="focusInput"
      >
        <!-- Prefix (e.g. $, €) -->
        <span
          v-if="prefix || $slots.prefix"
          :class="['number-affix prefix', config.mergedUi.value.prefix]"
        >
          <slot name="prefix">{{ prefix }}</slot>
        </span>

        <!-- Editable Native Input -->
        <input
          :id="inputId"
          ref="inputRef"
          type="text"
          inputmode="decimal"
          :value="displayString"
          :placeholder="placeholder"
          :disabled="disabled || loading"
          :readonly="readonly"
          :required="required"
          :aria-valuenow="numericValue"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-invalid="currentVariant === 'error' || hasError"
          :aria-describedby="displayHint ? `${inputId}-hint` : undefined"
          :class="['number-native-input', config.mergedUi.value.input]"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
        />

        <!-- Suffix (e.g. items, USD) -->
        <span
          v-if="suffix || $slots.suffix"
          :class="['number-affix suffix', config.mergedUi.value.suffix]"
        >
          <slot name="suffix">{{ suffix }}</slot>
        </span>

        <!-- Unit (e.g. px, kg, %, ms) -->
        <span
          v-if="unit || $slots.unit"
          :class="['number-affix unit', config.mergedUi.value.unit]"
        >
          <slot name="unit">{{ unit }}</slot>
        </span>

        <!-- Loading Indicator -->
        <span
          v-if="loading"
          :class="['number-spinner', config.mergedUi.value.spinner]"
          aria-hidden="true"
        >
          <Loader2 class="spinner-icon" :size="iconSize" />
        </span>
      </div>

      <!-- Horizontal Right Control: Increment -->
      <button
        v-if="currentDirection === 'horizontal'"
        type="button"
        :class="['stepper-btn increment horizontal-right', config.mergedUi.value.increment]"
        :disabled="isIncrementDisabled"
        :aria-disabled="isIncrementDisabled"
        aria-label="Increment value"
        tabindex="-1"
        @mousedown="handleMouseDown(1, $event)"
        @touchstart.passive="handleTouchStart(1, $event)"
        @click="handleClick(1)"
      >
        <slot name="incrementIcon">
          <slot name="increment-icon">
            <Plus :size="iconSize" :class="['stepper-icon', config.mergedUi.value.icon]" />
          </slot>
        </slot>
      </button>

      <!-- Vertical Bottom Control: Decrement -->
      <button
        v-if="currentDirection === 'vertical'"
        type="button"
        :class="['stepper-btn decrement vertical-bottom', config.mergedUi.value.decrement]"
        :disabled="isDecrementDisabled"
        :aria-disabled="isDecrementDisabled"
        aria-label="Decrement value"
        tabindex="-1"
        @mousedown="handleMouseDown(-1, $event)"
        @touchstart.passive="handleTouchStart(-1, $event)"
        @click="handleClick(-1)"
      >
        <slot name="decrementIcon">
          <slot name="decrement-icon">
            <ChevronDown :size="iconSize" :class="['stepper-icon', config.mergedUi.value.icon]" />
          </slot>
        </slot>
      </button>
    </div>

    <!-- Description / Error / Warning / Hint Message -->
    <span
      v-if="displayHint"
      :id="`${inputId}-hint`"
      :class="[
        'number-hint-text',
        {
          'error-msg': currentVariant === 'error' || hasError,
          'success-msg': currentVariant === 'success' || hasSuccess,
          'warning-msg': currentVariant === 'warning' || hasWarning
        },
        config.mergedUi.value.hint
      ]"
    >
      {{ displayHint }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { Plus, Minus, ChevronUp, ChevronDown, Loader2 } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: undefined
  },
  value: {
    type: [Number, String],
    default: undefined
  },
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  step: {
    type: Number,
    default: undefined
  },
  stepVal: {
    type: Number,
    default: undefined
  },
  direction: {
    type: String,
    default: undefined,
    validator: v => ['horizontal', 'vertical'].includes(v)
  },
  size: {
    type: String,
    default: undefined,
    validator: v => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  radius: {
    type: String,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  variant: {
    type: String,
    default: undefined
  },
  precision: {
    type: Number,
    default: undefined
  },
  unit: String,
  prefix: String,
  suffix: String,
  label: String,
  hint: String,
  description: String,
  placeholder: {
    type: String,
    default: '0'
  },
  errorText: String,
  error: [Boolean, String],
  success: [Boolean, String],
  warning: [Boolean, String],
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  required: Boolean,
  continuous: {
    type: Boolean,
    default: true
  },
  id: String,
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'update:modelValue',
  'update:value',
  'change',
  'input',
  'focus',
  'blur'
])

// Global config integration
const config = useIdesignConfig('NumberInput', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'full')
const currentDirection = computed(() => props.direction || config.resolvedDirection?.value || 'horizontal')
const currentColor = computed(() => config.resolvedColor?.value || 'blue')
const currentVariant = computed(() => config.resolvedVariant?.value || 'default')

const inputId = computed(() => props.id || `id-stepper-${Math.random().toString(36).substring(2, 9)}`)
const effectiveStep = computed(() => {
  if (props.step !== undefined && props.step !== null) return Number(props.step) || 1
  if (props.stepVal !== undefined && props.stepVal !== null) return Number(props.stepVal) || 1
  return 1
})

const inputRef = ref(null)
const isFocused = ref(false)
const rawInputValue = ref('')
const isUserTyping = ref(false)
let previousCommittedValue = null

// Helper to parse numeric value safely
const parsePropNum = (val) => {
  if (val === undefined || val === null || val === '') return null
  const num = typeof val === 'number' ? val : parseFloat(String(val))
  return isNaN(num) ? null : num
}

// Initial internal value fallback
const getInitialValue = () => {
  const mVal = parsePropNum(props.modelValue)
  if (mVal !== null) return mVal
  const vVal = parsePropNum(props.value)
  if (vVal !== null) return vVal
  if (props.min !== undefined && props.min !== null) return Number(props.min) || 0
  return 0
}

const innerValue = ref(getInitialValue())

// Synchronize with prop changes when parent updates
watch(() => props.modelValue, (newVal) => {
  const parsed = parsePropNum(newVal)
  if (parsed !== null && !isUserTyping.value) {
    innerValue.value = parsed
  }
})

watch(() => props.value, (newVal) => {
  const parsed = parsePropNum(newVal)
  if (parsed !== null && !isUserTyping.value) {
    innerValue.value = parsed
  }
})

// Calculate decimal places to prevent IEEE 754 floating point arithmetic issues
const getStepPrecision = (stepNum) => {
  const stepStr = String(stepNum)
  if (stepStr.includes('.')) {
    return stepStr.split('.')[1].length
  }
  return 0
}

const resolvedPrecision = computed(() => {
  if (props.precision !== undefined && props.precision !== null) return props.precision
  return getStepPrecision(effectiveStep.value)
})

// Current canonical numeric value
const numericValue = computed(() => {
  return innerValue.value
})

const roundToPrecision = (num, prec) => {
  if (prec === 0) return Math.round(num)
  const factor = Math.pow(10, prec)
  return Math.round((num + Number.EPSILON) * factor) / factor
}

const clamp = (val) => {
  let num = typeof val === 'number' ? val : parseFloat(String(val))
  if (isNaN(num)) {
    num = props.min !== undefined && props.min !== null ? props.min : 0
  }
  if (props.min !== undefined && props.min !== null && num < props.min) num = props.min
  if (props.max !== undefined && props.max !== null && num > props.max) num = props.max
  return roundToPrecision(num, resolvedPrecision.value)
}

// Display string: When user is typing, show raw typed buffer; otherwise format canonical number
const displayString = computed(() => {
  if (isUserTyping.value) {
    return rawInputValue.value
  }
  const val = numericValue.value
  if (val === undefined || val === null || isNaN(val)) return ''
  return resolvedPrecision.value > 0 ? val.toFixed(resolvedPrecision.value) : String(val)
})

// Disabled states for buttons
const isDecrementDisabled = computed(() => {
  if (props.disabled || props.readonly || props.loading) return true
  if (props.min !== undefined && props.min !== null && numericValue.value <= props.min) return true
  return false
})

const isIncrementDisabled = computed(() => {
  if (props.disabled || props.readonly || props.loading) return true
  if (props.max !== undefined && props.max !== null && numericValue.value >= props.max) return true
  return false
})

// Icon sizing
const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 12 : sz === 'sm' ? 14 : sz === 'lg' ? 18 : sz === 'xl' ? 20 : 15
})

// Validation messages
const hasError = computed(() => Boolean(props.error) || Boolean(props.errorText))
const hasSuccess = computed(() => Boolean(props.success))
const hasWarning = computed(() => Boolean(props.warning))

const displayHint = computed(() => {
  if (typeof props.error === 'string') return props.error
  if (props.errorText) return props.errorText
  if (typeof props.success === 'string') return props.success
  if (typeof props.warning === 'string') return props.warning
  return props.description || props.hint || ''
})

// Stepping logic with precision
const stepValue = (multiplier = 1, customStep = null) => {
  if (props.disabled || props.readonly || props.loading) return
  const current = numericValue.value
  const stepAmount = customStep !== null ? customStep : effectiveStep.value
  const precision = resolvedPrecision.value
  
  const rawTarget = current + multiplier * stepAmount
  const updated = clamp(roundToPrecision(rawTarget, precision))
  
  innerValue.value = updated
  rawInputValue.value = String(updated)
  
  emit('update:modelValue', updated)
  emit('update:value', updated)
  emit('change', updated)
}

// Long-press continuous stepping timer
let holdTimeout = null
let repeatInterval = null
let steppedOnMouseDown = false

const stopContinuousStep = () => {
  if (holdTimeout) {
    clearTimeout(holdTimeout)
    holdTimeout = null
  }
  if (repeatInterval) {
    clearInterval(repeatInterval)
    repeatInterval = null
  }
  window.removeEventListener('mouseup', stopContinuousStep)
  window.removeEventListener('touchend', stopContinuousStep)
  window.removeEventListener('touchcancel', stopContinuousStep)
}

const handleMouseDown = (multiplier, e) => {
  if (props.disabled || props.readonly || props.loading) return
  if (e.button !== undefined && e.button !== 0) return // Only primary click

  stopContinuousStep()
  stepValue(multiplier)
  steppedOnMouseDown = true

  if (!props.continuous) return

  window.addEventListener('mouseup', stopContinuousStep)
  window.addEventListener('touchend', stopContinuousStep)
  window.addEventListener('touchcancel', stopContinuousStep)

  holdTimeout = setTimeout(() => {
    repeatInterval = setInterval(() => {
      if ((multiplier < 0 && isDecrementDisabled.value) || (multiplier > 0 && isIncrementDisabled.value)) {
        stopContinuousStep()
        return
      }
      stepValue(multiplier)
    }, 65)
  }, 380)
}

const handleTouchStart = (multiplier, e) => {
  handleMouseDown(multiplier, e)
}

const handleClick = (multiplier) => {
  // If mousedown already stepped, don't duplicate on the same click
  if (steppedOnMouseDown) {
    steppedOnMouseDown = false
    return
  }
  stepValue(multiplier)
}

// Input event handlers
const handleInput = (e) => {
  isUserTyping.value = true
  const inputStr = e.target.value
  rawInputValue.value = inputStr

  // Allow intermediate negative sign or empty input while typing
  if (inputStr === '' || inputStr === '-' || inputStr === '.') {
    emit('input', e)
    return
  }

  const parsed = parseFloat(inputStr)
  if (!isNaN(parsed)) {
    innerValue.value = parsed
    emit('update:modelValue', parsed)
    emit('update:value', parsed)
  }
  emit('input', e)
}

const commitValue = () => {
  isUserTyping.value = false
  const inputStr = rawInputValue.value.trim()
  let targetNum = parseFloat(inputStr)
  if (isNaN(targetNum)) {
    targetNum = props.min !== undefined && props.min !== null ? props.min : 0
  }
  const clamped = clamp(targetNum)
  innerValue.value = clamped
  rawInputValue.value = resolvedPrecision.value > 0 ? clamped.toFixed(resolvedPrecision.value) : String(clamped)
  
  emit('update:modelValue', clamped)
  emit('update:value', clamped)
  emit('change', clamped)
}

const handleChange = () => {
  commitValue()
}

const handleFocus = (e) => {
  isFocused.value = true
  previousCommittedValue = numericValue.value
  rawInputValue.value = String(numericValue.value)
  emit('focus', e)
}

const handleBlur = (e) => {
  isFocused.value = false
  commitValue()
  emit('blur', e)
}

// Keyboard controls
const handleKeydown = (e) => {
  if (props.disabled || props.readonly || props.loading) return

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const stepMult = e.shiftKey ? 10 : e.altKey ? 0.1 : 1
    stepValue(stepMult)
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    const stepMult = e.shiftKey ? 10 : e.altKey ? 0.1 : 1
    stepValue(-stepMult)
  } else if (e.key === 'PageUp') {
    e.preventDefault()
    stepValue(10)
  } else if (e.key === 'PageDown') {
    e.preventDefault()
    stepValue(-10)
  } else if (e.key === 'Home' && props.min !== undefined && props.min !== null) {
    e.preventDefault()
    const clamped = clamp(props.min)
    innerValue.value = clamped
    rawInputValue.value = String(clamped)
    emit('update:modelValue', clamped)
    emit('update:value', clamped)
    emit('change', clamped)
  } else if (e.key === 'End' && props.max !== undefined && props.max !== null) {
    e.preventDefault()
    const clamped = clamp(props.max)
    innerValue.value = clamped
    rawInputValue.value = String(clamped)
    emit('update:modelValue', clamped)
    emit('update:value', clamped)
    emit('change', clamped)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    commitValue()
    if (inputRef.value) inputRef.value.blur()
  } else if (e.key === 'Escape') {
    e.preventDefault()
    isUserTyping.value = false
    const restored = previousCommittedValue !== null ? previousCommittedValue : (props.min !== undefined && props.min !== null ? props.min : 0)
    innerValue.value = restored
    rawInputValue.value = String(restored)
    emit('update:modelValue', restored)
    emit('update:value', restored)
    if (inputRef.value) inputRef.value.blur()
  }
}

const focusInput = () => {
  if (inputRef.value && !props.disabled && !props.readonly) {
    inputRef.value.focus()
  }
}

// Exposed methods
const focus = () => {
  if (inputRef.value) inputRef.value.focus()
}

const blur = () => {
  if (inputRef.value) inputRef.value.blur()
}

const select = () => {
  if (inputRef.value) inputRef.value.select()
}

const stepUp = (steps = 1) => {
  stepValue(steps)
}

const stepDown = (steps = 1) => {
  stepValue(-steps)
}

const reset = () => {
  const init = props.min !== undefined && props.min !== null ? props.min : 0
  const clamped = clamp(init)
  innerValue.value = clamped
  rawInputValue.value = String(clamped)
  emit('update:modelValue', clamped)
  emit('update:value', clamped)
  emit('change', clamped)
}

defineExpose({
  inputRef,
  focus,
  blur,
  select,
  stepUp,
  stepDown,
  reset
})

onBeforeUnmount(() => {
  stopContinuousStep()
})
</script>

<style scoped>
.id-number-input-group {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font);
  box-sizing: border-box;
  vertical-align: middle;
  width: fit-content;
}

.number-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.required-star {
  color: var(--danger);
  font-size: 12px;
  line-height: 1;
}

/* Main Stepper Surface Box */
.number-stepper-box {
  display: inline-flex;
  align-items: stretch;
  background: var(--color-input, var(--surface));
  border: 1px solid var(--color-input-border, var(--hairline));
  border-radius: var(--r-pill);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s var(--ease-out-quart), box-shadow 0.2s var(--ease-out-quart), background 0.2s;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  user-select: none;
}

.number-stepper-box.is-horizontal {
  flex-direction: row;
  width: fit-content;
}

.number-stepper-box.is-vertical {
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border-radius: var(--r-card, 16px);
}

.is-focused .number-stepper-box {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

/* Glass Variant */
.variant-glass .number-stepper-box {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

:root.dark .variant-glass .number-stepper-box {
  background: rgba(28, 28, 30, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Subtle Variant */
.variant-subtle .number-stepper-box {
  background: var(--track);
  border-color: transparent;
}

/* Ghost Variant */
.variant-ghost .number-stepper-box {
  background: transparent;
  border-color: var(--hairline);
  box-shadow: none;
}

/* Stepper Action Buttons */
.stepper-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s var(--ease-out-quart), opacity 0.15s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.stepper-btn:hover:not(:disabled) {
  background: var(--hover);
  color: var(--accent);
}

.stepper-btn:active:not(:disabled) {
  background: var(--track);
  transform: scale(0.92);
}

.stepper-btn:disabled {
  opacity: 0.30;
  cursor: not-allowed;
}

/* Hairline dividers between buttons and value area */
.is-horizontal .stepper-btn.decrement {
  border-right: 1px solid var(--hairline);
}

.is-horizontal .stepper-btn.increment {
  border-left: 1px solid var(--hairline);
}

.is-vertical .stepper-btn.increment {
  border-bottom: 1px solid var(--hairline);
  width: 100%;
}

.is-vertical .stepper-btn.decrement {
  border-top: 1px solid var(--hairline);
  width: 100%;
}

.stepper-icon {
  display: block;
  stroke-width: 2.25;
}

/* Center Value & Affixes Container */
.number-value-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 0;
  cursor: text;
}

.is-horizontal .number-value-wrapper {
  padding: 0 4px;
  flex: 1;
  min-width: 28px;
}

.is-vertical .number-value-wrapper {
  padding: 0 4px;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Native Editable Input */
.number-native-input {
  border: none;
  background: transparent;
  outline: none;
  text-align: center;
  font-family: var(--mono);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--text);
  min-width: 20px;
  width: 100%;
  max-width: 52px;
  padding: 0 1px;
  margin: 0;
  -moz-appearance: textfield;
}

.number-native-input::-webkit-outer-spin-button,
.number-native-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-native-input::placeholder {
  color: var(--text-4);
}

/* Affixes */
.number-affix {
  font-size: 11.5px;
  font-weight: 550;
  color: var(--text-3);
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  line-height: 1;
}

.number-affix.prefix {
  margin-right: 2px;
}

.number-affix.suffix,
.number-affix.unit {
  margin-left: 2px;
}

.number-spinner {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  color: var(--accent);
}

.spinner-icon {
  animation: id-spin 0.8s linear infinite;
}

@keyframes id-spin {
  to { transform: rotate(360deg); }
}

/* ── Sizing Scale Tiers (Horizontal & Vertical) ── */

/* XS Size */
.size-xs.direction-horizontal .number-stepper-box { height: 28px; min-width: 84px; }
.size-xs.direction-horizontal .stepper-btn { width: 26px; height: 28px; }
.size-xs.direction-horizontal .number-native-input { font-size: 12px; }

.size-xs.direction-vertical .number-stepper-box { width: 34px; height: 92px; border-radius: var(--r-pill); }
.size-xs.direction-vertical .stepper-btn { width: 34px; height: 26px; }
.size-xs.direction-vertical .number-value-wrapper { height: 40px; }
.size-xs.direction-vertical .number-native-input { font-size: 11.5px; }

/* SM Size */
.size-sm.direction-horizontal .number-stepper-box { height: 34px; min-width: 98px; }
.size-sm.direction-horizontal .stepper-btn { width: 30px; height: 34px; }
.size-sm.direction-horizontal .number-native-input { font-size: 13px; }

.size-sm.direction-vertical .number-stepper-box { width: 40px; height: 114px; border-radius: var(--r-pill); }
.size-sm.direction-vertical .stepper-btn { width: 40px; height: 32px; }
.size-sm.direction-vertical .number-value-wrapper { height: 50px; }
.size-sm.direction-vertical .number-native-input { font-size: 12.5px; }

/* MD Size (Default - Apple Standard) */
.size-md.direction-horizontal .number-stepper-box { height: 40px; min-width: 116px; }
.size-md.direction-horizontal .stepper-btn { width: 36px; height: 40px; }
.size-md.direction-horizontal .number-native-input { font-size: 14px; }

.size-md.direction-vertical .number-stepper-box { width: 46px; height: 138px; border-radius: var(--r-pill); }
.size-md.direction-vertical .stepper-btn { width: 46px; height: 38px; }
.size-md.direction-vertical .number-value-wrapper { height: 62px; }
.size-md.direction-vertical .number-native-input { font-size: 14px; }

/* LG Size */
.size-lg.direction-horizontal .number-stepper-box { height: 46px; min-width: 134px; }
.size-lg.direction-horizontal .stepper-btn { width: 42px; height: 46px; }
.size-lg.direction-horizontal .number-native-input { font-size: 15.5px; }

.size-lg.direction-vertical .number-stepper-box { width: 54px; height: 162px; border-radius: var(--r-pill); }
.size-lg.direction-vertical .stepper-btn { width: 54px; height: 45px; }
.size-lg.direction-vertical .number-value-wrapper { height: 72px; }
.size-lg.direction-vertical .number-native-input { font-size: 15.5px; }

/* XL Size */
.size-xl.direction-horizontal .number-stepper-box { height: 52px; min-width: 150px; }
.size-xl.direction-horizontal .stepper-btn { width: 48px; height: 52px; }
.size-xl.direction-horizontal .number-native-input { font-size: 17px; }

.size-xl.direction-vertical .number-stepper-box { width: 62px; height: 188px; border-radius: var(--r-pill); }
.size-xl.direction-vertical .stepper-btn { width: 62px; height: 52px; }
.size-xl.direction-vertical .number-value-wrapper { height: 84px; }
.size-xl.direction-vertical .number-native-input { font-size: 17px; }

/* Radius Classes */
.radius-none .number-stepper-box { border-radius: var(--r-none) !important; }
.radius-sm .number-stepper-box { border-radius: var(--r-chip) !important; }
.radius-md .number-stepper-box { border-radius: var(--r-thumb) !important; }
.radius-lg .number-stepper-box { border-radius: var(--r-card) !important; }
.radius-full .number-stepper-box { border-radius: var(--r-pill) !important; }

/* Semantic Status Variants */
.has-error .number-stepper-box {
  border-color: var(--danger);
}
.has-error.is-focused .number-stepper-box {
  box-shadow: 0 0 0 3px var(--danger-bg);
}

.has-success .number-stepper-box {
  border-color: var(--live);
}
.has-success.is-focused .number-stepper-box {
  box-shadow: 0 0 0 3px var(--success-bg);
}

.has-warning .number-stepper-box {
  border-color: var(--warning);
}
.has-warning.is-focused .number-stepper-box {
  box-shadow: 0 0 0 3px var(--warning-bg);
}

/* Color Presets */
.color-green.is-focused .number-stepper-box { border-color: #34c759; box-shadow: 0 0 0 3px rgba(52, 199, 89, 0.2); }
.color-orange.is-focused .number-stepper-box { border-color: #ff9500; box-shadow: 0 0 0 3px rgba(255, 149, 0, 0.2); }
.color-red.is-focused .number-stepper-box { border-color: #ff3b30; box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.2); }
.color-purple.is-focused .number-stepper-box { border-color: #af52de; box-shadow: 0 0 0 3px rgba(175, 82, 222, 0.2); }

/* Hint & Error Text */
.number-hint-text {
  font-size: 12px;
  color: var(--text-3);
  line-height: 1.4;
}

.error-msg {
  color: var(--danger);
  font-weight: 550;
}

.success-msg {
  color: var(--success);
  font-weight: 550;
}

.warning-msg {
  color: var(--warning);
  font-weight: 550;
}

/* Disabled & Readonly */
.is-disabled {
  opacity: 0.48;
  cursor: not-allowed;
  pointer-events: none;
}

.is-readonly .number-stepper-box {
  background: var(--bg);
  border-style: dashed;
}

.is-readonly .stepper-btn {
  opacity: 0.25;
  pointer-events: none;
}

.is-readonly .number-native-input {
  cursor: default;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .number-stepper-box,
  .stepper-btn,
  .spinner-icon {
    transition: none !important;
    animation: none !important;
  }
}
</style>
