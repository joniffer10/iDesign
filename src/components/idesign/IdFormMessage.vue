<template>
  <Transition name="msg-slide">
    <div
      v-if="hasMessage"
      :class="[
        'id-form-message',
        {
          'is-error': Boolean(error),
          'is-success': Boolean(success),
          'is-warning': Boolean(warning)
        }
      ]"
      role="alert"
    >
      <slot>{{ textContent }}</slot>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: [Boolean, String],
  success: [Boolean, String],
  warning: [Boolean, String],
  message: String
})

const textContent = computed(() => {
  if (typeof props.error === 'string') return props.error
  if (typeof props.success === 'string') return props.success
  if (typeof props.warning === 'string') return props.warning
  return props.message || ''
})

const hasMessage = computed(() => {
  return Boolean(props.error || props.success || props.warning || props.message)
})
</script>

<style scoped>
.id-form-message {
  font-size: var(--text-xs, 12px);
  font-weight: 550;
  color: var(--text-3);
  display: flex;
  align-items: center;
  gap: 4px;
}

.is-error {
  color: var(--danger, #ff3b30);
}

.is-success {
  color: var(--success, #30d158);
}

.is-warning {
  color: var(--warning, #ff9f0a);
}

.msg-slide-enter-active,
.msg-slide-leave-active {
  transition: all 0.2s var(--ease-out-quart, ease-out);
}

.msg-slide-enter-from,
.msg-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
