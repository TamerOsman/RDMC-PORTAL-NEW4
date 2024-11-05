/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VTreeview } from 'vuetify/labs/VTreeview'
import { VStepperVertical } from 'vuetify/labs/VStepperVertical'

// Composables
import {
  createVuetify,
} from 'vuetify'
import {
  themes,
} from '@/themes'

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({

  components: {
    ...components,
    VDateInput,
    VTimePicker,
    VTreeview,
    VStepperVertical,
  },
  directives,
  locale: {
    rtl: {
      ar: true, // Enable RTL for Arabic
      // Add other RTL languages as needed, e.g., 'he' for Hebrew
    },
  },
  theme: {
    defaultTheme: isDarkMode ? 'dark' : 'light',
    themes,
  },
})
