<template>
  <div
    ref="containerRef"
    :class="[
      'seg-container',
      `size-${currentSize}`,
      `variant-${currentVariant}`,
      { 
        'is-block': block,
        'is-responsive': responsive,
        'is-wrap': wrap
      },
      config.mergedUi.value.base
    ]"
    role="tablist"
    aria-label="Segmented control"
  >
    <button
      v-for="(option, idx) in normalizedOptions"
      :key="option.val"
      :ref="el => { if (el) itemRefs[idx] = el }"
      type="button"
      role="tab"
      :aria-selected="currentActive === option.val"
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
      {{ option.lbl }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
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

const scrollToActive = () => {
  if (typeof window === 'undefined') return
  const activeIdx = normalizedOptions.value.findIndex(o => o.val === currentActive.value)
  if (activeIdx >= 0 && itemRefs.value[activeIdx]) {
    itemRefs.value[activeIdx].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }
}

watch(() => [props.active, props.modelValue], ([newActive, newModel]) => {
  if (newActive !== undefined && newActive !== null && newActive !== '') {
    currentActive.value = newActive
  } else if (newModel !== undefined && newModel !== null && newModel !== '') {
    currentActive.value = newModel
  }
  nextTick(scrollToActive)
})

const selectOption = (val) => {
  currentActive.value = val
  emit('update:modelValue', val)
  emit('update:active', val)
  emit('change', val)
  nextTick(scrollToActive)
}

onMounted(() => {
  nextTick(scrollToActive)
})
</script>

<style scoped>
.seg-container {
  display: flex;
  align-items: center;
  background: var(--track);
  border-radius: var(--r-pill);
  padding: 3px;
  gap: 3px;
  width: auto;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  touch-action: pan-x;
  scroll-snap-type: x mandatory;
}
.seg-container::-webkit-scrollbar {
  display: none;
}

.seg-container.is-block {
  width: 100%;
}

.seg-container.is-wrap {
  flex-wrap: wrap;
  border-radius: var(--r-card);
}

.seg-item {
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 550;
  padding: 8px 16px;
  border-radius: var(--r-pill);
  background: transparent;
  color: var(--text-2);
  transition: all 0.2s var(--ease-out-quart);
  white-space: nowrap;
  width: auto;
  flex: 0 0 auto;
  scroll-snap-align: center;
  user-select: none;
}

/* Size Variants */
.size-xs .seg-item { padding: 4px 8px; font-size: 11px; }
.size-sm .seg-item { padding: 6px 12px; font-size: 12px; }
.size-md .seg-item { padding: 8px 16px; font-size: 13px; }
.size-lg .seg-item { padding: 10px 20px; font-size: 14.5px; }
.size-xl .seg-item { padding: 12px 24px; font-size: 16px; }

.seg-container.is-wrap .seg-item {
  width: auto;
  flex: 0 0 auto;
}

.seg-item:hover {
  color: var(--text);
}
.seg-item.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}
.seg-item.active--black {
  background: var(--text);
  color: var(--bg);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);
}

/* Glass Variant */
.variant-glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
:root.dark .variant-glass {
  background: rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .seg-container.is-responsive {
    flex-wrap: wrap;
    border-radius: 16px;
    padding: 5px;
    gap: 4px;
  }
  .seg-container.is-responsive .seg-item {
    width: auto;
    flex: 0 0 auto;
    padding: 7px 12px;
    font-size: 12.5px;
  }
}

@media (max-width: 480px) {
  .seg-container.is-responsive .seg-item {
    width: auto;
    flex: 0 0 auto;
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style>
