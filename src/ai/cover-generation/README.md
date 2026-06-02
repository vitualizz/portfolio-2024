# AI Cover Generation — Build-time CLI Tooling

This directory contains the **build-time** CLI pipeline for generating blog cover images. It is intentionally separate from `src/ia/`, which is the **runtime** Ask Lee AI assistant that ships with the portfolio bundle.

**Why separate?** `src/ia/` is bundled by Astro and deployed as runtime code. This pipeline pulls in Node.js-only dependencies (Sharp, gray-matter, filesystem access) and executes as a standalone `tsx` process — it must never be imported by Astro pages or API routes.

## Usage

```bash
pnpm blog:cover <slug>           # generate cover.webp for a post
pnpm blog:cover <slug> --force   # overwrite an existing cover.webp
```

The CLI reads `src/content/blog/<slug>/es.mdx` and `en.mdx`, generates a topic-aware prompt via GPT-4o-mini, renders an image via DALL-E 3, and writes `src/content/blog/<slug>/cover.webp` at 1200×630 px (WebP, quality 85).

## Entry point

`src/scripts/generate-blog-cover.ts` — orchestrates the full pipeline.

## Pipeline

```
content-analyzer  →  cover-prompt-builder  →  openai.provider  →  image-processor
(gray-matter)         (gpt-4o-mini)            (DALL-E 3)          (Sharp → WebP)
```

## Configuration

All knobs (dimensions, model, quality, style guide, topic map) live in `config/cover-generation.config.ts`. No values are scattered across modules.

## Environment

Requires `OPENAI_API_KEY` in `.env`. The CLI uses `process.env` — never `import.meta.env`.
