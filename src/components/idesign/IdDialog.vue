<template>
  <IdModal
    :model-value="isOpen"
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :max-width="maxWidth"
    :size="size"
    :variant="variant"
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

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  open: { type: Boolean, default: undefined },
  title: String,
  subtitle: String,
  description: String,
  maxWidth: String,
  size: String,
  variant: { type: String, default: 'default' },
  closeOnBackdrop: { type: Boolean, default: true },
  closeOnOutsideClick: { type: Boolean, default: undefined },
  closeOnEscape: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  teleport: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'update:open', 'open', 'close'])

const isOpen = computed(() => {
  if (props.open !== undefined) return props.open
  if (props.modelValue !== undefined) return props.modelValue
  return false
})

const handleUpdate = (val) => {
  emit('update:modelValue', val)
  emit('update:open', val)
  if (val) emit('open')
  else emit('close')
}
</script>

