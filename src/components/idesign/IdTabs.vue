<template>
  <div :class="['id-tabs', `size-${size}`, `variant-${variant}`, `color-${color}`]">
    <div class="tabs-list" role="tablist">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.value || idx"
        type="button"
        role="tab"
        :class="['tab-trigger', { active: modelValue === (tab.value || idx) }]"
        :aria-selected="modelValue === (tab.value || idx)"
        @click="$emit('update:modelValue', tab.value || idx)"
      >
        {{ tab.label || tab }}
      </button>
      <div v-if="variant === 'default'" class="tab-indicator" :style="indicatorStyle" />
    </div>
    <div class="tab-panel" role="tabpanel">
      <slot :name="modelValue" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  tabs: { type: Array, required: true },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: { type: String, default: 'default', validator: v => ['default', 'pill', 'glass'].includes(v) },
  color: { type: String, default: 'blue', validator: v => ['blue', 'green', 'purple'].includes(v) }
})

defineEmits(['update:modelValue'])

const activeIndex = computed(() => {
  const idx = props.tabs.findIndex(t => (t.value !== undefined ? t.value : t) === props.modelValue)
  return idx >= 0 ? idx : 0
})

const indicatorStyle = computed(() => ({
  left: `${(activeIndex.value / props.tabs.length) * 100}%`,
  width: `${100 / props.tabs.length}%`
}))
</script>

<style scoped>
.id-tabs {
  width: 100%; font-family: var(--font);
}

.tabs-list {
  position: relative; display: flex; border-bottom: 1px solid var(--hairline);
  overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
}

.size-sm .tab-trigger { padding: 8px 12px; font-size: 12.5px; }
.size-md .tab-trigger { padding: 12px 16px; font-size: 14px; }
.size-lg .tab-trigger { padding: 16px 22px; font-size: 15.5px; }

.tab-trigger {
  flex: 1; background: transparent; border: none; cursor: pointer;
  font-family: var(--font); font-weight: 550; color: var(--text-3);
  transition: all .2s ease; text-align: center; white-space: nowrap;
}

.tab-trigger.active { color: var(--accent); font-weight: 650; }
.color-green .tab-trigger.active { color: #34c759; }
.color-purple .tab-trigger.active { color: #af52de; }

.tab-trigger:hover { color: var(--text); }

.tab-indicator {
  position: absolute; bottom: -1px; height: 2.5px; background: var(--accent); border-radius: 999px;
  transition: left .25s var(--ease-spring), width .25s var(--ease-spring);
}
.color-green .tab-indicator { background: #34c759; }
.color-purple .tab-indicator { background: #af52de; }

/* Pill Variant */
.variant-pill .tabs-list {
  border-bottom: none; background: var(--track); padding: 3px; border-radius: var(--r-pill); gap: 2px;
}
.variant-pill .tab-trigger {
  border-radius: var(--r-pill); color: var(--text-2);
}
.variant-pill .tab-trigger.active {
  background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

/* Glass Variant */
.variant-glass .tabs-list {
  border-bottom: none; background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); border: 1px solid var(--hairline); padding: 4px;
  border-radius: var(--r-pill); gap: 4px; box-shadow: var(--sh-card);
}
:root.dark .variant-glass .tabs-list { background: rgba(28, 28, 30, 0.65); }
.variant-glass .tab-trigger.active {
  background: rgba(255, 255, 255, 0.88); color: var(--text); border-radius: var(--r-pill);
}
:root.dark .variant-glass .tab-trigger.active { background: rgba(255, 255, 255, 0.15); }

.tab-panel { padding: 20px 0; }
</style>
