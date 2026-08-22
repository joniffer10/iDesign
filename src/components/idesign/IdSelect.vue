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
        :class="['select-dropdown', `variant-${currentVariant}`, { 'has-search': searchable }, config.mergedUi.value.dropdown]"
        role="listbox"
        :aria-labelledby="label ? labelId : undefined"
        tabindex="-1"
      >
        <!-- Search Input Header when searchable -->
        <div v-if="searchable" class="select-search-box" @click.stop>
          <svg class="select-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            class="select-search-input"
            :placeholder="searchPlaceholder"
            aria-label="Filter options"
            @keydown="handleSearchKeydown"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="select-search-clear"
            aria-label="Clear search"
            @click.stop="searchQuery = ''; searchInputRef?.focus()"
          >
            ✕
          </button>
        </div>

        <div class="select-options-list">
          <div
            v-for="(opt, idx) in filteredOptions"
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

          <div v-if="filteredOptions.length === 0" class="select-no-results">
            {{ emptyText || (searchQuery ? 'No matching options' : 'No options found') }}
          </div>
        </div>
      </div>
    </Transition>

    <span v-if="hint" :class="['select-hint', config.mergedUi.value.hint]">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array, required: true },
  label: String,
  placeholder: { type: String, default: 'Select an option' },
  hint: String,
  disabled: Boolean,
  clearable: Boolean,
  searchable: Boolean,
  searchPlaceholder: { type: String, default: 'Search...' },
  emptyText: { type: String, default: undefined },
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'change', 'search'])

const config = useIdesignConfig('Select', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'no-outline': 'borderless',
    'no-border': 'borderless'
  })
})

const selectRef = ref(null)
const searchInputRef = ref(null)
const isOpen = ref(false)
const focusedIndex = ref(-1)
const searchQuery = ref('')

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

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) {
    return normalizedOptions.value
  }
  const q = searchQuery.value.toLowerCase().trim()
  return normalizedOptions.value.filter(o => o.label.toLowerCase().includes(q))
})

watch(searchQuery, (val) => {
  emit('search', val)
  focusedIndex.value = 0
})

const displayLabel = computed(() => {
  const found = normalizedOptions.value.find(o => o.value === props.modelValue)
  return found ? found.label : props.placeholder
})

const toggle = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    const curIdx = filteredOptions.value.findIndex(o => o.value === props.modelValue)
    focusedIndex.value = curIdx >= 0 ? curIdx : 0
    if (props.searchable) {
      nextTick(() => searchInputRef.value?.focus())
    }
  }
}

const selectOption = (val) => {
  emit('update:modelValue', val)
  emit('change', val)
  isOpen.value = false
  searchQuery.value = ''
  if (selectRef.value) selectRef.value.focus()
}

const clearSelection = () => {
  emit('update:modelValue', null)
  emit('change', null)
  isOpen.value = false
  searchQuery.value = ''
  if (selectRef.value) selectRef.value.focus()
}

const handleSearchKeydown = (e) => {
  const count = filteredOptions.value.length
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    focusedIndex.value = Math.min(focusedIndex.value + 1, count - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (count > 0 && focusedIndex.value >= 0 && focusedIndex.value < count) {
      selectOption(filteredOptions.value[focusedIndex.value].value)
    }
  } else if (e.key === 'Escape') {
    isOpen.value = false
    selectRef.value?.focus()
  }
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

.variant-glass.select-wrapper {
  background: var(--variant-glass-bg); backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop); border: var(--variant-glass-border);
}
.variant-glass.select-dropdown {
  background: var(--variant-glass-bg); backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop); border: var(--variant-glass-border);
  box-shadow: var(--variant-glass-shadow);
}

.variant-outline.select-wrapper {
  border: var(--variant-outline-border); background: transparent;
}

.variant-soft.select-wrapper {
  background: var(--variant-soft-bg); border: none; color: var(--variant-soft-color);
}

.variant-subtle.select-wrapper {
  background: var(--variant-subtle-bg); border: var(--variant-subtle-border);
}

.variant-borderless.select-wrapper {
  border: none; box-shadow: none; background: transparent;
}

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
  box-shadow: var(--sh-overlay); overflow: hidden;
  outline: none;
  display: flex;
  flex-direction: column;
}

.select-search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--hairline);
  background: var(--bg);
}

.select-search-icon {
  color: var(--text-3);
  flex-shrink: 0;
}

.select-search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font);
  font-size: 13px;
  color: var(--text);
  padding: 2px 0;
}
.select-search-input::placeholder {
  color: var(--text-4);
}

.select-search-clear {
  border: none;
  background: transparent;
  color: var(--text-3);
  font-size: 11px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
}
.select-search-clear:hover {
  color: var(--text);
  background: var(--hover);
}

.select-options-list {
  max-height: 200px;
  overflow-y: auto;
  overscroll-behavior: contain;
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
.select-dropdown.variant-no-divider .select-search-box {
  border-radius: 10px;
  margin-bottom: 4px;
  border-bottom: none;
}
.select-dropdown.variant-no-divider .select-option {
  border-radius: 10px;
  margin: 1px 0;
  padding: 9px 12px;
  font-weight: 550;
}

.select-option.is-focused, .select-option:hover { background: var(--hover); }
.select-option.is-selected { color: var(--accent); font-weight: 600; }

.select-no-results {
  padding: 18px 14px;
  font-size: 13px;
  color: var(--text-3);
  text-align: center;
  font-style: italic;
}

.select-hint { font-size: 12px; color: var(--text-3); }
.is-disabled { opacity: .5; pointer-events: none; }

.dropdown-enter-active, .dropdown-leave-active { transition: opacity .15s var(--ease-out-quart), transform .15s var(--ease-out-quart); }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
