<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-indent -->
<template>
    <UserPage :breadcrumbs="breadcrumbsItems"
        :slides="[{ src: '/lrt.jpg', lazysrc: '/lrt.jpg' }, { src: '/gl333.png', lazysrc: '/gl33lazy.png' }]">
        <template #slider>
            <span class=" text-h4  text-uppercase"> {{ t('RDMCPORTAL') }}</span>
            <span class=" text-h2 text-uppercase"> {{ t('Newsletter') }}</span>
        </template>
        <template #breadcrumbs>
            <v-menu location="bottom">
                <template #activator="{ props }">
                    <v-icon size="20" v-bind="props">mdi-dots-vertical</v-icon>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>1235</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
        <newsletter class="overflow-auto" max-height="70vh" />
    </UserPage>
</template>
<!-- eslint-disable vue/script-indent -->

<script setup lang="ts">
import UserPage from '@/components/user/userPage.vue'
import newsletter from '@/pages/user/components/newsletter.vue'
// import { i18n } from '@/locales/i18n'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const breadcrumbsItems = [
    {
        title: 'Home',
        disabled: false,
        to: '/user/home',
        class: '',
        divider: true,
        icon: 'mdi-home',
    },
    {
        title: 'Newsletter',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: 'mdi-information-variant-circle-outline',
    },
]

</script>
