<template>
  <div class="id-pie-chart">
    <div class="donut-wrapper">
      <svg viewBox="0 0 100 100" class="donut-svg">
        <circle
          v-for="(slice, idx) in slices"
          :key="idx"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          :stroke="slice.color"
          stroke-width="16"
          :stroke-dasharray="`${slice.dash} ${100 - slice.dash}`"
          :stroke-dashoffset="-slice.offset"
          class="donut-segment"
        />
      </svg>
      <div class="donut-center">
        <span class="donut-total">{{ totalValue }}</span>
        <span class="donut-label">{{ centerLabel || 'Total' }}</span>
      </div>
    </div>

    <!-- Legend -->
    <div class="pie-legend">
      <div v-for="(item, idx) in data" :key="idx" class="legend-item">
        <span class="legend-dot" :style="{ background: item.color || defaultColors[idx % defaultColors.length] }" />
        <span class="legend-name">{{ item.label }}</span>
        <span class="legend-val">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true // [{ label: 'Direct', value: 40, color?: '#0071e3' }]
  },
  centerLabel: String
})

const defaultColors = ['#0071e3', '#30d158', '#af52de', '#ff9f0a', '#ff3b30', '#5e5ce6']

const totalValue = computed(() => {
  if (!props.data || !props.data.length) return 0
  return props.data.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0)
})

const slices = computed(() => {
  const tot = totalValue.value || 1
  let cumulative = 0
  // SVG circle circumference for r=40 is 2 * PI * 40 ≈ 251.327
  const C = 251.327

  return props.data.map((item, idx) => {
    const pct = (Number(item.value) || 0) / tot
    const dash = pct * C
    const offset = (cumulative / tot) * C
    cumulative += Number(item.value) || 0

    return {
      dash,
      offset,
      color: item.color || defaultColors[idx % defaultColors.length]
    }
  })
})
</script>

<style scoped>
.id-pie-chart {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  box-shadow: var(--sh-card);
  width: 100%;
}

.donut-wrapper {
  position: relative;
  width: 130px;
  height: 130px;
  flex-shrink: 0;
}

.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
}

.donut-segment {
  transition: stroke-dasharray 0.6s var(--ease-out-quart), stroke-dashoffset 0.6s var(--ease-out-quart);
}

.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}

.donut-total {
  font-size: 20px;
  font-weight: 750;
  color: var(--text);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.donut-label {
  font-size: 11px;
  color: var(--text-2);
  font-weight: 550;
  margin-top: 2px;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-name {
  color: var(--text-2);
  font-weight: 550;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-val {
  color: var(--text);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 480px) {
  .id-pie-chart { flex-direction: column; text-align: center; }
}
</style>
