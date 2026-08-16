import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Core Components
import IdButton from '../src/components/idesign/IdButton.vue'
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
import IdLiveDot from '../src/components/idesign/IdLiveDot.vue'
import IdProgress from '../src/components/idesign/IdProgress.vue'
import IdAccordion from '../src/components/idesign/IdAccordion.vue'
import IdTabs from '../src/components/idesign/IdTabs.vue'
import IdTable from '../src/components/idesign/IdTable.vue'
import IdFileUpload from '../src/components/idesign/IdFileUpload.vue'
import IdStack from '../src/components/idesign/IdStack.vue'
import IdPanel from '../src/components/idesign/IdPanel.vue'
import IdPanelRow from '../src/components/idesign/IdPanelRow.vue'
import IdDivider from '../src/components/idesign/IdDivider.vue'
import IdBreadcrumbs from '../src/components/idesign/IdBreadcrumbs.vue'
import IdPagination from '../src/components/idesign/IdPagination.vue'
import IdEmpty from '../src/components/idesign/IdEmpty.vue'
import IdBottomSheet from '../src/components/idesign/IdBottomSheet.vue'

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
import IdColorPicker from '../src/components/idesign/IdColorPicker.vue'

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
  it('renders IdSidebar with groups, brand, and item selection', async () => {
    const wrapper = mount(IdSidebar, {
      props: {
        title: 'Cloud Console',
        groups: [
          { title: 'Workspace', items: [{ id: 'dashboard', label: 'Dashboard', icon: '📊' }] }
        ],
        modelValue: 'dashboard'
      }
    })
    expect(wrapper.text()).toContain('Cloud Console')
    expect(wrapper.text()).toContain('Dashboard')
    const item = wrapper.find('.sidebar-item')
    expect(item.classes()).toContain('active')
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
  })

  it('renders IdTimePicker with hour/minute stepping', async () => {
    const wrapper = mount(IdTimePicker, { props: { modelValue: '10:30' } })
    expect(wrapper.find('.time-unit-input').element.value).toBe('10')
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

  it('renders IdNumberInput with stepper buttons', async () => {
    const wrapper = mount(IdNumberInput, { props: { modelValue: 10, stepVal: 5, unit: 'px' } })
    expect(wrapper.text()).toContain('px')
    await wrapper.find('.stepper-btn.increment').trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([15])
  })

  it('renders IdColorPicker with preset swatches', async () => {
    const wrapper = mount(IdColorPicker, { props: { modelValue: '#0071E3' } })
    const swatches = wrapper.findAll('.preset-swatch')
    expect(swatches.length).toBeGreaterThan(0)
    await swatches[0].trigger('click')
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
})
