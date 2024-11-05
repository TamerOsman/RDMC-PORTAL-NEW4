<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
// import { HandFingerIcon } from 'vue-tabler-icons'
const props = defineProps({
    locStart: {
        type: String,
        default: null,
    },
    timeStart: {
        type: String,
        default: null,
    },
    vehicleTask: {
        type: [String, Number], // String or Number
        default: null,
    },
    timeEnd: {
        type: String,
        default: null,
    },
    locEnd: {
        type: String,
        default: null,
    },
})

</script>

<!-- eslint-disable vue/html-indent -->
<template>
    <div class="d-flex flex-column justify-center align-center mx-3" height="300" max-width="300">
        <v-card class="d-flex flex-column justify-center align-center my-1 px-3 py-1" height="30">
            {{ props.locStart }}
        </v-card>

        <v-card class="d-flex flex-column justify-center align-center my-1 px-3 py-1" height="30">
            {{ props.timeStart }}
        </v-card>

        <v-card class="d-flex flex-column justify-center align-center my-1 px-3 py-1" color="teal" height="70">
            <!-- <v-img class="h-50" cover :src="son">

                {{ props.vehicleTask }}
            </v-img> -->

            <!-- <v-btn variant="text"> -->
            <!-- <HandfingerIcon /> -->
            <!-- </v-btn> -->
        </v-card>

        <v-card class="d-flex flex-column justify-center align-center my-1 px-3 py-1" height="30">
            {{ props.timeEnd }}
        </v-card>

        <v-card class="d-flex flex-column justify-center align-center my-1 px-3 py-1" height="30">
            {{ props.locEnd }}
        </v-card>
    </div>
</template>
