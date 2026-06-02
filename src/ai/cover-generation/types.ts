export type TopicKey = 'rails' | 'ai-llm' | 'aws-devops' | 'general'

export type ContentAnalysis = {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  tags: string[]
  concepts: string[]
  primaryTopic: TopicKey
}

/** Supported OpenAI Images API sizes (model-dependent — see config comments). */
export type GenerationSize =
  | '1024x1024'
  | '1792x1024'
  | '1024x1792'
  | '1536x1024'
  | '1024x1536'
  | 'auto'

export type ImageQuality = 'low' | 'medium' | 'high' | 'auto'

export type CoverConfig = {
  width: number
  height: number
  /** Size sent to the OpenAI Images API (must match the selected model). */
  generationSize: GenerationSize
  /** Quality for gpt-image models; ignored for dall-e models. */
  imageQuality: ImageQuality
  quality: number
  provider: 'openai'
  model: string
  styleGuide: string
  topicMap: Record<TopicKey, string>
}

export type ImageResult = {
  kind: 'url' | 'base64'
  data: string
}

export type PromptResult = {
  prompt: string
  topic: TopicKey
}

export type CliFlags = {
  force: boolean
  preview: boolean
  variants: number
}

export interface IImageGenerator {
  generate(prompt: string, config: CoverConfig): Promise<ImageResult>
}
