<template>
  <div :class="['id-avatar-wrap', `size-${size}`, { 'has-status': !!status }]" role="img" :aria-label="alt || name || 'Avatar'">
    <div :class="['id-avatar', `shape-${shape}`, { 'is-framed': framed }]">
      <slot>
        <img v-if="src && !imgError" :src="src" :alt="alt || name" class="avatar-img" @error="imgError = true" />
        
        <slot v-else name="icon">
          <span v-if="typeof icon === 'string' && icon.length <= 4" class="avatar-emoji">{{ icon }}</span>
          <component :is="icon" v-else-if="icon" class="avatar-icon-svg" />
          <span v-else class="avatar-initials">{{ initials }}</span>
        </slot>
      </slot>
    </div>

    <!-- Status indicator badge dot placed outside overflow:hidden clip path -->
    <span v-if="status" :class="['avatar-status', `status-${status}`, `shape-${shape}`]" title="Status" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  src: String,
  name: { type: String, default: '' },
  icon: [String, Object, Function],
  alt: String,
  size: { type: String, default: 'md', validator: v => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v) },
  shape: { type: String, default: 'circle', validator: v => ['circle', 'squircle'].includes(v) },
  framed: Boolean,
  status: { type: String, default: null, validator: v => [null, 'online', 'offline', 'busy'].includes(v) }
})

const imgError = ref(false)

const initials = computed(() => {
  if (!props.name) return '?'
  const parts = props.name.trim().split(/\s+/)
  return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase()
})
</script>

<style scoped>
.id-avatar-wrap {
  position: relative; display: inline-flex; flex-shrink: 0; overflow: visible;
}

.id-avatar {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  background: var(--surface-2, rgba(0, 0, 0, 0.06)); color: var(--text); font-weight: 650;
  overflow: hidden; transition: all 0.2s var(--ease-out-quart);
}

:root.dark .id-avatar {
  background: rgba(255, 255, 255, 0.12);
}

.avatar-img {
  width: 100%; height: 100%; object-fit: cover;
}

.avatar-emoji {
  font-size: 1.25em; line-height: 1;
}

.avatar-icon-svg {
  width: 55%; height: 55%; stroke-width: 2; color: var(--text);
}

.avatar-initials {
  font-size: 0.9em; font-weight: 650; text-transform: uppercase;
}

.shape-circle { border-radius: 50%; }
.shape-squircle { border-radius: 24%; }

.is-framed {
  box-shadow: 0 0 0 6px var(--hover), 0 0 0 7px var(--hairline);
}
:root.dark .is-framed {
  box-shadow: 0 0 0 7px #2c2c2e, 0 0 0 8px rgba(255, 255, 255, 0.12);
}

.size-xs { width: 28px; height: 28px; font-size: 11px; }
.size-sm { width: 36px; height: 36px; font-size: 13px; }
.size-md { width: 44px; height: 44px; font-size: 15px; }
.size-lg { width: 56px; height: 56px; font-size: 19px; }
.size-xl { width: 72px; height: 72px; font-size: 24px; }

/* Status Dot Position & Ring Outset */
.avatar-status {
  position: absolute; right: -1px; bottom: -1px;
  border: 2px solid var(--surface, #ffffff); z-index: 5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
:root.dark .avatar-status { border-color: #1c1c1e; }

.shape-circle.avatar-status { border-radius: 50%; }
.shape-squircle.avatar-status { border-radius: 50%; }

.size-xs .avatar-status { width: 8px; height: 8px; }
.size-sm .avatar-status { width: 10px; height: 10px; }
.size-md .avatar-status { width: 12px; height: 12px; }
.size-lg .avatar-status { width: 14px; height: 14px; }
.size-xl .avatar-status { width: 18px; height: 18px; }

.status-online { background: #30d158; }
.status-busy { background: #ff453a; }
.status-offline { background: #8e8e93; }
</style>
