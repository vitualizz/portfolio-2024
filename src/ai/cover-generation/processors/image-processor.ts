import path from 'node:path'
import sharp from 'sharp'
import type { CoverConfig, ImageResult } from '../types.js'

const BLOG_DIR = path.resolve(process.cwd(), 'src/content/blog')

export async function processImage(
  imageResult: ImageResult,
  slug: string,
  config: CoverConfig
): Promise<string> {
  const outputPath = path.join(BLOG_DIR, slug, 'cover.webp')

  let inputBuffer: Buffer

  if (imageResult.kind === 'base64') {
    inputBuffer = Buffer.from(imageResult.data, 'base64')
  } else {
    const res = await fetch(imageResult.data)
    if (!res.ok) {
      throw new Error(
        `[blog:cover] Failed to fetch image: ${res.status} ${res.statusText}`
      )
    }
    inputBuffer = Buffer.from(await res.arrayBuffer())
  }

  await sharp(inputBuffer)
    .resize(config.width, config.height, { fit: 'cover' })
    .webp({ quality: config.quality })
    .toFile(outputPath)

  return outputPath
}
