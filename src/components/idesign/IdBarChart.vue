<template>
  <div class="id-bar-chart" :style="{ height: typeof height === 'number' ? `${height}px` : height }">
    <div class="bars-container">
      <div
        v-for="(item, idx) in data"
        :key="idx"
        class="bar-item-group"
      >
        <div class="bar-track">
          <div
            class="bar-fill"
            :style="{
              height: `${getPct(item.value)}%`,
              background: item.color || color || 'var(--accent)'
            }"
          >
            <span class="bar-tooltip">{{ item.value }}</span>
          </div>
        </div>
        <span class="bar-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true // [{ label: 'Jan', value: 40, color?: '#0071e3' }]
  },
  height: {
    type: [Number, String],
    default: 180
  },
  color: String,
  max: Number
})

const maxVal = computed(() => {
  if (props.max) return props.max
  if (!props.data || !props.data.length) return 100
  return Math.max(...props.data.map(d => d.value), 1)
})

const getPct = (val) => Math.min(100, Math.max(0, (val / maxVal.value) * 100))
</script>

<style scoped>
.id-bar-chart {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 8px 8px 8px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  box-shadow: var(--sh-card);
}

.bars-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  gap: 12px;
}

.bar-item-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  gap: 8px;
}

.bar-track {
  flex: 1;
  width: 100%;
  max-width: 36px;
  background: var(--hover);
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  width: 100%;
  border-radius: 8px;
  transition: height 0.6s var(--ease-out-quart);
  position: relative;
  display: flex;
  justify-content: center;
}

.bar-tooltip {
  position: absolute;
  top: -24px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text);
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform: translateY(4px);
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}

.bar-item-group:hover .bar-tooltip {
  opacity: 1;
  transform: translateY(0);
}

.bar-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-2);
}
</style>
