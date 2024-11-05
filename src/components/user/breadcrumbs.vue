<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-indent -->
<template>
    <v-breadcrumbs :items="breadcrumbs ?? []">
        <template #title="{ item, index }">
            <span class="d-flex flex-row align-center" :class="breadcrumbs[index].class">
                <v-icon v-if="$vuetify.display.mobile">
                    {{ breadcrumbs[index].icon }}
                </v-icon>
                <span v-if="!$vuetify.display.mobile">{{
                    t(item.title).toUpperCase()
                }}</span>
                <span v-if="($vuetify.display.mobile && breadcrumbs[index].icon === '')">{{
                    t(item.title).toUpperCase().slice(0, 5)
                }}</span>
            </span>
        </template>
        <template #divider="{ item }">
            <v-icon v-if="item.divider" :icon="i18n.global.locale == 'ar' ? 'mdi-chevron-left' : 'mdi-chevron-right'" />
        </template>

        <slot />

    </v-breadcrumbs>
</template>
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
// import { ref } from 'vue'
import { i18n } from '@/locales/i18n'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    to: string;
    class: string;
    divider: boolean | null;
    icon: string | null;
}

const propsDefined = defineProps<{
    breadcrumbs?: BreadcrumbItem[] | null;
}>()
const breadcrumbs = computed(() => propsDefined.breadcrumbs ?? [])

// const items = ref(propsDefined.breadcrumbs)
</script>

<style>
.v-breadcrumbs-item--link {
    text-decoration: none !important;
}
</style>
