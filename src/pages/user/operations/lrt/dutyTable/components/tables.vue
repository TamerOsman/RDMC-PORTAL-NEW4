<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { ref, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { ref as fbRef, get, getDatabase, push, set } from 'firebase/database'
import { fbOnvalue } from '@/utils/firebase'
import { useDate } from 'vuetify'
// import item from '@/pages/user/components/dutytable/item.vue'

// import trainright from '@/assets/images/dutytable/trainright.png'

// eslint-disable-next-line space-before-function-paren

const date = useDate()
// const { t } = useI18n()
// const db = getDatabase()
// const collectionRef = fbRef(db, '/operations/lrt_duty_table')

const theData = ref<any[]>([])
// const dateNow = ref(date.format(new Date(), 'fullDateTime'))
const loading = ref(false)
const edate = ref<String | any>(null)
const etime = ref(null)
const edateRef = ref('')

const search = ref('')
const groupBy1Value = ref('No group')
const groupBy1 = ref<any>([{
    key: groupBy1Value.value,
    order: 'asc',
}])
watch(groupBy1Value, (newValue: any) => {
    if (newValue !== 'No group') {
        groupBy1.value = [{
            key: newValue,
            order: 'asc',
        }]
    } else {
        groupBy1.value = []
    }
})
const updateEffectiveDate = () => {
    try {
        const basicDate = date.format(new Date(edate.value), 'fullDate')
        if (basicDate !== '') {
            edateRef.value = date.format(new Date(basicDate + ', ' + etime.value), 'fullDateTime')
        }
    } catch (e) {
        console.log(e)
    }
}
watch(edate, (newValue: any) => {
    updateEffectiveDate()
    // edate.value = date.format(new Date(edate.value || ''), 'fullDateTime')
})
watch(etime, (newValue: any) => {
    updateEffectiveDate()
})

fbOnvalue('/operations/lrt_duty_table/', (data: any) => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000)

    theData.value = data.map((item: any) => {
        item.value.action = item.key
        return item.value
    }).sort((a: any, b: any) => {
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    })
})

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-self-closing -->

<template>

    <v-sheet class="py-5 fill-height" color="background">

        <v-card color="background" elevation="0">
            <!-- <v-card-title>
                <h4 class="text-onBackground font-weight-bold text-uppercase">LRT duty <span
                        class="font-weight-light">tables</span> </h4>
                <v-divider></v-divider>
            </v-card-title> -->
            <v-container>
                <v-row>
                    <v-col>
                        <v-select v-model="groupBy1Value" class="w-auto" density="compact" hide-details
                            :items="['No group', 'weekday', 'effectiveStartDate', 'createdBy', 'creationDate', { title: 'Published', value: 'status' },]"
                            label="Group by" prepend-inner-icon="mdi-select-group" single-line
                            variant="outlined"></v-select>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="search" density="compact" hide-details label="Search"
                            prepend-inner-icon="mdi-magnify" single-line variant="outlined"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="mx-auto" style="max-width: 80vw;">
                        <v-data-table class="bg-transparent mt-12 overflow-auto" density="compact" :group-by="groupBy1"
                            :headers="[
                                { title: 'Weekday', sortable: false, key: 'weekday', nowrap: true, value: item => `${item.weekday.toUpperCase()}`, },
                                { title: 'Effective start date', sortable: false, key: 'effectiveStartDate', nowrap: true },
                                { title: 'File name', sortable: false, key: 'fileName', nowrap: true },
                                { title: 'Title', sortable: false, key: 'titel', nowrap: true },
                                { title: 'Created By', sortable: false, key: 'createdBy', nowrap: true },
                                { title: 'creation date', sortable: false, key: 'creationDate', nowrap: true },
                                { title: 'Published', sortable: false, key: 'status' },
                                { title: 'Action', sortable: false, key: 'action' },
                            ]" item-value="fileName" :items="theData" :items-per-page="theData.length"
                            :loading="loading" :search="search">
                            <template #loading>
                                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                            </template>
                            <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
                                <tr>
                                    <td :colspan="columns.length">
                                        <VBtn :icon="isGroupOpen(item) ? '$expand' : '$next'" size="small"
                                            variant="text" @click="toggleGroup(item)"></VBtn>
                                        {{ item.value }}
                                    </td>
                                </tr>
                            </template>
                            <template #item.status="{ item: rowItem }">
                                <td> <v-icon :color="rowItem.status ? 'teal' : 'red'"
                                        :icon="rowItem.status ? 'mdi-check' : 'mdi-close'" /></td>
                            </template>
                            <template #item.action="{ item: rowItem }">
                                <td>
                                    <v-btn color="teal" prepend-icon="mdi-eye" :ripple="false" variant="text">
                                        view
                                        <v-dialog activator="parent" fullscreen>
                                            <template #default="{ isActive }">
                                                <v-toolbar color="onBackrgound">
                                                    <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>

                                                    <v-toolbar-title>{{ rowItem.fileName }}</v-toolbar-title>

                                                    <v-spacer></v-spacer>

                                                    <v-toolbar-items>
                                                        <v-btn color="primary" text="Publish" variant="flat"
                                                            @click="isActive.value = false"></v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>

                                                <v-card class="overflow-auto pb-12">

                                                    <v-data-table class="bg-transparent fill-height mt-12 overflow-auto"
                                                        density="compact" fixed-header :group-by="[{
                                                            key: 'duty',
                                                            order: 'asc',
                                                        }]" :headers="[
                                                            { title: 'activity', key: 'activity' },
                                                            { title: 'conflict', key: 'conflict' },
                                                            { title: 'duty', key: 'duty' },
                                                            { title: 'extra', key: 'extra' },
                                                            { title: 'loc_end', key: 'loc_end' },
                                                            { title: 'loc_start', key: 'loc_start' },
                                                            { title: 'notes', key: 'notes' },
                                                            { title: 'swap_with', key: 'swap_with' },
                                                            { title: 'time_end', key: 'time_end' },
                                                            { title: 'time_start', key: 'time_start' },
                                                            { title: 'trip', key: 'trip' },
                                                            { title: 'vehicle_task', key: 'vehicle_task' },
                                                        ]" item-value="activity" :items="rowItem.data">
                                                        <template
                                                            #group-header="{ item, columns, toggleGroup, isGroupOpen }">
                                                            <tr>
                                                                <td :colspan="columns.length">
                                                                    <VBtn
                                                                        :icon="isGroupOpen(item) ? '$expand' : '$next'"
                                                                        size="small" variant="text"
                                                                        @click="toggleGroup(item)"></VBtn>
                                                                    {{ item.value }}
                                                                </td>
                                                            </tr>
                                                        </template>

                                                    </v-data-table>

                                                </v-card>

                                            </template>
                                        </v-dialog>
                                    </v-btn>
                                </td>
                            </template>
                        </v-data-table>

                    </v-col>
                </v-row>

            </v-container>
        </v-card>
    </v-sheet>
</template>
