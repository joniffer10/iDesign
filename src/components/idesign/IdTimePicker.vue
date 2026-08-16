<template>
  <div :class="['id-time-picker', `size-${size}`, { 'is-disabled': disabled, 'has-error': error }]">
    <label v-if="label" class="time-label">{{ label }}</label>

    <div class="time-input-container">
      <span class="time-icon">🕒</span>

      <!-- Hours Box -->
      <div class="time-segment-box">
        <button
          type="button"
          class="time-stepper-btn up"
          :disabled="disabled"
          aria-label="Increment Hour"
          @click="stepHour(1)"
        >▲</button>
        <input
          ref="hourInputRef"
          type="text"
          inputmode="numeric"
          maxlength="2"
          class="time-unit-input"
          :value="formattedHour"
          :disabled="disabled"
          aria-label="Hour"
          @input="onHourInput"
          @keydown.up.prevent="stepHour(1)"
          @keydown.down.prevent="stepHour(-1)"
        />
        <button
          type="button"
          class="time-stepper-btn down"
          :disabled="disabled"
          aria-label="Decrement Hour"
          @click="stepHour(-1)"
        >▼</button>
      </div>

      <span class="time-colon">:</span>

      <!-- Minutes Box -->
      <div class="time-segment-box">
        <button
          type="button"
          class="time-stepper-btn up"
          :disabled="disabled"
          aria-label="Increment Minute"
          @click="stepMinute(1)"
        >▲</button>
        <input
          ref="minuteInputRef"
          type="text"
          inputmode="numeric"
          maxlength="2"
          class="time-unit-input"
          :value="formattedMinute"
          :disabled="disabled"
          aria-label="Minute"
          @input="onMinuteInput"
          @keydown.up.prevent="stepMinute(1)"
          @keydown.down.prevent="stepMinute(-1)"
        />
        <button
          type="button"
          class="time-stepper-btn down"
          :disabled="disabled"
          aria-label="Decrement Minute"
          @click="stepMinute(-1)"
        >▼</button>
      </div>

      <!-- Seconds (Optional) -->
      <template v-if="showSeconds">
        <span class="time-colon">:</span>
        <div class="time-segment-box">
          <button
            type="button"
            class="time-stepper-btn up"
            :disabled="disabled"
            aria-label="Increment Second"
            @click="stepSecond(1)"
          >▲</button>
          <input
            type="text"
            inputmode="numeric"
            maxlength="2"
            class="time-unit-input"
            :value="formattedSecond"
            :disabled="disabled"
            aria-label="Second"
            @input="onSecondInput"
            @keydown.up.prevent="stepSecond(1)"
            @keydown.down.prevent="stepSecond(-1)"
          />
          <button
            type="button"
            class="time-stepper-btn down"
            :disabled="disabled"
            aria-label="Decrement Second"
            @click="stepSecond(-1)"
          >▼</button>
        </div>
      </template>

      <!-- AM / PM Toggle (12h format) -->
      <div v-if="!is24Hour" class="ampm-toggle">
        <button
          type="button"
          :class="['ampm-btn', { active: ampm === 'AM' }]"
          :disabled="disabled"
          @click="setAmPm('AM')"
        >AM</button>
        <button
          type="button"
          :class="['ampm-btn', { active: ampm === 'PM' }]"
          :disabled="disabled"
          @click="setAmPm('PM')"
        >PM</button>
      </div>
    </div>

    <span v-if="errorText" class="time-error-text">{{ errorText }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '09:41'
  },
  is24Hour: {
    type: Boolean,
    default: false
  },
  showSeconds: {
    type: Boolean,
    default: false
  },
  minuteStep: {
    type: Number,
    default: 1
  },
  label: String,
  errorText: String,
  error: Boolean,
  disabled: Boolean,
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const parseValue = (val) => {
  if (!val) return { h: 9, m: 41, s: 0, ampm: 'AM' }
  const parts = val.split(':')
  let h = parseInt(parts[0] || '9', 10)
  const m = parseInt(parts[1] || '0', 10)
  const s = parseInt(parts[2] || '0', 10)
  let ampm = 'AM'

  if (!props.is24Hour) {
    if (h >= 12) {
      ampm = 'PM'
      if (h > 12) h -= 12
    } else if (h === 0) {
      h = 12
    }
  }
  return { h, m, s, ampm }
}

const parsed = parseValue(props.modelValue)
const hour = ref(parsed.h)
const minute = ref(parsed.m)
const second = ref(parsed.s)
const ampm = ref(parsed.ampm)

const formattedHour = computed(() => String(hour.value).padStart(2, '0'))
const formattedMinute = computed(() => String(minute.value).padStart(2, '0'))
const formattedSecond = computed(() => String(second.value).padStart(2, '0'))

const emitChange = () => {
  let h24 = hour.value
  if (!props.is24Hour) {
    if (ampm.value === 'PM' && h24 < 12) h24 += 12
    if (ampm.value === 'AM' && h24 === 12) h24 = 0
  }
  const hStr = String(h24).padStart(2, '0')
  const mStr = String(minute.value).padStart(2, '0')
  let result = `${hStr}:${mStr}`
  if (props.showSeconds) {
    result += `:${String(second.value).padStart(2, '0')}`
  }
  emit('update:modelValue', result)
  emit('change', result)
}

const stepHour = (delta) => {
  const max = props.is24Hour ? 23 : 12
  const min = props.is24Hour ? 0 : 1
  let next = hour.value + delta
  if (next > max) next = min
  if (next < min) next = max
  hour.value = next
  emitChange()
}

const stepMinute = (delta) => {
  let next = minute.value + delta * props.minuteStep
  if (next >= 60) next = 0
  if (next < 0) next = 60 - props.minuteStep
  minute.value = next
  emitChange()
}

const stepSecond = (delta) => {
  let next = second.value + delta
  if (next >= 60) next = 0
  if (next < 0) next = 59
  second.value = next
  emitChange()
}

const setAmPm = (val) => {
  ampm.value = val
  emitChange()
}

const onHourInput = (e) => {
  const v = parseInt(e.target.value, 10)
  if (!isNaN(v)) {
    const max = props.is24Hour ? 23 : 12
    hour.value = Math.max(props.is24Hour ? 0 : 1, Math.min(max, v))
    emitChange()
  }
}

const onMinuteInput = (e) => {
  const v = parseInt(e.target.value, 10)
  if (!isNaN(v)) {
    minute.value = Math.max(0, Math.min(59, v))
    emitChange()
  }
}

const onSecondInput = (e) => {
  const v = parseInt(e.target.value, 10)
  if (!isNaN(v)) {
    second.value = Math.max(0, Math.min(59, v))
    emitChange()
  }
}
</script>

<style scoped>
.id-time-picker {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font);
}

.time-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.time-input-container {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-sheet);
  padding: 6px 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.time-input-container:focus-within {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

.time-icon {
  font-size: 14px;
  opacity: 0.6;
}

.time-segment-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.time-stepper-btn {
  background: transparent;
  border: none;
  font-size: 8px;
  color: var(--text-3);
  cursor: pointer;
  padding: 1px 4px;
  line-height: 1;
  transition: color 0.1s;
}

.time-stepper-btn:hover {
  color: var(--text);
}

.time-unit-input {
  width: 28px;
  text-align: center;
  font-family: var(--mono);
  font-weight: 700;
  font-size: 14px;
  border: none;
  background: transparent;
  color: var(--text);
  outline: none;
  padding: 2px 0;
}

.time-colon {
  font-family: var(--mono);
  font-weight: 700;
  color: var(--text-3);
  font-size: 15px;
}

.ampm-toggle {
  display: flex;
  background: var(--track);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
  margin-left: 6px;
}

.ampm-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 650;
  padding: 3px 6px;
  border-radius: 4px;
  color: var(--text-3);
  cursor: pointer;
  transition: all 0.15s ease;
}

.ampm-btn.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.time-error-text {
  font-size: 12px;
  color: var(--danger);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
