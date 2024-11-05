<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { ref } from 'vue'
import dutyTables from '@/pages/user/operations/lrt/dutyTable/components/tables.vue'
import newDutyTable from '@/pages/user/operations/lrt/dutyTable/components/newDutyTable.vue'
import dutyUsers from '@/pages/user/operations/lrt/dutyTable/components/dutyUsers.vue'
const tab = ref(null)
const breadcrumbsItems = [
    {
        title: 'Home',
        disabled: false,
        to: '/user/home',
        class: '',
        divider: true,
        icon: 'mdi-home',
    },
    {
        title: 'LRTDirvers',
        disabled: false,
        to: '/user/operations/lrt_dutyTable',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: 'Admin',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-self-closing -->

<template>

    <userPage :breadcrumbs="breadcrumbsItems">
        <template #breadcrumbs>

            <newDutyTable />

        </template>

        <v-tabs v-model="tab" bg-color="secondary" density="compact">
            <v-tab class="border-e-thin" prepend-icon="mdi-table-multiple" selected-class="bg-primary" value="one">Duty
                tables</v-tab>
            <v-tab class="border-e-thin border-white" prepend-icon="mdi-plus-box" selected-class="bg-primary"
                value="two">Add
                Duty
                Users</v-tab>
            <v-tab class="border-e-thin border-white" prepend-icon="mdi-account-remove" selected-class="bg-primary"
                value="two">Remove Duty
                Users</v-tab>
            <v-tab class="border-e-thin border-white" prepend-icon="mdi-bell-plus" selected-class="bg-primary"
                value="two">Alert
                Duty
                Users</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
                <dutyTables />
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
                <dutyUsers />
            </v-tabs-window-item>

        </v-tabs-window>

    </userPage>
</template>
