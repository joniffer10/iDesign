<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="['id-panel-row', { 'is-clickable': clickable || href }]"
    @click="$emit('click', $event)"
  >
    <div v-if="icon || $slots.icon || iconBg" class="row-icon-wrap" :style="iconBg ? { background: iconBg, color: '#fff' } : {}">
      <slot name="icon">
        <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="16" />
        <span v-else-if="typeof icon === 'string' && icon.length <= 4">{{ icon }}</span>
      </slot>
    </div>

    <div class="row-content">
      <div v-if="title" class="row-title">{{ title }}</div>
      <div v-if="subtitle || $slots.subtitle" class="row-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </div>
      <slot />
    </div>

    <div v-if="detail" class="row-detail">{{ detail }}</div>

    <div v-if="$slots.action || $slots.trailing" class="row-action">
      <slot name="action">
        <slot name="trailing" />
      </slot>
    </div>
    <div v-else-if="chevron" class="row-chevron">
      <ChevronRight :size="16" />
    </div>
  </component>
</template>

<script setup>
import { ChevronRight } from '@lucide/vue'

defineProps({
  title: String,
  subtitle: String,
  detail: String,
  icon: [String, Object, Function],
  iconBg: String,
  href: String,
  clickable: Boolean,
  chevron: { type: Boolean, default: true }
})

defineEmits(['click'])
</script>

<style scoped>
.id-panel-row {
  display: flex; align-items: center; gap: 14px; padding: 16px clamp(17px, 3vw, 24px);
  color: var(--text); text-decoration: none; background: var(--surface); transition: background 0.15s ease;
}
.id-panel-row + .id-panel-row { border-top: 1px solid var(--hairline); }
.id-panel-row.is-clickable:hover { background: var(--hover); cursor: pointer; }

.row-icon-wrap {
  width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0; background: var(--hover); color: var(--text); overflow: hidden;
}

.row-content { flex: 1; min-width: 0; }
.row-title { font-size: 14.5px; font-weight: 600; color: var(--text); }
.row-subtitle { font-size: 13px; color: var(--text-2); margin-top: 2px; }
.row-detail { font-size: 13.5px; color: var(--text-2); font-weight: 500; }
.row-action { display: flex; align-items: center; gap: 8px; }
.row-chevron { color: var(--text-3); display: flex; align-items: center; }
</style>
