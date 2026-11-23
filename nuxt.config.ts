// OVA "Ciudadanos digitales": app 100 % cliente (Web Audio, localStorage, hash de sección),
// por eso se genera como SPA estática (ssr: false) y se puede subir a cualquier hosting o LMS.
export default defineNuxtConfig({
  compatibilityDate: '2026-11-23',
  ssr: false,
  devtools: { enabled: false },
  css: ['~/assets/css/ova.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Ciudadanos digitales: decido con cabeza y corazón',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'OVA de ciudadanía digital para grado 6: huella digital, cyberbullying y netiqueta.' },
        { name: 'theme-color', content: '#0a1030' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Nunito:wght@400;700&display=swap' }
      ]
    }
  }
})
