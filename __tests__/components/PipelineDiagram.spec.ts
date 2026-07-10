import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PipelineDiagram from '../../.vitepress/theme/components/PipelineDiagram.vue'

describe('PipelineDiagram', () => {
  it('renders the SVG pipeline', () => {
    const wrapper = mount(PipelineDiagram)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('has an accessible label', () => {
    const wrapper = mount(PipelineDiagram)
    const svg = wrapper.find('svg')
    expect(svg.attributes('aria-label')).toBeTruthy()
  })

  it('includes Parse as the first stage', () => {
    const wrapper = mount(PipelineDiagram)
    const text = wrapper.text()
    expect(text).toContain('Parse')
  })

  it('includes Decode as the second stage', () => {
    const wrapper = mount(PipelineDiagram)
    const text = wrapper.text()
    expect(text).toContain('Decode')
    expect(text).toContain('ResolutionCollection')
  })

  it('includes Validate as the third stage', () => {
    const wrapper = mount(PipelineDiagram)
    const text = wrapper.text()
    expect(text).toContain('Validate')
    expect(text).toContain('JSONSchemer')
  })

  it('includes the Pass | Error outcome', () => {
    const wrapper = mount(PipelineDiagram)
    const text = wrapper.text()
    expect(text).toContain('Pass')
    expect(text).toContain('Error')
  })

  it('renders the CLI caption by default', () => {
    const wrapper = mount(PipelineDiagram)
    const text = wrapper.text()
    expect(text).toContain('edoxen validate')
  })

  it('hides the caption when :caption="false"', () => {
    const wrapper = mount(PipelineDiagram, { props: { caption: false } })
    const text = wrapper.text()
    expect(text).not.toContain('One CLI command')
  })
})
