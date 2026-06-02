import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import type { ContentAnalysis, CoverConfig, PromptResult, TopicKey } from '../types.js'

const SYSTEM_PROMPT = `You are an expert visual art director for a software engineering blog.
Your task is to write a detailed image generation prompt for a cover image.

STRICT RULES — violating any is a failure:
- NO text, letters, words, numbers, or typography in the image
- NO cartoon style, anime, illustration, or clipart
- NO stock photography or photorealistic people
- NO generic "coding" clichés (floating code snippets, keyboards, laptops)
- DO use: dark background, minimalist, cinematic lighting, technical aesthetic
- DO use: abstract, atmospheric, high contrast, moody

Return ONLY the image prompt as plain text. No explanation, no metadata.`

function buildUserMessage(analysis: ContentAnalysis, config: CoverConfig): string {
  const topicGuidance = config.topicMap[analysis.primaryTopic]
  const conceptList = analysis.concepts.length > 0
    ? `\nKey concepts: ${analysis.concepts.slice(0, 5).join(', ')}`
    : ''

  return `Blog post: "${analysis.title}"
Topic: ${analysis.primaryTopic} — ${topicGuidance}
Tags: ${analysis.tags.join(', ')}
Summary: ${analysis.shortDescription}${conceptList}

Style guide: ${config.styleGuide}

Write a compelling, specific image generation prompt for the cover of this post.`
}

export async function buildCoverPrompt(
  analysis: ContentAnalysis,
  config: CoverConfig
): Promise<PromptResult> {
  const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserMessage(analysis, config) }],
    maxOutputTokens: 300,
    temperature: 0.7
  })

  return {
    prompt: text.trim(),
    topic: analysis.primaryTopic as TopicKey
  }
}
