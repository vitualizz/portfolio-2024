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
    about_title: "About <span class='y'>me</span>",
    about_subtitle: 'The human behind the code — what drives me, what I do, and what is in my toolbox.',
    ai_eyebrow: '// 02 · Lab',
    ai_title: "Ask Lee <span class='y'>↳ via AI</span>",
    ai_subtitle: 'An AI trained with my CV, stacks and projects. Ask technical questions, about my experience, or whatever you want.',
    projects_eyebrow: '// 03 · Projects',
    projects_title: "Selected <span class='y'>work</span>",
    projects_subtitle: 'Shipped work in production. Click to view demo or code.',
    xp_eyebrow: '// 04 · Experience',
    xp_title: "My <span class='y'>journey</span>",
    xp_subtitle: 'Four professional stops, one constant: shipped product.',
    blog_eyebrow: '// 05 · Notes',
    blog_title: "What I <span class='y'>write</span>",
    blog_subtitle: 'Technical notes about what I am learning.',
    contact_title: "Let's talk<br/>Tell me about your <em class='not-italic text-accent'>project</em> ✨",
    contact_subtitle: 'If you have an idea that needs expert hands — clean code, scalable systems and on-time delivery — I would love to hear it. I reply within 24 business hours.',
    contact_download_cv: 'Download CV',
    paused_label: 'paused',
    footer_location_line: 'Lima · UTC −5 · ES / EN'
  },
  presentation: {
    hi: 'Hi, 🚀',
    i_am: "I'm <span class='font-bold'>Lee Palacios</span>",
    profession: 'Software Engineer and cat lover 🐱',
    description: "<span class='text-color-1'>+7 years</span> of experience building product in Latin American startups. Today I'm the <strong>founder of Inmology</strong>, designing AI agents that automate real estate operations. Ready to rock your digital world!",
    tagline: 'I build interfaces that matter and systems that scale.',
    cta_primary: 'See my work',
    cta_secondary: 'Get in touch'
  },
  about_me: {
    section_about_me: 'About me',
    section_skills: 'Skills',
    biography: "I am a <span class='text-color-2'>software engineer</span>, diving into an exciting <span class='text-color-2'>technological</span> universe where every line of code is a stroke of creativity. My heart beats to the rhythm of <span class='text-color-1'>Javascript</span> and <span class='text-color-1'>Ruby</span>, but my curiosity has led me to explore a rainbow of languages. In each project, I seek excellence and <span class='text-color-2'>quality</span>, turning the coding process into an <span class='text-color-2'>exciting</span> and <span class='text-color-2'>rewarding adventure</span>",
    skills_section_frameworks: 'Frameworks & Libraries',
    skills_section_others: 'Others',
    skills_section_languages: 'Languages',
    stat_years: 'Yrs of exp.',
    stat_projects: 'Projects',
    stat_stack: 'Full Stack'
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
    read_article: 'Read article'
  },
  ai: {
    greeting: 'Hi! I am an AI version of Lee. Ask me about <b>backend</b>, <b>architecture</b>, <b>AI agents</b>, <b>Postgres</b>, my projects, or why I have 3 cats 🐱. Anything you want.',
    hint: 'Tip: try a shortcut above ↑ or write your own question below ↓',
    input_placeholder: 'Write your question for Lee...',
    send_aria: 'Send',
    thinking: 'thinking...',
    error_fallback: 'I could not process your question. Please try again.',
    crash_fallback: 'Oops, something failed. Message me directly through the contact form.',
    user_avatar: 'YOU',
    tabs: {
      backend: 'What has been your most complex backend project and what did you learn from it?',
      ai_builder: 'Tell me about your experience building with LLMs and AI agents. Which stack do you use?',
      postgres: 'If I ask you to optimize a slow Postgres query in production, where would you start?',
      culture: 'What are you looking for in your next team? What kind of culture makes you happy?'
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
    eyebrow: '// Let’s talk',
    title: 'Tell me about your project',
    subtitle: 'I reply within 24 business hours. For urgent topics, ping me on LinkedIn too.',
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
  seo: {
    title: "Software Developer | Experience in JavaScript and Ruby | Quality Projects | Contact Me",
    description: "With over 7 years of programming experience, I'm a technology enthusiast software engineer! Working with JavaScript, Ruby, and more. Contact me for quality projects!",
    image: "/img/seo/og-image.png",
    url: "https://vitualizz.vercel.app/en"
  }
}

export default locale
