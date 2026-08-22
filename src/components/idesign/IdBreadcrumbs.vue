<template>
  <nav :class="['id-breadcrumbs', `size-${currentSize}`, `variant-${currentVariant}`, `color-${currentColor}`, config.mergedUi.value.base]" aria-label="Breadcrumb">
    <ol :class="['crumbs-list', config.mergedUi.value.list]">
      <li v-for="(crumb, idx) in items" :key="idx" :class="['crumb-item', config.mergedUi.value.item]">
        <span v-if="idx > 0" :class="['crumb-sep', config.mergedUi.value.sep || config.mergedUi.value.separator]">
          <ChevronRight :size="sepSize" />
        </span>
        <a
          v-if="crumb.href && idx < items.length - 1"
          :href="crumb.href"
          :class="['crumb-link', config.mergedUi.value.link]"
          @click="$emit('navigate', crumb, $event)"
        >
          <template v-if="currentVariant === 'with-icons'">
            <component :is="crumb.icon" v-if="crumb.icon && typeof crumb.icon !== 'string'" :size="iconSize" class="crumb-icon" />
            <span v-else-if="typeof crumb.icon === 'string' && crumb.icon" class="crumb-icon-str">{{ crumb.icon }}</span>
            <component :is="getFallbackIcon(idx)" v-else :size="iconSize" class="crumb-icon" />
          </template>
          <span>{{ crumb.label }}</span>
        </a>
        <span v-else :class="['crumb-current', config.mergedUi.value.current]" aria-current="page">
          <template v-if="currentVariant === 'with-icons'">
            <component :is="crumb.icon" v-if="crumb.icon && typeof crumb.icon !== 'string'" :size="iconSize" class="crumb-icon" />
            <span v-else-if="typeof crumb.icon === 'string' && crumb.icon" class="crumb-icon-str">{{ crumb.icon }}</span>
            <component :is="getFallbackIcon(idx)" v-else :size="iconSize" class="crumb-icon" />
          </template>
          <span>{{ crumb.label }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronRight, Home, Folder, FileText } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  items: { type: Array, required: true },
  variant: { type: String, default: undefined },
  size: { type: String, default: undefined },
  color: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['navigate'])

const config = useIdesignConfig('Breadcrumbs', props)
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

const iconSize = computed(() => currentSize.value === 'sm' ? 13 : currentSize.value === 'lg' ? 16 : 14)
const sepSize = computed(() => currentSize.value === 'sm' ? 12 : currentSize.value === 'lg' ? 16 : 14)

const getFallbackIcon = (idx) => {
  if (idx === 0) return Home
  if (idx === 1) return Folder
  return FileText
}
</script>

<style scoped>
.id-breadcrumbs {
  font-family: var(--font);
}

.variant-glass {
  display: inline-block; padding: 6px 14px; border-radius: var(--r-pill);
  background: var(--variant-glass-bg); backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop); border: var(--variant-glass-border); box-shadow: var(--sh-card);
}

.variant-soft {
  display: inline-block; padding: 6px 14px; border-radius: var(--r-pill);
  background: var(--variant-soft-bg);
}

.variant-subtle {
  display: inline-block; padding: 6px 14px; border-radius: var(--r-pill);
  background: var(--variant-subtle-bg); border: var(--variant-subtle-border);
}

.crumbs-list { display: flex; align-items: center; list-style: none; padding: 0; margin: 0; flex-wrap: wrap; gap: 2px; }
.crumb-item { display: inline-flex; align-items: center; }
.crumb-sep { display: flex; align-items: center; color: var(--text-3); margin: 0 4px; transition: color 0.2s ease; }

.size-sm .crumb-link, .size-sm .crumb-current { font-size: 12px; gap: 4px; }
.size-md .crumb-link, .size-md .crumb-current { font-size: 13.5px; gap: 6px; }
.size-lg .crumb-link, .size-lg .crumb-current { font-size: 15.5px; gap: 8px; }

.crumb-link {
  font-weight: 550; color: var(--accent); display: inline-flex; align-items: center;
  text-decoration: none; transition: color 0.2s ease, opacity 0.2s ease;
}
.crumb-link:hover { text-decoration: underline; opacity: 0.85; }

.color-purple .crumb-link { color: #af52de; }
.color-green .crumb-link { color: #34c759; }
.color-gray .crumb-link { color: var(--text-2); }

.crumb-current { font-weight: 600; color: var(--text); display: inline-flex; align-items: center; transition: color 0.2s ease; }
.crumb-icon { flex-shrink: 0; color: inherit; }
.crumb-icon-str { font-size: 14px; line-height: 1; }

:root.dark .crumb-link { color: #2997ff; }
:root.dark .color-purple .crumb-link { color: #bf5af2; }
:root.dark .color-green .crumb-link { color: #30d158; }
:root.dark .color-gray .crumb-link { color: rgba(255, 255, 255, 0.7); }
:root.dark .crumb-current { color: #f5f5f7; }
:root.dark .crumb-sep { color: rgba(255, 255, 255, 0.45); }
</style>
