<template>
  <div
    ref="containerRef"
    :class="[
      'seg-container',
      { 
        'is-block': block,
        'is-responsive': responsive,
        'is-wrap': wrap
      }
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
          'active--black': theme === 'black' && currentActive === option.val
        }
      ]"
      @click="selectOption(option.val)"
    >
      {{ option.lbl }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

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
    default: 'white', // 'white' (light toggle) or 'black' (strong filter)
    validator: val => ['white', 'black'].includes(val)
  },
  block: Boolean,
  wrap: Boolean,
  responsive: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'update:active', 'change'])

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
