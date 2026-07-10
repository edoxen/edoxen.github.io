import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './docs' }),
})

const blog = defineCollection({
  loader: glob({ pattern: '[!index]*.md', base: './blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    authors: z.array(z.string()).optional(),
    date: z.union([z.string(), z.date()]).optional(),
  }).passthrough(),
})

export const collections = { docs, blog }
