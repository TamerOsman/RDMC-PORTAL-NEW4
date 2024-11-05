<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { readData } from '@/utils/firebase'
import { useRouter } from 'vue-router'
const router = useRouter()

const { t } = useI18n()
const data = ref<any>(null)

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
        title: 'Policies',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]
// Define the type for breadcrumb items
interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    to: string;
    icon: string;
}

const items = ref<BreadcrumbItem[]>([])

onMounted(async () => {
    items.value = [
        {
            title: 'Home',
            disabled: false,
            to: '/user/home',
            icon: 'mdi-home',
        },
        {
            title: 'HRDocuments',
            disabled: true,
            to: '',
            icon: '',
        },
    ]
    data.value = await readData('/documents/hr/documents/')
})

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->

<template>
    <userPage :breadcrumbs="breadcrumbsItems"
        :slides="[{ src: 'https://be.stantonchase.com/wp-content/uploads/2024/01/HR-cover.jpg', lazysrc: '/gl33lazy.png' }]">
        <template #slider>
            <div class="h-100 w-100 text-grey-lighten-4 d-flex align-center justify-start">
                <div class="d-flex flex-column">
                    <span class=" text-h4  text-uppercase"> {{ t('Mobility') }} {{ t('Cairo') }}</span>
                    <span class=" text-h2 text-uppercase"> {{ t('Policies') }}</span>
                </div>

            </div>

        </template>
        <v-container>
            <v-row>
                <v-col v-for="(file, i) in data" :key="i" cols="12" lg="4" md="6" sm="12">
                    <v-card class="text-blue-grey bg-background" :prepend-icon="file.icon || 'mdi-file-document'"
                        target="_blank" text="Start with our dedicated feature guides" :title="file.value.en.name"
                        @click="router.push(`/user/policies/${i + 4625}`)">
                        <template #prepend>
                            <v-avatar class="me-3 border-thin" color="blue-grey">
                                <v-icon :icon="file.icon || 'mdi-file-document'" />
                            </v-avatar>
                        </template>
                    </v-card>

                    <!-- <v-card class="bg-background mx-3 my-6"
                        :class="!$vuetify.display.mobile ? 'w-auto' : 'flex-1-1-100'"
                        :max-width="!$vuetify.display.mobile ? 444 : undefined" subtitle="HR Documents"
                        @click="openFile(file.url)">
                        <template #prepend>
                            <v-avatar class="me-3 border-thin" color="blue-grey">
                                <v-icon :icon="file.icon || 'mdi-file-document'" />
                            </v-avatar>
                        </template>
                        <template #title>
                            <span class="text-blue-grey">
                                {{ file.name }}
                            </span>
                        </template>
                        <template #subtitle>
                            <span class="text-blue-grey">
                                {{ t('HRDocuments') }}
                            </span>
                        </template>
                    </v-card> -->
                </v-col>
            </v-row>
        </v-container>

    </userPage>
</template>
