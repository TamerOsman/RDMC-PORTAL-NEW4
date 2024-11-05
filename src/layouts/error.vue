<!-- eslint-disable vue/script-indent -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
// import Logo from '@/assets/logo.svg'
import ChangeLang from '@/components/changeLang.vue'
import { LanguageIcon, MoonIcon } from 'vue-tabler-icons'
import { useI18n } from 'vue-i18n'
import { useThemeSwitcher } from '@/themes/index'
import logo from '@/components/CustomLogo.vue'
const { t } = useI18n()
const { changeTheme } = useThemeSwitcher()

</script>

<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-indent -->
<template>
    <v-main>
        <v-row class="h-screen" no-gutters>
            <v-img src="@/assets/images/worldmap.svg">
                <!---Left Part-->
                <v-col :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null" cols="12">
                    <v-container :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null">
                        <div :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null">
                            <v-row :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null" justify="center">
                                <v-col :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null" cols="12" lg="10"
                                    md="7" xl="6">
                                    <v-card :class="!$vuetify.display.mobile ? 'loginBox' : 'h-screen'"
                                        color="background2" elevation="3">
                                        <v-img cover src="@/assets/images/shades.svg">
                                            <v-card-text class="pa-9">
                                                <!---Left Part Logo -->
                                                <v-row>
                                                    <v-col
                                                        class="text-center d-flex flex-column align-center justify-center"
                                                        cols="12">
                                                        <!-- <v-img>
                                                <Logo />
                                            </v-img> -->

                                                        <v-icon color="onBackground" :icon="logo" size="100" />

                                                        <h2 class="text-h2 font-weight-black mt-8 text-onBackground">{{
                                                            t('Error')
                                                            }}
                                                        </h2>
                                                        <h5 class="text-disabled  text-h5 mt-3">
                                                            {{ t('Emailmobileisnotstoredinourdatabase') }}
                                                        </h5>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <router-view />
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <div class="mt-5 text-center text-secondary">
                                                            <!-- <v-divider /> -->

                                                            <!-- <v-btn class="mt-2 text-capitalize mr-n2" variant="plain"
                                                    @click="$router.push('/')">{{
                                                        t('changelanguage') }}</v-btn> -->
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                                <!---Left Part Form-->
                                            </v-card-text>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                    </v-container>
                </v-col>
                <!---Left Part-->
            </v-img>
            <v-footer class="position-absolute bottom-0 left-0 w-100 d-flex flex-row justify-center align-center"
                color="background">
                <v-btn class="mx-1" color="onBackground" :text="t('theme')" variant="outlined" @click="changeTheme">
                    <template #prepend>
                        <v-icon color="onBackground" size="30">
                            <MoonIcon />
                        </v-icon>

                    </template>

                </v-btn>
                <v-spacer />
                <v-btn class="mx-1" color="onBackground" text="" variant="outlined">
                    <template #prepend>
                        <v-icon color="onBackground" size="30">
                            <LanguageIcon />
                        </v-icon>
                    </template>
                    {{ t('Language') }}
                    <ChangeLang />
                </v-btn>

            </v-footer>
        </v-row>

    </v-main>
</template>

<style lang="scss">
.loginBox {
    max-width: 475px;
    margin: 0 auto;
}

.loginBoxMobile {
    width: 100%;
    margin: 0 auto;
}

.v-application__wrap {
    min-height: auto;
    min-height: auto;
}
</style>
