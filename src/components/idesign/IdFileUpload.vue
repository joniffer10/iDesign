<template>
  <div
    :class="[
      'id-file-upload',
      `variant-${currentVariant}`,
      `size-${currentSize}`,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-dragging': isDragging,
        'has-preview': !!previewSrc
      },
      config.mergedUi.value.base
    ]"
    :style="ui?.root"
  >
    <!-- Hidden native file input -->
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple && currentVariant !== 'avatar'"
      :disabled="disabled || loading"
      class="sr-only"
      @change="handleChange"
    />

    <!-- Optional Label -->
    <label v-if="label || $slots.label" class="upload-field-label" @click="triggerSelect">
      <slot name="label">{{ label }}</slot>
    </label>

    <!-- ──────────────────────────────────────────
         VARIANT: AVATAR UPLOADER
         ────────────────────────────────────────── -->
    <div
      v-if="currentVariant === 'avatar'"
      :class="[
        'avatar-upload-wrapper',
        `shape-${shape}`,
        `size-${currentSize}`,
        { 'is-empty': !previewSrc },
        config.mergedUi.value.avatar
      ]"
      role="button"
      :tabindex="disabled || loading ? -1 : 0"
      :aria-label="label || title || 'Upload avatar image'"
      @click="triggerSelect"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="handleDrop"
      @keydown.enter.prevent="triggerSelect"
      @keydown.space.prevent="triggerSelect"
    >
      <!-- Avatar Surface / Image Preview -->
      <div class="avatar-surface">
        <img
          v-if="previewSrc"
          :src="previewSrc"
          alt="Avatar preview"
          class="avatar-preview-img"
        />
        <div v-else class="avatar-placeholder">
          <slot name="placeholder">
            <Camera :size="iconSize" class="avatar-ph-icon" />
          </slot>
        </div>

        <!-- Hover Overlay -->
        <div class="avatar-hover-overlay">
          <Loader2 v-if="loading" :size="iconSize" class="spinner-icon" />
          <Camera v-else :size="iconSize" class="overlay-icon" />
          <span v-if="currentSize === 'lg' || currentSize === 'xl'" class="overlay-text">Change</span>
        </div>
      </div>

      <!-- Badge Icon (+ / Camera button at corner) -->
      <div class="avatar-badge" :aria-hidden="true">
        <slot name="badge">
          <Plus :size="badgeIconSize" class="badge-icon" />
        </slot>
      </div>
    </div>

    <!-- ──────────────────────────────────────────
         VARIANT: BUTTON ONLY
         ────────────────────────────────────────── -->
    <div v-else-if="currentVariant === 'button'" class="button-upload-wrapper">
      <button
        type="button"
        :class="[
          'upload-btn-trigger',
          `btn-${buttonVariant}`,
          `size-${currentSize}`,
          config.mergedUi.value.button
        ]"
        :disabled="disabled || loading"
        @click="triggerSelect"
      >
        <Loader2 v-if="loading" :size="iconSize" class="spinner-icon" />
        <slot v-else name="icon">
          <Upload :size="iconSize" class="btn-icon" />
        </slot>
        <span class="btn-label">
          <slot>{{ buttonLabel || title || 'Upload File' }}</slot>
        </span>
      </button>

      <span v-if="hint" class="upload-btn-hint">{{ hint }}</span>
    </div>

    <!-- ──────────────────────────────────────────
         VARIANT: IMAGE CARD / THUMBNAIL PREVIEW
         ────────────────────────────────────────── -->
    <div
      v-else-if="currentVariant === 'image-card'"
      :class="[
        'image-card-dropzone',
        `aspect-${aspectRatio}`,
        `size-${currentSize}`,
        config.mergedUi.value.card
      ]"
      role="button"
      :tabindex="disabled || loading ? -1 : 0"
      :aria-label="label || title || 'Upload media file'"
      @click="triggerSelect"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="handleDrop"
      @keydown.enter.prevent="triggerSelect"
      @keydown.space.prevent="triggerSelect"
    >
      <template v-if="previewSrc">
        <img :src="previewSrc" alt="Uploaded media preview" class="card-preview-img" />
        <div class="card-preview-overlay">
          <div class="overlay-actions" @click.stop>
            <button
              type="button"
              class="card-action-btn edit"
              title="Replace image"
              @click="triggerSelect"
            >
              <Upload :size="14" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              class="card-action-btn delete"
              title="Remove image"
              @click="clearAll"
            >
              <X :size="14" />
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="card-empty-state">
          <div class="upload-icon-wrapper">
            <slot name="icon">
              <Image :size="iconSize * 1.5" class="upload-icon-svg" />
            </slot>
          </div>
          <span class="upload-title">{{ title || 'Upload image or photo' }}</span>
          <span class="upload-hint">{{ hint || 'PNG, JPG, WebP up to 10MB' }}</span>
        </div>
      </template>
    </div>

    <!-- ──────────────────────────────────────────
         VARIANT: COMPACT INLINE BAR
         ────────────────────────────────────────── -->
    <div
      v-else-if="currentVariant === 'compact'"
      :class="[
        'compact-upload-bar',
        `size-${currentSize}`,
        config.mergedUi.value.compact
      ]"
      role="button"
      :tabindex="disabled || loading ? -1 : 0"
      @click="triggerSelect"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="handleDrop"
      @keydown.enter.prevent="triggerSelect"
      @keydown.space.prevent="triggerSelect"
    >
      <div class="compact-left">
        <div class="compact-icon-box">
          <UploadCloud :size="iconSize" />
        </div>
        <div class="compact-text">
          <span class="compact-title">{{ title || 'Choose a file or drag & drop' }}</span>
          <span v-if="hint" class="compact-hint">{{ hint }}</span>
        </div>
      </div>
      <button
        type="button"
        class="compact-browse-btn"
        tabindex="-1"
        :disabled="disabled || loading"
      >
        Browse
      </button>
    </div>

    <!-- ──────────────────────────────────────────
         DEFAULT / GLASS DROP ZONE
         ────────────────────────────────────────── -->
    <div
      v-else
      :class="[
        'drop-zone',
        `variant-${currentVariant}`,
        config.mergedUi.value.dropzone
      ]"
      :tabindex="disabled || loading ? -1 : 0"
      role="button"
      :aria-label="label || title || 'File Upload Dropzone'"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerSelect"
      @keydown.enter.prevent="triggerSelect"
      @keydown.space.prevent="triggerSelect"
    >
      <div class="upload-icon-wrapper">
        <slot name="icon">
          <UploadCloud :size="iconSize * 1.5" class="upload-icon-svg" />
        </slot>
      </div>

      <div class="upload-text-group">
        <span class="upload-title">{{ title || 'Click to upload or drag and drop' }}</span>
        <span class="upload-hint">{{ hint || 'SVG, PNG, JPG, PDF or GIF (max 25MB)' }}</span>
      </div>
    </div>

    <!-- Uploaded Files List (for dropzone, compact, and button) -->
    <div
      v-if="showFileList && files.length > 0 && currentVariant !== 'avatar' && currentVariant !== 'image-card'"
      :class="['file-list', config.mergedUi.value.fileList]"
    >
      <div
        v-for="(f, idx) in files"
        :key="idx"
        :class="['file-item', config.mergedUi.value.fileItem]"
      >
        <div class="file-icon">
          <FileText :size="16" class="file-icon-svg" />
        </div>
        <div class="file-info">
          <span class="file-name">{{ f.name }}</span>
          <span class="file-size">{{ formatSize(f.size) }}</span>
        </div>
        <button
          type="button"
          class="file-remove"
          :aria-label="`Remove ${f.name}`"
          @click.stop="removeFile(idx)"
        >
          <X :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  UploadCloud,
  Upload,
  Camera,
  Image,
  Plus,
  X,
  FileText,
  Trash2,
  Loader2
} from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: {
    type: [Array, Object, String],
    default: () => []
  },
  src: {
    type: String,
    default: ''
  },
  imageSrc: {
    type: String,
    default: ''
  },
  preview: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: undefined
  },
  multiple: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  buttonLabel: {
    type: String,
    default: ''
  },
  buttonVariant: {
    type: String,
    default: 'primary'
  },
  shape: {
    type: String,
    default: 'circle',
    validator: v => ['circle', 'squircle', 'rounded'].includes(v)
  },
  aspectRatio: {
    type: String,
    default: '16-9'
  },
  size: {
    type: String,
    default: undefined
  },
  variant: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  showFileList: {
    type: Boolean,
    default: true
  },
  maxSize: {
    type: Number,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:src', 'change', 'drop', 'remove', 'clear'])

const config = useIdesignConfig('FileUpload', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw)
})

const fileInput = ref(null)
const isDragging = ref(false)
const localPreview = ref('')

const files = ref(
  Array.isArray(props.modelValue)
    ? props.modelValue
    : props.modelValue
    ? [props.modelValue]
    : []
)

watch(
  () => props.modelValue,
  (val) => {
    if (Array.isArray(val)) {
      files.value = val
    } else if (val) {
      files.value = [val]
    } else {
      files.value = []
    }
  }
)

const previewSrc = computed(() => {
  if (localPreview.value) return localPreview.value
  if (props.imageSrc) return props.imageSrc
  if (props.src) return props.src
  if (props.preview) return props.preview
  if (typeof props.modelValue === 'string') return props.modelValue
  return ''
})

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 14 : sz === 'sm' ? 16 : sz === 'lg' ? 22 : sz === 'xl' ? 26 : 18
})

const badgeIconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 10 : sz === 'sm' ? 12 : sz === 'lg' ? 16 : sz === 'xl' ? 18 : 13
})

const triggerSelect = () => {
  if (!props.disabled && !props.loading && fileInput.value) {
    fileInput.value.click()
  }
}

const addFiles = (newFiles) => {
  const arr = Array.from(newFiles)
  if (arr.length === 0) return

  // Handle local image preview generation
  const firstFile = arr[0]
  if (firstFile && firstFile.type && firstFile.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      localPreview.value = e.target.result
      emit('update:src', e.target.result)
    }
    reader.readAsDataURL(firstFile)
  }

  files.value = props.multiple && currentVariant.value !== 'avatar' ? [...files.value, ...arr] : arr
  emit('update:modelValue', files.value)
  emit('change', files.value)
}

const handleChange = (e) => {
  if (e.target.files) addFiles(e.target.files)
}

const onDragOver = () => {
  if (!props.disabled && !props.loading) isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e) => {
  isDragging.value = false
  if (props.disabled || props.loading) return
  if (e.dataTransfer?.files) {
    addFiles(e.dataTransfer.files)
    emit('drop', e.dataTransfer.files)
  }
}

const removeFile = (idx) => {
  const removed = files.value[idx]
  files.value.splice(idx, 1)
  if (files.value.length === 0) {
    localPreview.value = ''
  }
  emit('update:modelValue', files.value)
  emit('change', files.value)
  emit('remove', removed)
}

const clearAll = () => {
  files.value = []
  localPreview.value = ''
  if (fileInput.value) fileInput.value.value = ''
  emit('update:modelValue', [])
  emit('update:src', '')
  emit('clear')
}

const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

defineExpose({
  triggerSelect,
  clearAll,
  files
})
</script>

<style scoped>
.id-file-upload {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: var(--font);
  box-sizing: border-box;
}

.upload-field-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  letter-spacing: -0.01em;
  user-select: none;
  cursor: pointer;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* ──────────────────────────────────────────────────────────
   1. AVATAR UPLOAD VARIANT
   ────────────────────────────────────────────────────────── */
.avatar-upload-wrapper {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  outline: none;
  user-select: none;
  width: fit-content;
}

.avatar-surface {
  position: relative;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
  transition: all 0.2s var(--ease-spring);
  display: flex;
  align-items: center;
  justify-content: center;
}

.shape-circle .avatar-surface { border-radius: 9999px; }
.shape-squircle .avatar-surface { border-radius: 28%; }
.shape-rounded .avatar-surface { border-radius: var(--r-card, 16px); }

/* Avatar Sizes */
.avatar-upload-wrapper.size-xs .avatar-surface { width: 40px; height: 40px; }
.avatar-upload-wrapper.size-sm .avatar-surface { width: 56px; height: 56px; }
.avatar-upload-wrapper.size-md .avatar-surface { width: 76px; height: 76px; }
.avatar-upload-wrapper.size-lg .avatar-surface { width: 96px; height: 96px; }
.avatar-upload-wrapper.size-xl .avatar-surface { width: 120px; height: 120px; }

.avatar-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-placeholder {
  color: var(--text-3);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hover Camera Overlay */
.avatar-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s var(--ease-out-quart);
}

.avatar-upload-wrapper:hover .avatar-hover-overlay,
.avatar-upload-wrapper:focus-visible .avatar-hover-overlay {
  opacity: 1;
}

.overlay-text {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

/* Bottom-Right Badge (+ / Camera) */
.avatar-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--accent);
  color: #ffffff;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid var(--surface);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  transition: transform 0.15s var(--ease-spring), background 0.15s;
  pointer-events: none;
}

.avatar-upload-wrapper.size-xs .avatar-badge { width: 16px; height: 16px; border-width: 1.5px; }
.avatar-upload-wrapper.size-sm .avatar-badge { width: 20px; height: 20px; border-width: 2px; }
.avatar-upload-wrapper.size-md .avatar-badge { width: 26px; height: 26px; }
.avatar-upload-wrapper.size-lg .avatar-badge { width: 32px; height: 32px; }
.avatar-upload-wrapper.size-xl .avatar-badge { width: 38px; height: 38px; border-width: 3px; }

.avatar-upload-wrapper:hover .avatar-badge {
  transform: scale(1.1);
  background: var(--accent-hover, #0062c4);
}

/* ──────────────────────────────────────────────────────────
   2. BUTTON ONLY VARIANT
   ────────────────────────────────────────────────────────── */
.button-upload-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  width: fit-content;
}

.upload-btn-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font);
  font-weight: 600;
  border-radius: var(--r-pill);
  cursor: pointer;
  outline: none;
  transition: all 0.15s var(--ease-spring);
  user-select: none;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.upload-btn-trigger.size-xs { height: 28px; padding: 0 10px; font-size: 12px; }
.upload-btn-trigger.size-sm { height: 34px; padding: 0 14px; font-size: 13px; }
.upload-btn-trigger.size-md { height: 42px; padding: 0 18px; font-size: 14px; }
.upload-btn-trigger.size-lg { height: 48px; padding: 0 22px; font-size: 15px; }
.upload-btn-trigger.size-xl { height: 54px; padding: 0 26px; font-size: 16px; }

.upload-btn-trigger.btn-primary {
  background: var(--accent);
  color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.upload-btn-trigger.btn-primary:hover:not(:disabled) {
  background: var(--accent-hover, #0062c4);
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.28);
}

.upload-btn-trigger.btn-secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--hairline);
}
.upload-btn-trigger.btn-secondary:hover:not(:disabled) {
  background: var(--hover);
  border-color: var(--faint);
}

.upload-btn-trigger.btn-glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  color: var(--text);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.upload-btn-trigger:active:not(:disabled) {
  transform: scale(0.96);
}

.upload-btn-hint {
  font-size: 12px;
  color: var(--text-3);
}

/* ──────────────────────────────────────────────────────────
   3. IMAGE CARD / THUMBNAIL VARIANT
   ────────────────────────────────────────────────────────── */
.image-card-dropzone {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--surface);
  border: 1.5px dashed var(--hairline);
  border-radius: var(--r-card, 16px);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s var(--ease-spring);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-card-dropzone.aspect-16-9 { aspect-ratio: 16 / 9; }
.image-card-dropzone.aspect-1-1 { aspect-ratio: 1 / 1; max-width: 240px; }
.image-card-dropzone.aspect-4-3 { aspect-ratio: 4 / 3; }

.image-card-dropzone:hover {
  border-color: var(--accent);
  background: rgba(0, 113, 227, 0.02);
}

.card-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.image-card-dropzone:hover .card-preview-overlay {
  opacity: 1;
}

.overlay-actions {
  display: flex;
  gap: 8px;
}

.card-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--r-pill);
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.card-action-btn.edit {
  background: #ffffff;
  color: var(--text);
}
.card-action-btn.delete {
  background: rgba(255, 59, 48, 0.9);
  color: #ffffff;
  padding: 6px 8px;
}
.card-action-btn:hover {
  transform: scale(1.05);
}

.card-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 24px 16px;
  text-align: center;
}

/* ──────────────────────────────────────────────────────────
   4. COMPACT INLINE BAR VARIANT
   ────────────────────────────────────────────────────────── */
.compact-upload-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-card, 14px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s var(--ease-spring);
  gap: 12px;
}

.compact-upload-bar:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.10);
}

.compact-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.compact-icon-box {
  color: var(--accent);
  display: flex;
  align-items: center;
}

.compact-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.compact-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.compact-hint {
  font-size: 11.5px;
  color: var(--text-3);
}

.compact-browse-btn {
  padding: 5px 12px;
  border-radius: var(--r-pill);
  border: 1px solid var(--hairline);
  background: var(--hover);
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
}

/* ──────────────────────────────────────────────────────────
   5. DEFAULT & GLASS DROP ZONE
   ────────────────────────────────────────────────────────── */
.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px 20px;
  border: 2px dashed var(--faint);
  border-radius: var(--r-panel);
  background: var(--surface);
  cursor: pointer;
  transition: all 0.2s var(--ease-spring);
  text-align: center;
  outline: none;
  box-shadow: var(--sh-card);
}

.drop-zone:hover {
  border-color: var(--accent);
  background: rgba(0, 113, 227, 0.03);
  transform: translateY(-1px);
}

.drop-zone:focus-visible {
  box-shadow: var(--focus-ring);
  border-color: var(--accent);
}

.is-dragging .drop-zone,
.is-dragging.avatar-upload-wrapper,
.is-dragging.image-card-dropzone,
.is-dragging.compact-upload-bar {
  border-color: var(--accent) !important;
  background: rgba(0, 113, 227, 0.08) !important;
  transform: scale(1.02);
}

/* Variant Glass */
.variant-glass.drop-zone,
.variant-glass .drop-zone {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-color: rgba(0, 113, 227, 0.25);
}
:root.dark .variant-glass.drop-zone,
:root.dark .variant-glass .drop-zone {
  background: rgba(28, 28, 30, 0.65);
}

.upload-icon-wrapper {
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-text-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.upload-title {
  font-size: 14px;
  font-weight: 650;
  color: var(--text);
}

.upload-hint {
  font-size: 12px;
  color: var(--text-3);
}

/* ──────────────────────────────────────────────────────────
   UPLOADED FILES LIST
   ────────────────────────────────────────────────────────── */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-thumb);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.file-icon {
  color: var(--accent);
  display: flex;
  align-items: center;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.file-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 11.5px;
  color: var(--text-3);
  font-family: var(--mono);
}

.file-remove {
  background: transparent;
  border: none;
  color: var(--text-3);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.file-remove:hover {
  background: rgba(255, 59, 48, 0.12);
  color: var(--danger);
}

.spinner-icon {
  animation: id-spin 0.8s linear infinite;
}

@keyframes id-spin {
  to { transform: rotate(360deg); }
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
