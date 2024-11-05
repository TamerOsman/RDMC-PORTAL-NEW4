<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<template>

    <v-layout class="fill-height d-flex flex-column overflow-auto">
        <v-card v-if="propsDefined.breadcrumbs" class="bg-background elevation-0 border-thin w-auto"
            :class="$vuetify.display.mobile ? 'mx-5' : ''">
            <!-- <v-breadcrumbs :items="items"> -->
            <Breadcrumbs :breadcrumbs="propsDefined.breadcrumbs">
                <v-breadcrumbs-item>
                    <slot name="breadcrumbs" />
                    <!-- <v-menu location="bottom">
                        <template #activator="{ props }">
                            <v-icon size="20" v-bind="props">mdi-dots-vertical</v-icon>
                        </template>
<v-list>
    <v-list-item>
        <v-list-item-title>123</v-list-item-title>
    </v-list-item>
</v-list>
</v-menu> -->
                </v-breadcrumbs-item>
            </Breadcrumbs>
            <!-- </v-breadcrumbs> -->
        </v-card>
        <v-container class="fill-height" fluid>
            <v-row class="fill-height">
                <v-col class="px-0 fill-height" cols="12" :lg="12">
                    <v-card class="bg-background2 fill-height mb-5 w-auto" elevation="0">
                        <PageSlider v-if="propsDefined.slides" :slides="propsDefined.slides">
                            <slot name="slider" />
                        </PageSlider>
                        <slot />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>
<!-- eslint-disable vue/script-indent -->

<script setup lang="ts">
import PageSlider from '@/components/user/pageSlider.vue'
import Breadcrumbs from '@/components/user/breadcrumbs.vue'
// import { ref } from 'vue'
// import { i18n } from '@/locales/i18n'

interface Slides {
    src: string;
    lazysrc: string;
}

interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    to: string;
    class: string;
    divider: boolean | null;
    icon: string | null;
}

const propsDefined = defineProps<{
    slides?: Slides[] | null;
    breadcrumbs?: BreadcrumbItem[];
}>()

// const slides = ref(propsDefined.slides)
</script>
