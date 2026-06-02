# Lee Palacios — Portfolio

Personal portfolio and blog built with Astro 5 and TypeScript. Live at **https://vitualizz.vercel.app**.

## Stack

| Technology              | Version | Role                        |
| :---------------------- | :------ | :-------------------------- |
| Astro                   | 5.12    | Framework / SSR             |
| TypeScript              | 5.4     | Language                    |
| Tailwind CSS            | 3.4     | Styling                     |
| DaisyUI                 | 4.10    | Component layer             |
| Vercel (serverless)     | —       | Hosting / adapter           |
| Resend                  | —       | Contact form email delivery |
| AOS                     | 2.3     | Scroll animations           |
| Fredoka (variable font) | —       | Typography                  |

## Routes

The site is fully internationalized. `astro.config.mjs` sets `defaultLocale: 'es'`.

> **Known inconsistency**: `src/i18n/ui.ts` declares `defaultLang: 'en'` while `astro.config.mjs` uses `defaultLocale: 'es'`. The Astro routing follows `astro.config.mjs`.

| Path                  | Description                                                    |
| :-------------------- | :------------------------------------------------------------- |
| `/`                   | Redirects to `/es/`                                            |
| `/es/`                | Home page — Spanish                                            |
| `/en/`                | Home page — English                                            |
| `/[lang]/blog/[slug]` | Individual blog post (e.g. `/es/blog/rails-queries-practices`) |

## Project Structure

```
src/
├── components/       # Astro and UI components
├── content/
│   └── blog/         # Blog posts (one folder per post)
│       └── <slug>/
│           ├── cover.webp
│           ├── en.md
│           └── es.md
├── data/             # Static data files
├── i18n/             # Translation strings and locale helpers
├── layouts/          # Page layouts
├── pages/
│   ├── api/
│   │   └── contact.ts  # Contact form endpoint (uses Resend)
│   ├── [lang]/
│   │   ├── index.astro
│   │   └── blog/
│   └── index.astro     # Root redirect
└── types/
```

## Getting Started

### Environment variables

| Variable         | Required | Description                                                                          |
| :--------------- | :------- | :----------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | Yes      | API key for the contact form. Get one at [resend.com](https://resend.com).           |
| `OPENAI_API_KEY` | Yes      | API key for Ask Lee (`/api/ask-lee`, `/api/ask-blog`) and the `pnpm blog:cover` CLI. |

Copy `.env.example` to `.env` and fill in the values.

### Commands

All commands run from the project root:

| Command                  | Action                                     |
| :----------------------- | :----------------------------------------- |
| `pnpm install`           | Install dependencies                       |
| `pnpm dev`               | Start local dev server at `localhost:4321` |
| `pnpm build`             | Type-check and build for production        |
| `pnpm preview`           | Preview the production build locally       |
| `pnpm astro check`       | Run Astro type checking                    |
| `pnpm blog:cover <slug>` | Generate a blog cover image (see below)    |
| `pnpm test`              | Run unit tests                             |

## Blog

Posts use [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/). Each post lives in its own folder under `src/content/blog/<slug>/` and contains three files:

```
src/content/blog/<slug>/
├── cover.webp   # Post cover image (1200×630 WebP)
├── en.mdx       # English content
└── es.mdx       # Spanish content
```

### Cover generation

Generate or regenerate a cover with the build-time CLI (requires `OPENAI_API_KEY` in `.env`):

```bash
pnpm blog:cover <slug>           # writes src/content/blog/<slug>/cover.webp
pnpm blog:cover <slug> --force   # overwrite existing cover.webp
```

Pipeline details: `src/ai/cover-generation/README.md`.

Frontmatter schema (from `src/content/config.ts`):

```ts
{
  title: string
  seoTitle: string
  cover: image()
  coverLink: string
  shortDescription: string
  longDescription: string
  author: string
  date: date
  tags: string[]
  lang: string
}
```

## Deployment

The site is deployed to Vercel using the `@astrojs/vercel` serverless adapter (`output: 'server'`).

Set the following environment variable in the Vercel dashboard under **Settings → Environment Variables**:

| Variable         | Description                                             |
| :--------------- | :------------------------------------------------------ |
| `RESEND_API_KEY` | Required for the contact form to send emails            |
| `OPENAI_API_KEY` | Required for Ask Lee APIs and the `pnpm blog:cover` CLI |
