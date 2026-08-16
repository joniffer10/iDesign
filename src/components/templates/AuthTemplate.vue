<template>
  <div :class="['auth-page-container', `variant-${variant}`]">
    <!-- Ambient Background Glow Orbs for Centered & Minimal Glass -->
    <div v-if="variant === 'centered-card' || variant === 'minimal-glass'" class="ambient-orbs">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
    </div>

    <!-- Variant: Default / Split Hero -->
    <div v-if="variant === 'default' || variant === 'split-hero'" class="auth-card split-card">
      <!-- Left Side: Interactive Form -->
      <div class="auth-form-side">
        <div class="auth-header">
          <div class="auth-logo">
            <span class="logo-icon">⚡</span>
            <span class="logo-text">Idesign</span>
          </div>
          <h2 class="auth-title">{{ customTitle || (isSignUp ? 'Create your account' : 'Welcome back') }}</h2>
          <p class="auth-subtitle">
            {{ customSubtitle || (isSignUp ? 'Enter your details to register a new account.' : 'Please enter your credentials to access your dashboard.') }}
          </p>
        </div>

        <!-- Mode Toggle Tabs -->
        <div class="auth-tabs">
          <button
            type="button"
            :class="['auth-tab', { active: !isSignUp }]"
            @click="isSignUp = false"
          >
            Sign In
          </button>
          <button
            type="button"
            :class="['auth-tab', { active: isSignUp }]"
            @click="isSignUp = true"
          >
            Create Account
          </button>
        </div>

        <!-- Form Inputs -->
        <form class="auth-form" @submit.prevent="handleSubmit">
          <IdInput
            v-if="isSignUp"
            v-model="name"
            label="Full Name"
            placeholder="Jane Smith"
            required
          />

          <IdInput
            v-model="email"
            label="Email Address"
            placeholder="jane.smith@example.com"
            type="email"
            required
          />

          <IdInput
            v-model="password"
            label="Password"
            placeholder="••••••••••••"
            type="password"
            required
          />

          <div v-if="!isSignUp" class="auth-row">
            <IdCheckbox v-model="remember" label="Remember me" />
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <IdButton
            variant="primary"
            size="lg"
            block
            type="submit"
            :loading="loading"
          >
            {{ isSignUp ? 'Create Account →' : 'Sign In →' }}
          </IdButton>
        </form>

        <template v-if="showSocial">
          <div class="divider-or">
            <span>OR CONTINUE WITH</span>
          </div>

          <!-- Social Login Buttons -->
          <div class="social-grid">
            <button type="button" class="social-btn" @click="handleSocial('Passkey')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-2-2l2 2m7 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
              Passkey
            </button>
            <button type="button" class="social-btn" @click="handleSocial('GitHub')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
              GitHub
            </button>
          </div>
        </template>
      </div>

      <!-- Right Side: Liquid Glass Ambient Showcase Banner -->
      <div class="auth-banner-side">
        <div class="banner-blur-orb orb-1"></div>
        <div class="banner-blur-orb orb-2"></div>

        <div class="banner-content">
          <IdTag variant="accent" icon-left="⚡">DESIGN SYSTEM V2.0</IdTag>
          <h3 class="banner-title">Build Production-Grade Web Applications</h3>
          <p class="banner-desc">
            Clean unified surfaces, frosted glass overlays, and spring animations engineered for next-gen spatial computing interfaces.
          </p>

          <!-- Floating Glass Card Feature -->
          <div class="banner-glass-card">
            <div class="card-header">
              <IdAvatar name="Jane Smith" shape="squircle" size="sm" status="online" />
              <div>
                <div class="card-user">Jane Smith</div>
                <div class="card-role">Design Director · Studio Corp</div>
              </div>
            </div>
            <p class="card-quote">"Idesign is the cleanest Vue component library we've ever deployed."</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Variant: Centered Card -->
    <div v-else-if="variant === 'centered-card'" class="auth-card centered-card">
      <div class="centered-header">
        <div class="centered-badge">
          <span class="badge-icon">⚡</span>
        </div>
        <h2 class="auth-title">{{ customTitle || (isSignUp ? 'Create your account' : 'Welcome back') }}</h2>
        <p class="auth-subtitle">
          {{ customSubtitle || (isSignUp ? 'Enter your details to register.' : 'Enter your email to sign in.') }}
        </p>
      </div>

      <!-- Mode Toggle Tabs -->
      <div class="auth-tabs">
        <button
          type="button"
          :class="['auth-tab', { active: !isSignUp }]"
          @click="isSignUp = false"
        >
          Sign In
        </button>
        <button
          type="button"
          :class="['auth-tab', { active: isSignUp }]"
          @click="isSignUp = true"
        >
          Create Account
        </button>
      </div>

      <!-- Form Inputs -->
      <form class="auth-form" @submit.prevent="handleSubmit">
        <IdInput
          v-if="isSignUp"
          v-model="name"
          label="Full Name"
          placeholder="Jane Smith"
          required
        />

        <IdInput
          v-model="email"
          label="Email Address"
          placeholder="jane.smith@example.com"
          type="email"
          required
        />

        <IdInput
          v-model="password"
          label="Password"
          placeholder="••••••••••••"
          type="password"
          required
        />

        <div v-if="!isSignUp" class="auth-row">
          <IdCheckbox v-model="remember" label="Remember me" />
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <IdButton
          variant="primary"
          size="lg"
          block
          type="submit"
          :loading="loading"
        >
          {{ isSignUp ? 'Create Account →' : 'Sign In →' }}
        </IdButton>
      </form>

      <template v-if="showSocial">
        <div class="divider-or">
          <span>OR CONTINUE WITH</span>
        </div>

        <div class="social-grid">
          <button type="button" class="social-btn" @click="handleSocial('Passkey')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Passkey
          </button>
          <button type="button" class="social-btn" @click="handleSocial('GitHub')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
            GitHub
          </button>
        </div>
      </template>
    </div>

    <div v-else-if="variant === 'minimal-glass'" class="auth-card minimal-card">
      <div class="minimal-header">
        <IdAvatar name="Passkey Authentication" size="lg" shape="squircle" framed icon="⚡" />
        <h2 class="auth-title">{{ customTitle || 'Sign in with Passkey' }}</h2>
        <p class="auth-subtitle">{{ customSubtitle || 'Biometric security enabled' }}</p>
      </div>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <IdInput
          v-model="email"
          placeholder="Email address"
          type="email"
          size="lg"
          required
        />

        <IdButton
          variant="primary"
          size="lg"
          block
          type="submit"
          :loading="loading"
        >
          Continue with Passkey →
        </IdButton>
      </form>

      <div class="minimal-footer">
        <button type="button" class="link-btn" @click="handleSocial('Passkey')">Use Face ID / Touch ID</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IdInput from '../idesign/IdInput.vue'
import IdButton from '../idesign/IdButton.vue'
import IdCheckbox from '../idesign/IdCheckbox.vue'
import IdTag from '../idesign/IdTag.vue'
import IdAvatar from '../idesign/IdAvatar.vue'
import { useToast } from '../../composables/useToast'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'split-hero', 'centered-card', 'minimal-glass'].includes(v)
  },
  title: String,
  subtitle: String,
  showSocial: {
    type: Boolean,
    default: true
  }
})

const toast = useToast()

const isSignUp = ref(false)
const name = ref('')
const email = ref('jane.smith@example.com')
const password = ref('password123')
const remember = ref(true)
const loading = ref(false)

const customTitle = props.title
const customSubtitle = props.subtitle

const handleSubmit = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    toast.success(isSignUp.value ? 'Account created successfully!' : 'Signed in successfully!', {
      description: `Welcome ${isSignUp.value ? name.value || 'User' : email.value}`
    })
  }, 1000)
}

const handleSocial = (provider) => {
  toast.info(`Connecting to ${provider}...`, {
    description: 'OAuth 2.0 authentication flow initialized.'
  })
}
</script>

<style scoped>
.auth-page-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  font-family: var(--font);
}

/* Ambient Orbs */
.ambient-orbs {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.6; }
.orb-1 { width: 320px; height: 320px; background: rgba(0, 113, 227, 0.25); top: 10%; left: 20%; }
.orb-2 { width: 280px; height: 280px; background: rgba(175, 82, 222, 0.22); bottom: 15%; right: 20%; }

.auth-card {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: clamp(16px, 3vw, 24px);
  box-shadow: var(--sh-overlay);
  overflow: hidden;
}

/* Split Card */
.split-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 960px;
}

/* Centered Card */
.centered-card {
  max-width: 440px;
  padding: clamp(24px, 4vw, 36px);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  position: relative;
  z-index: 2;
}
:root.dark .centered-card {
  background: rgba(28, 28, 30, 0.88);
}

.centered-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.centered-badge {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 14px;
}

/* Minimal Card */
.minimal-card {
  max-width: 380px;
  padding: 32px 28px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
:root.dark .minimal-card {
  background: rgba(28, 28, 30, 0.88);
}

.minimal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.minimal-footer {
  text-align: center;
}

.link-btn {
  background: transparent;
  border: none;
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.link-btn:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .split-card {
    grid-template-columns: 1fr;
  }
  .auth-banner-side {
    display: none;
  }
}

.auth-form-side {
  padding: clamp(24px, 4vw, 44px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-header {
  margin-bottom: 24px;
}

.auth-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 750;
  color: var(--text);
  margin-bottom: 16px;
}

.auth-title {
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 6px 0;
}

.auth-subtitle {
  font-size: 13.5px;
  color: var(--text-2);
  margin: 0;
}

.auth-tabs {
  display: flex;
  background: var(--track);
  border-radius: var(--r-pill);
  padding: 3px;
  margin-bottom: 24px;
}

.auth-tab {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px 12px;
  border-radius: var(--r-pill);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.auth-tab.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}

.forgot-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 550;
}

.forgot-link:hover {
  text-decoration: underline;
}

.divider-or {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0 16px 0;
  color: var(--text-3);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.divider-or::before,
.divider-or::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--hairline);
}

.divider-or span {
  padding: 0 10px;
}

.social-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-btn:hover {
  background: var(--hover);
  border-color: var(--text-3);
}

/* Banner side */
.auth-banner-side {
  position: relative;
  background: var(--grad-hero);
  padding: clamp(24px, 4vw, 44px);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.banner-blur-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.orb-1 {
  width: 260px;
  height: 260px;
  background: rgba(0, 113, 227, 0.3);
  top: -60px;
  right: -40px;
  filter: blur(50px);
}

.orb-2 {
  width: 220px;
  height: 220px;
  background: rgba(175, 82, 222, 0.25);
  bottom: -40px;
  left: -20px;
  filter: blur(45px);
}

.banner-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.banner-title {
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.banner-desc {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.55;
  margin: 0;
}

.banner-glass-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 16px;
  color: #fff;
  margin-top: 12px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.card-user {
  font-size: 13.5px;
  font-weight: 650;
}

.card-role {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.7);
}

.card-quote {
  font-size: 13px;
  font-style: italic;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}
</style>
