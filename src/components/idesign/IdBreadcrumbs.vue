<template>
  <nav :class="['id-breadcrumbs', `size-${size}`, `variant-${variant}`, `color-${color}`]" aria-label="Breadcrumb">
    <ol class="crumbs-list">
      <li v-for="(crumb, idx) in items" :key="idx" class="crumb-item">
        <span v-if="idx > 0" class="crumb-sep">
          <ChevronRight :size="sepSize" />
        </span>
        <a
          v-if="crumb.href && idx < items.length - 1"
          :href="crumb.href"
          class="crumb-link"
          @click="$emit('navigate', crumb, $event)"
        >
          <template v-if="variant === 'with-icons'">
            <component :is="crumb.icon" v-if="crumb.icon && typeof crumb.icon !== 'string'" :size="iconSize" class="crumb-icon" />
            <span v-else-if="typeof crumb.icon === 'string' && crumb.icon" class="crumb-icon-str">{{ crumb.icon }}</span>
            <component :is="getFallbackIcon(idx)" v-else :size="iconSize" class="crumb-icon" />
          </template>
          <span>{{ crumb.label }}</span>
        </a>
        <span v-else class="crumb-current" aria-current="page">
          <template v-if="variant === 'with-icons'">
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

const props = defineProps({
  items: { type: Array, required: true },
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'with-icons', 'glass'].includes(v)
  },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  color: { type: String, default: 'blue', validator: v => ['blue', 'purple', 'green', 'gray'].includes(v) }
})

defineEmits(['navigate'])

const iconSize = computed(() => props.size === 'sm' ? 13 : props.size === 'lg' ? 16 : 14)
const sepSize = computed(() => props.size === 'sm' ? 12 : props.size === 'lg' ? 16 : 14)

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
  background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); border: 1px solid var(--hairline); box-shadow: var(--sh-card);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.65); }

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
