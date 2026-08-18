<template>
  <div :class="['id-pin-input', `size-${size}`, { 'is-disabled': disabled, 'is-readonly': readonly, 'has-error': error || !!errorText }]" :style="ui?.root">
    <div v-if="label || $slots.label" class="pin-label-row">
      <label v-if="label" class="pin-label">{{ label }}</label>
      <slot name="label" />
      <span v-if="required" class="pin-required-indicator">*</span>
    </div>
    
    <div class="pin-boxes" @paste="handlePaste($event, -1)">
      <template v-for="(val, idx) in internalDigits" :key="idx">
        <span
          v-if="separator && idx > 0 && idx % separatorStep === 0"
          class="pin-separator"
          aria-hidden="true"
        >
          {{ typeof separator === 'string' ? separator : '–' }}
        </span>

        <input
          :ref="el => { if (el) inputRefs[idx] = el }"
          :type="masked ? 'password' : 'text'"
          :inputmode="type === 'numeric' ? 'numeric' : 'text'"
          :pattern="inputPattern"
          maxlength="1"
          :value="val"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="['pin-digit-input', { filled: !!val }]"
          :aria-label="ariaLabel || `PIN Digit ${idx + 1} of ${length}`"
          :aria-invalid="error || !!errorText ? 'true' : 'false'"
          @input="handleInput($event, idx)"
          @keydown="handleKeydown($event, idx)"
          @focus="handleFocus(idx)"
          @paste="handlePaste($event, idx)"
        />
      </template>
    </div>

    <span v-if="errorText" class="pin-error-text">{{ errorText }}</span>
    <span v-else-if="hint" class="pin-hint-text">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
  length: {
    type: Number,
    default: 6
  },
  type: {
    type: String,
    default: 'numeric',
    validator: v => ['numeric', 'alphanumeric', 'alpha', 'any'].includes(v)
  },
  masked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorText: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg', 'xl'].includes(v)
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  separator: {
    type: [Boolean, String],
    default: false
  },
  separatorStep: {
    type: Number,
    default: 3
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'complete', 'change', 'clear', 'focus', 'blur'])

const inputRefs = ref([])
const internalDigits = ref(new Array(props.length).fill(''))
let lastEmittedValue = ''

const inputPattern = computed(() => {
  if (props.type === 'numeric') return '[0-9]*'
  if (props.type === 'alpha') return '[a-zA-Z]*'
  if (props.type === 'alphanumeric') return '[a-zA-Z0-9]*'
  return undefined
})

const sanitizeString = (str) => {
  if (!str) return ''
  if (props.type === 'numeric') return str.replace(/\D/g, '')
  if (props.type === 'alpha') return str.replace(/[^a-zA-Z]/g, '')
  if (props.type === 'alphanumeric') return str.replace(/[^a-zA-Z0-9]/g, '')
  return str
}

// Sync from external modelValue changes
const syncFromModelValue = (val) => {
  const arr = new Array(props.length).fill('')
  if (val === null || val === undefined || val === '') {
    internalDigits.value = arr
    return
  }

  const rawChars = Array.isArray(val) ? val : String(val).split('')
  for (let i = 0; i < props.length; i++) {
    if (rawChars[i] !== undefined && rawChars[i] !== '') {
      arr[i] = String(rawChars[i]).slice(0, 1)
    }
  }
  internalDigits.value = arr
}

watch(
  () => props.modelValue,
  (newVal) => {
    const stringVal = newVal === null || newVal === undefined ? '' : Array.isArray(newVal) ? newVal.join('') : String(newVal)
    // If value is empty string, always clear all boxes
    if (stringVal === '') {
      internalDigits.value = new Array(props.length).fill('')
      lastEmittedValue = ''
      return
    }
    // If external change differs from internal emitted representation, sync
    if (stringVal !== lastEmittedValue) {
      syncFromModelValue(newVal)
      lastEmittedValue = stringVal
    }
  },
  { immediate: true }
)

watch(
  () => props.length,
  (newLen) => {
    const newArr = new Array(newLen).fill('')
    for (let i = 0; i < Math.min(newLen, internalDigits.value.length); i++) {
      newArr[i] = internalDigits.value[i] || ''
    }
    internalDigits.value = newArr
  }
)

onMounted(() => {
  if (props.autofocus && !props.disabled && !props.readonly) {
    nextTick(() => {
      inputRefs.value[0]?.focus()
    })
  }
})

const emitValue = () => {
  const combined = internalDigits.value.join('')
  lastEmittedValue = combined
  emit('update:modelValue', combined)
  emit('change', combined)

  const isComplete = internalDigits.value.length === props.length && internalDigits.value.every(d => d !== '')
  if (isComplete) {
    emit('complete', combined)
  }
}

const handleInput = (e, idx) => {
  if (props.disabled || props.readonly) return
  const rawVal = e.target.value

  // Case 1: Cleared or empty value (e.g. cut, backspaced in input, or selected & deleted)
  if (!rawVal) {
    internalDigits.value[idx] = ''
    emitValue()
    return
  }

  // Case 2: Multi-character (typing over existing character or fast input)
  let char = rawVal
  if (rawVal.length > 1) {
    const prev = internalDigits.value[idx]
    if (prev && rawVal.startsWith(prev)) {
      char = rawVal.slice(prev.length)
    } else if (prev && rawVal.endsWith(prev)) {
      char = rawVal.slice(0, -prev.length)
    } else {
      char = rawVal.slice(-1)
    }
  }

  // Filter char according to type
  const sanitized = sanitizeString(char)
  if (sanitized) {
    const singleChar = sanitized.slice(0, 1)
    internalDigits.value[idx] = singleChar
    emitValue()

    // Auto advance to next box
    if (idx < props.length - 1) {
      nextTick(() => {
        inputRefs.value[idx + 1]?.focus()
        inputRefs.value[idx + 1]?.select()
      })
    }
  } else {
    // Invalid character entered: revert the input box to previous valid character or empty
    e.target.value = internalDigits.value[idx] || ''
  }
}

const handleKeydown = (e, idx) => {
  if (props.disabled || props.readonly) return

  if (e.key === 'Backspace') {
    if (internalDigits.value[idx]) {
      // Clear current box
      internalDigits.value[idx] = ''
      emitValue()
    } else if (idx > 0) {
      // Current box was already empty, move to previous box and clear it
      e.preventDefault()
      internalDigits.value[idx - 1] = ''
      emitValue()
      nextTick(() => {
        inputRefs.value[idx - 1]?.focus()
        inputRefs.value[idx - 1]?.select()
      })
    }
  } else if (e.key === 'Delete') {
    if (internalDigits.value[idx]) {
      internalDigits.value[idx] = ''
      emitValue()
    }
  } else if (e.key === 'ArrowLeft' && idx > 0) {
    e.preventDefault()
    inputRefs.value[idx - 1]?.focus()
    inputRefs.value[idx - 1]?.select()
  } else if (e.key === 'ArrowRight' && idx < props.length - 1) {
    e.preventDefault()
    inputRefs.value[idx + 1]?.focus()
    inputRefs.value[idx + 1]?.select()
  } else if (e.key === 'Home') {
    e.preventDefault()
    inputRefs.value[0]?.focus()
    inputRefs.value[0]?.select()
  } else if (e.key === 'End') {
    e.preventDefault()
    inputRefs.value[props.length - 1]?.focus()
    inputRefs.value[props.length - 1]?.select()
  }
}

const handlePaste = (e, idx = -1) => {
  if (props.disabled || props.readonly) return
  e.preventDefault()
  const pastedData = e.clipboardData?.getData('text/plain') || ''
  const sanitized = sanitizeString(pastedData)
  if (!sanitized) return

  const chars = sanitized.split('')
  
  // If pasted full length (or longer), fill from box 0
  // If user pasted on a specific box and it's a partial paste, fill starting from that box
  const startIdx = (chars.length >= props.length || idx < 0) ? 0 : idx

  for (let i = 0; i < chars.length && (startIdx + i) < props.length; i++) {
    internalDigits.value[startIdx + i] = chars[i]
  }

  emitValue()

  nextTick(() => {
    // Focus the next empty box or the last box
    const nextEmptyIdx = internalDigits.value.findIndex((val, i) => i >= startIdx && !val)
    if (nextEmptyIdx !== -1) {
      inputRefs.value[nextEmptyIdx]?.focus()
      inputRefs.value[nextEmptyIdx]?.select()
    } else {
      const targetFocus = Math.min(startIdx + chars.length, props.length - 1)
      inputRefs.value[targetFocus]?.focus()
      inputRefs.value[targetFocus]?.select()
    }
  })
}

const handleFocus = (idx) => {
  emit('focus', idx)
  inputRefs.value[idx]?.select()
}

const clear = () => {
  internalDigits.value = new Array(props.length).fill('')
  emitValue()
  emit('clear')
  nextTick(() => {
    inputRefs.value[0]?.focus()
  })
}

const reset = () => {
  clear()
}

const focus = (idx = 0) => {
  const target = Math.max(0, Math.min(idx, props.length - 1))
  inputRefs.value[target]?.focus()
  inputRefs.value[target]?.select()
}

const blur = () => {
  inputRefs.value.forEach(el => el?.blur())
  emit('blur')
}

defineExpose({
  clear,
  reset,
  focus,
  blur,
  digits: internalDigits
})
</script>

<style scoped>
.id-pin-input {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font);
}

.pin-label-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pin-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  letter-spacing: -0.01em;
}

.pin-required-indicator {
  color: var(--danger);
  font-size: 13px;
  font-weight: 600;
}

.pin-boxes {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pin-separator {
  color: var(--text-3);
  font-weight: 600;
  font-size: 15px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
}

.pin-digit-input {
  text-align: center;
  font-family: var(--mono);
  font-weight: 700;
  font-feature-settings: 'tnum';
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s cubic-bezier(0.32, 0.72, 0, 1),
              box-shadow 0.2s cubic-bezier(0.32, 0.72, 0, 1),
              transform 0.15s cubic-bezier(0.32, 0.72, 0, 1);
  outline: none;
  box-sizing: border-box;
}

.pin-digit-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.18), 0 1px 2px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
  z-index: 1;
}

.pin-digit-input.filled {
  border-color: rgba(0, 113, 227, 0.38);
}

/* Sizes */
.size-sm .pin-digit-input {
  width: 36px;
  height: 40px;
  font-size: 16px;
  border-radius: 10px;
}

.size-md .pin-digit-input {
  width: 44px;
  height: 50px;
  font-size: 20px;
  border-radius: 12px;
}

.size-lg .pin-digit-input {
  width: 52px;
  height: 60px;
  font-size: 24px;
  border-radius: 14px;
}

.size-xl .pin-digit-input {
  width: 60px;
  height: 70px;
  font-size: 28px;
  border-radius: 16px;
}

.has-error .pin-digit-input {
  border-color: var(--danger);
}

.has-error .pin-digit-input:focus {
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.2);
}

.is-readonly .pin-digit-input {
  background: var(--hover);
  cursor: default;
}

.pin-error-text {
  font-size: 12px;
  color: var(--danger);
  font-weight: 550;
}

.pin-hint-text {
  font-size: 12px;
  color: var(--text-3);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
