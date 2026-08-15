<template>
  <div class="id-sparkline" :style="{ width: `${width}px`, height: `${height}px` }">
    <svg :width="width" :height="height" viewBox="0 0 100 40" preserveAspectRatio="none">
      <defs v-if="fill">
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="color" stop-opacity="0.3" />
          <stop offset="100%" :stop-color="color" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Fill Area -->
      <path v-if="fill" :d="fillPath" :fill="`url(#${gradientId})`" />

      <!-- Sparkline Stroke Path -->
      <path :d="linePath" fill="none" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Array, default: () => [10, 25, 18, 35, 28, 45, 40, 60] },
  color: { type: String, default: '#0071e3' },
  fill: { type: Boolean, default: true },
  width: { type: Number, default: 120 },
  height: { type: Number, default: 36 },
  strokeWidth: { type: Number, default: 2.5 }
})

const gradientId = computed(() => `spark-grad-${Math.random().toString(36).substr(2, 9)}`)

const points = computed(() => {
  if (!props.data || props.data.length === 0) return []
  const max = Math.max(...props.data, 1)
  const min = Math.min(...props.data, 0)
  const range = max - min || 1
  const step = 100 / (props.data.length - 1 || 1)

  return props.data.map((val, idx) => {
    const x = idx * step
    const y = 35 - ((val - min) / range) * 30
    return { x, y }
  })
})

const linePath = computed(() => {
  if (points.value.length === 0) return ''
  return points.value.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '')
})

const fillPath = computed(() => {
  if (points.value.length === 0) return ''
  const firstX = points.value[0].x.toFixed(1)
  const lastX = points.value[points.value.length - 1].x.toFixed(1)
  return `${linePath.value} L ${lastX} 40 L ${firstX} 40 Z`
})
</script>

<style scoped>
.id-sparkline { display: inline-flex; align-items: center; overflow: hidden; }
svg { display: block; overflow: visible; }
</style>
