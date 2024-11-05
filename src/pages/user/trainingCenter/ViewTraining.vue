<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { fbOnvalue, readData } from '@/utils/firebase'
const appStore = useAppStore()
const router = useRouter()
interface RouteParams {
    id: string;
}
interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    to: string;
    class: string;
    divider: boolean | null;
    icon: string | null;
}

interface Item {
    key: string;
    value: string;
}
function flattenArray(arr: any) {
    const result: any = {}

    arr.forEach((item: Item) => {
        result[item.key] = item.value
    })

    return result
}

const { t } = useI18n()

const trainingURL = ref('')
const route = useRoute() // Apply the type here
const breadcrumbsItems = ref<BreadcrumbItem[]>([])
const trainingDetails = ref<any>(null)
const showApproval = ref(false)

const init = () => {
    fbOnvalue(`/documents/training/${trainingURL.value}`, async (data: any) => {
        const result: any = flattenArray(data)
        // data.forEach((item: Item) => {
        //     result[item.key] = item.value
        // })
        breadcrumbsItems.value = [
            {
                title: 'Home',
                disabled: false,
                to: '/user/home',
                class: '',
                divider: true,
                icon: '',
            },
            {
                title: 'TrainingCenter',
                disabled: false,
                to: '/user/trainingCenter',
                class: '',
                divider: true,
                icon: '',
            },
            {
                title: result.trainingTitle,
                disabled: true,
                to: '',
                class: 'me-auto',
                divider: false,
                icon: '',
            },
        ]

        if (result.trainingStatus === 'pending') {
            const superadmin = await readData('/documents/admin/trainingcenter/superAdmin')
            const superadminResult = flattenArray(superadmin)
            if (appStore.empId === superadminResult.empCode) {
                showApproval.value = true
                console.log('superadmin', appStore.empId, superadminResult)
            }
        }
        trainingDetails.value = result
    })
}
onMounted(() => {
    const params = route.params as RouteParams
    trainingURL.value = params.id
    init()
})

watch(route, (newID: any) => {
    trainingURL.value = newID.params.id as string
    init()
})

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->

<template>
    <userPage :breadcrumbs="breadcrumbsItems"
        :slides="[{ src: 'https://www.360training.com/sites/360training/files/2022-11/360_696-3_Carousel_Active-Shooter_Desktop-Front.png', lazysrc: '/gl33lazy.png' }, { src: 'https://www.umassglobal.edu/-/media/images/17-blog-images/umass-global-blog-images/b2b-professional-development-banner.jpg', lazysrc: '/gl33lazy.png' }]">
        <template #slider>
            <span class=" text-h4  text-uppercase"> {{ t('HumanResources') }}</span>
            <span class=" text-h2 text-uppercase"> {{ t('TrainingCenter') }}</span>
        </template>
        <template #breadcrumbs>
            <v-btn v-if="appStore.isAdmin" class="mx-3" color="primary" prepend-icon="mdi-plus" text="Approve" />
            <v-menu location="bottom">
                <template #activator="{ props }">
                    <v-icon size="20" v-bind="props">mdi-dots-vertical</v-icon>
                </template>
                <v-list>
                    <v-list-item @click="router.push('/user/trainingCenter/add')">
                        <v-list-item-title>Add training</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
        <pre>
    {{ trainingDetails }}
</pre>

        <v-container>
            <v-row>
                <v-col>
                    <v-btn v-if="showApproval" color="primary" text="Approve" />

                    <v-list class="bg-transparent">

                        <!-- <v-list-item v-for="(item, i ) in trainingData" :key="i" class="my-3 py-3 bg-background2"
                            :subtitle="item.key" :title="item.value">
                            <template #prepend>
                                <v-avatar color="blue">
                                    <v-icon color="white">mdi-clipboard-text</v-icon>
                                </v-avatar>
                            </template>

                            <template #append>
                                <v-btn color="grey-lighten-1" icon="mdi-information" variant="text" />
                            </template>
                        </v-list-item> -->

                        <!-- <v-list-item class="my-3 py-3 bg-background2" subtitle="Jan 10, 2024"
                            title="Code of Business Conduct" @click="router.push('/user/trainingCenter/333333')">
                            <template #prepend>
                                <v-avatar color="amber">
                                    <v-icon color="white">mdi-gesture-tap-button</v-icon>
                                </v-avatar>
                            </template>

                            <template #append>
                                <v-btn color="grey-lighten-1" icon="mdi-information" variant="text" />
                            </template>
                        </v-list-item> -->
                    </v-list>
                </v-col>
            </v-row>
        </v-container>

    </userPage>
</template>
