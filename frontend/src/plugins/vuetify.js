/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import colors from 'vuetify/util/colors'

import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VTable: {
      density: 'compact',
    },
    VExpansionPanels: {
      variant: 'accordion',
    },
    VList: {
      density: 'compact',
    },
    VBtn: {
      variant: 'text',
    },
    VTextarea: {
      density: 'compact',
      variant: 'outlined',
      hideDetails: 'auto',
    },
    VAutocomplete: {
      density: 'compact',
      variant: 'outlined',
      hideDetails: 'auto',
    },
    VSelect: {
      density: 'compact',
      variant: 'outlined',
      hideDetails: 'auto',
    },
    VTextField: {
      density: 'compact',
      variant: 'outlined',
      hideDetails: 'auto',
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          buttonText: colors.deepPurple.accent1,
          buttonLink: colors.blue.darken1
        }
      }
    }
  },
})
