<template>
  <div class="id-card-content">
    <slot />
  </div>
</template>

<script setup>
</script>

<style scoped>
.id-card-content {
  padding: 8px 20px 16px 20px;
  font-size: var(--text-base, 14.5px);
  color: var(--text-body);
  flex: 1;
}
</style>
