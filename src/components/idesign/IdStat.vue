<template>
  <div :class="['id-stat-card', `size-${size}`, `variant-${variant}`]">
    <div class="stat-header">
      <span class="stat-label">{{ label }}</span>
      <span v-if="change" :class="['stat-badge', changeType]">
        {{ change }}
      </span>
    </div>

    <div class="stat-value-group">
      <span class="stat-value">{{ value }}</span>
      <span v-if="unit" class="stat-unit">{{ unit }}</span>
    </div>

    <p v-if="description" class="stat-desc">{{ description }}</p>

    <!-- Optional Sparkline Chart -->
    <div v-if="sparklineData && sparklineData.length" class="stat-sparkline">
      <IdSparkline :data="sparklineData" :color="sparklineColor" :height="sparklineHeight" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IdSparkline from './IdSparkline.vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit: String,
  change: String,
  changeType: { type: String, default: 'positive', validator: v => ['positive', 'negative', 'neutral'].includes(v) },
  description: String,
  sparklineData: Array,
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: { type: String, default: 'default', validator: v => ['default', 'glass', 'hero'].includes(v) }
})

const sparklineHeight = computed(() => props.size === 'sm' ? 28 : props.size === 'lg' ? 48 : 38)

const sparklineColor = computed(() => {
  if (props.changeType === 'positive') return '#34c759'
  if (props.changeType === 'negative') return '#ff3b30'
  return '#0071e3'
})
</script>

<style scoped>
.id-stat-card {
  background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--r-card);
  box-shadow: var(--sh-card); color: var(--text); font-family: var(--font);
  display: flex; flex-direction: column; gap: 6px; transition: all 0.2s var(--ease-out-quart); width: 100%;
}

.size-sm { padding: 14px; }
.size-md { padding: 20px; }
.size-lg { padding: 26px; }

.variant-glass {
  background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.65); }

.variant-hero {
  background: var(--grad-cta); color: #ffffff; border: none;
}
.variant-hero .stat-label, .variant-hero .stat-unit, .variant-hero .stat-desc { color: rgba(255, 255, 255, 0.85); }
.variant-hero .stat-value { color: #ffffff; }

.stat-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }

.size-sm .stat-label { font-size: 11.5px; }
.size-md .stat-label { font-size: 13px; }
.size-lg .stat-label { font-size: 14.5px; }

.stat-label { font-weight: 600; color: var(--text-2); }
.stat-badge {
  font-size: 11.5px; font-weight: 700; padding: 2px 8px; border-radius: var(--r-pill);
  font-variant-numeric: tabular-nums; transition: all 0.2s ease;
}
.stat-badge.positive { background: rgba(52, 199, 89, 0.12); color: #248a3d; }
.stat-badge.negative { background: rgba(255, 59, 48, 0.12); color: #d70015; }
.stat-badge.neutral { background: var(--hover); color: var(--text-2); }

:root.dark .stat-badge.positive { background: rgba(52, 199, 89, 0.18); color: #34c759; }
:root.dark .stat-badge.negative { background: rgba(255, 69, 58, 0.18); color: #ff453a; }

.stat-value-group { display: flex; align-items: baseline; gap: 4px; }

.size-sm .stat-value { font-size: 22px; }
.size-md .stat-value { font-size: 28px; }
.size-lg .stat-value { font-size: 36px; }

.stat-value { font-weight: 700; letter-spacing: -0.025em; color: var(--text); font-variant-numeric: tabular-nums; }
.stat-unit { font-size: 14px; font-weight: 550; color: var(--text-2); }

.stat-desc { font-size: 12.5px; color: var(--text-3); margin: 0; line-height: 1.4; }
.stat-sparkline { margin-top: 10px; }
</style>
