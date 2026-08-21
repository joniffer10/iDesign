<template>
  <IdModal
    :model-value="!!component"
    :title="component?.name || 'Component Playground'"
    max-width="780px"
    @update:model-value="$emit('close')"
  >
    <div v-if="component" class="playground-layout">
      <!-- 1. playground-header -->
      <div class="playground-header">
        <div class="header-meta">
          <span class="category-tag">{{ component.category }}</span>
          <span class="vue-tag">Vue 3 / Nuxt 3 Component</span>
        </div>
        <p class="component-desc">{{ component.description }}</p>
      </div>

      <!-- Live Preview Box with Controls -->
      <div class="preview-stage">
        <div class="stage-bar">
          <span class="stage-title">Live Preview Sandbox</span>
          <div class="view-mode-toggles">
            <button
              :class="['mode-btn', { active: bgMode === 'light' }]"
              @click="setMode('light')"
            >Light Ground</button>
            <button
              :class="['mode-btn', { active: bgMode === 'dark' }]"
              @click="setMode('dark')"
            >Dark Preview</button>
          </div>
        </div>

        <!-- Render Target Canvas -->
        <div :class="['canvas-area', `bg-${bgMode}`, { dark: bgMode === 'dark', light: bgMode === 'light' }]" :data-theme="bgMode">
          <div :key="`${component?.id}-${JSON.stringify(propState)}`" style="width: 100%; display: flex; justify-content: center; align-items: center; min-height: 100%;">
          <template v-if="component.id === 'glass-nav'">
            <div style="width: 100%;">
              <IdGlassNav
                :title="propState.title !== undefined ? propState.title : 'Idesign'"
                :variant="propState.variant || 'glass'"
                :icon="getEmptyIcon(propState.icon)"
                :links="[{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }]"
              >
                <template #actions>
                  <IdButton size="sm" variant="primary">Action</IdButton>
                </template>
              </IdGlassNav>
            </div>
          </template>

          <template v-else-if="component.id === 'stepper'">
            <div style="width: 100%; max-width: 580px;">
              <IdStepper
                :model-value="propState.activeStep ?? demoStep"
                @update:model-value="val => { demoStep = val; propState.activeStep = val; }"
                :orientation="propState.orientation || 'horizontal'"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :color="propState.color || 'blue'"
                :clickable="propState.clickable !== false"
                :steps="[{ label: 'Account', description: 'Create user' }, { label: 'Security', description: '2FA settings' }, { label: 'Review', description: 'Confirm details' }]"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'timeline'">
            <div style="width: 100%; max-width: 480px;">
              <IdTimeline
                :variant="propState.variant || 'cards'"
                :size="propState.size || 'md'"
                :connector="propState.connector !== false"
                :items="[
                  { title: 'v2.4 System Update Released', description: 'Added 5 new Liquid Glass components and tokens.', time: '10 min ago', status: 'primary', icon: Zap },
                  { title: 'Security Audit Passed', description: 'Enclave verification completed cleanly.', time: '2 hours ago', status: 'success', icon: Check },
                  { title: 'Edge Deployment', description: 'Synced 14 edge cluster nodes.', time: 'Yesterday', status: 'info' }
                ]"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'grid'">
            <div style="width: 100%; max-width: 580px;">
              <IdGrid :cols="propState.cols ? Number(propState.cols) : 3" :gap="propState.gap || 'md'" :auto-fit="!!propState.autoFit">
                <IdCard title="Column 1" subtitle="Responsive" />
                <IdCard title="Column 2" subtitle="Layout Grid" />
                <IdCard title="Column 3" subtitle="Liquid System" />
              </IdGrid>
            </div>
          </template>

          <template v-else-if="component.id === 'bar-chart'">
            <div style="width: 100%; max-width: 440px;">
              <IdBarChart :height="propState.height ? Number(propState.height) : 180" :data="[{ label: 'Mon', value: 45 }, { label: 'Tue', value: 82 }, { label: 'Wed', value: 60 }, { label: 'Thu', value: 95 }, { label: 'Fri', value: 75 }]" />
            </div>
          </template>

          <template v-else-if="component.id === 'pie-chart'">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; padding: 20px;">
              <IdPieChart
                :variant="propState.variant || 'progress'"
                :value="propState.value !== undefined ? Number(propState.value) : 78"
                :max="propState.max !== undefined ? Number(propState.max) : 100"
                :unit="propState.unit !== undefined ? propState.unit : 'AQI'"
                :label="propState.label !== undefined ? propState.label : (propState.centerLabel || 'Air Quality')"
                :color="propState.color || 'blue'"
                :size="propState.size || 'md'"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'segmented-control'">
            <IdSegmentedControl
              :active="propState.active || 'Overview'"
              :size="propState.size || 'md'"
              :options="['Overview', 'Components', 'Tokens']"
              :theme="propState.theme || 'white'"
            />
          </template>

          <template v-else-if="component.id === 'mobile-navbar'">
            <div style="width: 100%; max-width: 440px; display: flex; justify-content: center; padding: 20px 0;">
              <IdMobileNavbar
                v-model="demoMobileNav"
                :variant="propState.variant || 'glass'"
                :size="propState.size || 'md'"
                :color="propState.color || 'blue'"
                :position="propState.position || 'static'"
                :safe-area="propState.safeArea !== false"
                :items="[
                  { id: 'home', label: 'Home', icon: Home },
                  { id: 'explore', label: 'Explore', icon: Compass },
                  { id: 'notifications', label: 'Alerts', icon: Bell, badge: 3 },
                  { id: 'profile', label: 'Profile', icon: User }
                ]"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'tabs'">
            <div style="width: 100%; max-width: 400px;">
              <IdTabs
                v-model="demoTab"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :color="propState.color || 'blue'"
                :tabs="[{ value: 'overview', label: 'Overview' }, { value: 'code', label: 'Code' }, { value: 'api', label: 'API' }]"
              >
                <p style="font-size: 14px; color: var(--text-2);">Content for "{{ demoTab }}" tab.</p>
              </IdTabs>
            </div>
          </template>

          <template v-else-if="component.id === 'breadcrumbs'">
            <IdBreadcrumbs
              :variant="propState.variant || 'default'"
              :size="propState.size || 'md'"
              :color="propState.color || 'blue'"
              :items="[{ label: 'Home', href: '#' }, { label: 'Components', href: '#' }, { label: 'Breadcrumbs' }]"
            />
          </template>

          <template v-else-if="component.id === 'pagination'">
            <IdPagination
              v-model="demoPage"
              :total-pages="propState.totalPages || 12"
              :size="propState.size || 'md'"
              :variant="propState.variant || 'default'"
              :color="propState.color || 'blue'"
            />
          </template>

          <template v-else-if="component.id === 'dropdown-menu'">
            <IdDropdownMenu
              :size="propState.size || 'md'"
              :variant="propState.variant || 'default'"
              :items="[{ label: 'Edit', shortcut: '⌘E' }, { label: 'Duplicate' }, { separator: true }, { label: 'Delete', danger: true }]"
            >
              <template #trigger><IdButton variant="secondary">Actions ▾</IdButton></template>
            </IdDropdownMenu>
          </template>

          <template v-else-if="component.id === 'dock'">
            <div style="position: relative; width: 100%; min-height: 140px; display: flex; align-items: center; justify-content: center; overflow: visible;">
              <IdDock
                :items="[
                  { id: 'finder', label: 'Finder', icon: '📁', iconBg: '#007aff', active: true },
                  { id: 'safari', label: 'Safari', icon: '🌐', iconBg: '#34c759', badge: 3 },
                  { id: 'messages', label: 'Messages', icon: '💬', iconBg: '#30d158', badge: 'NEW' },
                  { id: 'notes', label: 'Notes', icon: '📝', iconBg: '#ff9500' },
                  { separator: true },
                  { id: 'settings', label: 'Settings', icon: '⚙️', iconBg: '#8e8e93' }
                ]"
                :variant="propState.variant || 'glass'"
                :size="propState.size || 'md'"
                :position="propState.position === 'none' ? 'none' : 'none'"
                :alignment="propState.alignment || 'center'"
                :direction="propState.direction || 'auto'"
                :magnification="propState.magnification ?? true"
                :tooltip="propState.tooltip ?? true"
                :color="propState.color || 'blue'"
                :disabled="propState.disabled || false"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'unified-panel'">
            <div style="width: 100%; max-width: 440px;">
              <IdPanel :size="propState.size || 'md'" :variant="propState.variant || 'default'" :no-dividers="propState.noDividers">
                <IdPanelRow title="Wi-Fi" :icon="Wifi" icon-bg="#007aff" detail="Home Network" />
                <IdPanelRow title="Bluetooth" :icon="Bluetooth" icon-bg="#34c759" detail="On" />
                <IdPanelRow title="Notifications" :icon="Bell" icon-bg="#ff9500" detail="Enabled" />
              </IdPanel>
            </div>
          </template>

          <template v-else-if="component.id === 'hero-cta'">
            <div style="width: 100%; max-width: 580px;">
              <IdHeroCta
                :title="propState.title || 'Build Production-Grade Apps'"
                :description="propState.description || 'Clean, unified surfaces with frosted glass used only where layers overlap.'"
                :eyebrow="propState.eyebrow || 'DESIGN SYSTEM V2.0'"
                :action-label="propState.actionLabel || 'Get Started'"
                :variant="propState.variant || 'glass'"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'accordion'">
            <div style="width: 100%; max-width: 440px;">
              <IdAccordion :size="propState.size || 'md'" :variant="propState.variant || 'default'" :items="[{ title: 'What is Idesign?', content: 'A production-grade Vue 3 component library.' }, { title: 'Is it free?', content: 'Yes, MIT licensed.' }, { title: 'Dark mode?', content: 'Yes, supports OS preference and .dark class.' }]" />
            </div>
          </template>

          <template v-else-if="component.id === 'project-section'">
            <div style="width: 100%; max-width: 580px;">
              <IdProjectSection :title="propState.title || 'Featured Projects'" :icon="propState.icon || '📁'">
                <IdProjectCard
                  title="Spatial Studio"
                  description="Next-gen spatial computing workstation built with Liquid Glass design system."
                  logo="⚡"
                  logo-bg="#1e293b"
                />
                <IdProjectCard
                  title="EcoTrack Analytics"
                  description="Smart environmental telemetry and realtime resource monitoring dashboard."
                  logo="🌐"
                  logo-bg="#1e293b"
                />
                <IdProjectCard
                  title="TrailFinder Mobile"
                  description="Cross-platform navigation and community trail exploration application."
                  logo="🚀"
                  logo-bg="#1e293b"
                />
              </IdProjectSection>
            </div>
          </template>

          <template v-else-if="component.id === 'image-frame'">
            <div style="width: 100%; max-width: 320px; display: flex; justify-content: center;">
              <IdImageFrame
                :src="propState.src || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'"
                :shape="propState.shape || 'squircle'"
                :aspect-ratio="propState.aspectRatio || '1-1'"
                :bezel-size="propState.bezelSize || 'md'"
                :caption="propState.caption !== undefined ? propState.caption : 'Studio Portrait'"
                :interactive="propState.interactive !== false"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'liquid-button'">
            <div style="width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 10px; align-items: center;">
              <IdButton
                :variant="propState.variant || 'primary'"
                :color="propState.color || 'blue'"
                :size="propState.size || 'md'"
                :icon-left="propState.iconLeft"
                :icon-right="propState.iconRight"
                :disabled="propState.disabled"
                :loading="propState.loading"
                :block="propState.block"
              >
                {{ propState.label || 'Continue' }}
              </IdButton>
            </div>
          </template>

          <template v-else-if="component.id === 'input'">
            <div style="width: 100%; max-width: 340px;">
              <IdInput
                v-model="demoText"
                :label="propState.label || 'Text Input'"
                :placeholder="propState.placeholder || 'Type here...'"
                :variant="propState.variant || 'default'"
                :size="propState.size || 'md'"
                :masked="propState.masked"
                :clearable="propState.clearable"
                :trailing-text="propState.trailingText"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'textarea'">
            <div style="width: 100%; max-width: 380px;">
              <IdTextarea
                v-model="demoTextarea"
                :label="propState.label || 'Description'"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                placeholder="Write something..."
                :maxlength="propState.maxlength || 200"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'select'">
            <div style="width: 100%; max-width: 300px;">
              <IdSelect
                v-model="demoSelect"
                :label="propState.label || 'Framework'"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :searchable="propState.searchable"
                :clearable="propState.clearable"
                :options="['Vue 3', 'Nuxt 3', 'React', 'Svelte', 'Solid', 'Astro', 'Angular', 'Qwik', 'Preact', 'Next.js']"
                placeholder="Choose a framework..."
              />
            </div>
          </template>

          <template v-else-if="component.id === 'checkbox'">
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <IdCheckbox
                v-model="demoCheck1"
                :label="propState.label || 'Accept terms'"
                :size="propState.size || 'md'"
                :color="propState.color || 'blue'"
              />
              <IdCheckbox
                v-model="demoCheck2"
                label="Subscribe to updates"
                :size="propState.size || 'md'"
                :color="propState.color || 'blue'"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'radio-group'">
            <IdRadioGroup v-model="demoRadio" label="Plan" :direction="propState.direction || 'vertical'" :options="['Free', 'Pro', 'Enterprise']" />
          </template>

          <template v-else-if="component.id === 'slider'">
            <div style="width: 100%; max-width: 320px;">
              <IdSlider v-model="demoSlider" label="Volume" :min="propState.min || 0" :max="propState.max || 100" />
            </div>
          </template>

          <template v-else-if="component.id === 'ios-switch'">
            <IdToggle
              v-model="demoToggle"
              :label="propState.label || 'Notifications'"
              :size="propState.size || 'md'"
              :variant="propState.variant || 'success'"
            />
          </template>

          <template v-else-if="component.id === 'liquid-modal'">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <IdButton variant="primary" @click="demoModalOpen = true">
                Launch Modal ({{ propState.variant || 'glass' }})
              </IdButton>

              <IdModal
                v-model="demoModalOpen"
                :title="propState.title || 'Save Workspace Changes'"
                :description="propState.description || propState.subtitle || 'Your changes will be synced across all connected devices.'"
                :content="propState.content || 'Review your team settings before publishing. All active sessions will automatically receive the updated security profile.'"
                :variant="propState.variant || 'glass'"
                :size="propState.size || 'md'"
                :close-on-outside-click="propState.closeOnOutsideClick !== undefined ? propState.closeOnOutsideClick : true"
                :close-on-escape="propState.closeOnEscape !== undefined ? propState.closeOnEscape : true"
                :show-close="propState.showClose !== undefined ? propState.showClose : true"
                :teleport="true"
              >
                <template #actions>
                  <IdButton variant="secondary" @click="demoModalOpen = false">Cancel</IdButton>
                  <IdButton variant="primary" @click="demoModalOpen = false; emit('toast', 'Settings successfully saved!')">Confirm</IdButton>
                </template>
              </IdModal>
            </div>
          </template>

          <template v-else-if="component.id === 'bottom-sheet'">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <IdButton variant="primary" @click="demoSheetOpen = true">Open Bottom Sheet</IdButton>
              <IdBottomSheet
                v-model="demoSheetOpen"
                :title="propState.title || 'Sheet Actions'"
                :description="propState.description || 'Choose an action to proceed.'"
                :variant="propState.variant || 'default'"
                :position="propState.position || 'bottom'"
                :show-grabber="propState.showGrabber"
                :backdrop="propState.backdrop"
                :close-on-backdrop="propState.closeOnBackdrop"
                :close-on-esc="propState.closeOnEsc"
                :dismissible="propState.dismissible"
                :height="propState.height"
                :max-height="propState.maxHeight || '85vh'"
              >
                <p style="color: var(--text-2); margin-bottom: 16px;">Bottom sheet with edge-anchored slide animation.</p>
                <IdButton variant="secondary" size="sm" block @click="demoSheetOpen = false">Close</IdButton>
              </IdBottomSheet>
            </div>
          </template>

          <template v-else-if="component.id === 'drawer'">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <IdButton variant="primary" @click="demoDrawerOpen = true">Open Drawer ({{ propState.variant || 'default' }})</IdButton>
              <IdDrawer v-model="demoDrawerOpen" :title="propState.title || 'Settings'" :description="propState.description || 'Manage your preferences.'" :position="propState.position || 'right'" :variant="propState.variant || 'default'">
                <p style="color: var(--text-2);">Drawer content with body scroll lock.</p>
              </IdDrawer>
            </div>
          </template>

          <template v-else-if="component.id === 'toast'">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 14px;">
              <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                <IdButton variant="primary" @click="triggerToast('success')">Success Toast</IdButton>
                <IdButton variant="secondary" @click="triggerToast('info')">Info Toast</IdButton>
                <IdButton variant="dark" @click="triggerToast('warning')">Warning Toast</IdButton>
                <IdButton variant="danger" @click="triggerToast('error')">Error Toast</IdButton>
              </div>
              <IdToast :position="propState.position || 'bottom-center'" />
            </div>
          </template>

          <template v-else-if="component.id === 'tooltip'">
            <IdTooltip :text="propState.text || 'Helpful tip'" :position="propState.position || 'top'">
              <IdButton variant="secondary">Hover me</IdButton>
            </IdTooltip>
          </template>

          <template v-else-if="component.id === 'live-indicator'">
            <IdLiveDot>{{ propState.text || 'SYSTEM ONLINE · LIVE' }}</IdLiveDot>
          </template>

          <template v-else-if="component.id === 'tag'">
            <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: center;">
              <IdTag
                :variant="propState.variant || 'success'"
                :size="propState.size || 'md'"
                :icon-left="propState.iconLeft"
                :icon-right="propState.iconRight"
                :removable="propState.removable"
              >
                {{ propState.label || 'Active' }}
              </IdTag>
              <IdTag variant="accent" icon-left="🔵">Processing</IdTag>
              <IdTag variant="warning" icon-left="⚠️">Pending</IdTag>
              <IdTag variant="danger" icon-left="🛑">Failed</IdTag>
            </div>
          </template>

          <template v-else-if="component.id === 'alert'">
            <div style="width: 100%; max-width: 480px;">
              <IdAlert
                :color="propState.color || 'info'"
                :variant="propState.variant || 'subtle'"
                :size="propState.size || 'md'"
                :title="propState.title !== undefined ? propState.title : 'Update Available'"
                :description="propState.description !== undefined ? propState.description : 'A new software version is ready to install.'"
                :dismissible="propState.dismissible !== false"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'table'">
            <div style="width: 100%; max-width: 640px;">
              <IdTable
                :title="propState.title !== undefined ? propState.title : 'Team Members'"
                :count="propState.count"
                :variant="propState.variant || 'default'"
                :selectable="propState.selectable !== false"
                :searchable="propState.searchable !== false"
                :has-row-actions="propState.hasRowActions !== false"
                :columns="[
                  { key: 'name', label: 'Name', sortable: true },
                  { key: 'role', label: 'Role' },
                  { key: 'status', label: 'Status' }
                ]"
                :data="[
                  { name: 'Jane Smith', role: 'Design Director', status: 'Active' },
                  { name: 'Alex Rivera', role: 'Staff Engineer', status: 'Active' },
                  { name: 'Sarah Chen', role: 'Product Manager', status: 'Away' }
                ]"
              >
                <template #col-status="{ value }">
                  <IdTag :variant="value === 'Active' ? 'success' : 'warning'" size="sm">{{ value }}</IdTag>
                </template>
                <template #actions="{ row }">
                  <IdButton size="sm" variant="ghost">Edit</IdButton>
                </template>
              </IdTable>
            </div>
          </template>

          <template v-else-if="component.id === 'avatar'">
            <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
              <IdAvatar
                :key="`avatar-${JSON.stringify(propState)}`"
                :name="propState.name || 'Jane Smith'"
                :src="propState.src"
                :icon="getEmptyIcon(propState.icon)"
                :size="propState.size || 'md'"
                :shape="propState.shape || 'circle'"
                :framed="propState.framed"
                :status="propState.status || 'online'"
              />
              <IdAvatar name="Alex Rivera" size="lg" shape="squircle" framed status="online" />
            </div>
          </template>

          <template v-else-if="component.id === 'avatar-group'">
            <IdAvatarGroup
              :users="[
                { name: 'Jane Smith', status: 'online' },
                { name: 'Alex Rivera', status: 'online' },
                { name: 'Sarah Chen', status: 'busy' },
                { name: 'David Kim', status: 'offline' },
                { name: 'Elena Rostova' }
              ]"
              :variant="propState.variant || 'hero'"
              :shape="propState.shape || 'circle'"
              :size="propState.size || 'md'"
              :max="propState.max || 3"
              :label="propState.label || '5 active team members'"
              :framed="propState.framed"
            />
          </template>

          <template v-else-if="component.id === 'stat'">
            <div style="width: 100%; max-width: 320px;">
              <IdStat
                :label="propState.label || 'Total Revenue'"
                :value="propState.value || '$128,450'"
                :change="propState.change || '+14.2%'"
                change-type="positive"
                :description="propState.description || 'Compared to $112,400 last month'"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :sparkline-data="[10, 25, 18, 35, 28, 45, 40, 65]"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'empty-state'">
            <IdEmpty
              :title="propState.title || 'No Active Deployments'"
              :description="propState.description || 'Deploy your Vue 3 application to see live metrics.'"
              :icon="getEmptyIcon(propState.icon)"
              :action-label="propState.actionLabel || 'Deploy Now'"
              :no-bg="propState.noBg"
              @action="toast.info('Action button clicked!')"
            />
          </template>

          <template v-else-if="component.id === 'card'">
            <div style="width: 100%; max-width: 360px;">
              <IdCard
                :key="`card-${JSON.stringify(propState)}`"
                :title="propState.title"
                :subtitle="propState.subtitle"
                :description="propState.description"
                :tag="propState.tag"
                :image="propState.image"
                :variant="propState.variant || 'default'"
                :padding="propState.padding || 'md'"
                :interactive="!!propState.interactive"
                :show-actions="propState.showActions !== false"
              >
                <template v-if="propState.showActions !== false" #actions>
                  <IdButton size="sm" variant="secondary">Details</IdButton>
                  <IdButton size="sm" variant="primary">Action</IdButton>
                </template>
              </IdCard>
            </div>
          </template>

          <template v-else-if="component.id === 'badge'">
            <div style="display: flex; gap: 24px; align-items: center;">
              <IdBadge :count="propState.count" :show-zero="propState.showZero">
                <IdButton variant="secondary">Notifications</IdButton>
              </IdBadge>
            </div>
          </template>

          <template v-else-if="component.id === 'progress'">
            <div style="width: 100%; max-width: 380px;">
              <IdProgress
                :key="`prog-${propState.size}-${propState.variant}-${propState.color}-${propState.indeterminate}-${propState.label}-${propState.showValue}`"
                :value="propState.value ?? 65"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :color="propState.color || 'blue'"
                :indeterminate="!!propState.indeterminate"
                :label="propState.label !== undefined ? propState.label : 'Upload Progress'"
                :show-value="propState.showValue !== false"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'skeleton'">
            <div style="width: 100%; max-width: 320px; display: flex; justify-content: center;">
              <IdSkeleton
                :key="`skel-${propState.variant}-${propState.size}`"
                :variant="propState.variant || 'rect'"
                :size="propState.size || 'md'"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'spinner'">
            <div style="display: flex; gap: 24px; align-items: center;">
              <IdSpinner :size="propState.size || 'md'" :color="propState.color || 'blue'" :label="propState.label || 'Loading...'" />
            </div>
          </template>

          <template v-else-if="component.id === 'divider'">
            <div style="width: 100%; max-width: 300px; display: flex; flex-direction: column; gap: 16px;">
              <p style="font-size: 14px; color: var(--text-2);">Content above</p>
              <IdDivider :variant="propState.variant || 'hairline'" />
              <p style="font-size: 14px; color: var(--text-2);">Content below</p>
            </div>
          </template>

          <template v-else-if="component.id === 'table'">
            <div style="width: 100%; max-width: 640px;">
              <IdTable
                :title="propState.title || 'Team Members'"
                :count="propState.count"
                :variant="propState.variant || 'default'"
                :columns="[{ key: 'name', label: 'Name', sortable: true }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }]"
                :data="[{ name: 'Jane Smith', role: 'Engineering Lead', status: 'Active' }, { name: 'Alex Rivera', role: 'Product Designer', status: 'Active' }]"
                :selectable="propState.selectable"
                :searchable="propState.searchable"
                :has-row-actions="propState.hasRowActions"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'file-upload'">
            <div style="width: 100%; max-width: 440px; display: flex; justify-content: center; align-items: center;">
              <IdFileUpload
                :variant="propState.variant || 'default'"
                :size="propState.size || 'md'"
                :shape="propState.shape || 'circle'"
                :title="propState.title || 'Upload your photo or file'"
                :hint="propState.hint || 'PNG, JPG, WebP up to 25MB'"
                :button-label="propState.buttonLabel || 'Choose File'"
                :button-variant="propState.buttonVariant || 'primary'"
                :multiple="propState.multiple"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'confirm-dialog'">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <IdButton variant="primary" @click="demoConfirmOpen = true">Trigger Confirm Dialog ({{ propState.variant || 'inset' }})</IdButton>
              <IdConfirmDialog
                v-model="demoConfirmOpen"
                :title="propState.title || 'Delete Security Token'"
                :description="propState.description || 'This action is irreversible. All connected apps will lose access immediately.'"
                :content="propState.content || 'Token ID: sec_live_99f018a38c'"
                :variant="propState.variant || 'inset'"
                :danger="propState.danger"
                :teleport="false"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'date-picker'">
            <div style="width: 100%; max-width: 320px;">
              <IdDatePicker v-model="demoDate" :label="propState.label || 'Select Date'" />
            </div>
          </template>

          <template v-else-if="component.id === 'carousel'">
            <div style="width: 100%; max-width: 500px;">
              <IdCarousel :show-dots="propState.showDots" :show-controls="propState.showControls">
                <IdCard title="Vision Studio Pro" subtitle="Spatial Computing" variant="framed" />
                <IdCard title="Studio Book Pro" subtitle="Mind-blowing speed" variant="glass" />
                <IdCard title="Studio Tab Pro" subtitle="Ultra Retina XDR" variant="hero" />
              </IdCarousel>
            </div>
          </template>

          <template v-else-if="component.id === 'macos-banner'">
            <IdMacOsBanner
              :app-name="propState.appName || 'System Settings'"
              :title="propState.title || 'Software Update Ready'"
              :message="propState.message || 'macOS Sequoia 15.1 is ready to install.'"
              :time="propState.time || 'now'"
              :icon="getEmptyIcon(propState.icon)"
              :action-label="propState.actionLabel || 'Update Now'"
              :secondary-action-label="propState.secondaryActionLabel"
            />
          </template>

          <template v-else-if="component.id === 'file-tree'">
            <div style="width: 100%; max-width: 320px; background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 10px;">
              <IdFileTree
                :items="[
                  { id: '1', name: 'src', children: [{ id: '2', name: 'App.vue' }, { id: '3', name: 'components', children: [{ id: '4', name: 'Navbar.vue' }] }] },
                  { id: '5', name: 'package.json' }
                ]"
                :selected-id="demoTreeSelected"
                :expanded-ids="demoTreeExpanded"
                @select="item => demoTreeSelected = item.id"
                @toggle-expand="id => {
                  const idx = demoTreeExpanded.indexOf(id)
                  if (idx >= 0) demoTreeExpanded.splice(idx, 1)
                  else demoTreeExpanded.push(id)
                }"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'popover'">
            <IdPopover
              :position="propState.position || 'bottom'"
              :title="propState.title || 'Popover Title'"
              :body="propState.body || 'Popover body content and description text goes here.'"
              :size="propState.size || 'md'"
              :variant="propState.variant || 'default'"
            >
              <template #trigger>
                <IdButton variant="secondary">Open Popover Anchor</IdButton>
              </template>
            </IdPopover>
          </template>

          <template v-else-if="component.id === 'command-palette'">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <IdButton variant="primary" @click="demoCommandOpen = true">Trigger Command Palette (⌘K)</IdButton>
              <IdCommandPalette v-model="demoCommandOpen" :groups="[
                { title: 'Navigation', items: [{ id: '1', label: 'Go to Components', shortcut: '⌘C' }, { id: '2', label: 'View Tokens', shortcut: '⌘T' }] },
                { title: 'Actions', items: [{ id: '3', label: 'Copy Installation CLI', shortcut: '⌘I' }] }
              ]" />
            </div>
          </template>

          <template v-else-if="component.id === 'stack'">
            <div style="width: 100%; max-width: 400px;">
              <IdStack :direction="propState.direction || 'vertical'" :gap="propState.gap || 12">
                <div style="padding: 10px; background: var(--hover); border-radius: 8px; font-size: 13px;">Stack Item 1</div>
                <div style="padding: 10px; background: var(--hover); border-radius: 8px; font-size: 13px;">Stack Item 2</div>
                <div style="padding: 10px; background: var(--hover); border-radius: 8px; font-size: 13px;">Stack Item 3</div>
              </IdStack>
            </div>
          </template>

          <template v-else-if="component.id === 'iphone-shell'">
            <div style="display: flex; justify-content: center; padding: 10px 0; width: 100%;">
              <IdIphoneFrame>
                <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 12px;">
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;">
                    DYNAMIC ISLAND DEMO
                  </div>
                  <h3 style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">
                    iOS Shell Simulator
                  </h3>
                  <IdPanel>
                    <IdPanelRow title="Large Title Collapse Nav" detail="iOS Physics" />
                    <IdPanelRow title="Edge Bottom Sheet" detail="Native Sheet" />
                    <IdPanelRow title="Touch Target ≥ 44px" detail="Compliant" />
                  </IdPanel>
                </div>
              </IdIphoneFrame>
            </div>
          </template>

          <template v-else-if="component.id === 'hero-page'">
            <div style="width: 100%; max-height: 540px; overflow-y: auto; border-radius: 16px; border: 1px solid var(--hairline);">
              <HeroTemplate />
            </div>
          </template>

          <template v-else-if="component.id === 'product-page'">
            <div style="width: 100%; max-height: 540px; overflow-y: auto; border-radius: 16px; border: 1px solid var(--hairline);">
              <ProductShowcaseTemplate />
            </div>
          </template>

          <template v-else-if="component.id === 'ai-chat-page'">
            <div style="width: 100%; max-height: 540px; border-radius: 16px; border: 1px solid var(--hairline);">
              <AiChatTemplate :variant="propState.variant || 'full'" />
            </div>
          </template>

          <template v-else-if="component.id === 'dashboard-page'">
            <div style="width: 100%; max-height: 540px; overflow-y: auto; border-radius: 16px; border: 1px solid var(--hairline);">
              <DashboardTemplate />
            </div>
          </template>

          <template v-else-if="component.id === 'auth-page'">
            <div style="width: 100%; max-height: 540px; overflow-y: auto; border-radius: 16px; border: 1px solid var(--hairline);">
              <AuthTemplate :variant="propState.variant || 'default'" />
            </div>
          </template>

          <template v-else-if="component.id === 'settings-page'">
            <div style="width: 100%; max-height: 540px; overflow-y: auto; border-radius: 16px; border: 1px solid var(--hairline);">
              <SettingsTemplate />
            </div>
          </template>

          <template v-else-if="component.id === 'analytics-page'">
            <div style="width: 100%; max-height: 540px; overflow-y: auto; border-radius: 16px; border: 1px solid var(--hairline);">
              <AnalyticsTemplate />
            </div>
          </template>

          <template v-else-if="component.id === 'checkout-page'">
            <div style="width: 100%; max-height: 540px; overflow-y: auto; border-radius: 16px; border: 1px solid var(--hairline);">
              <CheckoutTemplate />
            </div>
          </template>


          <template v-else-if="component.id === 'tour'">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <IdButton variant="primary" @click="demoTourOpen = true">Start Product Tour ✨</IdButton>
              <IdTour v-model="demoTourOpen" :next-label="propState.nextLabel || 'Continue →'" :finish-label="propState.finishLabel || 'Get Started ✨'" :teleport="false" />
            </div>
          </template>

          <template v-else-if="component.id === 'macbook-frame'">
            <div style="width: 100%; max-width: 640px;">
              <IdMacbookFrame
                :app-name="propState.appName || 'Idesign Studio'"
                :color="propState.color || 'space-gray'"
                :show-menu-bar="propState.showMenuBar !== false"
              >
                <div style="padding: 24px; text-align: center;">
                  <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 6px;">Liquid Glass Studio</h3>
                  <p style="font-size: 13px; color: var(--text-2); margin: 0;">MacBook Hardware Chassis Display</p>
                </div>
              </IdMacbookFrame>
            </div>
          </template>

          <template v-else-if="component.id === 'ipad-frame'">
            <div style="width: 100%; max-width: 580px;">
              <IdIpadFrame
                :orientation="propState.orientation || 'landscape'"
                :color="propState.color || 'space-gray'"
                :show-status-bar="propState.showStatusBar !== false"
                :show-home-bar="propState.showHomeBar !== false"
              >
                <div style="padding: 24px; text-align: center;">
                  <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 6px;">iPad Pro Canvas</h3>
                  <p style="font-size: 13px; color: var(--text-2); margin: 0;">Multi-Touch Tablet Frame</p>
                </div>
              </IdIpadFrame>
            </div>
          </template>

          <template v-else-if="component.id === 'sidebar'">
            <div style="height: 420px; width: 100%; max-width: 300px; border: 1px solid var(--hairline); border-radius: 18px; overflow: hidden; display: flex;">
              <IdSidebar
                v-model="activeSidebarItem"
                :title="propState.title !== undefined ? propState.title : 'Idesign Studio'"
                :variant="propState.variant || 'default'"
                :size="propState.size || 'md'"
                :collapsible="propState.collapsible !== false"
                :collapsed="propState.collapsed"
                :groups="[
                  {
                    title: 'Workspace',
                    collapsible: true,
                    items: [
                      { id: 'dashboard', label: 'Overview', icon: '📊' },
                      {
                        id: 'projects',
                        label: 'Projects',
                        icon: '📁',
                        badge: '12',
                        children: [
                          { id: 'all-projects', label: 'All Projects' },
                          { id: 'archived', label: 'Archived' }
                        ]
                      },
                      { id: 'analytics', label: 'Analytics', icon: '⚡' }
                    ]
                  },
                  {
                    title: 'System',
                    items: [
                      { id: 'settings', label: 'Settings', icon: '⚙️', badge: '3' }
                    ]
                  }
                ]"
                :user="{ name: 'Alex Rivera', role: 'Staff Architect' }"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'header'">
            <div style="width: 100%; border: 1px solid var(--hairline); border-radius: 16px; overflow: hidden;">
              <IdHeader
                :title="propState.title || 'Workspace Overview'"
                :eyebrow="propState.eyebrow || 'ANALYTICS'"
                :subtitle="propState.subtitle || 'Real-time telemetry and cluster operations.'"
                :variant="propState.variant || 'glass'"
                :sticky="propState.sticky || false"
              >
                <template #actions>
                  <IdButton variant="secondary" size="sm">Export</IdButton>
                  <IdButton variant="primary" size="sm">Create +</IdButton>
                </template>
              </IdHeader>
            </div>
          </template>

          <template v-else-if="component.id === 'footer'">
            <div style="width: 100%; border: 1px solid var(--hairline); border-radius: 16px; overflow: hidden;">
              <IdFooter
                :columns="[
                  { title: 'Product', links: [{ label: 'Features' }, { label: 'Components' }, { label: 'Templates' }] },
                  { title: 'Resources', links: [{ label: 'Documentation' }, { label: 'Design Tokens' }, { label: 'GitHub' }] }
                ]"
                :variant="propState.variant || 'default'"
                :country-text="propState.countryText || 'United States'"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'banner'">
            <div style="width: 100%; max-width: 600px;">
              <IdBanner
                :message="propState.message || 'Idesign v2.0 is now live with 60+ Liquid Glass components!'"
                :action-label="propState.actionLabel || 'Learn More →'"
                :icon="propState.icon || '✨'"
                :variant="propState.variant || 'accent'"
                :dismissible="propState.dismissible !== false"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'separator'">
            <div style="width: 100%; max-width: 400px; padding: 20px 0;">
              <IdSeparator
                :orientation="propState.orientation || 'horizontal'"
                :label="propState.label || 'OR'"
                :variant="propState.variant || 'hairline'"
                :spacing="propState.spacing || 'md'"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'kbd'">
            <div style="display: flex; gap: 8px; align-items: center;">
              <IdKbd :keys="propState.keys || 'cmd+k'" :size="propState.size || 'md'" :variant="propState.variant || 'default'" />
              <IdKbd keys="opt+shift+p" :size="propState.size || 'md'" :variant="propState.variant || 'default'" />
              <IdKbd keys="esc" :size="propState.size || 'md'" :variant="propState.variant || 'default'" />
            </div>
          </template>

          <template v-else-if="component.id === 'wallpaper'">
            <div style="width: 100%; max-width: 680px; height: 360px; position: relative; border-radius: var(--r-panel); overflow: hidden; border: 1px solid var(--hairline); box-shadow: var(--sh-panel);">
              <IdWallpaper
                :variant="propState.variant || 'gradient'"
                :theme="propState.theme || bgMode"
                :intensity="propState.intensity || 'normal'"
                :direction="propState.direction || '135deg'"
                :mask="propState.mask || 'none'"
                :overlay="propState.overlay || 'none'"
                :animated="propState.animated || false"
                :noise="propState.noise || false"
              >
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px; text-align: center; box-sizing: border-box;">
                  <span style="font-size: 11px; font-weight: 750; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px;">LIQUID GLASS SYSTEM</span>
                  <h3 style="font-size: 24px; font-weight: 750; letter-spacing: -0.025em; margin: 0 0 10px; color: var(--text);">Ambient Wallpaper Engine</h3>
                  <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-2); max-width: 440px; margin: 0 0 20px;">
                    Calm, high-contrast, and hardware-accelerated backgrounds designed with Apple-grade restraint.
                  </p>
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <button type="button" style="background: var(--accent); color: #fff; border: none; height: 34px; padding: 0 18px; border-radius: var(--r-pill); font-size: 13px; font-weight: 600; cursor: pointer;">Explore Preset</button>
                    <button type="button" style="background: var(--surface); color: var(--text); border: 1px solid var(--hairline); height: 34px; padding: 0 18px; border-radius: var(--r-pill); font-size: 13px; font-weight: 600; cursor: pointer;">Copy Tokens</button>
                  </div>
                </div>
              </IdWallpaper>
            </div>
          </template>

          <template v-else-if="component.id === 'pin-input'">
            <IdPinInput
              :length="Number(propState.length) || 6"
              :type="propState.type || 'numeric'"
              :size="propState.size || 'md'"
              :masked="propState.masked || false"
              :separator="propState.separator || false"
              :label="propState.label || 'Verification Code'"
            />
          </template>

          <template v-else-if="component.id === 'time-picker'">
            <IdTimePicker
              :label="propState.label || 'Meeting Start Time'"
              :variant="propState.variant || 'default'"
              :size="propState.size || 'md'"
              :direction="propState.direction || 'horizontal'"
              :radius="propState.radius || 'full'"
              :color="propState.color || 'default'"
              :is-24-hour="propState.is24Hour || false"
              :show-seconds="propState.showSeconds || false"
              :minute-step="Number(propState.minuteStep) || 5"
            />
          </template>

          <template v-else-if="component.id === 'tag-input'">
            <div style="width: 100%; max-width: 440px;">
              <IdTagInput
                v-model="demoTags"
                :label="propState.label || 'Project Tags'"
                :placeholder="propState.placeholder || 'Add tag...'"
                :tag-variant="propState.tagVariant || 'accent'"
                :size="propState.size || 'md'"
                :disabled="propState.disabled || false"
                :readonly="propState.readonly || false"
                :loading="propState.loading || false"
                :clearable="propState.clearable || false"
                :allow-duplicates="propState.allowDuplicates || false"
                :error-text="propState.errorText || ''"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'rating'">
            <IdRating
              v-model="propState.modelValue"
              :label="propState.label || 'Customer Satisfaction'"
              :max="Number(propState.max || propState.count) || 5"
              :allow-half="propState.allowHalf !== false"
              :clearable="propState.clearable !== false"
              :show-score="propState.showScore !== false"
              :size="propState.size || 'md'"
              :color="propState.color || 'amber'"
              :disabled="propState.disabled || false"
              :readonly="propState.readonly || false"
            />
          </template>

          <template v-else-if="component.id === 'number-input'">
            <IdNumberInput
              v-model="propState.modelValue"
              :label="propState.label || 'Border Radius'"
              :unit="propState.unit !== undefined ? propState.unit : 'px'"
              :prefix="propState.prefix || ''"
              :step="propState.step !== undefined && propState.step !== '' ? Number(propState.step) : 2"
              :min="propState.min !== undefined && propState.min !== '' ? Number(propState.min) : 0"
              :max="propState.max !== undefined && propState.max !== '' ? Number(propState.max) : 100"
              :direction="propState.direction || 'horizontal'"
              :size="propState.size || 'md'"
              :variant="propState.variant || 'default'"
              :radius="propState.radius || 'full'"
              :color="propState.color || 'default'"
            />
          </template>

          <template v-else-if="component.id === 'color-picker'">
            <IdColorPicker
              :label="propState.label || 'Accent Color'"
              :size="propState.size || 'md'"
              :mode="propState.mode || 'spectrum'"
              :format="propState.format || 'auto'"
              :inline="propState.inline === true || propState.inline === 'true'"
              :opacity="propState.opacity !== false && propState.opacity !== 'false'"
            />
          </template>

          <template v-else-if="component.id === 'separator' || component.id === 'divider'">
            <div style="width: 100%; max-width: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
              <div v-if="(propState.orientation || 'horizontal') === 'vertical'" style="display: flex; align-items: center; height: 120px; gap: 16px; background: var(--surface); padding: 16px 24px; border-radius: var(--r-panel); box-shadow: var(--sh-card); width: 100%; justify-content: center;">
                <span style="font-size: 13px; font-weight: 500; color: var(--text);">Left Panel</span>
                <IdSeparator
                  orientation="vertical"
                  :variant="propState.variant || 'hairline'"
                  :spacing="propState.spacing || 'md'"
                  :label="propState.label"
                  :icon="propState.icon"
                />
                <span style="font-size: 13px; font-weight: 500; color: var(--text);">Right Panel</span>
              </div>

              <div v-else style="width: 100%; background: var(--surface); padding: 24px; border-radius: var(--r-panel); box-shadow: var(--sh-card);">
                <div style="font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px;">Unified Surface Panel</div>
                <div style="font-size: 12.5px; color: var(--text-2);">Top content section with hairline boundary.</div>
                
                <IdSeparator
                  :orientation="propState.orientation || 'horizontal'"
                  :variant="propState.variant || 'hairline'"
                  :spacing="propState.spacing || 'md'"
                  :label="propState.label"
                  :icon="propState.icon"
                />
                
                <div style="font-size: 12.5px; color: var(--text-2);">Bottom content section resting on the same continuous ground.</div>
              </div>
            </div>
          </template>

          <template v-else-if="component.id === 'theme-toggle'">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 24px;">
              <IdThemeToggle
                :variant="propState.variant || 'button'"
                :size="propState.size || 'md'"
                :transition-effect="propState.transitionEffect || 'reveal'"
                :show-label="propState.showLabel !== false && propState.showLabel !== 'false'"
                :light-label="propState.lightLabel || 'Light'"
                :dark-label="propState.darkLabel || 'Dark'"
                :auto-label="propState.autoLabel || 'Auto'"
                :animated="propState.animated !== false && propState.animated !== 'false'"
                :disabled="propState.disabled === true || propState.disabled === 'true'"
              />
              <div style="font-size: 12.5px; color: var(--text-2); text-align: center; max-width: 320px;">
                Click to switch themes with native smooth animated transitions.
              </div>
            </div>
          </template>

          <template v-else-if="component.id === 'qr-code'">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 24px;">
              <IdQRCode
                :key="`qr-${JSON.stringify(propState)}`"
                :value="propState.value || 'https://idesign.io'"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :error-correction="propState.errorCorrection || 'M'"
                :color="propState.color"
                :background="propState.background"
                :margin="Number(propState.margin ?? 2)"
                :label="propState.label"
                :caption="propState.caption"
                :disabled="propState.disabled"
                :logo-src="propState.logo ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80' : undefined"
                :downloadable="propState.downloadable"
                @download="toastInstance.success('QR Code SVG downloaded!')"
              />
            </div>
          </template>

          <template v-else>
            <div style="text-align: center; color: var(--text-3); font-size: 14px;">
              Preview for this component is rendered from the code snippet.
            </div>
          </template>
          </div>
        </div>

        <!-- Prop Controls Drawer -->
        <div v-if="hasProps" class="controls-panel">
          <div class="controls-title">Interactive Props</div>
          <div class="props-grid">
            <div v-for="(spec, key) in component.props" :key="key" class="prop-item">
              <label class="prop-label">{{ key }}</label>
              
              <input
                v-if="spec.type === 'text'"
                v-model="propState[key]"
                type="text"
                class="prop-input"
              />

              <input
                v-else-if="spec.type === 'number'"
                v-model.number="propState[key]"
                type="number"
                class="prop-input"
              />

              <select
                v-else-if="spec.type === 'select'"
                v-model="propState[key]"
                class="prop-select"
              >
                <option v-for="opt in spec.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>

              <IdToggle
                v-else-if="spec.type === 'boolean'"
                v-model="propState[key]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Installation Section -->
      <div class="playground-section install-section">
        <div class="playground-section-heading">
          <div class="heading-left">
            <h3 class="section-title">Installation</h3>
          </div>
          <div class="view-mode-toggles">
            <button
              :class="['mode-btn', { active: installPkgTab === 'cli' }]"
              @click="installPkgTab = 'cli'"
            >CLI Add</button>
            <button
              :class="['mode-btn', { active: installPkgTab === 'npm' }]"
              @click="installPkgTab = 'npm'"
            >npm</button>
            <button
              :class="['mode-btn', { active: installPkgTab === 'pnpm' }]"
              @click="installPkgTab = 'pnpm'"
            >pnpm</button>
            <button
              :class="['mode-btn', { active: installPkgTab === 'yarn' }]"
              @click="installPkgTab = 'yarn'"
            >yarn</button>
            <button
              :class="['mode-btn', { active: installPkgTab === 'nuxt' }]"
              @click="installPkgTab = 'nuxt'"
            >Nuxt 3</button>
          </div>
        </div>

        <div class="install-panel">
          <!-- Terminal Command Block -->
          <div class="terminal-block">
            <div class="code-line">
              <span class="prompt-sym">$</span>
              <code>{{ activeInstallCommand }}</code>
            </div>
            <button
              type="button"
              class="terminal-copy-btn"
              @click="copySnippetText(activeInstallCommand, 'Install command')"
            >
              <svg v-if="installCopied" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>{{ installCopied ? 'Copied' : 'Copy' }}</span>
            </button>
          </div>

          <!-- Setup / Import Context when applicable -->
          <div v-if="installPkgTab !== 'cli'" class="install-sub-snippet">
            <div class="sub-snippet-header">
              <span class="sub-snippet-label">{{ installPkgTab === 'nuxt' ? 'nuxt.config.ts' : 'Component Import (SFC / Script)' }}</span>
              <button
                type="button"
                class="sub-copy-btn"
                @click="copySnippetText(activeImportSnippet, 'Import statement')"
              >
                Copy Import
              </button>
            </div>
            <pre class="sub-snippet-code"><code>{{ activeImportSnippet }}</code></pre>
          </div>
          <div v-else class="cli-info-note">
            <span class="cli-note-icon">✨</span>
            <span class="cli-note-text">
              Directly generates <code>{{ componentTag }}.vue</code> into your <code>components/idesign/</code> folder with zero runtime lock-in.
            </span>
          </div>
        </div>
      </div>

      <!-- 4. Usage Section -->
      <div class="playground-section usage-section">
        <div class="playground-section-heading">
          <div class="heading-left">
            <h3 class="section-title">Usage</h3>
          </div>
          <div class="view-mode-toggles">
            <button
              :class="['mode-btn', { active: codeTab === 'vue' }]"
              @click="codeTab = 'vue'"
            >Vue 3 SFC</button>
            <button
              :class="['mode-btn', { active: codeTab === 'nuxt' }]"
              @click="codeTab = 'nuxt'"
            >Nuxt 3</button>
            <button
              :class="['mode-btn', { active: codeTab === 'html' }]"
              @click="codeTab = 'html'"
            >HTML + CSS</button>
          </div>
        </div>

        <div class="code-inspector">
          <div class="code-header">
            <span class="code-file-label">{{ codeTab === 'vue' ? `${componentTag}.vue` : (codeTab === 'nuxt' ? 'Nuxt Auto-Import Template' : 'index.html') }}</span>
            <button type="button" class="copy-code-btn" @click="copyCode">
              <svg v-if="codeCopied" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              {{ codeCopied ? 'Copied Code!' : 'Copy Code' }}
            </button>
          </div>

          <div class="code-display">
            <pre><code>{{ displayedCode }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 5. Component Spec API (Props) -->
      <div class="playground-section api-docs-section">
        <div class="playground-section-heading">
          <div class="heading-left">
            <h3 class="section-title">Component API Specification</h3>
          </div>
          <span class="spec-badge-count">{{ activeComponentPropsList.length }} Props Defined</span>
        </div>

        <div class="api-table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th style="width: 18%;">Prop</th>
                <th style="width: 14%;">Type</th>
                <th style="width: 12%;">Required</th>
                <th style="width: 14%;">Default</th>
                <th style="width: 20%;">Allowed Values</th>
                <th style="width: 22%;">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="propItem in activeComponentPropsList" :key="propItem.name">
                <td class="prop-name">
                  <code>{{ propItem.name }}</code>
                </td>
                <td class="type-name">
                  <code>{{ propItem.type }}</code>
                </td>
                <td>
                  <span :class="['req-chip', { required: propItem.required }]">
                    {{ propItem.required ? 'Required' : 'Optional' }}
                  </span>
                </td>
                <td class="default-val">
                  <code>{{ propItem.default !== undefined ? (typeof propItem.default === 'object' ? JSON.stringify(propItem.default) : propItem.default) : '—' }}</code>
                </td>
                <td class="options-cell">
                  <span v-if="propItem.options && propItem.options.length" class="options-list">
                    <code v-for="opt in propItem.options" :key="opt" class="opt-pill">{{ opt }}</code>
                  </span>
                  <span v-else class="text-muted">—</span>
                </td>
                <td class="prop-desc">
                  <div class="desc-text">{{ propItem.description }}</div>
                  <div v-if="propItem.example" class="prop-example">
                    <span class="example-label">Example:</span> <code>{{ propItem.example }}</code>
                  </div>
                </td>
              </tr>
              <tr v-if="!activeComponentPropsList.length">
                <td colspan="6" class="no-props">No props required — plug-and-play component.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 6. Events Section -->
      <div class="playground-section events-docs-section">
        <div class="playground-section-heading">
          <div class="heading-left">
            <h3 class="section-title">Events</h3>
          </div>
          <span v-if="activeComponentEvents.length" class="spec-badge-count">{{ activeComponentEvents.length }} Emitted</span>
        </div>

        <div v-if="activeComponentEvents.length" class="api-table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th style="width: 22%;">Event Name</th>
                <th style="width: 18%;">Payload Type</th>
                <th style="width: 32%;">Description & Trigger</th>
                <th style="width: 28%;">Usage Example</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="evt in activeComponentEvents" :key="evt.name">
                <td class="event-name">
                  <code>{{ evt.name }}</code>
                </td>
                <td class="type-name">
                  <code>{{ evt.payload }}</code>
                </td>
                <td class="prop-desc">
                  <div class="desc-text font-medium">{{ evt.description }}</div>
                  <div v-if="evt.trigger" class="trigger-meta">
                    <span class="meta-label">Triggered:</span> {{ evt.trigger }}
                  </div>
                </td>
                <td class="event-example-cell">
                  <pre class="mini-example-code"><code>{{ evt.example }}</code></pre>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="empty-spec-card">
          <span class="empty-spec-icon">🛡️</span>
          <div class="empty-spec-info">
            <div class="empty-spec-title">No custom events emitted</div>
            <div class="empty-spec-desc">This component operates statelessly or passes native DOM events directly to the container.</div>
          </div>
        </div>
      </div>

      <!-- 7. Component Customization & Theming Guide -->
      <div class="playground-section customization-docs-section">
        <div class="playground-section-heading">
          <div class="heading-left">
            <h3 class="section-title">Component Customization & Theming Guide</h3>
          </div>
          <div class="view-mode-toggles">
            <button
              :class="['mode-btn', { active: activeCustomTab === 'slots' }]"
              @click="activeCustomTab = 'slots'"
            >Slots</button>
            <button
              :class="['mode-btn', { active: activeCustomTab === 'ui-keys' }]"
              @click="activeCustomTab = 'ui-keys'"
            >UI Slots & Inline :ui</button>
            <button
              :class="['mode-btn', { active: activeCustomTab === 'theme' }]"
              @click="activeCustomTab = 'theme'"
            >Global App Config</button>
            <button
              :class="['mode-btn', { active: activeCustomTab === 'priority' }]"
              @click="activeCustomTab = 'priority'"
            >Priority</button>
          </div>
        </div>

        <!-- 7a. Slots Tab -->
        <div v-if="activeCustomTab === 'slots'" class="customization-card-panel">
          <div v-if="activeComponentSlots.length" class="slots-table-wrapper">
            <table class="api-table">
              <thead>
                <tr>
                  <th style="width: 22%;">Slot Name</th>
                  <th style="width: 38%;">Purpose</th>
                  <th style="width: 18%;">Available Props</th>
                  <th style="width: 22%;">Template Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="slotItem in activeComponentSlots" :key="slotItem.name">
                  <td class="slot-name">
                    <code>#{{ slotItem.name }}</code>
                  </td>
                  <td class="prop-desc">{{ slotItem.purpose }}</td>
                  <td class="type-name">
                    <code>{{ slotItem.props || '—' }}</code>
                  </td>
                  <td class="event-example-cell">
                    <pre class="mini-example-code"><code>{{ slotItem.example }}</code></pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="empty-spec-card">
            <span class="empty-spec-icon">🧩</span>
            <div class="empty-spec-info">
              <div class="empty-spec-title">Standard Default Slot</div>
              <div class="empty-spec-desc">Accepts standard children via <code>&lt;template #default&gt;</code> or direct nested template markup.</div>
            </div>
          </div>
        </div>

        <!-- 7b. UI Slots / Class Customization & Inline :ui -->
        <div v-else-if="activeCustomTab === 'ui-keys'" class="customization-card-panel">
          <div class="ui-slots-intro">
            <p class="ui-guide-p">
              Idesign components expose semantic <code>ui</code> slot keys for granular styling control without breaking default design system tokens.
            </p>
          </div>

          <div class="ui-keys-grid">
            <div v-for="(desc, keyName) in activeComponentUiKeys" :key="keyName" class="ui-key-card">
              <div class="ui-key-name"><code>{{ keyName }}</code></div>
              <div class="ui-key-desc">{{ desc }}</div>
            </div>
          </div>

          <div class="inline-ui-example-block">
            <div class="code-box-header">
              <span class="code-box-badge">Inline Instance :ui Customization</span>
              <button type="button" class="copy-cust-btn" @click="copySnippetText(inlineUiExampleSnippet, 'Inline :ui snippet')">
                Copy Code
              </button>
            </div>
            <pre class="recipe-pre"><code>{{ inlineUiExampleSnippet }}</code></pre>
          </div>
        </div>

        <!-- 7c. Global Theme Configuration -->
        <div v-else-if="activeCustomTab === 'theme'" class="customization-card-panel">
          <div class="ui-slots-intro">
            <p class="ui-guide-p">
              Configure component defaults globally across your entire app via Nuxt <code>app.config.ts</code> or Vue <code>createIdesign</code> plugin configuration.
            </p>
          </div>

          <div class="code-box-header">
            <span class="code-box-badge">app.config.ts / createIdesign() Global Theme</span>
            <button type="button" class="copy-cust-btn" @click="copySnippetText(globalThemeConfigSnippet, 'Global theme snippet')">
              Copy Config
            </button>
          </div>
          <pre class="recipe-pre"><code>{{ globalThemeConfigSnippet }}</code></pre>
        </div>

        <!-- 7d. Customization Priority -->
        <div v-else-if="activeCustomTab === 'priority'" class="customization-card-panel priority-panel">
          <div class="priority-steps">
            <div class="priority-step-item">
              <div class="step-badge num-1">1. Global Theme</div>
              <div class="step-content">
                <div class="step-title"><code>defineAppConfig({ ui: { Component: { ... } } })</code></div>
                <div class="step-desc">Establishes application-wide design defaults, base classes, and variants.</div>
              </div>
            </div>

            <div class="priority-divider-arrow">↓</div>

            <div class="priority-step-item">
              <div class="step-badge num-2">2. Component Defaults</div>
              <div class="step-content">
                <div class="step-title">Library Built-in Props & Tokens</div>
                <div class="step-desc">Standard Liquid Glass token defaults (radius, shadow, transitions).</div>
              </div>
            </div>

            <div class="priority-divider-arrow">↓</div>

            <div class="priority-step-item">
              <div class="step-badge num-3">3. Component Props</div>
              <div class="step-content">
                <div class="step-title"><code>&lt;IdComponent variant="glass" size="lg" /&gt;</code></div>
                <div class="step-desc">Explicit props passed to the specific component instance.</div>
              </div>
            </div>

            <div class="priority-divider-arrow">↓</div>

            <div class="priority-step-item is-highest">
              <div class="step-badge num-4">4. Instance :ui (Highest Precedence)</div>
              <div class="step-content">
                <div class="step-title"><code>&lt;IdComponent :ui="{ base: 'custom-class' }" /&gt;</code></div>
                <div class="step-desc">Overrides any global or prop styles specifically for this exact node.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 8. Accessibility Section -->
      <!-- <div class="playground-section a11y-section">
        <div class="playground-section-heading">
          <div class="heading-left">
            <span class="section-num">08</span>
            <h3 class="section-title">Accessibility & Keyboard Navigation</h3>
          </div>
          <span class="a11y-badge">WCAG 2.1 AA Compliant</span>
        </div>

        <div class="a11y-panel">
          <div class="a11y-grid">
            <div class="a11y-card">
              <div class="a11y-card-header">
                <span class="a11y-icon">⌨️</span>
                <span class="a11y-title">Keyboard Navigation</span>
              </div>
              <p class="a11y-desc">{{ activeComponentA11y.keyboard }}</p>
            </div>

            <div class="a11y-card">
              <div class="a11y-card-header">
                <span class="a11y-icon">🏷️</span>
                <span class="a11y-title">ARIA Attributes & Roles</span>
              </div>
              <p class="a11y-desc">{{ activeComponentA11y.aria }}</p>
            </div>

            <div class="a11y-card">
              <div class="a11y-card-header">
                <span class="a11y-icon">🎯</span>
                <span class="a11y-title">Focus Management</span>
              </div>
              <p class="a11y-desc">{{ activeComponentA11y.focus }}</p>
            </div>

            <div class="a11y-card">
              <div class="a11y-card-header">
                <span class="a11y-icon">🔊</span>
                <span class="a11y-title">Screen Reader Semantics</span>
              </div>
              <p class="a11y-desc">{{ activeComponentA11y.screenReader }}</p>
            </div>
          </div>

          <div class="a11y-footer-note">
            <span class="a11y-check-icon">✓</span>
            <span><strong>Touch Target Compliance:</strong> Interactive hit targets are strictly sized ≥ 44×44px per Apple Human Interface Guidelines and WCAG 2.5.5.</span>
          </div>
        </div>
      </div> -->

      <!-- 9. Related Components Section -->
      <!-- <div v-if="activeRelatedComponents.length" class="playground-section related-section">
        <div class="playground-section-heading">
          <div class="heading-left">
            <span class="section-num">09</span>
            <h3 class="section-title">Related Components</h3>
          </div>
        </div>

        <div class="related-grid">
          <div
            v-for="rel in activeRelatedComponents"
            :key="rel.id"
            class="related-card"
          >
            <div class="rel-info">
              <div class="rel-name">{{ rel.name }}</div>
              <div class="rel-cat">{{ rel.category }}</div>
            </div>
            <code class="rel-tag">{{ rel.tag }}</code>
          </div>
        </div>
      </div> -->

    </div>
  </IdModal>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue'
import IdModal from './idesign/IdModal.vue'
import IdGlassNav from './idesign/IdGlassNav.vue'
import IdSegmentedControl from './idesign/IdSegmentedControl.vue'
import IdButton from './idesign/IdButton.vue'
import IdPanel from './idesign/IdPanel.vue'
import IdPanelRow from './idesign/IdPanelRow.vue'
import IdHeroCta from './idesign/IdHeroCta.vue'
import IdToggle from './idesign/IdToggle.vue'
import IdLiveDot from './idesign/IdLiveDot.vue'
import IdIphoneFrame from './idesign/IdIphoneFrame.vue'
import IdInput from './idesign/IdInput.vue'
import IdTextarea from './idesign/IdTextarea.vue'
import IdSelect from './idesign/IdSelect.vue'
import IdCheckbox from './idesign/IdCheckbox.vue'
import IdRadioGroup from './idesign/IdRadioGroup.vue'
import IdSlider from './idesign/IdSlider.vue'
import IdAvatar from './idesign/IdAvatar.vue'
import IdBadge from './idesign/IdBadge.vue'
import IdProgress from './idesign/IdProgress.vue'
import IdSkeleton from './idesign/IdSkeleton.vue'
import IdSpinner from './idesign/IdSpinner.vue'
import IdTooltip from './idesign/IdTooltip.vue'
import IdAccordion from './idesign/IdAccordion.vue'
import IdTabs from './idesign/IdTabs.vue'
import IdAlert from './idesign/IdAlert.vue'
import IdTag from './idesign/IdTag.vue'
import IdDivider from './idesign/IdDivider.vue'
import IdBreadcrumbs from './idesign/IdBreadcrumbs.vue'
import IdPagination from './idesign/IdPagination.vue'
import IdBottomSheet from './idesign/IdBottomSheet.vue'
import IdDrawer from './idesign/IdDrawer.vue'
import IdDropdownMenu from './idesign/IdDropdownMenu.vue'
import IdTable from './idesign/IdTable.vue'
import IdFileUpload from './idesign/IdFileUpload.vue'
import IdConfirmDialog from './idesign/IdConfirmDialog.vue'
import IdStack from './idesign/IdStack.vue'
import IdCommandPalette from './idesign/IdCommandPalette.vue'
import IdDatePicker from './idesign/IdDatePicker.vue'
import IdCard from './idesign/IdCard.vue'
import IdProjectSection from './idesign/IdProjectSection.vue'
import IdProjectCard from './idesign/IdProjectCard.vue'
import IdImageFrame from './idesign/IdImageFrame.vue'
import IdCarousel from './idesign/IdCarousel.vue'
import IdMacOsBanner from './idesign/IdMacOsBanner.vue'
import IdFileTree from './idesign/IdFileTree.vue'
import IdPopover from './idesign/IdPopover.vue'
import IdDock from './idesign/IdDock.vue'
import IdAvatarGroup from './idesign/IdAvatarGroup.vue'
import IdSparkline from './idesign/IdSparkline.vue'
import IdStat from './idesign/IdStat.vue'
import IdEmpty from './idesign/IdEmpty.vue'
import IdToast from './idesign/IdToast.vue'
import IdStepper from './idesign/IdStepper.vue'
import IdTimeline from './idesign/IdTimeline.vue'
import IdGrid from './idesign/IdGrid.vue'
import IdBarChart from './idesign/IdBarChart.vue'
import IdPieChart from './idesign/IdPieChart.vue'
import IdTour from './idesign/IdTour.vue'
import HeroTemplate from './templates/HeroTemplate.vue'
import ProductShowcaseTemplate from './templates/ProductShowcaseTemplate.vue'
import AiChatTemplate from './templates/AiChatTemplate.vue'
import DashboardTemplate from './templates/DashboardTemplate.vue'
import AuthTemplate from './templates/AuthTemplate.vue'
import SettingsTemplate from './templates/SettingsTemplate.vue'
import AnalyticsTemplate from './templates/AnalyticsTemplate.vue'
import CheckoutTemplate from './templates/CheckoutTemplate.vue'
import IdMacbookFrame from './idesign/IdMacbookFrame.vue'
import IdIpadFrame from './idesign/IdIpadFrame.vue'
import IdSidebar from './idesign/IdSidebar.vue'
import IdHeader from './idesign/IdHeader.vue'
import IdFooter from './idesign/IdFooter.vue'
import IdBanner from './idesign/IdBanner.vue'
import IdSeparator from './idesign/IdSeparator.vue'
import IdKbd from './idesign/IdKbd.vue'
import IdWallpaper from './idesign/IdWallpaper.vue'
import IdPinInput from './idesign/IdPinInput.vue'
import IdTimePicker from './idesign/IdTimePicker.vue'
import IdTagInput from './idesign/IdTagInput.vue'
import IdRating from './idesign/IdRating.vue'
import IdNumberInput from './idesign/IdNumberInput.vue'
import IdColorPicker from './idesign/IdColorPicker.vue'
import IdMobileNavbar from './idesign/IdMobileNavbar.vue'
import IdThemeToggle from './idesign/IdThemeToggle.vue'
import IdQRCode from './idesign/IdQRCode.vue'


import { Search, FolderOpen, Inbox, AlertCircle, Sparkles, Lock, Zap, Box, Folder, Check, Wifi, Bluetooth, Bell, Home, Compass, User } from '@lucide/vue'
import { useToast } from '../composables/useToast'

const iconMap = {
  Search,
  FolderOpen,
  Inbox,
  AlertCircle,
  Sparkles,
  Lock,
  Zap,
  Box,
  Folder
}

const getEmptyIcon = (icon) => {
  if (!icon) return '🔍'
  if (iconMap[icon]) return iconMap[icon]
  return icon
}

const props = defineProps({
  component: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'toast'])

const bgMode = ref('light')
const activeSidebarItem = ref('dashboard')

const setMode = (mode) => {
  bgMode.value = mode
}

onMounted(() => {
  const isDarkGlobal = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark'
  bgMode.value = isDarkGlobal ? 'dark' : 'light'
})

const codeTab = ref('vue')
const codeCopied = ref(false)
const installCopied = ref(false)
const installPkgTab = ref('cli')
const activeCustomTab = ref('slots')

const demoModalOpen = ref(false)
const demoTreeSelected = ref('2')
const demoTreeExpanded = ref(['1', '3'])
const demoSheetOpen = ref(false)
const demoDrawerOpen = ref(false)
const demoTab = ref('overview')
const demoPage = ref(1)
const demoMobileNav = ref('home')

const toastInstance = useToast()
const triggerToast = (type) => {
  const msg = type === 'success' ? 'Settings saved successfully' : type === 'warning' ? 'Storage reaching capacity' : type === 'error' ? 'Failed to synchronize data' : 'New update ready'
  toastInstance[type](msg, { description: 'All changes synchronized to your cloud account.' })
}
const demoText = ref('Sample text')
const demoTags = ref(['Design', 'Vue3', 'LiquidGlass'])
const demoTextarea = ref('')
const demoSelect = ref('Vue 3')
const demoCheck1 = ref(true)
const demoCheck2 = ref(false)
const demoRadio = ref('Pro')
const demoSlider = ref(65)
const demoToggle = ref(true)
const demoStep = ref(1)
const demoConfirmOpen = ref(false)
const demoDate = ref('2026-08-15')
const demoCommandOpen = ref(false)
const demoTourOpen = ref(false)

const propState = reactive({})

watch(() => props.component, (newComp) => {
  if (newComp) {
    const isDarkGlobal = document.documentElement.classList.contains('dark')
    bgMode.value = isDarkGlobal ? 'dark' : 'light'

    // Reset propState keys cleanly
    Object.keys(propState).forEach(k => delete propState[k])
  }
  if (newComp && newComp.props) {
    Object.keys(newComp.props).forEach(k => {
      propState[k] = newComp.props[k].default
    })
  }
}, { immediate: true })

const hasProps = computed(() => {
  return props.component && props.component.props && Object.keys(props.component.props).length > 0
})

const componentTagMap = {
  'button': 'IdButton',
  'liquid-button': 'IdButton',
  'input': 'IdInput',
  'textarea': 'IdTextarea',
  'select': 'IdSelect',
  'checkbox': 'IdCheckbox',
  'radio-group': 'IdRadioGroup',
  'radio': 'IdRadioGroup',
  'slider': 'IdSlider',
  'toggle': 'IdToggle',
  'ios-switch': 'IdToggle',
  'modal': 'IdModal',
  'liquid-modal': 'IdModal',
  'dialog': 'IdDialog',
  'bottom-sheet': 'IdBottomSheet',
  'drawer': 'IdDrawer',
  'dropdown-menu': 'IdDropdownMenu',
  'popover': 'IdPopover',
  'tooltip': 'IdTooltip',
  'tabs': 'IdTabs',
  'accordion': 'IdAccordion',
  'segmented-control': 'IdSegmentedControl',
  'mobile-navbar': 'IdMobileNavbar',
  'table': 'IdTable',
  'tag': 'IdTag',
  'badge': 'IdBadge',
  'avatar': 'IdAvatar',
  'avatar-group': 'IdAvatarGroup',
  'progress': 'IdProgress',
  'alert': 'IdAlert',
  'toast': 'IdToast',
  'card': 'IdCard',
  'panel': 'IdPanel',
  'unified-panel': 'IdPanel',
  'panel-row': 'IdPanelRow',
  'hero-cta': 'IdHeroCta',
  'glass-nav': 'IdGlassNav',
  'live-indicator': 'IdLiveDot',
  'confirm-dialog': 'IdConfirmDialog',
  'command-palette': 'IdCommandPalette',
  'date-picker': 'IdDatePicker',
  'time-picker': 'IdTimePicker',
  'tag-input': 'IdTagInput',
  'rating': 'IdRating',
  'number-input': 'IdNumberInput',
  'color-picker': 'IdColorPicker',
  'pin-input': 'IdPinInput',
  'file-upload': 'IdFileUpload',
  'file-tree': 'IdFileTree',
  'carousel': 'IdCarousel',
  'dock': 'IdDock',
  'stat': 'IdStat',
  'sparkline': 'IdSparkline',
  'spinner': 'IdSpinner',
  'skeleton': 'IdSkeleton',
  'divider': 'IdDivider',
  'stack': 'IdStack',
  'stepper': 'IdStepper',
  'timeline': 'IdTimeline',
  'grid': 'IdGrid',
  'bar-chart': 'IdBarChart',
  'pie-chart': 'IdPieChart',
  'tour': 'IdTour',
  'header': 'IdHeader',
  'footer': 'IdFooter',
  'banner': 'IdBanner',
  'separator': 'IdSeparator',
  'kbd': 'IdKbd',
  'wallpaper': 'IdWallpaper',
  'empty-state': 'IdEmpty',
  'qr-code': 'IdQRCode'
}

const cliTargetName = computed(() => {
  if (!props.component) return 'button'
  const id = props.component.id
  if (id === 'liquid-button') return 'button'
  if (id === 'ios-switch') return 'toggle'
  if (id === 'liquid-modal') return 'modal'
  if (id === 'unified-panel') return 'panel'
  return id || props.component.name?.toLowerCase().replace(/^id/, '') || 'button'
})

const componentTag = computed(() => {
  if (!props.component) return 'IdButton'
  const id = props.component.id
  if (componentTagMap[id]) return componentTagMap[id]
  const cleanName = props.component.name ? props.component.name.replace(/[^a-zA-Z0-9]/g, '') : 'Component'
  return cleanName.startsWith('Id') ? cleanName : 'Id' + cleanName
})

const activeInstallCommand = computed(() => {
  const target = cliTargetName.value
  if (installPkgTab.value === 'cli') {
    return `npx idesign add ${target}`
  } else if (installPkgTab.value === 'npm') {
    return 'npm install @idesign/vue'
  } else if (installPkgTab.value === 'pnpm') {
    return 'pnpm add @idesign/vue'
  } else if (installPkgTab.value === 'yarn') {
    return 'yarn add @idesign/vue'
  } else {
    return 'npx nuxi module add @idesign/vue'
  }
})

const activeImportSnippet = computed(() => {
  const tag = componentTag.value
  if (installPkgTab.value === 'nuxt') {
    return `// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@idesign/vue/nuxt']
})

// In templates, components auto-import with zero manual imports:
<template>
  <${tag} />
</template>`
  }
  return `import { ${tag} } from '@idesign/vue'
import '@idesign/vue/tokens'`
})

const displayedCode = computed(() => {
  if (!props.component) return ''
  if (codeTab.value === 'vue') {
    return typeof props.component.vueCode === 'function' ? props.component.vueCode(propState) : props.component.vueCode
  } else if (codeTab.value === 'nuxt') {
    if (typeof props.component.nuxtCode === 'function') {
      return props.component.nuxtCode(propState)
    }
    return props.component.nuxtCode || (typeof props.component.vueCode === 'function' ? props.component.vueCode(propState) : props.component.vueCode)
  } else {
    const rawHtml = typeof props.component.htmlCode === 'function' ? props.component.htmlCode(propState) : props.component.htmlCode
    if (!rawHtml) return ''
    return `<!-- 1. Include Liquid Glass Tokens & Styles in <head> -->
<link rel="stylesheet" href="https://unpkg.com/@idesign/vue@latest/dist/idesign.css">

<!-- 2. Component HTML Markup -->
${rawHtml}`
  }
})

const copyCode = () => {
  navigator.clipboard.writeText(displayedCode.value)
  codeCopied.value = true
  emit('toast', `Copied ${props.component.name} code to clipboard`)
  setTimeout(() => {
    codeCopied.value = false
  }, 2000)
}

const copySnippetText = (text, label) => {
  navigator.clipboard.writeText(text)
  installCopied.value = true
  emit('toast', `Copied ${label} to clipboard`)
  setTimeout(() => {
    installCopied.value = false
  }, 2000)
}

// ─── 5. Component Props List Aggregator ───
const activeComponentPropsList = computed(() => {
  if (!props.component) return []
  const list = []
  const compProps = props.component.props || {}

  Object.keys(compProps).forEach(key => {
    const spec = compProps[key]
    list.push({
      name: key,
      type: spec.type === 'select' ? 'string' : (spec.type || 'any'),
      required: !!spec.required,
      default: spec.default,
      options: spec.options || null,
      description: spec.description || 'Configurable component property.',
      example: spec.type === 'boolean' ? `:${key}="true"` : (spec.default ? `${key}="${spec.default}"` : null)
    })
  })

  // Add standard 'ui' prop if not already defined
  if (!compProps.ui) {
    list.push({
      name: 'ui',
      type: 'Record<string, string>',
      required: false,
      default: '{}',
      options: null,
      description: 'Granular slot class overrides for internal component DOM elements.',
      example: `:ui="{ base: 'custom-class' }"`
    })
  }

  return list
})

// ─── 6. Events Documentation Map ───
const componentEventsMap = {
  'liquid-button': [
    { name: 'click', payload: 'MouseEvent', description: 'Emitted when the button is clicked by cursor or keyboard interaction.', trigger: 'User clicks or presses Enter/Space', example: '<IdButton @click="handleClick" />' }
  ],
  'button': [
    { name: 'click', payload: 'MouseEvent', description: 'Emitted when the button is clicked by cursor or keyboard interaction.', trigger: 'User clicks or presses Enter/Space', example: '<IdButton @click="handleClick" />' }
  ],
  'input': [
    { name: 'update:modelValue', payload: 'string | number', description: 'Primary v-model update event emitted on input modification.', trigger: 'Keystroke in input element', example: '<IdInput v-model="searchText" />' },
    { name: 'change', payload: 'Event', description: 'Emitted when the input commits a change (e.g. on blur).', trigger: 'Input field blur or commit', example: '<IdInput @change="handleChange" />' },
    { name: 'clear', payload: 'void', description: 'Emitted when the trailing clear icon is clicked.', trigger: 'Clicking clear button', example: '<IdInput clearable @clear="handleClear" />' }
  ],
  'textarea': [
    { name: 'update:modelValue', payload: 'string', description: 'Fired as user inputs text into the textarea.', trigger: 'User typing in textarea', example: '<IdTextarea v-model="notes" />' },
    { name: 'change', payload: 'Event', description: 'Emitted when textarea commits change on blur.', trigger: 'Textarea blur', example: '<IdTextarea @change="saveDraft" />' }
  ],
  'select': [
    { name: 'update:modelValue', payload: 'string | number | object', description: 'Emitted when a new option is chosen.', trigger: 'Option click or Enter selection', example: '<IdSelect v-model="selected" />' },
    { name: 'change', payload: 'any', description: 'Emitted on selection change.', trigger: 'Selection committed', example: '<IdSelect @change="onSelectChange" />' },
    { name: 'clear', payload: 'void', description: 'Emitted when cleared.', trigger: 'Clear icon click', example: '<IdSelect @clear="onClear" />' }
  ],
  'checkbox': [
    { name: 'update:modelValue', payload: 'boolean', description: 'Emitted when the checkbox state toggles.', trigger: 'Checkbox click or Space key', example: '<IdCheckbox v-model="accepted" />' },
    { name: 'change', payload: 'boolean', description: 'Fired on state change.', trigger: 'State committed', example: '<IdCheckbox @change="onToggle" />' }
  ],
  'radio-group': [
    { name: 'update:modelValue', payload: 'string | number', description: 'Emitted when a new radio option is selected.', trigger: 'Option click or arrow navigation', example: '<IdRadioGroup v-model="plan" />' }
  ],
  'slider': [
    { name: 'update:modelValue', payload: 'number', description: 'Emitted continuously as the slider thumb moves.', trigger: 'Thumb drag or arrow keys', example: '<IdSlider v-model="volume" />' },
    { name: 'change', payload: 'number', description: 'Emitted when the thumb release commits value.', trigger: 'Mouseup or touchend', example: '<IdSlider @change="onSliderCommit" />' }
  ],
  'ios-switch': [
    { name: 'update:modelValue', payload: 'boolean', description: 'Emitted when the toggle switch state flips.', trigger: 'Switch click or keyboard Space', example: '<IdToggle v-model="notifications" />' }
  ],
  'toggle': [
    { name: 'update:modelValue', payload: 'boolean', description: 'Emitted when the toggle switch state flips.', trigger: 'Switch click or keyboard Space', example: '<IdToggle v-model="notifications" />' }
  ],
  'liquid-modal': [
    { name: 'update:modelValue', payload: 'boolean', description: 'Controls modal open/closed state for v-model.', trigger: 'Close button, backdrop click, or Esc key', example: '<IdModal v-model="isOpen" />' },
    { name: 'close', payload: 'void', description: 'Emitted when dismissal is requested.', trigger: 'Escape key or Close button', example: '<IdModal @close="handleClose" />' }
  ],
  'modal': [
    { name: 'update:modelValue', payload: 'boolean', description: 'Controls modal open/closed state for v-model.', trigger: 'Close button, backdrop click, or Esc key', example: '<IdModal v-model="isOpen" />' },
    { name: 'close', payload: 'void', description: 'Emitted when dismissal is requested.', trigger: 'Escape key or Close button', example: '<IdModal @close="handleClose" />' }
  ],
  'bottom-sheet': [
    { name: 'update:modelValue', payload: 'boolean', description: 'Controls sheet visibility state.', trigger: 'Drag dismissal, backdrop click, or Esc', example: '<IdBottomSheet v-model="isSheetOpen" />' }
  ],
  'drawer': [
    { name: 'update:modelValue', payload: 'boolean', description: 'Controls drawer visibility.', trigger: 'Backdrop click or Close trigger', example: '<IdDrawer v-model="isDrawerOpen" />' }
  ],
  'tabs': [
    { name: 'update:modelValue', payload: 'string | number', description: 'Emitted when user navigates to a new tab.', trigger: 'Tab header clicked', example: '<IdTabs v-model="activeTab" />' },
    { name: 'change', payload: 'string | number', description: 'Emitted on active tab switch.', trigger: 'Tab switch', example: '<IdTabs @change="onTabChange" />' }
  ],
  'table': [
    { name: 'update:selectedRows', payload: 'Array<any>', description: 'Emitted when row selection changes (when selectable is true).', trigger: 'Row checkbox toggle', example: '<IdTable @update:selectedRows="rows => selected = rows" />' },
    { name: 'sort', payload: '{ column: string, direction: "asc" | "desc" }', description: 'Emitted when sortable header is clicked.', trigger: 'Column header click', example: '<IdTable @sort="handleSort" />' }
  ],
  'date-picker': [
    { name: 'update:modelValue', payload: 'string | Date', description: 'Emitted when date selection is confirmed.', trigger: 'Calendar cell click', example: '<IdDatePicker v-model="date" />' }
  ],
  'time-picker': [
    { name: 'update:modelValue', payload: 'string | Date', description: 'Emitted when time is updated.', trigger: 'Time unit increment or direct input', example: '<IdTimePicker v-model="time" />' }
  ],
  'tag-input': [
    { name: 'update:modelValue', payload: 'string[]', description: 'Emitted when tags are added or removed.', trigger: 'Enter key on valid tag or remove button', example: '<IdTagInput v-model="tags" />' }
  ],
  'rating': [
    { name: 'update:modelValue', payload: 'number', description: 'Emitted when star score is selected.', trigger: 'Star click or key navigation', example: '<IdRating v-model="score" />' }
  ],
  'stepper': [
    { name: 'update:modelValue', payload: 'number', description: 'Emitted when active step changes.', trigger: 'Step item click when clickable=true', example: '<IdStepper v-model="currentStep" />' }
  ],
  'pagination': [
    { name: 'update:modelValue', payload: 'number', description: 'Emitted on page number transition.', trigger: 'Page pill click', example: '<IdPagination v-model="currentPage" :total-pages="10" />' }
  ],
  'file-upload': [
    { name: 'update:modelValue', payload: 'File | File[] | string', description: 'Emitted when valid files are dropped or selected.', trigger: 'File selection or drop', example: '<IdFileUpload v-model="files" />' }
  ],
  'qr-code': [
    { name: 'download', payload: '{ svgContent, url }', description: 'Emitted when the SVG export action is clicked.', trigger: 'Save SVG button click', example: '<IdQRCode @download="handleDownload" />' }
  ]
}

const activeComponentEvents = computed(() => {
  if (!props.component) return []
  const id = props.component.id
  return componentEventsMap[id] || []
})

// ─── 7. Component Slots Map ───
const componentSlotsMap = {
  'liquid-button': [
    { name: 'default', purpose: 'Button label text or main inline content.', props: '—', example: '<IdButton>Save Changes</IdButton>' },
    { name: 'iconLeft', purpose: 'Custom leading icon or graphic element.', props: '—', example: '<template #iconLeft><Zap /></template>' },
    { name: 'iconRight', purpose: 'Custom trailing icon or indicator.', props: '—', example: '<template #iconRight>→</template>' }
  ],
  'button': [
    { name: 'default', purpose: 'Button label text or main inline content.', props: '—', example: '<IdButton>Save Changes</IdButton>' },
    { name: 'iconLeft', purpose: 'Custom leading icon or graphic element.', props: '—', example: '<template #iconLeft><Zap /></template>' },
    { name: 'iconRight', purpose: 'Custom trailing icon or indicator.', props: '—', example: '<template #iconRight>→</template>' }
  ],
  'input': [
    { name: 'prefix', purpose: 'Leading visual icon or search symbol.', props: '—', example: '<template #prefix>🔍</template>' },
    { name: 'suffix', purpose: 'Trailing action button or keyboard shortcut tag.', props: '—', example: '<template #suffix><kbd>⌘K</kbd></template>' }
  ],
  'select': [
    { name: 'prefix', purpose: 'Leading visual icon in select trigger.', props: '—', example: '<template #prefix>🌐</template>' },
    { name: 'suffix', purpose: 'Trailing accessory badge or indicator.', props: '—', example: '<template #suffix>▾</template>' }
  ],
  'card': [
    { name: 'header', purpose: 'Card header container override.', props: '—', example: '<template #header><h3>Custom Header</h3></template>' },
    { name: 'default', purpose: 'Main card body content.', props: '—', example: '<p>Card unified panel body.</p>' },
    { name: 'actions', purpose: 'Bottom action buttons row.', props: '—', example: '<template #actions><IdButton size="sm">Details</IdButton></template>' },
    { name: 'footer', purpose: 'Bottom card footer area.', props: '—', example: '<template #footer><span>Updated 2m ago</span></template>' }
  ],
  'liquid-modal': [
    { name: 'title', purpose: 'Custom title heading override.', props: '—', example: '<template #title><h3>Security Settings</h3></template>' },
    { name: 'subtitle', purpose: 'Custom subtitle paragraph override.', props: '—', example: '<template #subtitle><p>Manage your keys.</p></template>' },
    { name: 'default', purpose: 'Modal body content and form fields.', props: '—', example: '<p>Modal inner content.</p>' },
    { name: 'actions', purpose: 'Modal footer action buttons.', props: '—', example: '<template #actions><IdButton variant="primary">Confirm</IdButton></template>' }
  ],
  'modal': [
    { name: 'title', purpose: 'Custom title heading override.', props: '—', example: '<template #title><h3>Security Settings</h3></template>' },
    { name: 'subtitle', purpose: 'Custom subtitle paragraph override.', props: '—', example: '<template #subtitle><p>Manage your keys.</p></template>' },
    { name: 'default', purpose: 'Modal body content and form fields.', props: '—', example: '<p>Modal inner content.</p>' },
    { name: 'actions', purpose: 'Modal footer action buttons.', props: '—', example: '<template #actions><IdButton variant="primary">Confirm</IdButton></template>' }
  ],
  'table': [
    { name: 'col-{key}', purpose: 'Custom cell renderer for specific column key.', props: '{ value, row, index }', example: '<template #col-status="{ value }"><IdTag>{{ value }}</IdTag></template>' },
    { name: 'actions', purpose: 'Row action button slot.', props: '{ row }', example: '<template #actions="{ row }"><IdButton size="sm">Edit</IdButton></template>' },
    { name: 'empty', purpose: 'Custom empty search result state.', props: '—', example: '<template #empty><div>No results found.</div></template>' }
  ],
  'tabs': [
    { name: '{tabValue}', purpose: 'Dynamic slot matching tab value for panel content.', props: '—', example: '<template #overview><OverviewPanel /></template>' }
  ],
  'dropdown-menu': [
    { name: 'trigger', purpose: 'Interactive element that summons the dropdown.', props: '—', example: '<template #trigger><IdButton>Actions ▾</IdButton></template>' }
  ],
  'popover': [
    { name: 'trigger', purpose: 'Anchor element that triggers popover bubble.', props: '—', example: '<template #trigger><span>ℹ️</span></template>' },
    { name: 'default', purpose: 'Popover card body content.', props: '—', example: '<p>Helpful context.</p>' }
  ],
  'qr-code': [
    { name: 'default', purpose: 'Optional inner children or container slot.', props: '—', example: '<IdQRCode />' },
    { name: 'logo', purpose: 'Custom center icon or branding element override.', props: '—', example: '<template #logo><Zap :size="20" /></template>' },
    { name: 'label', purpose: 'Custom top/bottom heading typography.', props: '—', example: '<template #label><h4>Scan with Phone</h4></template>' },
    { name: 'caption', purpose: 'Custom secondary descriptive caption.', props: '—', example: '<template #caption><p>Point camera</p></template>' },
    { name: 'actions', purpose: 'Custom bottom action buttons row.', props: '—', example: '<template #actions><IdButton size="sm">Save</IdButton></template>' }
  ]
}

const activeComponentSlots = computed(() => {
  if (!props.component) return []
  const id = props.component.id
  return componentSlotsMap[id] || [
    { name: 'default', purpose: 'Default slot for nested markup and children.', props: '—', example: `<${componentTag.value}>Slotted content</${componentTag.value}>` }
  ]
})

// ─── 7b. Component UI Keys Map ───
const componentUiKeysMap = {
  'liquid-button': { root: 'Outer button element', base: 'Interactive pill surface', label: 'Text label span', iconLeft: 'Leading icon container', iconRight: 'Trailing icon container', spinner: 'Loading spinner' },
  'button': { root: 'Outer button element', base: 'Interactive pill surface', label: 'Text label span', iconLeft: 'Leading icon container', iconRight: 'Trailing icon container', spinner: 'Loading spinner' },
  'input': { root: 'Outer wrapper container', base: 'Input shell surface', input: 'Native <input> element', prefix: 'Leading icon container', suffix: 'Trailing accessory container', label: 'Label typography', hint: 'Hint text' },
  'textarea': { root: 'Outer wrapper', base: 'Textarea surface', input: 'Native <textarea> element', label: 'Label typography', hint: 'Counter / hint text' },
  'select': { root: 'Outer container', base: 'Trigger surface', select: 'Select trigger label', arrow: 'Dropdown chevron', menu: 'Popout option list' },
  'checkbox': { root: 'Outer wrapper', checkbox: 'Square check box element', label: 'Check label text' },
  'radio-group': { root: 'Outer fieldset', label: 'Group legend label', option: 'Individual radio item', radio: 'Circular indicator' },
  'slider': { root: 'Outer wrapper', label: 'Slider label', track: 'Background rail track', fill: 'Filled progress bar', thumb: 'Draggable thumb pill' },
  'ios-switch': { root: 'Outer wrapper', switch: 'Pill track container', handle: 'Sliding circular handle', label: 'Toggle label text' },
  'toggle': { root: 'Outer wrapper', switch: 'Pill track container', handle: 'Sliding circular handle', label: 'Toggle label text' },
  'liquid-modal': { backdrop: 'Frosted blur overlay', surface: 'Modal dialog box', header: 'Title header row', title: 'H3 title text', subtitle: 'Subtitle caption', body: 'Content body', footer: 'Action buttons row', close: 'Close icon button' },
  'modal': { backdrop: 'Frosted blur overlay', surface: 'Modal dialog box', header: 'Title header row', title: 'H3 title text', subtitle: 'Subtitle caption', body: 'Content body', footer: 'Action buttons row', close: 'Close icon button' },
  'card': { root: 'Card outer panel', header: 'Header container', title: 'Title typography', body: 'Main card content', footer: 'Footer / actions container' },
  'table': { root: 'Table wrapper panel', headerBar: 'Top search/title bar', table: 'Native table element', thead: 'Header row container', th: 'Header cell', tr: 'Body row', td: 'Data cell', actions: 'Action cell' },
  'tabs': { root: 'Tab container', list: 'Pill navigation bar', tab: 'Tab button', active: 'Active indicator pill', panel: 'Active content container' },
  'bottom-sheet': { backdrop: 'Dim/blur backdrop', surface: 'Sheet surface panel', grabber: 'Top handle bar', header: 'Header area', body: 'Scrollable sheet content' },
  'tag': { root: 'Tag pill container', label: 'Tag text', iconLeft: 'Leading icon', closeButton: 'Dismiss button' },
  'qr-code': { base: 'Outer container card', code: 'Inner SVG element', background: 'Frame surface wrapper', logo: 'Center logo container badge', label: 'Label typography container', caption: 'Caption description container', actions: 'Bottom action buttons container' }
}

const activeComponentUiKeys = computed(() => {
  if (!props.component) return { root: 'Root element', base: 'Surface container' }
  const id = props.component.id
  return componentUiKeysMap[id] || { root: 'Root component element', base: 'Primary surface container', body: 'Main content container' }
})

const inlineUiExampleSnippet = computed(() => {
  const tag = componentTag.value
  const keys = Object.keys(activeComponentUiKeys.value).slice(0, 3)
  const entries = keys.map(k => `    ${k}: 'custom-${k}-class'`).join(',\n')
  return `<template>
  <${tag}
    :ui="{
${entries}
    }"
  />
</template>`
})

const globalThemeConfigSnippet = computed(() => {
  const baseName = componentTag.value.replace(/^Id/, '')
  const id = props.component?.id || 'button'
  const keys = Object.keys(activeComponentUiKeys.value)
  const slotsConfig = keys.map(k => `        ${k}: 'id-${id}-${k}'`).join(',\n')

  return `// nuxt.config.ts or app.config.ts
export default defineAppConfig({
  ui: {
    ${baseName}: {
      slots: {
${slotsConfig}
      },
      variants: {
        variant: {
          default: 'bg-surface shadow-card',
          glass: 'bg-glass backdrop-blur-md'
        },
        size: {
          sm: 'text-xs p-2',
          md: 'text-sm p-3',
          lg: 'text-base p-4'
        }
      },
      compoundVariants: [
        {
          variant: 'glass',
          size: 'lg',
          class: 'shadow-lift'
        }
      ],
      defaultVariants: {
        variant: 'default',
        size: 'md'
      }
    }
  }
})`
})

// ─── 8. Accessibility Specs Map ───
const componentA11yMap = {
  'liquid-button': {
    keyboard: 'Focusable via Tab key. Activated with Enter or Space.',
    aria: 'Uses native <button> with role="button". Inherits aria-disabled and aria-label.',
    focus: 'Visible high-contrast focus ring using --accent color (outline-offset: 2px).',
    screenReader: 'Screen readers announce button text and dynamic loading spinner status.'
  },
  'button': {
    keyboard: 'Focusable via Tab key. Activated with Enter or Space.',
    aria: 'Uses native <button> with role="button". Inherits aria-disabled and aria-label.',
    focus: 'Visible high-contrast focus ring using --accent color (outline-offset: 2px).',
    screenReader: 'Screen readers announce button text and dynamic loading spinner status.'
  },
  'input': {
    keyboard: 'Direct text entry. Clearable trigger responds to Enter and Space.',
    aria: 'role="textbox" with aria-invalid when validation errors are present, aria-describedby for hints.',
    focus: 'Active input glows with Liquid Glass focus ring, maintaining contrast ratio > 4.5:1.',
    screenReader: 'Associated <label> read automatically upon focus.'
  },
  'select': {
    keyboard: 'ArrowUp/ArrowDown to navigate options. Enter/Space to open or commit selection. Esc to dismiss.',
    aria: 'role="combobox" with aria-expanded, aria-haspopup="listbox", aria-activedescendant.',
    focus: 'Focus stays managed within the active trigger and menu items.',
    screenReader: 'Announces active option position e.g. "Option 2 of 5 selected".'
  },
  'liquid-modal': {
    keyboard: 'Escape key instantly dismisses dialog. Tab cycle is trapped within modal boundaries.',
    aria: 'role="dialog" or role="alertdialog" with aria-modal="true" and aria-labelledby="title".',
    focus: 'Focus shifts automatically to first interactive element on open; returns to trigger on close.',
    screenReader: 'Background page elements receive aria-hidden="true" when modal is mounted.'
  },
  'modal': {
    keyboard: 'Escape key instantly dismisses dialog. Tab cycle is trapped within modal boundaries.',
    aria: 'role="dialog" or role="alertdialog" with aria-modal="true" and aria-labelledby="title".',
    focus: 'Focus shifts automatically to first interactive element on open; returns to trigger on close.',
    screenReader: 'Background page elements receive aria-hidden="true" when modal is mounted.'
  },
  'tabs': {
    keyboard: 'ArrowLeft/ArrowRight to move active tab focus; Enter/Space to select.',
    aria: 'role="tablist" on container, role="tab" with aria-selected="true/false" on buttons.',
    focus: 'Only the active tab is tab-focusable (roving tabindex).',
    screenReader: 'Announces tab title, selection state, and panel associations.'
  },
  'table': {
    keyboard: 'Tab cycles between sortable headers and row action buttons.',
    aria: 'role="table" with proper <caption>, <th> scope="col", and aria-sort="ascending/descending".',
    focus: 'Interactive controls inside cells maintain standard keyboard focus rings.',
    screenReader: 'Headers are voiced alongside cell values for clear contextual navigation.'
  }
}

const activeComponentA11y = computed(() => {
  if (!props.component) {
    return {
      keyboard: 'Standard keyboard navigation supported (Tab, Enter, Space, Escape).',
      aria: 'Semantic HTML5 roles and attributes applied automatically.',
      focus: 'High-contrast visible focus indicators comply with WCAG 2.4.7.',
      screenReader: 'Semantic markup ensures natural screen-reader announcements.'
    }
  }
  const id = props.component.id
  return componentA11yMap[id] || {
    keyboard: 'Standard keyboard navigation supported (Tab, Enter, Space, Escape).',
    aria: 'Semantic HTML5 roles and attributes applied automatically.',
    focus: 'High-contrast visible focus indicators comply with WCAG 2.4.7.',
    screenReader: 'Semantic markup ensures natural screen-reader announcements.'
  }
})

// ─── 9. Related Components Map ───
const componentRelatedMap = {
  'liquid-button': [
    { id: 'button', name: 'Button', category: 'Buttons', tag: '<IdButton />' },
    { id: 'segmented-control', name: 'Segmented Control', category: 'Navigation', tag: '<IdSegmentedControl />' },
    { id: 'tag', name: 'Tag Badge', category: 'Indicators', tag: '<IdTag />' }
  ],
  'input': [
    { id: 'textarea', name: 'Textarea', category: 'Inputs', tag: '<IdTextarea />' },
    { id: 'select', name: 'Select Dropdown', category: 'Inputs', tag: '<IdSelect />' },
    { id: 'tag-input', name: 'Tag Input', category: 'Inputs', tag: '<IdTagInput />' }
  ],
  'modal': [
    { id: 'confirm-dialog', name: 'Confirm Dialog', category: 'Overlays', tag: '<IdConfirmDialog />' },
    { id: 'bottom-sheet', name: 'Bottom Sheet', category: 'Overlays', tag: '<IdBottomSheet />' },
    { id: 'drawer', name: 'Drawer', category: 'Overlays', tag: '<IdDrawer />' }
  ],
  'liquid-modal': [
    { id: 'confirm-dialog', name: 'Confirm Dialog', category: 'Overlays', tag: '<IdConfirmDialog />' },
    { id: 'bottom-sheet', name: 'Bottom Sheet', category: 'Overlays', tag: '<IdBottomSheet />' },
    { id: 'drawer', name: 'Drawer', category: 'Overlays', tag: '<IdDrawer />' }
  ],
  'tabs': [
    { id: 'segmented-control', name: 'Segmented Control', category: 'Navigation', tag: '<IdSegmentedControl />' },
    { id: 'stepper', name: 'Stepper Progress', category: 'Navigation', tag: '<IdStepper />' },
    { id: 'breadcrumbs', name: 'Breadcrumbs', category: 'Navigation', tag: '<IdBreadcrumbs />' }
  ]
}

const activeRelatedComponents = computed(() => {
  if (!props.component) return []
  const id = props.component.id
  return componentRelatedMap[id] || []
})
</script>

<style scoped>
.playground-layout {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* 1. Playground Header */
.playground-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-3);
  letter-spacing: 0.08em;
}

.vue-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  background: rgba(0, 113, 227, 0.08);
  padding: 2px 8px;
  border-radius: var(--r-pill);
}

.component-desc {
  font-size: 14.5px;
  color: var(--text-2);
  line-height: 1.55;
  letter-spacing: -0.01em;
  margin: 0;
}

/* Section Headings */
.playground-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.playground-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.heading-left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.section-num {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  background: rgba(0, 113, 227, 0.08);
  padding: 1px 6px;
  border-radius: var(--r-chip, 6px);
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: var(--tracking-tight, -0.02em);
  margin: 0;
}

.spec-badge-count {
  font-size: 11px;
  font-weight: 650;
  color: var(--text-3);
  background: var(--hover);
  border: 1px solid var(--hairline);
  padding: 2px 8px;
  border-radius: var(--r-pill);
  font-family: var(--mono);
}

.a11y-badge {
  font-size: 11px;
  font-weight: 700;
  color: var(--live, #30d158);
  background: rgba(48, 209, 88, 0.1);
  padding: 2px 8px;
  border-radius: var(--r-pill);
  letter-spacing: 0.02em;
}

/* Mode toggles / Segmented Control Pills */
.view-mode-toggles {
  display: inline-flex;
  gap: 2px;
  background: var(--track, #e8e8ed);
  padding: 3px;
  border-radius: var(--r-pill, 999px);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  transition: all 0.2s ease;
}

.mode-btn {
  border: 1px solid transparent;
  font-size: 11.5px;
  font-weight: 550;
  padding: 3px 10px;
  border-radius: var(--r-pill, 999px);
  background: transparent;
  color: var(--text-2, #6e6e73);
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.32, 0.72, 0, 1);
  user-select: none;
}

.mode-btn:hover {
  color: var(--text, #1d1d1f);
}

.mode-btn.active {
  background: var(--surface, #ffffff);
  color: var(--text, #1d1d1f);
  font-weight: 650;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.04);
}

:root.dark .view-mode-toggles,
[data-theme="dark"] .view-mode-toggles,
.dark .view-mode-toggles {
  background: #252528;
  border-color: rgba(255, 255, 255, 0.10);
}

:root.dark .mode-btn,
[data-theme="dark"] .mode-btn,
.dark .mode-btn {
  color: #a1a1a6;
}

:root.dark .mode-btn:hover,
[data-theme="dark"] .mode-btn:hover,
.dark .mode-btn:hover {
  color: #f5f5f7;
  background: rgba(255, 255, 255, 0.06);
}

:root.dark .mode-btn.active,
[data-theme="dark"] .mode-btn.active,
.dark .mode-btn.active {
  background: #3a3a3c;
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

/* 2. Preview Stage */
.preview-stage {
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  overflow: hidden;
  background: var(--surface);
  box-shadow: var(--sh-card);
}

.stage-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid var(--hairline);
}

.stage-title {
  font-size: 12px;
  font-weight: 650;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.canvas-area {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  transition: background 0.2s ease, color 0.2s ease;
}

.canvas-area.bg-light,
.canvas-area[data-theme="light"] {
  --bg:                  #f5f5f7;
  --surface:             #ffffff;
  --surface-elevated:    #ffffff;
  --hover:               #fbfbfd;
  --text:                #1d1d1f;
  --text-body:           #424245;
  --text-2:              #6e6e73;
  --text-3:              #86868b;
  --text-4:              #aeaeb2;
  --faint:               #d2d2d7;
  --hairline:            rgba(0, 0, 0, 0.07);
  --track:               #e8e8ed;
  --accent:              #0071e3;
  --sh-card:             0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05);
  --sh-panel:            0 1px 3px rgba(0, 0, 0, 0.05), 0 14px 40px rgba(0, 0, 0, 0.05);
  background:            #f5f5f7;
  color:                 #1d1d1f;
}

.canvas-area.bg-dark,
.canvas-area[data-theme="dark"] {
  --bg:                  #000000;
  --surface:             #1c1c1e;
  --surface-elevated:    #2c2c2e;
  --hover:               #2c2c2e;
  --text:                #f5f5f7;
  --text-body:           #d1d1d6;
  --text-2:              #98989d;
  --text-3:              #6e6e73;
  --text-4:              #48484a;
  --faint:               #3a3a3c;
  --hairline:            rgba(255, 255, 255, 0.12);
  --track:               #3a3a3c;
  --accent:              #0a84ff;
  --sh-card:             0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4);
  --sh-panel:            0 1px 3px rgba(0, 0, 0, 0.3), 0 14px 40px rgba(0, 0, 0, 0.35);
  background:            #000000;
  color:                 #f5f5f7;
}

.controls-panel {
  padding: 16px;
  background: var(--hover);
  border-top: 1px solid var(--hairline);
}

.controls-title {
  font-size: 12px;
  font-weight: 650;
  color: var(--text-2);
  margin-bottom: 12px;
}

.props-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.prop-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.prop-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-3);
  font-family: var(--mono);
}

.prop-input, .prop-select {
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--hairline);
  padding: 0 10px;
  font-family: var(--font);
  font-size: 13px;
  background: var(--surface);
  color: var(--text);
  outline: none;
}

/* 3. Installation Panel */
.install-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.terminal-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #1d1d1f;
  color: #ffffff;
  padding: 9px 12px 9px 14px;
  border-radius: var(--r-card, 12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.code-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 12.5px;
  min-width: 0;
  overflow: hidden;
}

.prompt-sym {
  color: #30d158;
  font-weight: 700;
  user-select: none;
}

.code-line code {
  font-family: var(--mono);
  color: #f5f5f7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.terminal-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--r-pill);
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.terminal-copy-btn:hover {
  background: var(--accent);
  border-color: transparent;
}

.install-sub-snippet {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 12px;
  overflow: hidden;
}

.sub-snippet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 12px;
  background: rgba(0,0,0,0.02);
  border-bottom: 1px solid var(--hairline);
}

.sub-snippet-label {
  font-size: 11px;
  font-weight: 650;
  color: var(--text-3);
  font-family: var(--mono);
}

.sub-copy-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.sub-copy-btn:hover {
  background: rgba(0, 113, 227, 0.08);
}

.sub-snippet-code {
  margin: 0;
  padding: 10px 14px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text);
  line-height: 1.45;
  background: var(--surface);
  overflow-x: auto;
}

.cli-info-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--text-2);
  background: var(--hover);
  border: 1px solid var(--hairline);
  padding: 8px 12px;
  border-radius: 10px;
}

.cli-info-note code {
  font-family: var(--mono);
  color: var(--text);
  background: var(--surface);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--hairline);
}

/* 4. Code Inspector */
.code-inspector {
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  overflow: hidden;
  background: #1d1d1f;
  color: #ffffff;
  box-shadow: var(--sh-card);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: #141416;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.code-file-label {
  font-family: var(--mono);
  font-size: 12px;
  color: #8e8e93;
}

.copy-code-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  color: #ffffff;
  border: none;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: var(--r-pill);
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-code-btn:hover {
  background: var(--accent-hover);
}

.code-display {
  padding: 16px;
  overflow-x: auto;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.5;
  color: #e3e3e3;
  max-height: 300px;
}

/* 5 & 6. API & Events Tables */
.api-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--hairline);
  border-radius: 12px;
  background: var(--surface);
  box-shadow: var(--sh-card);
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  text-align: left;
}

.api-table th {
  padding: 10px 14px;
  background: rgba(0,0,0,0.02);
  color: var(--text-2);
  font-weight: 650;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--hairline);
  white-space: nowrap;
}

.api-table td {
  padding: 10px 14px;
  color: var(--text);
  border-bottom: 1px solid var(--hairline);
  vertical-align: top;
}

.api-table tr:last-child td {
  border-bottom: none;
}

.prop-name code, .event-name code, .slot-name code {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
}

.type-name code {
  color: var(--indigo, #5e5ce6);
  font-family: var(--mono);
  font-size: 11.5px;
}

.default-val code {
  color: var(--text-3);
  font-family: var(--mono);
  font-size: 11.5px;
}

.req-chip {
  display: inline-block;
  font-size: 10px;
  font-weight: 650;
  text-transform: uppercase;
  padding: 1px 6px;
  border-radius: var(--r-pill);
  background: var(--hover);
  color: var(--text-3);
  border: 1px solid var(--hairline);
}

.req-chip.required {
  background: rgba(255, 107, 0, 0.1);
  color: var(--heat, #ff6b00);
  border-color: rgba(255, 107, 0, 0.2);
}

.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.opt-pill {
  font-family: var(--mono);
  font-size: 10.5px;
  background: var(--hover);
  color: var(--text-2);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--hairline);
}

.desc-text {
  line-height: 1.45;
  color: var(--text-body, #424245);
}

.prop-example, .trigger-meta {
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--text-3);
}

.example-label, .meta-label {
  font-weight: 600;
  color: var(--text-2);
}

.prop-example code {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text);
}

.mini-example-code {
  margin: 0;
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text);
  background: var(--hover);
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--hairline);
  overflow-x: auto;
  white-space: pre;
}

.empty-spec-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: var(--sh-card);
}

.empty-spec-icon {
  font-size: 20px;
}

.empty-spec-title {
  font-size: 13px;
  font-weight: 650;
  color: var(--text);
  margin-bottom: 2px;
}

.empty-spec-desc {
  font-size: 12px;
  color: var(--text-2);
  line-height: 1.4;
}

.empty-spec-desc code {
  font-family: var(--mono);
  background: var(--hover);
  padding: 1px 4px;
  border-radius: 4px;
}

/* 7. Customization Guide */
.customization-card-panel {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--sh-card);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ui-guide-p {
  margin: 0;
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.5;
}

.ui-keys-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.ui-key-card {
  background: var(--hover);
  border: 1px solid var(--hairline);
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ui-key-name code {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
}

.ui-key-desc {
  font-size: 11.5px;
  color: var(--text-2);
  line-height: 1.35;
}

.inline-ui-example-block {
  border: 1px solid var(--hairline);
  border-radius: 12px;
  overflow: hidden;
}

.code-box-header {
  padding: 8px 14px;
  background: #141416;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.code-box-badge {
  font-size: 11.5px;
  font-weight: 650;
  color: #a1a1aa;
  font-family: var(--mono);
}

.copy-cust-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: var(--font);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: var(--r-pill);
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-cust-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.recipe-pre {
  margin: 0;
  padding: 14px;
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.55;
  background: #18181b;
  color: #e4e4e7;
  overflow-x: auto;
  max-height: 320px;
}
</style>

