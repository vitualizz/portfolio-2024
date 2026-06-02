export type ExperienceEntry = {
  company: string
  role: string
  period: { start: string; end: string }
  description_es: string
  description_en: string
  tech: string[]
}

export type ProjectStack = { icon: string; tooltip: string }

export type ProjectEntry = {
  title: string
  description_es: string
  description_en: string
  image: string
  githubUrl?: string
  demo?: string
  stack: ProjectStack[]
}

export type SkillItem = { label: string; variant?: string }
// SkillGroup uses 'label' to match the actual data shape in src/data/skills.ts
export type SkillGroup = { label: string; items: SkillItem[] }

export type BlogMeta = {
  slug: string
  title: string
  shortDescription: string
  tags: string[]
  lang: 'es' | 'en'
  date: Date
}

export type ToolKey = 'experience' | 'projects' | 'skills' | 'blog'
