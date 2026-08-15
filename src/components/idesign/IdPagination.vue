<template>
  <nav :class="['id-pagination', `size-${size}`, `variant-${variant}`, `color-${color}`]" aria-label="Pagination">
    <button type="button" class="page-btn" :disabled="modelValue <= 1" aria-label="Previous page" @click="go(modelValue - 1)">
      <ChevronLeft :size="arrowSize" />
    </button>
    <button
      v-for="p in visiblePages"
      :key="p"
      type="button"
      :class="['page-btn', 'page-num', { active: p === modelValue, ellipsis: p === '...' }]"
      :disabled="p === '...'"
      @click="p !== '...' && go(p)"
    >
      {{ p }}
    </button>
    <button type="button" class="page-btn" :disabled="modelValue >= totalPages" aria-label="Next page" @click="go(modelValue + 1)">
      <ChevronRight :size="arrowSize" />
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  siblings: { type: Number, default: 1 },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: { type: String, default: 'default', validator: v => ['default', 'pill', 'glass'].includes(v) },
  color: { type: String, default: 'blue', validator: v => ['blue', 'green', 'purple'].includes(v) }
})

const emit = defineEmits(['update:modelValue'])

const arrowSize = computed(() => props.size === 'sm' ? 14 : props.size === 'lg' ? 18 : 16)

const go = (p) => { if (p >= 1 && p <= props.totalPages) emit('update:modelValue', p) }

const visiblePages = computed(() => {
  const t = props.totalPages, c = props.modelValue, s = props.siblings
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)
  const pages = [1]
  const start = Math.max(2, c - s), end = Math.min(t - 1, c + s)
  if (start > 2) pages.push('...')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < t - 1) pages.push('...')
  pages.push(t)
  return pages
})
</script>

<style scoped>
.id-pagination { display: inline-flex; align-items: center; gap: 4px; font-family: var(--font); }

.variant-glass {
  padding: 4px 8px; border-radius: var(--r-pill); background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--hairline); box-shadow: var(--sh-card);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.65); }

.size-sm .page-btn { min-width: 30px; height: 30px; font-size: 12.5px; }
.size-md .page-btn { min-width: 36px; height: 36px; font-size: 14px; }
.size-lg .page-btn { min-width: 44px; height: 44px; font-size: 15.5px; }

.page-btn {
  border-radius: var(--r-pill); border: none; background: transparent;
  color: var(--text); font-family: var(--font); font-weight: 550; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; transition: all .15s;
  font-variant-numeric: tabular-nums;
}
.page-btn:hover:not(:disabled):not(.ellipsis) { background: var(--hover); }
.page-btn:disabled { opacity: .35; cursor: not-allowed; }

.page-btn.active { background: var(--accent); color: #fff; font-weight: 650; }
.color-green .page-btn.active { background: #34c759; }
.color-purple .page-btn.active { background: #af52de; }

.page-btn.ellipsis { cursor: default; pointer-events: none; color: var(--text-3); }
</style>
