<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<template>
    <v-btn class="text-none" stacked>
        <v-badge v-if="apporval.length > 0" color="error" :content="apporval.length">
            <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
        <v-menu activator="parent" class="mx-auto" max-width="300">

            <v-list class=" bg-background2">

                <v-list-item v-for="(item, i) in apporval" :key="i" class="my-3 py-3" subtitle="Approval required"
                    :title="item.trainingTitle" @click="router.push(`/user/trainingCenter/${item.trainingURL}`)">
                    <template #prepend>
                        <v-avatar color="blue">
                            <v-icon color="white">mdi-clipboard-text</v-icon>
                        </v-avatar>
                    </template>
                </v-list-item>
            </v-list></v-menu>
    </v-btn>
</template>
<!-- eslint-disable vue/script-indent -->

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fbOnvalue } from '@/utils/firebase'
const apporval = ref<any>([])
const router = useRouter()
interface TrainingItem {
    key: any;
    trainingTitle: string;
    trainingStatus?: string;
    createdBy?: string;
    creationDate?: string;
    traineesType?: string;
    trainingLangs?: string[];
    trainingEndDate?: string;
    trainingStartDate?: string;
    trainingURL?: string;
    // Include any other properties you expect
    [key: string]: any; // Allows for additional properties
}

fbOnvalue('/documents/training', (data: any) => {
    const approvalItems: TrainingItem[] = data.map((item: TrainingItem) => ({
        ...item.value,
    }))
    // console.log('trainingDatais', approvalItems)
    apporval.value = approvalItems.filter(item => item.trainingStatus === 'pending')
})

</script>
