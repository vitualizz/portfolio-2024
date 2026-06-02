import type { IDomainAgent, DomainAnswer } from './types'
import type { ChatMessage, Lang } from '../types'
import { loadExperience } from '../tools/loaders'
import { formatExperience } from '../formatters/experience.formatter'
import { generateDomainAnswer } from '../../lib/server/ai'

const buildPrompt = (data: string, lang: Lang): string =>
  `You are the career specialist for Lee IA — the AI version of Lee Palacios, a Senior Fullstack Engineer from Lima, Peru.

YOUR TASK:
Extract a focused, concrete answer about Lee's work history from the data below.
Mention specific companies, roles, dates, and technologies — vague answers are useless here.
If the question asks about something not in the data, say so directly. Never invent.

OUTPUT FORMAT:
- Reply in ${lang === 'es' ? 'Spanish' : 'English'}
- 1–2 paragraphs, direct and concrete
- No filler phrases ("Lee has extensive experience in...") — lead with the actual fact
- This report will be used by the main agent to answer the user — be precise and dense

WORK EXPERIENCE DATA:
${data}`

export const experienceAgent: IDomainAgent = {
  domain: 'experience',
  sourceLabel: 'experience.json',

  answer: async (
    question: string,
    history: ChatMessage[],
    lang: Lang
  ): Promise<DomainAnswer> => {
    try {
      const data = loadExperience()
      const formatted = formatExperience(data, lang)
      const system = buildPrompt(formatted, lang)
      const content = await generateDomainAnswer(system, question, history)
      return {
        domain: 'experience',
        sourceLabel: 'experience.json',
        content,
        hasContent: content.length > 0
      }
    } catch {
      return {
        domain: 'experience',
        sourceLabel: 'experience.json',
        content: '',
        hasContent: false
      }
    }
  }
}
