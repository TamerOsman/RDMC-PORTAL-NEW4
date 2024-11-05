<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const router = useRouter()
const { t } = useI18n()
</script>

<!-- eslint-disable vue/html-indent -->
<template>
    <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
            {{ t('loginWarning') }}
        </v-card-text>
    </v-card>
    <br>
    <v-btn block color="primary" @click="router.push('/auth/login')">{{ t('Loginagain') }}</v-btn>
    <!-- eslint-disable-next-line vue/max-attributes-per-line -->
    <v-btn block class="my-3" color="onBackground" variant="outlined" @click="router.push('/auth/login')">{{
        t('askforhelp')
        }}</v-btn>
</template>
