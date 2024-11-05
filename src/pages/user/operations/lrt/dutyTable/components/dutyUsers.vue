<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-self-closing -->
<template>
    <!-- <v-treeview :items="items" item-value="id" activatable></v-treeview> -->
    <v-sheet class="py-5 h-100" color="background">
        <v-container>
            <v-row class="d-flex">
                <v-col class="d-flex flex-row align-strech">
                    <v-btn class="ms-2 mt-1" color="primary" :disabled="selected.length === 0" prepend-icon="mdi-plus"
                        @click="grantAccess">Grant access</v-btn>
                    <v-spacer />
                    <v-select v-model="groupBy1Value" class="w-auto" density="compact" hide-details
                        :items="['No group', 'position', 'Department', 'location',]" label="Group by"
                        prepend-inner-icon="mdi-select-group" single-line variant="outlined"></v-select>
                </v-col>
                <v-col>
                    <v-text-field v-model="search" density="compact" hide-details label="Search"
                        prepend-inner-icon="mdi-magnify" single-line variant="outlined" />

                </v-col>

            </v-row>
        </v-container>

        <!-- {{ selected }} -->
        <v-container>

            <v-data-table v-model="selected" v-model:expanded="expanded" class="bg-background overflow-auto"
                color="background" fixed-header :group-by="groupBy1" :headers="headers" item-value="EmpCode"
                :items="items" :loading="loading" :search="search" show-expand show-select style="max-height: 50vh;">
                <template #loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
                <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
                    <tr>
                        <td :colspan="columns.length">
                            <VBtn :icon="isGroupOpen(item) ? '$expand' : '$next'" size="small" variant="text"
                                @click="toggleGroup(item)"></VBtn>
                            {{ item.value }}
                        </td>
                    </tr>
                </template>

                <template #item.Name="{ item: rowItem }">
                    <v-hover>
                        <template #default="{ isHovering, props }">
                            <td v-bind="props"
                                :class="isHovering || search === rowItem.EmpCode ? 'text-rdmc4 cursor-pointer font-weight-bold' : undefined"
                                @click="search = rowItem.EmpCode">

                                <span>{{ rowItem.Name
                                    }}</span>

                            </td>
                        </template></v-hover>
                </template>

                <template #item.directManagerName="{ item: rowItem }">
                    <td :class="search === rowItem.Manager ? 'text-primary cursor-pointer font-weight-bold' : undefined"
                        @click="search = rowItem.Manager">
                        {{ rowItem.directManagerName }}</td>
                </template>

                <template #item.Manager="{ item: rowItem }">
                    <td @click="search = rowItem.Manager"> {{ rowItem.Manager }}</td>
                </template>

                <template #item.EmpCode="{ item: rowItem }">
                    <td @click="search = rowItem.EmpCode"> {{ rowItem.EmpCode }}</td>
                </template>

                <template #item.position="{ item: rowItem }">
                    <td @click="search = rowItem.position"> {{ rowItem.position }}</td>
                </template>

                <template #item.Department="{ item: rowItem }">
                    <td @click="search = rowItem.Department"> {{ rowItem.Department }}</td>
                </template>

                <template #item.division="{ item: rowItem }">
                    <td @click="search = rowItem.division"> {{ rowItem.division }}</td>
                </template>

                <template #item.location="{ item: rowItem }">
                    <td @click="search = rowItem.location"> {{ rowItem.location }}</td>
                </template>
                <template #expanded-row="{ columns, item }">
                    <tr>
                        <td :colspan="columns.length">
                            <v-container fluid>
                                <v-row>
                                    <v-col class="d-flex flex-column justify-center align-center w-100">
                                        <v-row class="mb-3">
                                            <h4 class="text-h3 font-weight-bold">Heads</h4>
                                            <v-divider class="border-opacity-100" color="warning" :thickness="4" />
                                        </v-row>

                                        <v-card
                                            class="text-h4 text-secondary d-flex bg-transparent flex-column justify-center align-center  h-100"
                                            density="compact" elevation="0">
                                            {{ item.Name }}

                                        </v-card>
                                        <v-card v-for="(hea) in item.heads" :key="hea"
                                            class="text-h4 d-flex bg-transparent flex-column justify-center align-center  h-100"
                                            density="compact" elevation="0" @click="search = hea.manager">
                                            {{
                                                hea.ManagerName }}

                                        </v-card>

                                    </v-col>
                                    <v-col>
                                        <v-row class="mb-3">
                                            <h4 class="text-h3 font-weight-bold">Employee Code</h4>
                                            <v-divider class="border-opacity-100" color="warning" :thickness="4" />
                                        </v-row>
                                        <v-card
                                            class="text-h4 text-secondary d-flex bg-transparent flex-column justify-start align-start "
                                            density="compact" elevation="0">
                                            {{ item.EmpCode }}

                                        </v-card>

                                    </v-col>
                                    <v-col>
                                        <v-row class="mb-3">
                                            <h4 class="text-h3 font-weight-bold">Direct Manager Code</h4>
                                            <v-divider class="border-opacity-100" color="warning" :thickness="4" />
                                        </v-row>
                                        <v-card
                                            class="text-h4 text-secondary d-flex bg-transparent flex-column justify-start align-start"
                                            density="compact" elevation="0">
                                            {{ item.Manager }}

                                        </v-card>

                                    </v-col>
                                </v-row>
                            </v-container>
                            <!-- <v-list class="d-flex flex-column justify-center align-center">
                            <v-list-item v-for="(hea) in item.heads" :key="hea" density="compact"
                                @click="search = hea.manager"> {{
                                    hea.ManagerName }} </v-list-item>
                        </v-list> -->
                        </td>
                    </tr>
                </template>

            </v-data-table>
        </v-container>
    </v-sheet>

    <!-- <pre>
    {{ items }}
</pre> -->
</template>
<!-- eslint-disable space-before-function-paren -->

<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { fbOnvalue, updateData } from '@/utils/firebase'
import { useAppStore } from '@/stores/app'
const app = useAppStore()
const items = ref<any[]>([])
const search = ref('')
const expanded = ref([])
const selected = ref([])
const loading = ref(false)
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
const headers = [
    { title: 'Name', key: 'Name', nowrap: true }, { title: '', key: 'data-table-expand' },
    { title: 'Manager Name', key: 'directManagerName', nowrap: true },
    { title: 'Position', key: 'position', nowrap: true },
    { title: 'Department', key: 'Department', nowrap: true },
    { title: 'Location', key: 'location', nowrap: true },
    { title: 'EmpCode', key: 'EmpCode', nowrap: true },
    { title: 'Manager', key: 'Manager', nowrap: true },

    // { title: 'heads', key: 'heads', nowrap: true },

]

onMounted(() => {
    if (app.users.length > 0) {
        items.value = app.users
    } else {
        fbOnvalue('/documents/users', (data: any) => {
            // Map the employee data with required fields
            const emps = data.map((item: any) => ({
                Name: `${item.value.firstName} ${item.value.lastName}`,
                EmpCode: item.value._id,
                directManagerName: item.value.directManagerName,
                Manager: item.value.directManagerCode,
                position: `${item.value.position}`, // Removed leading space
                Department: item.value.department,
                // division: item.value.division,
                location: item.value.location,
                gradeOfficial: item.value.gradeOfficial, // Assuming this field exists in the data
            })).sort((a: any, b: any) => {
                return b.gradeOfficial - a.gradeOfficial
            })

            // Corrected getManager function to recursively find managers
            function getManager(Manager: any): any[] {
                const heads: any[] = []
                const managers = emps.filter((item: any) => item.EmpCode === Manager)
                managers.forEach((manager: any) => {
                    if (manager.Manager !== 'NULL') heads.push({ manager: manager.Manager, ManagerName: manager.directManagerName })
                    // Recursively get the higher-level managers
                    heads.push(...getManager(manager.Manager))
                })
                return heads
            }

            // Map the employee data and add 'heads' for each employee
            items.value = emps.map((item: any) => {
                const heads: any[] = [{ manager: item.Manager, ManagerName: item.directManagerName }]
                const allHeads = getManager(item.Manager)
                allHeads.forEach((manager: any) => {
                    heads.push(manager)
                })
                item.heads = heads
                return item
            }).sort((a: any, b: any) => {
                return a.heads.length - b.heads.length
            })
            app.users = items.value
        })
    }
})

const grantAccess = async () => {
    // const dataToUpdate = typeof selected.value === 'object' ? selected.value : { value: selected.value }

    try {
        await updateData('/documents/access', { lrtdutytable: selected.value })
        console.log('Data updated successfully')
    } catch (error) {
        console.error('Error updating data:', error)
    }
}
</script>
<style scoped>
:deep(.v-data-table thead th) {
    background-color: #ECEFF1 !important;
    /* Make header background transparent */
}
</style>
