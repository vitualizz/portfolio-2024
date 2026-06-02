import type { IDomainAgent, DomainAnswer } from './types'
import type { ChatMessage, Lang } from '../types'
import type { BlogMeta } from '../tools/types'
import { getCollection } from 'astro:content'
import { formatBlog } from '../formatters/blog.formatter'
import { generateDomainAnswer } from '../../lib/server/ai'

const buildPrompt = (data: string, lang: Lang): string =>
  `You are the content specialist for Lee IA — the AI version of Lee Palacios, an engineer who writes about what he ships.

YOUR TASK:
Answer questions about Lee's written content using ONLY the posts listed below.
Mention specific titles and what they cover — don't generalize. If asked about a topic not covered, say so directly.

OUTPUT FORMAT:
- Reply in ${lang === 'es' ? 'Spanish' : 'English'}
- 1–2 paragraphs, reference actual post titles
- If the question matches a specific post, describe it concretely
- This report feeds the main agent — be specific, not generic

BLOG POSTS DATA:
${data}`

export const blogAgent: IDomainAgent = {
  domain: 'blog',
  sourceLabel: 'blog posts',

  answer: async (question: string, history: ChatMessage[], lang: Lang): Promise<DomainAnswer> => {
    try {
      const entries = await getCollection(
        'blog',
        (e: { data: { lang: string } }) => e.data.lang === lang
      )

      const posts: BlogMeta[] = entries
        .map(
          (e: {
            slug: string
            data: {
              title: string
              shortDescription: string
              tags: string[]
              lang: Lang
              date: Date
            }
          }) => ({
            slug: e.slug,
            title: e.data.title,
            shortDescription: e.data.shortDescription,
            tags: e.data.tags,
            lang: e.data.lang,
            date: e.data.date
          })
        )
        .sort((a: BlogMeta, b: BlogMeta) => b.date.getTime() - a.date.getTime())

      if (posts.length === 0) {
        return { domain: 'blog', sourceLabel: 'blog posts', content: '', hasContent: false }
      }

      const formatted = formatBlog(posts)
      const system = buildPrompt(formatted, lang)
      const content = await generateDomainAnswer(system, question, history)
      return {
        domain: 'blog',
        sourceLabel: 'blog posts',
        content,
        hasContent: content.length > 0
      }
    } catch {
      return { domain: 'blog', sourceLabel: 'blog posts', content: '', hasContent: false }
    }
  }
}
