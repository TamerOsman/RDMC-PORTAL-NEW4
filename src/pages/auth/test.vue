<template>
    <div>
        <h2>Upload XLSX File</h2>
        <input type="file" @change="handleFileUpload" />

        <button @click="downloadJson" v-if="jsonData">Download JSON</button>

        <pre v-if="jsonData">{{ formattedJson }}</pre>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const jsonData = ref<any[]>([]);

// Store the formatted JSON for display
const formattedJson = ref<string>('');

// Handle the file upload and conversion
const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        // When the file is loaded, process it
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = e.target?.result;
            const uint8Array = new Uint8Array(data as ArrayBuffer);

            try {
                // Read the workbook from the binary data
                const workbook = XLSX.read(uint8Array, { type: 'array' });

                // For debugging: log the workbook structure
                console.log("Workbook:", workbook);

                // Get the first sheet's name and data
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // For debugging: log the sheet to ensure correct parsing
                console.log("Sheet Data:", sheet);

                // Convert the sheet to JSON
                jsonData.value = XLSX.utils.sheet_to_json(sheet, {
                    defval: "", // Fills in undefined or null values with empty strings
                    raw: false, // Converts Excel date formats properly
                });

                // Format the JSON for displaying nicely
                formattedJson.value = JSON.stringify(jsonData.value, null, 2);
            } catch (err) {
                console.error("Error processing file:", err);
            }
        };

        reader.readAsArrayBuffer(file); // Read the file as an array buffer
    }
};

// Handle JSON download
const downloadJson = () => {
    if (!jsonData.value) return;

    const jsonBlob = new Blob([JSON.stringify(jsonData.value, null, 2)], {
        type: 'application/json',
    });
    const url = URL.createObjectURL(jsonBlob);

    // Create a link to download the file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up after download
};
</script>

<style scoped>
/* Optional styling */
button {
    margin-top: 10px;
}

pre {
    margin-top: 20px;
    background-color: #f5f5f5;
    padding: 10px;
}
</style>