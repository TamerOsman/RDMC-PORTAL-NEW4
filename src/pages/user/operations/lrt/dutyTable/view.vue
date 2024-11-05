<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { ref, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
import { useDate } from 'vuetify'
import logo from '@/components/CustomLogo.vue'
const date = useDate()
const router = useRouter()

// const appStore = useAppStore()

// const { t } = useI18n()

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
        title: 'LRTDirvers',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

const selectedDate = ref<any>(null)
const selectedDateModified = ref<any>('')
const loading = ref(false)
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
watch(selectedDate, async (newValue: String) => {
    if (newValue) {
        // selectedDateModified.value = date.format(newValue, 'fullDate')
        loading.value = true
        await wait(2000)
        selectedDateModified.value = `${date.getDate(newValue)}/${date.getMonth(newValue) + 1}/${date.getYear(newValue)}`
        router.push(`/user/operations/lrt_dutyTable/selectedTable/${selectedDateModified.value}`)
    }
})
</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->

<template>
    <userPage :breadcrumbs="breadcrumbsItems">
        <template #breadcrumbs>
            <v-btn color="primary" prepend-icon="mdi-cog"
                @click="router.push('/user/operations/lrt_dutyTable/admin')">Admin</v-btn>
        </template>

        <v-layout class="fill-height  d-flex flex-column justify-center align-center overflow-auto">
            <v-date-picker v-model="selectedDate" />
            <v-dialog v-model="loading" max-width="500" persistent>

                <template #default>
                    <v-list class="py-2" color="primary" elevation="12" rounded="lg">
                        <v-list-item prepend-icon="custom-logo" title="Refreshing Application...">
                            <template #prepend>
                                <div class="pe-4">
                                    <v-icon color="onBackground" :icon="logo" size="x-large" />
                                </div>
                            </template>

                            <template #append>
                                <v-progress-circular color="onSuccess" indeterminate="disable-shrink" size="16"
                                    width="2" />
                            </template>
                        </v-list-item>
                    </v-list>
                </template>
            </v-dialog>
        </v-layout>
        <!--  dddd -->
    </userPage>
</template>
