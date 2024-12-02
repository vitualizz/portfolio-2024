import type { LanguageLocale } from 'src/types/I18n.types'

const locale: LanguageLocale = {
  nav: {
    presentation: 'Presentiation',
    about_me: 'About me',
    projects: 'Projects',
    contact_me: 'Contact me',
    blog: 'Blog'
  },
  presentation: {
    hi: 'Hi, 🚀',
    i_am: "I'm <span class='font-bold'>Lee Palacios</span>",
    profession: 'Software Engineer and cat lover 🐱',
    description: "<span class='text-color-1'>+7 years</span> of coding experience, I'm your tech-loving ally ready to rock your digital world!"
  },
  about_me: {
    section_about_me: 'About me',
    section_skills: 'Skills',
    biography: "I am a <span class='text-color-2'>software engineer</span>, diving into an exciting <span class='text-color-2'>technological</span> universe where every line of code is a stroke of creativity. My heart beats to the rhythm of <span class='text-color-1'>Javascript</span> and <span class='text-color-1'>Ruby</span>, but my curiosity has led me to explore a rainbow of languages. In each project, I seek excellence and <span class='text-color-2'>quality</span>, turning the coding process into an <span class='text-color-2'>exciting</span> and <span class='text-color-2'>rewarding adventure</span>",
    skills_section_frameworks: 'Frameworks & Libraries',
    skills_section_others: 'Others',
    skills_section_languages: 'Languages'
  },
  projects: {
    section_projects: 'Projects'
  },
  contact_me: {
    tell_me: "Let's chat</br>Tell me about your Project",
    send_message_me: 'Send me a message ✨'
  },
  footer: {
    thanks: 'With love @vitualizz'
  },
  seo: {
    title: "Software Developer | Experience in JavaScript and Ruby | Quality Projects | Contact Me",
    description: "With over 7 years of programming experience, I'm a technology enthusiast software engineer! Working with JavaScript, Ruby, and more. Contact me for quality projects!",
    image: "url_of_the_image.jpg",
    url: "https://www.example.com"
  }
}

export default locale
