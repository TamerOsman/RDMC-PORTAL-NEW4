<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PdfIcon } from 'vue-tabler-icons'
import { i18n } from '@/locales/i18n'
import { useI18n } from 'vue-i18n'
import { storage } from '@/utils/firebase'
import { ref as fbRef, getDatabase, onValue, set } from 'firebase/database'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { useAppStore } from '@/stores/app'
import logo from '@/components/CustomLogo.vue'

const appStore = useAppStore()

const { t } = useI18n()
const db = getDatabase()
const starCountRef = fbRef(db, '/documents/hr/documents/')
const data = ref<any>(null)
const fileName = ref('')
const addDoc = ref('')
const loadingUpload = ref(false)

// Define the type for breadcrumb items
interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    to: string;
    icon: string;
}

interface FileInDB {
    value: {
        [key: string]: string
    }
}

const items = ref<BreadcrumbItem[]>([])
const selectedFile = ref<File | null>(null)

onMounted(() => {
    items.value = [
        {
            title: 'Home',
            disabled: false,
            to: '/user/home',
            icon: 'mdi-home',
        },
        {
            title: 'HRDocuments',
            disabled: true,
            to: '',
            icon: '',
        },
    ]
    onValue(starCountRef, snapshot => {
        const dref = snapshot.val()
        if (dref) {
            // dutytable.value = data
            const dkeys = Object.keys(dref)
            const dValues = dkeys.map((key: string | number) => {
                const r: any = { value: dref[key] }
                r.value.id = key
                return r
            }).reverse()
            const lang: string = i18n.global.locale as string
            data.value = dValues.map((item: FileInDB) => item.value[lang]).filter(item => item != null)
        }
    })
})

// Handle file input change
const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        selectedFile.value = target.files[0]
    }
}

// Upload file and add document details to Firestore
const uploadFile = async () => {
    if (!selectedFile.value) return

    const file = selectedFile.value
    const storageReference = storageRef(storage, `hr/documents/${fileName.value}/en`)

    try {
        // Upload file to Firebase Storage
        await uploadBytes(storageReference, file)

        // // Get the download URL
        const url = await getDownloadURL(storageReference)
        set(fbRef(db, `/documents/hr/documents/${fileName.value}/en`), {
            name: fileName.value,
            url,
            uploadedAt: new Date().toISOString(),
        })

        console.log('done')
    } catch (error) {
        console.error('Error uploading file:', error)
    }
}
const openFile = (url: string) => {
    window.open(url, '_blank')
}
</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->

<template>
    <!-- <v-icon color="onBackground" :icon="logo" size="100" /> -->
    <v-dialog v-model="loadingUpload" max-width="500" persistent>

        <template #default>
            <v-list class="py-2" color="primary" elevation="12" rounded="lg">
                <v-list-item prepend-icon="custom-logo" title="Refreshing Application...">
                    <template #prepend>
                        <div class="pe-4">
                            <v-icon color="onBackground" :icon="logo" size="x-large" />
                        </div>
                    </template>

                    <template #append>
                        <v-progress-circular color="onSuccess" indeterminate="disable-shrink" size="16" width="2" />
                    </template>
                </v-list-item>
            </v-list>
        </template>
    </v-dialog>

    <v-dialog :activator="addDoc" max-width="340" persistent transition="dialog-middle-transition">
        <template #default="{ isActive }">
            <v-card>
                <template #prepend>
                    <div class="pe-2 me-2"><v-icon icon="mdi-file-plus" /></div>
                </template>
                <template #title>
                    Add
                </template>
                <template #subtitle>
                    HR Document
                </template>
                <template #append>
                    <v-btn class="ml-auto" icon="mdi-close" variant="text" @click="isActive.value = false" />
                </template>
                <v-divider class="opacity-50" />
                <!-- <v-card-title class="bg-background2 d-flex justify-center">

                </v-card-title> -->
                <v-card-text class="bg-white py-5 d-flex justify-center">

                    <div class="w-100">
                        <v-text-field v-model="fileName" density="compact" label="Document Title" variant="outlined" />
                        <v-file-input accept="application/pdf" density="compact" label="Upload document" prepend-icon=""
                            variant="outlined" @change="handleFileUpload">
                            <template #prepend-inner>
                                <PdfIcon />
                            </template>
                        </v-file-input>
                    </div>
                </v-card-text>
                <v-divider class="opacity-50" />
                <v-card-actions class="d-flex justify-center">

                    <v-btn class="ms-auto" color="primary" density="compact" text="Submit"
                        @click="loadingUpload = true" />
                    <v-btn variant="tonal" @click="uploadFile">Submit</v-btn>
                    <!-- <v-btn class="ml-auto" text="Close" @click="isActive.value = false" /> -->
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>

    <v-layout class="fill-height d-flex flex-column overflow-auto">
        <v-card class="mb-3 bg-background elevation-0 border-thin">
            <v-breadcrumbs :items="items">
                <template #title="{ item }">
                    <div class="d-flex flex-row align-center">
                        <!-- <v-icon :icon="item.icon" /> -->
                        {{ t(item.title).toUpperCase() }}
                    </div>

                </template>
                <template #divider>
                    <v-icon icon="mdi-chevron-right" />
                </template>
            </v-breadcrumbs>
        </v-card>

        <!-- <v-card v-if="appStore.isAdmin" class="mb-3">

            <v-card-title class="bg-background2">
                Create new document
            </v-card-title>
            <v-card-text class="bg-white py-5 d-flex justify-center">

                <div class="w-50">
                    <v-text-field v-model="fileName" label="Document Title" variant="outlined" />
                    <v-file-input accept="application/pdf" label="Upload document" prepend-icon="" variant="outlined"
                        @change="handleFileUpload">
                        <template #prepend-inner>
                            <PdfIcon />
                        </template>
                    </v-file-input>
                    <v-divider />
                </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="primary" variant="tonal" @click="uploadFile">Upload PDF</v-btn>
            </v-card-actions>
        </v-card> -->
        <!-- {{ i18n.global.locale }}
    <pre>
    {{ data }}
</pre> -->

        <!-- Display files uploaded -->
        <v-card class="bg-white fill-height mb-5" elevation="5">
            <v-img cover height="300" src="https://be.stantonchase.com/wp-content/uploads/2024/01/HR-cover.jpg">
                <div class="h-100 w-100 text-grey-lighten-4 d-flex align-center justify-start"
                    style="background: rgba(0,0,0,0.7);">
                    <div class=" d-flex flex-column ps-3 ms-12"
                        :style="i18n.global.locale == 'ar' ? 'border-right: 5px #FFF solid;' : 'border-left: 5px #FFF solid;'">

                        <span class=" text-h4  text-uppercase"> Human Resources</span>
                        <span class=" text-h2 text-uppercase"> Documents</span>

                    </div>

                </div>
            </v-img>

            <v-card-title v-if="appStore.isAdmin" class=" d-flex">
                <span class="me-auto">{{ t('HRDocuments') }}</span>
                <v-menu location="bottom">
                    <template #activator="{ props }">
                        <v-icon v-bind="props" icon="mdi-dots-vertical" />
                    </template>
                    <v-list>
                        <v-list-item v-if="appStore.isAdmin" ref="addDoc" prepend-icon="mdi-file-plus"
                            title="Add new doc" />

                    </v-list>
                </v-menu>

            </v-card-title>
            <v-divider class="opacity-30" />
            <v-card-text class="d-flex flex-wrap w-100">

                <v-container class="mx-md-8">
                    <v-row>
                        <v-col>

                            <h2 class="text-h3 font-weight-bold "> HR Documents Repository</h2>
                            <v-divider />
                            <p class="text-body my-3">Welcome to your central hub for HR documents. Here, you'll find
                                essential resources like employee guidelines, policies, procedures, and benefits—all in
                                PDF
                                format for easy access across devices.</p>

                            <h3 class="text-h4">Key Points:</h3>

                            <ul class="text-body mx-8">
                                <li class="text-body my-3"><b>Up-to-Date Information: </b>This repository is regularly
                                    updated, so please avoid saving local copies to ensure you're always viewing the
                                    latest
                                    versions.
                                </li>
                                <li class="text-body my-3"><b>Real-Time Updates:</b> HR policies may change, and this
                                    repository reflects the most current information.
                                </li>
                                <li class="text-body my-3"><b>24/7 Access:</b> Available anytime, ensuring convenient
                                    access
                                    whenever you need it.
                                </li>
                            </ul>
                            <p>For any questions or further assistance, feel free to contact HR.</p>
                            <h2 class="text-h3 font-weight-bold mt-12 d-flex flex-column"> Documents List
                                <v-divider class="w-auto " />
                            </h2>

                            <v-card v-for="(file, i) in data" :key="i" class="bg-background mx-3 my-6"
                                :class="!$vuetify.display.mobile ? 'w-auto' : 'flex-1-1-100'"
                                :max-width="!$vuetify.display.mobile ? 444 : undefined" subtitle="HR Documents"
                                @click="openFile(file.url)">
                                <template #prepend>
                                    <v-avatar class="me-3 border-thin" color="blue-grey">
                                        <v-icon :icon="file.icon || 'mdi-file-document'" />
                                    </v-avatar>
                                </template>
                                <!-- <v-card-title class="ms-3 border-thin">{{ file.name }}</v-card-title> -->
                                <template #title>
                                    <span class="text-blue-grey">
                                        {{ file.name }}
                                    </span>
                                </template>
                                <template #subtitle>
                                    <span class="text-blue-grey">
                                        {{ t('HRDocuments') }}
                                    </span>
                                </template>
                            </v-card>
                        </v-col>
                    </v-row>

                </v-container>

            </v-card-text>

        </v-card>
    </v-layout>
</template>
