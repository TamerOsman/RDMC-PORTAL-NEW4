<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable import/first -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const vCard = ref('')
const qrCodeRef = ref<any>(null)
defineProps({
    size: Number,
})

onMounted(() => {
    // Access the actual DOM element using qrCodeRef.value.$el
    if (qrCodeRef.value) {
        const svgElement = qrCodeRef.value.$el.querySelectorAll('svg path')
        if (svgElement.length > 0) {
            // Change the first path's fill color
            svgElement[0].setAttribute('fill', 'rgba(0,0,0,0)') // Red for first path
        }
        if (svgElement.length > 1) {
            // Change the second path's fill color
            svgElement[1].setAttribute('fill', 'currentColor') // Blue for second path
        }
    }
})
watch(
    () => appStore.userContact,
    newVal => {
        if (typeof newVal === 'object') {
            vCard.value = `BEGIN:VCARD
VERSION:3.0
PRODID:-//Apple Inc.//iPhone OS 17.5.1//EN
N:${appStore.userContact?.lastName};${appStore.userContact?.firstName};;;
FN:${appStore.userContact?.firstName} ${appStore.userContact?.lastName}
ORG:Mobility Cairo
TITLE:${appStore.userContact?.position}
EMAIL;type=INTERNET;type=pref:${appStore.userContact?.email}
TEL;type=pref:${appStore.userContact?.corporatePhoneNumber}
END:VCARD`

            // const qrCodeElement = document.querySelector('svg path')
            // if (qrCodeElement) {
            //     qrCodeElement.setAttribute('fill', '#FF0000') // Set your desired fill color (e.g., red)
            // }
        }
    },
    { immediate: true }
)
</script>
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<template>
    <qrcode-vue ref="qrCodeRef" color="teal" :render-as="'svg'" :size="size" :value="vCard" />
</template>
