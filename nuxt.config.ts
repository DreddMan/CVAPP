// https://nuxt.com/docs/api/configuration/nuxt-config
const appName = 'ChatGPT UI'

export default defineNuxtConfig({
    dev: false,
    ssr: false,
    app: {
        head: {
            title: appName,
        },
    },
    runtimeConfig: {
        public: {
            appName: appName,
            typewriter: false,
            typewriterDelay: 50,
        }
    },
    build: {
        transpile: ['vuetify']
    },
    css: [
        'vuetify/styles',
        'material-design-icons-iconfont/dist/material-design-icons.css',