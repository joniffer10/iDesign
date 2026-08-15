<template>
  <div class="id-file-upload">
    <div
      :class="['drop-zone', { 'is-dragging': isDragging, 'is-disabled': disabled }]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerSelect"
    >
      <input ref="fileInput" type="file" :accept="accept" :multiple="multiple" class="sr-only" @change="handleChange" />
      <div class="upload-icon">
        <UploadCloud :size="28" />
      </div>
      <div class="upload-text">
        <span class="upload-title">Click to upload or drag & drop</span>
        <span class="upload-hint">{{ hint || 'SVG, PNG, JPG or GIF (max 10MB)' }}</span>
      </div>
    </div>
    
    <div v-if="files.length > 0" class="file-list">
      <div v-for="(f, idx) in files" :key="idx" class="file-item">
        <div class="file-info">
          <span class="file-name">{{ f.name }}</span>
          <span class="file-size">{{ formatSize(f.size) }}</span>
        </div>
        <button type="button" class="file-remove" aria-label="Remove file" @click.stop="removeFile(idx)">
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
  accept: String,
  multiple: Boolean,
  hint: String,
  disabled: Boolean
})

const emit = defineEmits(['change'])

const fileInput = ref(null)
const isDragging = ref(false)
const files = ref([])

const triggerSelect = () => {
  if (!props.disabled && fileInput.value) fileInput.value.click()
}

const addFiles = (newFiles) => {
  const arr = Array.from(newFiles)
  files.value = props.multiple ? [...files.value, ...arr] : arr
  emit('change', files.value)
}

const handleChange = (e) => {
  if (e.target.files) addFiles(e.target.files)
}

const handleDrop = (e) => {
  isDragging.value = false
  if (props.disabled) return
  if (e.dataTransfer.files) addFiles(e.dataTransfer.files)
}

const removeFile = (idx) => {
  files.value.splice(idx, 1)
  emit('change', files.value)
}

const formatSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
</script>

<style scoped>
.id-file-upload { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
.drop-zone {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  padding: 28px 20px; border: 2px dashed var(--faint); border-radius: var(--r-panel);
  background: var(--surface); cursor: pointer; transition: all .2s var(--ease-out-quart); text-align: center;
}
.drop-zone:hover, .drop-zone.is-dragging { border-color: var(--accent); background: rgba(0,113,227,0.03); }
.upload-icon { color: var(--accent); }
.upload-title { font-size: 14px; font-weight: 600; color: var(--text); display: block; }
.upload-hint { font-size: 12.5px; color: var(--text-3); display: block; margin-top: 2px; }
.is-disabled { opacity: .5; cursor: not-allowed; }
.file-list { display: flex; flex-direction: column; gap: 6px; }
.file-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; font-size: 13px; }
.file-info { display: flex; gap: 8px; align-items: center; }
.file-name { font-weight: 550; color: var(--text); }
.file-size { color: var(--text-3); font-family: var(--mono); font-size: 11.5px; }
.file-remove { background: transparent; border: none; font-size: 18px; color: var(--text-3); cursor: pointer; padding: 0 4px; }
</style>
