<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import axios from 'axios'
import { updateData, readData } from '@/utils/firebase'
import { onMounted, ref } from 'vue'

interface Emp {
    '_id': string,
}
const emps = ref<Emp[]>([])
const fbEmps = ref<string[]>([])
const difference = ref<string[]>([])

function formatKey(key: string): string {
    return key
        .toLowerCase() // Convert all characters to lowercase
        .split(' ') // Split the string by spaces
        .map((word, index) => index === 0
            ? word // Leave the first word lowercase
            : word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of the other words
        .join('') // Join the words back together
}

function convertKeys(obj: Record<string, any>): Record<string, any> {
    const newObj: Record<string, any> = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[formatKey(key)] = obj[key] // Apply the formatting function to each key
        }
    }
    return newObj
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const submit = async () => {
    difference.value.forEach(async item => {
        // Perform actions on each item
        // console.log(item._id)
        // You can access and manipulate each `item` here

        await wait(2000)
        const { data } = await axios.post('https://online-payment-api.vercel.app/authenticate/ebusinesscard', {
            empCode: item,
        })

        try {
            await updateData(`/documents/users/${data._id}`, convertKeys(data))
            console.log(item, data)
        } catch (e) {
            console.error(e)
        }
    })
}
onMounted(async () => {
    try {
        const { data } = await axios.post('https://online-payment-api.vercel.app/authenticate/emps', {
            fields: ['_id'],
        })
        // Set the emps array with the full objects, not just the _id
        emps.value = data as Emp[]

        // Read data from Firebase
        const fbempRef = await readData('/documents/users/')
        fbEmps.value = fbempRef.map((item: { key: string }) => item.key)
        console.log('length ', fbEmps.value.length)

        // Calculate the difference between the two arrays
        difference.value = emps.value
            .map(emp => emp._id) // Extract _id values
            .filter(item => !fbEmps.value.includes(item))

        // console.log('Difference:', difference)
    } catch (e) {
        console.error('Error during onMounted:', e)
    }
})
</script>

<!-- eslint-disable vue/html-indent -->
<template>
    <v-btn color="primary" @click="submit">Syncronize users</v-btn>
    <br>
    <v-row>
        <v-col>
            <pre>
        {{ difference }}
    </pre>
        </v-col>
        <v-col>
            <!-- <pre>
               {{ emps }}
            </pre> -->

        </v-col>
    </v-row>

</template>
