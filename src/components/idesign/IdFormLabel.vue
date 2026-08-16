<template>
  <label :for="propsFor" class="id-form-label">
    <slot />
    <span v-if="required" class="required-indicator" aria-hidden="true">*</span>
  </label>
</template>

<script setup>
defineProps({
  for: {
    type: String,
    default: undefined
  },
  propsFor: {
    type: String,
    default: undefined
  },
  required: Boolean
})
</script>

<style scoped>
.id-form-label {
  font-size: var(--text-sm, 13px);
  font-weight: var(--font-semibold, 600);
  color: var(--text-2);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.required-indicator {
  color: var(--danger, #ff3b30);
  font-size: 12px;
  line-height: 1;
}
</style>
