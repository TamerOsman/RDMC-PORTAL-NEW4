<!-- eslint-disable vue/html-indent -->
<template>
    <UserPage>
        <v-container>
            <v-row>
                <v-col>
                    <h2 class="text-h2">XLSX to JSON</h2>
                    <v-divider />
                    <v-form @submit.prevent>
                        <v-file-input label="File input" @change="handleFileUpload" />
                        <v-btn block class="mt-2" type="submit">Submit</v-btn>
                    </v-form>

                    <button @click="downloadJson">Download JSON</button>

                    <pre>

         {{ data }}
</pre>

                </v-col>
            </v-row>
        </v-container>
    </UserPage>
</template>
<!-- eslint-disable vue/script-indent -->
<!-- eslint-disable vue/script-indent -->

<script setup lang="ts">
import * as XLSX from 'xlsx'
import { ref } from 'vue'
const data = ref<any[]>([])

const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    if (file) {
        const reader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const binaryStr = e.target?.result

            if (binaryStr) {
                const workbook = XLSX.read(binaryStr, { type: 'binary' })
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
                data.value = XLSX.utils.sheet_to_json(firstSheet)
            }
        }

        reader.readAsBinaryString(file) // Read the file as binary string
    }
}

// Function to download the JSON
const downloadJson = () => {
    // Convert JSON array to a string
    const jsonString = JSON.stringify(data.value, null, 2)

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' })

    // Create a link element
    const link = document.createElement('a')

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob)

    // Set the download attribute to specify the file name
    link.download = 'data.json'

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link)

    // Programmatically click the link to trigger the download
    link.click()

    // Remove the link from the document
    document.body.removeChild(link)
}
</script>
