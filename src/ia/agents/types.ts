import type { ChatMessage, Lang } from '../types'

export interface IDomainAgent {
  readonly domain: string
  readonly sourceLabel: string
  answer(
    question: string,
    history: ChatMessage[],
    lang: Lang
  ): Promise<DomainAnswer>
}

export type DomainAnswer = {
  domain: string
  sourceLabel: string
  content: string
  hasContent: boolean
}
