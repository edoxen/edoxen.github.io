import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

vi.mock('vitepress', () => ({
  useData: () => ({
    frontmatter: {
      value: {
        date: '2026-07-04',
        authors: ['Ribose'],
      },
    },
    page: {
      value: {
        lastUpdated: new Date('2026-07-04T12:00:00Z').getTime(),
      },
    },
  }),
  withBase: (path: string) => path,
}))

vi.mock('../../.vitepress/posts.data', () => ({
  data: [
    {
      url: '/blog/2026-07-04-test-post/',
      title: { render: () => 'Test Post' },
      frontmatter: {
        title: 'Test Post',
        description: 'A test blog post.',
        authors: ['Ribose'],
        date: '2026-07-04',
      },
      excerpt: '<p>Excerpt</p>',
    },
  ],
}))

import BlogByline from '../../.vitepress/theme/components/BlogByline.vue'
import BlogIndex from '../../.vitepress/theme/components/BlogIndex.vue'

describe('BlogByline', () => {
  it('renders the byline strip', async () => {
    const wrapper = mount(BlogByline)
    await flushPromises()
    expect(wrapper.find('.blog-byline').exists()).toBe(true)
  })

  it('shows the formatted date', async () => {
    const wrapper = mount(BlogByline)
    await flushPromises()
    expect(wrapper.text()).toMatch(/2026/)
  })

  it('shows the author name', async () => {
    const wrapper = mount(BlogByline)
    await flushPromises()
    expect(wrapper.text()).toContain('Ribose')
  })
})

describe('BlogIndex', () => {
  it('renders the blog index page', async () => {
    const wrapper = mount(BlogIndex)
    await flushPromises()
    expect(wrapper.find('.blog-index').exists()).toBe(true)
  })

  it('renders at least one post card', async () => {
    const wrapper = mount(BlogIndex)
    await flushPromises()
    const cards = wrapper.findAll('.blog-card')
    expect(cards.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the post title', async () => {
    const wrapper = mount(BlogIndex)
    await flushPromises()
    const title = wrapper.find('.post-title')
    expect(title.exists()).toBe(true)
  })

  it('renders the post date', async () => {
    const wrapper = mount(BlogIndex)
    await flushPromises()
    const date = wrapper.find('.post-date')
    expect(date.exists()).toBe(true)
  })
})
