<template>
  <div
    :class="[
      'id-empty-state',
      { 'no-bg': noBg },
      config.mergedUi.value.base
    ]"
  >
    <div :class="['empty-icon-box', config.mergedUi.value.iconBox]">
      <slot name="icon">
        <span v-if="typeof currentIcon === 'string' && currentIcon.length <= 4" :class="['default-icon', config.mergedUi.value.icon]">{{ currentIcon }}</span>
        <img v-else-if="typeof currentIcon === 'string' && (currentIcon.startsWith('http') || currentIcon.startsWith('/'))" :src="currentIcon" alt="icon" :class="['empty-icon-img', config.mergedUi.value.icon]" />
        <component :is="currentIcon" v-else :size="28" :class="['empty-icon-svg', config.mergedUi.value.icon]" />
      </slot>
    </div>

    <h3 :class="['empty-title', config.mergedUi.value.title]">{{ currentTitle }}</h3>
    <p v-if="currentDescription" :class="['empty-desc', config.mergedUi.value.description || config.mergedUi.value.desc]">{{ currentDescription }}</p>

    <div v-if="$slots.action || actionLabel" :class="['empty-action', config.mergedUi.value.action]">
      <slot name="action">
        <IdButton variant="primary" size="md" @click="$emit('action', $event); $emit('click', $event)">
          {{ actionLabel }}
        </IdButton>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IdButton from './IdButton.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  title: { type: String, default: undefined },
  description: { type: String, default: undefined },
  icon: { type: [String, Object, Function], default: undefined },
  actionLabel: String,
  noBg: Boolean,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['action', 'click'])

const config = useIdesignConfig('Empty', props)
const currentTitle = computed(() => props.title !== undefined ? props.title : 'No Results Found')
const currentDescription = computed(() => props.description !== undefined ? props.description : 'Try adjusting your search filters or create a new item.')
const currentIcon = computed(() => props.icon !== undefined ? props.icon : '🔍')
</script>

<style scoped>
.id-empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 48px 24px; border: 1px dashed var(--hairline);
  border-radius: var(--r-card); background: var(--surface); color: var(--text);
  width: 100%; max-width: 520px; margin: 0 auto;
}
.id-empty-state.no-bg {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}
.empty-icon-box {
  width: 64px; height: 64px; border-radius: 50%; background: var(--hover);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
  color: var(--accent); flex-shrink: 0;
}
.default-icon { font-size: 28px; line-height: 1; }
.empty-icon-img { width: 32px; height: 32px; object-fit: contain; }
.empty-icon-svg { stroke-width: 1.75; }
.empty-title { font-size: 17px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); margin: 0; }
.empty-desc { font-size: 13.5px; color: var(--text-2); max-width: 360px; line-height: 1.5; margin: 6px 0 0 0; }
.empty-action { margin-top: 20px; }
</style>
