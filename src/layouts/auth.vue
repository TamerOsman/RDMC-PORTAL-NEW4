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
    <v-main class="px-0 mx-0 py-0 my-0 h-screen overflow-auto">
        <v-row no-gutters>
            <v-img class="h-100" src="@/assets/images/worldmap.svg">
                <!---Left Part-->
                <!-- <v-col :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null" cols="12"> -->
                <!-- <v-container :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null">
                        <div :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null">
                            <v-row :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null" justify="center">
                                <v-col :class="$vuetify.display.mobile ? 'px-0 mx-0 py-0 my-0' : null" cols="12" lg="10"
                                    md="7" xl="6"> -->
                <v-card class="mb-12 " :class="!$vuetify.display.mobile ? 'loginBox my-12' : 'h-100 px-0 mx-0'"
                    color="background2" elevation="3">
                    <v-img cover src="@/assets/images/shades.svg">
                        <v-card-text class="pa-9 mb-12">
                            <!---Left Part Logo -->
                            <v-row>
                                <v-col class="text-center d-flex flex-column align-center justify-center" cols="12">
                                    <v-icon color="onBackground" :icon="logo" size="100" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <router-view />
                                    <v-app-bar v-if="!$vuetify.display.mobile" color="transparent" elevation="0" grow>
                                        <v-btn color="onBackground" :text="t('theme')" variant="text"
                                            @click="changeTheme">
                                            <template #prepend>
                                                <v-icon size="30">
                                                    <MoonIcon />
                                                </v-icon>
                                            </template>
                                        </v-btn>
                                        <v-spacer />
                                        <v-btn color="onBackground">
                                            <template #prepend>
                                                <v-icon size="30">
                                                    <LanguageIcon />
                                                </v-icon>
                                            </template>
                                            {{ t('Language') }}
                                            <ChangeLang :auth="true" />
                                        </v-btn>
                                    </v-app-bar>
                                </v-col>
                            </v-row>
                            <!---Left Part Form-->
                        </v-card-text>
                    </v-img>
                </v-card>
                <!-- </v-col>
                            </v-row>
                        </div>
                    </v-container> -->
                <!-- </v-col> -->
                <!---Left Part-->
            </v-img>
        </v-row>
        <v-bottom-navigation v-if="$vuetify.display.mobile" bg-color="onBackground" grow>
            <v-btn :text="t('theme')" variant="text" @click="changeTheme">
                <template #prepend>
                    <v-icon size="30">
                        <MoonIcon />
                    </v-icon>
                </template>
            </v-btn>
            <v-spacer />
            <v-btn>
                <template #prepend>
                    <v-icon size="30">
                        <LanguageIcon />
                    </v-icon>
                </template>
                {{ t('Language') }}
                <ChangeLang :auth="true" />
            </v-btn>
        </v-bottom-navigation>

    </v-main>
</template>

<style lang="scss">
.loginBox {
    max-width: 475px;
    margin: 0 auto;
}

.v-application__wrap {
    min-height: auto;
    min-height: auto;
}
</style>
