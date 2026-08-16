<template>
  <div :class="['id-select-group', `size-${currentSize}`, `variant-${currentVariant}`, `radius-${currentRadius}`, { 'is-disabled': disabled }, config.mergedUi.value.base]">
    <label v-if="label" :id="labelId" :for="buttonId" :class="['select-label', config.mergedUi.value.label]">
      {{ label }}
    </label>

    <div
      :id="buttonId"
      ref="selectRef"
      :class="['select-wrapper', `variant-${currentVariant}`, { 'is-open': isOpen, 'is-focused': isOpen }, config.mergedUi.value.trigger || config.mergedUi.value.wrapper]"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-labelledby="label ? labelId : undefined"
      :aria-activedescendant="isOpen && focusedIndex >= 0 ? `${optionIdPrefix}-${focusedIndex}` : undefined"
      tabindex="0"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span :class="['select-value', { 'is-placeholder': !modelValue }, config.mergedUi.value.value]">
        {{ displayLabel }}
      </span>

      <!-- Clear button when clearable -->
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        :class="['select-clear-btn', config.mergedUi.value.clearButton]"
        aria-label="Clear selection"
        tabindex="-1"
        @click.stop="clearSelection"
      >
        ✕
      </button>

      <svg class="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </div>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        :id="listboxId"
        :class="['select-dropdown', `variant-${currentVariant}`, config.mergedUi.value.dropdown]"
        role="listbox"
        :aria-labelledby="label ? labelId : undefined"
        tabindex="-1"
      >
        <div
          v-for="(opt, idx) in normalizedOptions"
          :id="`${optionIdPrefix}-${idx}`"
          :key="opt.value"
          :class="['select-option', { 'is-selected': modelValue === opt.value, 'is-focused': focusedIndex === idx }, config.mergedUi.value.option]"
          role="option"
          :aria-selected="modelValue === opt.value"
          @click.stop="selectOption(opt.value)"
          @mouseenter="focusedIndex = idx"
        >
          <span>{{ opt.label }}</span>
          <svg v-if="modelValue === opt.value" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
      </div>
    </Transition>

    <span v-if="hint" :class="['select-hint', config.mergedUi.value.hint]">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array, required: true },
  label: String,
  placeholder: { type: String, default: 'Select an option...' },
  hint: String,
  disabled: Boolean,
  clearable: Boolean,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'change'])

const config = useIdesignConfig('Select', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const selectRef = ref(null)
const isOpen = ref(false)
const focusedIndex = ref(-1)

const uid = Math.random().toString(36).substring(2, 8)
const labelId = `id-select-label-${uid}`
const buttonId = `id-select-btn-${uid}`
const listboxId = `id-select-listbox-${uid}`
const optionIdPrefix = `id-select-opt-${uid}`

const normalizedOptions = computed(() => {
  return props.options.map(opt =>
    typeof opt === 'object' && opt !== null ? { value: opt.value, label: opt.label || opt.value } : { value: opt, label: String(opt) }
  )
})

const displayLabel = computed(() => {
  const found = normalizedOptions.value.find(o => o.value === props.modelValue)
  return found ? found.label : props.placeholder
})

const toggle = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    const curIdx = normalizedOptions.value.findIndex(o => o.value === props.modelValue)
    focusedIndex.value = curIdx >= 0 ? curIdx : 0
  }
}

const selectOption = (val) => {
  emit('update:modelValue', val)
  emit('change', val)
  isOpen.value = false
  if (selectRef.value) selectRef.value.focus()
}

const clearSelection = () => {
  emit('update:modelValue', null)
  emit('change', null)
  isOpen.value = false
  if (selectRef.value) selectRef.value.focus()
}

const handleKeydown = (e) => {
  if (props.disabled) return
  const count = normalizedOptions.value.length

  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault()
      if (isOpen.value && focusedIndex.value >= 0) {
        selectOption(normalizedOptions.value[focusedIndex.value].value)
      } else {
        toggle()
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        focusedIndex.value = 0
      } else {
        focusedIndex.value = Math.min(focusedIndex.value + 1, count - 1)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        focusedIndex.value = count - 1
      } else {
        focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      }
      break
    case 'Home':
      if (isOpen.value) {
        e.preventDefault()
        focusedIndex.value = 0
      }
      break
    case 'End':
      if (isOpen.value) {
        e.preventDefault()
        focusedIndex.value = count - 1
      }
      break
    case 'Escape':
    case 'Tab':
      isOpen.value = false
      break
    default:
      // Type-ahead character jump
      if (e.key.length === 1 && isOpen.value) {
        const char = e.key.toLowerCase()
        const matchIdx = normalizedOptions.value.findIndex((o, i) => i > focusedIndex.value && o.label.toLowerCase().startsWith(char))
        if (matchIdx >= 0) {
          focusedIndex.value = matchIdx
        } else {
          const wrapIdx = normalizedOptions.value.findIndex(o => o.label.toLowerCase().startsWith(char))
          if (wrapIdx >= 0) focusedIndex.value = wrapIdx
        }
      }
      break
  }
}

const handleOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleOutside))
</script>

<style scoped>
.id-select-group { display: flex; flex-direction: column; gap: 6px; width: 100%; position: relative; font-family: var(--font); }
.select-label { font-size: 13px; font-weight: 600; color: var(--text-2); user-select: none; }

.size-xs .select-wrapper { height: 28px; padding: 0 8px; font-size: 12px; border-radius: 6px; }
.size-sm .select-wrapper { height: 34px; padding: 0 10px; font-size: 13px; border-radius: 8px; }
.size-md .select-wrapper { height: 42px; padding: 0 12px; font-size: 14.5px; border-radius: 10px; }
.size-lg .select-wrapper { height: 48px; padding: 0 16px; font-size: 16px; border-radius: 12px; }
.size-xl .select-wrapper { height: 54px; padding: 0 18px; font-size: 17.5px; border-radius: 14px; }

/* Radius Classes */
.radius-none .select-wrapper { border-radius: var(--r-none) !important; }
.radius-sm .select-wrapper { border-radius: var(--r-chip) !important; }
.radius-md .select-wrapper { border-radius: var(--r-thumb) !important; }
.radius-lg .select-wrapper { border-radius: var(--r-card) !important; }
.radius-full .select-wrapper { border-radius: var(--r-pill) !important; }

.select-wrapper {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--surface); border: 1px solid var(--hairline);
  cursor: pointer; transition: border-color .2s, box-shadow .2s; user-select: none;
  outline: none;
}

.variant-glass .select-wrapper {
  background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
:root.dark .variant-glass .select-wrapper { background: rgba(28, 28, 30, 0.65); }

.select-wrapper:focus-visible,
.select-wrapper.is-focused { border-color: var(--accent); box-shadow: var(--focus-ring); }
.select-value { color: var(--text); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.select-value.is-placeholder { color: var(--text-4); }

.select-clear-btn {
  border: none; background: transparent; color: var(--text-3); font-size: 12px; cursor: pointer; padding: 2px 6px; margin-right: 4px;
}
.select-clear-btn:hover { color: var(--text); }

.select-chevron { color: var(--text-3); transition: transform .2s var(--ease-out-quart); flex-shrink: 0; }
.is-open .select-chevron { transform: rotate(180deg); }

.select-dropdown {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 60;
  background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px;
  box-shadow: var(--sh-overlay); overflow: hidden; max-height: 240px; overflow-y: auto;
  outline: none;
}

.select-option {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; font-size: 14px; color: var(--text); cursor: pointer; transition: background .1s, border-radius .1s;
}

.select-dropdown:not(.variant-no-divider) .select-option + .select-option { border-top: 1px solid var(--hairline); }

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
