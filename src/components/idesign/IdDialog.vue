<template>
  <IdModal
    :model-value="isOpen"
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :max-width="maxWidth"
    :size="currentSize"
    :variant="currentVariant"
    :close-on-backdrop="closeOnBackdrop"
    :close-on-outside-click="closeOnOutsideClick"
    :close-on-escape="closeOnEscape"
    :show-close="showClose"
    :teleport="teleport"
    :ui="ui"
    @update:model-value="handleUpdate"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.description || $slots.subtitle" #description>
      <slot name="description">
        <slot name="subtitle" />
      </slot>
    </template>
    <template v-if="$slots.close" #close>
      <slot name="close" />
    </template>

    <slot />

    <template v-if="$slots.footer || $slots.actions" #footer>
      <slot name="actions">
        <slot name="footer" />
      </slot>
    </template>
  </IdModal>
</template>

<script setup>
import { computed } from 'vue'
import IdModal from './IdModal.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  open: { type: Boolean, default: undefined },
  title: String,
  subtitle: String,
  description: String,
  maxWidth: String,
  size: String,
  variant: { type: String, default: undefined },
  closeOnBackdrop: { type: Boolean, default: true },
  closeOnOutsideClick: { type: Boolean, default: undefined },
  closeOnEscape: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  teleport: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'update:open', 'open', 'close'])

const config = useIdesignConfig('Dialog', props)
const currentSize = computed(() => props.size || config.resolvedSize.value || 'md')
const currentVariant = computed(() => {
  const raw = props.variant || config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'clean': 'seamless',
    'plain': 'seamless',
    'no-divider': 'seamless',
    'no-dividers': 'seamless'
  })
})

const isOpen = computed(() => props.modelValue !== undefined ? props.modelValue : props.open || false)

const handleUpdate = (val) => {
  emit('update:modelValue', val)
  emit('update:open', val)
  if (val) emit('open')
  else emit('close')
}
</script>
