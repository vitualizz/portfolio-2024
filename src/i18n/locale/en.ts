import type { LanguageLocale } from 'src/types/I18n.types'

const locale: LanguageLocale = {
  nav: {
    presentation: 'Presentation',
    about_me: 'About me',
    projects: 'Projects',
    contact_me: 'Contact me',
    blog: 'Blog',
    work_experience: 'Experience'
  },
  presentation: {
    hi: 'Hi, 🚀',
    i_am: "I'm <span class='font-bold'>Lee Palacios</span>",
    profession: 'Software Engineer and cat lover 🐱',
    description: "<span class='text-color-1'>+7 years</span> of coding experience, I'm your tech-loving ally ready to rock your digital world!",
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
    skills_section_languages: 'Languages'
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
    read_more: 'Read more'
  },
  seo: {
    title: "Software Developer | Experience in JavaScript and Ruby | Quality Projects | Contact Me",
    description: "With over 7 years of programming experience, I'm a technology enthusiast software engineer! Working with JavaScript, Ruby, and more. Contact me for quality projects!",
    image: "/img/seo/og-image.png",
    url: "https://vitualizz.vercel.app/en"
  }
}

export default locale
