<template>
  <div class="seg-container" role="tablist" aria-label="Segmented control">
    <button
      v-for="option in normalizedOptions"
      :key="option.val"
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
import { ref, computed, watch } from 'vue'

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
  }
})

const emit = defineEmits(['update:modelValue', 'update:active', 'change'])

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

watch(() => [props.active, props.modelValue], ([newActive, newModel]) => {
  if (newActive !== undefined && newActive !== null && newActive !== '') {
    currentActive.value = newActive
  } else if (newModel !== undefined && newModel !== null && newModel !== '') {
    currentActive.value = newModel
  }
})

const selectOption = (val) => {
  currentActive.value = val
  emit('update:modelValue', val)
  emit('update:active', val)
  emit('change', val)
}
</script>

<style scoped>
.seg-container {
  display: inline-flex;
  background: var(--track);
  border-radius: var(--r-pill);
  padding: 3px;
  gap: 2px;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  touch-action: pan-x;
}
.seg-container::-webkit-scrollbar {
  display: none;
}
.seg-item {
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  padding: 7px 15px;
  border-radius: var(--r-pill);
  background: transparent;
  color: var(--text-2);
  transition: all 0.25s var(--ease-out-quart);
  white-space: nowrap;
  flex-shrink: 0;
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
</style>
