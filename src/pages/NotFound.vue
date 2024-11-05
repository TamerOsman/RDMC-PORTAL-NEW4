<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<template>
    <v-row class="h-screen" no-gutters>
        <v-col class="d-flex align-center justify-center">
            <div class="text-center">
                <div class="CardMediaWrapper">
                    <img alt="grid" class="w-100" src="@/assets/images/maintenance/img-error-bg.svg">
                    <img alt="grid" class="CardMediaParts" src="@/assets/images/maintenance/img-error-blue.svg">
                    <img alt="build" class="CardMediaBuild" src="@/assets/images/maintenance/img-error-text.svg">
                    <img alt="build" class="CardMediaBuild" src="@/assets/images/maintenance/img-error-purple.svg">
                </div>
                <h1 class="text-h1">Something is wrong</h1>
                <p>
                    <small>The page you are looking was moved, removed, <br>renamed, or might never exist! </small>
                </p>
                <v-btn class="mt-4" color="primary" :prepend-icon="HomeIcon" to="/" variant="flat"> Home</v-btn>
            </div>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
// eslint-disable-next-line vue/script-indent
import { HomeIcon } from 'vue-tabler-icons'
</script>
<style lang="scss">
.CardMediaWrapper {
    max-width: 720px;
    margin: 0 auto;
    position: relative;
}

.CardMediaBuild {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    animation: 5s bounce ease-in-out infinite;
}

.CardMediaParts {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    animation: 10s blink ease-in-out infinite;
}
</style>
