<template>
  <IdModal
    :model-value="isOpen"
    :title="title"
    :subtitle="subtitle"
    :max-width="maxWidth"
    :size="size"
    :variant="variant"
    :close-on-backdrop="closeOnBackdrop"
    :teleport="teleport"
    @update:model-value="handleUpdate"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.subtitle" #subtitle>
      <slot name="subtitle" />
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
  maxWidth: String,
  size: String,
  variant: { type: String, default: 'default' },
  closeOnBackdrop: { type: Boolean, default: true },
  teleport: { type: Boolean, default: true }
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
