/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VAutocomplete: {
      density: 'compact',
      variant: 'outlined'
    },
    VSelect: {
      density: 'compact',
      variant: 'outlined'
    },
    VTextField: {
      density: 'compact',
      variant: 'outlined'
    },
  },
  theme: {
    defaultTheme: 'dark'
  },
})
