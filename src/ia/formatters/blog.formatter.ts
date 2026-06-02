import type { BlogMeta } from '../tools/types'

export const formatBlog = (posts: BlogMeta[]): string =>
  posts
    .map(
      (p) => `"${p.title}" — ${p.shortDescription}\nTags: ${p.tags.join(', ')}`
    )
    .join('\n\n')
