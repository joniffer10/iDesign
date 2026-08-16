<template>
  <div class="id-card-footer">
    <slot />
  </div>
</template>

<script setup>
</script>

<style scoped>
.id-card-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px 16px 20px;
  border-top: 1px solid var(--hairline);
  margin-top: auto;
}
</style>
