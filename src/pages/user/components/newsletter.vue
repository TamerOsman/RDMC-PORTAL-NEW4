<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { ref, watch } from 'vue'
import { ref as fbRef, getDatabase, onValue, push, remove, set } from 'firebase/database'
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'
import { CameraIcon, FilePlusIcon, TrashIcon } from 'vue-tabler-icons'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const news = ref<any>(null)
const db = getDatabase()
const storage = getStorage() // Firebase storage instance
const collectionRef = fbRef(db, '/news')
const appStore = useAppStore()
const title = ref('')
const shortDescription = ref('')
const longDescription = ref('')

const selectedImage = ref<File | null>(null) // To store the selected image

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(now.getDate() - 7)

    if (date >= oneWeekAgo && date <= now) {
        // If the date is within the last week, return day of the week and time
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).format(date)
    } else {
        // Otherwise, return the full date
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date)
    }
}

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
const newPostLoading = ref(false)

// Function to upload image, create news, and store the image URL
const addNews = async () => {
    newPostLoading.value = true
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
    newPostLoading.value = false
}

// Watch for changes in Firebase database and update the news list
watch(
    () => appStore.fbUser,
    newVal => {
        if (typeof newVal === 'object') {
            onValue(collectionRef, snapshot => {
                const data = snapshot.val()
                if (data) {
                    const dkeys = Object.keys(data)

                    // Map and reverse the data so that new items appear at the top
                    news.value = dkeys.map((key: string | number) => {
                        const r: any = { key, value: data[key] }
                        r.value.id = key
                        return r
                    }).reverse()
                } else {
                    news.value = []
                }
            })
        }
    },
    { immediate: true }
)

const deleteNews = async (item: any) => {
    console.log(item.value)
    remove(fbRef(db, `/news/${item.value.id}`))

    const imageRef = storageRef(storage, item.value.imageName)
    await deleteObject(imageRef)
}
</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>

    <!-- <v-breadcrumbs class="bg-white rounded-md" elevation="2" :items="['Home', 'Dashboard']">
        <template #divider>
            <v-icon icon="mdi-chevron-right" />
        </template>
</v-breadcrumbs> -->
    <v-card>

        <v-container>
            <v-row>
                <v-col :class="$vuetify.display.mobile ? 'mx-0 px-0' : null" cols="12" lg="12">
                    <v-card class=" rounded-md" elevation="0">
                        <v-card-title class=" text-uppercase">
                            <v-row><v-col>RDMC <span class="font-weight-light">{{ t('news')
                                        }}</span></v-col><v-spacer />
                                <v-col v-if="appStore.isAdmin" class="text-end">
                                    <v-dialog max-width="800">
                                        <template #activator="{ props: activatorProps }">
                                            <v-btn color="background" elevation="0" icon v-bind="activatorProps">

                                                <v-icon>
                                                    <FilePlusIcon />
                                                </v-icon>

                                            </v-btn>
                                        </template>

                                        <template #default="{ isActive }">
                                            <v-form @submit.prevent="addNews">
                                                <v-card title="Add RDMC News">

                                                    <template #text>
                                                        <v-divider />
                                                        <v-text-field v-model="title" class="mt-3" label="Title"
                                                            variant="outlined" />
                                                        <v-text-field v-model="shortDescription"
                                                            label="Short Description" variant="outlined" />
                                                        <v-textarea v-model="longDescription" auto-grow
                                                            label="Long Description" name="input-7-1"
                                                            variant="outlined" />

                                                        <v-file-input accept="image/*" label="Cover photo"
                                                            prepend-icon="" variant="outlined" @change="onImageChange">
                                                            <template #prepend-inner>
                                                                <CameraIcon />
                                                            </template>
                                                        </v-file-input>

                                                    </template>

                                                    <v-card-actions>
                                                        <v-spacer />

                                                        <v-btn text="Cancel" variant="text"
                                                            @click="isActive.value = false" />

                                                        <v-btn color="surface-variant" text="Add" type="submit"
                                                            variant="flat" @click="isActive.value = false" />
                                                    </v-card-actions>
                                                </v-card>
                                            </v-form>
                                        </template>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-divider />
                        <v-card-text class="overflow-auto" :class="$vuetify.display.mobile ? 'mx-0 px-0' : null">
                            <v-list>
                                <v-skeleton-loader v-if="newPostLoading" :elevation="6" type="card-avatar" />
                                <!-- Display news with images -->
                                <v-list-item v-for="(item, i) in news" :key="i">
                                    <v-card class="mx-auto my-5" color="background" max-width="450">
                                        <v-img :aspect-ratio="16 / 9" cover :src="item.value.imageUrl" />
                                        <v-card-title class="flex-column align-start">
                                            <div class="text-h4 mb-2">
                                                {{ item.value.title }}
                                            </div>
                                            <div class="text-h6 font-weight-regular text-grey">
                                                {{ formatDate(item.value.creationDate) }}
                                            </div>
                                            <div class="d-flex align-center">
                                                <span class="text-body-2 text-grey">{{
                                                    item.value.shortDescription }}</span>
                                            </div>
                                            <v-btn v-if="appStore.isAdmin" class="float-end " color="background"
                                                elevation="0" icon size="sm" @click="deleteNews(item)">
                                                <v-icon size="sm">
                                                    <TrashIcon />
                                                </v-icon>
                                            </v-btn>
                                        </v-card-title>

                                        <v-divider class="mx-4 opacity-30" />

                                        <v-card-text class="d-flex justify-space-between">
                                            <v-chip prepend-icon="mdi-thumb-up">
                                                Likes <v-chip class="ms-1 font-weight-bold" color="secondary"
                                                    density="compact" variant="text">4</v-chip>
                                            </v-chip>
                                            <!-- <v-chip prepend-icon="mdi-alarm-check">
                                                Set alarm
                                            </v-chip> -->
                                            <v-chip variant="text">
                                                View more...
                                            </v-chip>
                                        </v-card-text>
                                    </v-card>
                                </v-list-item>
                                <v-list-item v-for="(item, i) in news" :key="i"
                                    :class="$vuetify.display.mobile ? 'mx-0 px-0' : null">

                                    <!-- eslint-disable-next-line vue/no-parsing-error -->
                                    <v-card class=" w-auto rounded-lg bg-background mx-auto"
                                        :class="!$vuetify.display.mobile ? 'my-3 mx-3' : 'my-3 mx-3'" elevation="5"
                                        max-width="800">
                                        <v-img v-if="item.value.imageUrl" class="rounded-t-lg" cover height="auto"
                                            min-height="200px" :src="item.value.imageUrl">
                                            <template #placeholder>
                                                <v-row align="center" class="fill-height ma-0" justify="center">
                                                    <v-progress-circular color="grey-lighten-5" indeterminate />
                                                </v-row>
                                            </template>
                                        </v-img>

                                        <v-card-title>
                                            {{ item.value.title }}
                                            <v-btn v-if="appStore.isAdmin" class="float-end " color="background"
                                                elevation="0" icon size="sm" @click="deleteNews(item)">
                                                <v-icon size="sm">
                                                    <TrashIcon />
                                                </v-icon>
                                            </v-btn>
                                        </v-card-title>

                                        <v-card-subtitle>
                                            {{ item.value.shortDescription }}
                                        </v-card-subtitle>

                                        <v-card-actions>
                                            <v-btn color="primary" text="More..." />

                                            <v-spacer />

                                            <v-btn :icon="item.value.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                                @click="item.value.show = !item.value.show" />
                                        </v-card-actions>

                                        <v-expand-transition>
                                            <div v-show="item.value.show">

                                                <v-card-text>
                                                    {{ item.value.longDescription }}
                                                </v-card-text>
                                            </div>
                                        </v-expand-transition>
                                    </v-card>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
