<template>
  <div :class="['id-file-upload', `variant-${variant}`, { 'is-disabled': disabled, 'is-dragging': isDragging }]">
    <!-- Drop Zone Box -->
    <div
      class="drop-zone"
      :tabindex="disabled ? -1 : 0"
      role="button"
      :aria-label="label || 'File Upload Dropzone'"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerSelect"
      @keydown.enter.prevent="triggerSelect"
      @keydown.space.prevent="triggerSelect"
    >
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        class="sr-only"
        @change="handleChange"
      />

      <div class="upload-icon-wrapper">
        <slot name="icon">
          <UploadCloud :size="variant === 'compact' ? 20 : 32" class="upload-icon-svg" />
        </slot>
      </div>

      <div class="upload-text-group">
        <span class="upload-title">{{ title || 'Click to upload or drag and drop' }}</span>
        <span class="upload-hint">{{ hint || 'SVG, PNG, JPG, PDF or GIF (max 25MB)' }}</span>
      </div>
    </div>
    
    <!-- Uploaded Files List -->
    <div v-if="files.length > 0" class="file-list">
      <div v-for="(f, idx) in files" :key="idx" class="file-item">
        <div class="file-icon">📄</div>
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
import { ref } from 'vue'
import { UploadCloud, X } from '@lucide/vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  accept: String,
  multiple: Boolean,
  title: String,
  hint: String,
  label: String,
  disabled: Boolean,
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'glass', 'compact'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'drop', 'remove'])

const fileInput = ref(null)
const isDragging = ref(false)
const files = ref(props.modelValue || [])

const triggerSelect = () => {
  if (!props.disabled && fileInput.value) {
    fileInput.value.click()
  }
}

const addFiles = (newFiles) => {
  const arr = Array.from(newFiles)
  files.value = props.multiple ? [...files.value, ...arr] : arr
  emit('update:modelValue', files.value)
  emit('change', files.value)
}

const handleChange = (e) => {
  if (e.target.files) addFiles(e.target.files)
}

const onDragOver = () => {
  if (!props.disabled) isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e) => {
  isDragging.value = false
  if (props.disabled) return
  if (e.dataTransfer?.files) {
    addFiles(e.dataTransfer.files)
    emit('drop', e.dataTransfer.files)
  }
}

const removeFile = (idx) => {
  const removed = files.value[idx]
  files.value.splice(idx, 1)
  emit('update:modelValue', files.value)
  emit('change', files.value)
  emit('remove', removed)
}

const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
</script>

<style scoped>
.id-file-upload {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: var(--font);
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

.is-dragging .drop-zone {
  border-color: var(--accent);
  background: rgba(0, 113, 227, 0.08);
  transform: scale(1.02);
}

/* Variant Glass */
.variant-glass .drop-zone {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-color: rgba(0, 113, 227, 0.25);
}
:root.dark .variant-glass .drop-zone {
  background: rgba(28, 28, 30, 0.65);
}

/* Variant Compact */
.variant-compact .drop-zone {
  padding: 16px 14px;
  gap: 8px;
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

.file-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  font-size: 18px;
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

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
