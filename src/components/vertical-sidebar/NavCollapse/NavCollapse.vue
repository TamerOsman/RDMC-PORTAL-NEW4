<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <!-- ---------------------------------------------- -->
  <!---Item Childern -->
  <!-- ---------------------------------------------- -->
  <v-list-group no-action>
    <!-- ---------------------------------------------- -->
    <!---Dropdown  -->
    <!-- ---------------------------------------------- -->
    <template #activator="{ props }">
      <v-list-item v-bind="props" class="mb-1" color="secondary" rounded :value="item.title">
        <!---Icon  -->
        <template #prepend>
          <Icon :item="item.icon" :level="level" />
        </template>
        <!---Title  -->
        <v-list-item-title class="mr-auto">{{ t(item.title) }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
          {{ item.subCaption }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Sub Item-->
    <!-- ---------------------------------------------- -->
    <template v-for="(subitem, i) in item.children" :key="i">
      <NavCollapse v-if="subitem.children" :item="subitem" :level="props.level + 1" />
      <NavItem v-else :item="subitem" :level="props.level + 1" />
    </template>
  </v-list-group>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
<!-- eslint-disable vue/script-indent -->
<script setup>
import NavItem from '../NavItem/NavItem.vue'
import Icon from '../IconSet.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({ item: Object, level: Number })
</script>
