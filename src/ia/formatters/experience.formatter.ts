import type { ExperienceEntry } from '../tools/types'
import type { Lang } from '../types'

export const formatExperience = (entries: ExperienceEntry[], lang: Lang): string =>
  entries
    .map((e) => {
      const desc = lang === 'es' ? e.description_es : e.description_en
      return [
        `${e.role} @ ${e.company} (${e.period.start} – ${e.period.end})`,
        `Stack: ${e.tech.join(', ')}`,
        desc
      ].join('\n')
    })
    .join('\n\n')
