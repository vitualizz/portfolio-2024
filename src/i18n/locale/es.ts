import type { LanguageLocale } from 'src/types/I18n.types'

const locale: LanguageLocale = {
  nav: {
    presentation: "Presentación",
    about_me: "Sobre mí",
    projects: "Proyectos",
    contact_me: "Contáctame",
    blog: "Blog"
  },
  presentation: {
    hi: "Hola, 🚀",
    i_am: "Soy <span class='font-bold'>Lee Palacios</span>",
    profession: "Ingeniero de Software y amante de los gatos 🐱",
    description: "<span class='text-color-1'>+7 años</span> de experiencia en programación, ¡soy tu aliado amante de la tecnología listo para sacudir tu mundo digital!"
  },
  about_me: {
    section_about_me: "Acerca de mí",
    section_skills: "Habilidades",
    biography: "Soy un <span class='text-color-2'>ingeniero de software</span>, adentrándome en un emocionante universo <span class='text-color-2'>tecnológico</span> donde cada línea de código es un trazo de creatividad. Mi corazón late al ritmo de <span class='text-color-1'>Javascript</span> y <span class='text-color-1'>Ruby</span>, pero mi curiosidad me ha llevado a explorar un arcoíris de lenguajes. En cada proyecto, busco la excelencia y <span class='text-color-2'>calidad</span>, convirtiendo el proceso de codificación en una aventura <span class='text-color-2'>emocionante</span> y <span class='text-color-2'>gratificante</span>.",
    skills_section_frameworks: "Frameworks y Bibliotecas",
    skills_section_others: "Otros",
    skills_section_languages: "Lenguajes"
  },
  projects: {
    section_projects: "Proyectos"
  },
  contact_me: {
    tell_me: "Hablemos</br>Cuéntame sobre tu Proyecto",
    send_message_me: "Envíame un mensaje ✨"
  },
  footer: {
    thanks: "Con amor @vitualizz"
  },
  blog: {
    title: 'Últimos Posts',
    read_more: 'Leer más'
  },
  seo: {
    title: "Desarrollador de Software | Experiencia en JavaScript y Ruby | Proyectos de Calidad | Contáctame",
    description: "¡Con más de 7 años de experiencia en programación, soy un ingeniero de software apasionado por la tecnología! Trabajo con JavaScript, Ruby y más. ¡Contáctame para proyectos de calidad!",
    image: "url_de_la_imagen.jpg",
    url: "https://www.ejemplo.com"
  }
}

export default locale
