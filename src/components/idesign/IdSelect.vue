<template>
  <div :class="['id-select-group', `size-${size}`, `variant-${variant}`, { 'is-disabled': disabled }]">
    <label v-if="label" :id="labelId" class="select-label">{{ label }}</label>
    <div
      ref="selectRef"
      :class="['select-wrapper', `variant-${variant}`, { 'is-open': isOpen, 'is-focused': isOpen }]"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-labelledby="label ? labelId : undefined"
      tabindex="0"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span :class="['select-value', { 'is-placeholder': !modelValue }]">
        {{ displayLabel }}
      </span>
      <svg class="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </div>

    <Transition name="dropdown">
      <div v-if="isOpen" :class="['select-dropdown', `variant-${variant}`]" role="listbox" :aria-labelledby="label ? labelId : undefined">
        <div
          v-for="(opt, idx) in normalizedOptions"
          :key="opt.value"
          :class="['select-option', { 'is-selected': modelValue === opt.value, 'is-focused': focusedIndex === idx }]"
          role="option"
          :aria-selected="modelValue === opt.value"
          @click.stop="selectOption(opt.value)"
          @mouseenter="focusedIndex = idx"
        >
          <span>{{ opt.label }}</span>
          <svg v-if="modelValue === opt.value" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
      </div>
    </Transition>

    <span v-if="hint" class="select-hint">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array, required: true },
  label: String,
  placeholder: { type: String, default: 'Select an option...' },
  hint: String,
  disabled: Boolean,
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'no-divider', 'glass'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue'])

const selectRef = ref(null)
const isOpen = ref(false)
const focusedIndex = ref(-1)

const uid = Math.random().toString(36).substring(2, 8)
const labelId = `id-select-label-${uid}`

const normalizedOptions = computed(() => {
  return props.options.map(opt =>
    typeof opt === 'object' ? { value: opt.value, label: opt.label || opt.value } : { value: opt, label: String(opt) }
  )
})

const displayLabel = computed(() => {
  const found = normalizedOptions.value.find(o => o.value === props.modelValue)
  return found ? found.label : props.placeholder
})

const toggle = () => { if (!props.disabled) isOpen.value = !isOpen.value }
const selectOption = (val) => { emit('update:modelValue', val); isOpen.value = false }

const handleKeydown = (e) => {
  if (props.disabled) return
  switch (e.key) {
    case 'Enter': case ' ':
      e.preventDefault()
      if (isOpen.value && focusedIndex.value >= 0) selectOption(normalizedOptions.value[focusedIndex.value].value)
      else toggle()
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) { isOpen.value = true; focusedIndex.value = 0 }
      else focusedIndex.value = Math.min(focusedIndex.value + 1, normalizedOptions.value.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      break
    case 'Escape':
      isOpen.value = false
      break
  }
}

const handleOutside = (e) => { if (selectRef.value && !selectRef.value.contains(e.target)) isOpen.value = false }
onMounted(() => document.addEventListener('click', handleOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleOutside))
</script>

<style scoped>
.id-select-group { display: flex; flex-direction: column; gap: 6px; width: 100%; position: relative; font-family: var(--font); }
.select-label { font-size: 13px; font-weight: 600; color: var(--text-2); }

.size-sm .select-wrapper { height: 34px; padding: 0 10px; font-size: 13px; border-radius: 8px; }
.size-md .select-wrapper { height: 42px; padding: 0 12px; font-size: 14.5px; border-radius: 10px; }
.size-lg .select-wrapper { height: 48px; padding: 0 16px; font-size: 16px; border-radius: 12px; }

.select-wrapper {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--surface); border: 1px solid var(--hairline);
  cursor: pointer; transition: border-color .2s, box-shadow .2s; user-select: none;
}

.variant-glass .select-wrapper {
  background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
:root.dark .variant-glass .select-wrapper { background: rgba(28, 28, 30, 0.65); }

.select-wrapper.is-focused { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,113,227,0.15); }
.select-value { color: var(--text); flex: 1; }
.select-value.is-placeholder { color: var(--text-4); }
.select-chevron { color: var(--text-3); transition: transform .2s var(--ease-out-quart); flex-shrink: 0; }
.is-open .select-chevron { transform: rotate(180deg); }

.select-dropdown {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 60;
  background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px;
  box-shadow: var(--sh-overlay); overflow: hidden; max-height: 240px; overflow-y: auto;
}

.select-option {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; font-size: 14px; color: var(--text); cursor: pointer; transition: background .1s, border-radius .1s;
}

.select-dropdown:not(.variant-no-divider) .select-option + .select-option { border-top: 1px solid var(--hairline); }

/* No-divider variant styled identically to Dropdown Menu */
.select-dropdown.variant-no-divider {
  padding: 4px;
  border-radius: 14px;
}
.select-dropdown.variant-no-divider .select-option {
  border-radius: 10px;
  margin: 1px 0;
  padding: 9px 12px;
  font-weight: 550;
}

.select-option.is-focused, .select-option:hover { background: var(--hover); }
.select-option.is-selected { color: var(--accent); font-weight: 600; }

.select-hint { font-size: 12px; color: var(--text-3); }
.is-disabled { opacity: .5; pointer-events: none; }

.dropdown-enter-active, .dropdown-leave-active { transition: opacity .15s var(--ease-out-quart), transform .15s var(--ease-out-quart); }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
