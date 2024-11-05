<!-- eslint-disable vue/script-indent -->
<script setup>
// import { onMounted } from 'vue'
import Icon from '../IconSet.vue'
import { useI18n } from 'vue-i18n'
// import { gsap } from 'gsap'
const { t } = useI18n()

const props = defineProps({ item: Object, level: Number })
// onMounted(() => {
// const gsapLeft50 = document.querySelectorAll('.gsapLeft50')
// gsap.from(gsapLeft50, { x: -10, duration: 0.5 })

// const gsapRight25 = document.querySelectorAll('.gsapRight25')
// gsap.from(gsapRight25, { x: 25, duration: 1 })

// const gsaptop25 = document.querySelectorAll('.gsaptop25')
// gsap.from(gsaptop25, { y: 50, opacity: 0, duration: 1 })
// })
</script>

<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <!---Single Item-->
  <v-list-item active-class="bg-primary text-onSuccess rounded-md elevation-8 gradient-card gsapLeft10" class="mb-1"
    color="onPrimary" :disabled="item.disabled" :href="item.type === 'external' ? item.to : ''" :ripple="false"
    :target="item.type === 'external' ? '_blank' : ''" :to="item.type === 'external' ? '' : item.to">
    <!---If icon-->
    <template #prepend>
      <Icon :item="props.item.icon" :level="props.level" />
    </template>
    <v-list-item-title>{{ t(item.title) }}</v-list-item-title>
    <!---If Caption-->
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>
    <!---If any chip or label-->
    <template v-if="item.chip" #append>
      <v-chip class="sidebarchip hide-menu" :color="item.chipColor" :prepend-icon="item.chipIcon"
        :size="item.chipIcon ? 'small' : 'default'" :variant="item.chipVariant">
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>

<style>
.gradient-card {
  background: linear-gradient(45deg, #17a2b8, #00AC8E);
  /* Gradient that includes your primary and secondary colors */
}
</style>
