<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { fbOnvalue } from '@/utils/firebase'
const appStore = useAppStore()
const router = useRouter()
interface RouteParams {
    id: string;
}

const route = useRoute() // Apply the type here
const { t } = useI18n()
const params = route.params as RouteParams
const trainingCenterId = ref('')

const trainingTitle = ref<string | null | undefined>('')

const trainingStatus = ref<string | null | undefined>('')
const createdBy = ref<string | null | undefined>('')
const creationDate = ref<string | null | undefined>('')
const traineesType = ref<string | null | undefined>('')
const trainingLangs = ref<string[] | null | undefined>([])
const trainingEndDate = ref<string | null | undefined>('')
const trainingStartDate = ref<string | null | undefined>('')
const trainingURL = ref<string | null | undefined>('')

interface TrainingItem {
    key: any;
    trainingTitle?: string | null;
    trainingStatus?: string;
    createdBy?: string;
    creationDate?: string;
    traineesType?: string;
    trainingLangs?: string[];
    trainingEndDate?: string;
    trainingStartDate?: string;
    trainingURL?: string;
    // Include any other properties you expect
    [key: string]: any; // Allows for additional properties
}
interface Item {
    key: string;
    value: string;
}
const trainingData = ref<Item[] | null | undefined>([])
const result = ref<TrainingItem | null>({} as TrainingItem)

onMounted(() => {
    trainingCenterId.value = params.id

    fbOnvalue(`documents/training/${trainingCenterId.value}/`, (data: Item[]) => {
        trainingData.value = data
        console.log('ya data', data)
        // if (result.value === null) {
        //     result.value = {} as TrainingItem // Ensure result.value is an object before modifying it
        // }
        data.forEach((item: Item) => {
            result.value![item.key] = item.value
        })
        trainingTitle.value = result.value?.trainingTitle
        trainingStatus.value = result.value?.trainingStatus
        createdBy.value = result.value?.createdBy
        creationDate.value = result.value?.creationDate
        traineesType.value = result.value?.traineesType
        trainingLangs.value = result.value?.trainingLangs
        trainingEndDate.value = result.value?.trainingEndDate
        trainingStartDate.value = result.value?.trainingStartDate
        trainingURL.value = result.value?.trainingURL
        console.log('ddd', result.value)
    })
})
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
        title: 'HRTrainingCenter',
        disabled: false,
        to: '/user/trainingCenter',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: trainingTitle.value || '',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

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
        {{ trainingData }}
        <v-container>
            <v-row>
                <v-col>

                    <v-list class="bg-transparent">

                        <v-list-item v-for="(item, i ) in trainingData" :key="i" class="my-3 py-3 bg-background2"
                            :subtitle="item.key" :title="item.value">
                            <template #prepend>
                                <v-avatar color="blue">
                                    <v-icon color="white">mdi-clipboard-text</v-icon>
                                </v-avatar>
                            </template>

                            <template #append>
                                <v-btn color="grey-lighten-1" icon="mdi-information" variant="text" />
                            </template>
                        </v-list-item>

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
