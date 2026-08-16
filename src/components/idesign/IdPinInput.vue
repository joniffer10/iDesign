<template>
  <div :class="['id-pin-input', `size-${size}`, { 'is-disabled': disabled, 'has-error': error }]">
    <label v-if="label" class="pin-label">{{ label }}</label>
    
    <div class="pin-boxes" @paste="handlePaste">
      <input
        v-for="(val, idx) in digits"
        :key="idx"
        :ref="el => { if (el) inputRefs[idx] = el }"
        :type="masked ? 'password' : 'text'"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        :value="val"
        :disabled="disabled"
        :class="['pin-digit-input', { filled: !!val }]"
        :aria-label="`PIN Digit ${idx + 1} of ${length}`"
        @input="handleInput($event, idx)"
        @keydown="handleKeydown($event, idx)"
        @focus="handleFocus(idx)"
      />
    </div>

    <span v-if="errorText" class="pin-error-text">{{ errorText }}</span>
    <span v-else-if="hint" class="pin-hint-text">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  length: {
    type: Number,
    default: 6
  },
  masked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorText: String,
  hint: String,
  label: String,
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'complete', 'change'])

const inputRefs = ref([])

const digits = computed(() => {
  const arr = new Array(props.length).fill('')
  const chars = (props.modelValue || '').split('')
  for (let i = 0; i < props.length; i++) {
    if (chars[i] !== undefined) arr[i] = chars[i]
  }
  return arr
})

const emitValue = (newVal) => {
  emit('update:modelValue', newVal)
  emit('change', newVal)
  if (newVal.length === props.length) {
    emit('complete', newVal)
  }
}

const handleInput = (e, idx) => {
  const val = e.target.value
  if (!val) return

  const lastChar = val.slice(-1)
  const currentChars = [...digits.value]
  currentChars[idx] = lastChar

  const combined = currentChars.join('')
  emitValue(combined)

  // Auto advance to next box
  if (idx < props.length - 1 && lastChar) {
    nextTick(() => {
      inputRefs.value[idx + 1]?.focus()
      inputRefs.value[idx + 1]?.select()
    })
  }
}

const handleKeydown = (e, idx) => {
  if (e.key === 'Backspace') {
    if (!digits.value[idx] && idx > 0) {
      e.preventDefault()
      const currentChars = [...digits.value]
      currentChars[idx - 1] = ''
      emitValue(currentChars.join(''))
      inputRefs.value[idx - 1]?.focus()
    } else {
      const currentChars = [...digits.value]
      currentChars[idx] = ''
      emitValue(currentChars.join(''))
    }
  } else if (e.key === 'ArrowLeft' && idx > 0) {
    e.preventDefault()
    inputRefs.value[idx - 1]?.focus()
  } else if (e.key === 'ArrowRight' && idx < props.length - 1) {
    e.preventDefault()
    inputRefs.value[idx + 1]?.focus()
  }
}

const handlePaste = (e) => {
  e.preventDefault()
  const pastedData = e.clipboardData?.getData('text/plain') || ''
  const sanitized = pastedData.replace(/\D/g, '').slice(0, props.length)
  emitValue(sanitized)
  nextTick(() => {
    const focusIdx = Math.min(sanitized.length, props.length - 1)
    inputRefs.value[focusIdx]?.focus()
  })
}

const handleFocus = (idx) => {
  inputRefs.value[idx]?.select()
}
</script>

<style scoped>
.id-pin-input {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font);
}

.pin-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.pin-boxes {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pin-digit-input {
  text-align: center;
  font-family: var(--mono);
  font-weight: 700;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
}

.pin-digit-input:focus {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

.pin-digit-input.filled {
  border-color: rgba(0, 113, 227, 0.35);
}

/* Sizes */
.size-sm .pin-digit-input {
  width: 36px;
  height: 40px;
  font-size: 16px;
}

.size-md .pin-digit-input {
  width: 44px;
  height: 50px;
  font-size: 20px;
}

.size-lg .pin-digit-input {
  width: 52px;
  height: 60px;
  font-size: 24px;
}

.has-error .pin-digit-input {
  border-color: var(--danger);
}

.has-error .pin-digit-input:focus {
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.2);
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
