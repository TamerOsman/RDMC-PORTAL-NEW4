<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import axios from 'axios'
import { readData, updateData } from '@/utils/firebase'
interface Data {
    empCode: string,
    fullName: string,
    position: string,

}

interface TrainingCenterAdmins {

    superAdmin?: Data,
    admins: Data[]
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

// const emps = ref([])
const trainingCenterAdmins = ref<TrainingCenterAdmins>({ superAdmin: undefined, admins: [] })
const trainingAdminsCount = ref(1)
defineProps({
    emps: [],
})
// Fetch data on mount
onMounted(async () => {
    // const fbempRef = await readData('/documents/users')
    // emps.value = fbempRef.map((item: any) => {
    //     return { empCode: item.key, fullName: `${item.value.firstName} ${item.value.lastName}`, position: item.value.position }
    // })
    // emps.value = propss.emps || []

    const foo = await readData('/documents/admin/trainingcenter')
    trainingCenterAdmins.value = flattenArray(foo)
    trainingAdminsCount.value = trainingCenterAdmins.value.admins.length || 1
    // console.log('foo', fooo)
})

const update = async () => {
    await updateData('/documents/admin/trainingcenter', trainingCenterAdmins.value)
}

</script>

<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->

<template>
    <!-- <usersUpdate /> -->

    <v-card class="bg-background " flat>
        <v-card-title class="font-weight-bold bg-primary">Training <span
                class="font-weight-light">Center</span></v-card-title>
        <v-card-text>

            <v-container>
                <v-row>
                    <v-col>
                        <v-label>Training center super admin</v-label>
                        <v-combobox v-model="trainingCenterAdmins.superAdmin" density="compact" item-title="fullName"
                            item-value="empCode" :items="emps" variant="outlined">
                            <template #item="{ props, item }">
                                <v-list-item v-bind="props" :subtitle="item.raw.position" />
                            </template>
                        </v-combobox>

                        <v-label class="mt-12">Training center admins</v-label>
                        <v-combobox v-for="i in trainingAdminsCount" :key="i"
                            v-model="trainingCenterAdmins.admins[i - 1]" density="compact" item-title="fullName"
                            item-value="empCode" :items="emps" variant="outlined">
                            <template #item="{ props, item }">
                                <v-list-item v-bind="props" :subtitle="item.raw.position" />
                            </template>
                        </v-combobox>

                        <v-btn class="ms-auto me-8" color="primary" text="Add another admin" variant="text"
                            @click="trainingAdminsCount++" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions class="d-flex">
            <v-btn class="ms-auto" color="primary" text="update" variant="outlined" @click="update" />
        </v-card-actions>
    </v-card>

</template>
