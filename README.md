# OVA · Ciudadanos digitales (Nuxt 4 + Vue 3)

Versión Nuxt del OVA `OVA_Ciudadanos_digitales_v3.html`. Mismo contenido y comportamiento; solo cambia la organización del código.

## Uso (requiere Node 22.21 o superior)

    npm install
    npm run dev        # desarrollo en http://localhost:3000
    npm run generate   # sitio estático en .output/public (subir a hosting/LMS)

Si lo publicas en una subcarpeta: `NUXT_APP_BASE_URL=/mi-carpeta/ npm run generate`.

## Estructura

    nuxt.config.ts                       título, meta, fuentes, SPA (ssr: false)
    app/app.vue                          pantalla principal (template + lógica)
    app/components/MiniGame.vue          componente de los mini-juegos
    app/components/QuizGame.vue          componente del quiz
    app/plugins/ova-directives.client.js directivas v-ripple, v-par, v-jvis, v-focus, v-tilt, v-magnet
    app/data/ova.js                      contenido: casos, quiz, retos, créditos, diálogos, fotos
    app/assets/css/ova.css               estilos
