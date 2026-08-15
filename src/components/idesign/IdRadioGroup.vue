<template>
  <div class="id-radio-group" role="radiogroup" :aria-label="label">
    <span v-if="label" class="radio-group-label">{{ label }}</span>
    <div :class="['radio-options', direction === 'horizontal' ? 'horizontal' : 'vertical']">
      <label v-for="opt in normalizedOptions" :key="opt.value" :class="['radio-item', { 'is-selected': modelValue === opt.value, 'is-disabled': disabled }]">
        <input type="radio" :value="opt.value" :checked="modelValue === opt.value" :disabled="disabled" :name="groupName" class="sr-only" @change="$emit('update:modelValue', opt.value)" />
        <span class="radio-circle"><span class="radio-dot" /></span>
        <span class="radio-label">{{ opt.label }}</span>
      </label>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ modelValue: { type: [String, Number], default: '' }, options: { type: Array, required: true }, label: String, direction: { type: String, default: 'vertical' }, disabled: Boolean })
defineEmits(['update:modelValue'])
const groupName = `radio-${Math.random().toString(36).substring(2, 8)}`
const normalizedOptions = computed(() => props.options.map(o => typeof o === 'object' ? o : { value: o, label: String(o) }))
</script>
<style scoped>
.radio-group-label { font-size: 13px; font-weight: 600; color: var(--text-2); display: block; margin-bottom: 8px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
.radio-options.vertical { display: flex; flex-direction: column; gap: 10px; }
.radio-options.horizontal { display: flex; flex-wrap: wrap; gap: 16px; }
.radio-item { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.radio-circle {
  width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--faint);
  background: var(--surface); display: flex; align-items: center; justify-content: center;
  transition: all .2s var(--ease-out-quart); flex-shrink: 0;
}
.radio-dot { width: 0; height: 0; border-radius: 50%; background: #fff; transition: all .2s var(--ease-spring); }
.is-selected .radio-circle { border-color: var(--accent); background: var(--accent); }
.is-selected .radio-dot { width: 8px; height: 8px; }
.radio-label { font-size: 14px; color: var(--text); font-weight: 500; }
.is-disabled { opacity: .5; cursor: not-allowed; }
</style>
