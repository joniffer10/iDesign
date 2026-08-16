<template>
  <div class="id-dialog-body">
    <slot />
  </div>
</template>

<script setup>
</script>

<style scoped>
.id-dialog-body {
  padding: 12px 24px 20px 24px;
  font-size: var(--text-base, 15px);
  color: var(--text-body);
  flex: 1;
  overflow-y: auto;
}
</style>
