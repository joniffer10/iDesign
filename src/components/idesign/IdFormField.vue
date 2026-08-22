<template>
  <div
    :class="[
      'id-form-field',
      {
        'has-error': Boolean(error),
        'has-success': Boolean(success),
        'has-warning': Boolean(warning),
        'is-disabled': disabled
      },
      config.mergedUi.value.base
    ]"
  >
    <!-- Label -->
    <slot name="label">
      <IdFormLabel v-if="label" :required="required" :for="name" :class="config.mergedUi.value.label">
        {{ label }}
      </IdFormLabel>
    </slot>

    <!-- Description (above input if placed here) -->
    <slot name="description">
      <IdFormDescription v-if="description" :class="config.mergedUi.value.description">
        {{ description }}
      </IdFormDescription>
    </slot>

    <!-- Main Input / Control Slot -->
    <div :class="['form-field-control', config.mergedUi.value.control || config.mergedUi.value.fieldControl]">
      <slot />
    </div>

    <!-- Error / Success Message -->
    <slot name="message">
      <IdFormMessage
        v-if="error || success || warning || hint"
        :error="error"
        :success="success"
        :warning="warning"
        :message="message || hint"
        :class="config.mergedUi.value.message"
      />
    </slot>
  </div>
</template>

<script setup>
import { provide, computed } from 'vue'
import IdFormLabel from './IdFormLabel.vue'
import IdFormDescription from './IdFormDescription.vue'
import IdFormMessage from './IdFormMessage.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  name: String,
  label: String,
  description: String,
  hint: String,
  message: String,
  error: [Boolean, String],
  success: [Boolean, String],
  warning: [Boolean, String],
  required: Boolean,
  disabled: Boolean,
  variant: String,
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('FormField', props)
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))

provide('id-form-field-context', {
  name: computed(() => props.name),
  error: computed(() => props.error),
  required: computed(() => props.required),
  disabled: computed(() => props.disabled)
})
</script>

<style scoped>
.id-form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.form-field-control {
  width: 100%;
}
</style>
