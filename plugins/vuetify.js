import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'
import * as components from 'vuetify/components'
import { md3 } from 'vuetify/blueprints'
// import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        