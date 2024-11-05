<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
const { t } = useI18n()
const appStore = useAppStore()

</script>
<!-- eslint-disable vue/html-indent -->
<template>
    {{ t('Hello') }} Dashboard {{ appStore.empId }}
</template>
