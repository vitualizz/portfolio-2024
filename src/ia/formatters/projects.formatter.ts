import type { ProjectEntry } from '../tools/types'
import type { Lang } from '../types'

export const formatProjects = (projects: ProjectEntry[], lang: Lang): string =>
  projects
    .map((p) => {
      const desc = lang === 'es' ? p.description_es : p.description_en
      const stack = p.stack.map((s) => s.tooltip).join(', ')
      const links = [
        p.demo && `Demo: ${p.demo}`,
        p.githubUrl && `GitHub: ${p.githubUrl}`
      ]
        .filter(Boolean)
        .join(' · ')
      return [`${p.title}: ${desc}`, `Stack: ${stack}`, links]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n\n')
