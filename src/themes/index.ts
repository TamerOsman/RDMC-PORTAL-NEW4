/* eslint-disable indent */
/* eslint-disable quote-props */
import { useTheme } from 'vuetify'
import { useCycleList } from '@vueuse/core'
import light from './light'
import dark from './dark'

export const themes = {
    light,
    dark,
}

// A composable function to handle theme switching
export const useThemeSwitcher = () => {
    // Get Vuetify theme reference inside setup
    const { global: globalTheme } = useTheme()

    // Initialize the current theme name
    const initialValue = globalTheme.name.value

    // Use the cycle list to handle theme cycling
    const { state: currentThemeName, next } = useCycleList(
        Object.keys(themes), // Use the theme names (light, dark)
        { initialValue }
    )

    // Function to change the theme
    const changeTheme = () => {
        next() // Cycle to the next theme
        globalTheme.name.value = currentThemeName.value // Apply the new theme
    }

    // Return the state and the change function
    return {
        currentThemeName,
        changeTheme,
    }
}
