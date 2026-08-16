<template>
  <div class="id-card-header">
    <slot />
  </div>
</template>

<script setup>
</script>

<style scoped>
.id-card-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px 8px 20px;
}
</style>
