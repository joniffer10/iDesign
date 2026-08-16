<template>
  <p class="id-form-description">
    <slot />
  </p>
</template>

<script setup>
</script>

<style scoped>
.id-form-description {
  font-size: var(--text-xs, 12px);
  color: var(--text-3, #86868b);
  line-height: var(--leading-normal, 1.5);
  margin: 0;
}
</style>
