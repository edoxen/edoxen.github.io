import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '../../.vitepress/theme/components/HeroSection.vue'

describe('HeroSection', () => {
  it('renders the hero section', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.find('.hero').exists()).toBe(true)
  })

  it('renders the eyebrow with Greek text', () => {
    const wrapper = mount(HeroSection)
    const eyebrow = wrapper.find('.eyebrow')
    expect(eyebrow.exists()).toBe(true)
    expect(eyebrow.text()).toContain('ἔδοξεν')
  })

  it('renders the hero title', () => {
    const wrapper = mount(HeroSection)
    const title = wrapper.find('.hero-title')
    expect(title.exists()).toBe(true)
    expect(title.text().length).toBeGreaterThan(0)
  })

  it('renders the hero lede', () => {
    const wrapper = mount(HeroSection)
    const lede = wrapper.find('.hero-lede')
    expect(lede.exists()).toBe(true)
    expect(lede.text().length).toBeGreaterThan(20)
  })

  it('renders two action buttons', () => {
    const wrapper = mount(HeroSection)
    const buttons = wrapper.findAll('.btn')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    const primary = wrapper.find('.btn-primary')
    const ghost = wrapper.find('.btn-ghost')
    expect(primary.exists()).toBe(true)
    expect(ghost.exists()).toBe(true)
  })

  it('the primary button links to an internal doc', () => {
    const wrapper = mount(HeroSection)
    const primary = wrapper.find('.btn-primary')
    expect(primary.attributes('href')).toMatch(/^\/docs\//)
  })

  it('renders the stats strip', () => {
    const wrapper = mount(HeroSection)
    const stats = wrapper.findAll('.stat')
    expect(stats.length).toBe(4)
  })

  it('each stat has a value (dt) and a label (dd)', () => {
    const wrapper = mount(HeroSection)
    const dts = wrapper.findAll('.stat dt')
    const dds = wrapper.findAll('.stat dd')
    expect(dts).toHaveLength(4)
    expect(dds).toHaveLength(4)
    dts.forEach(dt => expect(dt.text().length).toBeGreaterThan(0))
    dds.forEach(dd => expect(dd.text().length).toBeGreaterThan(0))
  })

  it('renders the YamlSpecimen component', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.find('.specimen').exists()).toBe(true)
  })

  it('renders a caption under the specimen', () => {
    const wrapper = mount(HeroSection)
    const caption = wrapper.find('.specimen-caption')
    expect(caption.exists()).toBe(true)
    expect(caption.text()).toContain('.yaml')
  })
})
