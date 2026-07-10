import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '../../.vitepress/theme/components/HomePage.vue'

describe('HomePage', () => {
  it('renders the .home wrapper', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('.home').exists()).toBe(true)
  })

  it('renders the HeroSection', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('.hero').exists()).toBe(true)
  })

  it('renders the AnatomyStrip', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.findAll('.anatomy-card').length).toBe(3)
  })

  it('renders the PipelineDiagram', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders the FeatureGrid', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.findAll('.feature').length).toBeGreaterThanOrEqual(4)
  })

  it('renders the CtaBand', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('.cta').exists()).toBe(true)
  })

  it('renders the CLI snippet in the CTA', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('.cta-cli').text()).toContain('gem install')
  })

  it('renders the YAML specimen in the hero', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('.specimen').exists()).toBe(true)
  })

  it('renders the stats strip', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.findAll('.stat').length).toBe(4)
  })
})
