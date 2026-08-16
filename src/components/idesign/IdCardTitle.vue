<template>
  <component :is="tag" class="id-card-title">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: 'h3'
  }
})
</script>

<style scoped>
.id-card-title {
  font-size: var(--text-lg, 17px);
  font-weight: var(--font-bold, 700);
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text);
  margin: 0;
}
</style>
