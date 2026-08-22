<template>
  <div
    :class="[
      'id-time-picker-group',
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
    <div v-if="label || $slots.label" :class="['time-label-row', config.mergedUi.value.label]">
      <label :for="`${instanceId}-hour`" class="time-label">
        <slot name="label">{{ label }}</slot>
      </label>
      <span v-if="required" class="required-star" aria-hidden="true">*</span>
    </div>

    <!-- Main Stepper Surface Box -->
    <div
      :class="[
        'time-stepper-box',
        {
          'is-focused': isFocused,
          'is-horizontal': currentDirection === 'horizontal',
          'is-vertical': currentDirection === 'vertical'
        },
        config.mergedUi.value.wrapper
      ]"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <!-- Vertical Top Control: Increment -->
      <button
        v-if="currentDirection === 'vertical'"
        type="button"
        :class="['stepper-btn time-stepper-btn increment vertical-top', config.mergedUi.value.increment]"
        :disabled="disabled || readonly || loading"
        :aria-disabled="disabled || readonly || loading"
        :aria-label="`Increment ${activeSegment}`"
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
        :class="['stepper-btn time-stepper-btn decrement horizontal-left', config.mergedUi.value.decrement]"
        :disabled="disabled || readonly || loading"
        :aria-disabled="disabled || readonly || loading"
        :aria-label="`Decrement ${activeSegment}`"
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

      <!-- Center Interactive Time Value Container -->
      <div
        :class="['time-value-wrapper', config.mergedUi.value.inputWrapper]"
        @click="focusInput"
      >
        <!-- Optional Leading Clock Icon / Prefix -->
        <span
          v-if="showIcon && !loading"
          :class="['time-leading-icon', config.mergedUi.value.icon]"
        >
          <slot name="icon">
            <slot name="prefix">
              <Clock :size="iconSize" class="clock-icon" />
            </slot>
          </slot>
        </span>

        <!-- Loading Indicator -->
        <span
          v-if="loading"
          :class="['time-spinner', config.mergedUi.value.spinner]"
          aria-hidden="true"
        >
          <Loader2 class="spinner-icon" :size="iconSize" />
        </span>

        <!-- Segmented Editable Time Inputs -->
        <div class="time-segments">
          <!-- Hour Input -->
          <input
            :id="`${instanceId}-hour`"
            ref="hourInputRef"
            type="text"
            inputmode="numeric"
            maxlength="2"
            :value="hourDisplay"
            :disabled="disabled || loading"
            :readonly="readonly"
            :class="['time-unit-input hour', { active: activeSegment === 'hour' }, config.mergedUi.value.hour]"
            aria-label="Hour"
            :aria-invalid="currentVariant === 'error' || hasError"
            autocomplete="off"
            @focus="setActiveSegment('hour')"
            @input="handleHourInput"
            @blur="handleHourBlur"
            @keydown="handleHourKeydown"
          />

          <!-- Separator: Colon -->
          <span :class="['time-separator', config.mergedUi.value.separator]" aria-hidden="true">
            <slot name="separator">:</slot>
          </span>

          <!-- Minute Input -->
          <input
            :id="`${instanceId}-minute`"
            ref="minuteInputRef"
            type="text"
            inputmode="numeric"
            maxlength="2"
            :value="minuteDisplay"
            :disabled="disabled || loading"
            :readonly="readonly"
            :class="['time-unit-input minute', { active: activeSegment === 'minute' }, config.mergedUi.value.minute]"
            aria-label="Minute"
            :aria-invalid="currentVariant === 'error' || hasError"
            autocomplete="off"
            @focus="setActiveSegment('minute')"
            @input="handleMinuteInput"
            @blur="handleMinuteBlur"
            @keydown="handleMinuteKeydown"
          />

          <!-- Optional Seconds Input -->
          <template v-if="showSeconds">
            <span :class="['time-separator', config.mergedUi.value.separator]" aria-hidden="true">
              <slot name="separator">:</slot>
            </span>

            <input
              :id="`${instanceId}-second`"
              ref="secondInputRef"
              type="text"
              inputmode="numeric"
              maxlength="2"
              :value="secondDisplay"
              :disabled="disabled || loading"
              :readonly="readonly"
              :class="['time-unit-input second', { active: activeSegment === 'second' }, config.mergedUi.value.second]"
              aria-label="Second"
              :aria-invalid="currentVariant === 'error' || hasError"
              autocomplete="off"
              @focus="setActiveSegment('second')"
              @input="handleSecondInput"
              @blur="handleSecondBlur"
              @keydown="handleSecondKeydown"
            />
          </template>
        </div>

        <!-- AM / PM Period Selector (12-hour mode) -->
        <div
          v-if="!is24HourMode"
          :class="['time-period-toggle', config.mergedUi.value.period]"
          role="radiogroup"
          aria-label="AM or PM"
        >
          <button
            type="button"
            :class="['period-btn am', { active: currentPeriod === 'AM' }]"
            :disabled="disabled || readonly || loading"
            role="radio"
            :aria-checked="currentPeriod === 'AM'"
            tabindex="0"
            @click="setPeriod('AM')"
            @focus="setActiveSegment('period')"
            @keydown="handlePeriodKeydown($event, 'AM')"
          >
            AM
          </button>
          <button
            type="button"
            :class="['period-btn pm', { active: currentPeriod === 'PM' }]"
            :disabled="disabled || readonly || loading"
            role="radio"
            :aria-checked="currentPeriod === 'PM'"
            tabindex="0"
            @click="setPeriod('PM')"
            @focus="setActiveSegment('period')"
            @keydown="handlePeriodKeydown($event, 'PM')"
          >
            PM
          </button>
        </div>

        <!-- Optional Suffix Slot -->
        <span v-if="$slots.suffix || suffix" :class="['time-suffix', config.mergedUi.value.suffix]">
          <slot name="suffix">{{ suffix }}</slot>
        </span>
      </div>

      <!-- Horizontal Mode: Right Increment Button -->
      <button
        v-if="currentDirection === 'horizontal'"
        type="button"
        :class="['stepper-btn time-stepper-btn increment horizontal-right', config.mergedUi.value.increment]"
        :disabled="disabled || readonly || loading"
        :aria-disabled="disabled || readonly || loading"
        :aria-label="`Increment ${activeSegment}`"
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
        :class="['stepper-btn time-stepper-btn decrement vertical-bottom', config.mergedUi.value.decrement]"
        :disabled="disabled || readonly || loading"
        :aria-disabled="disabled || readonly || loading"
        :aria-label="`Decrement ${activeSegment}`"
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

    <!-- Description / Error / Warning Message -->
    <span
      v-if="displayHint"
      :id="`${instanceId}-hint`"
      :class="[
        'time-hint',
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
import { ref, computed, watch, onBeforeUnmount, nextTick, inject } from 'vue'
import { Plus, Minus, ChevronUp, ChevronDown, Clock, Loader2 } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

let instanceCounter = 0

const props = defineProps({
  modelValue: { type: [String, Object, Date], default: '09:00' },
  value: { type: [String, Object, Date], default: undefined },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  description: { type: String, default: '' },
  errorText: { type: String, default: '' },
  error: { type: [Boolean, String], default: false },
  success: { type: [Boolean, String], default: false },
  warning: { type: [Boolean, String], default: false },
  suffix: { type: String, default: '' },
  format: { type: String, default: undefined },
  is24Hour: { type: Boolean, default: false },
  showSeconds: { type: Boolean, default: false },
  showIcon: { type: Boolean, default: true },
  minuteStep: { type: Number, default: 1 },
  step: { type: Number, default: undefined },
  hourStep: { type: Number, default: 1 },
  secondStep: { type: Number, default: 1 },
  min: { type: String, default: undefined },
  max: { type: String, default: undefined },
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  radius: { type: String, default: undefined },
  color: { type: String, default: undefined },
  direction: { type: String, default: 'horizontal' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  continuousHold: { type: Boolean, default: true },
  holdDelay: { type: Number, default: 350 },
  holdInterval: { type: Number, default: 80 },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'update:value', 'change', 'step', 'focus', 'blur', 'clear'])

const formFieldContext = inject('id-form-field-context', null)

const config = useIdesignConfig('TimePicker', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'pill')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw)
})
const currentColor = computed(() => config.resolvedColor.value || 'default')
const currentDirection = computed(() => props.direction || 'horizontal')

const instanceId = `id-time-picker-${++instanceCounter}`

const hour24 = ref(9)
const minute = ref(0)
const second = ref(0)
const activeSegment = ref('minute')
const isFocused = ref(false)
const hasAmPmSuffix = ref(false)

const hourInputRef = ref(null)
const minuteInputRef = ref(null)
const secondInputRef = ref(null)

const effectiveMinuteStep = computed(() => props.step !== undefined ? props.step : props.minuteStep)
const is24HourMode = computed(() => {
  if (props.is24Hour) return true
  if (props.format === '24h' || props.format === '24') return true
  return false
})

const currentPeriod = computed(() => (hour24.value >= 12 ? 'PM' : 'AM'))

const hourDisplay = computed(() => {
  if (is24HourMode.value) {
    return String(hour24.value).padStart(2, '0')
  }
  let h = hour24.value % 12
  if (h === 0) h = 12
  return String(h).padStart(2, '0')
})

const minuteDisplay = computed(() => String(minute.value).padStart(2, '0'))
const secondDisplay = computed(() => String(second.value).padStart(2, '0'))

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 12 : sz === 'sm' ? 14 : sz === 'lg' ? 18 : sz === 'xl' ? 20 : 16
})

const hasError = computed(() => {
  if (Boolean(props.error) || Boolean(props.errorText)) return true
  if (formFieldContext && formFieldContext.error?.value) return true
  return false
})
const hasSuccess = computed(() => Boolean(props.success))
const hasWarning = computed(() => Boolean(props.warning))

const displayHint = computed(() => {
  if (typeof props.error === 'string') return props.error
  if (props.errorText) return props.errorText
  if (typeof props.success === 'string') return props.success
  if (typeof props.warning === 'string') return props.warning
  return props.description || props.hint || ''
})

// Time parsing and formatting helpers
const parseTimeString = (str) => {
  if (!str || typeof str !== 'string') return null
  const trimmed = str.trim().toUpperCase()
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/)
  if (!match) return null

  let h = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  const s = match[3] ? parseInt(match[3], 10) : 0
  const period = match[4]

  hasAmPmSuffix.value = Boolean(period)

  if (period) {
    if (period === 'PM' && h < 12) h += 12
    if (period === 'AM' && h === 12) h = 0
  }
  return { h: Math.min(Math.max(h, 0), 23), m: Math.min(Math.max(m, 0), 59), s: Math.min(Math.max(s, 0), 59) }
}

const formatOutput = () => {
  const hh24 = String(hour24.value).padStart(2, '0')
  const mm = String(minute.value).padStart(2, '0')
  const ss = String(second.value).padStart(2, '0')

  if (is24HourMode.value) {
    return props.showSeconds ? `${hh24}:${mm}:${ss}` : `${hh24}:${mm}`
  }

  if (hasAmPmSuffix.value || props.format === '12h' || props.format === '12') {
    let h12 = hour24.value % 12
    if (h12 === 0) h12 = 12
    const hh12 = String(h12).padStart(2, '0')
    const period = currentPeriod.value
    return props.showSeconds ? `${hh12}:${mm}:${ss} ${period}` : `${hh12}:${mm} ${period}`
  }

  return props.showSeconds ? `${hh24}:${mm}:${ss}` : `${hh24}:${mm}`
}

let lastEmittedString = ''

const emitTimeChange = () => {
  const formatted = formatOutput()
  if (formatted !== lastEmittedString) {
    lastEmittedString = formatted
    emit('update:modelValue', formatted)
    emit('update:value', formatted)
    emit('change', formatted)
  }
}

// Watch initial input value
watch(
  () => (props.value !== undefined ? props.value : props.modelValue),
  (val) => {
    let parsed = null
    if (val instanceof Date) {
      parsed = { h: val.getHours(), m: val.getMinutes(), s: val.getSeconds() }
    } else if (typeof val === 'string') {
      parsed = parseTimeString(val)
    }
    if (parsed) {
      hour24.value = parsed.h
      minute.value = parsed.m
      second.value = parsed.s
      lastEmittedString = formatOutput()
    }
  },
  { immediate: true }
)

// Stepping logic
const stepUnit = (delta, targetUnit = activeSegment.value) => {
  if (props.disabled || props.readonly || props.loading) return

  let currentSec = hour24.value * 3600 + minute.value * 60 + second.value
  let deltaSec = 0

  if (targetUnit === 'hour') {
    deltaSec = delta * (props.hourStep || 1) * 3600
  } else if (targetUnit === 'second') {
    deltaSec = delta * (props.secondStep || 1)
  } else if (targetUnit === 'period') {
    deltaSec = delta * 12 * 3600
  } else {
    deltaSec = delta * effectiveMinuteStep.value * 60
  }

  let nextSec = ((currentSec + deltaSec) % 86400 + 86400) % 86400

  hour24.value = Math.floor(nextSec / 3600)
  minute.value = Math.floor((nextSec % 3600) / 60)
  second.value = nextSec % 60

  emitTimeChange()
  emit('step', { delta, unit: targetUnit, value: formatOutput() })
}

// Focus Management
const setActiveSegment = (segment) => {
  activeSegment.value = segment
}

const handleFocusIn = () => {
  isFocused.value = true
  emit('focus')
}

const handleFocusOut = (e) => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isFocused.value = false
    emit('blur')
  }
}

// Input Handlers
const handleHourInput = (e) => {
  const val = e.target.value.replace(/\D/g, '')
  if (!val) return

  let num = parseInt(val, 10)
  if (isNaN(num)) return

  if (is24HourMode.value) {
    if (num > 23) num = 23
    hour24.value = num
    if (val.length >= 2 || num >= 3) {
      nextTick(() => {
        minuteInputRef.value?.focus()
        minuteInputRef.value?.select()
      })
    }
  } else {
    if (num > 12) num = 12
    if (num === 0) num = 12
    const isPM = currentPeriod.value === 'PM'
    if (isPM && num < 12) {
      hour24.value = num + 12
    } else if (!isPM && num === 12) {
      hour24.value = 0
    } else {
      hour24.value = num
    }
    if (val.length >= 2 || num >= 2) {
      nextTick(() => {
        minuteInputRef.value?.focus()
        minuteInputRef.value?.select()
      })
    }
  }
  emitTimeChange()
}

const handleHourBlur = () => {
  emitTimeChange()
}

const handleHourKeydown = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    stepUnit(1, 'hour')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    stepUnit(-1, 'hour')
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    minuteInputRef.value?.focus()
    minuteInputRef.value?.select()
  }
}

const handleMinuteInput = (e) => {
  const val = e.target.value.replace(/\D/g, '')
  if (!val) return

  let num = parseInt(val, 10)
  if (isNaN(num)) return
  if (num > 59) num = 59

  minute.value = num
  emitTimeChange()

  if (val.length >= 2 || num >= 6) {
    nextTick(() => {
      if (props.showSeconds) {
        secondInputRef.value?.focus()
        secondInputRef.value?.select()
      }
    })
  }
}

const handleMinuteBlur = () => {
  emitTimeChange()
}

const handleMinuteKeydown = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    stepUnit(1, 'minute')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    stepUnit(-1, 'minute')
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    hourInputRef.value?.focus()
    hourInputRef.value?.select()
  } else if (e.key === 'ArrowRight' && props.showSeconds) {
    e.preventDefault()
    secondInputRef.value?.focus()
    secondInputRef.value?.select()
  }
}

const handleSecondInput = (e) => {
  const val = e.target.value.replace(/\D/g, '')
  if (!val) return

  let num = parseInt(val, 10)
  if (isNaN(num)) return
  if (num > 59) num = 59

  second.value = num
  emitTimeChange()
}

const handleSecondBlur = () => {
  emitTimeChange()
}

const handleSecondKeydown = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    stepUnit(1, 'second')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    stepUnit(-1, 'second')
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    minuteInputRef.value?.focus()
    minuteInputRef.value?.select()
  }
}

const setPeriod = (p) => {
  if (props.disabled || props.readonly || props.loading) return
  if (p === 'PM' && hour24.value < 12) {
    hour24.value += 12
  } else if (p === 'AM' && hour24.value >= 12) {
    hour24.value -= 12
  }
  activeSegment.value = 'period'
  emitTimeChange()
}

const handlePeriodKeydown = (e, current) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault()
    setPeriod(current === 'AM' ? 'PM' : 'AM')
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    if (props.showSeconds) {
      secondInputRef.value?.focus()
      secondInputRef.value?.select()
    } else {
      minuteInputRef.value?.focus()
      minuteInputRef.value?.select()
    }
  }
}

// Continuous hold stepping
let stepHoldTimer = null
let stepHoldInterval = null
let steppedOnMouseDown = false

const startContinuousStepping = (delta) => {
  if (props.disabled || props.readonly || props.loading) return

  stepUnit(delta)
  steppedOnMouseDown = true

  if (!props.continuousHold) return

  stopContinuousStepping()

  stepHoldTimer = setTimeout(() => {
    stepHoldInterval = setInterval(() => {
      stepUnit(delta)
    }, props.holdInterval)
  }, props.holdDelay)

  const stop = () => stopContinuousStepping()
  window.addEventListener('mouseup', stop, { once: true })
  window.addEventListener('touchend', stop, { once: true })
}

const stopContinuousStepping = () => {
  if (stepHoldTimer) {
    clearTimeout(stepHoldTimer)
    stepHoldTimer = null
  }
  if (stepHoldInterval) {
    clearInterval(stepHoldInterval)
    stepHoldInterval = null
  }
}

const handleMouseDown = (delta, e) => {
  if (e.button !== 0) return
  e.preventDefault()
  startContinuousStepping(delta)
}

const handleTouchStart = (delta, e) => {
  startContinuousStepping(delta)
}

const handleClick = (delta) => {
  if (steppedOnMouseDown) {
    steppedOnMouseDown = false
    return
  }
  stepUnit(delta)
}

onBeforeUnmount(() => {
  stopContinuousStepping()
})

const focusInput = () => {
  if (activeSegment.value === 'hour') {
    hourInputRef.value?.focus()
  } else if (activeSegment.value === 'second' && props.showSeconds) {
    secondInputRef.value?.focus()
  } else {
    minuteInputRef.value?.focus()
  }
}

defineExpose({
  focus: focusInput,
  step: stepUnit,
  hour: hour24,
  minute,
  second,
  period: currentPeriod,
  activeSegment
})
</script>

<style scoped>
.id-time-picker-group {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font);
  box-sizing: border-box;
}

.time-label-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.time-label {
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

/* Main Stepper Surface Box — Aligned with IdNumberInput */
.time-stepper-box {
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

.time-stepper-box.is-horizontal {
  flex-direction: row;
  width: fit-content;
}

.time-stepper-box.is-vertical {
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border-radius: var(--r-card, 16px);
}

.is-focused .time-stepper-box {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

/* Glass Variant */
.variant-glass .time-stepper-box {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.08);
}
:root.dark .variant-glass .time-stepper-box {
  background: rgba(28, 28, 30, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Subtle Variant */
.variant-subtle .time-stepper-box {
  background: var(--track);
  border-color: transparent;
}

/* Ghost Variant */
.variant-ghost .time-stepper-box {
  background: transparent;
  border-color: var(--hairline);
  box-shadow: none;
}

/* Outline Variant */
.variant-outline .time-stepper-box {
  background: transparent;
  border: 1.5px solid var(--accent);
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

/* Hairline dividers between buttons and time segments */
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

/* Center Interactive Value Container */
.time-value-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 10px;
  cursor: text;
  flex: 1;
  min-width: 0;
}

.time-leading-icon {
  display: inline-flex;
  align-items: center;
  color: var(--text-3);
  margin-right: 2px;
}

.time-spinner {
  display: inline-flex;
  align-items: center;
  color: var(--accent);
  margin-right: 4px;
}
.spinner-icon {
  animation: id-spin 0.8s linear infinite;
}
@keyframes id-spin {
  to { transform: rotate(360deg); }
}

.time-segments {
  display: inline-flex;
  align-items: center;
}

.time-unit-input {
  width: 22px;
  border: none;
  background: transparent;
  color: var(--text);
  font-family: var(--mono);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  outline: none;
  padding: 2px 0;
  border-radius: 4px;
  transition: background 0.15s ease, color 0.15s ease;
}

.time-unit-input:focus,
.time-unit-input.active {
  background: rgba(0, 113, 227, 0.12);
  color: var(--accent);
}

.time-separator {
  font-family: var(--mono);
  font-weight: 600;
  color: var(--text-3);
  padding: 0 1px;
  user-select: none;
}

/* AM / PM Segmented Control */
.time-period-toggle {
  display: inline-flex;
  align-items: center;
  background: var(--hover);
  border-radius: var(--r-pill);
  padding: 2px;
  gap: 2px;
  margin-left: 6px;
  border: 1px solid var(--hairline);
}

.period-btn {
  border: none;
  background: transparent;
  color: var(--text-3);
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font);
  padding: 2px 7px;
  border-radius: var(--r-pill);
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;
}

.period-btn:hover:not(:disabled) {
  color: var(--text);
}

.period-btn.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.time-suffix {
  font-size: 12px;
  color: var(--text-3);
  font-weight: 550;
  margin-left: 4px;
}

/* ──────────────────────────────────────────────────────────
   SIZE SCALING (xs, sm, md, lg, xl) — 1:1 with IdNumberInput
   ────────────────────────────────────────────────────────── */
.size-xs .time-stepper-box { height: var(--size-xs, 28px); font-size: 11.5px; }
.size-xs .stepper-btn { width: 26px; height: 28px; }
.size-xs .time-unit-input { font-size: 11.5px; width: 18px; }
.size-xs .period-btn { font-size: 9.5px; padding: 1px 5px; }

.size-sm .time-stepper-box { height: var(--size-sm, 34px); font-size: 12.5px; }
.size-sm .stepper-btn { width: 30px; height: 34px; }
.size-sm .time-unit-input { font-size: 12.5px; width: 20px; }
.size-sm .period-btn { font-size: 10px; padding: 2px 6px; }

.size-md .time-stepper-box { height: var(--size-md, 42px); font-size: 14px; }
.size-md .stepper-btn { width: 36px; height: 42px; }
.size-md .time-unit-input { font-size: 14px; width: 22px; }

.size-lg .time-stepper-box { height: var(--size-lg, 48px); font-size: 15.5px; }
.size-lg .stepper-btn { width: 42px; height: 48px; }
.size-lg .time-unit-input { font-size: 15.5px; width: 26px; }
.size-lg .period-btn { font-size: 12px; padding: 3px 8px; }

.size-xl .time-stepper-box { height: var(--size-xl, 54px); font-size: 17px; }
.size-xl .stepper-btn { width: 48px; height: 54px; }
.size-xl .time-unit-input { font-size: 17px; width: 30px; }
.size-xl .period-btn { font-size: 13px; padding: 4px 10px; }

/* Vertical Size Overrides */
.is-vertical.time-stepper-box {
  height: auto !important;
}
.direction-vertical.size-xs .stepper-btn { height: 18px; width: 100%; }
.direction-vertical.size-sm .stepper-btn { height: 20px; width: 100%; }
.direction-vertical.size-md .stepper-btn { height: 24px; width: 100%; }
.direction-vertical.size-lg .stepper-btn { height: 28px; width: 100%; }
.direction-vertical.size-xl .stepper-btn { height: 32px; width: 100%; }

/* ──────────────────────────────────────────────────────────
   RADIUS SEMANTIC TIERS
   ────────────────────────────────────────────────────────── */
.radius-none .time-stepper-box { border-radius: var(--r-none) !important; }
.radius-sm .time-stepper-box { border-radius: var(--r-chip) !important; }
.radius-md .time-stepper-box { border-radius: var(--r-thumb) !important; }
.radius-lg .time-stepper-box { border-radius: var(--r-card) !important; }
.radius-full .time-stepper-box,
.variant-pill .time-stepper-box { border-radius: var(--r-pill) !important; }

/* ──────────────────────────────────────────────────────────
   COLOR ACCENT STATES
   ────────────────────────────────────────────────────────── */
.color-primary.is-focused .time-stepper-box { border-color: var(--accent); }
.color-success.is-focused .time-stepper-box { border-color: var(--live); box-shadow: 0 0 0 3px rgba(48, 209, 88, 0.18); }
.color-warning.is-focused .time-stepper-box { border-color: var(--warning); box-shadow: 0 0 0 3px rgba(255, 159, 10, 0.18); }
.color-danger.is-focused .time-stepper-box { border-color: var(--danger); box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.18); }

/* ──────────────────────────────────────────────────────────
   ERROR & STATUS STATES
   ────────────────────────────────────────────────────────── */
.has-error .time-stepper-box { border-color: var(--danger); }
.has-error .time-stepper-box.is-focused { box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.18); }
.has-success .time-stepper-box { border-color: var(--live); }
.has-warning .time-stepper-box { border-color: var(--warning); }

.time-hint { font-size: 12px; color: var(--text-3); }
.error-msg { color: var(--danger); font-weight: 550; }
.success-msg { color: var(--success); font-weight: 550; }
.warning-msg { color: var(--warning); font-weight: 550; }

.is-disabled { opacity: 0.45; pointer-events: none; }
.is-readonly .time-stepper-box { background: var(--bg); border-style: dashed; }
</style>
