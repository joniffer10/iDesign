<template>
  <div class="id-carousel-wrap">
    <div ref="trackRef" class="carousel-track" @scroll="handleScroll">
      <slot />
    </div>

    <!-- Navigation Controls & Dots -->
    <div v-if="showControls" class="carousel-controls">
      <button type="button" class="nav-btn prev" aria-label="Previous slide" @click="scrollPrev">‹</button>

      <div v-if="showDots && slideCount > 0" class="carousel-dots">
        <span
          v-for="idx in slideCount"
          :key="idx"
          :class="['dot', { active: activeIndex === idx - 1 }]"
          @click="scrollToIndex(idx - 1)"
        />
      </div>

      <button type="button" class="nav-btn next" aria-label="Next slide" @click="scrollNext">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  showControls: { type: Boolean, default: true },
  showDots: { type: Boolean, default: true }
})

const trackRef = ref(null)
const activeIndex = ref(0)
const slideCount = ref(0)

const updateCount = () => {
  if (trackRef.value) {
    slideCount.value = trackRef.value.children.length
  }
}

const handleScroll = () => {
  if (!trackRef.value || slideCount.value === 0) return
  const track = trackRef.value
  const slideWidth = track.scrollWidth / slideCount.value
  activeIndex.value = Math.round(track.scrollLeft / slideWidth)
}

const scrollToIndex = (index) => {
  if (!trackRef.value || slideCount.value === 0) return
  const track = trackRef.value
  const slideWidth = track.scrollWidth / slideCount.value
  track.scrollTo({ left: slideWidth * index, behavior: 'smooth' })
}

const scrollNext = () => {
  scrollToIndex(Math.min(activeIndex.value + 1, slideCount.value - 1))
}

const scrollPrev = () => {
  scrollToIndex(Math.max(activeIndex.value - 1, 0))
}

onMounted(() => {
  updateCount()
  window.addEventListener('resize', updateCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCount)
})
</script>

<style scoped>
.id-carousel-wrap {
  width: 100%; display: flex; flex-direction: column; gap: 14px; position: relative;
}
.carousel-track {
  display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 4px;
}
.carousel-track::-webkit-scrollbar { display: none; }
.carousel-track > :deep(*) {
  scroll-snap-align: center; flex-shrink: 0; min-width: clamp(260px, 80vw, 380px);
}
.carousel-controls {
  display: flex; align-items: center; justify-content: center; gap: 16px;
}
.nav-btn {
  width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--hairline);
  background: var(--surface); color: var(--text); font-size: 18px; display: flex;
  align-items: center; justify-content: center; cursor: pointer; transition: all .15s;
  box-shadow: var(--sh-card);
}
.nav-btn:hover { background: var(--hover); }
.carousel-dots { display: flex; align-items: center; gap: 6px; }
.dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--text-4);
  cursor: pointer; transition: all .2s var(--ease-out-quart);
}
.dot.active { background: var(--accent); width: 20px; border-radius: 999px; }
</style>
