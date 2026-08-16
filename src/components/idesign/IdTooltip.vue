<template>
  <div :class="['id-tooltip-wrapper', config.mergedUi.value.base]" @mouseenter="show = true" @mouseleave="show = false" @focus="show = true" @blur="show = false">
    <slot />
    <Transition name="tooltip-pop">
      <div v-if="show" :class="['id-tooltip', `pos-${currentPosition}`, config.mergedUi.value.tooltip]" role="tooltip">
        <span :class="['tooltip-text', config.mergedUi.value.text]">{{ text }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  text: { type: String, required: true },
  position: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const config = useIdesignConfig('Tooltip', props)
const currentPosition = computed(() => props.position || 'top')
const show = ref(false)
</script>

<style scoped>
.id-tooltip-wrapper { position: relative; display: inline-flex; }
.id-tooltip {
  position: absolute; z-index: 1000; padding: 6px 12px; border-radius: 10px;
  background: #1c1c1e; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 12.5px; font-weight: 600; letter-spacing: -0.01em;
  white-space: nowrap; pointer-events: none; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

:root.dark .id-tooltip {
  background: #ffffff; color: #1c1c1e; border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.pos-top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.pos-bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.pos-left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.pos-right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }

.tooltip-pop-enter-active, .tooltip-pop-leave-active { transition: opacity .15s, transform .15s var(--ease-out-quart); }
.tooltip-pop-enter-from, .tooltip-pop-leave-to { opacity: 0; }
.pos-top.tooltip-pop-enter-from { transform: translateX(-50%) translateY(4px); }
.pos-bottom.tooltip-pop-enter-from { transform: translateX(-50%) translateY(-4px); }
</style>
