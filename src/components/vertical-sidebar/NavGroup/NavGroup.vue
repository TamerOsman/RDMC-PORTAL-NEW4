<!-- eslint-disable vue/script-indent -->
<script setup>
import { useI18n } from 'vue-i18n'
const props = defineProps({ item: Object })
const { t } = useI18n()
</script>

<template>
  <v-list-subheader class="smallCap" color="darkText">{{ t(props.item.header) }}</v-list-subheader>
</template>
