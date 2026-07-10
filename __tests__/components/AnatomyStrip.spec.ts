import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnatomyStrip from '../../.vitepress/theme/components/AnatomyStrip.vue'

describe('AnatomyStrip', () => {
  it('renders the section', () => {
    const wrapper = mount(AnatomyStrip)
    expect(wrapper.find('.band').exists()).toBe(true)
  })

  it('renders the section eyebrow', () => {
    const wrapper = mount(AnatomyStrip)
    const eyebrow = wrapper.find('.band-eyebrow')
    expect(eyebrow.exists()).toBe(true)
    expect(eyebrow.text()).toMatch(/^\d+ ·/)
  })

  it('renders a section heading', () => {
    const wrapper = mount(AnatomyStrip)
    const h2 = wrapper.find('.band-head h2')
    expect(h2.exists()).toBe(true)
    expect(h2.text().length).toBeGreaterThan(0)
  })

  it('renders exactly 3 anatomy cards', () => {
    const wrapper = mount(AnatomyStrip)
    const cards = wrapper.findAll('.anatomy-card')
    expect(cards).toHaveLength(3)
  })

  it('each card has a number', () => {
    const wrapper = mount(AnatomyStrip)
    const nums = wrapper.findAll('.anatomy-num')
    expect(nums).toHaveLength(3)
    expect(nums[0].text()).toBe('1')
    expect(nums[1].text()).toBe('2')
    expect(nums[2].text()).toBe('3')
  })

  it('each card has an h3 heading', () => {
    const wrapper = mount(AnatomyStrip)
    const headings = wrapper.findAll('.anatomy-card h3')
    expect(headings).toHaveLength(3)
    headings.forEach(h => {
      expect(h.text().length).toBeGreaterThan(0)
    })
  })

  it('each card has a mono attribute list', () => {
    const wrapper = mount(AnatomyStrip)
    const monos = wrapper.findAll('.anatomy-mono')
    expect(monos).toHaveLength(3)
    monos.forEach(m => {
      expect(m.text().length).toBeGreaterThan(0)
    })
  })

  it('each card has a body paragraph', () => {
    const wrapper = mount(AnatomyStrip)
    const bodies = wrapper.findAll('.anatomy-body')
    expect(bodies).toHaveLength(3)
    bodies.forEach(b => {
      expect(b.text().length).toBeGreaterThan(20)
    })
  })

  it('contains links in the body text', () => {
    const wrapper = mount(AnatomyStrip)
    const links = wrapper.findAll('.anatomy-body a')
    expect(links.length).toBeGreaterThanOrEqual(3)
    links.forEach(a => {
      expect(a.attributes('href')).toMatch(/^\//)
    })
  })
})
