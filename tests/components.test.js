import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Core Components
import IdButton from '../src/components/idesign/IdButton.vue'
import IdSegmentedControl from '../src/components/idesign/IdSegmentedControl.vue'
import IdInput from '../src/components/idesign/IdInput.vue'
import IdTextarea from '../src/components/idesign/IdTextarea.vue'
import IdSelect from '../src/components/idesign/IdSelect.vue'
import IdCheckbox from '../src/components/idesign/IdCheckbox.vue'
import IdToggle from '../src/components/idesign/IdToggle.vue'
import IdSlider from '../src/components/idesign/IdSlider.vue'
import IdRadioGroup from '../src/components/idesign/IdRadioGroup.vue'
import IdTag from '../src/components/idesign/IdTag.vue'
import IdBadge from '../src/components/idesign/IdBadge.vue'
import IdAvatar from '../src/components/idesign/IdAvatar.vue'
import IdAvatarGroup from '../src/components/idesign/IdAvatarGroup.vue'
import IdLiveDot from '../src/components/idesign/IdLiveDot.vue'
import IdProgress from '../src/components/idesign/IdProgress.vue'
import IdAccordion from '../src/components/idesign/IdAccordion.vue'
import IdTabs from '../src/components/idesign/IdTabs.vue'
import IdTable from '../src/components/idesign/IdTable.vue'
import IdTimeline from '../src/components/idesign/IdTimeline.vue'
import IdStepper from '../src/components/idesign/IdStepper.vue'
import IdDatePicker from '../src/components/idesign/IdDatePicker.vue'
import IdAlert from '../src/components/idesign/IdAlert.vue'
import IdFileUpload from '../src/components/idesign/IdFileUpload.vue'
import IdStack from '../src/components/idesign/IdStack.vue'
import IdPanel from '../src/components/idesign/IdPanel.vue'
import IdPanelRow from '../src/components/idesign/IdPanelRow.vue'
import IdDivider from '../src/components/idesign/IdDivider.vue'
import IdBreadcrumbs from '../src/components/idesign/IdBreadcrumbs.vue'
import IdPagination from '../src/components/idesign/IdPagination.vue'
import IdEmpty from '../src/components/idesign/IdEmpty.vue'
import IdBottomSheet from '../src/components/idesign/IdBottomSheet.vue'
import IdMobileNavbar from '../src/components/idesign/IdMobileNavbar.vue'
import IdRating from '../src/components/idesign/IdRating.vue'
import IdDock from '../src/components/idesign/IdDock.vue'

// Compound Form System
import IdForm from '../src/components/idesign/IdForm.vue'
import IdFormField from '../src/components/idesign/IdFormField.vue'
import IdFormLabel from '../src/components/idesign/IdFormLabel.vue'
import IdFormDescription from '../src/components/idesign/IdFormDescription.vue'
import IdFormMessage from '../src/components/idesign/IdFormMessage.vue'
import IdFormGroup from '../src/components/idesign/IdFormGroup.vue'
import IdFormActions from '../src/components/idesign/IdFormActions.vue'

// Compound Card System
import IdCard from '../src/components/idesign/IdCard.vue'
import IdCardHeader from '../src/components/idesign/IdCardHeader.vue'
import IdCardTitle from '../src/components/idesign/IdCardTitle.vue'
import IdCardDescription from '../src/components/idesign/IdCardDescription.vue'
import IdCardContent from '../src/components/idesign/IdCardContent.vue'
import IdCardFooter from '../src/components/idesign/IdCardFooter.vue'

// Compound Dialog System
import IdDialog from '../src/components/idesign/IdDialog.vue'
import IdDialogHeader from '../src/components/idesign/IdDialogHeader.vue'
import IdDialogTitle from '../src/components/idesign/IdDialogTitle.vue'
import IdDialogDescription from '../src/components/idesign/IdDialogDescription.vue'
import IdDialogBody from '../src/components/idesign/IdDialogBody.vue'
import IdDialogFooter from '../src/components/idesign/IdDialogFooter.vue'

// Hardware Shells & Layout Components
import IdMacbookFrame from '../src/components/idesign/IdMacbookFrame.vue'
import IdIpadFrame from '../src/components/idesign/IdIpadFrame.vue'
import IdSidebar from '../src/components/idesign/IdSidebar.vue'
import IdHeader from '../src/components/idesign/IdHeader.vue'
import IdFooter from '../src/components/idesign/IdFooter.vue'
import IdBanner from '../src/components/idesign/IdBanner.vue'
import IdSeparator from '../src/components/idesign/IdSeparator.vue'
import IdKbd from '../src/components/idesign/IdKbd.vue'

// Advanced Form Inputs
import IdPinInput from '../src/components/idesign/IdPinInput.vue'
import IdTimePicker from '../src/components/idesign/IdTimePicker.vue'
import IdTagInput from '../src/components/idesign/IdTagInput.vue'
import IdRating from '../src/components/idesign/IdRating.vue'
import IdNumberInput from '../src/components/idesign/IdNumberInput.vue'
import IdNumericStepper from '../src/components/idesign/IdNumberInput.vue'
import IdColorPicker from '../src/components/idesign/IdColorPicker.vue'
import IdPieChart from '../src/components/idesign/IdPieChart.vue'
import IdDonutChart from '../src/components/idesign/IdDonutChart.vue'
import IdQRCode from '../src/components/idesign/IdQRCode.vue'
const QRCode = IdQRCode
import IdTerminal from '../src/components/idesign/IdTerminal.vue'
const Terminal = IdTerminal
import IdMarquee from '../src/components/idesign/IdMarquee.vue'
const Marquee = IdMarquee
import IdDateRangePicker from '../src/components/idesign/IdDateRangePicker.vue'
const DateRangePicker = IdDateRangePicker





// Composables & Config
import { createIdesign, createUI, useIdesignConfig } from '../src/composables/useIdesignConfig'
import { useBreakpoint } from '../src/composables/useBreakpoint'

describe('Idesign Component Suite — Comprehensive Tests', () => {
  // ── 1. Buttons & Triggers ──
  it('renders IdButton with variant classes and handles click events', async () => {
    const wrapper = mount(IdButton, {
      props: { variant: 'primary', size: 'lg' },
      slots: { default: 'Get Started' }
    })
    expect(wrapper.text()).toContain('Get Started')
    expect(wrapper.classes()).toContain('btn-primary')
    expect(wrapper.classes()).toContain('size-lg')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // ── 2. Form Inputs & States ──
  it('renders IdInput with v-model, slots, and exposed focus methods', async () => {
    const wrapper = mount(IdInput, {
      props: { modelValue: 'alex@example.com', label: 'Email', clearable: true },
      slots: { prefix: '<span>✉️</span>' }
    })
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('✉️')
    const input = wrapper.find('input')
    expect(input.element.value).toBe('alex@example.com')
    await input.setValue('updated@example.com')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['updated@example.com'])
  })

  it('renders IdToggle switch state and keyboard/click interaction', async () => {
    const wrapper = mount(IdToggle, { props: { modelValue: false, label: 'Notifications' } })
    expect(wrapper.text()).toContain('Notifications')
    const button = wrapper.find('button[role="switch"]')
    expect(button.attributes('aria-checked')).toBe('false')
    await button.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  it('renders IdCheckbox with indeterminate and checked states', async () => {
    const wrapper = mount(IdCheckbox, { props: { modelValue: true, label: 'Agree to terms' } })
    expect(wrapper.text()).toContain('Agree to terms')
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.attributes('aria-checked')).toBe('true')
  })

  it('renders IdSelect options with keyboard navigation and combobox semantics', async () => {
    const wrapper = mount(IdSelect, {
      props: { options: [{ value: 'vue', label: 'Vue 3' }, { value: 'nuxt', label: 'Nuxt 3' }], modelValue: 'vue', label: 'Framework' }
    })
    expect(wrapper.text()).toContain('Framework')
    expect(wrapper.text()).toContain('Vue 3')
    const combobox = wrapper.find('[role="combobox"]')
    expect(combobox.exists()).toBe(true)
  })

  // ── 3. Compound Form System ──
  it('renders Compound Form hierarchy seamlessly', () => {
    const wrapper = mount({
      components: { IdForm, IdFormField, IdFormLabel, IdFormDescription, IdFormMessage, IdFormGroup, IdFormActions, IdInput, IdButton },
      template: `
        <IdForm density="compact">
          <IdFormGroup inline>
            <IdFormField label="First Name" required>
              <IdInput modelValue="Jane" />
            </IdFormField>
          </IdFormGroup>
          <IdFormActions align="right">
            <IdButton variant="primary">Submit</IdButton>
          </IdFormActions>
        </IdForm>
      `
    })
    expect(wrapper.text()).toContain('First Name')
    expect(wrapper.text()).toContain('Submit')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  // ── 4. Compound Card System ──
  it('renders Compound Card subcomponents', () => {
    const wrapper = mount({
      components: { IdCard, IdCardHeader, IdCardTitle, IdCardDescription, IdCardContent, IdCardFooter, IdButton },
      template: `
        <IdCard variant="glass" padding="md">
          <IdCardHeader>
            <IdCardTitle tag="h2">Spatial Card</IdCardTitle>
            <IdCardDescription>High fidelity visual panel</IdCardDescription>
          </IdCardHeader>
          <IdCardContent>
            <p>Body paragraph inside compound card.</p>
          </IdCardContent>
          <IdCardFooter>
            <IdButton size="sm">Action</IdButton>
          </IdCardFooter>
        </IdCard>
      `
    })
    expect(wrapper.text()).toContain('Spatial Card')
    expect(wrapper.text()).toContain('High fidelity visual panel')
    expect(wrapper.text()).toContain('Body paragraph inside compound card.')
    expect(wrapper.text()).toContain('Action')
  })

  // ── 5. Compound Dialog System ──
  it('renders Compound Dialog structure', () => {
    const wrapper = mount({
      components: { IdDialog, IdDialogHeader, IdDialogTitle, IdDialogDescription, IdDialogBody, IdDialogFooter, IdButton },
      template: `
        <IdDialog :modelValue="true" :teleport="false" title="Test Dialog">
          <IdDialogHeader>
            <IdDialogTitle>Dialog Title</IdDialogTitle>
            <IdDialogDescription>Dialog Subtitle</IdDialogDescription>
          </IdDialogHeader>
          <IdDialogBody>
            <p>Dialog body text</p>
          </IdDialogBody>
          <IdDialogFooter>
            <IdButton variant="ghost">Close</IdButton>
          </IdDialogFooter>
        </IdDialog>
      `
    })
    expect(wrapper.text()).toContain('Dialog Title')
    expect(wrapper.text()).toContain('Dialog body text')
    expect(wrapper.text()).toContain('Close')
  })

  // ── 6. Navigation & Accessibility ──
  it('renders IdTabs with tablist roles and keyboard accessibility', async () => {
    const wrapper = mount(IdTabs, {
      props: {
        modelValue: 'overview',
        tabs: [
          { value: 'overview', label: 'Overview' },
          { value: 'features', label: 'Features' }
        ]
      }
    })
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs.length).toBe(2)
    expect(tabs[0].attributes('aria-selected')).toBe('true')
    expect(tabs[1].attributes('aria-selected')).toBe('false')
  })

  it('renders IdAccordion with region roles and expandable sections', async () => {
    const wrapper = mount(IdAccordion, {
      props: {
        items: [{ title: 'What is Idesign?', content: 'A Liquid Glass UI component library.' }]
      }
    })
    expect(wrapper.text()).toContain('What is Idesign?')
    expect(wrapper.text()).toContain('A Liquid Glass UI component library.')
    const trigger = wrapper.find('.accordion-trigger')
    expect(trigger.attributes('aria-expanded')).toBe('true')
  })

  // ── 7. Data Display & Tables ──
  it('renders IdTable with sortable columns, rows, and empty state', () => {
    const wrapper = mount(IdTable, {
      props: {
        columns: [
          { key: 'name', label: 'Member' },
          { key: 'role', label: 'Designation' }
        ],
        data: [
          { name: 'Alex Rivera', role: 'Staff Designer' }
        ]
      }
    })
    expect(wrapper.text()).toContain('Member')
    expect(wrapper.text()).toContain('Designation')
    expect(wrapper.text()).toContain('Alex Rivera')
    expect(wrapper.text()).toContain('Staff Designer')
  })

  it('renders IdTable responsive header, borderless variant, Lucide filter/sort icons, and row actions', async () => {
    const wrapper = mount(IdTable, {
      props: {
        title: 'Team Directory',
        count: 42,
        variant: 'borderless',
        searchable: true,
        hasRowActions: true,
        columns: [
          { key: 'name', label: 'Name', sortable: true, filterable: true },
          { key: 'role', label: 'Role' }
        ],
        data: [
          { name: 'Alex Rivera', role: 'Staff Designer' },
          { name: 'Jane Doe', role: 'Engineering Lead' }
        ]
      }
    })

    // 1. Header checks
    expect(wrapper.find('.table-title').text()).toBe('Team Directory')
    expect(wrapper.find('.table-count-badge').text()).toBe('42')
    expect(wrapper.find('.table-search-input').exists()).toBe(true)

    // 2. Borderless variant
    expect(wrapper.classes()).toContain('variant-borderless')

    // 3. Lucide filter and sort icons
    const sortTh = wrapper.find('th.is-sortable')
    expect(sortTh.exists()).toBe(true)
    const filterBtn = wrapper.find('.col-filter-btn')
    expect(filterBtn.exists()).toBe(true)
    expect(filterBtn.attributes('aria-label')).toBe('Filter Name')

    // Click sort and filter
    await sortTh.trigger('click')
    expect(wrapper.emitted('sort')).toBeTruthy()

    await filterBtn.trigger('click')
    expect(wrapper.emitted('filter')).toBeTruthy()

    // 4. Row action button and event
    const actionBtn = wrapper.find('.row-action-btn')
    expect(actionBtn.exists()).toBe(true)
    expect(actionBtn.attributes('aria-label')).toBe('Row actions')
    await actionBtn.trigger('click')
    expect(wrapper.emitted('action-click')).toBeTruthy()
  })

  it('renders IdAvatarGroup with clean frameless +more indicator and stacked ui customization', () => {
    const wrapper = mount(IdAvatarGroup, {
      props: {
        users: [
          { name: 'Jane Smith' },
          { name: 'Alex Rivera' },
          { name: 'Sarah Chen' },
          { name: 'David Kim' },
          { name: 'Elena Rostova' }
        ],
        max: 3,
        variant: 'stacked',
        size: 'md',
        ui: {
          base: 'custom-group-base',
          stacked: 'custom-stacked-class',
          avatar: 'custom-avatar-class',
          more: 'custom-more-class',
          item: 'custom-item-class'
        }
      }
    })

    // 1. Root & Stacked UI customization
    expect(wrapper.classes()).toContain('custom-group-base')
    expect(wrapper.classes()).toContain('custom-stacked-class')
    expect(wrapper.classes()).toContain('variant-stacked')

    // 2. Visible avatar items & customized avatar class
    const items = wrapper.findAll('.avatar-item')
    expect(items.length).toBe(3)
    expect(items[0].classes()).toContain('custom-item-class')
    const innerAvatar = wrapper.find('.id-avatar')
    expect(innerAvatar.classes()).toContain('custom-avatar-class')

    // 3. Frameless +more indicator
    const overflow = wrapper.find('.avatar-overflow')
    expect(overflow.exists()).toBe(true)
    expect(overflow.text()).toContain('+2')
    expect(overflow.classes()).toContain('avatar-more')
    expect(overflow.classes()).toContain('custom-more-class')
    expect(overflow.classes()).toContain('size-md')
    expect(overflow.classes()).toContain('shape-circle')
    // Ensure no unwanted frame class when framed is false
    expect(overflow.classes()).not.toContain('is-framed')
  })

  it('renders IdAvatarGroup with hero variant and framed prop applied to all avatars and +more indicator', () => {
    const wrapper = mount(IdAvatarGroup, {
      props: {
        users: [
          { name: 'Jane Smith' },
          { name: 'Alex Rivera' },
          { name: 'Sarah Chen' },
          { name: 'David Kim' }
        ],
        max: 2,
        variant: 'hero',
        framed: true,
        label: '4 members'
      }
    })

    expect(wrapper.classes()).toContain('variant-hero')
    expect(wrapper.classes()).toContain('is-framed-group')

    // +more avatar gets is-framed class
    const overflow = wrapper.find('.avatar-overflow')
    expect(overflow.classes()).toContain('is-framed')
    expect(overflow.text()).toContain('+2')

    // Inner avatars get is-framed class
    const avatars = wrapper.findAll('.id-avatar')
    expect(avatars[0].classes()).toContain('is-framed')
  })

  it('renders IdTimeline with cards variant and ui customization', async () => {
    const wrapper = mount(IdTimeline, {
      props: {
        variant: 'cards',
        items: [
          {
            title: 'System Initialized',
            description: 'Core microservices deployed to cluster.',
            time: '5 min ago',
            status: 'primary',
            actions: [{ label: 'View Logs' }]
          },
          {
            title: 'Backup Complete',
            description: 'Snapshots stored in cold storage.',
            time: '1 hour ago',
            status: 'success'
          }
        ],
        ui: {
          base: 'custom-timeline-base',
          card: 'custom-timeline-card',
          title: 'custom-timeline-title',
          description: 'custom-timeline-desc',
          timestamp: 'custom-timeline-time',
          actions: 'custom-timeline-actions'
        }
      }
    })

    // 1. Base and cards variant
    expect(wrapper.classes()).toContain('variant-cards')
    expect(wrapper.classes()).toContain('custom-timeline-base')

    // 2. Timeline items and cards
    const items = wrapper.findAll('.timeline-item')
    expect(items.length).toBe(2)

    const cards = wrapper.findAll('.timeline-card')
    expect(cards.length).toBe(2)
    expect(cards[0].classes()).toContain('custom-timeline-card')

    // 3. Content elements and UI classes
    expect(wrapper.find('.timeline-title').text()).toBe('System Initialized')
    expect(wrapper.find('.timeline-title').classes()).toContain('custom-timeline-title')
    expect(wrapper.find('.timeline-time').text()).toBe('5 min ago')
    expect(wrapper.find('.timeline-time').classes()).toContain('custom-timeline-time')
    expect(wrapper.find('.timeline-desc').text()).toBe('Core microservices deployed to cluster.')
    expect(wrapper.find('.timeline-desc').classes()).toContain('custom-timeline-desc')

    // 4. Actions
    const actionBtn = wrapper.find('.timeline-action-btn')
    expect(actionBtn.exists()).toBe(true)
    expect(actionBtn.text()).toBe('View Logs')
    await actionBtn.trigger('click')
    expect(wrapper.emitted('action')).toBeTruthy()
  })

  it('renders IdStepper with horizontal and vertical orientation and ui customization', async () => {
    // 1. Horizontal orientation (default)
    const wrapper = mount(IdStepper, {
      props: {
        modelValue: 1,
        orientation: 'horizontal',
        clickable: true,
        steps: [
          { label: 'Account', description: 'Create user' },
          { label: 'Security', description: '2FA settings' },
          { label: 'Review', description: 'Confirm details' }
        ],
        ui: {
          base: 'custom-stepper-base',
          item: 'custom-stepper-item',
          connector: 'custom-stepper-connector',
          indicator: 'custom-stepper-indicator',
          title: 'custom-stepper-title',
          description: 'custom-stepper-desc'
        }
      }
    })

    expect(wrapper.classes()).toContain('orientation-horizontal')
    expect(wrapper.classes()).toContain('custom-stepper-base')

    const items = wrapper.findAll('.step-item')
    expect(items.length).toBe(3)
    expect(items[0].classes()).toContain('is-completed')
    expect(items[1].classes()).toContain('is-active')
    expect(items[2].classes()).toContain('step-status-pending')

    // Click step to change
    await items[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])

    // 2. Vertical orientation
    const verticalWrapper = mount(IdStepper, {
      props: {
        modelValue: 0,
        orientation: 'vertical',
        steps: [
          { label: 'Step 1', description: 'Details 1' },
          { label: 'Step 2', description: 'Details 2' }
        ]
      }
    })

    expect(verticalWrapper.classes()).toContain('orientation-vertical')
    expect(verticalWrapper.find('.step-indicator-spine').exists()).toBe(true)
  })

  it('renders IdDatePicker with month and year selector navigation', async () => {
    const wrapper = mount(IdDatePicker, {
      props: {
        modelValue: '2026-10-15',
        label: 'Departure Date',
        ui: {
          base: 'custom-date-base'
        }
      }
    })

    expect(wrapper.classes()).toContain('custom-date-base')
    expect(wrapper.find('.picker-label').text()).toBe('Departure Date')

    // Open popover
    await wrapper.find('.picker-input').trigger('click')
    expect(wrapper.find('.picker-popover').exists()).toBe(true)

    // Month & Year buttons exist
    const monthBtn = wrapper.find('.month-select-btn')
    const yearBtn = wrapper.find('.year-select-btn')
    expect(monthBtn.exists()).toBe(true)
    expect(yearBtn.exists()).toBe(true)

    // Switch to Months view
    await monthBtn.trigger('click')
    expect(wrapper.find('.months-grid').exists()).toBe(true)
    const monthCells = wrapper.findAll('.month-cell')
    expect(monthCells.length).toBe(12)

    // Select March (idx 2)
    await monthCells[2].trigger('click')
    // Returns to days view
    expect(wrapper.find('.days-grid').exists()).toBe(true)

    // Switch to Years view
    await yearBtn.trigger('click')
    expect(wrapper.find('.years-grid').exists()).toBe(true)
    const yearCells = wrapper.findAll('.year-cell')
    expect(yearCells.length).toBe(12)
  })

  it('renders IdAlert with semantic colors, variants, actions, and dismiss', async () => {
    const wrapper = mount(IdAlert, {
      props: {
        color: 'success',
        variant: 'subtle',
        title: 'Deployment Succeeded',
        description: 'Your app is live on the edge network.',
        dismissible: true,
        action: { label: 'View Logs' },
        ui: {
          base: 'custom-alert-base',
          title: 'custom-alert-title',
          description: 'custom-alert-desc'
        }
      }
    })

    expect(wrapper.classes()).toContain('alert-variant-subtle')
    expect(wrapper.classes()).toContain('alert-color-success')
    expect(wrapper.classes()).toContain('custom-alert-base')
    expect(wrapper.find('.alert-title').text()).toBe('Deployment Succeeded')
    expect(wrapper.find('.alert-message').text()).toContain('Your app is live')

    // Action button
    const actionBtn = wrapper.find('.alert-action-btn')
    expect(actionBtn.exists()).toBe(true)
    expect(actionBtn.text()).toBe('View Logs')
    await actionBtn.trigger('click')
    expect(wrapper.emitted('action')).toBeTruthy()

    // Dismiss button
    const closeBtn = wrapper.find('.alert-close')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('renders IdTag with semantic variants', () => {
    const wrapper = mount(IdTag, { props: { variant: 'heat' }, slots: { default: 'Hot Release' } })
    expect(wrapper.text()).toBe('Hot Release')
    expect(wrapper.classes()).toContain('tag-heat')
  })

  it('renders IdProgress bar value and indeterminate mode', () => {
    const wrapper = mount(IdProgress, { props: { value: 68, showValue: true } })
    expect(wrapper.text()).toContain('68%')
  })

  // ── 8. Layout & Helpers ──
  it('renders IdStack and IdPanel layout containers', () => {
    const wrapper = mount(IdStack, { props: { direction: 'horizontal' }, slots: { default: '<div>Stack Child</div>' } })
    expect(wrapper.text()).toContain('Stack Child')
  })

  it('renders IdFileUpload with drop zone and file list', () => {
    const wrapper = mount(IdFileUpload, { props: { hint: 'Max 25MB', variant: 'glass' } })
    expect(wrapper.text()).toContain('Max 25MB')
    expect(wrapper.classes()).toContain('variant-glass')
  })

  it('renders IdFileUpload with avatar variant and image preview and badge', () => {
    const wrapper = mount(IdFileUpload, {
      props: {
        variant: 'avatar',
        shape: 'circle',
        size: 'lg',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      }
    })

    expect(wrapper.classes()).toContain('variant-avatar')
    expect(wrapper.classes()).toContain('size-lg')
    expect(wrapper.find('.avatar-upload-wrapper').classes()).toContain('shape-circle')
    expect(wrapper.find('.avatar-preview-img').attributes('src')).toContain('photo-1534528741775-53994a69daeb')
    expect(wrapper.find('.avatar-badge').exists()).toBe(true)
  })

  it('renders IdFileUpload with button variant and custom button label', () => {
    const wrapper = mount(IdFileUpload, {
      props: {
        variant: 'button',
        buttonLabel: 'Select Document',
        buttonVariant: 'secondary',
        size: 'md'
      }
    })

    expect(wrapper.classes()).toContain('variant-button')
    const btn = wrapper.find('.upload-btn-trigger')
    expect(btn.classes()).toContain('btn-secondary')
    expect(btn.text()).toContain('Select Document')
  })

  it('renders IdFileUpload with image-card variant and aspect ratio', () => {
    const wrapper = mount(IdFileUpload, {
      props: {
        variant: 'image-card',
        aspectRatio: '16-9',
        title: 'Upload Media Banner'
      }
    })

    expect(wrapper.classes()).toContain('variant-image-card')
    expect(wrapper.find('.image-card-dropzone').classes()).toContain('aspect-16-9')
    expect(wrapper.text()).toContain('Upload Media Banner')
  })

  // ── 9. Hardware Shells ──
  it('renders IdMacbookFrame with lid and menu bar', () => {
    const wrapper = mount(IdMacbookFrame, {
      props: { appName: 'Keynote', color: 'space-gray' },
      slots: { default: '<div class="test-window">Mac Window</div>' }
    })
    expect(wrapper.text()).toContain('Keynote')
    expect(wrapper.text()).toContain('Mac Window')
    expect(wrapper.classes()).toContain('color-space-gray')
  })

  it('renders IdIpadFrame with orientation', () => {
    const wrapper = mount(IdIpadFrame, {
      props: { orientation: 'portrait' },
      slots: { default: '<div class="test-pad">Pad Screen</div>' }
    })
    expect(wrapper.text()).toContain('Pad Screen')
    expect(wrapper.classes()).toContain('orientation-portrait')
  })

  // ── 10. Layout, Navigation & Banner Components ──
  it('renders IdSidebar with groups, brand, nested submenus, collapsible state, and ui customization', async () => {
    const wrapper = mount(IdSidebar, {
      props: {
        title: 'Cloud Console',
        modelValue: 'dashboard',
        collapsible: true,
        variant: 'glass',
        groups: [
          {
            title: 'Workspace',
            collapsible: true,
            items: [
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              {
                id: 'projects',
                label: 'Projects',
                icon: '📁',
                badge: '12',
                children: [
                  { id: 'all-projects', label: 'All Projects' }
                ]
              }
            ]
          }
        ],
        ui: {
          base: 'custom-sidebar-base',
          header: 'custom-sidebar-header',
          item: 'custom-sidebar-item',
          badge: 'custom-sidebar-badge'
        }
      }
    })

    expect(wrapper.classes()).toContain('custom-sidebar-base')
    expect(wrapper.classes()).toContain('variant-glass')
    expect(wrapper.text()).toContain('Cloud Console')
    expect(wrapper.text()).toContain('Dashboard')

    // Active item
    const items = wrapper.findAll('.sidebar-item')
    expect(items[0].classes()).toContain('is-active')
    expect(items[0].classes()).toContain('custom-sidebar-item')

    // Badge
    expect(wrapper.find('.item-badge').text()).toBe('12')

    // Nested children
    const parentItem = wrapper.find('.has-children')
    expect(parentItem.exists()).toBe(true)
    await parentItem.trigger('click')
    expect(wrapper.find('.nested-children').exists()).toBe(true)
    expect(wrapper.text()).toContain('All Projects')

    // Collapse toggle button
    const collapseBtn = wrapper.find('.sidebar-collapse-btn')
    expect(collapseBtn.exists()).toBe(true)
    await collapseBtn.trigger('click')
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true])
  })

  it('renders IdHeader and IdFooter semantics', () => {
    const headerWrapper = mount(IdHeader, {
      props: { title: 'Settings', subtitle: 'Manage account' }
    })
    expect(headerWrapper.text()).toContain('Settings')
    expect(headerWrapper.text()).toContain('Manage account')

    const footerWrapper = mount(IdFooter, {
      props: { countryText: 'United States' }
    })
    expect(footerWrapper.text()).toContain('United States')
  })

  it('renders IdBanner with action and dismissal', async () => {
    const wrapper = mount(IdBanner, {
      props: { message: 'New update available!', actionLabel: 'Update Now' }
    })
    expect(wrapper.text()).toContain('New update available!')
    expect(wrapper.text()).toContain('Update Now')
    await wrapper.find('.banner-close-btn').trigger('click')
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('renders IdSeparator and IdKbd', () => {
    const sepWrapper = mount(IdSeparator, { props: { label: 'OR' } })
    expect(sepWrapper.text()).toContain('OR')

    const kbdWrapper = mount(IdKbd, { props: { keys: 'cmd+k' } })
    expect(kbdWrapper.text()).toContain('⌘')
    expect(kbdWrapper.text()).toContain('K')
  })

  // ── 11. Advanced Form Inputs ──
  it('renders IdPinInput with multi-box entry and paste handler', async () => {
    const wrapper = mount(IdPinInput, { props: { length: 4, modelValue: '12' } })
    const inputs = wrapper.findAll('.pin-digit-input')
    expect(inputs.length).toBe(4)
    expect(inputs[0].element.value).toBe('1')
    expect(inputs[1].element.value).toBe('2')
    expect(inputs[2].element.value).toBe('')
    expect(inputs[3].element.value).toBe('')
  })

  it('supports pasting a code entering all PIN fields and handles clearing per box and all', async () => {
    const wrapper = mount(IdPinInput, { props: { length: 4, modelValue: '' } })
    const inputs = wrapper.findAll('.pin-digit-input')

    // Paste full 4-digit code
    const pasteEvent = {
      preventDefault: () => { },
      clipboardData: {
        getData: () => '8492'
      }
    }
    await wrapper.find('.pin-boxes').trigger('paste', pasteEvent)
    expect(wrapper.emitted('update:modelValue').slice(-1)[0]).toEqual(['8492'])
    expect(wrapper.emitted('complete')).toBeTruthy()

    // Test clearing single box at index 1 via backspace/input
    await inputs[1].setValue('')
    expect(wrapper.emitted('update:modelValue').slice(-1)[0]).toEqual(['892'])

    // Test backspace clearing on specific box
    await inputs[2].trigger('keydown', { key: 'Backspace' })
    expect(inputs[2].element.value).toBe('')

    // Test component instance clear method
    wrapper.vm.clear()
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue').slice(-1)[0]).toEqual([''])

    // Test external reset via modelValue prop change to empty
    await wrapper.setProps({ modelValue: '9999' })
    expect(inputs[0].element.value).toBe('9')
    await wrapper.setProps({ modelValue: '' })
    expect(inputs[0].element.value).toBe('')
    expect(inputs[1].element.value).toBe('')
  })

  it('renders IdTimePicker with hour/minute stepping and 12h/24h modes', async () => {
    const wrapper = mount(IdTimePicker, {
      props: {
        modelValue: '10:30',
        direction: 'horizontal',
        minuteStep: 5
      }
    })

    const hourInput = wrapper.find('.time-unit-input.hour')
    const minuteInput = wrapper.find('.time-unit-input.minute')
    expect(hourInput.element.value).toBe('10')
    expect(minuteInput.element.value).toBe('30')

    // Test stepping increment
    const incBtn = wrapper.find('.time-stepper-btn.increment')
    await incBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue').slice(-1)[0]).toEqual(['10:35'])

    // Test AM/PM toggle
    const pmBtn = wrapper.find('.period-btn.pm')
    await pmBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue').slice(-1)[0]).toEqual(['22:35'])

    // Test direct input typing
    await hourInput.setValue('08')
    await hourInput.trigger('input')
    expect(wrapper.emitted('update:modelValue').slice(-1)[0]).toEqual(['20:35'])

    // Test vertical layout with seconds and min/max
    const wrapper2 = mount(IdTimePicker, {
      props: {
        modelValue: '14:20:10',
        is24Hour: true,
        showSeconds: true,
        direction: 'vertical',
        min: '10:00:00',
        max: '16:00:00'
      }
    })
    expect(wrapper2.find('.time-unit-input.second').exists()).toBe(true)
    expect(wrapper2.find('.time-unit-input.second').element.value).toBe('10')
    expect(wrapper2.find('.period-btn').exists()).toBe(false)
  })

  it('renders IdTagInput and adds/removes tag chips', async () => {
    const wrapper = mount(IdTagInput, { props: { modelValue: ['Design', 'Vue'] } })
    expect(wrapper.text()).toContain('Design')
    expect(wrapper.text()).toContain('Vue')
    const removeBtn = wrapper.find('.tag-remove-btn')
    await removeBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([['Vue']])
  })

  it('renders IdRating with star selection', async () => {
    const wrapper = mount(IdRating, { props: { modelValue: 4, count: 5 } })
    const stars = wrapper.findAll('.star-btn')
    expect(stars.length).toBe(5)
    await stars[4].trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([5])
  })

  it('renders IdNumberInput with stepper buttons and handles increment/decrement', async () => {
    const wrapper = mount(IdNumberInput, { props: { modelValue: 10, step: 5, unit: 'px' } })
    expect(wrapper.text()).toContain('px')
    await wrapper.find('.stepper-btn.increment').trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([15])
    await wrapper.find('.stepper-btn.decrement').trigger('click')
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([10])
  })

  it('supports direct manual typing and editing in IdNumberInput', async () => {
    const wrapper = mount(IdNumberInput, { props: { modelValue: 20, min: 0, max: 100 } })
    const input = wrapper.find('input.number-native-input')
    await input.setValue('42')
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([42])

    await input.trigger('blur')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('clamps manual input to min and max boundaries on blur', async () => {
    const wrapper = mount(IdNumberInput, { props: { modelValue: 50, min: 10, max: 80 } })
    const input = wrapper.find('input.number-native-input')
    await input.setValue('150')
    await input.trigger('blur')
    const emits = wrapper.emitted('update:modelValue')
    expect(emits[emits.length - 1]).toEqual([80])
  })

  it('handles keyboard navigation (ArrowUp, ArrowDown, Shift+ArrowUp, Enter, Escape, Home, End)', async () => {
    const wrapper = mount(IdNumberInput, { props: { modelValue: 20, step: 2, min: 0, max: 100 } })
    const input = wrapper.find('input.number-native-input')

    // ArrowUp
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([22])

    // Shift + ArrowUp (10x step => 22 + 20 = 42)
    await input.trigger('keydown', { key: 'ArrowUp', shiftKey: true })
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([42])

    // Home / End
    await input.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')[2]).toEqual([0])

    await input.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')[3]).toEqual([100])
  })

  it('supports vertical direction layout for IdNumberInput', async () => {
    const wrapper = mount(IdNumberInput, { props: { modelValue: 5, direction: 'vertical' } })
    expect(wrapper.classes()).toContain('direction-vertical')
    expect(wrapper.find('.vertical-top.increment').exists()).toBe(true)
    expect(wrapper.find('.vertical-bottom.decrement').exists()).toBe(true)
  })

  it('supports prefix, suffix, and unit affixes and custom ui overrides', async () => {
    const wrapper = mount(IdNumberInput, {
      props: {
        modelValue: 99,
        prefix: '$',
        suffix: 'USD',
        unit: '/mo',
        label: 'Price',
        ui: {
          base: 'custom-stepper-base',
          decrement: 'custom-dec-btn',
          increment: 'custom-inc-btn',
          input: 'custom-input-elem'
        }
      }
    })
    expect(wrapper.text()).toContain('$')
    expect(wrapper.text()).toContain('USD')
    expect(wrapper.text()).toContain('/mo')
    expect(wrapper.text()).toContain('Price')
    expect(wrapper.classes()).toContain('custom-stepper-base')
    expect(wrapper.find('.custom-dec-btn').exists()).toBe(true)
    expect(wrapper.find('.custom-inc-btn').exists()).toBe(true)
    expect(wrapper.find('.custom-input-elem').exists()).toBe(true)
  })

  it('verifies IdNumericStepper alias export works identically', async () => {
    const wrapper = mount(IdNumericStepper, { props: { modelValue: 12, stepVal: 3 } })
    expect(wrapper.find('input.number-native-input').exists()).toBe(true)
    await wrapper.find('.stepper-btn.increment').trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([15])
  })

  it('renders IdColorPicker in trigger and popover mode with preset swatches', async () => {
    const wrapper = mount(IdColorPicker, { props: { modelValue: '#0071E3', label: 'Theme Color' } })
    expect(wrapper.text()).toContain('Theme Color')
    expect(wrapper.find('.picker-trigger').exists()).toBe(true)

    // Open popover by clicking trigger
    await wrapper.find('.picker-trigger').trigger('click')
    expect(wrapper.find('.picker-panel').exists()).toBe(true)

    const swatches = wrapper.findAll('.preset-swatch')
    expect(swatches.length).toBeGreaterThan(0)
    await swatches[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('supports inline rendering, mode switching, and multiple color formats in IdColorPicker', async () => {
    const wrapper = mount(IdColorPicker, {
      props: {
        modelValue: 'rgb(255, 0, 0)',
        inline: true,
        mode: 'spectrum',
        format: 'rgb'
      }
    })

    // Inline panel is directly visible
    expect(wrapper.find('.picker-panel.is-inline-panel').exists()).toBe(true)
    expect(wrapper.find('.spectrum-area').exists()).toBe(true)

    // Mode switching to Grid
    const modeTabs = wrapper.findAll('.mode-tab')
    expect(modeTabs.length).toBe(3) // Spectrum, Grid, Sliders
    await modeTabs[1].trigger('click')
    expect(wrapper.find('.mode-grid-content').exists()).toBe(true)

    // Switch to Sliders mode
    await modeTabs[2].trigger('click')
    expect(wrapper.find('.mode-sliders-content').exists()).toBe(true)

    // Select color in grid mode
    await modeTabs[1].trigger('click')
    const gridSwatches = wrapper.findAll('.grid-swatch-item')
    expect(gridSwatches.length).toBeGreaterThan(0)
    await gridSwatches[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('handles manual hex and channel inputs in IdColorPicker', async () => {
    const wrapper = mount(IdColorPicker, {
      props: {
        modelValue: '#34C759',
        inline: true
      }
    })

    const hexInput = wrapper.find('input.hex-input')
    expect(hexInput.exists()).toBe(true)
    await hexInput.setValue('#FF3B30')
    await hexInput.trigger('input')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // ── 12. Global Configuration & Composables ──
  it('verifies createIdesign, createUI, and useIdesignConfig helper methods', () => {
    const plugin = createUI({
      theme: 'dark',
      density: 'compact',
      defaults: {
        Button: { size: 'lg' }
      }
    })
    expect(plugin).toBeDefined()
    expect(typeof plugin.install).toBe('function')

    const config = useIdesignConfig()
    expect(config.formatNumber(1250000)).toBe('1,250,000')
    expect(config.formatCurrency(99.5, 'USD')).toContain('99.50')
  })

  it('verifies useBreakpoint composable helpers', () => {
    const bp = useBreakpoint()
    expect(bp.breakpoints.md).toBe(768)
    expect(typeof bp.isMobile).toBe('function')
    expect(typeof bp.isTablet).toBe('function')
    expect(typeof bp.isDesktop).toBe('function')
  })

  // ── 13. UI Customization prop and API Resolution ──
  it('applies per-part class customization via the ui prop', () => {
    const wrapper = mount(IdButton, {
      props: {
        ui: {
          base: 'custom-btn-base-class',
          label: 'custom-btn-label-class'
        }
      },
      slots: { default: 'Click me' }
    })
    expect(wrapper.classes()).toContain('custom-btn-base-class')
    const labelSpan = wrapper.find('.btn-label')
    expect(labelSpan.classes()).toContain('custom-btn-label-class')
  })

  it('resolves backward-compatible variant and color aliases correctly', () => {
    // Subtle variant mapping to subtle/soft
    const wrapperSubtle = mount(IdButton, {
      props: { variant: 'subtle', color: 'green' }
    })
    expect(wrapperSubtle.classes()).toContain('btn-subtle')
    expect(wrapperSubtle.classes()).toContain('color-green')

    // Standard mapping alias primary -> default (which maps to btn-primary)
    const wrapperPrimary = mount(IdButton, {
      props: { variant: 'primary', color: 'primary' }
    })
    expect(wrapperPrimary.classes()).toContain('btn-primary')
    expect(wrapperPrimary.classes()).toContain('color-blue')
  })

  it('verifies global defaults resolve and cascade correctly', () => {
    // Inject custom config via createUI
    const plugin = createUI({
      ui: {
        components: {
          Button: {
            defaultProps: {
              size: 'lg',
              variant: 'outline'
            },
            ui: {
              base: 'global-custom-base'
            }
          }
        }
      }
    })

    // Mount using the custom config context
    const App = {
      components: { IdButton },
      template: '<IdButton>Global Custom Button</IdButton>'
    }

    const wrapper = mount(App, {
      global: {
        plugins: [plugin]
      }
    })

    const button = wrapper.findComponent(IdButton)
    expect(button.classes()).toContain('size-lg')
    expect(button.classes()).toContain('btn-outline')
    expect(button.classes()).toContain('global-custom-base')
  })

  it('verifies IdTable custom sizing, radius, and ui prop customization', () => {
    const wrapper = mount(IdTable, {
      props: {
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' }
        ],
        data: [
          { name: 'Alice', role: 'Engineer' }
        ],
        size: 'sm',
        radius: 'lg',
        ui: {
          base: 'custom-table-base',
          thead: 'custom-table-thead'
        }
      }
    })
    expect(wrapper.classes()).toContain('custom-table-base')
    expect(wrapper.classes()).toContain('is-compact')
    expect(wrapper.classes()).toContain('radius-lg')
    const thead = wrapper.find('thead')
    expect(thead.classes()).toContain('custom-table-thead')
  })

  it('verifies IdTabs resolved size, variant, and ui customization', () => {
    const wrapper = mount(IdTabs, {
      props: {
        modelValue: 'tab1',
        tabs: [
          { value: 'tab1', label: 'Tab 1' },
          { value: 'tab2', label: 'Tab 2' }
        ],
        size: 'lg',
        variant: 'pill',
        ui: {
          list: 'custom-tabs-list',
          tab: 'custom-tabs-tab',
          active: 'custom-active-tab'
        }
      }
    })
    expect(wrapper.classes()).toContain('size-lg')
    expect(wrapper.classes()).toContain('variant-pill')
    expect(wrapper.find('.tabs-list').classes()).toContain('custom-tabs-list')
    const triggers = wrapper.findAll('.tab-trigger')
    expect(triggers[0].classes()).toContain('custom-tabs-tab')
    expect(triggers[0].classes()).toContain('custom-active-tab')
  })

  it('verifies IdEmpty customization, dynamic ui classes, and noBg prop', () => {
    const wrapper = mount(IdEmpty, {
      props: {
        title: 'Custom Empty Title',
        noBg: true,
        ui: {
          base: 'custom-empty-base',
          title: 'custom-empty-title-text'
        }
      }
    })
    expect(wrapper.classes()).toContain('custom-empty-base')
    expect(wrapper.classes()).toContain('no-bg')
    expect(wrapper.find('.empty-title').classes()).toContain('custom-empty-title-text')
  })

  it('verifies IdBottomSheet customizable features, actions, teleport, and responsiveness properties', () => {
    const wrapper = mount(IdBottomSheet, {
      props: {
        modelValue: true,
        title: 'Custom Sheet Title',
        description: 'Custom Description Text',
        showGrabber: true,
        height: '60vh',
        teleport: false,
        ui: {
          surface: 'custom-surface-class',
          title: 'custom-title-class'
        }
      }
    })
    expect(wrapper.find('.sheet-surface').classes()).toContain('custom-surface-class')
    expect(wrapper.find('.sheet-surface').attributes('style')).toContain('height: 60vh')
    expect(wrapper.find('.sheet-grabber').exists()).toBe(true)
    expect(wrapper.find('.sheet-title').text()).toBe('Custom Sheet Title')
    expect(wrapper.find('.sheet-title').classes()).toContain('custom-title-class')
    expect(wrapper.find('.sheet-desc').text()).toBe('Custom Description Text')
  })

  it('verifies IdBottomSheet variants: inset, persistent and glass', () => {
    const insetWrapper = mount(IdBottomSheet, {
      props: {
        modelValue: true,
        variant: 'inset',
        teleport: false
      }
    })
    expect(insetWrapper.find('.sheet-surface').classes()).toContain('is-inset')
    expect(insetWrapper.find('.sheet-surface').classes()).toContain('variant-inset')

    const persistentWrapper = mount(IdBottomSheet, {
      props: {
        modelValue: false,
        variant: 'persistent',
        teleport: false
      }
    })
    // Persistent variant stays rendered in DOM even when modelValue is false
    expect(persistentWrapper.find('.sheet-surface').exists()).toBe(true)
    expect(persistentWrapper.find('.sheet-surface').classes()).toContain('is-persistent')
    expect(persistentWrapper.find('.sheet-surface').classes()).toContain('is-collapsed')
    expect(persistentWrapper.find('.sheet-backdrop').classes()).toContain('is-persistent')
  })

  it('verifies IdBottomSheet positions and header action slots (leading, trailing, footer)', async () => {
    const wrapper = mount(IdBottomSheet, {
      props: {
        modelValue: true,
        position: 'top',
        title: 'Top Sheet',
        teleport: false
      },
      slots: {
        leading: '<button class="custom-leading-btn">Back</button>',
        trailing: '<button class="custom-trailing-btn">Save</button>',
        footer: '<div class="custom-footer-content">Footer Actions</div>',
        default: '<div class="custom-body-content">Sheet Body Content</div>'
      }
    })

    expect(wrapper.find('.sheet-surface').classes()).toContain('pos-top')
    expect(wrapper.find('.sheet-backdrop').classes()).toContain('pos-backdrop-top')
    expect(wrapper.find('.custom-leading-btn').text()).toBe('Back')
    expect(wrapper.find('.custom-trailing-btn').text()).toBe('Save')
    expect(wrapper.find('.custom-footer-content').text()).toBe('Footer Actions')
    expect(wrapper.find('.sheet-body').text()).toContain('Sheet Body Content')
  })

  it('verifies IdBottomSheet close button click and backdrop interaction emits update:modelValue', async () => {
    const wrapper = mount(IdBottomSheet, {
      props: {
        modelValue: true,
        title: 'Dismissible Sheet',
        dismissible: true,
        teleport: false
      }
    })

    const closeBtn = wrapper.find('.sheet-close-btn')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('verifies IdBottomSheet backdrop background options (none, dim, glass, blur)', () => {
    const noBgWrapper = mount(IdBottomSheet, {
      props: {
        modelValue: true,
        backdrop: false,
        teleport: false
      }
    })
    expect(noBgWrapper.find('.sheet-backdrop').classes()).toContain('no-backdrop-bg')
    expect(noBgWrapper.find('.sheet-backdrop').classes()).toContain('backdrop-none')

    const dimWrapper = mount(IdBottomSheet, {
      props: {
        modelValue: true,
        backdrop: 'dim',
        teleport: false
      }
    })
    expect(dimWrapper.find('.sheet-backdrop').classes()).toContain('backdrop-dim')
    expect(dimWrapper.find('.sheet-backdrop').classes()).toContain('has-backdrop-bg')

    const glassWrapper = mount(IdBottomSheet, {
      props: {
        modelValue: true,
        backdrop: 'glass',
        teleport: false
      }
    })
    expect(glassWrapper.find('.sheet-backdrop').classes()).toContain('backdrop-glass')
  })

  // ── 15. Dashboard Donut Chart & Progress Ring ──
  it('renders IdPieChart with full closed variant by default', () => {
    const wrapper = mount(IdPieChart, {
      props: {
        value: 75,
        max: 100,
        label: 'Disk Usage',
        variant: 'full'
      }
    })

    expect(wrapper.classes()).toContain('variant-full')
    const svg = wrapper.find('.donut-svg')
    expect(svg.exists()).toBe(true)
    expect(svg.classes()).toContain('svg-full')
    expect(svg.attributes('style')).toContain('rotate(-90deg)')

    const track = wrapper.find('.donut-track')
    expect(track.exists()).toBe(true)

    const progress = wrapper.find('.donut-progress')
    expect(progress.exists()).toBe(true)

    const center = wrapper.find('.donut-center')
    expect(center.text()).toContain('75')
    expect(center.text()).toContain('Disk Usage')
  })

  it('renders IdPieChart with open progress gauge variant', () => {
    const wrapper = mount(IdPieChart, {
      props: {
        value: 27,
        max: 100,
        unit: 'AQI',
        label: 'Air Quality',
        variant: 'progress',
        color: 'green'
      }
    })

    expect(wrapper.classes()).toContain('variant-progress')
    expect(wrapper.classes()).toContain('color-green')

    const svg = wrapper.find('.donut-svg')
    expect(svg.classes()).toContain('svg-progress')
    expect(svg.attributes('style')).toContain('rotate(150deg)')

    const track = wrapper.find('.donut-track')
    expect(track.attributes('stroke-linecap')).toBe('round')

    const progress = wrapper.find('.donut-progress')
    expect(progress.attributes('stroke-linecap')).toBe('round')

    const center = wrapper.find('.donut-center')
    expect(center.find('.donut-value').text()).toBe('27')
    expect(center.find('.donut-unit').text()).toBe('AQI')
    expect(center.find('.donut-label').text()).toBe('Air Quality')
  })

  it('supports composable center slots in IdPieChart', () => {
    const wrapper = mount(IdPieChart, {
      props: {
        value: 42,
        variant: 'progress'
      },
      slots: {
        default: '<div class="custom-center-box"><span>Custom Value: 42</span><button>Action</button></div>'
      }
    })

    expect(wrapper.find('.custom-center-box').exists()).toBe(true)
    expect(wrapper.find('.custom-center-box').text()).toContain('Custom Value: 42')
  })

  it('supports granular value, unit, and label slots in IdPieChart', () => {
    const wrapper = mount(IdPieChart, {
      props: {
        value: 88,
        unit: '%',
        label: 'Battery'
      },
      slots: {
        value: '<strong class="custom-val">88</strong>',
        unit: '<small class="custom-u">PERCENT</small>',
        label: '<span class="custom-lbl">Remaining Power</span>'
      }
    })

    expect(wrapper.find('.custom-val').text()).toBe('88')
    expect(wrapper.find('.custom-u').text()).toBe('PERCENT')
    expect(wrapper.find('.custom-lbl').text()).toBe('Remaining Power')
  })

  it('maintains backwards compatibility with multi-segment data array', () => {
    const wrapper = mount(IdPieChart, {
      props: {
        centerLabel: 'Protocols',
        data: [
          { label: 'HTTP/3', value: 60, color: '#0071e3' },
          { label: 'gRPC', value: 40, color: '#30d158' }
        ]
      }
    })

    expect(wrapper.classes()).toContain('is-card')
    expect(wrapper.classes()).toContain('has-legend')

    const segments = wrapper.findAll('.donut-segment')
    expect(segments.length).toBe(2)

    const center = wrapper.find('.donut-center')
    expect(center.text()).toContain('100')
    expect(center.text()).toContain('Protocols')

    const legendItems = wrapper.findAll('.legend-item')
    expect(legendItems.length).toBe(2)
    expect(legendItems[0].text()).toContain('HTTP/3')
    expect(legendItems[0].text()).toContain('60')
    expect(legendItems[1].text()).toContain('gRPC')
    expect(legendItems[1].text()).toContain('40')
  })

  it('verifies IdDonutChart works identically as alias wrapper', () => {
    const wrapper = mount(IdDonutChart, {
      props: {
        value: 92,
        unit: 'km/h',
        label: 'Speed',
        variant: 'progress',
        size: 'lg',
        color: 'orange'
      }
    })

    expect(wrapper.findComponent(IdPieChart).exists()).toBe(true)
    expect(wrapper.classes()).toContain('variant-progress')
    expect(wrapper.classes()).toContain('size-lg')
    expect(wrapper.classes()).toContain('color-orange')
    expect(wrapper.find('.donut-value').text()).toBe('92')
    expect(wrapper.find('.donut-unit').text()).toBe('km/h')
  })

  it('supports custom sizes, thickness, and ui overrides', () => {
    const wrapper = mount(IdDonutChart, {
      props: {
        value: 50,
        size: 160,
        thickness: 14,
        color: '#ff6b00',
        ui: {
          base: 'my-custom-chart',
          track: 'my-custom-track',
          progress: 'my-custom-progress',
          center: 'my-custom-center'
        }
      }
    })

    expect(wrapper.classes()).toContain('my-custom-chart')
    expect(wrapper.find('.donut-track').classes()).toContain('my-custom-track')
    expect(wrapper.find('.donut-progress').classes()).toContain('my-custom-progress')
    expect(wrapper.find('.donut-center').classes()).toContain('my-custom-center')
    expect(wrapper.find('.donut-wrapper').attributes('style')).toContain('width: 160px')
    expect(wrapper.find('.donut-wrapper').attributes('style')).toContain('height: 160px')
  })

  // ── 16. Segmented Control Smart Width Behavior ──
  it('automatically applies is-two-items and 50%/50% smart width when exactly 2 options are provided', async () => {
    const wrapper = mount(IdSegmentedControl, {
      props: {
        modelValue: 'Monthly',
        options: ['Monthly', 'Annually']
      }
    })

    expect(wrapper.classes()).toContain('is-two-items')
    const items = wrapper.findAll('.seg-item')
    expect(items.length).toBe(2)
    expect(items[0].classes()).toContain('active')
    expect(items[1].classes()).not.toContain('active')

    await items[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Annually'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['Annually'])
  })

  it('preserves standard sizing without is-two-items when 3 or more options are provided', () => {
    const wrapper = mount(IdSegmentedControl, {
      props: {
        modelValue: 'Overview',
        options: ['Overview', 'Components', 'Tokens']
      }
    })

    expect(wrapper.classes()).not.toContain('is-two-items')
    const items = wrapper.findAll('.seg-item')
    expect(items.length).toBe(3)
  })

  it('supports block mode to fill 100% container width across all items evenly', () => {
    const wrapper = mount(IdSegmentedControl, {
      props: {
        modelValue: 'tokens',
        options: [
          { id: 'tokens', label: 'Color & Radius Tokens' },
          { id: 'rules', label: '5 Philosophy Rules' },
          { id: 'ai-prompt', label: '✨ Vibe Coder AI Exporter' }
        ],
        block: true
      }
    })

    expect(wrapper.classes()).toContain('is-block')
    const items = wrapper.findAll('.seg-item')
    expect(items.length).toBe(3)
  })

  // ── MobileNavbar Component Tests ──
  it('renders IdMobileNavbar with navigation items, stacked icon + label layout, and active state', async () => {
    const wrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'home',
        items: [
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'search', label: 'Search', icon: '🔍' },
          { id: 'alerts', label: 'Alerts', icon: '🔔', badge: 5 },
          { id: 'profile', label: 'Profile', icon: '👤' }
        ]
      }
    })

    expect(wrapper.classes()).toContain('id-mobile-navbar-wrapper')
    const container = wrapper.find('.id-mobile-navbar')
    expect(container.exists()).toBe(true)
    expect(container.attributes('role')).toBe('tablist')

    const items = wrapper.findAll('.id-navbar-item')
    expect(items.length).toBe(4)

    // Check first item active
    expect(items[0].classes()).toContain('is-active')
    expect(items[0].attributes('aria-selected')).toBe('true')
    expect(items[0].find('.id-navbar-label').text()).toBe('Home')
    expect(items[0].find('.id-navbar-icon-emoji').text()).toBe('🏠')

    // Check badge on third item
    const badge = items[2].find('.id-navbar-badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('5')

    // Select second item
    await items[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['search'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['search'])
    expect(wrapper.emitted('select')?.[0][0].id).toBe('search')
  })

  it('handles disabled navigation items properly without emitting select events', async () => {
    const wrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'home',
        items: [
          { id: 'home', label: 'Home' },
          { id: 'pro', label: 'Pro Feature', disabled: true },
          { id: 'settings', label: 'Settings' }
        ]
      }
    })

    const items = wrapper.findAll('.id-navbar-item')
    expect(items[1].classes()).toContain('is-disabled')
    expect(items[1].attributes('disabled')).toBeDefined()

    await items[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('select')).toBeUndefined()

    // Click enabled item
    await items[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['settings'])
  })

  it('supports size, variant, color, position, and dot badges on IdMobileNavbar', () => {
    const wrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'inbox',
        size: 'lg',
        variant: 'solid',
        color: 'purple',
        position: 'fixed',
        items: [
          { id: 'inbox', label: 'Inbox', dot: true },
          { id: 'archive', label: 'Archive' }
        ]
      }
    })

    expect(wrapper.classes()).toContain('position-fixed')
    const container = wrapper.find('.id-mobile-navbar')
    expect(container.classes()).toContain('size-lg')
    expect(container.classes()).toContain('variant-solid')
    expect(container.classes()).toContain('color-purple')

    const dotBadge = wrapper.find('.id-navbar-badge.is-dot')
    expect(dotBadge.exists()).toBe(true)
  })

  it('renders liquid, floating, and minimal variants correctly on IdMobileNavbar', () => {
    const liquidWrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'tab1',
        variant: 'liquid',
        items: [{ id: 'tab1', label: 'Tab 1' }]
      }
    })
    expect(liquidWrapper.find('.id-mobile-navbar').classes()).toContain('variant-liquid')

    const floatingWrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'tab1',
        variant: 'floating',
        items: [{ id: 'tab1', label: 'Tab 1' }]
      }
    })
    expect(floatingWrapper.find('.id-mobile-navbar').classes()).toContain('variant-floating')

    const minimalWrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'tab1',
        variant: 'minimal',
        items: [{ id: 'tab1', label: 'Tab 1' }]
      }
    })
    expect(minimalWrapper.find('.id-mobile-navbar').classes()).toContain('variant-minimal')
  })

  it('applies custom ui classes and supports custom slots in IdMobileNavbar', () => {
    const wrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'custom',
        ui: {
          base: 'custom-nav-base',
          item: 'custom-nav-item',
          active: 'custom-nav-active',
          icon: 'custom-nav-icon',
          label: 'custom-nav-label',
          badge: 'custom-nav-badge'
        },
        items: [
          { id: 'custom', label: 'Custom Item', badge: 'NEW' }
        ]
      },
      slots: {
        label: '<span class="slotted-label">Slotted Label</span>'
      }
    })

    const container = wrapper.find('.id-mobile-navbar')
    expect(container.classes()).toContain('custom-nav-base')

    const item = wrapper.find('.id-navbar-item')
    expect(item.classes()).toContain('custom-nav-item')
    expect(item.classes()).toContain('custom-nav-active')
    expect(item.find('.id-navbar-icon-box').classes()).toContain('custom-nav-icon')
    expect(item.find('.id-navbar-badge').classes()).toContain('custom-nav-badge')
    expect(wrapper.find('.slotted-label').text()).toBe('Slotted Label')
  })

  it('supports keyboard navigation across enabled items in IdMobileNavbar', async () => {
    const wrapper = mount(IdMobileNavbar, {
      props: {
        modelValue: 'tab1',
        items: [
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2', disabled: true },
          { id: 'tab3', label: 'Tab 3' }
        ]
      }
    })

    const container = wrapper.find('.id-mobile-navbar')

    // Press ArrowRight - should skip disabled tab2 and select tab3
    await container.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab3'])

    // Press ArrowRight again - should wrap back to tab1
    await container.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['tab1'])
  })

  // ── 15. Interactive Star Rating System ──
  it('renders IdRating with default 5 stars and accessible attributes', () => {
    const wrapper = mount(IdRating, {
      props: {
        modelValue: 3,
        label: 'Satisfaction Score'
      }
    })

    expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true)
    expect(wrapper.attributes('aria-valuenow')).toBe('3')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('5')
    expect(wrapper.text()).toContain('Satisfaction Score')

    const stars = wrapper.findAll('.star-btn')
    expect(stars.length).toBe(5)

    const wrappers = wrapper.findAll('.star-wrapper')
    expect(wrappers[0].classes()).toContain('is-filled')
    expect(wrappers[1].classes()).toContain('is-filled')
    expect(wrappers[2].classes()).toContain('is-filled')
    expect(wrappers[3].classes()).toContain('is-empty')
    expect(wrappers[4].classes()).toContain('is-empty')
  })

  it('supports configurable max stars and sizing tiers', () => {
    const wrapper = mount(IdRating, {
      props: {
        max: 7,
        size: 'lg'
      }
    })

    expect(wrapper.classes()).toContain('size-lg')
    expect(wrapper.findAll('.star-btn').length).toBe(7)
  })

  it('supports color presets and custom color styles', () => {
    const wrapperPreset = mount(IdRating, {
      props: {
        color: 'blue'
      }
    })
    expect(wrapperPreset.classes()).toContain('color-blue')

    const wrapperCustom = mount(IdRating, {
      props: {
        color: '#9c27b0'
      }
    })
    expect(wrapperCustom.classes()).toContain('color-custom')
    expect(wrapperCustom.classes()).toContain('has-custom-color')
    expect(wrapperCustom.attributes('style')).toContain('--id-rating-active-color: #9c27b0')
  })

  it('handles clicking stars and clearable reset toggle', async () => {
    const wrapper = mount(IdRating, {
      props: {
        modelValue: 2,
        clearable: true
      }
    })

    const stars = wrapper.findAll('.star-btn')

    // Click 4th star -> emit 4
    await stars[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
    expect(wrapper.emitted('change')?.[0]).toEqual([4])

    // Update prop to 4
    await wrapper.setProps({ modelValue: 4 })

    // Click 4th star again -> should clear to 0
    await stars[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([0])
    expect(wrapper.emitted('change')?.[1]).toEqual([0])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('supports half-star rating calculations and displays', async () => {
    const wrapper = mount(IdRating, {
      props: {
        modelValue: 3.5,
        allowHalf: true,
        showScore: true
      }
    })

    const wrappers = wrapper.findAll('.star-wrapper')
    expect(wrappers[0].classes()).toContain('is-filled')
    expect(wrappers[1].classes()).toContain('is-filled')
    expect(wrappers[2].classes()).toContain('is-filled')
    expect(wrappers[3].classes()).toContain('is-half')
    expect(wrappers[4].classes()).toContain('is-empty')

    expect(wrapper.text()).toContain('3.5')
    expect(wrapper.text()).toContain('/ 5')
  })

  it('supports hover previews and resets on mouseleave', async () => {
    const wrapper = mount(IdRating, {
      props: {
        modelValue: 2
      }
    })

    const stars = wrapper.findAll('.star-btn')

    // Hover over 5th star
    await stars[4].trigger('mouseenter')
    expect(wrapper.emitted('hover')?.[0]).toEqual([5])

    // Mouse leave component container
    await wrapper.find('.id-rating').trigger('mouseleave')
    expect(wrapper.emitted('hover')?.[1]).toEqual([0])
  })

  it('supports keyboard navigation (ArrowRight, ArrowLeft, Home, End, Enter, Space)', async () => {
    const wrapper = mount(IdRating, {
      props: {
        modelValue: 2,
        max: 5
      }
    })

    const star = wrapper.find('.star-btn')

    // ArrowRight -> increment to 3
    await star.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])

    // Update prop
    await wrapper.setProps({ modelValue: 3 })

    // ArrowLeft -> decrement to 2
    await star.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([2])

    // End -> max (5)
    await star.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')?.[2]).toEqual([5])

    // Home -> min (0)
    await star.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')?.[3]).toEqual([0])

    // Enter on star index 4 -> 1 (since star is index 1 in wrapper.find)
    await star.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[4]).toEqual([1])
  })

  it('respects disabled and readonly states by blocking user interaction', async () => {
    const wrapperDisabled = mount(IdRating, {
      props: {
        modelValue: 3,
        disabled: true
      }
    })

    expect(wrapperDisabled.classes()).toContain('is-disabled')
    expect(wrapperDisabled.attributes('aria-disabled')).toBe('true')
    const starDisabled = wrapperDisabled.find('.star-btn')
    expect(starDisabled.attributes('disabled')).toBeDefined()

    await starDisabled.trigger('click')
    expect(wrapperDisabled.emitted('update:modelValue')).toBeUndefined()

    const wrapperReadonly = mount(IdRating, {
      props: {
        modelValue: 4,
        readonly: true
      }
    })

    expect(wrapperReadonly.classes()).toContain('is-readonly')
    expect(wrapperReadonly.attributes('aria-readonly')).toBe('true')
    const starReadonly = wrapperReadonly.find('.star-btn')
    expect(starReadonly.attributes('disabled')).toBeDefined()

    await starReadonly.trigger('click')
    expect(wrapperReadonly.emitted('update:modelValue')).toBeUndefined()
  })

  it('supports deep UI customization via ui prop and custom slots', () => {
    const wrapper = mount(IdRating, {
      props: {
        modelValue: 4,
        max: 5,
        ui: {
          base: 'custom-rating-base',
          stars: 'custom-stars-row',
          star: 'custom-star-box',
          active: 'custom-active-star',
          inactive: 'custom-inactive-star',
          score: 'custom-score-text'
        },
        showScore: true
      },
      slots: {
        label: '<span class="custom-label">Custom Label</span>',
        score: '<span class="custom-slotted-score">4 Stars</span>'
      }
    })

    expect(wrapper.find('.id-rating').classes()).toContain('custom-rating-base')
    expect(wrapper.find('.stars-row').classes()).toContain('custom-stars-row')
    expect(wrapper.find('.custom-label').text()).toBe('Custom Label')
    expect(wrapper.find('.custom-slotted-score').text()).toBe('4 Stars')

    const starWrappers = wrapper.findAll('.star-wrapper')
    expect(starWrappers[0].classes()).toContain('custom-star-box')
    expect(starWrappers[0].classes()).toContain('custom-active-star')
    expect(starWrappers[4].classes()).toContain('custom-inactive-star')
  })

  it('correctly resolves components using IdesignResolver for unplugin-vue-components', async () => {
    const { IdesignResolver } = await import('../src/resolver.js')
    const resolver = IdesignResolver()

    expect(resolver.type).toBe('component')

    const buttonRes = resolver.resolve('IdButton')
    expect(buttonRes).toBeDefined()
    expect(buttonRes.name).toBe('IdButton')
    expect(buttonRes.from).toBe('@idesign/vue')
    expect(buttonRes.sideEffects).toContain('@idesign/vue/tokens')

    const pinInputRes = resolver.resolve('IdPinInput')
    expect(pinInputRes).toBeDefined()
    expect(pinInputRes.name).toBe('IdPinInput')

    const templateRes = resolver.resolve('HeroTemplate')
    expect(templateRes).toBeDefined()

    const nonExistent = resolver.resolve('ElButton')
    expect(nonExistent).toBeUndefined()
  })

  it('supports keyboard navigation and Escape dismissal in IdDropdownMenu', async () => {
    const { default: IdDropdownMenu } = await import('../src/components/idesign/IdDropdownMenu.vue')
    const wrapper = mount(IdDropdownMenu, {
      props: {
        items: [
          { label: 'Edit', shortcut: '⌘E' },
          { label: 'Duplicate' },
          { separator: true },
          { label: 'Delete', danger: true }
        ]
      },
      slots: {
        trigger: '<button class="test-trigger">Actions</button>'
      }
    })

    const trigger = wrapper.find('.test-trigger')
    expect(wrapper.find('.dropdown-menu').exists()).toBe(false)

    // Open via Enter
    await trigger.trigger('keydown', { key: 'Enter' })
    expect(wrapper.find('.dropdown-menu').exists()).toBe(true)

    // Arrow down cycles items
    await wrapper.find('.id-dropdown-menu-wrapper').trigger('keydown', { key: 'ArrowDown' })
    const items = wrapper.findAll('.menu-item')
    expect(items[1].classes()).toContain('is-focused')

    // Escape closes menu
    await wrapper.find('.id-dropdown-menu-wrapper').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.dropdown-menu').exists()).toBe(false)
  })

  it('automatically integrates IdFormField validation and error context with IdInput', () => {
    const wrapper = mount(IdFormField, {
      props: {
        name: 'email',
        label: 'Work Email',
        error: 'Invalid email address',
        required: true
      },
      slots: {
        default: '<IdInput placeholder="name@company.com" />'
      },
      global: {
        components: { IdInput }
      }
    })

    expect(wrapper.find('.has-error').exists()).toBe(true)
    expect(wrapper.find('.id-form-message').text()).toContain('Invalid email address')
    const input = wrapper.find('.id-input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('supports real-time search filtering and keyboard selection in searchable IdSelect', async () => {
    const wrapper = mount(IdSelect, {
      props: {
        modelValue: null,
        searchable: true,
        options: ['Vue 3', 'Nuxt 3', 'React', 'Svelte', 'Angular', 'Solid', 'Astro'],
        searchPlaceholder: 'Search frameworks...'
      }
    })

    // Open the dropdown
    await wrapper.find('.select-wrapper').trigger('click')
    expect(wrapper.find('.select-dropdown').exists()).toBe(true)

    // Search input exists and has placeholder
    const searchInput = wrapper.find('.select-search-input')
    expect(searchInput.exists()).toBe(true)
    expect(searchInput.attributes('placeholder')).toBe('Search frameworks...')

    // All 7 options rendered initially
    let options = wrapper.findAll('.select-option')
    expect(options.length).toBe(7)

    // Type query "re" -> should match "React"
    await searchInput.setValue('react')
    expect(wrapper.emitted('search')).toBeDefined()
    expect(wrapper.emitted('search')[0]).toEqual(['react'])

    options = wrapper.findAll('.select-option')
    expect(options.length).toBe(1)
    expect(options[0].text()).toBe('React')

    // Press Enter to select filtered option
    await searchInput.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['React'])
    expect(wrapper.emitted('change')[0]).toEqual(['React'])

    // No matching results handling
    await wrapper.find('.select-wrapper').trigger('click')
    const searchInput2 = wrapper.find('.select-search-input')
    await searchInput2.setValue('nonexistent')
    expect(wrapper.findAll('.select-option').length).toBe(0)
    expect(wrapper.find('.select-no-results').text()).toBe('No matching options')
  })

  it('supports masked mode for password fields with eye toggle in IdInput', async () => {
    const wrapper = mount(IdInput, {
      props: {
        modelValue: 'SuperSecret123',
        masked: true
      }
    })

    const input = wrapper.find('.id-input')
    expect(input.attributes('type')).toBe('password')

    const maskToggle = wrapper.find('.mask-toggle-btn')
    expect(maskToggle.exists()).toBe(true)
    expect(maskToggle.attributes('aria-label')).toBe('Show password')

    // Click mask toggle to reveal password
    await maskToggle.trigger('click')
    expect(input.attributes('type')).toBe('text')
    expect(maskToggle.attributes('aria-label')).toBe('Hide password')

    // Click again to re-mask
    await maskToggle.trigger('click')
    expect(input.attributes('type')).toBe('password')
  })

  it('renders IdTimePicker matching Numeric Stepper UI with full variant and stepping support', async () => {
    const { default: IdTimePicker } = await import('../src/components/idesign/IdTimePicker.vue')
    const wrapper = mount(IdTimePicker, {
      props: {
        modelValue: '09:30 AM',
        variant: 'glass',
        size: 'lg',
        direction: 'horizontal',
        showIcon: true
      }
    })

    expect(wrapper.find('.id-time-picker-group').classes()).toContain('variant-glass')
    expect(wrapper.find('.id-time-picker-group').classes()).toContain('size-lg')
    expect(wrapper.find('.time-stepper-box').classes()).toContain('is-horizontal')

    // Find hour and minute inputs
    const hourInput = wrapper.find('.time-unit-input.hour')
    const minuteInput = wrapper.find('.time-unit-input.minute')
    expect(hourInput.element.value).toBe('09')
    expect(minuteInput.element.value).toBe('30')

    // Click increment button (active segment defaults to minute)
    const incBtn = wrapper.find('.stepper-btn.increment')
    await incBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(minuteInput.element.value).toBe('31')
  })

  // ── macOS Floating Dock System ──
  it('renders IdDock with items, separators, badges, active dots, and emits select events', async () => {
    const items = [
      { id: 'finder', label: 'Finder', icon: '📁', active: true },
      { id: 'safari', label: 'Safari', icon: '🌐', badge: 5 },
      { id: 'messages', label: 'Messages', icon: '💬', badge: 'NEW' },
      { separator: true },
      { id: 'settings', label: 'Settings', icon: '⚙️', disabled: true }
    ]

    const wrapper = mount(IdDock, {
      props: {
        items,
        variant: 'glass',
        size: 'md',
        position: 'bottom',
        alignment: 'center',
        direction: 'horizontal',
        tooltip: true,
        activeId: 'finder',
        ui: {
          base: 'custom-dock-base',
          item: 'custom-dock-item',
          badge: 'custom-dock-badge'
        }
      }
    })

    // Check base wrapper classes and attributes
    const dockWrap = wrapper.find('.id-dock-wrap')
    expect(dockWrap.exists()).toBe(true)
    expect(dockWrap.classes()).toContain('position-bottom')
    expect(dockWrap.classes()).toContain('dir-horizontal')
    expect(dockWrap.classes()).toContain('size-md')
    expect(dockWrap.classes()).toContain('variant-glass')
    expect(dockWrap.classes()).toContain('custom-dock-base')
    expect(dockWrap.attributes('role')).toBe('toolbar')

    // Check items count and separators
    const itemButtons = wrapper.findAll('button.dock-item')
    expect(itemButtons.length).toBe(4)
    expect(wrapper.find('.dock-separator').exists()).toBe(true)

    // Check active item and dot
    const activeItem = wrapper.find('button.dock-item.is-active')
    expect(activeItem.exists()).toBe(true)
    expect(activeItem.find('.dock-dot').exists()).toBe(true)

    // Check badges
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('NEW')

    // Check tooltips
    const tooltips = wrapper.findAll('.dock-tooltip')
    expect(tooltips.length).toBe(4)
    expect(wrapper.text()).toContain('Finder')
    expect(wrapper.text()).toContain('Safari')

    // Click interactive item
    await itemButtons[1].trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0][0].id).toBe('safari')
    expect(wrapper.emitted('update:activeId')[0]).toEqual(['safari'])

    // Disabled item should not emit click
    await itemButtons[3].trigger('click')
    expect(itemButtons[3].attributes('disabled')).toBeDefined()
  })

  it('renders IdDock with custom slots and vertical orientation', () => {
    const wrapper = mount(IdDock, {
      props: {
        items: [{ id: 'app1', label: 'App 1' }],
        position: 'left',
        direction: 'vertical',
        variant: 'solid',
        size: 'lg'
      },
      slots: {
        leading: '<div class="leading-test">Apple</div>',
        trailing: '<div class="trailing-test">Trash</div>',
        icon: '<span class="custom-icon">✨</span>'
      }
    })

    expect(wrapper.find('.id-dock-wrap').classes()).toContain('position-left')
    expect(wrapper.find('.id-dock-wrap').classes()).toContain('dir-vertical')
    expect(wrapper.find('.id-dock-wrap').classes()).toContain('variant-solid')
    expect(wrapper.find('.id-dock-wrap').classes()).toContain('size-lg')
    expect(wrapper.find('.leading-test').exists()).toBe(true)
    expect(wrapper.find('.trailing-test').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // ── 39. QRCode Component Tests ──
  it('renders IdQRCode with default props, SVG paths, and accessibility attributes', () => {
    const wrapper = mount(IdQRCode, {
      props: {
        value: 'https://apple.com',
        label: 'Apple Website',
        caption: 'Scan with camera'
      }
    })

    expect(wrapper.classes()).toContain('id-qr-code')
    expect(wrapper.classes()).toContain('variant-default')
    expect(wrapper.classes()).toContain('size-md')
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('Apple Website - QR Code')
    
    // Check SVG and modules
    const svg = wrapper.find('.qr-svg')
    expect(svg.exists()).toBe(true)
    expect(svg.find('.qr-finder-module').exists()).toBe(true)
    expect(svg.find('.qr-body-module').exists()).toBe(true)

    // Check Label & Caption
    expect(wrapper.find('.qr-label-text').text()).toBe('Apple Website')
    expect(wrapper.find('.qr-caption-text').text()).toBe('Scan with camera')
  })

  it('supports size presets and custom numeric sizing', () => {
    const wrapperXs = mount(IdQRCode, { props: { size: 'xs' } })
    expect(wrapperXs.classes()).toContain('size-xs')
    expect(wrapperXs.attributes('style')).toContain('width: 120px')

    const wrapperCustom = mount(IdQRCode, { props: { size: 280 } })
    expect(wrapperCustom.classes()).toContain('size-custom')
    expect(wrapperCustom.attributes('style')).toContain('width: 280px')

    const wrapperResponsive = mount(IdQRCode, { props: { size: 'lg', responsive: true } })
    expect(wrapperResponsive.classes()).toContain('is-responsive')
    expect(wrapperResponsive.attributes('style')).toContain('max-width: 260px')
    expect(wrapperResponsive.attributes('style')).toContain('width: 100%')
  })

  it('supports all variants: default, rounded, minimal, glass', () => {
    const wrapperRounded = mount(IdQRCode, { props: { variant: 'rounded' } })
    expect(wrapperRounded.classes()).toContain('variant-rounded')

    const wrapperMinimal = mount(IdQRCode, { props: { variant: 'minimal' } })
    expect(wrapperMinimal.classes()).toContain('variant-minimal')

    const wrapperGlass = mount(IdQRCode, { props: { variant: 'glass' } })
    expect(wrapperGlass.classes()).toContain('variant-glass')
  })

  it('renders center logo image and custom logo slot with safe quiet zone cutout', () => {
    const logoUrl = 'https://example.com/logo.png'
    const wrapper = mount(IdQRCode, {
      props: {
        value: 'https://example.com/login',
        logoSrc: logoUrl,
        logoSize: 48
      }
    })

    const centerLogo = wrapper.find('.qr-center-logo')
    expect(centerLogo.exists()).toBe(true)
    expect(centerLogo.attributes('style')).toContain('width: 48px')
    expect(centerLogo.attributes('style')).toContain('height: 48px')

    const img = wrapper.find('.qr-logo-image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(logoUrl)
  })

  it('handles disabled state with dimmed styling and aria-disabled', () => {
    const wrapper = mount(IdQRCode, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.find('.qr-disabled-scrim').exists()).toBe(true)
  })

  it('supports downloadable action button and emits download event', async () => {
    const wrapper = mount(IdQRCode, {
      props: {
        value: 'https://idesign.io',
        downloadable: true
      }
    })

    const downloadBtn = wrapper.find('.qr-action-btn')
    expect(downloadBtn.exists()).toBe(true)
    expect(downloadBtn.text()).toContain('Save SVG')

    await downloadBtn.trigger('click')
    expect(wrapper.emitted('download')).toBeTruthy()
    expect(wrapper.emitted('download')[0][0]).toHaveProperty('svgContent')
  })

  it('supports custom ui slot class overrides and alias export QRCode', () => {
    const wrapper = mount(QRCode, {
      props: {
        value: 'https://idesign.io/docs',
        label: 'Docs',
        caption: 'API Reference',
        ui: {
          base: 'my-custom-qr-base',
          code: 'my-custom-qr-code',
          background: 'my-custom-qr-bg',
          label: 'my-custom-qr-label',
          caption: 'my-custom-qr-caption'
        }
      }
    })

    expect(wrapper.classes()).toContain('my-custom-qr-base')
    expect(wrapper.find('.qr-frame').classes()).toContain('my-custom-qr-bg')
    expect(wrapper.find('.qr-svg').classes()).toContain('my-custom-qr-code')
    expect(wrapper.find('.qr-label-box').classes()).toContain('my-custom-qr-label')
    expect(wrapper.find('.qr-caption-box').classes()).toContain('my-custom-qr-caption')
  })

  // ── 23. Terminal UI Component ──
  it('renders IdTerminal with title, macOS controls, and parsed command lines', () => {
    const wrapper = mount(IdTerminal, {
      props: {
        title: 'zsh — build',
        subtitle: '~/projects/idesign',
        variant: 'macos',
        size: 'lg',
        lines: [
          '$ pnpm test',
          '✓ 42 tests passed'
        ]
      }
    })

    expect(wrapper.classes()).toContain('id-terminal')
    expect(wrapper.classes()).toContain('variant-macos')
    expect(wrapper.classes()).toContain('size-lg')
    expect(wrapper.find('.terminal-title-text').text()).toBe('zsh — build')
    expect(wrapper.find('.terminal-subtitle-badge').text()).toBe('~/projects/idesign')
    expect(wrapper.findAll('.terminal-dot').length).toBe(3)
    expect(wrapper.findAll('.terminal-line').length).toBe(2)
  })

  it('supports simple slotted usage for IdTerminal', () => {
    const wrapper = mount(IdTerminal, {
      slots: {
        default: '<span class="custom-cmd">$ pnpm install</span>'
      }
    })

    expect(wrapper.find('.terminal-raw-slot').exists()).toBe(true)
    expect(wrapper.find('.custom-cmd').text()).toBe('$ pnpm install')
  })

  it('supports interactive command submission and event emission', async () => {
    const wrapper = mount(IdTerminal, {
      props: {
        interactive: true,
        prompt: '$'
      }
    })

    const input = wrapper.find('.interactive-cmd-input')
    expect(input.exists()).toBe(true)

    await input.setValue('npx idesign add button')
    await wrapper.find('.terminal-interactive-line').trigger('submit')

    expect(wrapper.emitted('command')).toBeTruthy()
    expect(wrapper.emitted('command')[0]).toEqual(['npx idesign add button'])
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('supports custom ui prop overrides and Terminal alias', () => {
    const wrapper = mount(Terminal, {
      props: {
        title: 'Shell',
        lines: ['$ ls -la'],
        ui: {
          base: 'custom-term-base',
          header: 'custom-term-header',
          body: 'custom-term-body',
          prompt: 'custom-term-prompt'
        }
      }
    })

    expect(wrapper.classes()).toContain('custom-term-base')
    expect(wrapper.find('.terminal-header').classes()).toContain('custom-term-header')
    expect(wrapper.find('.terminal-body').classes()).toContain('custom-term-body')
    expect(wrapper.find('.line-prompt').classes()).toContain('custom-term-prompt')
  })

  // ── 24. Marquee UI Component ──
  it('renders IdMarquee with default props and slot content duplicated for seamless looping', () => {
    const wrapper = mount(IdMarquee, {
      slots: {
        default: '<span class="logo-item">Apple</span>'
      }
    })

    expect(wrapper.classes()).toContain('id-marquee')
    expect(wrapper.classes()).toContain('variant-default')
    expect(wrapper.classes()).toContain('size-md')
    expect(wrapper.classes()).toContain('direction-left')

    const tracks = wrapper.findAll('.marquee-content')
    // Default repeat count is 2
    expect(tracks.length).toBe(2)
    // First track is visible, cloned tracks are aria-hidden for a11y
    expect(tracks[0].attributes('aria-hidden')).toBeUndefined()
    expect(tracks[1].attributes('aria-hidden')).toBe('true')

    expect(wrapper.text()).toContain('Apple')
  })

  it('supports vertical, reverse, speed, gap, and edge fade props', () => {
    const wrapper = mount(IdMarquee, {
      props: {
        vertical: true,
        reverse: true,
        speed: 'fast',
        gap: 'lg',
        fade: true,
        variant: 'glass',
        size: 'lg'
      },
      slots: {
        default: '<div>Vertical Item</div>'
      }
    })

    expect(wrapper.classes()).toContain('is-vertical')
    expect(wrapper.classes()).toContain('direction-down')
    expect(wrapper.classes()).toContain('variant-glass')
    expect(wrapper.classes()).toContain('size-lg')
    expect(wrapper.classes()).toContain('has-fade')

    const overlays = wrapper.findAll('.marquee-fade-overlay')
    expect(overlays.length).toBe(2)
  })

  it('handles pauseOnHover and pauseOnInteraction mouse/focus events', async () => {
    const wrapper = mount(IdMarquee, {
      props: {
        pauseOnHover: true,
        pauseOnInteraction: true
      },
      slots: {
        default: '<button class="test-btn">Interactive Link</button>'
      }
    })

    expect(wrapper.classes()).not.toContain('is-paused')

    // Hover triggers pause
    await wrapper.trigger('mouseenter')
    expect(wrapper.classes()).toContain('is-paused')

    await wrapper.trigger('mouseleave')
    expect(wrapper.classes()).not.toContain('is-paused')

    // Focus triggers pause
    await wrapper.trigger('focusin')
    expect(wrapper.classes()).toContain('is-paused')

    await wrapper.trigger('focusout')
    expect(wrapper.classes()).not.toContain('is-paused')
  })

  it('supports custom repeat count and ui prop overrides using Marquee alias', () => {
    const wrapper = mount(Marquee, {
      props: {
        repeat: 3,
        variant: 'hero',
        disabled: true,
        ui: {
          base: 'custom-marquee-base',
          track: 'custom-marquee-track',
          content: 'custom-marquee-content'
        }
      },
      slots: {
        default: '<span>Tag</span>'
      }
    })

    expect(wrapper.classes()).toContain('custom-marquee-base')
    expect(wrapper.classes()).toContain('variant-hero')
    expect(wrapper.classes()).toContain('is-disabled')

    const contents = wrapper.findAll('.marquee-content')
    expect(contents.length).toBe(3)
    expect(contents[0].classes()).toContain('custom-marquee-content')
    expect(wrapper.find('.marquee-track').classes()).toContain('custom-marquee-track')
  })

  // ── 25. Date Range Picker UI Component ──
  it('renders IdDateRangePicker with default props, label, and formatted range display', () => {
    const wrapper = mount(IdDateRangePicker, {
      props: {
        label: 'Booking Window',
        modelValue: { start: '2026-10-10', end: '2026-10-24' }
      }
    })

    expect(wrapper.classes()).toContain('id-date-range-picker')
    expect(wrapper.find('.picker-label').text()).toBe('Booking Window')
    expect(wrapper.find('.picker-value').text()).toContain('Oct 10 – 24, 2026')
  })

  it('opens popover dialog and renders calendar days grid when clicked', async () => {
    const wrapper = mount(IdDateRangePicker, {
      props: {
        modelValue: { start: '2026-08-01', end: '2026-08-15' }
      }
    })

    expect(wrapper.find('.picker-popover').exists()).toBe(false)
    await wrapper.find('.picker-input').trigger('click')
    expect(wrapper.find('.picker-popover').exists()).toBe(true)
    expect(wrapper.findAll('.day-cell').length).toBeGreaterThanOrEqual(28)
  })

  it('handles intelligent non-chronological start/end range selection and emits update events', async () => {
    const wrapper = mount(IdDateRangePicker, {
      props: {
        modelValue: { start: '', end: '' }
      }
    })

    await wrapper.find('.picker-input').trigger('click')
    const activeDayCells = wrapper.findAll('.day-cell:not(:disabled)')

    // 1. Select initial date (e.g. 15th active day in month)
    await activeDayCells[15].trigger('click')
    expect(wrapper.emitted('select-start')).toBeTruthy()

    // 2. Select earlier date (e.g. 5th active day in month) — should auto-swap start & end!
    await activeDayCells[5].trigger('click')
    expect(wrapper.emitted('select-end')).toBeTruthy()

    const emittedRange = wrapper.emitted('update:modelValue')
    expect(emittedRange).toBeTruthy()
    const lastEmitted = emittedRange[emittedRange.length - 1][0]
    expect(lastEmitted.start <= lastEmitted.end).toBe(true)


  })

  it('supports doubleMonth mode and DateRangePicker alias', async () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        doubleMonth: true,
        startDate: '2026-12-01',
        endDate: '2026-12-25'
      }
    })

    expect(wrapper.classes()).toContain('is-double-month')

    await wrapper.find('.picker-input').trigger('click')
    expect(wrapper.find('.picker-popover').classes()).toContain('is-double')
    expect(wrapper.findAll('.calendar-pane').length).toBe(2)
  })

  it('clears range via input clear button and footer clear button', async () => {
    const wrapper = mount(IdDateRangePicker, {
      props: {
        startDate: '2026-05-01',
        endDate: '2026-05-10'
      }
    })

    const clearBtn = wrapper.find('.clear-input-btn')
    expect(clearBtn.exists()).toBe(true)
    await clearBtn.trigger('click')

    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:startDate')[0]).toEqual([''])
    expect(wrapper.emitted('update:endDate')[0]).toEqual([''])
  })
})






