/* eslint-disable indent */
// src/plugins/globalFunctions.ts
import { App } from 'vue'
import { i18n } from '../locales/i18n' // Import the i18n instance

export default {
    // eslint-disable-next-line space-before-function-paren
    install(app: App) {
        // Define a global function for translations
        app.config.globalProperties.$t = (key: string) => {
            return i18n.global.t(key) // Access the global `t` function
        }
    },
}
