export type ChipVariant = 'strong' | 'default'
export type DotColor = 'accent' | 'coral' | 'mint'

export interface SkillItem {
  label: string
}

export interface SkillGroup {
  label: string
  chipVariant: ChipVariant
  dotColor: DotColor
  primary?: boolean
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Backend · donde vivo',
    chipVariant: 'strong',
    dotColor: 'accent',
    primary: true,
    items: [
      { label: 'Ruby on Rails' },
      { label: 'Postgres' },
      { label: 'Python' },
      { label: 'AWS Lambda' },
      { label: 'SQL' },
    ],
  },
  {
    label: 'AI Builder · explorando',
    chipVariant: 'default',
    dotColor: 'coral',
    items: [
      { label: 'GPT / Claude / LLMs' },
      { label: 'N8N · agent orchestration' },
      { label: 'Prompt engineering' },
    ],
  },
  {
    label: 'Frontend · cuando hace falta',
    chipVariant: 'default',
    dotColor: 'mint',
    items: [
      { label: 'TypeScript' },
      { label: 'React' },
      { label: 'React Native' },
      { label: 'Tailwind' },
    ],
  },
]
