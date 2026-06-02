import type { CoverConfig, IImageGenerator, ImageResult } from '../types.js'

const OPENAI_IMAGES_URL = 'https://api.openai.com/v1/images/generations'

type OpenAIImageResponse = {
  data?: Array<{ url?: string; b64_json?: string }>
}

function buildRequestBody(prompt: string, config: CoverConfig): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: config.model,
    prompt,
    n: 1,
    size: config.generationSize
  }

  // gpt-image models: no response_format/style; use quality instead
  if (config.model.startsWith('gpt-image') || config.model.startsWith('chatgpt-image')) {
    body.quality = config.imageQuality
    return body
  }

  // dall-e-3: do not send response_format — defaults to url; Sharp handles final crop
  return body
}

/**
 * Direct OpenAI Images API call — avoids AI SDK sending unsupported params
 * (e.g. response_format on gpt-image models). Sharp handles final 1200×630 crop.
 */
export class OpenAIImageProvider implements IImageGenerator {
  async generate(prompt: string, config: CoverConfig): Promise<ImageResult> {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('[blog:cover] Missing OPENAI_API_KEY')
    }

    const res = await fetch(OPENAI_IMAGES_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buildRequestBody(prompt, config))
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`[blog:cover] OpenAI image generation failed (${res.status}): ${text}`)
    }

    const json = (await res.json()) as OpenAIImageResponse
    const item = json.data?.[0]

    if (item?.b64_json) {
      return { kind: 'base64', data: item.b64_json }
    }

    if (item?.url) {
      return { kind: 'url', data: item.url }
    }

    throw new Error('[blog:cover] OpenAI provider returned no image data')
  }
}
