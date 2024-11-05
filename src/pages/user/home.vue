<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { i18n } from '@/locales/i18n'
import { useI18n } from 'vue-i18n'
import shareApp from '@/components/shareApp.vue'
import { useAppStore } from '@/stores/app'
import Icons from '@/components/icons.vue'
// import { gsapRdmc } from '@/utils/gsap'
const appStore = useAppStore()
const { t } = useI18n()
const items = ref()

onMounted(() => {
    items.value = [
        {
            title: 'Home',
            disabled: false,
            to: '/user/home',
            icon: 'mdi-home',
        },
        {
            title: 'HRDocuments',
            disabled: true,
            to: '',
            icon: '',
        },
    ]

    // gsapRdmc()
})

const fourValues = [
    { icon: 'oneTeam', title: 'One Team', color: 'rdmc5' },
    { icon: 'excellence', title: 'Excellence', color: 'red' },
    { icon: 'memberof', title: 'Key member of society', color: 'rdmc1' },
    { icon: 'wecare', title: 'We care', color: 'rdmc3' },
]

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>

    <!-- <v-breadcrumbs class="bg-white rounded-md" elevation="2" :items="['Home', 'Dashboard']">
        <template #divider>
            <v-icon icon="mdi-chevron-right" />
        </template>
</v-breadcrumbs> -->
    <userPage>

        <!-- <v-layout class="fill-height d-flex flex-column overflow-auto"> -->
        <!--  -->
        <v-card class="bg-transparent fill-height mb-5" elevation="0">
            <div class="position-relative">
                <v-carousel cycle height="300" hide-delimiter-background hide-delimiters :show-arrows="false">
                    <!-- <v-carousel-item>
                        <v-img aspect-ratio="16/9" cover height="100%" src="@/assets/images/lrt.jpg" />
                    </v-carousel-item> -->
                    <v-carousel-item class="bg-black">
                        <v-img aspect-ratio="16/9" cover height="100%" lazy-src="@/assets/images/gl33lazy.png"
                            src="@/assets/images/gl333.png">
                            <template #placeholder>
                                <v-row align="center" class="fill-height ma-0" justify="center">
                                    <v-progress-circular color="grey-lighten-5" indeterminate />
                                </v-row>
                            </template>
                        </v-img>
                    </v-carousel-item>
                </v-carousel>
                <div class="h-100 w-100 text-grey-lighten-4 d-flex align-center justify-start position-absolute top-0 left-0"
                    style="background: rgba(0,0,0,0.3);">
                    <div class=" d-flex flex-column ps-3 ms-12"
                        :style="i18n.global.locale == 'ar' ? 'border-right: 5px #FFF solid;' : 'border-left: 5px #FFF solid;'">
                        <span class=" text-h4  text-uppercase"> {{ t('RDMCPORTAL') }}</span>
                        <span class=" text-h2 text-uppercase"> {{ t('HOMEPAGE') }}</span>
                    </div>
                </div>
            </div>

            <div v-if="appStore.warning" class="position-relative">
                <v-carousel cycle height="auto" hide-delimiter-background hide-delimiters :show-arrows="false">
                    <v-carousel-item class="bg-rdmc2 py-3">
                        <span class="mx-5 my-5"> <span class="font-weight-bold">Message 1 is Lorem</span> ipsum dolor
                            sit
                            amet, consectetur adipiscing elit.
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </v-carousel-item>
                    <v-carousel-item class="bg-rdmc2 py-3">
                        <span class="mx-5 py-5">Message 2 is Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </v-carousel-item>
                </v-carousel>
            </div>

            <!--  <v-img aspect-ratio="16/9" cover height="300" src="@/assets/images/lrt.jpg">
                <div class="h-100 w-100 text-grey-lighten-4 d-flex align-center justify-start"
                    style="background: rgba(0,0,0,0.3);">
                    <div class=" d-flex flex-column ps-3 ms-12"
                        :style="i18n.global.locale == 'ar' ? 'border-right: 5px #FFF solid;' : 'border-left: 5px #FFF solid;'">

                        <span class=" text-h4  text-uppercase"> {{ t('RDMCPORTAL') }}</span>
                        <span class=" text-h2 text-uppercase"> {{ t('HOMEPAGE') }}</span>

                    </div>

                </div>
            </v-img> -->
            <div class="d-flex justify-center align-center pb-12"
                :class="$vuetify.display.mobile ? 'flex-column' : 'flex-row'">
                <div v-for="(item, i) in fourValues" :key="i"
                    class="d-flex flex-column justify-center align-center  text-h5 text-uppercase mx-5 my-5"
                    :class="'text-' + item.color" cols="12" md="3" sm="12">
                    <v-img class="rounded-circle mb-3 w-25 gsaptop25" :class="'text-' + item.color" color="transparent"
                        elevation="12">
                        <Icons :icon="item.icon" />
                    </v-img>
                    <h1 class="h5">{{ item.title }}</h1>
                </div>
            </div>
            <v-card-text class="d-flex flex-wrap w-100">

                <v-container class="mx-md-8">

                    <v-row>
                        <v-col>
                            <h2 class="text-h3 font-weight-bold "> {{ t('AboutPortal') }}</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>

                            <p class="text-body my-3" v-html="t('TheRDMCPortal')" />
                            <!-- <p class="text-body my-3" v-html="t('Byutilizingthisportal')" />
                            <p class="text-body my-3" v-html="t('Tosharetheportal')" /> -->

                            <v-card class="bg-transparent" elevation="0" max-width="200">
                                <v-card-text>
                                    <v-icon color="onBackground" :icon="shareApp" size="100" />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="6" sm="12">
                            <v-carousel cycle height="300" hide-delimiter-background hide-delimiters
                                :show-arrows="false">
                                <!-- <v-carousel-item>
                        <v-img aspect-ratio="16/9" cover height="100%" src="@/assets/images/lrt.jpg" />
                    </v-carousel-item> -->
                                <v-carousel-item class="">
                                    <v-row>

                                        <v-col cols="12" md="6" sm="12">

                                            <v-img aspect-ratio="4/3" contain height="100%"
                                                lazy-src="@/assets/images/gl33lazy.png" src="/lrt1.jpeg" />
                                        </v-col> <v-col>

                                            <div>
                                                <h2>Capital Train (LRT)</h2>
                                                <p>Currently </p>
                                                <p>12 stations </p>
                                                <p>22 trains</p>
                                                <p>20,000 passenger / day</p>
                                            </div>
                                        </v-col>
                                    </v-row>

                                </v-carousel-item>
                                <v-carousel-item class="">

                                    <v-row>
                                        <v-col cols="12" md="6" sm="12">
                                            <v-img aspect-ratio="4/3" contain height="100%"
                                                lazy-src="@/assets/images/gl33lazy.png" src="/gl31.png" />
                                        </v-col>
                                        <v-col>
                                            <div>
                                                <h2>Green Line 3</h2>
                                                <p>Currently </p>
                                                <p>34 stations </p>
                                                <p>39 trains</p>
                                                <p>500,000 passenger / day</p>
                                            </div>
                                        </v-col>
                                    </v-row>

                                </v-carousel-item>
                            </v-carousel>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card-text>

        </v-card>
        <!-- </v-layout> -->
    </userPage>
</template>
