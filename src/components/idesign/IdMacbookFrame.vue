<template>
  <div :class="['id-macbook-frame', `color-${color}`]">
    <!-- Screen Chassis -->
    <div class="macbook-lid">
      <!-- Top Bezel with Camera / Notch -->
      <div class="macbook-bezel-top">
        <div class="macbook-camera">
          <div class="camera-lens" />
          <div class="camera-indicator" />
        </div>
      </div>

      <!-- Display Screen Area -->
      <div class="macbook-screen">
        <!-- Optional Simulated Menu Bar -->
        <div v-if="showMenuBar" class="macbook-menubar">
          <div class="menubar-left">
            <span class="menubar-apple"></span>
            <span class="menubar-item active">{{ appName }}</span>
            <span class="menubar-item">File</span>
            <span class="menubar-item">Edit</span>
            <span class="menubar-item">View</span>
            <span class="menubar-item">Window</span>
            <span class="menubar-item">Help</span>
          </div>
          <div class="menubar-right">
            <span class="menubar-icon">🔋 100%</span>
            <span class="menubar-icon">📶</span>
            <span class="menubar-icon">🔍</span>
            <span class="menubar-time">{{ currentTime }}</span>
          </div>
        </div>

        <!-- Inner Content Window Slot -->
        <div class="macbook-content">
          <slot />
        </div>
      </div>

      <!-- Bottom Bezel with subtle logo text or hairline -->
      <div class="macbook-bezel-bottom" />
    </div>

    <!-- Base / Keyboard Chassis -->
    <div class="macbook-base">
      <div class="macbook-notch-opening" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  appName: {
    type: String,
    default: 'Studio'
  },
  showMenuBar: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'silver',
    validator: v => ['silver', 'space-gray', 'midnight', 'starlight'].includes(v)
  }
})

const currentTime = ref('9:41 AM')
let timer = null

onMounted(() => {
  const updateTime = () => {
    const d = new Date()
    let h = d.getHours()
    const m = String(d.getMinutes()).padStart(2, '0')
    const ampm = h >= 12 ? 'PM' : 'AM'
    h = h % 12 || 12
    currentTime.value = `${h}:${m} ${ampm}`
  }
  updateTime()
  timer = setInterval(updateTime, 30000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.id-macbook-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  font-family: var(--font);
  user-select: none;
}

/* Screen Lid */
.macbook-lid {
  width: 100%;
  background: #0d0d0f;
  border-radius: 20px 20px 0 0;
  padding: 10px 10px 0;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35), 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 2px solid #2c2c2e;
  border-bottom: none;
  box-sizing: border-box;
}

.macbook-bezel-top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12px;
}

.macbook-camera {
  display: flex;
  align-items: center;
  gap: 4px;
}

.camera-lens {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1c1c1e;
  border: 1px solid #3a3a3c;
  box-shadow: inset 0 0 2px rgba(0, 113, 227, 0.8);
}

.camera-indicator {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #30d158;
  opacity: 0.85;
}

.macbook-screen {
  background: var(--bg);
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 420px;
  max-height: 620px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.macbook-menubar {
  height: 24px;
  background: rgba(28, 28, 30, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 11px;
  font-weight: 550;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menubar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menubar-apple {
  font-size: 13px;
}

.menubar-item {
  opacity: 0.85;
  cursor: default;
}

.menubar-item.active {
  font-weight: 700;
  opacity: 1;
}

.menubar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10.5px;
  opacity: 0.85;
}

.macbook-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.macbook-bezel-bottom {
  height: 10px;
}

/* Macbook Base Chassis */
.macbook-base {
  position: relative;
  width: 108%;
  height: 14px;
  background: linear-gradient(180deg, #d1d1d6 0%, #8e8e93 100%);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
}

.color-space-gray .macbook-base {
  background: linear-gradient(180deg, #636366 0%, #3a3a3c 100%);
}

.color-midnight .macbook-base {
  background: linear-gradient(180deg, #2c2c2e 0%, #1c1c1e 100%);
}

.color-starlight .macbook-base {
  background: linear-gradient(180deg, #e5e5ea 0%, #d1d1d6 100%);
}

.macbook-notch-opening {
  width: 120px;
  height: 4px;
  background: #3a3a3c;
  border-radius: 0 0 6px 6px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
