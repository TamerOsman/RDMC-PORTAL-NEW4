<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { ref, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { ref as fbRef, get, getDatabase, push, set } from 'firebase/database'
import { pushData } from '@/utils/firebase'
import { useAppStore } from '@/stores/app'
import * as XLSX from 'xlsx'
import { useDate } from 'vuetify'
// import item from '@/pages/user/components/dutytable/item.vue'
import { PaperclipIcon } from 'vue-tabler-icons'
// import trainright from '@/assets/images/dutytable/trainright.png'

// eslint-disable-next-line space-before-function-paren

const appStore = useAppStore()
const date = useDate()
// const { t } = useI18n()
// const db = getDatabase()
// const collectionRef = fbRef(db, '/operations/lrt_duty_table')

const jsonData = ref<boolean>(false)
const day = ref('saturday')
const title = ref('')
const dataRef = ref([])
const fileName = ref('')
// const dateNow = ref(date.format(new Date(), 'fullDateTime'))

const edate = ref<String | any>(null)
const etime = ref('')
const edateRef = ref('')
const effectiveStartDate = ref('')
const minDate = date.format(new Date(), 'keyboardDate')
const modal1 = ref(false)
const modal2 = ref(false)

const updateEffectiveStartDate = () => {
    if (edateRef.value !== '' && etime.value !== '') {
        effectiveStartDate.value = date.format(new Date(`${edateRef.value}, ${etime.value}`), 'fullDateTime')
    }
}
watch(edate, (newValue: any) => {
    edateRef.value = date.format(new Date(newValue), 'fullDate')
    updateEffectiveStartDate()
})

watch(etime, (newValue: any) => {
    updateEffectiveStartDate()
})

const submit = async () => {
    const creationDate = date.format(new Date(), 'fullDateTime')
    await pushData(`/operations/lrt_duty_table/`,
        { creationDate, effectiveStartDate: effectiveStartDate.value, fileName: fileName.value, titel: title.value, weekday: day.value, createdBy: appStore.empId, status: false, data: dataRef.value })
    edateRef.value = ''
    etime.value = ''
    effectiveStartDate.value = ''
    fileName.value = ''
    title.value = ''
    day.value = ''
    dataRef.value = []
    jsonData.value = true
}

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    fileName.value = file ? file.name : ''
    // const newKey = await getCountOfEntries()
    if (file) {
        const reader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const binaryStr = e.target?.result

            if (binaryStr) {
                const workbook = XLSX.read(binaryStr, { type: 'binary' })
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
                dataRef.value = XLSX.utils.sheet_to_json(firstSheet)
            }
        }

        reader.readAsBinaryString(file) // Read the file as binary string
    }
}

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-self-closing -->

<template>

    <v-menu>
        <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-vertical" :ripple="false" variant="text" />
        </template>
        <v-list class="bg-background">
            <v-list-item>
                <v-btn block color="onBackground" prepend-icon="mdi-heart-plus" variant="text"> Add to
                    favourites</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn block color="primary" prepend-icon="mdi-plus" variant="flat">
                    New duty table

                    <v-dialog activator="parent" fullscreen transition="dialog-bottom-transition">
                        <template #default="{ isActive }">
                            <v-form class="fill-height " @submit.prevent="submit">
                                <v-card color="background">

                                    <v-toolbar color="onBackrgound">
                                        <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>

                                        <v-toolbar-title>New duty table</v-toolbar-title>

                                        <v-spacer></v-spacer>

                                        <v-toolbar-items>
                                            <v-btn color="primary" text="Save" type="submit" variant="flat"
                                                @click="isActive.value = false"></v-btn>
                                        </v-toolbar-items>
                                    </v-toolbar>

                                    <v-card-text>

                                        <v-label>Title</v-label>
                                        <v-text-field v-model="title" density="compact"
                                            variant="outlined"></v-text-field>
                                        <v-row class="align-end">
                                            <v-col>
                                                <v-label>Select day</v-label>
                                                <v-select v-model="day" density="compact"
                                                    :items="['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col>
                                                <v-file-input density="compact" label="File input" prepend-icon=""
                                                    variant="outlined" @change="handleFileUpload">
                                                    <template #prepend-inner>
                                                        <PaperclipIcon />
                                                    </template>
                                                </v-file-input>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col>
                                                <v-text-field v-model="edateRef" :active="modal1" :focused="modal1"
                                                    label="Effective start Date" prepend-icon=""
                                                    prepend-inner-icon="mdi-calendar-outline" readonly
                                                    variant="outlined">
                                                    <v-dialog v-model="modal1" activator="parent" width="auto">
                                                        <v-date-picker v-if="modal1" v-model="edate" :min="minDate"
                                                            show-adjacent-months></v-date-picker>
                                                    </v-dialog>
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="etime" :active="modal2" :focused="modal2"
                                                    label="Effective start time" prepend-icon=""
                                                    prepend-inner-icon="mdi-clock-time-four-outline" readonly
                                                    variant="outlined">
                                                    <v-dialog v-model="modal2" activator="parent" width="auto">
                                                        <v-time-picker v-if="modal2" v-model="etime"
                                                            format="24hr"></v-time-picker>
                                                    </v-dialog>
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        {{ effectiveStartDate }}
                                    </v-card-text>

                                </v-card>
                            </v-form>
                        </template>
                    </v-dialog>
                </v-btn>

            </v-list-item>
        </v-list>
    </v-menu>

</template>
