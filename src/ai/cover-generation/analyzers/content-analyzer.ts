import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { ContentAnalysis, TopicKey } from '../types.js'
import { defaultConfig } from '../config/cover-generation.config.js'

const BLOG_DIR = path.resolve(process.cwd(), 'src/content/blog')

function detectTopic(tags: string[]): TopicKey {
  const normalized = tags.map((t) => t.toLowerCase())
  if (normalized.some((t) => t.includes('rails') || t.includes('ruby')))
    return 'rails'
  if (
    normalized.some(
      (t) =>
        t.includes('ai') ||
        t.includes('llm') ||
        t.includes('ia') ||
        t.includes('agent')
    )
  )
    return 'ai-llm'
  if (
    normalized.some(
      (t) =>
        t.includes('aws') ||
        t.includes('devops') ||
        t.includes('docker') ||
        t.includes('cloud')
    )
  )
    return 'aws-devops'
  return 'general'
}

function extractConcepts(content: string): string[] {
  const headingRe = /^#{1,2}\s+(.+)$/gm
  const concepts: string[] = []
  let match: RegExpExecArray | null
  while ((match = headingRe.exec(content)) !== null) {
    concepts.push(match[1].trim())
  }
  return concepts.slice(0, 8)
}

export function analyzeContent(slug: string): ContentAnalysis {
  const slugDir = path.join(BLOG_DIR, slug)

  if (!fs.existsSync(slugDir)) {
    console.error(
      `[blog:cover] Unknown slug: "${slug}" — directory not found: ${slugDir}`
    )
    process.exit(1)
  }

  const langs = ['es', 'en'] as const
  let title = ''
  let shortDescription = ''
  let longDescription = ''
  const allTags: string[] = []
  const allConcepts: string[] = []

  for (const lang of langs) {
    const mdxPath = path.join(slugDir, `${lang}.mdx`)
    if (!fs.existsSync(mdxPath)) {
      console.error(`[blog:cover] Missing file: ${mdxPath}`)
      process.exit(1)
    }
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { data, content } = matter(raw)

    if (!title && data.title) title = String(data.title)
    if (!shortDescription && data.shortDescription)
      shortDescription = String(data.shortDescription)
    if (!longDescription && data.longDescription)
      longDescription = String(data.longDescription)
    if (Array.isArray(data.tags)) allTags.push(...data.tags.map(String))
    allConcepts.push(...extractConcepts(content))
  }

  const uniqueTags = [...new Set(allTags)]
  const uniqueConcepts = [...new Set(allConcepts)].slice(0, 8)
  const primaryTopic = detectTopic(uniqueTags)

  return {
    slug,
    title,
    shortDescription,
    longDescription,
    tags: uniqueTags,
    concepts: uniqueConcepts,
    primaryTopic
  }
}

// Re-export for external use
export { defaultConfig }
