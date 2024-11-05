<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { fbOnvalue } from '@/utils/firebase'
import { ref } from 'vue'

const value = ref<any>(null)

fbOnvalue('/documents/users', (data: any) => {
    // Map the employee data with required fields

    // console.log(data)
    const simplified = data.map((item: any) => {
        return {
            title: `${item.value.firstName} ${item.value.lastName}`,
            id: item.value._id,
            // EmpCode: item.value._id,
            // directManagerName: item.value.directManagerName,
            Manager: item.value.directManagerCode,
            // position: `${item.value.position}`, // Removed leading space
            // Department: item.value.department,
            // division: item.value.division,
            // location: item.value.location,
            // gradeOfficial: item.value.gradeOfficial, // Assuming this field exists in the data
        }
    })
    const getStaff = (id: string) => {
        return simplified.filter((items: any) => items.Manager === id).map((emp: any) => {
            emp.children = getStaff(emp.id)
            return emp
        })
    }

    try {
        value.value = simplified.filter((emp: any) => emp.id === 'RDMC0068').map((emp: any) => {
            emp.children = getStaff(emp.id)
            return emp
        })
        console.log('data', value.value)
    } catch (e) {
        console.error(e)
    }
})

const items = [
    {
        id: 1,
        title: 'Applications :',
        children: [
            { id: 2, title: 'Calendar : app' },
            { id: 3, title: 'Chrome : app' },
            { id: 4, title: 'Webstorm : app' },
        ],
    },
    {
        id: 5,
        title: 'Documents :',
        children: [
            {
                id: 6,
                title: 'vuetify :',
                children: [
                    {
                        id: 7,
                        title: 'src :',
                        children: [
                            { id: 8, title: 'index : ts' },
                            { id: 9, title: 'bootstrap : ts' },
                        ],
                    },
                ],
            },
            {
                id: 10,
                title: 'material2 :',
                children: [
                    {
                        id: 11,
                        title: 'src :',
                        children: [
                            { id: 12, title: 'v-btn : ts' },
                            { id: 13, title: 'v-card : ts' },
                            { id: 14, title: 'v-window : ts' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 15,
        title: 'Downloads :',
        children: [
            { id: 16, title: 'October : pdf' },
            { id: 17, title: 'November : pdf' },
            { id: 18, title: 'Tutorial : html' },
        ],
    },
    {
        id: 19,
        title: 'Videos :',
        children: [
            {
                id: 20,
                title: 'Tutorials :',
                children: [
                    { id: 21, title: 'Basic layouts : mp4' },
                    { id: 22, title: 'Advanced techniques : mp4' },
                    { id: 23, title: 'All about app : dir' },
                ],
            },
            { id: 24, title: 'Intro : mov' },
            { id: 25, title: 'Conference introduction : avi' },
        ],
    },
]

</script>
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-indent -->
<template>
    <!-- <pre>
        {{
            value
        }}
    </pre> -->

    <!-- <pre>
        {{
            props.emps?.[0]
        }}
    </pre> -->

    <v-card>
        <v-treeview :items="items" />
        <!-- <v-treeview v-model:selected="selection" item-value="id" :items="value" return-object select-strategy="classic"
            selectable />
        <v-divider vertical /> -->
        <!-- <v-col class="pa-6" cols="6">
            <template v-if="!selection.length">
                No nodes selected.
            </template>
<template v-else>
                <div v-for="node in selection" :key="node.id">
                    {{ node.title }}
                </div>
            </template>
</v-col> -->
    </v-card>
</template>
