<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDate } from 'vuetify'
const date = useDate()
const router = useRouter()
const { t } = useI18n()
const trainingPeriod = ref([])
const trainingStartDate = ref('')
const trainingEndDate = ref('')
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
        title: 'TrainingCenter',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

const allowedDatesList = [
    new Date('2024-10-15'),
    new Date('2024-10-20'),
    new Date('2024-10-30'),
]

// const settingPeriod = () => {
//     trainingStartDate.value = trainingPeriod.value[0] || ''
//     trainingEndDate.value = trainingPeriod.value[trainingPeriod.value.length - 1] || ''
// }

watch(trainingPeriod, newvalue => {
    // alert(newvalue)
    trainingStartDate.value = date.format(newvalue[0], 'fullDate')
    trainingEndDate.value = date.format(newvalue[newvalue.length - 1], 'fullDate')
})

const years = [
    {
        color: 'cyan',
        year: '1960',
    },
    {
        color: 'green',
        year: '1970',
    },
    {
        color: 'pink',
        year: '1980',
    },
    {
        color: 'amber',
        year: '1990',
    },
    {
        color: 'orange',
        year: '2000',
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
            <v-btn color="primary" prepend-icon="mdi-plus" @click="router.push('/user/trainingCenter/add')">New
                Training</v-btn>
        </template>
        <!-- <template #breadcrumbs>
            <v-btn v-if="appStore.isAdmin" class="mx-3" color="primary" prepend-icon="mdi-plus" text="New training"
                @click="isActiveNewTraining = true" />

            <v-dialog v-model="isActiveNewTraining" max-width="440">
                <v-card class="bg-background2">
                    <v-card-title>
                        <v-container class="mb-5">
                            <v-row><v-icon class="opacity-50" color="onBackground" :icon="CustomLogo" size="30" />
                                <span class="me-auto ms-2 text-uppercase font-weight-bold opacity-50">New
                                    Training</span>
                                <v-icon icon="mdi-close" size="sm" @click="isActiveNewTraining = false" /><v-divider
                                    class="opacity-50" /></v-row>

                        </v-container>
                    </v-card-title>
                    <v-card-text class="py-0">
                        <v-text-field v-model="trainingTitle" density="compact" label="Training title"
                            variant="outlined" />
                        <v-label text="Training languages" />
                        <v-combobox v-model="trainingLangs" chips density="compact"
                            :items="['English', 'Arabic', 'French']" multiple variant="outlined" />
                        <v-label text="Trainees type" />
                        <v-select v-model="traineesType" density="compact" :items="['Staff', 'Outsourcing', 'Both']"
                            variant="outlined" />
                        <v-date-input v-model="trainingPeriod" append-inner-icon="mdi-calendar" density="compact"
                            label="Training Period" max-width="368" multiple="range" prepend-icon=""
                            variant="outlined" />
                    </v-card-text>
                    <template #actions>
                        <div class="px-3 w-100">
                            <v-btn block class="mb-5" color="primary"
                                :disabled="trainingTitle === '' || trainingLangs.length === 0 || traineesType === '' || trainingStartDate === '' || trainingEndDate === ''"
                                :loading="loading" text="Create" variant="flat" @click="addTraining" />
                        </div>
                    </template>
                </v-card>
            </v-dialog>

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
        </template> -->
        <v-container>
            <v-row>
                <v-col>

                    <!-- <v-list class="bg-transparent">

                        <v-list-item class="my-3 py-3 bg-background2" subtitle="Jan 10, 2024" title="Code of Ethics"
                            @click="router.push('/user/trainingCenter/333333')">
                            <template #prepend>
                                <v-avatar color="blue">
                                    <v-icon color="white">mdi-clipboard-text</v-icon>
                                </v-avatar>
                            </template>

                            <template #append>
                                <div class="text-center">
                                    <v-progress-circular color="red" model-value="0" :rotate="360" :size="50"
                                        :width="5">
                                        <template #default> <span class="text-caption text-onBackground">0 % </span>
                                        </template>
                                    </v-progress-circular>
                                </div>
                            </template>
                        </v-list-item>

                        <v-list-item class="my-3 py-3 bg-background2" subtitle="Jan 10, 2024"
                            title="Code of Business Conduct" @click="router.push('/user/trainingCenter/4444')">
                            <template #prepend>
                                <v-avatar color="amber">
                                    <v-icon color="white">mdi-gesture-tap-button</v-icon>
                                </v-avatar>
                            </template>

                            <template #append>
                                <div class="text-center">
                                    <v-progress-circular color="warning" model-value="40" :rotate="360" :size="50"
                                        :width="5">
                                        <template #default> <span class="text-caption text-onBackground">40 % </span>
                                        </template>
                                    </v-progress-circular>
                                </div>
                            </template>
                        </v-list-item>
                    </v-list> -->
                    <v-timeline align="start">
                        <v-timeline-item v-for="(year, i) in years" :key="i" :dot-color="year.color" size="small">
                            <template #opposite>
                                <div :class="`pt-1 headline font-weight-bold text-${year.color}`" v-text="year.year" />
                            </template>
                            <div>
                                <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
                                    Lorem ipsum
                                </h2>
                                <div>
                                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec
                                    ut, sed
                                    euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando
                                    voluptatibus, vix an salutandi sententiae.
                                </div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-col>
                <v-col>
                    <v-row justify="space-around">
                        <v-date-picker :allowed-dates="allowedDatesList" elevation="24" />
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col />
            </v-row>
            <!-- <pre>
        {{ appStore }}
    </pre> -->

        </v-container>

    </userPage>
</template>
