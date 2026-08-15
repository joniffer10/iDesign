<template>
  <div
    :class="[
      'id-image-frame',
      `shape-${shape}`,
      `bezel-${bezelSize}`,
      `aspect-${aspectRatio.replace('/', '-')}`,
      { 'is-interactive': interactive }
    ]"
    :style="maxWidth ? { maxWidth } : {}"
  >
    <div class="frame-bezel">
      <slot>
        <img v-if="src" :src="src" :alt="alt || 'Framed image'" class="frame-img" />
      </slot>
    </div>

    <div v-if="caption || $slots.caption" class="frame-caption">
      <slot name="caption">{{ caption }}</slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: String,
  alt: String,
  aspectRatio: {
    type: String,
    default: '1-1',
    validator: v => ['1-1', '16-9', '4-3', '3-4', '21-9', 'auto'].includes(v)
  },
  shape: {
    type: String,
    default: 'squircle',
    validator: v => ['squircle', 'circle'].includes(v)
  },
  bezelSize: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  maxWidth: String,
  caption: String,
  interactive: Boolean
})
</script>

<style scoped>
.id-image-frame {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}

.frame-bezel {
  width: 100%;
  background: var(--hover);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s var(--ease-out-quart), box-shadow 0.3s var(--ease-out-quart), border-color 0.3s;
}

:root.dark .frame-bezel {
  background: #2c2c2e;
  border-color: rgba(255, 255, 255, 0.12);
}

/* Bezel Padding Sizes */
.bezel-sm .frame-bezel { padding: 8px; border-radius: 20px; }
.bezel-md .frame-bezel { padding: 14px; border-radius: 28px; }
.bezel-lg .frame-bezel { padding: 20px; border-radius: 36px; }

/* Shapes */
.shape-squircle.bezel-sm .frame-bezel { border-radius: 20px; }
.shape-squircle.bezel-md .frame-bezel { border-radius: 28px; }
.shape-squircle.bezel-lg .frame-bezel { border-radius: 36px; }

.shape-circle .frame-bezel { border-radius: 50%; }

/* Inner Image */
.frame-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s var(--ease-out-quart);
}

.shape-squircle.bezel-sm .frame-img { border-radius: 12px; }
.shape-squircle.bezel-md .frame-img { border-radius: 18px; }
.shape-squircle.bezel-lg .frame-img { border-radius: 22px; }

.shape-circle .frame-img { border-radius: 50%; }

/* Aspect Ratios */
.aspect-1-1 .frame-img { aspect-ratio: 1 / 1; }
.aspect-16-9 .frame-img { aspect-ratio: 16 / 9; }
.aspect-4-3 .frame-img { aspect-ratio: 4 / 3; }
.aspect-3-4 .frame-img { aspect-ratio: 3 / 4; }
.aspect-21-9 .frame-img { aspect-ratio: 21 / 9; }

/* Interactive Hover States */
.id-image-frame.is-interactive:hover .frame-bezel {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: var(--sh-lift);
  cursor: pointer;
}

.id-image-frame.is-interactive:hover .frame-img {
  transform: scale(1.03);
}

/* Caption */
.frame-caption {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  text-align: center;
}
</style>
