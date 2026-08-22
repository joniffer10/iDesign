<template>
  <div :class="['id-form-section', `variant-${currentVariant}`, config.mergedUi.value.base]">
    <div v-if="title || description || $slots.header" class="form-section-header">
      <slot name="header">
        <h4 v-if="title" class="form-section-title">{{ title }}</h4>
        <p v-if="description" class="form-section-description">{{ description }}</p>
      </slot>
    </div>

    <div class="form-section-body">
      <slot />
    </div>

    <div v-if="divider" class="form-section-divider"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  title: String,
  description: String,
  divider: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const config = useIdesignConfig('FormSection', props)
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))
</script>

<style scoped>
.id-form-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.form-section-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-section-title {
  font-size: var(--text-base, 15px);
  font-weight: var(--font-bold, 700);
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text);
}

.form-section-description {
  font-size: var(--text-xs, 12.5px);
  color: var(--text-2);
}

.form-section-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 16px);
}

.form-section-divider {
  height: 1px;
  background: var(--hairline);
  margin-top: 8px;
}
</style>
