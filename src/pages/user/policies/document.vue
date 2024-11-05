<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { get } from '@/utils/firebase'
const route = useRoute()
const url = ref('')
interface RouteParams {
    id: string;
}
interface Doc {
    key: string, value: { en: { name: string, uploadedAt: string, url: string }, name: string, uploadedAt: string, url: string }
}
const doc = ref<Doc | null>(null)
const tab = ref(null)
const loading = ref(true)
const breadcrumbsItems = ref([
    {
        title: 'Home',
        disabled: false,
        to: '/user/home',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: 'Policies',
        disabled: false,
        to: '/user/policies',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: '',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
])
onMounted(async () => {
    const params = route.params as RouteParams
    const policies = await get('/documents/hr/documents/')
    const keys = Object.keys(policies)
    console.log('policies', policies)
    const id = parseInt(params.id) - 4625
    doc.value = policies[keys[id]]
    breadcrumbsItems.value[2].title = policies[keys[id]].en.name
    url.value = policies[keys[id]].en.url
})
const finished = ref(false)
const onClickFinish = () => {
    finished.value = true
}

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->

<template>
    <!-- <pre>
        {{ doc }}
    </pre>
    {{ url }} -->
    <v-overlay class="align-center justify-center" :model-value="loading">
        <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>
    <userPage :breadcrumbs="breadcrumbsItems">

        <v-stepper-vertical>
            <template #default="{ step }">
                <v-stepper-vertical-item :complete="step > 1" subtitle="Personal details" title="Step one" value="1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                    voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero
                    rerum unde voluptatem!

                    <template #next="{ next }">
                        <v-btn color="primary" @click="next" />
                    </template>

                    <template #prev />
                </v-stepper-vertical-item>

                <v-stepper-vertical-item :complete="step > 2" subtitle="Contact Details" title="Step two" value="2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                    voluptatibus!
                    Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde
                    voluptatem!

                    <template #next="{ next }">
                        <v-btn color="primary" @click="next" />
                    </template>

                    <template #prev="{ prev }">
                        <v-btn variant="plain" @click="prev" />
                    </template>
                </v-stepper-vertical-item>

                <v-stepper-vertical-item subtitle="Confirmation" title="Step three" value="3"
                    @click:next="onClickFinish">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                    voluptatibus!
                    Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde
                    voluptatem!

                    <template #next="{ next }">
                        <v-btn color="primary" text="Finish" @click="next" />
                    </template>

                    <template #prev="{ prev }">
                        <v-btn v-if="!finished" variant="plain" @click="prev" />

                        <v-btn v-else text="Reset" variant="plain" @click="finished = false" />
                    </template>
                </v-stepper-vertical-item>
            </template>
        </v-stepper-vertical>

        <v-tabs v-model="tab" align-tabs="center" bg-color="rdmc5" class="rounded-t" stacked>
            <v-tab value="tab-1">
                <v-icon icon="mdi-eye" />

                Read
            </v-tab>

            <v-tab value="tab-2">
                <v-icon icon="mdi-pen" />
                <v-badge color="error" dot>
                    <span class="me-5">Signature</span>
                </v-badge>

            </v-tab>

        </v-tabs>

        <v-tabs-window v-model="tab" class="fill-height">
            <v-tabs-window-item class="h-screen w-100" value="tab-1">
                <v-container v-if="loading">
                    <v-row>
                        <v-col class="d-flex flex-column align-center">
                            <v-card class="border-thin" color="transparent" elevation="0" max-width="800">
                                <v-card-text class="text-h3 font-weight-light">
                                    Loading...
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <iframe v-show="!loading" allowfullscreen frameborder="0" height="100%" :src="url" width="100%"
                    @load="loading = false" />

            </v-tabs-window-item>
            <v-tabs-window-item class="w-100 h-100 d-flex flex-column align-center justify-top" value="tab-2">

                <v-container>
                    <v-row>
                        <v-col class="d-flex flex-column align-center">
                            <v-card class="border-thin" color="transparent" elevation="0" max-width="800">
                                <v-card-text class="text-h3 font-weight-light">
                                    I hereby confirm that I have thoroughly read and understood the contents of the
                                    document. I
                                    acknowledge the policies outlined within and commit to adhering to them. This
                                    statement
                                    serves as my
                                    official confirmation of compliance with the policy as required.
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="ms-auto" color="primary" variant="flat">Confirm</v-btn>
                                </v-card-actions>

                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

            </v-tabs-window-item>
        </v-tabs-window>
    </userPage>

    <!-- <div class="pdf-container">

    </div> -->

</template>

<style scoped>
.pdf-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
