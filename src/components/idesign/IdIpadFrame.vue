<template>
  <div :class="['id-ipad-frame', `orientation-${orientation}`, `color-${color}`]">
    <div class="ipad-chassis">
      <!-- Top / Side Bezel with Camera -->
      <div class="ipad-camera-area">
        <div class="ipad-camera-lens" />
      </div>

      <!-- Screen Area -->
      <div class="ipad-screen">
        <!-- Status Bar -->
        <div v-if="showStatusBar" class="ipad-statusbar">
          <span class="statusbar-time">{{ currentTime }}</span>
          <div class="statusbar-icons">
            <span>5G</span>
            <span>📶</span>
            <span>100% 🔋</span>
          </div>
        </div>

        <!-- Inner Content Area -->
        <div class="ipad-content">
          <slot />
        </div>

        <!-- Home Bar Indicator -->
        <div v-if="showHomeBar" class="ipad-homebar-area">
          <div class="ipad-homebar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  orientation: {
    type: String,
    default: 'landscape',
    validator: v => ['landscape', 'portrait'].includes(v)
  },
  showStatusBar: {
    type: Boolean,
    default: true
  },
  showHomeBar: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'space-gray',
    validator: v => ['space-gray', 'silver', 'starlight'].includes(v)
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
.id-ipad-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  font-family: var(--font);
  user-select: none;
}

.orientation-landscape {
  max-width: 760px;
}

.orientation-portrait {
  max-width: 520px;
}

.ipad-chassis {
  position: relative;
  width: 100%;
  background: #1c1c1e;
  border-radius: 32px;
  padding: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 4px solid #3a3a3c;
  box-sizing: border-box;
}

.color-silver .ipad-chassis {
  background: #e5e5ea;
  border-color: #d1d1d6;
}

.color-starlight .ipad-chassis {
  background: #f2f2f7;
  border-color: #e5e5ea;
}

.ipad-camera-area {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.ipad-camera-lens {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #000000;
  box-shadow: inset 0 0 1px rgba(0, 113, 227, 0.9);
}

.ipad-screen {
  position: relative;
  background: var(--bg);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 380px;
  max-height: 540px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.ipad-statusbar {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text);
  z-index: 10;
}

.statusbar-icons {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.ipad-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.ipad-homebar-area {
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  flex-shrink: 0;
}

.ipad-homebar {
  width: 140px;
  height: 4px;
  border-radius: 999px;
  background: var(--text);
  opacity: 0.35;
}
</style>
