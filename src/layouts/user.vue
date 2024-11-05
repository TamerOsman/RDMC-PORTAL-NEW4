<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { i18n } from '@/locales/i18n'
import { SettingsIcon } from 'vue-tabler-icons'
import SideNav from '@/pages/user/components/sideNav.vue'
import { useI18n } from 'vue-i18n'
import AlertIcon from '@/components/AlertIcon.vue'
import ChangeLang from '@/components/changeLang.vue'
import { useRouter } from 'vue-router'
// import { removeSession } from '@/utils/cookies'

// import { fbLogout } from '@/utils/firebase'
// import { removeCookie } from '@/utils/cookies'
// change theme from dark to light or the opposite

import { useDisplay } from 'vuetify'
// import { checkLogin } from '@/utils/firebase'
// import axios from 'axios'
// import { getCookie } from '@/utils/cookies'
import VerticalSidebar from '@/components/vertical-sidebar/VerticalSidebar.vue'
import logo from '@/components/CustomLogo.vue'
import { useAppStore } from '@/stores/app'
import { get } from '@/utils/firebase'
const popup = ref(false)
const appStore = useAppStore()
const router = useRouter()
const { t } = useI18n()
const { mdAndDown } = useDisplay()
const drawer = ref(false)
const anotherDevice = ref(false)
const goHome = () => {
    router.push('/user/home')
}
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const isOffLine = ref(!navigator.onLine)
const test = ref(true)
// Function to update the network status
const updateOnlineStatus = () => {
    isOffLine.value = !navigator.onLine
}

// const user = ref(null)
onMounted(async () => {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    appStore.userContact = await get(`/documents/users/${appStore.empId}`)
    await wait(3000)
    popup.value = true
})

onBeforeUnmount(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
})

const safeMode = () => {
    appStore.safeMode = true
    test.value = false
    router.push('/user/safeMode')
    isOffLine.value = false
}
// eslint-disable-next-line space-before-function-paren
// async function checkingAppStore() {
//     if (!appStore.empId) {
//         appStore.empId = getCookie('empId') || ''
//     }
//     if (!appStore.token) {
//         appStore.token = getCookie('token') || ''
//     }

//     if (!appStore.fbUser) {
//         const { data: customTokenData } = await axios.post('https://online-payment-api.vercel.app/authenticate/token', { empId: appStore.empId, token: appStore.token })
//         // appStore.customToken = customTokenData
//         appStore.fbUser = await checkLogin(customTokenData)
//     }
// }
// const loadingUser = ref(false)
// onMounted(async () => {
// await checkingAppStore()
// console.log('the user', appStore.fbUser)
// if (typeof appStore.fbUser === 'object') {
//     loadingUser.value = false
// }

// if (appStore.fbUser === null) {
//     const loggedOut = await fbLogout()
//     if (loggedOut) {
//         await removeCookie('temptoken')
//         appStore.customToken = ''
//         appStore.token = ''
//         appStore.isAuthorized = false
//         window.location.href = '/auth/token'
//         // router.push('/auth/token')
//     }
// }
// console.log({
//     empId: appStore.empId,
//     token: appStore.token,
//     customToken: appStore.customToken,
//     fbUser: appStore.fbUser,
// })
// })

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <!-- <v-dialog v-model="loadingUser" max-width="320" persistent>

        <v-list class="py-2 bg-background" elevation="12" rounded="lg">
            <v-list-item>

                <template #title>
                    <p> {{ t('refreshingdata') }}</p>
                </template>

<template #append>
                    <v-progress-circular indeterminate="disable-shrink" size="16" width="2" />
                </template>
</v-list-item>
</v-list>

</v-dialog> -->

    <v-app-bar border="thin" class="fill-width mx-0 " color="navBackground" elevation="0" prominent>

        <v-app-bar-nav-icon v-if="mdAndDown" variant="text" @click.stop="drawer = !drawer" />
        <v-toolbar-title>
            <div class="d-flex flex-row align-center cursor-pointer" @click="goHome">
                <v-icon color="onBackground" :icon="logo" size="50" />
                <span v-if="!$vuetify.display.mobile" class="ms-2 text-onBackground text-uppercase font-weight-bold">
                    {{ t('Mobility') }} <span class="font-weight-light">{{ t('Cairo') }}</span>
                </span>
            </div>

        </v-toolbar-title>

        <v-spacer />

        <!-- <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text" />
        </template> -->

        <h6 class="text-h6 text-secondary text-uppercase">{{ appStore.userContact?.firstName }} {{
            appStore.userContact?.lastName }}
        </h6>
        <AlertIcon />

        <v-btn variant="text">
            <SettingsIcon />
            <ChangeLang />
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if="mdAndDown" v-model="drawer" color="navBackground"
        :location="i18n.global.locale == 'ar' ? 'right' : 'left'">
        <SideNav />
    </v-navigation-drawer>
    <VerticalSidebar v-else />

    <!-- <v-navigation-drawer v-else color="navBackground" :location="i18n.global.locale == 'ar' ? 'right' : 'left'"
        permanent>
        <SideNav />
    </v-navigation-drawer> -->

    <v-main class="h-screen overflow-auto">
        <!-- {{ appStore.safeMode }} -->
        <v-dialog v-model="isOffLine" persistent width="auto">
            <v-card>
                <v-empty-state icon="mdi-wifi-off"
                    text="There might be a problem with your connection or our servers. Please check your internet connection or try again later. We appreciate your patience."
                    title="Check your Internet connection">
                    <v-btn color="primary" @click="safeMode">safe mode</v-btn>
                </v-empty-state>
            </v-card>
        </v-dialog>
        <!-- <p v-if="isOffLine">You are online!</p>
        <p v-else>You are offline. Please check your internet connection.</p> -->
        <v-container class="fill-height" fluid>
            <v-row class="fill-height">
                <v-col>
                    <!-- {{ anotherDevice }} -->
                    <router-view />
                </v-col>
            </v-row>
        </v-container>
    </v-main>

    <v-dialog v-model="anotherDevice" persistent width="auto">
        <v-card max-width="400" prepend-icon="mdi-update"
            text="Your application will relaunch automatically after the update is complete."
            title="Application opened on another device">
            <template #actions>
                <v-btn text="Keep this" @click="anotherDevice = false" />
                <v-btn class="ms-auto" text="Dismiss" @click="anotherDevice = false" />
            </template>
        </v-card>
    </v-dialog>
</template>
