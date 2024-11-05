<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<template>
    <div class="position-relative">
        <v-carousel cycle height="300" hide-delimiter-background hide-delimiters :show-arrows="false">
            <v-carousel-item v-for="(slide, i) in slides" :key="i" class="bg-black">
                <v-img aspect-ratio="16/9" cover height="100%" :lazy-src="slide.lazysrc" :src="slide.src">
                    <template #placeholder>
                        <v-row align="center" class="fill-height ma-0" justify="center">
                            <v-progress-circular color="grey-lighten-5" indeterminate />
                        </v-row>
                    </template>
                </v-img>
            </v-carousel-item>
        </v-carousel>
        <div class="h-100 w-100 text-grey-lighten-4 d-flex align-center justify-start position-absolute top-0 left-0"
            style="background: rgba(0,0,0,0.7);">
            <div class=" d-flex flex-column ps-3 ms-12"
                :style="i18n.global.locale == 'ar' ? 'border-right: 5px #FFF solid;' : 'border-left: 5px #FFF solid;'">
                <slot />
            </div>
        </div>
    </div>
</template>
<!-- eslint-disable vue/script-indent -->

<script setup lang="ts">
// import { ref } from 'vue'
import { i18n } from '@/locales/i18n'

interface Slides {
    src: string;
    lazysrc: string;
}

defineProps<{
    slides: Slides[];
}>()

// const slides = ref(propsDefined.slides)
</script>
