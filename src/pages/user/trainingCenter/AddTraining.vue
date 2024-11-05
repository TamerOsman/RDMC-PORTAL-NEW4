<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import trainings from '@/pages/user/trainingCenter/components/trainings.vue'
// import newDutyTable from '@/pages/user/operations/lrt/dutyTable/components/newDutyTable.vue'
import trainingUsers from '@/pages/user/trainingCenter/components/trainingUsers.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const tab = ref('one')
const router = useRouter()
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
        title: 'TrainingCenter',
        disabled: false,
        to: '/user/trainingCenter',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: 'Add training',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

const trainingTitle = ref('')
const trainingLangs = ref([])
const traineesType = ref('')
const trainingPeriod = ref([])

// const addTraining = async () => {
//     const urlName = trainingTitle.value.toLowerCase().replace(/\s+/g, '_')
//     const result = await updateData(`documents/training/${urlName}/`, {
//         trainingTitle: trainingTitle.value,
//         trainingLangs: trainingLangs.value,
//         trainingURL: urlName,
//         traineesType: traineesType.value,
//         trainingStatus: 'pending',
//         createdBy: appStore.empId,
//         creationDate: date.format(new Date(), 'fullDate'),
//         trainingStartDate: trainingStartDate.value,
//         trainingEndDate: trainingEndDate.value,
//     })
// }

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->

<template>
    <userPage :breadcrumbs="breadcrumbsItems"
        :slides="[{ src: '/lrt.jpg', lazysrc: '/lrt.jpg' }, { src: '/gl333.png', lazysrc: '/gl33lazy.png' }]">
        <template #slider>
            <span class=" text-h4  text-uppercase" v-html="t('appName')" />
            <span class=" text-h2 text-uppercase"> Add Training</span>
        </template>
        <template #breadcrumbs>
            <v-menu location="bottom">
                <template #activator="{ props }">
                    <v-icon size="20" v-bind="props">mdi-dots-vertical</v-icon>
                </template>
                <v-list>
                    <v-list-item @click="router.push('/user/hr/trainingCenter/add')">
                        <v-list-item-title>Add training</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
        <v-tabs v-model="tab" bg-color="secondary" density="compact">

            <v-tab class="border-e-thin border-white" prepend-icon="mdi-plus-box" selected-class="bg-primary"
                value="new">New
                Training</v-tab>
            <v-tab class="border-e-thin border-white" prepend-icon="mdi-plus-box" selected-class="bg-primary"
                value="two">New
                Assignments</v-tab>
            <v-tab class="border-e-thin border-white" prepend-icon="mdi-account-remove" selected-class="bg-primary"
                value="two">Remove Assignments</v-tab>
            <v-tab class="border-e-thin border-white" prepend-icon="mdi-bell-plus" selected-class="bg-primary"
                value="two">Alert
                assigned employees</v-tab>
            <v-btn class="border-e-thin ms-auto rounded-0" color="error">Submit</v-btn>
            <v-tab class="border-e-thin " prepend-icon="mdi-table-multiple" selected-class="bg-primary" value="one">All
                HR
                Trainings</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="new">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card class="bg-background2">
                                <v-card-text class="py-0">
                                    <v-text-field v-model="trainingTitle" density="compact" label="Training title"
                                        variant="outlined" />
                                    <v-label text="Training languages" />
                                    <v-combobox v-model="trainingLangs" chips density="compact"
                                        :items="['English', 'Arabic', 'French']" multiple variant="outlined" />
                                    <v-label text="Trainees type" />
                                    <v-select v-model="traineesType" density="compact"
                                        :items="['Staff', 'Outsourcing', 'Both']" variant="outlined" />
                                    <v-date-input v-model="trainingPeriod" append-inner-icon="mdi-calendar"
                                        density="compact" label="Training Period" max-width="368" multiple="range"
                                        prepend-icon="" variant="outlined" />
                                </v-card-text>
                                <template #actions>
                                    <div class="px-3 w-100">
                                        <!-- <v-btn block class="mb-5" color="primary"
                                            :disabled="trainingTitle === '' || trainingLangs.length === 0 || traineesType === '' || trainingStartDate === '' || trainingEndDate === ''"
                                            :loading="loading" text="Create" variant="flat" @click="addTraining" /> -->
                                    </div>
                                </template>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tabs-window-item>
            <v-tabs-window-item value="one">
                <trainings />
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
                <trainingUsers />
            </v-tabs-window-item>

        </v-tabs-window>

    </userPage>
</template>
