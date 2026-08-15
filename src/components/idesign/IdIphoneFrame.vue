<template>
  <div class="iphone-shell">
    <div class="iphone-bezel">
      <!-- Dynamic Island -->
      <div class="dynamic-island">
        <div class="camera-lens"></div>
      </div>

      <!-- Status Bar -->
      <div class="status-bar">
        <span class="time">{{ currentTime }}</span>
        <div class="status-icons">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.35A.996.996 0 0 0 5.06 21c.26 0 .52-.1.71-.29l1.74-1.74C8.93 19.46 10.42 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="7" width="18" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
            <rect x="4" y="9" width="12" height="6" rx="1.5"/>
            <path d="M22 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- Screen Content Slot -->
      <div class="screen-content">
        <slot />
      </div>

      <!-- Home Indicator Bar -->
      <div class="home-indicator">
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTime = ref('9:41')

onMounted(() => {
  const updateTime = () => {
    const d = new Date()
    let hours = d.getHours()
    const minutes = d.getMinutes().toString().padStart(2, '0')
    currentTime.value = `${hours}:${minutes}`
  }
  updateTime()
})
</script>

<style scoped>
.iphone-shell {
  width: 340px;
  height: 680px;
  background: #1c1c1e;
  border-radius: 50px;
  padding: 12px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35), inset 0 0 0 2px #3a3a3c;
  position: relative;
  user-select: none;
}
.iphone-bezel {
  width: 100%;
  height: 100%;
  background: var(--bg);
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}
.dynamic-island {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 30px;
  background: #000000;
  border-radius: 20px;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
}
.camera-lens {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #111;
  box-shadow: inset 0 0 2px rgba(255,255,255,0.2);
}
.status-bar {
  height: 48px;
  padding: 12px 24px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 650;
  color: var(--text);
  z-index: 30;
}
.status-icons {
  display: flex;
  align-items: center;
  gap: 6px;
}
.screen-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
.home-indicator {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  background: transparent;
}
.home-indicator .bar {
  width: 130px;
  height: 4px;
  background: var(--text);
  border-radius: 999px;
  opacity: 0.4;
}
</style>
