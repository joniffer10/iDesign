<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="[
      'id-card',
      `variant-${currentVariant}`,
      `pad-${currentPadding}`,
      `aspect-${imageAspect}`,
      `radius-${currentRadius}`,
      { 'is-interactive': href || interactive, 'has-image': currentVariant === 'image-top' || currentVariant === 'image-bg' },
      config.mergedUi.value.base
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Background Image Scrim (for image-bg variant) -->
    <div v-if="currentVariant === 'image-bg'" :class="['card-bg-image-wrapper', config.mergedUi.value.media]">
      <slot name="image">
        <img :src="image || DEFAULT_DEMO_IMG" :alt="imageAlt || title || 'Card background'" class="card-bg-img" />
      </slot>
      <div class="card-bg-overlay"></div>
    </div>

    <!-- Top Banner Media/Image (only for image-top variant) -->
    <div v-else-if="currentVariant === 'image-top'" :class="['card-media', config.mergedUi.value.media]">
      <slot name="image">
        <slot name="media">
          <img :src="image || DEFAULT_DEMO_IMG" :alt="imageAlt || title || 'Card banner'" class="card-banner-img" />
        </slot>
      </slot>
    </div>
    
    <div v-if="title || subtitle || tag || $slots.header" :class="['card-header', config.mergedUi.value.header]">
      <slot name="header">
        <div v-if="tag" class="card-tag">{{ tag }}</div>
        <h3 v-if="title" :class="['card-title', config.mergedUi.value.title]">{{ title }}</h3>
        <p v-if="subtitle" :class="['card-subtitle', config.mergedUi.value.subtitle]">{{ subtitle }}</p>
      </slot>
    </div>

    <div v-if="description || $slots.default" :class="['card-body', config.mergedUi.value.body || config.mergedUi.value.content]">
      <slot>{{ description }}</slot>
    </div>

    <div v-if="($slots.footer || $slots.actions) && showActions" :class="['card-footer', config.mergedUi.value.footer || config.mergedUi.value.actions]">
      <slot name="actions">
        <slot name="footer" />
      </slot>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const DEFAULT_DEMO_IMG = 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80'

const props = defineProps({
  title: String,
  subtitle: String,
  description: String,
  tag: String,
  image: String,
  imageAlt: String,
  imageAspect: {
    type: String,
    default: '16-9',
    validator: v => ['16-9', '4-3', '1-1', '21-9', 'auto'].includes(v)
  },
  href: String,
  variant: {
    type: String,
    default: undefined
  },
  padding: {
    type: String,
    default: undefined
  },
  size: {
    type: String,
    default: undefined
  },
  interactive: Boolean,
  showActions: {
    type: Boolean,
    default: true
  },
  radius: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['click'])

const config = useIdesignConfig('Card', props)
const currentPadding = computed(() => props.padding || props.size || config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'lg')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'no-border': 'borderless',
    'no-dividers': 'seamless'
  })
})
</script>

<style scoped>
.id-card {
  position: relative;
  background: var(--surface); border-radius: var(--r-card); box-shadow: var(--sh-card);
  border: 1px solid var(--hairline); color: var(--text); text-decoration: none;
  display: flex; flex-direction: column; overflow: hidden;
  transition: transform 0.25s var(--ease-out-quart), box-shadow 0.25s var(--ease-out-quart), border-color 0.25s;
}

/* Radius Classes */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip) !important; }
.radius-md { border-radius: var(--r-thumb) !important; }
.radius-lg { border-radius: var(--r-card) !important; }
.radius-full { border-radius: var(--r-pill) !important; }

.pad-xs { padding: 8px; }
.pad-sm { padding: 14px; }
.pad-md { padding: 20px; }
.pad-lg { padding: 28px; }
.pad-xl { padding: 36px; }

.variant-framed {
  background: var(--hover); border: 1px solid var(--hairline);
  border-radius: 28px; padding: 14px; box-shadow: var(--sh-card);
}
:root.dark .variant-framed {
  background: #2c2c2e; border-color: rgba(255, 255, 255, 0.12);
}

.variant-framed .card-media {
  margin: 0 0 14px 0 !important; border-radius: 18px; overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
}
.variant-framed .card-banner-img {
  border-radius: 18px;
}
.variant-glass {
  background: rgba(255, 255, 255, 0.75); backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.75);
}

.variant-hero {
  border: var(--variant-hero-border); background: var(--variant-hero-bg);
  box-shadow: var(--variant-hero-shadow);
}

.variant-solid {
  background: var(--variant-solid-bg); color: var(--variant-solid-color); border: var(--variant-solid-border);
}
.variant-solid .card-title,
.variant-solid .card-subtitle,
.variant-solid .card-body { color: rgba(255, 255, 255, 0.95); }
.variant-solid .card-tag { color: rgba(255, 255, 255, 0.7); }
.variant-solid .card-footer { border-top-color: rgba(255, 255, 255, 0.2); }

.variant-subtle {
  background: var(--variant-subtle-bg); border: var(--variant-subtle-border);
  box-shadow: none;
}

.variant-borderless {
  border: none !important; box-shadow: none !important; background: var(--surface);
}

.variant-seamless {
  background: var(--surface); border: 1px solid var(--hairline); box-shadow: var(--sh-card);
}
.variant-seamless .card-footer { border-top: none; }

/* Image Top & Banner styling */
.variant-image-top .card-media,
.has-image .card-media {
  margin: -20px -20px 16px -20px; overflow: hidden; position: relative;
}
.pad-sm.variant-image-top .card-media,
.pad-sm.has-image .card-media { margin: -14px -14px 12px -14px; }
.pad-md.variant-image-top .card-media,
.pad-md.has-image .card-media { margin: -20px -20px 16px -20px; }
.pad-lg.variant-image-top .card-media,
.pad-lg.has-image .card-media { margin: -28px -28px 20px -28px; }

.card-banner-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.35s var(--ease-out-quart);
}
.aspect-16-9 .card-banner-img { aspect-ratio: 16 / 9; }
.aspect-4-3 .card-banner-img { aspect-ratio: 4 / 3; }
.aspect-1-1 .card-banner-img { aspect-ratio: 1 / 1; }
.aspect-21-9 .card-banner-img { aspect-ratio: 21 / 9; }

/* Image Background Variant */
.variant-image-bg {
  color: #ffffff; min-height: 260px; justify-content: flex-end;
}
.variant-image-bg .card-bg-image-wrapper {
  position: absolute; inset: 0; z-index: 0; overflow: hidden;
}
.variant-image-bg .card-bg-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s var(--ease-out-quart);
}
.variant-image-bg .card-bg-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%);
}
.variant-image-bg .card-header,
.variant-image-bg .card-body,
.variant-image-bg .card-footer {
  position: relative; z-index: 1;
}
.variant-image-bg .card-title { color: #ffffff; }
.variant-image-bg .card-subtitle { color: rgba(255, 255, 255, 0.8); }
.variant-image-bg .card-body { color: rgba(255, 255, 255, 0.9); }
.variant-image-bg .card-footer { border-top-color: rgba(255, 255, 255, 0.15); }

/* Interactive Hover States */
.id-card.is-interactive:hover {
  transform: translateY(-4px); box-shadow: var(--sh-lift); cursor: pointer;
  border-color: var(--accent);
}
.id-card.is-interactive:active {
  transform: translateY(-1px) scale(0.985);
  transition: transform 0.12s var(--ease-spring);
}
.id-card.is-interactive:hover .card-banner-img,
.id-card.is-interactive:hover .card-bg-img {
  transform: scale(1.04);
}

.card-tag { font-size: 11.5px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.variant-image-bg .card-tag { color: #60a5fa; }
.card-title { font-size: 18px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); }
.card-subtitle { font-size: 13px; color: var(--text-2); margin-top: 2px; }
.card-body { font-size: 14px; color: var(--text-body); line-height: 1.6; flex: 1; margin-top: 8px; }
.card-footer { margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--hairline); display: flex; align-items: center; justify-content: space-between; }
</style>
