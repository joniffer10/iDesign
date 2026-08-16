<template>
  <div class="settings-template">
    <!-- Header -->
    <div class="settings-header">
      <div class="header-left">
        <h2 class="settings-title">System Settings</h2>
        <p class="settings-desc">Manage your workspace preferences, security credentials, and billing profile.</p>
      </div>
      <div class="header-actions">
        <IdButton variant="ghost" size="sm" @click="resetDefaults">Reset</IdButton>
        <IdButton variant="primary" size="sm" :loading="isSaving" @click="saveSettings">
          Save Changes
        </IdButton>
      </div>
    </div>

    <!-- Main Settings Layout -->
    <div class="settings-layout">
      <!-- Navigation Sidebar Tabs -->
      <div class="settings-nav">
        <IdSegmentedControl
          v-model="activeTab"
          :options="[
            { value: 'profile', label: 'Profile' },
            { value: 'appearance', label: 'Appearance' },
            { value: 'security', label: 'Security' },
            { value: 'billing', label: 'Billing' }
          ]"
        />
      </div>

      <!-- Tab Content Area -->
      <div class="settings-content">
        <!-- 1. Profile Section -->
        <div v-if="activeTab === 'profile'" class="tab-pane">
          <IdForm @submit.prevent="saveSettings">
            <IdFormSection title="Public Identity" description="This information will be displayed across your workspace.">
              <!-- Avatar Upload Row -->
              <div class="avatar-edit-row">
                <IdAvatar
                  :name="profile.name"
                  size="xl"
                  shape="squircle"
                  status="online"
                  framed
                />
                <div class="avatar-meta">
                  <div class="avatar-name">{{ profile.name }}</div>
                  <div class="avatar-hint">JPG, PNG or GIF. Max 5MB.</div>
                  <div class="avatar-buttons">
                    <IdButton size="xs" variant="secondary">Change Avatar</IdButton>
                    <IdButton size="xs" variant="ghost">Remove</IdButton>
                  </div>
                </div>
              </div>

              <IdFormGroup inline>
                <IdFormField label="Full Name" required>
                  <IdInput v-model="profile.name" placeholder="e.g. Alex Rivera" />
                </IdFormField>

                <IdFormField label="Username" required>
                  <IdInput v-model="profile.username" placeholder="e.g. alexrivera">
                    <template #prefix>@</template>
                  </IdInput>
                </IdFormField>
              </IdFormGroup>

              <IdFormField label="Work Email Address" required :error="emailError">
                <IdInput
                  v-model="profile.email"
                  type="email"
                  placeholder="alex@company.com"
                  @change="validateEmail"
                >
                  <template #prefix>✉️</template>
                </IdInput>
              </IdFormField>

              <IdFormField label="Bio / Role Description">
                <IdTextarea
                  v-model="profile.bio"
                  placeholder="Staff Product Designer & System Architect..."
                  :rows="3"
                  :maxlength="240"
                />
              </IdFormField>
            </IdFormSection>
          </IdForm>
        </div>

        <!-- 2. Appearance Section -->
        <div v-else-if="activeTab === 'appearance'" class="tab-pane">
          <IdFormSection title="Visual Theming" description="Customize how Idesign looks on your device.">
            <IdPanel>
              <IdPanelRow title="Interface Theme" detail="Switch Light, Dark, or System Auto">
                <IdSegmentedControl
                  :model-value="themeConfig.themeRef.value"
                  :options="[
                    { value: 'light', label: '☀️ Light' },
                    { value: 'dark', label: '🌙 Dark' },
                    { value: 'auto', label: '🖥️ Auto' }
                  ]"
                  @update:model-value="setThemeMode"
                />
              </IdPanelRow>

              <IdPanelRow title="Layout Density" detail="Adjust padding and component spacing">
                <IdSegmentedControl
                  :model-value="themeConfig.densityRef.value"
                  :options="[
                    { value: 'compact', label: 'Compact' },
                    { value: 'comfortable', label: 'Comfortable' },
                    { value: 'spacious', label: 'Spacious' }
                  ]"
                  @update:model-value="setDensityMode"
                />
              </IdPanelRow>

              <IdPanelRow title="Primary Accent Color" detail="System accent for active highlights">
                <div class="accent-palette">
                  <button
                    v-for="color in accentColors"
                    :key="color.hex"
                    type="button"
                    :class="['color-swatch', { active: selectedAccent === color.hex }]"
                    :style="{ background: color.hex }"
                    :aria-label="color.name"
                    @click="applyAccent(color.hex)"
                  />
                </div>
              </IdPanelRow>
            </IdPanel>
          </IdFormSection>

          <IdFormSection title="Accessibility & Motion" description="Control reduced motion and high-contrast rings.">
            <IdPanel>
              <IdPanelRow title="Fluid Spring Physics" detail="Enable micro-animations and spring easing">
                <IdToggle v-model="animationsEnabled" />
              </IdPanelRow>

              <IdPanelRow title="High Contrast Focus Rings" detail="Enforce 3px focus ring on interactive items">
                <IdToggle v-model="highContrastFocus" />
              </IdPanelRow>
            </IdPanel>
          </IdFormSection>
        </div>

        <!-- 3. Security Section -->
        <div v-else-if="activeTab === 'security'" class="tab-pane">
          <IdFormSection title="Authentication & Keys" description="Manage passwords and cryptographic security keys.">
            <IdPanel>
              <IdPanelRow title="Two-Factor Authentication (2FA)" detail="Required for all administrative actions">
                <div class="security-toggle-badge">
                  <IdTag variant="success" size="sm">ACTIVE</IdTag>
                  <IdToggle v-model="twoFactorActive" />
                </div>
              </IdPanelRow>

              <IdPanelRow title="Hardware Passkey" detail="Apple Touch ID or FIDO2 Security Key">
                <IdButton size="xs" variant="secondary">Manage Keys</IdButton>
              </IdPanelRow>

              <IdPanelRow title="Session Inactivity Timeout" detail="Automatically lock after 15 minutes">
                <IdToggle v-model="sessionTimeout" />
              </IdPanelRow>
            </IdPanel>
          </IdFormSection>

          <IdFormSection title="Active Workspace Sessions" description="Devices currently authenticated to your account.">
            <div class="session-list">
              <div class="session-item">
                <div class="session-icon">💻</div>
                <div class="session-info">
                  <div class="session-title">MacBook Pro 16" · San Francisco, CA</div>
                  <div class="session-meta">Chrome 128 · Active Now</div>
                </div>
                <IdTag variant="accent" size="sm">Current</IdTag>
              </div>

              <div class="session-item">
                <div class="session-icon">📱</div>
                <div class="session-info">
                  <div class="session-title">iPhone 16 Pro · San Francisco, CA</div>
                  <div class="session-meta">Mobile Safari · 2 hours ago</div>
                </div>
                <IdButton size="xs" variant="ghost">Revoke</IdButton>
              </div>
            </div>
          </IdFormSection>
        </div>

        <!-- 4. Billing Section -->
        <div v-else-if="activeTab === 'billing'" class="tab-pane">
          <div class="billing-grid">
            <!-- Current Plan Card -->
            <IdCard variant="glass" padding="lg">
              <template #header>
                <div class="plan-header">
                  <div>
                    <IdTag variant="accent" size="sm">ACTIVE PLAN</IdTag>
                    <IdCardTitle tag="h3">Enterprise Pro</IdCardTitle>
                  </div>
                  <div class="plan-price">$49<span class="plan-cycle">/month</span></div>
                </div>
                <IdCardDescription>Renews automatically on September 1, 2026</IdCardDescription>
              </template>

              <div class="usage-bars">
                <div class="usage-row">
                  <div class="usage-label"><span>Monthly Active Compute</span><span>78%</span></div>
                  <IdProgress :value="78" size="sm" />
                </div>
                <div class="usage-row">
                  <div class="usage-label"><span>Bandwidth Storage</span><span>42%</span></div>
                  <IdProgress :value="42" size="sm" />
                </div>
              </div>

              <template #footer>
                <IdButton variant="secondary" size="sm">Change Plan</IdButton>
                <IdButton variant="primary" size="sm">Manage Payment Method</IdButton>
              </template>
            </IdCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import IdButton from '../idesign/IdButton.vue'
import IdInput from '../idesign/IdInput.vue'
import IdTextarea from '../idesign/IdTextarea.vue'
import IdToggle from '../idesign/IdToggle.vue'
import IdTag from '../idesign/IdTag.vue'
import IdAvatar from '../idesign/IdAvatar.vue'
import IdProgress from '../idesign/IdProgress.vue'
import IdSegmentedControl from '../idesign/IdSegmentedControl.vue'
import IdPanel from '../idesign/IdPanel.vue'
import IdPanelRow from '../idesign/IdPanelRow.vue'
import IdCard from '../idesign/IdCard.vue'
import IdCardTitle from '../idesign/IdCardTitle.vue'
import IdCardDescription from '../idesign/IdCardDescription.vue'
import IdForm from '../idesign/IdForm.vue'
import IdFormField from '../idesign/IdFormField.vue'
import IdFormGroup from '../idesign/IdFormGroup.vue'
import IdFormSection from '../idesign/IdFormSection.vue'
import { useToast } from '../../composables/useToast'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const toast = useToast()
const themeConfig = useIdesignConfig()

const activeTab = ref('profile')
const isSaving = ref(false)
const emailError = ref('')

const profile = reactive({
  name: 'Alex Rivera',
  username: 'alexrivera',
  email: 'alex.rivera@company.design',
  bio: 'Staff Product Designer and Design Systems Architect building liquid glass spatial interfaces.'
})

const animationsEnabled = ref(true)
const highContrastFocus = ref(false)
const twoFactorActive = ref(true)
const sessionTimeout = ref(true)
const selectedAccent = ref('#0071e3')

const accentColors = [
  { name: 'System Blue', hex: '#0071e3' },
  { name: 'Indigo Purple', hex: '#5e5ce6' },
  { name: 'Live Green', hex: '#30d158' },
  { name: 'Heat Orange', hex: '#ff9f0a' },
  { name: 'Ruby Red', hex: '#ff3b30' }
]

const setThemeMode = (mode) => {
  themeConfig.setTheme(mode)
  toast.success(`Theme set to ${mode}`)
}

const setDensityMode = (density) => {
  themeConfig.setDensity(density)
  toast.success(`Layout density set to ${density}`)
}

const applyAccent = (hex) => {
  selectedAccent.value = hex
  themeConfig.setUi({ colors: { primary: hex, accent: hex } })
  toast.success('Accent color updated!')
}

const validateEmail = () => {
  if (!profile.email.includes('@') || !profile.email.includes('.')) {
    emailError.value = 'Please enter a valid work email address'
  } else {
    emailError.value = ''
  }
}

const saveSettings = async () => {
  validateEmail()
  if (emailError.value) return

  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    toast.success('Settings saved successfully', {
      description: 'Your workspace preferences and profile have been updated.'
    })
  }, 600)
}

const resetDefaults = () => {
  profile.name = 'Alex Rivera'
  profile.username = 'alexrivera'
  profile.email = 'alex.rivera@company.design'
  toast.info('Preferences reset to defaults')
}
</script>

<style scoped>
.settings-template {
  font-family: var(--font);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 16px;
  background: var(--bg);
  color: var(--text);
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--hairline);
}

.settings-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--text);
}

.settings-desc {
  font-size: 13.5px;
  color: var(--text-2);
  margin: 4px 0 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.settings-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.settings-nav {
  display: flex;
}

.tab-pane {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.avatar-edit-row {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 12px 0 16px;
}

.avatar-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.avatar-name {
  font-size: 15px;
  font-weight: 650;
  color: var(--text);
}

.avatar-hint {
  font-size: 12px;
  color: var(--text-3);
}

.avatar-buttons {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.accent-palette {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-swatch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
  outline: none;
}

.color-swatch:hover {
  transform: scale(1.15);
}

.color-swatch.active {
  border-color: var(--text);
  transform: scale(1.15);
}

.security-toggle-badge {
  display: flex;
  align-items: center;
  gap: 10px;
}

.session-list {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  overflow: hidden;
  box-shadow: var(--sh-card);
}

.session-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
}

.session-item + .session-item {
  border-top: 1px solid var(--hairline);
}

.session-icon {
  font-size: 20px;
}

.session-info {
  flex: 1;
}

.session-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
}

.session-meta {
  font-size: 12px;
  color: var(--text-3);
  margin-top: 2px;
}

.plan-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.plan-price {
  font-size: 26px;
  font-weight: 750;
  letter-spacing: -0.03em;
  color: var(--text);
}

.plan-cycle {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-3);
}

.usage-bars {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 16px 0;
}

.usage-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.usage-label {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-2);
}
</style>
