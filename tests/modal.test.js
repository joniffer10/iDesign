import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IdModal from '../src/components/idesign/IdModal.vue'
import IdDialog from '../src/components/idesign/IdDialog.vue'

describe('IdModal — Liquid Glass Modal Suite', () => {
  it('renders modal surface when modelValue is true', () => {
    const wrapper = mount(IdModal, {
      props: {
        modelValue: true,
        title: 'Liquid Glass Modal',
        description: 'Unified surface with calm Apple aesthetics',
        teleport: false
      }
    })

    expect(wrapper.find('.modal-surface').exists()).toBe(true)
    expect(wrapper.find('.modal-title').text()).toBe('Liquid Glass Modal')
    expect(wrapper.find('.modal-description').text()).toBe('Unified surface with calm Apple aesthetics')
  })

  it('renders seamless glass variant with is-seamless class and unified surface', () => {
    const wrapperGlass = mount(IdModal, {
      props: {
        modelValue: true,
        variant: 'glass',
        title: 'Glass Modal',
        teleport: false
      }
    })

    const wrapperSeamless = mount(IdModal, {
      props: {
        modelValue: true,
        variant: 'seamless',
        title: 'Seamless Modal',
        teleport: false
      }
    })

    expect(wrapperGlass.find('.modal-surface').classes()).toContain('variant-glass')
    expect(wrapperGlass.find('.modal-surface').classes()).toContain('is-seamless')

    expect(wrapperSeamless.find('.modal-surface').classes()).toContain('variant-seamless')
    expect(wrapperSeamless.find('.modal-surface').classes()).toContain('is-seamless')
  })

  it('preserves default variant and alert variant', () => {
    const wrapperDefault = mount(IdModal, {
      props: {
        modelValue: true,
        variant: 'default',
        teleport: false
      }
    })

    const wrapperAlert = mount(IdModal, {
      props: {
        modelValue: true,
        variant: 'alert',
        teleport: false
      }
    })

    expect(wrapperDefault.find('.modal-surface').classes()).toContain('variant-default')
    expect(wrapperDefault.find('.modal-surface').classes()).not.toContain('is-seamless')

    expect(wrapperAlert.find('.modal-surface').classes()).toContain('variant-alert')
  })

  it('handles closeOnOutsideClick correctly', async () => {
    // When enabled (default)
    const wrapperEnabled = mount(IdModal, {
      props: {
        modelValue: true,
        closeOnOutsideClick: true,
        teleport: false
      }
    })

    await wrapperEnabled.find('.modal-backdrop').trigger('click')
    expect(wrapperEnabled.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapperEnabled.emitted('close')).toBeTruthy()

    // When disabled
    const wrapperDisabled = mount(IdModal, {
      props: {
        modelValue: true,
        closeOnOutsideClick: false,
        teleport: false
      }
    })

    await wrapperDisabled.find('.modal-backdrop').trigger('click')
    expect(wrapperDisabled.emitted('update:modelValue')).toBeUndefined()
    expect(wrapperDisabled.emitted('close')).toBeUndefined()
  })

  it('handles closeOnEscape correctly', async () => {
    const wrapperEnabled = mount(IdModal, {
      props: {
        modelValue: true,
        closeOnEscape: true,
        teleport: false
      },
      attachTo: document.body
    })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapperEnabled.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapperEnabled.emitted('close')).toBeTruthy()
    wrapperEnabled.unmount()

    // When disabled
    const wrapperDisabled = mount(IdModal, {
      props: {
        modelValue: true,
        closeOnEscape: false,
        teleport: false
      },
      attachTo: document.body
    })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapperDisabled.emitted('update:modelValue')).toBeUndefined()
    expect(wrapperDisabled.emitted('close')).toBeUndefined()
    wrapperDisabled.unmount()
  })

  it('handles close button and showClose prop', async () => {
    const wrapper = mount(IdModal, {
      props: {
        modelValue: true,
        title: 'Modal Title',
        showClose: true,
        teleport: false
      }
    })

    const closeBtn = wrapper.find('.modal-close-btn')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()

    // When showClose is false
    const wrapperHiddenClose = mount(IdModal, {
      props: {
        modelValue: true,
        title: 'No Close Button',
        showClose: false,
        teleport: false
      }
    })

    expect(wrapperHiddenClose.find('.modal-close-btn').exists()).toBe(false)
  })

  it('supports custom slots: title, description, body, footer, actions, close', () => {
    const wrapper = mount(IdModal, {
      props: {
        modelValue: true,
        teleport: false
      },
      slots: {
        title: '<div class="custom-title">Custom Title Slot</div>',
        description: '<div class="custom-desc">Custom Description Slot</div>',
        body: '<div class="custom-body">Custom Body Slot Content</div>',
        actions: '<button class="custom-action-btn">Action Slot</button>',
        close: '<button class="custom-close-slot">X</button>'
      }
    })

    expect(wrapper.find('.custom-title').text()).toBe('Custom Title Slot')
    expect(wrapper.find('.custom-desc').text()).toBe('Custom Description Slot')
    expect(wrapper.find('.custom-body').text()).toBe('Custom Body Slot Content')
    expect(wrapper.find('.custom-action-btn').text()).toBe('Action Slot')
    expect(wrapper.find('.custom-close-slot').text()).toBe('X')
  })

  it('applies ui custom class overrides across elements', () => {
    const wrapper = mount(IdModal, {
      props: {
        modelValue: true,
        title: 'Custom UI Modal',
        description: 'Checking UI mapping',
        body: 'Body text',
        teleport: false,
        ui: {
          backdrop: 'my-custom-backdrop',
          surface: 'my-custom-surface',
          header: 'my-custom-header',
          title: 'my-custom-title',
          description: 'my-custom-desc',
          body: 'my-custom-body',
          footer: 'my-custom-footer',
          close: 'my-custom-close'
        }
      },
      slots: {
        footer: '<span>Footer</span>'
      }
    })

    expect(wrapper.find('.modal-backdrop').classes()).toContain('my-custom-backdrop')
    expect(wrapper.find('.modal-surface').classes()).toContain('my-custom-surface')
    expect(wrapper.find('.modal-header').classes()).toContain('my-custom-header')
    expect(wrapper.find('.modal-title').classes()).toContain('my-custom-title')
    expect(wrapper.find('.modal-description').classes()).toContain('my-custom-desc')
    expect(wrapper.find('.modal-body').classes()).toContain('my-custom-body')
    expect(wrapper.find('.modal-footer').classes()).toContain('my-custom-footer')
    expect(wrapper.find('.modal-close-btn').classes()).toContain('my-custom-close')
  })

  it('sets proper ARIA accessibility attributes', () => {
    const wrapper = mount(IdModal, {
      props: {
        modelValue: true,
        title: 'Accessible Modal',
        description: 'Aria labeled and described',
        teleport: false
      }
    })

    const surface = wrapper.find('.modal-surface')
    expect(surface.attributes('role')).toBe('dialog')
    expect(surface.attributes('aria-modal')).toBe('true')
    expect(surface.attributes('aria-labelledby')).toBeTruthy()
    expect(surface.attributes('aria-describedby')).toBeTruthy()
  })

  it('works seamlessly with IdDialog wrapper', async () => {
    const wrapper = mount(IdDialog, {
      props: {
        modelValue: true,
        variant: 'glass',
        title: 'Dialog Test',
        description: 'Dialog Description',
        closeOnOutsideClick: false,
        closeOnEscape: false,
        teleport: false
      }
    })

    expect(wrapper.find('.modal-surface').classes()).toContain('variant-glass')
    expect(wrapper.find('.modal-surface').classes()).toContain('is-seamless')
    expect(wrapper.find('.modal-title').text()).toBe('Dialog Test')
    expect(wrapper.find('.modal-description').text()).toBe('Dialog Description')
  })
})
