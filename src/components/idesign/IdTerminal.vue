<template>
  <div
    :class="[
      'id-terminal',
      `variant-${currentVariant}`,
      `size-${currentSize}`,
      `radius-${currentRadius}`,
      `theme-${currentTheme}`,
      `color-${currentColor}`,
      {
        'has-header': showHeader && currentVariant !== 'minimal',
        'is-interactive': interactive,
        'is-loading': loading || isRunning,
        'is-compact': currentSize === 'xs' || currentSize === 'sm',
        'has-line-numbers': showLineNumbers
      },
      config.mergedUi.value.base
    ]"
    role="region"
    :aria-label="title || 'Terminal Window'"
  >
    <!-- Terminal Window Header Chrome -->
    <header
      v-if="showHeader && currentVariant !== 'minimal'"
      :class="['terminal-header', config.mergedUi.value.header]"
    >
      <slot name="header">
        <!-- macOS Window Traffic Light Controls -->
        <div
          v-if="showControls && controls !== 'none'"
          :class="['terminal-controls', `controls-${controls}`, config.mergedUi.value.controls]"
        >
          <slot name="controls">
            <button
              type="button"
              class="terminal-dot dot-close"
              aria-label="Close window"
              @click="$emit('close')"
            >
              <span class="dot-glyph">×</span>
            </button>
            <button
              type="button"
              class="terminal-dot dot-minimize"
              aria-label="Minimize window"
              @click="$emit('minimize')"
            >
              <span class="dot-glyph">−</span>
            </button>
            <button
              type="button"
              class="terminal-dot dot-maximize"
              aria-label="Maximize window"
              @click="$emit('maximize')"
            >
              <span class="dot-glyph">+</span>
            </button>
          </slot>
        </div>

        <!-- Window Title & Subtitle/Path -->
        <div :class="['terminal-title-box', config.mergedUi.value.title]">
          <slot name="title">
            <div class="terminal-title-inner">
              <span v-if="statusIcon" class="terminal-status-icon" :title="statusText || status">
                {{ statusIcon }}
              </span>
              <span class="terminal-title-text">{{ title }}</span>
              <span
                v-if="subtitle || directory || path"
                :class="['terminal-subtitle-badge', config.mergedUi.value.subtitle]"
              >
                {{ subtitle || directory || path }}
              </span>
            </div>
          </slot>
        </div>

        <!-- Action Buttons (Copy, Clear, Custom Actions) -->
        <div :class="['terminal-actions', config.mergedUi.value.actions]">
          <slot name="actions">
            <!-- Clear Button -->
            <button
              v-if="showClear"
              type="button"
              class="terminal-action-btn btn-clear"
              title="Clear terminal output"
              aria-label="Clear terminal"
              @click="clear"
            >
              <Trash2 class="action-icon" :size="iconSize" />
            </button>

            <!-- Copy Button -->
            <button
              v-if="showCopy"
              type="button"
              :class="['terminal-action-btn btn-copy', { 'is-copied': isCopied }]"
              :title="isCopied ? 'Copied to clipboard' : 'Copy terminal contents'"
              aria-label="Copy terminal text"
              @click="handleCopy"
            >
              <Check v-if="isCopied" class="action-icon action-check" :size="iconSize" />
              <Copy v-else class="action-icon" :size="iconSize" />
              <span v-if="showCopyLabel" class="action-label">
                {{ isCopied ? 'Copied' : 'Copy' }}
              </span>
            </button>
          </slot>
        </div>
      </slot>
    </header>

    <!-- Terminal Content Scroll Area -->
    <div
      ref="bodyRef"
      :class="['terminal-body', config.mergedUi.value.body, config.mergedUi.value.scrollArea]"
      :style="bodyStyle"
    >
      <!-- Optional Line-by-Line Structured Output -->
      <div class="terminal-lines">
        <template v-if="parsedLines.length > 0">
          <div
            v-for="(item, idx) in parsedLines"
            :key="idx"
            :class="[
              'terminal-line',
              `line-type-${item.type}`,
              { 'line-has-gutter': showLineNumbers },
              config.mergedUi.value.line
            ]"
          >
            <!-- Line Number Gutter -->
            <span
              v-if="showLineNumbers"
              :class="['line-number', config.mergedUi.value.lineNumber]"
              aria-hidden="true"
            >
              {{ idx + 1 }}
            </span>

            <!-- Line Content Body -->
            <div class="line-content">
              <slot name="line" :line="item" :index="idx" :type="item.type">
                <!-- Command Line (Prompt + Command) -->
                <template v-if="item.type === 'command' || item.type === 'input'">
                  <span :class="['line-prompt', config.mergedUi.value.prompt]">
                    <slot name="prompt" :prompt="item.prompt || prompt">
                      {{ item.prompt || prompt }}
                    </slot>
                  </span>
                  <span
                    :class="['line-cmd-text', config.mergedUi.value.command]"
                    v-html="highlightCommandTokens(item.text)"
                  />
                </template>

                <!-- Output Line with Tone Status -->
                <template v-else-if="item.type === 'success' || item.type === 'error' || item.type === 'warning' || item.type === 'info'">
                  <span :class="['line-status-badge', `status-${item.type}`]">
                    {{ item.prefix || getStatusPrefix(item.type) }}
                  </span>
                  <span
                    :class="['line-output-text', config.mergedUi.value.output]"
                    v-html="renderAnsiAndTokens(item.text)"
                  />
                </template>

                <!-- Comment / Meta Line -->
                <template v-else-if="item.type === 'comment'">
                  <span class="line-comment-text">{{ item.text }}</span>
                </template>

                <!-- Standard Output / Text Line -->
                <template v-else>
                  <span
                    :class="['line-output-text', config.mergedUi.value.output]"
                    v-html="renderAnsiAndTokens(item.text)"
                  />
                </template>
              </slot>
            </div>
          </div>
        </template>

        <!-- Slotted Default Content Fallback when no parsed lines -->
        <div
          v-else-if="$slots.default"
          :class="['terminal-raw-slot', config.mergedUi.value.output]"
        >
          <slot />
        </div>
      </div>

      <!-- Loading / Running Animation Banner -->
      <div
        v-if="loading || isRunning"
        class="terminal-running-row"
        role="status"
        aria-live="polite"
      >
        <Loader2 class="terminal-spinner" :size="iconSize" />
        <span class="terminal-running-text">
          {{ statusText || (loading ? 'Running command...' : 'Executing process...') }}
        </span>
      </div>

      <!-- Interactive Prompt Input Line -->
      <form
        v-if="interactive"
        :class="['terminal-interactive-line', config.mergedUi.value.input]"
        @submit.prevent="handleCommandSubmit"
      >
        <span
          v-if="showLineNumbers"
          :class="['line-number', config.mergedUi.value.lineNumber]"
          aria-hidden="true"
        >
          {{ parsedLines.length + 1 }}
        </span>
        <div class="interactive-input-wrapper">
          <span :class="['line-prompt interactive-prompt', config.mergedUi.value.prompt]">
            <slot name="prompt" :prompt="prompt">{{ prompt }}</slot>
          </span>
          <input
            ref="inputRef"
            v-model="currentInput"
            type="text"
            class="interactive-cmd-input"
            :placeholder="inputPlaceholder"
            :disabled="loading || isRunning"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            @keydown.up.prevent="navigateHistory('up')"
            @keydown.down.prevent="navigateHistory('down')"
          />
          <span
            v-if="showCursor && cursorShape !== 'none'"
            :class="['terminal-cursor', `cursor-${cursorShape}`, config.mergedUi.value.cursor]"
            aria-hidden="true"
          >
            <slot name="cursor">
              <span v-if="cursorShape === 'block'" class="cursor-char">█</span>
              <span v-else-if="cursorShape === 'line'" class="cursor-char">|</span>
              <span v-else class="cursor-char">_</span>
            </slot>
          </span>
        </div>
      </form>
    </div>

    <!-- Optional Footer / Status Bar -->
    <footer
      v-if="$slots.footer || showFooter || status"
      :class="['terminal-footer', config.mergedUi.value.footer]"
    >
      <slot name="footer">
        <div class="terminal-footer-status">
          <span :class="['footer-status-dot', `status-${status}`]" />
          <span class="footer-status-text">
            {{ statusText || (status === 'running' ? 'Active' : status === 'success' ? 'Completed' : status === 'error' ? 'Failed' : 'Ready') }}
          </span>
        </div>
        <div class="terminal-footer-meta">
          <span v-if="parsedLines.length > 0" class="footer-line-count">
            {{ parsedLines.length }} {{ parsedLines.length === 1 ? 'line' : 'lines' }}
          </span>
        </div>
      </slot>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { Check, Copy, Trash2, Loader2 } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { useClipboard } from '../../composables/useClipboard'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  // Content models
  modelValue: {
    type: [Array, String],
    default: undefined
  },
  lines: {
    type: [Array, String],
    default: undefined
  },
  commands: {
    type: [Array, String],
    default: undefined
  },

  // Terminal Window Configuration
  title: {
    type: String,
    default: 'Terminal'
  },
  subtitle: {
    type: String,
    default: ''
  },
  directory: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  prompt: {
    type: String,
    default: '$'
  },

  // Appearance & Styling
  variant: {
    type: String,
    default: undefined,
    validator: v => !v || ['default', 'minimal', 'macos', 'glass'].includes(v)
  },
  size: {
    type: String,
    default: undefined,
    validator: v => !v || ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  radius: {
    type: String,
    default: undefined
  },
  theme: {
    type: String,
    default: 'dark',
    validator: v => ['dark', 'light', 'auto', 'system'].includes(v)
  },
  color: {
    type: String,
    default: undefined,
    validator: v => !v || ['default', 'primary', 'accent', 'success', 'warning', 'danger', 'neutral'].includes(v)
  },

  // Window Controls & Elements
  controls: {
    type: [String, Boolean],
    default: 'macos'
  },
  showControls: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  showLineNumbers: {
    type: Boolean,
    default: false
  },
  showCopy: {
    type: Boolean,
    default: true
  },
  showCopyLabel: {
    type: Boolean,
    default: false
  },
  showClear: {
    type: Boolean,
    default: false
  },

  // Dynamic States
  loading: {
    type: Boolean,
    default: false
  },
  running: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'idle',
    validator: v => ['idle', 'running', 'success', 'error', 'warning', 'info'].includes(v)
  },
  statusText: {
    type: String,
    default: ''
  },

  // Interactive CLI Input
  interactive: {
    type: Boolean,
    default: false
  },
  inputPlaceholder: {
    type: String,
    default: 'Type a command and press Enter...'
  },
  cursor: {
    type: [String, Boolean],
    default: 'block'
  },

  // Dimensions & Behavior
  height: {
    type: [String, Number],
    default: ''
  },
  maxHeight: {
    type: [String, Number],
    default: '420px'
  },
  autoScroll: {
    type: Boolean,
    default: true
  },

  // UI Override Object
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'update:modelValue',
  'submit',
  'command',
  'copy',
  'clear',
  'close',
  'minimize',
  'maximize'
])

// ── 1. Configuration & Theming ──
const config = useIdesignConfig('Terminal', props)
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw)
})
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'lg')
const currentColor = computed(() => config.resolvedColor.value || 'default')
const currentTheme = computed(() => props.theme || 'dark')
const isRunning = computed(() => props.running || props.status === 'running')

// ── 2. Local State & History ──
const bodyRef = ref(null)
const inputRef = ref(null)
const currentInput = ref('')
const history = ref([])
const historyIndex = ref(-1)
const localLines = ref([])

const { copy, copied: isCopied } = useClipboard()

// Icon sizing based on component size tier
const iconSize = computed(() => {
  switch (currentSize.value) {
    case 'xs': return 11
    case 'sm': return 12
    case 'lg': return 14
    case 'xl': return 16
    case 'md':
    default: return 13
  }
})

// Cursor configuration
const showCursor = computed(() => props.cursor !== false && props.cursor !== 'none')
const cursorShape = computed(() => {
  if (typeof props.cursor === 'string') return props.cursor
  return 'block'
})

// Header status icon indicator
const statusIcon = computed(() => {
  if (isRunning.value) return '●'
  if (props.status === 'success') return '✓'
  if (props.status === 'error') return '✗'
  if (props.status === 'warning') return '⚠'
  return ''
})

// Status prefix for line types
function getStatusPrefix(type) {
  switch (type) {
    case 'success': return '✓'
    case 'error': return '✗'
    case 'warning': return '⚠'
    case 'info': return 'ℹ'
    default: return ''
  }
}

// ── 3. Content Normalization & Parsing ──
const rawContentSource = computed(() => {
  if (props.modelValue !== undefined) return props.modelValue
  if (props.lines !== undefined) return props.lines
  if (props.commands !== undefined) return props.commands
  return localLines.value
})

const parsedLines = computed(() => {
  const source = rawContentSource.value

  if (Array.isArray(source)) {
    return source.map(item => {
      if (typeof item === 'string') {
        return parseStringLine(item)
      }
      if (typeof item === 'object' && item !== null) {
        return {
          type: item.type || detectLineType(item.text || item.command || ''),
          text: item.text || item.command || item.output || '',
          prompt: item.prompt,
          prefix: item.prefix,
          timestamp: item.timestamp
        }
      }
      return { type: 'text', text: String(item) }
    })
  }

  if (typeof source === 'string' && source.trim().length > 0) {
    const rawList = source.split('\n')
    return rawList.map(l => parseStringLine(l))
  }

  return []
})

function detectLineType(text) {
  const trimmed = text.trim()
  if (trimmed.startsWith('$') || trimmed.startsWith('>') || trimmed.startsWith('➜') || trimmed.startsWith('~') || trimmed.startsWith('%')) {
    return 'command'
  }
  if (trimmed.startsWith('✓') || trimmed.startsWith('✔') || trimmed.startsWith('[SUCCESS]') || trimmed.startsWith('PASS') || trimmed.toLowerCase().startsWith('success:')) {
    return 'success'
  }
  if (trimmed.startsWith('✗') || trimmed.startsWith('✘') || trimmed.startsWith('✖') || trimmed.startsWith('[ERROR]') || trimmed.startsWith('FAIL') || trimmed.toLowerCase().startsWith('error:')) {
    return 'error'
  }
  if (trimmed.startsWith('⚠') || trimmed.startsWith('[WARN]') || trimmed.toLowerCase().startsWith('warning:')) {
    return 'warning'
  }
  if (trimmed.startsWith('ℹ') || trimmed.startsWith('[INFO]') || trimmed.toLowerCase().startsWith('info:')) {
    return 'info'
  }
  if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
    return 'comment'
  }
  return 'text'
}

function parseStringLine(rawLine) {
  const trimmed = rawLine.trim()

  // 1. Command Line ($ npm install / > git status)
  const promptMatch = rawLine.match(/^(\s*)([$>➜~%]|bash\$|zsh\$)\s+(.*)$/)
  if (promptMatch) {
    return {
      type: 'command',
      prompt: promptMatch[2],
      text: promptMatch[3]
    }
  }

  // 2. Success Status Line
  if (trimmed.startsWith('✓') || trimmed.startsWith('✔')) {
    return {
      type: 'success',
      prefix: '✓',
      text: trimmed.replace(/^[✓✔]\s*/, '')
    }
  }
  if (trimmed.startsWith('[SUCCESS]') || trimmed.startsWith('PASS') || trimmed.toLowerCase().startsWith('success:')) {
    return {
      type: 'success',
      prefix: '✓',
      text: trimmed.replace(/^(\[SUCCESS\]|PASS|success:)\s*/i, '')
    }
  }

  // 3. Error Status Line
  if (trimmed.startsWith('✗') || trimmed.startsWith('✘') || trimmed.startsWith('✖')) {
    return {
      type: 'error',
      prefix: '✗',
      text: trimmed.replace(/^[✗✘✖]\s*/, '')
    }
  }
  if (trimmed.startsWith('[ERROR]') || trimmed.startsWith('FAIL') || trimmed.toLowerCase().startsWith('error:')) {
    return {
      type: 'error',
      prefix: '✗',
      text: trimmed.replace(/^(\[ERROR\]|FAIL|error:)\s*/i, '')
    }
  }

  // 4. Warning Status Line
  if (trimmed.startsWith('⚠') || trimmed.startsWith('[WARN]') || trimmed.toLowerCase().startsWith('warning:')) {
    return {
      type: 'warning',
      prefix: '⚠',
      text: trimmed.replace(/^(⚠|\[WARN\]|warning:)\s*/i, '')
    }
  }

  // 5. Info Status Line
  if (trimmed.startsWith('ℹ') || trimmed.startsWith('[INFO]') || trimmed.toLowerCase().startsWith('info:')) {
    return {
      type: 'info',
      prefix: 'ℹ',
      text: trimmed.replace(/^(ℹ|\[INFO\]|info:)\s*/i, '')
    }
  }

  // 6. Comment Line
  if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
    return {
      type: 'comment',
      text: rawLine
    }
  }

  // 7. General Output
  return {
    type: 'text',
    text: rawLine
  }
}

// ── 4. Syntax & ANSI Token Highlighting ──
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function highlightCommandTokens(rawText) {
  if (!rawText) return ''
  const escaped = escapeHtml(rawText)

  // Split into tokens: first word (binary), flags (--flag, -v), strings ('...'), paths/urls
  const parts = escaped.split(' ')
  if (parts.length === 0) return escaped

  return parts.map((token, i) => {
    // First token is executable
    if (i === 0) {
      return `<span class="token-binary">${token}</span>`
    }
    // Subcommands (add, install, run, build, commit, push, checkout)
    if (i === 1 && /^(add|install|i|run|build|dev|start|test|commit|push|pull|checkout|switch|clone|init|create|serve|publish)$/i.test(token)) {
      return `<span class="token-subcommand">${token}</span>`
    }
    // Flags (-f, --save-dev, --filter, etc.)
    if (token.startsWith('-')) {
      return `<span class="token-flag">${token}</span>`
    }
    // Package names or scopes (@idesign/vue, lodash, vite)
    if (token.startsWith('@') || /^[a-z0-9_-]+@[a-z0-9^~.-]+$/i.test(token)) {
      return `<span class="token-package">${token}</span>`
    }
    // URLs
    if (token.startsWith('http://') || token.startsWith('https://')) {
      return `<span class="token-url">${token}</span>`
    }
    // File paths or extensions (./src/index.js, package.json)
    if (token.includes('/') || token.includes('\\') || /\.(js|ts|vue|json|css|html|md|lock)$/i.test(token)) {
      return `<span class="token-path">${token}</span>`
    }
    // Strings in quotes
    if ((token.startsWith('&quot;') && token.endsWith('&quot;')) || (token.startsWith('&#039;') && token.endsWith('&#039;'))) {
      return `<span class="token-string">${token}</span>`
    }
    return token
  }).join(' ')
}

function renderAnsiAndTokens(text) {
  if (!text) return ''
  let content = escapeHtml(text)

  // Translate basic ANSI codes if present
  content = content
    .replace(/\u001b\[31m(.*?)\u001b\[0m/g, '<span class="ansi-red">$1</span>')
    .replace(/\u001b\[32m(.*?)\u001b\[0m/g, '<span class="ansi-green">$1</span>')
    .replace(/\u001b\[33m(.*?)\u001b\[0m/g, '<span class="ansi-yellow">$1</span>')
    .replace(/\u001b\[34m(.*?)\u001b\[0m/g, '<span class="ansi-blue">$1</span>')
    .replace(/\u001b\[35m(.*?)\u001b\[0m/g, '<span class="ansi-magenta">$1</span>')
    .replace(/\u001b\[36m(.*?)\u001b\[0m/g, '<span class="ansi-cyan">$1</span>')
    .replace(/\u001b\[1m(.*?)\u001b\[0m/g, '<strong>$1</strong>')
    .replace(/\u001b\[[0-9;]*m/g, '')

  // Highlight inline status tags [OK], [DONE], [INFO], [WARN], [FAIL]
  content = content
    .replace(/(\[(?:OK|DONE|SUCCESS|READY)\])/g, '<span class="ansi-green font-semibold">$1</span>')
    .replace(/(\[(?:FAIL|FAILED|ERROR|ERR)\])/g, '<span class="ansi-red font-semibold">$1</span>')
    .replace(/(\[(?:WARN|WARNING)\])/g, '<span class="ansi-yellow font-semibold">$1</span>')
    .replace(/(\[(?:INFO|NOTE|DEBUG)\])/g, '<span class="ansi-cyan font-semibold">$1</span>')
    .replace(/(\b(?:https?:\/\/[^\s]+))/g, '<span class="token-url">$1</span>')

  return content
}

// ── 5. Body Style & Auto-Scrolling ──
const bodyStyle = computed(() => {
  const styles = {}
  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.maxHeight) {
    styles.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }
  return styles
})

const scrollToBottom = () => {
  if (!props.autoScroll || !bodyRef.value) return
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    }
  })
}

watch(() => parsedLines.value.length, () => {
  scrollToBottom()
})

// ── 6. Copy & Clear Actions ──
const getAllTextContent = () => {
  if (parsedLines.value.length > 0) {
    return parsedLines.value.map(l => {
      if (l.type === 'command' || l.type === 'input') {
        return `${l.prompt || props.prompt} ${l.text}`
      }
      return l.text
    }).join('\n')
  }
  return bodyRef.value ? bodyRef.value.innerText : ''
}

const handleCopy = async () => {
  const text = getAllTextContent()
  const success = await copy(text)
  if (success) {
    emit('copy', text)
  }
}

const clear = () => {
  localLines.value = []
  emit('update:modelValue', [])
  emit('clear')
}

// ── 7. Interactive Command Input Handling ──
const handleCommandSubmit = () => {
  const cmd = currentInput.value.trim()
  if (!cmd) return

  // Add to history
  history.value.push(cmd)
  historyIndex.value = history.value.length

  // Add line to local display
  const newLine = {
    type: 'command',
    prompt: props.prompt,
    text: cmd
  }
  localLines.value.push(newLine)

  emit('submit', cmd)
  emit('command', cmd)

  currentInput.value = ''
  scrollToBottom()
}

const navigateHistory = (direction) => {
  if (history.value.length === 0) return

  if (direction === 'up') {
    if (historyIndex.value > 0) {
      historyIndex.value--
      currentInput.value = history.value[historyIndex.value] || ''
    } else if (historyIndex.value === 0) {
      currentInput.value = history.value[0] || ''
    }
  } else if (direction === 'down') {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++
      currentInput.value = history.value[historyIndex.value] || ''
    } else {
      historyIndex.value = history.value.length
      currentInput.value = ''
    }
  }
}

const focus = () => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const addLine = (line) => {
  if (typeof line === 'string') {
    localLines.value.push(parseStringLine(line))
  } else {
    localLines.value.push(line)
  }
  scrollToBottom()
}

// Initialize local lines if provided via prop
onMounted(() => {
  if (Array.isArray(props.modelValue)) {
    localLines.value = [...props.modelValue]
  } else if (Array.isArray(props.lines)) {
    localLines.value = [...props.lines]
  }
  scrollToBottom()
})

// Expose public API
defineExpose({
  copy: handleCopy,
  clear,
  focus,
  addLine,
  scrollToBottom,
  parsedLines
})
</script>

<style scoped>
/* ════════════════════════════════════════════════════════════════
   IdTerminal — Liquid Glass Monospace Terminal Shell
   Apple-inspired, restrained, calm & ultra-clean typography.
   ════════════════════════════════════════════════════════════════ */

.id-terminal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--mono, 'SF Mono', 'JetBrains Mono', ui-monospace, Menlo, Monaco, monospace);
  font-size: 13px;
  line-height: 1.6;
  letter-spacing: -0.01em;
  overflow: hidden;
  transition: box-shadow 0.2s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)),
              border-color 0.2s ease,
              background 0.2s ease;
  user-select: text;
}

/* ── Radius Named Tiers ── */
.radius-none { border-radius: 0px; }
.radius-xs   { border-radius: var(--radius-xs, 4px); }
.radius-sm   { border-radius: var(--radius-sm, 6px); }
.radius-md   { border-radius: var(--radius-md, 10px); }
.radius-lg   { border-radius: var(--radius-lg, 16px); }
.radius-xl   { border-radius: var(--radius-xl, 22px); }
.radius-hero { border-radius: var(--radius-hero, 26px); }
.radius-full { border-radius: 24px; }

/* ── Theme Palettes: Dark (Default) & Light ── */
.theme-dark {
  --term-bg: #121214;
  --term-header-bg: #1a1a1d;
  --term-border: rgba(255, 255, 255, 0.08);
  --term-hairline: rgba(255, 255, 255, 0.06);
  --term-text: #f5f5f7;
  --term-text-muted: #86868b;
  --term-text-faint: #48484a;
  --term-prompt: #0a84ff;
  --term-binary: #5e5ce6;
  --term-subcommand: #30d158;
  --term-flag: #ff9f0a;
  --term-path: #64d2ff;
  --term-string: #ffd60a;
  --term-comment: #6e6e73;
  --term-hover: rgba(255, 255, 255, 0.05);
  --term-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 16px 40px rgba(0, 0, 0, 0.35);
  background: var(--term-bg);
  color: var(--term-text);
  border: 1px solid var(--term-border);
  box-shadow: var(--term-shadow);
}

.theme-light {
  --term-bg: #ffffff;
  --term-header-bg: #f5f5f7;
  --term-border: rgba(0, 0, 0, 0.08);
  --term-hairline: rgba(0, 0, 0, 0.06);
  --term-text: #1d1d1f;
  --term-text-muted: #6e6e73;
  --term-text-faint: #aeaeb2;
  --term-prompt: #0071e3;
  --term-binary: #5e5ce6;
  --term-subcommand: #28a745;
  --term-flag: #ff6b00;
  --term-path: #007aff;
  --term-string: #b25000;
  --term-comment: #86868b;
  --term-hover: rgba(0, 0, 0, 0.03);
  --term-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 14px 40px rgba(0, 0, 0, 0.06);
  background: var(--term-bg);
  color: var(--term-text);
  border: 1px solid var(--term-border);
  box-shadow: var(--term-shadow);
}

/* System/Auto theme detection */
.theme-auto,
.theme-system {
  --term-bg: #ffffff;
  --term-header-bg: #f5f5f7;
  --term-border: rgba(0, 0, 0, 0.08);
  --term-hairline: rgba(0, 0, 0, 0.06);
  --term-text: #1d1d1f;
  --term-text-muted: #6e6e73;
  --term-text-faint: #aeaeb2;
  --term-prompt: var(--accent, #0071e3);
  --term-binary: #5e5ce6;
  --term-subcommand: #28a745;
  --term-flag: #ff6b00;
  --term-path: #007aff;
  --term-string: #b25000;
  --term-comment: #86868b;
  --term-hover: rgba(0, 0, 0, 0.03);
  --term-shadow: var(--sh-panel, 0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05));
  background: var(--term-bg);
  color: var(--term-text);
  border: 1px solid var(--term-border);
  box-shadow: var(--term-shadow);
}

:root.dark .theme-auto,
:root.dark .theme-system {
  --term-bg: #121214;
  --term-header-bg: #1a1a1d;
  --term-border: rgba(255, 255, 255, 0.08);
  --term-hairline: rgba(255, 255, 255, 0.06);
  --term-text: #f5f5f7;
  --term-text-muted: #86868b;
  --term-text-faint: #48484a;
  --term-prompt: #0a84ff;
  --term-binary: #5e5ce6;
  --term-subcommand: #30d158;
  --term-flag: #ff9f0a;
  --term-path: #64d2ff;
  --term-string: #ffd60a;
  --term-comment: #6e6e73;
  --term-hover: rgba(255, 255, 255, 0.05);
  --term-shadow: var(--sh-panel, 0 1px 3px rgba(0,0,0,0.3), 0 14px 40px rgba(0,0,0,0.35));
}

/* ── Color Accent Modifiers ── */
.color-primary .interactive-prompt,
.color-primary .line-prompt { color: var(--accent, #0071e3); }
.color-accent .interactive-prompt,
.color-accent .line-prompt { color: #5e5ce6; }
.color-success .interactive-prompt,
.color-success .line-prompt { color: var(--success, #30d158); }
.color-warning .interactive-prompt,
.color-warning .line-prompt { color: var(--warning, #ff9f0a); }
.color-danger .interactive-prompt,
.color-danger .line-prompt { color: var(--danger, #ff3b30); }
.color-neutral .interactive-prompt,
.color-neutral .line-prompt { color: var(--term-text-muted); }

/* ── Variants ── */
/* 1. Default Variant: Solid surface, soft 2-layer shadow */
.variant-default {
  /* Inherits solid surface variables */
}

/* 2. Minimal Variant: Borderless, no chrome, clean monospace block */
.variant-minimal {
  border: 1px solid var(--term-hairline);
  box-shadow: none;
}
.variant-minimal .terminal-body {
  padding-top: 14px;
}

/* 3. macOS Variant: Authentic window chrome with metallic header */
.variant-macos {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), 0 24px 60px rgba(0, 0, 0, 0.4);
}
.variant-macos .terminal-header {
  border-bottom: 1px solid var(--term-border);
  background: var(--term-header-bg);
}

/* 4. Glass Variant: Overlapping Liquid Glass Recipe */
.variant-glass {
  background: rgba(18, 18, 20, 0.78);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.variant-glass.theme-light {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}
.variant-glass .terminal-header {
  background: rgba(255, 255, 255, 0.03);
}

/* ── Size Scale Tiers ── */
.size-xs {
  font-size: 11px;
  line-height: 1.45;
}
.size-xs .terminal-header {
  height: 28px;
  padding: 0 10px;
}
.size-xs .terminal-body {
  padding: 10px 12px;
  gap: 3px;
}

.size-sm {
  font-size: 12px;
  line-height: 1.5;
}
.size-sm .terminal-header {
  height: 34px;
  padding: 0 12px;
}
.size-sm .terminal-body {
  padding: 12px 14px;
  gap: 4px;
}

.size-md {
  font-size: 13px;
  line-height: 1.6;
}
.size-md .terminal-header {
  height: 38px;
  padding: 0 14px;
}
.size-md .terminal-body {
  padding: 14px 16px;
  gap: 4px;
}

.size-lg {
  font-size: 14px;
  line-height: 1.65;
}
.size-lg .terminal-header {
  height: 44px;
  padding: 0 16px;
}
.size-lg .terminal-body {
  padding: 16px 20px;
  gap: 6px;
}

.size-xl {
  font-size: 15.5px;
  line-height: 1.7;
}
.size-xl .terminal-header {
  height: 50px;
  padding: 0 20px;
}
.size-xl .terminal-body {
  padding: 20px 24px;
  gap: 8px;
}

/* ── Header Chrome ── */
.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--term-hairline);
  background: var(--term-header-bg);
  user-select: none;
  flex-shrink: 0;
  box-sizing: border-box;
}

/* Traffic Light Dots */
.terminal-controls {
  display: flex;
  align-items: center;
  gap: 7px;
}
.terminal-dot {
  position: relative;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s ease, opacity 0.12s ease;
  outline: none;
}
.size-xs .terminal-dot { width: 9px; height: 9px; }
.size-lg .terminal-dot { width: 12px; height: 12px; }
.size-xl .terminal-dot { width: 13px; height: 13px; }

.dot-close {
  background: #ff5f56;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.dot-minimize {
  background: #ffbd2e;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.dot-maximize {
  background: #27c93f;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.dot-glyph {
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
  color: rgba(0, 0, 0, 0.55);
  opacity: 0;
  transition: opacity 0.15s ease;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
.terminal-controls:hover .dot-glyph {
  opacity: 1;
}

/* Title Box */
.terminal-title-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;
  text-align: center;
  padding: 0 8px;
}
.terminal-title-inner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--term-text-muted);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.size-xs .terminal-title-inner { font-size: 11px; }
.size-lg .terminal-title-inner { font-size: 13px; }
.size-xl .terminal-title-inner { font-size: 14px; }

.terminal-title-text {
  font-weight: 600;
  color: var(--term-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.terminal-status-icon {
  font-size: 11px;
  color: var(--term-prompt);
}
.terminal-subtitle-badge {
  font-size: 10.5px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--term-hover);
  color: var(--term-text-muted);
  border: 1px solid var(--term-hairline);
}

/* Header Actions */
.terminal-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.terminal-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--term-text-muted);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
  font-family: inherit;
  font-size: 11px;
}
.terminal-action-btn:hover {
  background: var(--term-hover);
  color: var(--term-text);
}
.terminal-action-btn:active {
  transform: scale(0.96);
}
.btn-copy.is-copied {
  color: var(--term-subcommand);
}
.action-check {
  color: var(--term-subcommand);
}

/* ── Body Scroll Area ── */
.terminal-body {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: var(--term-hairline) transparent;
}
.terminal-body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.terminal-body::-webkit-scrollbar-thumb {
  background: var(--term-hairline);
  border-radius: 3px;
}
.terminal-body::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-lines {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
}

/* Line Rows */
.terminal-line {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  word-break: break-word;
  white-space: pre-wrap;
  position: relative;
}

/* Line Number Gutter */
.line-number {
  flex-shrink: 0;
  width: 24px;
  font-variant-numeric: tabular-nums;
  font-size: 11px;
  color: var(--term-text-faint);
  user-select: none;
  text-align: right;
  padding-right: 6px;
  border-right: 1px solid var(--term-hairline);
  margin-right: 2px;
}

.line-content {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

/* Line Elements */
.line-prompt {
  color: var(--term-prompt);
  font-weight: 700;
  user-select: none;
  flex-shrink: 0;
}
.line-cmd-text {
  color: var(--term-text);
  font-weight: 500;
}
.line-output-text {
  color: var(--term-text);
}
.line-comment-text {
  color: var(--term-comment);
  font-style: italic;
}

/* Status Badges */
.line-status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
  font-size: 12px;
}
.status-success { color: var(--term-subcommand); }
.status-error { color: #ff3b30; }
.status-warning { color: var(--term-flag); }
.status-info { color: #0a84ff; }

/* ── Syntax Token Classes ── */
:deep(.token-binary) {
  color: var(--term-binary);
  font-weight: 600;
}
:deep(.token-subcommand) {
  color: var(--term-subcommand);
  font-weight: 500;
}
:deep(.token-flag) {
  color: var(--term-flag);
}
:deep(.token-path) {
  color: var(--term-path);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.15s;
}
:deep(.token-path:hover) {
  text-decoration-color: currentColor;
}
:deep(.token-url) {
  color: var(--term-path);
  text-decoration: underline;
  text-underline-offset: 2px;
}
:deep(.token-package) {
  color: #ff375f;
}
:deep(.token-string) {
  color: var(--term-string);
}

/* ANSI Color Classes */
:deep(.ansi-red) { color: #ff3b30; }
:deep(.ansi-green) { color: #30d158; }
:deep(.ansi-yellow) { color: #ff9f0a; }
:deep(.ansi-blue) { color: #0a84ff; }
:deep(.ansi-magenta) { color: #bf5af2; }
:deep(.ansi-cyan) { color: #64d2ff; }

/* ── Running / Loading State ── */
.terminal-running-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  color: var(--term-text-muted);
  font-size: 12px;
}
.terminal-spinner {
  animation: spin 1s linear infinite;
  color: var(--term-prompt);
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ── Interactive Command Input ── */
.terminal-interactive-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}
.interactive-input-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  position: relative;
}
.interactive-prompt {
  font-weight: 700;
  user-select: none;
}
.interactive-cmd-input {
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  color: var(--term-text);
  flex: 1;
  padding: 0;
  margin: 0;
  caret-color: transparent; /* custom cursor rendered */
}
.interactive-cmd-input::placeholder {
  color: var(--term-text-faint);
  opacity: 0.7;
}

/* Blinking Cursor */
.terminal-cursor {
  display: inline-block;
  user-select: none;
  color: var(--term-prompt);
  animation: terminal-cursor-blink 1.05s steps(2, start) infinite;
  margin-left: -2px;
}
.cursor-char {
  display: inline-block;
  line-height: 1;
  font-size: inherit;
}
@keyframes terminal-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ── Footer / Status Bar ── */
.terminal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  padding: 0 14px;
  border-top: 1px solid var(--term-hairline);
  background: var(--term-header-bg);
  font-size: 11px;
  color: var(--term-text-muted);
  user-select: none;
}
.terminal-footer-status {
  display: flex;
  align-items: center;
  gap: 6px;
}
.footer-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--term-text-faint);
}
.footer-status-dot.status-running {
  background: #0a84ff;
  box-shadow: 0 0 8px rgba(10, 132, 255, 0.6);
  animation: pulse-dot 1.5s ease infinite;
}
.footer-status-dot.status-success { background: #30d158; }
.footer-status-dot.status-error { background: #ff3b30; }
.footer-status-dot.status-warning { background: #ff9f0a; }

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

/* ── Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  .terminal-cursor {
    animation: none;
    opacity: 1;
  }
  .terminal-spinner {
    animation: none;
  }
  .footer-status-dot.status-running {
    animation: none;
  }
}
</style>
