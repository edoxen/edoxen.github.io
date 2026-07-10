import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CtaBand from '../../.vitepress/theme/components/CtaBand.vue'

describe('CtaBand', () => {
  it('renders the CTA section', () => {
    const wrapper = mount(CtaBand)
    expect(wrapper.find('.cta').exists()).toBe(true)
  })

  it('renders a "Get started" eyebrow', () => {
    const wrapper = mount(CtaBand)
    expect(wrapper.find('.cta-eyebrow').text()).toContain('Get started')
  })

  it('renders a heading', () => {
    const wrapper = mount(CtaBand)
    const h2 = wrapper.find('h2')
    expect(h2.exists()).toBe(true)
    expect(h2.text().length).toBeGreaterThan(10)
  })

  it('renders the CLI install snippet', () => {
    const wrapper = mount(CtaBand)
    const cli = wrapper.find('.cta-cli')
    expect(cli.exists()).toBe(true)
    expect(cli.text()).toContain('gem install')
    expect(cli.text()).toContain('edoxen validate')
  })

  it('renders the primary action button', () => {
    const wrapper = mount(CtaBand)
    const primary = wrapper.find('.btn-primary')
    expect(primary.exists()).toBe(true)
    expect(primary.text()).toContain('Install')
    expect(primary.attributes('href')).toContain('/docs/installation')
  })

  it('renders the ghost action button linking to GitHub', () => {
    const wrapper = mount(CtaBand)
    const ghost = wrapper.find('.btn-ghost')
    expect(ghost.exists()).toBe(true)
    expect(ghost.text()).toContain('GitHub')
    expect(ghost.attributes('href')).toContain('github.com')
  })
})
