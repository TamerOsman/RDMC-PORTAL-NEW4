<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { removeCookie } from '@/utils/cookies'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { fbLogout } from '@/utils/firebase'
import items from '@/components/vertical-sidebar/sidebarItem'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface menu {
    header?: string;
    title?: string;
    icon?: object;
    to?: string;
    divider?: boolean;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}
const appStore = useAppStore()
const router = useRouter()

const logout = async () => {
    fbLogout()
    await removeCookie('temptoken')
    appStore.customToken = ''
    appStore.token = ''
    appStore.isAuthorized = false
    router.push('/auth/token')
}

const navigate = (item: menu) => {
    if (item.type === 'external' && item.to) {
        window.open(item.to, '_blank')
    } else if (item.to) {
        router.push(item.to)
    }
}
</script>
<!-- eslint-disable vue/html-indent -->
<template>
    <perfect-scrollbar class="scrollnavbar">
        <v-list>
            <template v-for="item in items" :key="item.title || item.header">
                <v-list-subheader v-if="item.header">{{ item.header }}</v-list-subheader>
                <v-divider v-else-if="item.divider" />
                <v-list-group v-else-if="item.children" prepend-icon="">

                    <!-- eslint-disable-next-line vue/v-slot-style -->
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">
                            <template #prepend>
                                <component :is="item.icon" />
                            </template>
                            <v-list-item-title>{{ t(item.title || '') }}</v-list-item-title>
                        </v-list-item>
                    </template>

                    <v-list-item v-for="child in item.children" :key="child.title" @click="navigate(child)">
                        <template #prepend>
                            <component :is="child.icon" />
                        </template>
                        <v-list-item-title>{{ t(child.title || '') }}</v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-item v-else @click="navigate(item)">
                    <template #prepend>
                        <component :is="item.icon" />
                    </template>
                    <v-list-item-title>{{ t(item.title || '') }}</v-list-item-title>
                </v-list-item>
            </template>
        </v-list>
    </perfect-scrollbar>

    <v-card class="position-absolute bottom-0 bg-background px-2">
        <v-divider color="background" />
        <v-btn block class="my-3" color="primary" @click="logout">
            <template #prepend>
                <LogoutIcon />
            </template>
            Log out
        </v-btn>
    </v-card>
</template>
