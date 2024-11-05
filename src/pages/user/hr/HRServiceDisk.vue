<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const breadcrumbsItems = [
    {
        title: 'Home',
        disabled: false,
        to: '/user/home',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: 'HRServiceDisk',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]
</script>
<!-- eslint-disable vue/html-indent -->
<template>
    <userPage :breadcrumbs="breadcrumbsItems">
        <v-container class="fill-height d-flex flex-column align-center justify-center">
            <v-row>
                <v-col>
                    {{ t('HRServiceDisk') }}
                </v-col>
            </v-row>
        </v-container>

    </userPage>
</template>
