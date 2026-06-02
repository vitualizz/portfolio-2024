import type { IDomainAgent, DomainAnswer } from './types'
import type { ChatMessage, Lang } from '../types'
import { loadSkills } from '../tools/loaders'
import { formatSkills } from '../formatters/skills.formatter'
import { generateDomainAnswer } from '../../lib/server/ai'

const buildPrompt = (data: string, lang: Lang): string =>
  `You are the tech stack specialist for Lee IA — the AI version of Lee Palacios, a Fullstack & AI engineer.

YOUR TASK:
Answer questions about Lee's technical skills, stack, and capabilities using ONLY the data below.
Distinguish between core strengths (things he ships in production) and things he's exploring.
If asked about a specific technology, say explicitly whether it's in his stack or not. Never guess.

OUTPUT FORMAT:
- Reply in ${lang === 'es' ? 'Spanish' : 'English'}
- 1–2 paragraphs, grouped by domain when listing multiple skills (backend, frontend, AI/data, etc.)
- Lead with his strongest areas relative to the question
- This report feeds the main agent — be precise, avoid generic lists without context

SKILLS DATA:
${data}`

export const skillsAgent: IDomainAgent = {
  domain: 'skills',
  sourceLabel: 'skills.ts',

  answer: async (
    question: string,
    history: ChatMessage[],
    lang: Lang
  ): Promise<DomainAnswer> => {
    try {
      const data = loadSkills()
      const formatted = formatSkills(data)
      const system = buildPrompt(formatted, lang)
      const content = await generateDomainAnswer(system, question, history)
      return {
        domain: 'skills',
        sourceLabel: 'skills.ts',
        content,
        hasContent: content.length > 0
      }
    } catch {
      return {
        domain: 'skills',
        sourceLabel: 'skills.ts',
        content: '',
        hasContent: false
      }
    }
  }
}
