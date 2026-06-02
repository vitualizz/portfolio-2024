import type { IDomainAgent, DomainAnswer } from './types'
import type { ChatMessage, Lang } from '../types'
import { loadProjects } from '../tools/loaders'
import { formatProjects } from '../formatters/projects.formatter'
import { generateDomainAnswer } from '../../lib/server/ai'

const buildPrompt = (data: string, lang: Lang): string =>
  `You are the projects specialist for Lee IA — the AI version of Lee Palacios, a Fullstack Engineer who ships end-to-end.

YOUR TASK:
Extract a focused answer about Lee's built projects from the data below.
For each relevant project: name it, describe what it does concretely, list the stack, and include demo/GitHub links if available.
If the question targets a specific project or technology, focus there. Never invent.

OUTPUT FORMAT:
- Reply in ${lang === 'es' ? 'Spanish' : 'English'}
- 1–2 paragraphs, concrete and specific
- Skip generic filler — lead with the project name and what it actually does
- This report feeds the main agent — be dense and factual

PROJECTS DATA:
${data}`

export const projectsAgent: IDomainAgent = {
  domain: 'projects',
  sourceLabel: 'projects.json',

  answer: async (
    question: string,
    history: ChatMessage[],
    lang: Lang
  ): Promise<DomainAnswer> => {
    try {
      const data = loadProjects()
      const formatted = formatProjects(data, lang)
      const system = buildPrompt(formatted, lang)
      const content = await generateDomainAnswer(system, question, history)
      return {
        domain: 'projects',
        sourceLabel: 'projects.json',
        content,
        hasContent: content.length > 0
      }
    } catch {
      return {
        domain: 'projects',
        sourceLabel: 'projects.json',
        content: '',
        hasContent: false
      }
    }
  }
}
