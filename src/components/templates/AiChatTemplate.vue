<template>
  <div :class="['template-chat-page', `variant-${variant}`]">
    <!-- Sidebar / Conversation History -->
    <aside v-if="variant === 'full' && showSidebar" :class="['chat-sidebar', { 'is-open': sidebarOpen }]">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <Sparkles :size="20" class="sparkle-icon" />
          <span>Idesign AI</span>
        </div>
        <IdButton size="sm" variant="glass" :icon-left="Plus" @click="startNewChat">
          New Chat
        </IdButton>
      </div>

      <div class="chat-history-list">
        <div class="history-group">
          <span class="history-label">Today</span>
          <button
            v-for="chat in todayChats"
            :key="chat.id"
            :class="['history-item', { active: activeChatId === chat.id }]"
            @click="activeChatId = chat.id"
          >
            <MessageSquare :size="15" />
            <span class="chat-title">{{ chat.title }}</span>
          </button>
        </div>

        <div class="history-group">
          <span class="history-label">Yesterday</span>
          <button
            v-for="chat in pastChats"
            :key="chat.id"
            :class="['history-item', { active: activeChatId === chat.id }]"
            @click="activeChatId = chat.id"
          >
            <MessageSquare :size="15" />
            <span class="chat-title">{{ chat.title }}</span>
          </button>
        </div>
      </div>

      <div class="sidebar-user-footer">
        <IdAvatar name="Jane Doe" status="online" size="sm" shape="squircle" />
        <div class="user-meta">
          <span class="user-name">Jane Doe</span>
          <span class="user-plan">Pro Member</span>
        </div>
        <Settings :size="16" class="settings-icon" />
      </div>
    </aside>

    <!-- Main Chat Window Area -->
    <main class="chat-main">
      <!-- Top Chat Header Bar -->
      <header class="chat-header">
        <div class="header-left">
          <button type="button" class="mobile-sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
            <Menu :size="18" />
          </button>
          <div class="model-picker">
            <span class="model-name">Aura Vision 3.5</span>
            <IdTag variant="accent" size="sm">SUPERCHARGED</IdTag>
          </div>
        </div>

        <div class="header-right">
          <IdLiveDot>ONLINE</IdLiveDot>
          <IdButton size="sm" variant="ghost" :icon-left="Share2">Share</IdButton>
        </div>
      </header>

      <!-- Message List Viewport -->
      <div ref="scrollViewport" class="chat-messages-viewport">
        <div v-for="(msg, idx) in currentMessages" :key="idx" :class="['message-row', msg.role]">
          <div class="avatar-cell">
            <IdAvatar
              v-if="msg.role === 'user'"
              name="Jane Doe"
              size="sm"
              shape="squircle"
            />
            <div v-else class="ai-avatar-box">
              <Sparkles :size="16" />
            </div>
          </div>

          <div class="bubble-cell">
            <div class="message-sender-name">
              {{ msg.role === 'user' ? 'Jane' : 'Aura AI' }}
              <span class="message-time">{{ msg.time }}</span>
            </div>
            <div class="message-bubble">
              <p>{{ msg.text }}</p>
              
              <!-- Code Snippet Block inside AI response -->
              <div v-if="msg.code" class="chat-code-block">
                <div class="code-header">
                  <span>{{ msg.codeLang || 'vue' }}</span>
                  <button type="button" class="copy-code-btn" @click="copyCode(msg.code)">
                    <Copy :size="13" /> Copy
                  </button>
                </div>
                <pre><code>{{ msg.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="message-row assistant typing">
          <div class="avatar-cell">
            <div class="ai-avatar-box">
              <Sparkles :size="16" />
            </div>
          </div>
          <div class="bubble-cell">
            <div class="message-bubble typing-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Liquid Input Console -->
      <footer class="chat-input-footer">
        <div class="chat-input-bar">
          <button type="button" class="input-tool-btn" title="Attach file">
            <Paperclip :size="18" />
          </button>

          <input
            v-model="inputQuery"
            type="text"
            placeholder="Ask Aura AI anything or paste Vue 3 code..."
            class="chat-text-input"
            @keydown.enter.prevent="sendMessage"
          />

          <button type="button" class="input-tool-btn" title="Voice input">
            <Mic :size="18" />
          </button>

          <button
            type="button"
            :disabled="!inputQuery.trim()"
            class="send-btn"
            aria-label="Send message"
            @click="sendMessage"
          >
            <Send :size="16" />
          </button>
        </div>
        <span class="disclaimer-text">Aura AI can generate design tokens and Vue 3 components. Check accuracy.</span>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { Sparkles, Plus, MessageSquare, Settings, Menu, Share2, Copy, Paperclip, Mic, Send } from '@lucide/vue'
import IdButton from '../idesign/IdButton.vue'
import IdTag from '../idesign/IdTag.vue'
import IdAvatar from '../idesign/IdAvatar.vue'
import IdLiveDot from '../idesign/IdLiveDot.vue'
import { useToast } from '../../composables/useToast'
defineProps({
  variant: {
    type: String,
    default: 'full', // 'full' | 'standalone' | 'widget'
    validator: v => ['full', 'standalone', 'widget'].includes(v)
  },
  showSidebar: {
    type: Boolean,
    default: true
  }
})

const toast = useToast()

const sidebarOpen = ref(false)
const activeChatId = ref('1')
const inputQuery = ref('')
const isTyping = ref(false)
const scrollViewport = ref(null)

const todayChats = ref([
  { id: '1', title: 'Refactoring Vue 3 Apple Navigation' },
  { id: '2', title: 'Design System Token Automation' }
])

const pastChats = ref([
  { id: '3', title: 'Liquid Glass Blur CSS Optimization' },
  { id: '4', title: 'Tailwind vs Vanilla CSS Benchmark' }
])

const currentMessages = ref([
  {
    role: 'assistant',
    text: 'Hello Jane! I am Aura AI, your spatial computing assistant. How can I assist your Vue 3 component architecture today?',
    time: '10:42 AM'
  },
  {
    role: 'user',
    text: 'Can you show me how to write an Apple-style liquid glass button in Vue 3?',
    time: '10:43 AM'
  },
  {
    role: 'assistant',
    text: 'Here is a sleek, hardware-accelerated liquid glass button using standard Vue 3 `<script setup>` and CSS backdrop filters:',
    codeLang: 'vue',
    code: `<template>
  <button class="id-glass-btn">
    <slot />
  </button>
</template>

<style scoped>
.id-glass-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  padding: 12px 24px;
  color: #fff;
  font-weight: 600;
  transition: transform 0.2s ease;
}
.id-glass-btn:hover { transform: scale(1.04); }
</style>`,
    time: '10:44 AM'
  }
])

const sendMessage = () => {
  if (!inputQuery.value.trim()) return

  const userText = inputQuery.value
  currentMessages.value.push({
    role: 'user',
    text: userText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  inputQuery.value = ''
  isTyping.value = true

  nextTick(() => {
    if (scrollViewport.value) scrollViewport.value.scrollTop = scrollViewport.value.scrollHeight
  })

  // Simulated AI response
  setTimeout(() => {
    isTyping.value = false
    currentMessages.value.push({
      role: 'assistant',
      text: `Analyzed "${userText}". I have updated the component logic and optimized state bindings for maximum FPS!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })

    nextTick(() => {
      if (scrollViewport.value) scrollViewport.value.scrollTop = scrollViewport.value.scrollHeight
    })
  }, 1200)
}

const copyCode = (code) => {
  navigator.clipboard.writeText(code)
  toast.success('Code copied to clipboard!')
}

const startNewChat = () => {
  currentMessages.value = [
    {
      role: 'assistant',
      text: 'New chat session started. What shall we build next?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]
}
</script>

<style scoped>
.template-chat-page {
  width: 100%; height: 82vh; min-height: 560px; display: flex;
  background: var(--bg); color: var(--text); font-family: var(--font);
  border-radius: var(--r-panel); border: 1px solid var(--hairline); box-shadow: var(--sh-card);
  overflow: hidden;
}

/* Sidebar Styling */
.chat-sidebar {
  width: 280px; background: var(--surface); border-right: 1px solid var(--hairline);
  display: flex; flex-direction: column; flex-shrink: 0; transition: transform 0.25s ease;
}
.sidebar-header {
  padding: 16px; border-bottom: 1px solid var(--hairline);
  display: flex; align-items: center; justify-content: space-between;
}
.sidebar-brand { display: flex; align-items: center; gap: 8px; font-weight: 750; font-size: 15px; }
.sparkle-icon { color: var(--accent); }

.chat-history-list { flex: 1; overflow-y: auto; padding: 14px 10px; display: flex; flex-direction: column; gap: 16px; }
.history-label { font-size: 11px; font-weight: 700; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; padding-left: 8px; }
.history-group { display: flex; flex-direction: column; gap: 2px; }

.history-item {
  display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: var(--r-chip);
  border: none; background: transparent; color: var(--text-2); font-size: 13px; font-weight: 500;
  cursor: pointer; text-align: left; transition: all 0.15s; width: 100%;
}
.history-item:hover { background: var(--hover); color: var(--text); }
.history-item.active { background: rgba(0, 113, 227, 0.1); color: var(--accent); font-weight: 600; }
.chat-title { text-overflow: ellipsis; overflow: hidden; white-space: nowrap; flex: 1; }

.sidebar-user-footer {
  padding: 12px 16px; border-top: 1px solid var(--hairline); display: flex; align-items: center; gap: 10px;
}
.user-meta { flex: 1; display: flex; flex-direction: column; }
.user-name { font-size: 13px; font-weight: 650; color: var(--text); }
.user-plan { font-size: 11px; color: var(--text-3); }
.settings-icon { color: var(--text-3); cursor: pointer; }

/* Main Chat Area */
.chat-main { flex: 1; display: flex; flex-direction: column; min-width: 0; position: relative; }
.chat-header {
  height: 56px; padding: 0 20px; border-bottom: 1px solid var(--hairline); background: var(--surface);
  display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
}
.header-left { display: flex; align-items: center; gap: 12px; }
.mobile-sidebar-toggle { display: none; background: transparent; border: none; color: var(--text); cursor: pointer; }
.model-picker { display: flex; align-items: center; gap: 8px; }
.model-name { font-size: 14.5px; font-weight: 700; color: var(--text); }
.header-right { display: flex; align-items: center; gap: 12px; }

/* Messages Viewport */
.chat-messages-viewport { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
.message-row { display: flex; gap: 12px; max-width: 820px; width: 100%; margin: 0 auto; }
.message-row.user { flex-direction: row-reverse; }

.avatar-cell { flex-shrink: 0; }
.ai-avatar-box {
  width: 32px; height: 32px; border-radius: 24%; background: var(--accent); color: #fff;
  display: flex; align-items: center; justify-content: center;
}

.bubble-cell { display: flex; flex-direction: column; max-width: 80%; }
.user .bubble-cell { align-items: flex-end; }
.message-sender-name { font-size: 12px; font-weight: 650; color: var(--text-3); margin-bottom: 4px; display: flex; gap: 8px; }
.message-time { font-weight: 400; opacity: 0.7; }

.message-bubble {
  padding: 12px 18px; border-radius: 18px; font-size: 14px; line-height: 1.55;
  background: var(--surface); border: 1px solid var(--hairline); color: var(--text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.user .message-bubble {
  background: var(--accent); color: #ffffff; border-color: transparent;
  border-radius: 18px; border-top-right-radius: 4px;
}
.assistant .message-bubble {
  border-radius: 18px; border-top-left-radius: 4px;
}

/* Code Block inside Chat */
.chat-code-block {
  margin-top: 12px; border-radius: 12px; background: #1e1e24; color: #f5f5f7;
  overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);
}
.code-header {
  padding: 8px 14px; background: rgba(255, 255, 255, 0.05); display: flex; justify-content: space-between;
  align-items: center; font-size: 11.5px; font-family: var(--mono); color: rgba(255, 255, 255, 0.6);
}
.copy-code-btn {
  background: transparent; border: none; color: #fff; font-size: 11px; cursor: pointer;
  display: flex; align-items: center; gap: 4px; opacity: 0.8;
}
.copy-code-btn:hover { opacity: 1; }
pre { margin: 0; padding: 14px; font-family: var(--mono); font-size: 12.5px; overflow-x: auto; line-height: 1.45; }

/* Typing animation */
.typing-dots { display: flex; gap: 4px; padding: 14px 18px; }
.typing-dots .dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--text-3);
  animation: pulse-dot 1.2s infinite ease-in-out;
}
.typing-dots .dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dots .dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes pulse-dot { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } }

/* Input Footer Bar */
.chat-input-footer {
  padding: 16px 24px; background: var(--surface); border-top: 1px solid var(--hairline);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.chat-input-bar {
  width: 100%; max-width: 820px; display: flex; align-items: center; gap: 10px;
  background: var(--bg); border: 1px solid var(--hairline); border-radius: var(--r-pill);
  padding: 6px 12px; transition: border-color 0.2s;
}
.chat-input-bar:focus-within { border-color: var(--accent); }
.chat-text-input {
  flex: 1; background: transparent; border: none; outline: none; font-size: 14px; color: var(--text);
  font-family: var(--font);
}
.input-tool-btn {
  background: transparent; border: none; color: var(--text-3); cursor: pointer; padding: 6px;
  display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: color 0.15s;
}
.input-tool-btn:hover { color: var(--text); }
.send-btn {
  width: 34px; height: 34px; border-radius: 50%; background: var(--accent); color: #fff;
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: opacity 0.15s, transform 0.15s;
}
.send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.send-btn:not(:disabled):hover { transform: scale(1.05); }

.disclaimer-text { font-size: 11px; color: var(--text-3); }

@media (max-width: 768px) {
  .chat-sidebar { position: absolute; top: 0; left: 0; bottom: 0; z-index: 100; transform: translateX(-100%); }
  .chat-sidebar.is-open { transform: translateX(0); }
  .mobile-sidebar-toggle { display: block; }
}
</style>
