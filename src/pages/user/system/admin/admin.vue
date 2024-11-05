<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { readData, updateData } from '@/utils/firebase'
import {
    DeviceLaptopIcon,
    InfoSquareIcon,
    VolumeIcon,
} from 'vue-tabler-icons'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

interface UserData {
    empCode: string,
    fullName: string,
    position: string,

}

interface TrainingCenterAdmins {

    superAdmin?: UserData,
    admins: UserData[]
}
interface Item {
    key: string;
    value: string;
}

const emps = ref<UserData[]>([])
const trainingCenterAdmins = ref<TrainingCenterAdmins>({ superAdmin: undefined, admins: [] })
const trainingAdminsCount = ref(1)
function flattenArray(arr: Record<string, any>): TrainingCenterAdmins {
    const result: any = {}
    arr.forEach((item: Item) => {
        result[item.key] = item.value
    })
    return result as TrainingCenterAdmins
}

onMounted(async () => {
    if (appStore.empId !== 'RDMC0187') {
        router.push('/user/home')
    }
    const fbempRef = await readData('/documents/users')
    emps.value = fbempRef.map((item: any) => ({
        empCode: item.key,
        fullName: `${item.value.firstName} ${item.value.lastName}`,
        position: item.value.position,
    }))

    const adminData = await readData('/documents/admin/trainingcenter')
    trainingCenterAdmins.value = flattenArray(adminData)
    trainingAdminsCount.value = trainingCenterAdmins.value.admins.length || 1
})

const update = async () => {
    await updateData('/documents/admin/trainingcenter', trainingCenterAdmins.value)
}

const tab = ref('trainingCenter')
const customFilter = (itemTitle: string, queryText: string, item: any) => {
    const searchQuery = queryText.toLowerCase()
    const fullName = item?.raw?.fullName?.toLowerCase() || ''
    const position = item?.raw?.position?.toLowerCase() || ''

    return fullName.includes(searchQuery) || position.includes(searchQuery)
}

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
        title: 'System Settings',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

</script>

<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->

<template>
    <!-- <usersUpdate /> -->
    <userPage :breadcrumbs="breadcrumbsItems">
        <v-container class="bg-background">

            <div class="d-flex flex-row my-3 text-rdmc5">
                <v-tabs v-model="tab" color="rdmc1" direction="vertical">
                    <v-tab prepend-icon="mdi-account" text="Training Center" value="trainingCenter">
                        <template #prepend>
                            <DeviceLaptopIcon />
                        </template>
                    </v-tab>
                    <v-tab prepend-icon="mdi-lock" text="News letter" value="newsletter">
                        <template #prepend>
                            <InfoSquareIcon />
                        </template>
                    </v-tab>
                    <v-tab prepend-icon="mdi-access-point" text="Sharing your voice" value="option-3">
                        <template #prepend>
                            <VolumeIcon />
                        </template>
                    </v-tab>
                </v-tabs>
                <v-tabs-window v-model="tab" class="w-100">
                    <v-tabs-window-item value="trainingCenter">

                        <v-card class="bg-background " flat>
                            <v-card-title class="font-weight-bold bg-rdmc1">Training <span
                                    class="font-weight-light">Center</span></v-card-title>
                            <v-card-text>

                                <v-container>
                                    <v-row>
                                        <v-col>

                                            <v-label>Training center super admin</v-label>
                                            <v-autocomplete v-model="trainingCenterAdmins.superAdmin"
                                                :custom-filter="customFilter" density="compact" item-title="fullName"
                                                item-value="empCode" :items="emps" variant="outlined">
                                                <template #item="{ props, item }">
                                                    <v-list-item v-bind="props" :subtitle="item.raw.position" />
                                                </template>
                                            </v-autocomplete>

                                            <v-label class="mt-12">Training center admins</v-label>
                                            <v-row v-for="i in trainingAdminsCount" :key="i">
                                                <v-col>
                                                    <v-autocomplete v-model="trainingCenterAdmins.admins[i - 1]"
                                                        :custom-filter="customFilter" density="compact"
                                                        item-title="fullName" item-value="empCode" :items="emps"
                                                        variant="outlined">
                                                        <template #item="{ props, item }">
                                                            <v-list-item v-bind="props" :subtitle="item.raw.position" />
                                                        </template>
                                                    </v-autocomplete></v-col>
                                            </v-row>

                                            <v-btn class="ms-auto me-8" color="primary" text="Add another admin"
                                                variant="text" @click="trainingAdminsCount++" />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions class="d-flex">
                                <v-btn class="ms-auto" color="primary" text="update" variant="outlined"
                                    @click="update" />
                            </v-card-actions>
                        </v-card>

                    </v-tabs-window-item>
                    <v-tabs-window-item value="newsletter">Newsletter content goes here.</v-tabs-window-item>
                    <v-tabs-window-item value="option-3">Sharing Your Voice content goes here.</v-tabs-window-item>
                </v-tabs-window>
            </div>

        </v-container>
    </userPage>
</template>
