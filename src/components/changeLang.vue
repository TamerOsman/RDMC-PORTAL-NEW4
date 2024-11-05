<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">

import { setLanguage } from '@/locales/i18n'
import { ar, en, fr } from '@/assets/flags'
import { useAppStore } from '@/stores/app'
import { removeSession } from '@/utils/cookies'
import { fbLogout } from '@/utils/firebase'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { EyeIcon, Logout2Icon, MoonIcon } from 'vue-tabler-icons'
import { useThemeSwitcher } from '@/themes/index'
const props = defineProps({
    auth: Boolean,
})

const { changeTheme } = useThemeSwitcher()

const router = useRouter()

const { t } = useI18n()

const appStore = useAppStore()
const changeAdminView = () => {
    appStore.isAdmin = !appStore.isAdmin
}

const logout = async () => {
    const loggedOut = await fbLogout()
    if (loggedOut) {
        await removeSession('temptoken')
        appStore.customToken = ''
        appStore.token = ''
        appStore.isAuthorized = false
        window.location.href = '/auth/token'
        // router.push('/auth/token')
    }
}

</script>
<!-- eslint-disable vue/first-attribute-linebreak -->

<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable-next-line vue/html-closing-bracket-spacing -->
<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
    <v-menu activator="parent" class="mx-auto " max-width="300">
        <v-list class="bg-background" density="compact">
            <v-list-item @click="setLanguage('ar')">
                <template #prepend>
                    <v-icon>
                        <v-img :src="ar" width="20" />
                    </v-icon>

                </template>
                <v-list-item-title>AR</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setLanguage('en')"> <template #prepend>
                    <v-icon> <v-img class="mx-2" :src="en" width="20" /></v-icon>
                </template><v-list-item-title>EN</v-list-item-title></v-list-item>
            <v-list-item @click="setLanguage('fr')"><template #prepend>
                    <v-icon> <v-img class="mx-2" :src="fr" width="20" /></v-icon>
                </template> <v-list-item-title>FR</v-list-item-title>
            </v-list-item>
            <v-divider v-if="!props.auth" class="my-3" />
            <v-list-item @click="changeTheme">
                <template #prepend>
                    <MoonIcon width="20" class="mx-2" />
                </template>
                <v-list-item-title>{{ t('theme') }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!props.auth" @click="changeAdminView">
                <template #prepend>
                    <EyeIcon width="20" class="mx-2" />
                </template>
                <v-list-item-title>{{ appStore.isAdmin ? t('viewAsUser') : t('viewAsAdmin') }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!props.auth && appStore.empId === 'RDMC0187'" @click="router.push('/user/system/admin')"
                prepend-icon="mdi-cog" title="System settings" />
            <v-list-item v-if="!props.auth" @click="logout">
                <template #prepend>
                    <Logout2Icon width="20" class="mx-2" />
                </template>
                <v-list-item-title>{{ t('Logout') }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
