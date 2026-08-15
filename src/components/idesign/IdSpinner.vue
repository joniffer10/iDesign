<template>
  <div :class="['id-spinner', `size-${size}`, `color-${color}`]" role="status" aria-label="Loading">
    <svg viewBox="0 0 24 24" fill="none" class="spinner-svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span v-if="label" class="spinner-label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v) },
  color: { type: String, default: 'blue', validator: v => ['blue', 'green', 'purple', 'white', 'gray'].includes(v) },
  label: String
})
</script>

<style scoped>
.id-spinner { display: inline-flex; align-items: center; gap: 10px; color: var(--accent); font-family: var(--font); }
.spinner-svg { animation: spin .8s linear infinite; }

.size-sm .spinner-svg { width: 18px; height: 18px; }
.size-md .spinner-svg { width: 24px; height: 24px; }
.size-lg .spinner-svg { width: 36px; height: 36px; }
.size-xl .spinner-svg { width: 48px; height: 48px; }

.color-green { color: #34c759; }
.color-purple { color: #af52de; }
.color-white { color: #ffffff; }
.color-gray { color: var(--text-2); }

.spinner-label { font-size: 13.5px; font-weight: 550; color: var(--text-2); }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
