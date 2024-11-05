/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'

// eslint-disable-next-line space-before-function-paren
export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(router)
  app.use(pinia)
}
