<!-- eslint-disable vue/html-indent -->
<template>
    <v-dialog max-width="320" persistent>
        <v-list class="py-2 bg-background" elevation="12" rounded="lg">
            <v-list-item>
                <template #title>
                    <p>{{ dialogTitle }}</p>
                </template>
                <template #prepend>
                    <div>
                        <v-img :src="logo" width="70" />
                    </div>
                </template>
                <template #append>
                    <v-progress-circular indeterminate size="16" width="2" />
                </template>
            </v-list-item>
        </v-list></v-dialog>
</template>
<!-- eslint-disable vue/script-indent -->

<script setup lang="ts">
import logo from '@/assets/logo.svg'
defineProps({
    dialogTitle: String,
})
</script>
