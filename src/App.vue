<!-- eslint-disable vue/script-indent -->
<script lang="ts" setup>

import { useI18n } from 'vue-i18n' // Use useI18n instead of directly importing i18n

const { locale } = useI18n()

</script>
<template>
  <v-app :class="locale == 'ar' ? 'rtlClass' : null" color="background">

    <router-view />

  </v-app>
</template>
