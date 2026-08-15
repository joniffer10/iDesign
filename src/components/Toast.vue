<template>
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="message" class="toast-container">
        <div class="toast-content">
          <div class="toast-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <span class="toast-message">{{ message }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 120;
  pointer-events: none;
}
.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(29, 29, 31, 0.92);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: var(--r-pill);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast-message {
  font-size: 13.5px;
  font-weight: 550;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: opacity 0.25s var(--ease-spring), transform 0.25s var(--ease-spring);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 15px) scale(0.95);
}
</style>
