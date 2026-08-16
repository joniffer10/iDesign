<template>
  <div
    :class="[
      'id-form-actions',
      `align-${align}`,
      { 'is-sticky': sticky }
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  align: {
    type: String,
    default: 'right',
    validator: v => ['left', 'center', 'right', 'between'].includes(v)
  },
  sticky: Boolean
})
</script>

<style scoped>
.id-form-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  width: 100%;
}

.align-left { justify-content: flex-start; }
.align-center { justify-content: center; }
.align-right { justify-content: flex-end; }
.align-between { justify-content: space-between; }

.is-sticky {
  position: sticky;
  bottom: 0;
  background: var(--surface);
  padding: 12px 0;
  border-top: 1px solid var(--hairline);
  z-index: 10;
}
</style>
