import type { LanguageLocale } from 'src/types/I18n.types'

const locale: LanguageLocale = {
  nav: {
    presentation: 'Presentation',
    about_me: 'About me',
    projects: 'Projects',
    contact_me: 'Contact me',
    blog: 'Blog',
    work_experience: 'Experience',
    ask_ai: 'Ask AI',
    resume_label: 'Resume',
    switch_language: 'Switch language',
    language_name: 'English',
    language_option: 'Switch to {language}'
  },
  home: {
    about_eyebrow: '// 01 · About me',
    about_title: "About <span class='hl-title'>me</span>",
    about_subtitle:
      'The human behind the code — what drives me, what I do, and what is in my toolbox.',
    ai_eyebrow: '// 02 · Lab',
    ai_title: "Ask Lee <span class='hl-title'>↳ via AI</span>",
    ai_subtitle:
      'An AI trained with my CV, stacks and projects. Ask technical questions, about my experience, or whatever you want.',
    projects_eyebrow: '// 03 · Projects',
    projects_title: "Selected <span class='hl-title'>work</span>",
    projects_subtitle:
      'Shipped work in production. Click to view demo or code.',
    xp_eyebrow: '// 04 · Experience',
    xp_title: "My <span class='hl-title'>journey</span>",
    xp_subtitle: 'Four professional stops, one constant: shipped product.',
    blog_eyebrow: '// 05 · Notes',
    blog_title: "What I <span class='hl-title'>write</span>",
    blog_subtitle: 'Technical notes about what I am learning.',
    contact_title:
      "Let's talk<br/>Tell me about your <em class='not-italic hl'>project</em> ✨",
    contact_subtitle:
      "If your team needs someone who can take ownership end to end, shape architecture, and keep delivery moving, let's talk. I work close to product, backend, and business outcomes, and I reply within 24 business hours.",
    contact_download_cv: 'Download CV',
    paused_label: 'paused',
    footer_location_line: 'Lima · UTC −5 · ES / EN',
    quote_text:
      "Code is the easy part. <span class='hl'>Shipping product that holds</span> — and that the team understands coming back on Monday — is the work.",
    stack_legend_core: 'Core',
    stack_legend_strong: 'Solid',
    stack_legend_learn: 'Learning'
  },
  presentation: {
    hi: 'Hi, 🚀',
    i_am: "I'm <span class='hl text-nowrap'>Lee Palacios</span>",
    profession: 'Software Engineer and cat lover 🐱',
    description:
      "<span class='hl'>+7 years</span> delivering <strong class='text-ink'>end‑to‑end</strong> product in LatAm startups. <strong class='text-ink'>API, database, UI and infra</strong> — the full chain, no ball-dropping. TypeScript, React, Rails, Python, AWS. When the feature calls for it, AI agents in production too.",
    description_ps:
      "PS: my three cats review every PR before any human does. They haven't approved a rebase --force yet.",
    typewriter_words:
      'Senior Fullstack Engineer|TypeScript · React · Rails · Python|From Postgres to pixel|AI Builder · LLM orchestration|Cat dad · 3 cats',
    tagline:
      'I build systems that scale, products that ship, and teams that move forward.',
    cta_primary: 'See my work',
    cta_secondary: 'Get in touch'
  },
  about_me: {
    section_about_me: 'About me',
    section_skills: 'Skills',
    biography: [
      "I started coding at <span class='hl-soft'>12 years old</span> by opening game files to understand how they worked. By <span class='hl-soft'>15 I was already getting paid</span> to write software — before I even knew the job had a name.",
      "Since then, my career has been a journey through LatAm startups: from <strong class='text-ink'>developer</strong> to <strong class='text-ink'>Tech Lead</strong> to <strong class='text-ink'>Senior IC</strong>. I built an influencer campaign platform from scratch, optimized a SaaS used by thousands of buildings, and refactored stacks inherited by a whole team without documentation. Every stop taught me the same thing: <span class='hl-soft'>shipped product</span>.",
      "Today I define myself as a <strong class='text-ink'>Senior Fullstack Engineer</strong> with <strong class='text-ink'>7+ years</strong> of experience: I deliver features <strong class='text-ink'>end-to-end</strong> — schema, API, UI, infra — without passing the ball to another team. In the last year I added <span class='hl'>AI Builder</span> to my toolkit: agents and LLMs when the feature justifies it, not just for the hype.",
      "Quick toolbox: <strong class='text-ink'>TypeScript, React/React Native, Rails, Python, Postgres, AWS</strong>. The full detail lives in my CV — along with the rest of the journey."
    ],
    mini_note:
      'Lima · Native ES / Fluent EN · three cats that approve my code.',
    skills_section_frameworks: 'Frameworks & Libraries',
    skills_section_others: 'Others',
    skills_section_languages: 'Languages',
    stat_years: 'Yrs of exp.',
    stat_projects: 'Projects',
    stat_stack: 'Full Stack',
    stack_footer:
      '→ someone who prefers <b>learning one tool deeply</b> over collecting 20 logos on a resume.'
  },
  work_experience: {
    title: 'Experience',
    present: 'Present',
    show_more: 'Show more',
    show_less: 'Show less'
  },
  projects: {
    section_projects: 'Projects',
    live_preview: 'Live preview',
    github_label: 'View code',
    view_image: 'View image'
  },
  contact_me: {
    tell_me: "Let's chat</br>Tell me about your Project",
    send_message_me: 'Send me a message ✨',
    resume_label: 'Resume',
    form: {
      name_label: 'Name',
      name_placeholder: 'Your name',
      email_label: 'Email',
      email_placeholder: 'you@email.com',
      message_label: 'Message',
      message_placeholder: 'How can I help you?',
      submit: 'Send message',
      submitting: 'Sending...',
      success: "Message sent! I'll get back to you soon.",
      error: 'Failed to send. Please try again.'
    }
  },
  footer: {
    thanks: 'With love @vitualizz'
  },
  blog: {
    title: 'Latest Posts',
    read_more: 'Read more',
    read_article: 'Read article',
    back_to_blog: '← Back to blog',
    min_read: 'MIN READ',
    see_all: 'See all posts',
    index_eyebrow: 'Blog · vitualizz',
    index_title: "Notes from the <span class='text-accent'>trenches</span>",
    index_subtitle:
      "What I'm learning building backends, agents, and SaaS in production. No hype, no '10 reasons why...' — just code, decisions, and sometimes three cats giving their take.",
    index_stat_posts: 'Posts',
    index_stat_topics: 'Topics',
    index_stat_cats: 'Cats',
    filter_label: 'Filter',
    filter_all: 'All',
    filter_search_placeholder: 'Search posts...',
    featured_label: 'Latest',
    closer_title:
      "Want to get new posts <span class='text-accent'>before anyone else</span>?",
    closer_text:
      'No newsletter yet — but you can follow me on GitHub or LinkedIn. If something resonated, write to me. I reply to everything.',
    closer_github: 'Follow on GitHub ↗',
    closer_contact: 'Write to me',
    mascot_text: 'end of list — check back soon, the cats write too',
    empty_title: 'No posts match',
    empty_text:
      'Try another tag or clear the search. Even cats get confused sometimes.',
    follow_label: 'Stay connected',
    follow_title: 'Want to keep in touch?',
    follow_body:
      'If you enjoyed this post, the best way to follow my work is GitHub and LinkedIn — I publish there first.',
    follow_github: 'Follow on GitHub',
    follow_linkedin: 'Connect on LinkedIn',
    post_nav_prev: '← Previous',
    post_nav_next: 'Next →',
    more_posts_eyebrow: '// More notes',
    more_posts_title: 'Other things I wrote',
    share_prompt: 'Was this helpful?',
    share_cta: 'Share',
    contact_cta: 'Contact'
  },
  ai: {
    greeting: `What do you want to know? Ask me about <b class="hl">backend</b>, <b class="hl">architecture</b>, <b class="hl">AI agents</b>, <b class="hl">Postgres</b>, or production projects 🐱.`,
    hint: 'Tip: try a shortcut above ↑ or write your own question below ↓',
    input_placeholder: 'Write your question for Lee...',
    send_aria: 'Send',
    thinking: 'thinking...',
    error_fallback: 'I could not process your question. Please try again.',
    crash_fallback:
      'Oops, something failed. Message me directly through the contact form.',
    user_avatar: 'YOU',
    disclaimer:
      'AI can make mistakes or hallucinate. For anything that actually matters,',
    disclaimer_link: 'reach out directly →',
    tabs: {
      backend:
        'What has been your most complex backend project and what did you learn from it?',
      ai_builder:
        'Tell me about your experience building with LLMs and AI agents. Which stack do you use?',
      postgres:
        'If I ask you to optimize a slow Postgres query in production, where would you start?',
      culture:
        'What are you looking for in your next team? What kind of culture makes you happy?'
    },
    tab_labels: {
      backend: 'backend ↗',
      ai_builder: 'ai builder ↗',
      postgres: 'postgres ↗',
      culture: 'culture ↗'
    }
  },
  contact_modal: {
    close_aria: 'Close',
    eyebrow: "// Let's talk",
    title: 'Tell me about your project',
    subtitle:
      'I reply within 24 business hours. For urgent topics, ping me on LinkedIn too.',
    name_label: 'Your name',
    name_placeholder: 'e.g. Ana Perez',
    email_label: 'Email',
    email_placeholder: 'you@email.com',
    message_label: 'Message',
    message_placeholder: 'Tell me what you need, current stack, timeline...',
    submit: 'Send message',
    submitting: 'Sending...',
    submit_error: 'Error — try again',
    success_title: 'Message sent!',
    success_text: 'I will reply within 24 business hours.'
  },
  resume_actions: {
    preview: 'Preview',
    download: 'Download',
    menu_aria: 'Open resume actions',
    preview_modal_title: 'Resume preview',
    preview_modal_close_aria: 'Close resume preview',
    preview_modal_fallback: 'Open resume in a new tab'
  },
  seo: {
    title:
      'Tech Lead / Senior Fullstack Engineer | JavaScript, Ruby, AI Agents | Available for high-impact teams',
    description:
      'Software engineer with 7+ years shipping product in LatAm startups. Specialized in backend, architecture, and AI agents for teams that need speed without quality tradeoffs.',
    image: '/img/seo/og-image.png',
    url: 'https://vitualizz.vercel.app/en'
  }
}

export default locale
