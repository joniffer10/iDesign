import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IdButton from '../src/components/idesign/IdButton.vue'
import IdTag from '../src/components/idesign/IdTag.vue'
import IdLiveDot from '../src/components/idesign/IdLiveDot.vue'
import IdToggle from '../src/components/idesign/IdToggle.vue'
import IdSelect from '../src/components/idesign/IdSelect.vue'
import IdAccordion from '../src/components/idesign/IdAccordion.vue'
import IdTabs from '../src/components/idesign/IdTabs.vue'
import IdProgress from '../src/components/idesign/IdProgress.vue'

describe('Idesign Component Suite', () => {
  it('renders IdButton with variant classes', () => {
    const wrapper = mount(IdButton, { props: { variant: 'primary' }, slots: { default: 'Click Me' } })
    expect(wrapper.text()).toContain('Click Me')
    expect(wrapper.classes()).toContain('btn-primary')
  })

  it('renders IdTag with text', () => {
    const wrapper = mount(IdTag, { props: { variant: 'heat' }, slots: { default: 'Hot' } })
    expect(wrapper.text()).toBe('Hot')
  })

  it('renders IdLiveDot', () => {
    const wrapper = mount(IdLiveDot, { slots: { default: 'LIVE' } })
    expect(wrapper.text()).toContain('LIVE')
  })

  it('toggles IdToggle state', async () => {
    const wrapper = mount(IdToggle, { props: { modelValue: false } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  it('renders IdSelect options', () => {
    const wrapper = mount(IdSelect, { props: { options: ['A', 'B'], modelValue: 'A' } })
    expect(wrapper.text()).toContain('A')
  })

  it('renders IdAccordion items', () => {
    const wrapper = mount(IdAccordion, { props: { items: [{ title: 'Q1', content: 'A1' }] } })
    expect(wrapper.text()).toContain('Q1')
  })

  it('renders IdTabs active indicator', () => {
    const wrapper = mount(IdTabs, { props: { modelValue: 'tab1', tabs: [{ value: 'tab1', label: 'Tab 1' }] } })
    expect(wrapper.text()).toContain('Tab 1')
  })

  it('renders IdProgress percentage', () => {
    const wrapper = mount(IdProgress, { props: { value: 75 } })
    expect(wrapper.text()).toContain('75%')
  })

  it('renders IdTable columns and data', () => {
    const wrapper = mount(IdTable, { props: { columns: [{ key: 'name', label: 'Name' }], data: [{ name: 'Alice' }] } })
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Alice')
  })

  it('renders IdFileUpload drop zone', () => {
    const wrapper = mount(IdFileUpload, { props: { hint: 'Max 10MB' } })
    expect(wrapper.text()).toContain('Max 10MB')
  })

  it('renders IdStack layout container', () => {
    const wrapper = mount(IdStack, { props: { direction: 'horizontal' }, slots: { default: '<div>Item</div>' } })
    expect(wrapper.text()).toContain('Item')
  })
})
