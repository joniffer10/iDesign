<template>
  <div class="id-dialog-footer">
    <slot />
  </div>
</template>

<script setup>
</script>

<style scoped>
.id-dialog-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  background: var(--bg);
  border-top: 1px solid var(--hairline);
  margin-top: auto;
}
</style>
