<template>
  <p class="id-card-description">
    <slot />
  </p>
</template>

<script setup>
</script>

<style scoped>
.id-card-description {
  font-size: var(--text-sm, 13.5px);
  color: var(--text-2, #6e6e73);
  line-height: var(--leading-normal, 1.5);
  margin: 0;
}
</style>
