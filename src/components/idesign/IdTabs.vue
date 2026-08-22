<template>
  <div :class="['id-tabs', `size-${currentSize}`, `variant-${currentVariant}`, `color-${currentColor}`, config.mergedUi.value.base]">
    <div
      ref="tablistRef"
      :class="['tabs-list', config.mergedUi.value.list]"
      role="tablist"
      :aria-label="ariaLabel || 'Navigation Tabs'"
      @keydown="handleKeydown"
    >
      <button
        v-for="(tab, idx) in normalizedTabs"
        :id="`tab-${uid}-${tab.val}`"
        :key="tab.val"
        :ref="el => { if (el) tabRefs[idx] = el }"
        type="button"
        role="tab"
        :class="['tab-trigger', { active: modelValue === tab.val }, config.mergedUi.value.tab || config.mergedUi.value.trigger, modelValue === tab.val ? config.mergedUi.value.active : '']"
        :aria-selected="modelValue === tab.val"
        :aria-controls="`tabpanel-${uid}-${tab.val}`"
        :tabindex="modelValue === tab.val ? 0 : -1"
        @click="selectTab(tab.val)"
      >
        <component :is="tab.icon" v-if="tab.icon" class="tab-icon" :size="iconSize" />
        <span>{{ tab.lbl }}</span>
      </button>
      <div v-if="currentVariant === 'default'" :class="['tab-indicator', config.mergedUi.value.indicator]" :style="indicatorStyle" />
    </div>

    <div
      :id="`tabpanel-${uid}-${modelValue}`"
      :class="['tab-panel', config.mergedUi.value.panel]"
      role="tabpanel"
      :aria-labelledby="`tab-${uid}-${modelValue}`"
      tabindex="0"
    >
      <slot :name="String(modelValue)" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  tabs: { type: Array, required: true },
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  color: { type: String, default: undefined },
  ariaLabel: String,
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'change'])

const config = useIdesignConfig('Tabs', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw)
})
const currentColor = computed(() => {
  const c = config.resolvedColor.value || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  if (c === 'success') return 'green'
  if (c === 'warning') return 'purple'
  return c
})

const uid = Math.random().toString(36).substring(2, 8)
const tablistRef = ref(null)
const tabRefs = ref([])

const normalizedTabs = computed(() => {
  return props.tabs.map((tab, idx) => {
    if (typeof tab === 'object' && tab !== null) {
      return {
        val: tab.value !== undefined ? tab.value : (tab.id !== undefined ? tab.id : idx),
        lbl: tab.label || tab.title || String(tab.value || tab.id || idx),
        icon: tab.icon
      }
    }
    return { val: tab, lbl: String(tab) }
  })
})

const activeIndex = computed(() => {
  const idx = normalizedTabs.value.findIndex(t => t.val === props.modelValue)
  return idx >= 0 ? idx : 0
})

const iconSize = computed(() => currentSize.value === 'sm' ? 14 : currentSize.value === 'lg' ? 18 : 16)

const indicatorStyle = computed(() => {
  const count = normalizedTabs.value.length || 1
  return {
    left: `${(activeIndex.value / count) * 100}%`,
    width: `${100 / count}%`
  }
})

const selectTab = (val) => {
  emit('update:modelValue', val)
  emit('change', val)
}

const handleKeydown = (e) => {
  const count = normalizedTabs.value.length
  let newIdx = activeIndex.value

  const isRtl = typeof document !== 'undefined' && document.documentElement.getAttribute('dir') === 'rtl'

  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault()
      newIdx = isRtl ? (newIdx - 1 + count) % count : (newIdx + 1) % count
      break
    case 'ArrowLeft':
      e.preventDefault()
      newIdx = isRtl ? (newIdx + 1) % count : (newIdx - 1 + count) % count
      break
    case 'Home':
      e.preventDefault()
      newIdx = 0
      break
    case 'End':
      e.preventDefault()
      newIdx = count - 1
      break
    default:
      return
  }

  const nextTab = normalizedTabs.value[newIdx]
  if (nextTab) {
    selectTab(nextTab.val)
    if (tabRefs.value[newIdx]) {
      tabRefs.value[newIdx].focus()
    }
  }
}
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
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  outline: none; user-select: none;
}

.tab-trigger:focus-visible {
  box-shadow: var(--focus-ring);
  border-radius: 4px;
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
.variant-pill .tab-trigger:focus-visible {
  border-radius: var(--r-pill);
}
.variant-pill .tab-trigger.active {
  background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

/* Glass Variant */
.variant-glass .tabs-list {
  border-bottom: none; background: var(--variant-glass-bg); backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop); border: var(--variant-glass-border); padding: 4px;
  border-radius: var(--r-pill); gap: 4px; box-shadow: var(--variant-glass-shadow-subtle);
}
.variant-glass .tab-trigger.active {
  background: var(--surface); color: var(--text); border-radius: var(--r-pill); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Soft Variant */
.variant-soft .tabs-list {
  border-bottom: none; background: var(--variant-soft-bg); padding: 3px; border-radius: var(--r-pill); gap: 2px;
}
.variant-soft .tab-trigger { border-radius: var(--r-pill); color: var(--variant-soft-color); }
.variant-soft .tab-trigger.active { background: var(--surface); color: var(--accent); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

/* Outline Variant */
.variant-outline .tabs-list {
  border: var(--variant-outline-border); border-radius: var(--r-pill); padding: 3px; gap: 2px;
}
.variant-outline .tab-trigger { border-radius: var(--r-pill); }
.variant-outline .tab-trigger.active { background: var(--hover); color: var(--accent); }

/* Borderless Variant */
.variant-borderless .tabs-list {
  border-bottom: none;
}

.tab-panel { padding: 20px 0; outline: none; }
.tab-panel:focus-visible { box-shadow: var(--focus-ring); border-radius: var(--radius-sm); }
</style>
