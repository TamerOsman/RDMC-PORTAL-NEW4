<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import {
  HomeIcon,
} from 'vue-tabler-icons'
import { shallowRef, watch } from 'vue'
import { i18n } from '@/locales/i18n'
import sidebarItems from './sidebarItem'
import NavGroup from './NavGroup/NavGroup.vue'
import NavItem from './NavItem/NavItem.vue'
import NavCollapse from './NavCollapse/NavCollapse.vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
// import Logo from '../logo/LogoMain.vue'
const sidebarMenu = shallowRef(sidebarItems)

watch(appStore, (newValue: any) => {
  sidebarMenu.value = newValue.safeMode ? [{
    title: 'SafeMode',
    icon: HomeIcon,
    to: '/user/safeMode',
  }] : sidebarMenu.value
  // newValue.safeMode ? sidebarMenu.value = sidebarMenu.value.map((item: any) => {
  //   //   typeof item.title !== 'undefined' ? item.disapled = true : item.disabled = false
  //   item.disabled = true
  //   return item
  // }) : sidebarMenu.value = sidebarMenu.value.map((item: any) => {
  //   item.disabled = true
  //   return item
  // })
})

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <v-navigation-drawer app color="background" elevation="0" :location="i18n.global.locale == 'ar' ? 'right' : 'left'"
    mobile-breakpoint="lg" rail-width="75">
    <!---Logo part -->

    <!--  <div class="pa-5">
     <Logo />
    </div>-->
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-4">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup v-if="item.header" :key="item.title" :item="item" />
          <!---Item Divider -->
          <v-divider v-else-if="item.divider" class="my-3" />
          <!---If Has Child -->
          <NavCollapse v-else-if="item.children" class="leftPadding" :item="item" :level="0" />
          <!---Single Item-->
          <NavItem v-else class="leftPadding" :item="item" />
          <!---End Single Item-->
        </template>
      </v-list>
      <!-- <div class="pa-4">
        <ExtraBox />
      </div> -->
      <!-- <div class="pa-4 text-center">
        <v-chip color="inputBorder" size="small"> v1.2.0 </v-chip>
      </div> -->
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
<style>
.rightSidebar {
  left: auto !important;
  right: 0 !important;
}
</style>
