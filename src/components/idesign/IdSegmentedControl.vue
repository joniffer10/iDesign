<template>
  <div
    ref="containerRef"
    :class="[
      'seg-container',
      `size-${currentSize}`,
      `variant-${currentVariant}`,
      { 
        'is-block': block,
        'is-two-items': isTwoItems,
        'is-responsive': responsive,
        'is-wrap': wrap,
        'has-scroll-start': canScrollLeft,
        'has-scroll-end': canScrollRight
      },
      config.mergedUi.value.base
    ]"
    role="tablist"
    aria-label="Segmented control"
    @keydown="handleKeydown"
    @scroll="handleScroll"
  >
    <button
      v-for="(option, idx) in normalizedOptions"
      :key="option.val"
      :ref="el => { if (el) itemRefs[idx] = el }"
      type="button"
      role="tab"
      :aria-selected="currentActive === option.val"
      :tabindex="currentActive === option.val ? 0 : -1"
      :class="[
        'seg-item',
        { 
          'active': currentActive === option.val,
          'active--black': currentTheme === 'black' && currentActive === option.val
        },
        config.mergedUi.value.item,
        currentActive === option.val ? config.mergedUi.value.active : ''
      ]"
      @click="selectOption(option.val)"
    >
      <span class="seg-item-label">{{ option.lbl }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: undefined
  },
  active: {
    type: [String, Number],
    default: undefined
  },
  options: {
    type: Array,
    default: () => ['Overview', 'Components', 'Tokens']
  },
  theme: {
    type: String,
    default: undefined
  },
  variant: {
    type: String,
    default: undefined
  },
  block: Boolean,
  wrap: Boolean,
  responsive: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:active', 'change'])

const config = useIdesignConfig('SegmentedControl', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')
const currentTheme = computed(() => props.theme || (currentVariant.value === 'glass' ? 'black' : 'white'))

const containerRef = ref(null)
const itemRefs = ref([])
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        val: opt.id !== undefined ? opt.id : (opt.value !== undefined ? opt.value : opt.label),
        lbl: opt.label || opt.id || opt.value
      }
    }
    return { val: opt, lbl: opt }
  })
})

const isTwoItems = computed(() => normalizedOptions.value.length === 2)

const initialValue = computed(() => {
  if (props.active !== undefined && props.active !== null && props.active !== '') {
    return props.active
  }
  if (props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '') {
    return props.modelValue
  }
  return normalizedOptions.value[0]?.val
})

const currentActive = ref(initialValue.value)

const checkScrollOverflow = () => {
  if (!containerRef.value) return
  const el = containerRef.value
  const maxScroll = el.scrollWidth - el.clientWidth
  canScrollLeft.value = el.scrollLeft > 4
  canScrollRight.value = maxScroll > 4 && el.scrollLeft < maxScroll - 4
}

const handleScroll = () => {
  checkScrollOverflow()
}

const scrollToActive = () => {
  if (typeof window === 'undefined') return
  const activeIdx = normalizedOptions.value.findIndex(o => o.val === currentActive.value)
  if (activeIdx >= 0 && itemRefs.value[activeIdx] && typeof itemRefs.value[activeIdx].scrollIntoView === 'function') {
    itemRefs.value[activeIdx].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }
  checkScrollOverflow()
}

watch(() => [props.active, props.modelValue], ([newActive, newModel]) => {
  if (newActive !== undefined && newActive !== null && newActive !== '') {
    currentActive.value = newActive
  } else if (newModel !== undefined && newModel !== null && newModel !== '') {
    currentActive.value = newModel
  }
  nextTick(scrollToActive)
})

watch(() => props.options, () => {
  nextTick(() => {
    scrollToActive()
    checkScrollOverflow()
  })
}, { deep: true })

const selectOption = (val) => {
  currentActive.value = val
  emit('update:modelValue', val)
  emit('update:active', val)
  emit('change', val)
  nextTick(scrollToActive)
}

// Full keyboard accessibility for tabs
const handleKeydown = (e) => {
  if (!normalizedOptions.value.length) return
  const currentIdx = normalizedOptions.value.findIndex(o => o.val === currentActive.value)
  let targetIdx = -1

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    targetIdx = currentIdx < normalizedOptions.value.length - 1 ? currentIdx + 1 : 0
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    targetIdx = currentIdx > 0 ? currentIdx - 1 : normalizedOptions.value.length - 1
  } else if (e.key === 'Home') {
    e.preventDefault()
    targetIdx = 0
  } else if (e.key === 'End') {
    e.preventDefault()
    targetIdx = normalizedOptions.value.length - 1
  }

  if (targetIdx >= 0 && normalizedOptions.value[targetIdx]) {
    const target = normalizedOptions.value[targetIdx]
    selectOption(target.val)
    if (itemRefs.value[targetIdx]) {
      itemRefs.value[targetIdx].focus()
    }
  }
}

onMounted(() => {
  nextTick(() => {
    scrollToActive()
    checkScrollOverflow()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkScrollOverflow, { passive: true })
    }
  })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkScrollOverflow)
  }
})
</script>

<style scoped>
.seg-container {
  display: flex;
  align-items: center;
  background: var(--track, #e8e8ed);
  border-radius: var(--r-pill, 999px);
  padding: 4px;
  gap: 3px;
  width: auto;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  touch-action: pan-x;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 4px;
  box-sizing: border-box;
  user-select: none;
  position: relative;
  transition: background 0.2s var(--ease-out-quart);
}
.seg-container::-webkit-scrollbar {
  display: none;
}

:root.dark .seg-container {
  background: var(--track, #2c2c2e);
}

/* Block mode: Expands evenly on wide screens, auto-adjusts to eat full width */
.seg-container.is-block {
  width: 100%;
}

.seg-container.is-block .seg-item {
  flex: 1 1 0px;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* 2-Item Smart Width: 50% / 50% split */
.seg-container.is-two-items {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
}

.seg-container.is-two-items .seg-item {
  flex: 1 1 calc(50% - 2px);
  width: 50%;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Explicit Wrap mode */
.seg-container.is-wrap {
  flex-wrap: wrap;
  border-radius: var(--r-card, 18px);
  width: 100%;
}

.seg-container.is-wrap .seg-item {
  flex: 1 1 auto;
  min-width: 0;
}

/* Segmented Item (Apple Pill ergonomics) */
.seg-item {
  position: relative;
  border: none;
  cursor: pointer;
  outline: none;
  font-family: var(--font);
  font-size: 13px;
  font-weight: 550;
  letter-spacing: -0.01em;
  padding: 5.5px 14px;
  min-height: 32px;
  border-radius: var(--r-pill, 999px);
  background: transparent;
  color: var(--text-2, #6e6e73);
  transition: color 0.18s ease, background 0.22s var(--ease-out-quart), box-shadow 0.22s var(--ease-out-quart), transform 0.14s var(--ease-spring);
  white-space: nowrap;
  width: auto;
  flex: 0 0 auto;
  scroll-snap-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
}

.seg-item:active {
  transform: scale(0.97);
}

.seg-item:hover:not(.active) {
  color: var(--text, #1d1d1f);
}

:root.dark .seg-item:hover:not(.active) {
  color: var(--text, #f5f5f7);
}

.seg-item.active {
  background: var(--surface, #ffffff);
  color: var(--text, #1d1d1f);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.04);
}

:root.dark .seg-item.active {
  background: var(--surface, #3a3a3c);
  color: var(--text, #f5f5f7);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.seg-item.active--black {
  background: var(--text, #1d1d1f);
  color: var(--bg, #f5f5f7);
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.24);
}

:root.dark .seg-item.active--black {
  background: #ffffff;
  color: #000000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/* ── Size Variants ── */
.seg-container.size-xs {
  padding: 2px;
  gap: 2px;
}
.size-xs .seg-item {
  padding: 2.5px 8px;
  font-size: 10.5px;
  min-height: 20px;
  border-radius: var(--r-pill, 999px);
}

.seg-container.size-sm {
  padding: 2.5px;
  gap: 2px;
}
.size-sm .seg-item {
  padding: 3.5px 10px;
  font-size: 11.5px;
  min-height: 24px;
  border-radius: var(--r-pill, 999px);
}

.seg-container.size-md {
  padding: 3.5px;
  gap: 2.5px;
}
.size-md .seg-item {
  padding: 5.5px 14px;
  font-size: 13px;
  min-height: 32px;
  border-radius: var(--r-pill, 999px);
}

.seg-container.size-lg {
  padding: 4.5px;
  gap: 3px;
}
.size-lg .seg-item {
  padding: 7.5px 18px;
  font-size: 14.5px;
  min-height: 38px;
  border-radius: var(--r-pill, 999px);
}

.seg-container.size-xl {
  padding: 5.5px;
  gap: 3.5px;
}
.size-xl .seg-item {
  padding: 10px 22px;
  font-size: 15.5px;
  min-height: 44px;
  border-radius: var(--r-pill, 999px);
}

/* ── Glass Variant ── */
.variant-glass {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--hairline, rgba(255, 255, 255, 0.2));
  box-shadow: var(--sh-card, 0 2px 10px rgba(0, 0, 0, 0.05));
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* ── Mobile Screen Optimization & Responsive Auto-Width ── */
@media (max-width: 768px) {
  .seg-container.is-responsive {
    flex-wrap: wrap;
    border-radius: var(--r-card, 18px);
    padding: 5px;
    gap: 4px;
    width: 100%;
  }
  
  .seg-container.is-responsive .seg-item {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 38px;
    padding: 7px 14px;
    font-size: 12.5px;
    text-align: center;
    justify-content: center;
  }
  
  .seg-container.is-responsive.is-block .seg-item {
    flex: 1 1 calc(33.333% - 6px);
    min-width: 100px;
  }

  .seg-container.is-responsive.is-two-items .seg-item {
    flex: 1 1 calc(50% - 4px);
  }
  
  .seg-container:not(.is-responsive) {
    padding: 4px;
    gap: 3px;
  }
  
  .seg-container:not(.is-responsive) .seg-item {
    min-height: 38px;
    padding: 7px 14px;
    font-size: 12.5px;
  }
}

@media (max-width: 480px) {
  .seg-container.is-responsive {
    padding: 4px;
    gap: 3px;
    border-radius: 14px;
  }
  
  .seg-container.is-responsive .seg-item {
    min-height: 38px;
    padding: 6px 10px;
    font-size: 12px;
    flex: 1 1 calc(50% - 4px);
    min-width: 0;
  }
  
  .seg-container.is-responsive.is-block .seg-item {
    flex: 1 1 calc(50% - 4px);
    min-width: 0;
  }

  .seg-container.is-responsive.is-two-items .seg-item {
    flex: 1 1 calc(50% - 4px);
  }

  .seg-container:not(.is-responsive) {
    padding: 3px;
    gap: 2px;
  }
  
  .seg-container:not(.is-responsive) .seg-item {
    min-height: 38px;
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
