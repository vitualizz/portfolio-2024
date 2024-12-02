import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    seoTitle: z.string(),
    cover: image(),
    coverLink: z.string(),
    shortDescription: z.string(),
    longDescription: z.string(),
    author: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
  })
});

export const collections = {
  'blog': blogCollection,
};