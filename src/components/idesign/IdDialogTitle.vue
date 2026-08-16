<template>
  <h3 class="id-dialog-title">
    <slot />
  </h3>
</template>

<script setup>
</script>

<style scoped>
.id-dialog-title {
  font-size: var(--text-xl, 20px);
  font-weight: var(--font-bold, 700);
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text);
  margin: 0;
}
</style>
