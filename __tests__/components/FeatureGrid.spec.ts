import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureGrid from '../../.vitepress/theme/components/FeatureGrid.vue'
import { features } from '../../.vitepress/theme/data/home'

describe('FeatureGrid', () => {
  it('renders the band section', () => {
    const wrapper = mount(FeatureGrid)
    expect(wrapper.find('.band').exists()).toBe(true)
  })

  it('renders the eyebrow', () => {
    const wrapper = mount(FeatureGrid)
    const eyebrow = wrapper.find('.band-eyebrow')
    expect(eyebrow.exists()).toBe(true)
  })

  it('renders a section heading', () => {
    const wrapper = mount(FeatureGrid)
    const h2 = wrapper.find('.band-head h2')
    expect(h2.exists()).toBe(true)
  })

  it('renders one feature card per item in data', () => {
    const wrapper = mount(FeatureGrid)
    const cards = wrapper.findAll('.feature')
    expect(cards).toHaveLength(features.length)
  })

  it('each card is a link', () => {
    const wrapper = mount(FeatureGrid)
    const cards = wrapper.findAll('.feature')
    cards.forEach((card, i) => {
      expect(card.attributes('href')).toBe(features[i].href)
    })
  })

  it('each card shows the glyph', () => {
    const wrapper = mount(FeatureGrid)
    const glyphs = wrapper.findAll('.feature-glyph')
    expect(glyphs).toHaveLength(features.length)
    glyphs.forEach((g, i) => {
      expect(g.text()).toBe(features[i].glyph)
    })
  })

  it('each card shows the title', () => {
    const wrapper = mount(FeatureGrid)
    const titles = wrapper.findAll('.feature h3')
    expect(titles).toHaveLength(features.length)
    titles.forEach((t, i) => {
      expect(t.text()).toBe(features[i].title)
    })
  })

  it('each card shows the body text', () => {
    const wrapper = mount(FeatureGrid)
    const bodies = wrapper.findAll('.feature p')
    expect(bodies).toHaveLength(features.length)
    bodies.forEach((b, i) => {
      expect(b.text()).toBe(features[i].body)
    })
  })

  it('each card has an arrow indicator', () => {
    const wrapper = mount(FeatureGrid)
    const arrows = wrapper.findAll('.feature-arrow')
    expect(arrows.length).toBeGreaterThanOrEqual(features.length)
  })
})
