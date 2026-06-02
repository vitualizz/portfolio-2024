import type { CoverConfig, IImageGenerator } from '../types.js'
import { OpenAIImageProvider } from './openai.provider.js'

export function getProvider(config: CoverConfig): IImageGenerator {
  switch (config.provider) {
    case 'openai':
      return new OpenAIImageProvider()
    default: {
      const exhaustive: never = config.provider
      throw new Error(`[blog:cover] Unknown image provider: "${exhaustive}"`)
    }
  }
}
