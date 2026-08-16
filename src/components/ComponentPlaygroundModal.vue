<template>
  <IdModal
    :model-value="!!component"
    :title="component?.name || 'Component Playground'"
    max-width="780px"
    @update:model-value="$emit('close')"
  >
    <div v-if="component" class="playground-layout">
      <!-- Description & Category -->
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
        <div :class="['canvas-area', `bg-${bgMode}`, { dark: bgMode === 'dark' }]">
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
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :color="propState.color || 'blue'"
                :clickable="propState.clickable !== false"
                :steps="[{ label: 'Account', description: 'Create user' }, { label: 'Security', description: '2FA settings' }, { label: 'Review', description: 'Confirm details' }]"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'timeline'">
            <div style="width: 100%; max-width: 440px;">
              <IdTimeline :items="[{ title: 'v2.4 System Update Released', description: 'Added 5 new Liquid Glass components.', time: '10 min ago', variant: 'primary', icon: Zap }, { title: 'Security Audit Passed', description: 'Enclave verification completed cleanly.', time: '2 hours ago', variant: 'success', icon: Check }]" />
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
            <div style="width: 100%; max-width: 440px;">
              <IdPieChart :center-label="propState.centerLabel !== undefined ? propState.centerLabel : 'Direct Traffic'" :data="[{ label: 'Direct', value: 45, color: '#0071e3' }, { label: 'Social', value: 25, color: '#30d158' }, { label: 'Referral', value: 30, color: '#af52de' }]" />
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
            <div style="position: relative; width: 100%; height: 120px; display: flex; align-items: flex-end; justify-content: center;">
              <IdDock
                :items="[
                  { id: 'finder', label: 'Finder', icon: '📁', iconBg: '#007aff', active: true },
                  { id: 'safari', label: 'Safari', icon: '🌐', iconBg: '#34c759' },
                  { id: 'notes', label: 'Notes', icon: '📝', iconBg: '#ff9500' },
                  { separator: true },
                  { id: 'settings', label: 'Settings', icon: '⚙️', iconBg: '#8e8e93' }
                ]"
                style="position: relative; bottom: 0;"
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
                :caption="propState.caption || 'Studio Portrait'"
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
                :label="propState.label || 'Search components'"
                :placeholder="propState.placeholder || 'Type here...'"
                :variant="propState.variant || 'default'"
                :size="propState.size || 'md'"
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
                :options="['Vue 3', 'Nuxt 3', 'React', 'Svelte', 'Angular']"
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
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <IdButton variant="primary" @click="demoModalOpen = true">Trigger Modal ({{ propState.variant || 'default' }})</IdButton>
              <IdModal
                v-model="demoModalOpen"
                :title="propState.title || 'Confirm Action'"
                :subtitle="propState.subtitle || 'Are you sure you want to proceed?'"
                :content="propState.content || 'Modal body content and description text goes here.'"
                :variant="propState.variant || 'default'"
                :size="propState.size || 'md'"
                :teleport="false"
              >
                <template #actions>
                  <IdButton variant="secondary" @click="demoModalOpen = false">Cancel</IdButton>
                  <IdButton variant="primary" @click="demoModalOpen = false">Confirm</IdButton>
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
                :show-grabber="propState.showGrabber"
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
                :variant="propState.variant || 'info'"
                :size="propState.size || 'md'"
                :title="propState.title || 'Update Available'"
                :description="propState.description || 'A new software version is ready to install.'"
                dismissible
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
                :key="`prog-${propState.size}-${propState.variant}-${propState.color}-${propState.indeterminate}`"
                :value="propState.value ?? 65"
                :size="propState.size || 'md'"
                :variant="propState.variant || 'default'"
                :color="propState.color || 'blue'"
                :indeterminate="!!propState.indeterminate"
                label="Upload Progress"
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
            <div style="width: 100%; max-width: 400px;">
              <IdFileUpload hint="Upload files up to 25MB" />
            </div>
          </template>

          <template v-else-if="component.id === 'confirm-dialog'">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <IdButton variant="primary" @click="demoConfirmOpen = true">Trigger Confirm Dialog ({{ propState.variant || 'default' }})</IdButton>
              <IdConfirmDialog v-model="demoConfirmOpen" :title="propState.title || 'Delete Security Token'" :message="propState.message || 'Are you sure you want to delete this key? This action cannot be undone.'" :variant="propState.variant || 'default'" :danger="propState.danger" :teleport="false" />
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
            <div style="height: 380px; width: 100%; max-width: 280px; border: 1px solid var(--hairline); border-radius: 16px; overflow: hidden;">
              <IdSidebar
                :title="propState.title || 'Idesign Studio'"
                :variant="propState.variant || 'default'"
                :collapsible="propState.collapsible !== false"
                :groups="[
                  { title: 'Workspace', items: [{ id: 'dashboard', label: 'Overview', icon: '📊' }, { id: 'projects', label: 'Projects', icon: '📁', badge: '12' }, { id: 'analytics', label: 'Analytics', icon: '⚡' }] },
                  { title: 'System', items: [{ id: 'settings', label: 'Settings', icon: '⚙️' }] }
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

          <template v-else-if="component.id === 'pin-input'">
            <IdPinInput
              :length="Number(propState.length) || 6"
              :size="propState.size || 'md'"
              :masked="propState.masked || false"
              :label="propState.label || 'Verification Code'"
            />
          </template>

          <template v-else-if="component.id === 'time-picker'">
            <IdTimePicker
              :label="propState.label || 'Meeting Start Time'"
              :is-24-hour="propState.is24Hour || false"
              :show-seconds="propState.showSeconds || false"
              :size="propState.size || 'md'"
            />
          </template>

          <template v-else-if="component.id === 'tag-input'">
            <div style="width: 100%; max-width: 440px;">
              <IdTagInput
                :label="propState.label || 'Project Tags'"
                :placeholder="propState.placeholder || 'Add tag...'"
                :tag-variant="propState.tagVariant || 'accent'"
                :size="propState.size || 'md'"
              />
            </div>
          </template>

          <template v-else-if="component.id === 'rating'">
            <IdRating
              :label="propState.label || 'Customer Satisfaction'"
              :count="Number(propState.count) || 5"
              :allow-half="propState.allowHalf || false"
              :show-score="propState.showScore !== false"
              :size="propState.size || 'md'"
            />
          </template>

          <template v-else-if="component.id === 'number-input'">
            <IdNumberInput
              :label="propState.label || 'Border Radius'"
              :unit="propState.unit || 'px'"
              :step-val="Number(propState.stepVal) || 2"
              :min="Number(propState.min) || 0"
              :max="Number(propState.max) || 100"
              :size="propState.size || 'md'"
            />
          </template>

          <template v-else-if="component.id === 'color-picker'">
            <IdColorPicker
              :label="propState.label || 'Brand Accent Color'"
              :size="propState.size || 'md'"
            />
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

      <!-- Code Inspector & Copy Section -->
      <div class="code-inspector">
        <div class="code-header">
          <div class="code-tabs">
            <button
              :class="['code-tab', { active: codeTab === 'vue' }]"
              @click="codeTab = 'vue'"
            >Vue 3 SFC (.vue)</button>

            <button
              :class="['code-tab', { active: codeTab === 'nuxt' }]"
              @click="codeTab = 'nuxt'"
            >Nuxt 3</button>

            <button
              :class="['code-tab', { active: codeTab === 'html' }]"
              @click="codeTab = 'html'"
            >HTML + CSS</button>
          </div>

          <button type="button" class="copy-code-btn" @click="copyCode">
            <svg v-if="codeCopied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

      <!-- Component API Documentation Tables -->
      <div class="api-docs-section">
        <h4 class="api-docs-title">Component API Specification</h4>
        <div class="api-table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(spec, key) in component.props" :key="key">
                <td class="prop-name"><code>{{ key }}</code></td>
                <td class="type-name"><code>{{ spec.type }}</code></td>
                <td class="default-val"><code>{{ spec.default !== undefined ? spec.default : '—' }}</code></td>
                <td class="prop-desc">
                  {{ spec.description || (spec.type === 'select' ? `Options: ${spec.options.join(' | ')}` : 'Configurable property.') }}
                  <span v-if="spec.type === 'select' && spec.description" style="display: block; font-size: 11px; opacity: 0.75; margin-top: 2px;">
                    Options: <code>{{ spec.options.join(' | ') }}</code>
                  </span>
                </td>
              </tr>
              <tr v-if="!hasProps">
                <td colspan="4" class="no-props">No props required — plug-and-play component.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- How to Modify & Customize Component Section -->
      <div class="customization-docs-section">
        <div class="customization-header-row">
          <h4 class="customization-docs-title">Component Customization & Theming Guide</h4>
          <div class="customization-tabs">
            <button
              :class="['cust-tab-btn', { active: activeCustomTab === 'slots' }]"
              @click="activeCustomTab = 'slots'"
            >
              Slots
            </button>
            <button
              :class="['cust-tab-btn', { active: activeCustomTab === 'theme' }]"
              @click="activeCustomTab = 'theme'"
            >
              Theme
            </button>
          </div>
        </div>

        <div class="customization-panel">
          <!-- Active Tab Content -->
          <div class="customization-tab-content">
            <div class="code-box-header">
              <span class="code-box-badge">
                {{ activeCustomTab === 'props' ? 'Vue 3 Composition API & Props Usage' : (activeCustomTab === 'slots' ? 'Template Slots & Composition' : 'Complete Global UI Config & Runtime Theming') }}
              </span>
              <button type="button" class="copy-cust-btn" @click="copyCustomizationCode">
                <svg v-if="custCopied" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {{ custCopied ? 'Copied!' : 'Copy Code' }}
              </button>
            </div>
            <pre class="recipe-pre"><code>{{ currentCustomizationSnippet }}</code></pre>
          </div>
        </div>
      </div>

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
import IdPinInput from './idesign/IdPinInput.vue'
import IdTimePicker from './idesign/IdTimePicker.vue'
import IdTagInput from './idesign/IdTagInput.vue'
import IdRating from './idesign/IdRating.vue'
import IdNumberInput from './idesign/IdNumberInput.vue'
import IdColorPicker from './idesign/IdColorPicker.vue'


import { Search, FolderOpen, Inbox, AlertCircle, Sparkles, Lock, Zap, Box, Folder, Check, Wifi, Bluetooth, Bell } from '@lucide/vue'
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

const setMode = (mode) => {
  bgMode.value = mode
  if (mode === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }
}

let themeObserver = null

onMounted(() => {
  const isDarkGlobal = document.documentElement.classList.contains('dark')
  bgMode.value = isDarkGlobal ? 'dark' : 'light'

  themeObserver = new MutationObserver(() => {
    const isDarkNow = document.documentElement.classList.contains('dark')
    bgMode.value = isDarkNow ? 'dark' : 'light'
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  if (themeObserver) themeObserver.disconnect()
})

const codeTab = ref('vue')
const codeCopied = ref(false)
const demoModalOpen = ref(false)
const demoTreeSelected = ref('2')
const demoTreeExpanded = ref(['1', '3'])
const demoSheetOpen = ref(false)
const demoDrawerOpen = ref(false)
const demoTab = ref('overview')
const demoPage = ref(1)

const toastInstance = useToast()
const triggerToast = (type) => {
  const msg = type === 'success' ? 'Settings saved successfully' : type === 'warning' ? 'Storage reaching capacity' : type === 'error' ? 'Failed to synchronize data' : 'New update ready'
  toastInstance[type](msg, { description: 'All changes synchronized to your cloud account.' })
}
const demoText = ref('Sample text')
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
    return typeof props.component.htmlCode === 'function' ? props.component.htmlCode(propState) : props.component.htmlCode
  }
})

const copyCode = () => {
  navigator.clipboard.writeText(displayedCode.value)
  codeCopied.value = true
  emit('toast', `Copied ${props.component.name} code snippet!`)
  setTimeout(() => {
    codeCopied.value = false
  }, 2000)
}

const activeCustomTab = ref('slots')
const custCopied = ref(false)

const copyCustomizationCode = () => {
  if (!currentCustomizationSnippet.value) return
  navigator.clipboard.writeText(currentCustomizationSnippet.value)
  custCopied.value = true
  emit('toast', `Copied ${activeCustomTab.value} customization code!`)
  setTimeout(() => {
    custCopied.value = false
  }, 2000)
}

const componentTagMap = {
  'button': 'IdButton',
  'input': 'IdInput',
  'textarea': 'IdTextarea',
  'select': 'IdSelect',
  'checkbox': 'IdCheckbox',
  'radio': 'IdRadioGroup',
  'slider': 'IdSlider',
  'toggle': 'IdToggle',
  'modal': 'IdModal',
  'dialog': 'IdDialog',
  'bottom-sheet': 'IdBottomSheet',
  'drawer': 'IdDrawer',
  'dropdown-menu': 'IdDropdownMenu',
  'popover': 'IdPopover',
  'tooltip': 'IdTooltip',
  'tabs': 'IdTabs',
  'accordion': 'IdAccordion',
  'segmented-control': 'IdSegmentedControl',
  'table': 'IdTable',
  'tag': 'IdTag',
  'badge': 'IdBadge',
  'avatar': 'IdAvatar',
  'progress': 'IdProgress',
  'alert': 'IdAlert',
  'toast': 'IdToast',
  'card': 'IdCard',
  'panel': 'IdPanel',
  'panel-row': 'IdPanelRow',
  'hero-cta': 'IdHeroCta',
  'glass-nav': 'IdGlassNav',
  'live-indicator': 'IdLiveDot',
  'confirm-dialog': 'IdConfirmDialog',
  'command-palette': 'IdCommandPalette',
  'date-picker': 'IdDatePicker',
  'file-upload': 'IdFileUpload',
  'carousel': 'IdCarousel',
  'dock': 'IdDock',
  'stat': 'IdStat',
  'sparkline': 'IdSparkline',
  'spinner': 'IdSpinner',
  'skeleton': 'IdSkeleton'
}

const currentCustomizationSnippet = computed(() => {
  if (!props.component) return ''
  const id = props.component.id
  const tag = componentTagMap[id] || 'Id' + (props.component.name ? props.component.name.replace(/[^a-zA-Z]/g, '') : 'Component')
  const baseName = tag.replace(/^Id/, '')

  if (activeCustomTab.value === 'props') {
    // 1. Composition API (Props)
    if (id === 'input') {
      return `<script setup>
import { ref } from 'vue'
import { IdInput, IdFormField } from '@idesign/vue'

const email = ref('')
const isInvalid = ref(false)
const inputRef = ref(null)

const handleFocus = () => {
  inputRef.value?.focus()
}
<\/script>

<template>
  <IdFormField label="Email Address" required :error="isInvalid ? 'Please enter a valid email' : ''">
    <IdInput
      ref="inputRef"
      v-model="email"
      size="md"
      variant="default"
      placeholder="alex@company.com"
      clearable
      @change="isInvalid = !email.includes('@')"
    />
  </IdFormField>
</template>`
    } else if (id === 'button') {
      return `<script setup>
import { ref } from 'vue'
import { IdButton } from '@idesign/vue'

const isLoading = ref(false)

const handleClick = async () => {
  isLoading.value = true
  try {
    await performAction()
  } finally {
    isLoading.value = false
  }
}
<\/script>

<template>
  <IdButton
    variant="primary"
    size="md"
    color="blue"
    :loading="isLoading"
    @click="handleClick"
  >
    Confirm & Save
  </IdButton>
</template>`
    } else if (id === 'modal' || id === 'dialog') {
      return `<script setup>
import { ref } from 'vue'
import { IdDialog, IdButton } from '@idesign/vue'

const isOpen = ref(false)
<\/script>

<template>
  <IdButton variant="primary" @click="isOpen = true">Open Dialog</IdButton>

  <IdDialog
    v-model="isOpen"
    title="Edit Workspace"
    subtitle="Configure workspace visibility and members."
    max-width="540px"
    size="md"
    variant="default"
  >
    <p>Dialog body content with automatic Escape key handling and focus trapping.</p>
  </IdDialog>
</template>`
    } else if (id === 'tabs' || id === 'segmented-control') {
      return `<script setup>
import { ref } from 'vue'
import { ${tag} } from '@idesign/vue'

const activeTab = ref('overview')
const tabsList = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'settings', label: 'Settings' }
]
<\/script>

<template>
  <${tag}
    v-model="activeTab"
    :tabs="tabsList"
    size="md"
    variant="pill"
    @change="val => console.log('Tab changed:', val)"
  />
</template>`
    } else if (id === 'table') {
      return `<script setup>
import { ref } from 'vue'
import { IdTable } from '@idesign/vue'

const columns = [
  { key: 'name', label: 'User Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
]

const users = ref([
  { name: 'Sarah Chen', role: 'Staff Engineer', status: 'Active' },
  { name: 'Alex Rivera', role: 'Design Lead', status: 'Active' }
])
<\/script>

<template>
  <IdTable
    :columns="columns"
    :data="users"
    variant="default"
    searchable
    selectable
    hoverable
  />
</template>`
    } else {
      return `<script setup>
import { ref } from 'vue'
import { ${tag} } from '@idesign/vue'

const modelValue = ref(null)
<\/script>

<template>
  <${tag}
    v-model="modelValue"
    size="md"
    variant="default"
    @change="val => console.log('Value changed:', val)"
  />
</template>`
    }
  } else if (activeCustomTab.value === 'slots') {
    // 2. Slots (Accurate dynamic slots mapping)
    const componentSlotsTemplates = {
      button: `<template>
  <IdButton variant="primary">
    <!-- ⚡ Leading Icon Slot -->
    <template #iconLeft>
      <span>🌟</span>
    </template>

    <!-- ✍️ Default Slot (Label text) -->
    <span>Get Started</span>

    <!-- ⚡ Trailing Icon Slot -->
    <template #iconRight>
      <span>→</span>
    </template>
  </IdButton>
</template>`,
      input: `<template>
  <IdInput v-model="searchQuery" placeholder="Search components...">
    <!-- 🔍 Leading Icon Slot -->
    <template #prefix>
      <span>🔍</span>
    </template>

    <!-- ⌨️ Trailing Action Slot -->
    <template #suffix>
      <kbd>⌘K</kbd>
    </template>
  </IdInput>
</template>`,
      select: `<template>
  <IdSelect v-model="selectedValue" :options="['US', 'UK', 'CA']">
    <!-- 🔍 Leading Icon Slot -->
    <template #prefix>
      <span>🌐</span>
    </template>

    <!-- ⌨️ Trailing Action Slot -->
    <template #suffix>
      <span>Value: {{ selectedValue }}</span>
    </template>
  </IdSelect>
</template>`,
      card: `<template>
  <IdCard>
    <!-- 📋 Card Header Override Slot -->
    <template #header>
      <h3>Dedicated Cluster</h3>
      <p>Manage raw spatial server operations.</p>
    </template>

    <!-- ✍️ Default Slot (Body content) -->
    <p>Unified card panel body text rendered dynamically.</p>

    <!-- ⚙️ Card Footer/Actions Slot -->
    <template #footer>
      <IdButton variant="secondary" size="sm">Details</IdButton>
      <IdButton variant="primary" size="sm">Launch Node</IdButton>
    </template>
  </IdCard>
</template>`,
      modal: `<template>
  <IdModal v-model="isOpen" title="Save Changes">
    <!-- 🔒 Custom Header Slot Override (Optional) -->
    <!-- Or customize only #title and #subtitle below -->
    <template #title>
      <h3>Custom Modal Title</h3>
    </template>
    
    <template #subtitle>
      <p>Custom subtitle layout details.</p>
    </template>

    <!-- ✍️ Default Slot (Modal Body Content) -->
    <p>Form fields or configuration details go here.</p>

    <!-- ⚙️ Modal Actions/Footer Slot -->
    <template #actions>
      <IdButton variant="secondary" @click="isOpen = false">Cancel</IdButton>
      <IdButton variant="primary" @click="save">Save Changes</IdButton>
    </template>
  </IdModal>
</template>`,
      dialog: `<template>
  <IdDialog v-model="isOpen" title="Confirmation">
    <!-- 🔒 Custom Header Slot Override (Optional) -->
    <template #title>
      <h3>Delete Account</h3>
    </template>

    <!-- ✍️ Default Slot (Dialog Body Content) -->
    <p>Are you sure you want to delete this workspace? This action is irreversible.</p>

    <!-- ⚙️ Dialog Actions/Footer Slot -->
    <template #footer>
      <IdButton variant="secondary" @click="isOpen = false">Cancel</IdButton>
      <IdButton variant="danger" @click="deleteAccount">Delete</IdButton>
    </template>
  </IdDialog>
</template>`,
      drawer: `<template>
  <IdDrawer v-model="isOpen" title="Drawer Menu">
    <!-- 📋 Header Title Slot Override -->
    <template #title>
      <h3>Advanced Settings</h3>
    </template>

    <!-- 📋 Header Description Slot Override -->
    <template #description>
      <p>Configure hardware options and settings.</p>
    </template>

    <!-- ✍️ Default Slot (Drawer Body Content) -->
    <div class="space-y-4">
      <p>First settings configuration row.</p>
      <p>Second settings configuration row.</p>
    </div>
  </IdDrawer>
</template>`,
      'bottom-sheet': `<template>
  <IdBottomSheet v-model="isOpen" title="Choose Option">
    <!-- 📋 Header Title Slot Override -->
    <template #title>
      <h3>Select Export Mode</h3>
    </template>

    <!-- ✍️ Default Slot (Sheet Body Content) -->
    <div class="sheet-actions">
      <button>Export as CSV</button>
      <button>Export as PDF</button>
    </div>
  </IdBottomSheet>
</template>`,
      table: `<template>
  <IdTable :columns="columns" :data="users">
    <!-- 🎨 Custom Column Cell Render (#col-{key}) -->
    <template #col-status="{ value }">
      <IdTag :variant="value === 'Active' ? 'success' : 'warning'">
        {{ value }}
      </IdTag>
    </template>

    <!-- ⚙️ Row Actions Column Override -->
    <template #actions="{ row }">
      <IdButton size="xs" variant="ghost">Edit</IdButton>
    </template>

    <!-- 🔍 Custom Empty State Slot Override -->
    <template #empty>
      <div class="text-center py-8">No results match your search query.</div>
    </template>
  </IdTable>
</template>`,
      tabs: `<template>
  <IdTabs v-model="activeTab" :tabs="tabOptions">
    <!-- ✍️ Slotted content per tab value (using slot matching tab value) -->
    <template #overview>
      <p>Overview dashboard content panel.</p>
    </template>
    <template #settings>
      <p>System settings configuration form.</p>
    </template>
  </IdTabs>
</template>`,
      accordion: `<template>
  <IdAccordion :items="accordionItems">
    <!-- ✍️ Custom Item Content Overrides by Index -->
    <template #item-0>
      <p>Custom HTML or media rendered inside the first accordion panel.</p>
    </template>
  </IdAccordion>
</template>`,
      'dropdown-menu': `<template>
  <IdDropdownMenu :items="menuItems">
    <!-- 🖱️ Trigger Slot (Element that toggles the dropdown) -->
    <template #trigger>
      <IdButton variant="secondary">Options ▾</IdButton>
    </template>
  </IdDropdownMenu>
</template>`,
      popover: `<template>
  <IdPopover title="Info Bubble">
    <!-- 🖱️ Trigger Slot (Anchor element) -->
    <template #trigger>
      <span class="info-icon">❓</span>
    </template>

    <!-- ✍️ Default Slot (Popover content) -->
    <p>Provides additional context for the setting.</p>
  </IdPopover>
</template>`,
      banner: `<template>
  <IdBanner message="Maintenance window tomorrow.">
    <!-- 🔔 Custom Leading Icon Slot -->
    <template #icon>
      <span>📢</span>
    </template>

    <!-- ⚡ Custom Action Slot -->
    <template #action>
      <IdButton size="sm" variant="outline">Learn More</IdButton>
    </template>
  </IdBanner>
</template>`,
      'empty-state': `<template>
  <IdEmpty title="No Active Subscriptions" description="Subscribe to a plan to start analytics.">
    <!-- 🔔 Custom Graphics/Icon Slot override -->
    <template #icon>
      <span>💎</span>
    </template>

    <!-- ⚡ Custom Action Button Slot override -->
    <template #action>
      <IdButton variant="primary">Choose Plan</IdButton>
    </template>
  </IdEmpty>
</template>`
    }

    if (componentSlotsTemplates[id]) {
      return componentSlotsTemplates[id]
    }

    return `<template>
  <${tag}>
    <!-- ✍️ Default Slot -->
    <span>Slotted content inside ${tag}</span>
  </${tag}>
</template>`
  } else {
    // 3. Theme (Global UI Config - Dynamic component-specific customizable keys mapping)
    const componentUiKeysMap = {
      button: ['base', 'label', 'iconLeft', 'iconRight', 'spinner'],
      'segmented-control': ['base', 'list', 'item', 'active'],
      input: ['base', 'label', 'input', 'prefix', 'suffix', 'hint', 'error'],
      textarea: ['base', 'label', 'input', 'hint'],
      select: ['base', 'label', 'select', 'hint', 'arrow'],
      checkbox: ['base', 'checkbox', 'label'],
      'radio-group': ['base', 'label', 'optionsContainer', 'option', 'radio', 'optionLabel'],
      toggle: ['base', 'switch', 'handle', 'label'],
      slider: ['base', 'label', 'track', 'fill', 'thumb', 'value'],
      tag: ['base', 'label', 'iconLeft', 'iconRight', 'closeButton'],
      badge: ['base', 'badge'],
      alert: ['base', 'icon', 'title', 'description', 'closeButton'],
      progress: ['base', 'label', 'value', 'track', 'fill'],
      spinner: ['base', 'spinner', 'label'],
      avatar: ['base', 'avatar', 'image', 'fallback', 'status'],
      skeleton: ['base'],
      panel: ['base'],
      card: ['base', 'header', 'title', 'description', 'body', 'footer'],
      modal: ['backdrop', 'surface', 'header', 'title', 'subtitle', 'close', 'closeButton', 'body', 'footer'],
      dialog: ['backdrop', 'surface', 'header', 'title', 'subtitle', 'close', 'closeButton', 'body', 'footer'],
      divider: ['base'],
      stack: ['base'],
      tooltip: ['base', 'tooltip', 'text'],
      'dropdown-menu': ['base', 'trigger', 'menu', 'item', 'label', 'shortcut'],
      drawer: ['backdrop', 'surface', 'header', 'title', 'description', 'desc', 'close', 'closeButton', 'body', 'footer'],
      'bottom-sheet': ['backdrop', 'surface', 'grabber', 'handle', 'header', 'title', 'description', 'desc', 'body', 'footer'],
      table: ['base', 'headerBar', 'title', 'searchBox', 'searchInput', 'table', 'thead', 'tr', 'th', 'tbody', 'td', 'actions', 'checkbox'],
      tabs: ['base', 'list', 'tab', 'trigger', 'active', 'indicator', 'panel'],
      accordion: ['base', 'item', 'trigger', 'title', 'chevron', 'content', 'body'],
      'avatar-group': ['base', 'container', 'item', 'overflow', 'label'],
      breadcrumbs: ['base', 'list', 'item', 'sep', 'separator', 'link', 'current'],
      pagination: ['base', 'button', 'active'],
      banner: ['base', 'inner', 'message', 'action', 'closeButton'],
      popover: ['base', 'trigger', 'card', 'content', 'title', 'subtitle', 'body'],
      'confirm-dialog': ['base', 'iconBox', 'title', 'message', 'actions', 'footer'],
      form: ['base'],
      'form-field': ['base', 'label', 'description', 'control', 'fieldControl', 'message'],
      'form-group': ['base'],
      'form-actions': ['base'],
      kbd: ['base', 'key', 'kbdKey'],
      separator: ['base', 'line', 'content', 'label'],
      'empty-state': ['base', 'iconBox', 'icon', 'title', 'description', 'desc', 'action']
    }

    const uiKeys = componentUiKeysMap[id] || ['base']
    const uiKeysObjStr = uiKeys.map(k => `        ${k}: 'custom-${id}-${k}-class'`).join(',\n')
    const localUiPropStr = uiKeys.slice(0, 2).map(k => `${k}: 'my-custom-${k}'`).join(', ')

    return `// ─── 1. GLOBAL OVERRIDES (main.js / app.js) ───
import { createApp } from 'vue'
import { createIdesign } from '@idesign/vue'
import App from './App.vue'

const app = createApp(App)

app.use(createIdesign({
  ui: {
    components: {
      ${baseName}: {
        // Default properties for all instances
        defaultProps: {
          size: 'md'
        },
        // Component-specific customizable key classes
        ui: {
${uiKeysObjStr}
        }
      }
    }
  }
}))

app.mount('#app')

// ─── 2. LOCAL PROP CUSTOMIZATION (SFC File) ───
<!-- Customize per-part styles locally on this instance -->
<template>
  <${tag} :ui="{ ${localUiPropStr} }" />
</template>`
  }
})
</script>

<style scoped>
.playground-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.header-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
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
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.5;
}

.preview-stage {
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  overflow: visible;
  background: var(--surface);
  position: relative;
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
.view-mode-toggles {
  display: flex;
  gap: 4px;
  background: rgba(0, 0, 0, 0.05);
  padding: 2px;
  border-radius: var(--r-pill);
}
.mode-btn {
  border: none;
  font-size: 11.5px;
  font-weight: 550;
  padding: 3px 10px;
  border-radius: var(--r-pill);
  background: transparent;
  color: var(--text-2);
  cursor: pointer;
}
.mode-btn.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.canvas-area {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  transition: background 0.2s ease;
}
.canvas-area.bg-light {
  background: var(--bg);
}
.canvas-area.bg-dark {
  background: #000000;
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

.code-inspector {
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  overflow: hidden;
  background: #1d1d1f;
  color: #ffffff;
}
.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: #141416;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.code-tabs {
  display: flex;
  gap: 4px;
}
.code-tab {
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font);
  font-size: 12.5px;
  font-weight: 550;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.code-tab.active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-weight: 600;
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

@media (max-width: 600px) {
  .stage-bar {
    flex-wrap: wrap;
    gap: 8px;
  }
  .props-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
  .code-header {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .code-tabs {
    overflow-x: auto;
    width: 100%;
    padding-bottom: 4px;
  }
  .code-tab {
    white-space: nowrap;
  }
  .copy-code-btn {
    align-self: flex-end;
    width: 100%;
    justify-content: center;
  }
  .canvas-area {
    padding: 16px 10px;
    overflow-x: auto;
  }
}

.api-docs-section {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.api-docs-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}
.api-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--hairline);
  border-radius: 12px;
  background: var(--surface);
}
.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}
.api-table th {
  padding: 10px 14px;
  background: rgba(0,0,0,0.02);
  color: var(--text-2);
  font-weight: 650;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--hairline);
}
.api-table td {
  padding: 10px 14px;
  color: var(--text);
  border-bottom: 1px solid var(--hairline);
}
.api-table tr:last-child td {
  border-bottom: none;
}
.prop-name code {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
}
.type-name code {
  color: var(--indigo);
  font-family: var(--mono);
  font-size: 12px;
}
.default-val code {
  color: var(--text-3);
  font-family: var(--mono);
  font-size: 12px;
}
.no-props {
  text-align: center;
  color: var(--text-3);
  padding: 16px !important;
}

/* Customization Docs Section */
.customization-docs-section {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.customization-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.customization-docs-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
  margin: 0;
}

.customization-tabs {
  display: inline-flex;
  background: var(--track);
  padding: 3px;
  border-radius: var(--r-pill);
  gap: 2px;
}

.cust-tab-btn {
  border: none;
  background: transparent;
  color: var(--text-2);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 550;
  padding: 4px 12px;
  border-radius: var(--r-pill);
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}

.cust-tab-btn:hover {
  color: var(--text);
}

.cust-tab-btn.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 650;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

:root.dark .cust-tab-btn.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

.customization-panel {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--sh-card);
}

.customization-tab-content {
  display: flex;
  flex-direction: column;
}

.code-box-header {
  padding: 9px 14px;
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
  letter-spacing: 0.02em;
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
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
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
  padding: 16px;
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 1.6;
  background: #18181b;
  color: #e4e4e7;
  overflow-x: auto;
  max-height: 320px;
}
</style>

