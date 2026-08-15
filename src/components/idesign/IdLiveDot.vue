<template>
  <div class="live-dot-container">
    <span class="pulse-dot" />
    <span class="live-label"><slot>LIVE</slot></span>
  </div>
</template>

<style scoped>
.live-dot-container {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--text-3);
  text-transform: uppercase;
}
</style>
