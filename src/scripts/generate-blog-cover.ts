#!/usr/bin/env node
// CLI entry point — uses process.env (tsx --env-file .env), NOT import.meta.env
import fs from 'node:fs'
import path from 'node:path'
import { analyzeContent } from '../ai/cover-generation/analyzers/content-analyzer.js'
import { buildCoverPrompt } from '../ai/cover-generation/prompt-builders/cover-prompt-builder.js'
import { getProvider } from '../ai/cover-generation/providers/index.js'
import { processImage } from '../ai/cover-generation/processors/image-processor.js'
import { defaultConfig } from '../ai/cover-generation/config/cover-generation.config.js'
import type { CliFlags } from '../ai/cover-generation/types.js'

const BLOG_DIR = path.resolve(process.cwd(), 'src/content/blog')

function parseArgs(argv: string[]): { slug: string; flags: CliFlags } {
  const args = argv.slice(2)
  const slug = args.find((a) => !a.startsWith('-')) ?? ''
  const force = args.includes('--force')
  const preview = args.includes('--preview')

  const variantArg = args.find((a) => a.startsWith('--variants='))
  const variants = variantArg
    ? parseInt(variantArg.split('=')[1] ?? '1', 10)
    : 0

  return { slug, flags: { force, preview, variants } }
}

export async function main(argv: string[] = process.argv): Promise<void> {
  const { slug, flags } = parseArgs(argv)

  if (!slug) {
    console.error(
      '[blog:cover] Usage: pnpm blog:cover <slug> [--force] [--preview] [--variants=N]'
    )
    process.exit(1)
  }

  // Stub: --preview not yet implemented
  if (flags.preview) {
    console.log('[blog:cover] --preview not yet implemented')
    process.exit(0)
  }

  // Stub: --variants not yet implemented
  if (flags.variants > 0) {
    console.log('[blog:cover] --variants not yet implemented')
    process.exit(0)
  }

  // Guard: validate slug directory exists
  const slugDir = path.join(BLOG_DIR, slug)
  if (!fs.existsSync(slugDir)) {
    console.error(
      `[blog:cover] Unknown slug: "${slug}" — not found at ${slugDir}`
    )
    process.exit(1)
  }

  // Guard: check API key before any network call
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      '[blog:cover] Missing required environment variable: OPENAI_API_KEY'
    )
    process.exit(1)
  }

  // Guard: refuse overwrite without --force
  const outputPath = path.join(slugDir, 'cover.webp')
  if (fs.existsSync(outputPath) && !flags.force) {
    console.error(
      `[blog:cover] cover.webp already exists at ${outputPath}\n` +
        `  Run with --force to overwrite.`
    )
    process.exit(1)
  }

  console.log(`[blog:cover] Analyzing content for slug: "${slug}"...`)
  const analysis = analyzeContent(slug)

  console.log(`[blog:cover] Topic detected: ${analysis.primaryTopic}`)
  console.log('[blog:cover] Building cover prompt via LLM...')
  const promptResult = await buildCoverPrompt(analysis, defaultConfig)

  console.log('[blog:cover] Generating image...')
  const provider = getProvider(defaultConfig)
  const imageResult = await provider.generate(
    promptResult.prompt,
    defaultConfig
  )

  console.log('[blog:cover] Processing image with Sharp...')
  const written = await processImage(imageResult, slug, defaultConfig)

  console.log(`[blog:cover] Done! Cover written to: ${written}`)
}

// Run when called directly (not imported by tests)
if (process.argv[1] && process.argv[1].includes('generate-blog-cover')) {
  main().catch((err: unknown) => {
    console.error(
      '[blog:cover] Fatal error:',
      err instanceof Error ? err.message : String(err)
    )
    process.exit(1)
  })
}
