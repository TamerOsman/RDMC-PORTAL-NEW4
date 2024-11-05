<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { i18n } from '@/locales/i18n'
import { useI18n } from 'vue-i18n'

// import { readData } from '@/utils/firebase'
// import axios from 'axios'
import { useAppStore } from '@/stores/app'
import qrcodeVue from '@/pages/user/components/qr.vue'
import logo from '@/components/CustomLogo.vue'

// interface AppStore {
//     firstName: string,
//     lastName: string,
//     position: string,
//     corporatePhoneNumber: string,
//     email: string,
//     firstNameAr: string,
//     lastNameAr: string,
// }
const appStore = useAppStore()
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
        title: 'EBusinessCards',
        disabled: true,
        to: '',
        class: '',
        divider: false,
        icon: '',
    },
]

</script>
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->

<template>
    <!-- <v-card class="mb-5" color="white">
        <v-breadcrumbs :items="items">
            <template #title="{ item }">
                {{ t(item.title).toUpperCase() }}
            </template>
<template #divider>
                <v-icon icon="mdi-chevron-right" />
            </template>
</v-breadcrumbs>
</v-card> -->
    <userPage :breadcrumbs="breadcrumbsItems">

        <!-- <v-container>
            <v-row>
                <v-col v-for="(item, i) in fourValues" :key="i"
                    class="d-flex flex-column justify-center align-center  text-h5 text-uppercase"
                    :class="'text-' + item.color" cols="12" md="3" sm="12">
                    <v-img class="border-xl rounded-circle mb-3 w-25" :color="item.color">
                        <Icons :icon="item.icon" />
                    </v-img>
                    <h1 class="h3">{{ item.title }}</h1>
                </v-col>
            </v-row>
        </v-container> -->

        <v-container v-if="$vuetify.display.mobile" class=" fill-height">
            <v-row>
                <v-col class="d-flex flex-column justify-center align-center">
                    <v-card class="w-auto mx-auto px-5 py-5 bg-transparent text-onBackground border-thin "
                        elevation="0">
                        <div class="d-flex justify-center align-center">
                            <div class="d-flex flex-row align-center cursor-pointer">
                                <v-icon color="onBackground" :icon="logo" size="50" />
                                <span class="ms-2 text-uppercase font-weight-bold">
                                    {{ t('Mobility') }} <span class="font-weight-light">{{ t('Cairo') }}</span>
                                </span>
                            </div>
                        </div>
                        <qrcodeVue :size="300" />

                        <h6 class="text-h2 font-weight-light mt-8">{{ appStore.userContact?.firstName }}
                            <span class="font-weight-black text-uppercase text-teal"
                                v-html="appStore.userContact?.lastName" />
                        </h6>
                        <p class="text-h5 font-weight-light">
                            {{ appStore.userContact?.position }}
                        </p>

                        <p class="text-h5 font-weight-light mt-8">
                            +{{ appStore.userContact?.corporatePhoneNumber }}
                        </p>
                        <p class="text-h5 font-weight-light">
                            {{ appStore.userContact?.email }}
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else class=" fill-height">
            <v-row>
                <v-col class="d-flex flex-column justify-center align-center">
                    <v-card class="w-auto mx-auto px-5 py-5 bg-background2 text-onBackground rounded-lg " elevation="8"
                        max-width="800" min-width="444">
                        <v-container>
                            <v-row>
                                <v-col class="pe-12 ">
                                    <div class="d-flex  align-center">
                                        <div class="d-flex flex-column align-start cursor-pointer">
                                            <v-icon color="onBackground" :icon="logo" size="40" />
                                            <span class="text-uppercase font-weight-bold text-rdmc5 text-h5">
                                                {{ t('Mobility') }} <span class="font-weight-light">{{ t('Cairo')
                                                    }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- <v-divider class="opacity-10" /> -->
                                    <h6 class="text-h2 font-weight-light text-uppercase mt-8">{{
                                        i18n.global.locale === 'ar' ? appStore.userContact?.firstName :
                                            appStore.userContact?.firstName
                                    }}
                                        <span class="font-weight-black"
                                            v-html="i18n.global.locale === 'ar' ? appStore.userContact?.lastName : appStore.userContact?.lastName" />
                                    </h6>
                                    <p class="text-h4 font-weight-light text-onBackground">
                                        {{ appStore.userContact?.position }}
                                    </p>
                                    <p class="text-h6 font-weight-light mt-8">
                                        +{{ appStore.userContact?.corporatePhoneNumber }}
                                    </p>
                                    <p class="text-h6 font-weight-light">
                                        {{ appStore.userContact?.email }}
                                    </p>
                                </v-col>
                                <v-col class="d-flex ps-12">
                                    <qrcodeVue class="ms-auto " :size="250" />
                                </v-col>
                            </v-row>
                        </v-container>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </userPage>
</template>
