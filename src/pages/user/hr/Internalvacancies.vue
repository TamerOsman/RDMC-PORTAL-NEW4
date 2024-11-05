<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Define the type for breadcrumb items
interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    href: string;
}

const items = ref<BreadcrumbItem[]>([])
onMounted(() => {
    items.value = [
        {
            title: 'appName',
            disabled: false,
            href: 'breadcrumbs_dashboard',
        },
        {
            title: 'Internalvacancies',
            disabled: true,
            href: 'breadcrumbs_link_2',
        },
    ]
})

</script>
<!-- eslint-disable vue/html-indent -->
<template>
    <v-card class="mb-5">
        <v-breadcrumbs :items="items">
            <template #title="{ item }">
                {{ t(item.title).toUpperCase() }}
            </template>
            <template #divider>
                <v-icon icon="mdi-chevron-right" />
            </template>
        </v-breadcrumbs>
    </v-card>

</template>
