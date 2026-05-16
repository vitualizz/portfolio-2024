export interface ExperiencePeriod {
  start: string
  end: string | null
}

export interface ExperienceEntry {
  company: string
  role: string
  period: ExperiencePeriod
  description_en: string
  description_es: string
  tech: string[]
}
