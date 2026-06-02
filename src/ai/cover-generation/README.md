# AI Cover Generation — Build-time CLI Tooling

This directory contains the **build-time** CLI pipeline for generating blog cover images. It is intentionally separate from `src/ia/`, which is the **runtime** Ask Lee AI assistant that ships with the portfolio bundle.

**Why separate?** `src/ia/` is bundled by Astro and deployed as runtime code. This pipeline pulls in Node.js-only dependencies (Sharp, gray-matter, filesystem access) and executes as a standalone `tsx` process — it must never be imported by Astro pages or API routes.

## Usage

```bash
pnpm blog:cover <slug>           # generate cover.webp for a post
pnpm blog:cover <slug> --force   # overwrite an existing cover.webp
```

The CLI reads `src/content/blog/<slug>/es.mdx` and `en.mdx`, generates a topic-aware prompt via **GPT-4o-mini** (Vercel AI SDK), renders an image via **OpenAI `gpt-image-1`** at `1536×1024`, and writes `src/content/blog/<slug>/cover.webp` cropped to **1200×630** (WebP, quality 85) with Sharp.

## Entry point

`src/scripts/generate-blog-cover.ts` — orchestrates the full pipeline.

## Pipeline

```
content-analyzer  →  cover-prompt-builder  →  openai.provider  →  image-processor
(gray-matter)         (gpt-4o-mini)            (gpt-image-1)       (Sharp → WebP)
```

1. **Analyze** — parse bilingual MDX frontmatter + optional h2 concepts.
2. **Prompt** — LLM builds a dynamic image description (no hardcoded prompts); style guide + topic map applied.
3. **Generate** — direct call to OpenAI Images API (`/v1/images/generations`) via `IImageGenerator`; returns URL or base64 (no `response_format` param — required for `gpt-image-*` models).
4. **Process** — Sharp resizes with `fit: 'cover'` to 1200×630 and writes WebP.

## Configuration

All knobs live in `config/cover-generation.config.ts`:

| Setting                   | Default        | Notes                                                        |
| ------------------------- | -------------- | ------------------------------------------------------------ |
| `model`                   | `gpt-image-1`  | OpenAI Images API model                                      |
| `generationSize`          | `1536x1024`    | API output size (landscape); Sharp crops to final dimensions |
| `imageQuality`            | `medium`       | Passed to OpenAI for `gpt-image-*` models                    |
| `width` / `height`        | `1200` / `630` | Final cover dimensions (blog layout)                         |
| `quality`                 | `85`           | WebP output quality (Sharp)                                  |
| `styleGuide` / `topicMap` | see config     | Visual identity + topic-aware cues                           |

No values are scattered across modules. To swap models (e.g. legacy `dall-e-3`), change `model` and `generationSize` in config — the provider builds the request body per model family.

## Environment

Requires `OPENAI_API_KEY` in `.env`. The CLI uses `process.env` — never `import.meta.env`. Run via `tsx --env-file .env` (see `package.json` script `blog:cover`).

## Provider abstraction

`providers/openai.provider.ts` implements `IImageGenerator`. Add new providers under `providers/` and register them in `providers/index.ts` — the CLI and processor stay unchanged.
