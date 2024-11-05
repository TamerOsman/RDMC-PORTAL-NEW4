/* eslint-disable indent */
/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Dynamically change languages
import { i18n } from '@/locales/i18n'

import globalFunctions from './plugins/globalFunctions'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import vuetify from './plugins/vuetify'
import './assets/styles/global.css'
import '@/scss/style.scss'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.use(i18n as any)
app.use(globalFunctions) // Use the plugin to add global functions
app.use(PerfectScrollbarPlugin as any)
app.use(vuetify)
app.mount('#app')

// nextTick(() => {
//     setTimeout(() => {
//         // Remove loading screen and show app once it's ready
//         const loadingScreen = document.getElementById('loading-screen')
//         const appContainer = document.getElementById('app')

//         if (loadingScreen) {
//             loadingScreen.style.display = 'none' // Hide the loading screen
//         }

//         if (appContainer) {
//             appContainer.style.visibility = 'visible' // Show the Vue app
//         }
//     }, 4000)
// })
