<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import UserPage from '@/components/user/userPage.vue'
import { useAppStore } from '@/stores/app'
import { ref as fbRef, getDatabase, push, set } from 'firebase/database'
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'
import { useRouter } from 'vue-router'
// import { i18n } from '@/locales/i18n'
// import { useI18n } from 'vue-i18n'
const router = useRouter()
// const { t } = useI18n()
const breadcrumbsItems = [
    {
        title: 'Home',
        disabled: false,
        to: '/user/home',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: 'Newsletter',
        disabled: false,
        to: '/user/newsletters',
        class: '',
        divider: true,
        icon: '',
    },
    {
        title: 'Add',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

const goto = (page: string) => {
    router.push(page)
}

const db = getDatabase()
const storage = getStorage() // Firebase storage instance
const appStore = useAppStore()
const title = ref('')
const shortDescription = ref('')
const longDescription = ref('')
const selectedImage = ref<File | null>(null) // To store the selected image

// Function to resize the image before uploading
const resizeImage = (file: File, maxSize: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const reader = new FileReader()

        reader.onload = function (e) {
            img.src = e.target?.result as string
            img.onload = function () {
                let width = img.width
                let height = img.height

                // Calculate the new dimensions while maintaining aspect ratio
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width
                        width = maxSize
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height
                        height = maxSize
                    }
                }

                // Resize the canvas to the new dimensions
                canvas.width = width
                canvas.height = height
                ctx?.drawImage(img, 0, 0, width, height)

                // Convert the canvas to a Blob and resolve the promise
                canvas.toBlob(blob => {
                    if (blob) {
                        resolve(blob)
                    } else {
                        reject(new Error('Canvas is empty'))
                    }
                }, file.type)
            }
        }

        reader.onerror = function (error) {
            reject(error)
        }

        reader.readAsDataURL(file)
    })
}
// Function to convert a Blob to a File
const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type, lastModified: Date.now() })
}

// Function to handle file input change and resize the image
const onImageChange = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files
    if (files && files[0]) {
        try {
            // Resize the image to a maximum of 800 pixels
            const resizedBlob = await resizeImage(files[0], 800)
            selectedImage.value = blobToFile(resizedBlob, files[0].name) // Convert Blob back to File
        } catch (error) {
            console.error('Error resizing image:', error)
        }
    }
}

// Function to upload image, create news, and store the image URL
const addNews = async () => {
    const createdBy = appStore.empId

    const creationDate: string = new Date().toISOString()

    let imageUrl = ''
    let imageName = ''
    if (selectedImage.value) {
        // Generate a unique image name and upload to Firebase Storage
        imageName = `news-images/${Date.now()}-${selectedImage.value.name}`
        const imageRef = storageRef(storage, imageName)
        await uploadBytes(imageRef, selectedImage.value)

        // Get the download URL for the uploaded image
        imageUrl = await getDownloadURL(imageRef)
    }
    // Create a new news entry with the image URL
    const newRef = push(fbRef(db, '/news/'))
    set(newRef, {
        title: title.value,
        shortDescription: shortDescription.value,
        longDescription: longDescription.value,
        createdBy,
        creationDate,
        show: false,
        imageUrl, // Store image URL in the database
        imageName,
    })
    title.value = ''
    shortDescription.value = ''
    longDescription.value = ''
}
</script>

<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->

<template>
    <UserPage :breadcrumbs="breadcrumbsItems">
        <template #breadcrumbs>
            <v-menu location="bottom">
                <template #activator="{ props }">
                    <v-icon size="20" v-bind="props">mdi-dots-vertical</v-icon>
                </template>
                <v-list class="bg-background">
                    <v-list-item prepend-icon="mdi-heart-plus">
                        <v-list-item-title>Add to favourites</v-list-item-title>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-file-plus" @click="goto('/user/newsletters/add')">
                        <v-list-item-title>Add news</v-list-item-title>
                    </v-list-item>

                </v-list>
            </v-menu>
        </template>
        <!-- <newsletter class="overflow-auto" max-height="70vh" /> -->
        <v-form @submit.prevent="addNews">
            <v-card color="transparent" elevation="0">

                <template #text>
                    <v-text-field v-model="title" class="mt-3" label="Title" variant="outlined" />
                    <v-text-field v-model="shortDescription" label="Short Description" variant="outlined" />
                    <v-textarea v-model="longDescription" auto-grow label="Long Description" name="input-7-1"
                        variant="outlined" />

                    <v-file-input accept="image/*" label="Cover photo" prepend-icon="" variant="outlined"
                        @change="onImageChange">
                        <template #prepend-inner>
                            <CameraIcon />
                        </template>
                    </v-file-input>

                </template>

                <v-card-actions>
                    <v-spacer />

                    <v-btn color="surface-variant" text="Add" type="submit" variant="flat" />
                </v-card-actions>
            </v-card>
        </v-form>
    </UserPage>
</template>
