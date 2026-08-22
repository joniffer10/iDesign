<template>
  <div ref="wrapperRef" :class="['id-popover-wrapper', config.mergedUi.value.base]">
    <div :class="['trigger-wrap', config.mergedUi.value.trigger]" @click="toggle">
      <slot name="trigger" />
    </div>

    <Transition name="popover-fade">
      <div v-if="isOpen" :class="['popover-card', `position-${currentPosition}`, `size-${currentSize}`, `variant-${currentVariant}`, config.mergedUi.value.card]" role="dialog">
        <div v-if="title || subtitle || content || body || $slots.default" :class="['popover-content', config.mergedUi.value.content]">
          <div v-if="title" :class="['popover-title', config.mergedUi.value.title]">{{ title }}</div>
          <div v-if="subtitle" :class="['popover-subtitle', config.mergedUi.value.subtitle]">{{ subtitle }}</div>
          <div v-if="content || body" :class="['popover-body', config.mergedUi.value.body]">{{ content || body }}</div>
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  position: { type: String, default: 'bottom' },
  title: String,
  subtitle: String,
  content: String,
  body: String,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Popover', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw)
})
const currentPosition = computed(() => props.position || 'bottom')

const isOpen = ref(false)
const wrapperRef = ref(null)

const toggle = () => { isOpen.value = !isOpen.value }

const handleOutside = (e) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) isOpen.value = false
}

onMounted(() => document.addEventListener('click', handleOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleOutside))
</script>

<style scoped>
.id-popover-wrapper { position: relative; display: inline-block; font-family: var(--font); }
.trigger-wrap { cursor: pointer; display: inline-block; }

.size-sm.popover-card { min-width: 170px; padding: 10px 12px; border-radius: 12px; }
.size-md.popover-card { min-width: 210px; padding: 14px 16px; border-radius: 16px; }
.size-lg.popover-card { min-width: 260px; padding: 18px 22px; border-radius: 20px; }

.popover-card {
  position: absolute; z-index: 80; background: var(--surface);
  border: 1px solid var(--hairline); box-shadow: var(--sh-overlay);
  color: var(--text); font-size: 13.5px;
}

.variant-glass {
  background: var(--variant-glass-bg); backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop);
  border: var(--variant-glass-border);
}

.variant-solid {
  background: var(--variant-solid-bg); color: var(--variant-solid-color);
  border: none;
}
.variant-solid .popover-title { color: #ffffff; }
.variant-solid .popover-subtitle { color: rgba(255, 255, 255, 0.65); }
.variant-solid .popover-body { color: rgba(255, 255, 255, 0.85); }

.position-bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.position-top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.position-left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.position-right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }

.popover-content { display: flex; flex-direction: column; gap: 4px; }

.size-sm .popover-title { font-size: 13px; }
.size-md .popover-title { font-size: 14.5px; }
.size-lg .popover-title { font-size: 16px; }

.popover-title { font-weight: 650; color: var(--text); }
.popover-subtitle { font-size: 12px; color: var(--text-3); font-weight: 500; }

.size-sm .popover-body { font-size: 12px; }
.size-md .popover-body { font-size: 13px; }
.size-lg .popover-body { font-size: 14.5px; }

.popover-body { color: var(--text-2); line-height: 1.5; margin-top: 2px; }

.popover-fade-enter-active, .popover-fade-leave-active { transition: opacity .15s, transform .15s var(--ease-out-quart); }
.popover-fade-enter-from, .popover-fade-leave-to { opacity: 0; transform: translateY(-4px) translateX(-50%); }
</style>
