export type ChipVariant = 'strong' | 'default'
export type DotColor = 'accent' | 'coral' | 'mint'
export type StackChipVariant = 's-core' | 's-strong' | 's-learn'

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

export interface StackChip {
  label: string
  variant: StackChipVariant
}

export interface StackPanel {
  key: string
  tabNum: string
  tabName: string
  description: { es: string; en: string }
  chips: StackChip[]
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
      { label: 'SQL' }
    ]
  },
  {
    label: 'AI Builder · explorando',
    chipVariant: 'default',
    dotColor: 'coral',
    items: [
      { label: 'GPT / Claude / LLMs' },
      { label: 'N8N · agent orchestration' },
      { label: 'Prompt engineering' }
    ]
  },
  {
    label: 'Frontend · cuando hace falta',
    chipVariant: 'default',
    dotColor: 'mint',
    items: [
      { label: 'TypeScript' },
      { label: 'React' },
      { label: 'React Native' },
      { label: 'Tailwind' }
    ]
  }
]

export const stackExplorerPanels: StackPanel[] = [
  {
    key: 'backend',
    tabNum: '01',
    tabName: 'Backend',
    description: {
      es: 'Donde vivo. APIs robustas, queries optimizadas, modelos de datos que aguantan producción.',
      en: 'Where I live. Robust APIs, optimized queries, data models that hold up in production.'
    },
    chips: [
      { label: 'Ruby on Rails', variant: 's-core' },
      { label: 'Python', variant: 's-core' },
      { label: 'Node.js', variant: 's-core' },
      { label: 'REST · GraphQL', variant: 's-core' },
      { label: 'FastAPI', variant: 's-strong' },
      { label: 'Sidekiq', variant: 's-strong' },
      { label: 'Hotwire · Turbo', variant: 's-strong' },
      { label: 'RSpec · pytest', variant: 's-strong' },
      { label: 'ActiveJob', variant: 's-strong' },
      { label: 'WebSockets · Action Cable', variant: 's-strong' }
    ]
  },
  {
    key: 'frontend',
    tabNum: '02',
    tabName: 'Frontend',
    description: {
      es: 'UI con rigor: tipados, accesibles, rápidos. Web y mobile.',
      en: 'Rigorous UI: typed, accessible, fast. Web and mobile.'
    },
    chips: [
      { label: 'TypeScript', variant: 's-core' },
      { label: 'React', variant: 's-core' },
      { label: 'React Native', variant: 's-core' },
      { label: 'Next.js', variant: 's-strong' },
      { label: 'Tailwind CSS', variant: 's-strong' },
      { label: 'Redux · Zustand', variant: 's-strong' },
      { label: 'Vue 3', variant: 's-strong' },
      { label: 'Atomic Design', variant: 's-strong' },
      { label: 'Expo', variant: 's-strong' },
      { label: 'HTML5 · CSS · SCSS', variant: 's-strong' }
    ]
  },
  {
    key: 'ai',
    tabNum: '03',
    tabName: 'AI / LLM',
    description: {
      es: 'La nueva capa del stack. Agentes, LLMs y automatización con criterio de ingeniero.',
      en: 'The new stack layer. Agents, LLMs and automation with engineering judgement.'
    },
    chips: [
      { label: 'N8N · agents', variant: 's-core' },
      { label: 'OpenAI · GPT‑4o', variant: 's-core' },
      { label: 'Anthropic · Claude', variant: 's-core' },
      { label: 'Prompt engineering', variant: 's-core' },
      { label: 'RAG · embeddings', variant: 's-strong' },
      { label: 'pgvector', variant: 's-strong' },
      { label: 'LangChain', variant: 's-strong' },
      { label: 'Function calling · tools', variant: 's-strong' },
      { label: 'MCP', variant: 's-learn' },
      { label: 'Fine‑tuning', variant: 's-learn' }
    ]
  },
  {
    key: 'data',
    tabNum: '04',
    tabName: 'Data',
    description: {
      es: 'El dato manda. SQL afinado, índices correctos, esquemas honestos.',
      en: 'Data rules. Tuned SQL, correct indexes, honest schemas.'
    },
    chips: [
      { label: 'PostgreSQL', variant: 's-core' },
      { label: 'SQL avanzado', variant: 's-core' },
      { label: 'ElasticSearch', variant: 's-core' },
      { label: 'DynamoDB', variant: 's-core' },
      { label: 'MySQL', variant: 's-core' },
      { label: 'Redis', variant: 's-strong' },
      { label: 'Query optimization', variant: 's-strong' },
      { label: 'Indices · EXPLAIN', variant: 's-strong' },
      { label: 'Migrations', variant: 's-strong' },
      { label: 'ETL pipelines', variant: 's-strong' }
    ]
  },
  {
    key: 'cloud',
    tabNum: '05',
    tabName: 'Cloud',
    description: {
      es: 'Infra que se mantiene sola. Serverless donde tiene sentido, contenedores donde no.',
      en: "Self-maintaining infra. Serverless where it makes sense, containers where it doesn't."
    },
    chips: [
      { label: 'AWS Lambda', variant: 's-core' },
      { label: 'AWS · EC2 · S3 · RDS', variant: 's-core' },
      { label: 'Serverless Framework', variant: 's-core' },
      { label: 'Docker', variant: 's-strong' },
      { label: 'CloudFront · Route53', variant: 's-strong' },
      { label: 'SQS · SNS', variant: 's-strong' },
      { label: 'GitHub Actions · CI/CD', variant: 's-strong' },
      { label: 'Heroku · Render', variant: 's-strong' },
      { label: 'Nginx', variant: 's-strong' },
      { label: 'Terraform', variant: 's-learn' }
    ]
  },
  {
    key: 'tools',
    tabNum: '06',
    tabName: 'Tools',
    description: {
      es: 'El día a día. Lo que tengo abierto mientras esto se está cargando.',
      en: 'The daily driver. What I have open while this is loading.'
    },
    chips: [
      { label: 'Git · GitHub', variant: 's-core' },
      { label: 'tmux · zsh', variant: 's-core' },
      { label: 'Cursor · VS Code', variant: 's-core' },
      { label: 'Linear · Jira', variant: 's-core' },
      { label: 'Postman · Insomnia', variant: 's-core' },
      { label: 'Slack · Discord', variant: 's-core' },
      { label: 'Figma', variant: 's-strong' },
      { label: 'Notion', variant: 's-strong' },
      { label: 'Datadog · Sentry', variant: 's-strong' },
      { label: 'Claude Code', variant: 's-strong' }
    ]
  }
]
