import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import YamlSpecimen from '../../.vitepress/theme/components/YamlSpecimen.vue'

describe('YamlSpecimen', () => {
  it('renders the specimen figure', () => {
    const wrapper = mount(YamlSpecimen)
    expect(wrapper.find('.specimen').exists()).toBe(true)
  })

  it('renders the SPECIMEN tag', () => {
    const wrapper = mount(YamlSpecimen)
    expect(wrapper.find('.specimen-tag').text()).toContain('SPECIMEN')
  })

  it('renders the file name in the header', () => {
    const wrapper = mount(YamlSpecimen)
    const meta = wrapper.find('.specimen-meta')
    expect(meta.text()).toContain('.yaml')
  })

  it('renders a "valid" badge', () => {
    const wrapper = mount(YamlSpecimen)
    expect(wrapper.find('.specimen-valid').text()).toContain('valid')
  })

  it('renders YAML code inside a <pre> element', () => {
    const wrapper = mount(YamlSpecimen)
    const code = wrapper.find('.specimen-code code')
    expect(code.exists()).toBe(true)
    const html = code.html()
    expect(html).toContain('identifier')
    expect(html).toContain('ACME')
  })

  it('renders syntax-highlighted keys as span.y-k', () => {
    const wrapper = mount(YamlSpecimen)
    const html = wrapper.find('.specimen-code code').html()
    expect(html).toContain('class="y-k"')
  })

  it('renders a link to the schema page in the footer', () => {
    const wrapper = mount(YamlSpecimen)
    const link = wrapper.find('.specimen-link')
    expect(link.attributes('href')).toBe('/docs/schema')
    expect(link.text()).toContain('Read the schema')
  })

  it('does NOT produce broken self-referencing spans', () => {
    const wrapper = mount(YamlSpecimen)
    const html = wrapper.find('.specimen-code code').html()
    expect(html).not.toContain('class="y-s">"y-')
    expect(html).not.toContain('class=<span')
  })
})
