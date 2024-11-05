<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserPage from '@/components/user/userPage.vue'
// import newsletter from '@/pages/user/components/newsletter.vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
// import { i18n } from '@/locales/i18n'
// import { useI18n } from 'vue-i18n'
import { ref as fbRef, getDatabase, onValue } from 'firebase/database'
import { deleteRecord, deleteStorage, getGrade6 } from '@/utils/firebase'
// import { gsapRdmc } from '@/utils/gsap'
// import { getStorage } from 'firebase/storage'
const router = useRouter()
const appStore = useAppStore()
const db = getDatabase()
// const storage = getStorage() // Firebase storage instance
const collectionRef = fbRef(db, '/news')
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
const news = ref<any>(null)
// const users = ref<any>(null)
const wishImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrp9j37RSJn3J-zbNdR7mIE1buUfRFGrBHA&s',
    'https://cdnjs.angroos.com/wp-content/uploads/2024/01/Birthday-cake-with-lit-candles.jpg',
    'https://colorsforearth.com/wp-content/uploads/2020/11/surprise-happy-birthday-gifts-5.jpg',
]
onMounted(() => {
    // gsapRdmc()
    getGrade6((usersArray: any) => {
        news.value = usersArray.map((item: any) => {
            const wishImagesId = Math.floor(Math.random() * wishImages.length)
            const result = {
                key: '123',
                value: {
                    createdBy: 'RDMC0187',
                    creationDate: '2024-10-02T07:06:43.719Z',
                    imageName: '',
                    imageUrl: wishImages[wishImagesId],
                    longDescription: `${item.firstName} ${item.lastName} is our colleague from  ${item.entity} ${item.department} department`,
                    shortDescription: `${item.firstName} ${item.lastName} is our colleague from  ${item.entity} ${item.department} department`,
                    show: false,
                    title: `${item.firstName} ${item.lastName} birthday`,
                    id: '-O8B2NQRAU8',
                },
            }

            return result
        })
        onValue(collectionRef, snapshot => {
            const data = snapshot.val()
            if (data) {
                const dkeys = Object.keys(data)
                dkeys.map((key: string | number) => {
                    const r: any = { key, value: data[key] }
                    r.value.id = key
                    return r
                }).reverse().map((item: any) => {
                    news.value.push(item)
                    return item
                })
            } else {
                news.value = []
            }
        })
    })
})

const deleteNews = async (item: any) => {
    await deleteStorage(item.value.imageName)
    deleteRecord(`/news/${item.key}`)
}

</script>
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-indent -->
<template>
    <UserPage :breadcrumbs="breadcrumbsItems">
        <template #breadcrumbs>
            <v-menu location="bottom">
                <template #activator="{ props }">
                    <v-icon size="20" v-bind="props">mdi-dots-vertical</v-icon>
                </template>
                <v-list>
                    <v-list-item prepend-icon="mdi-heart-plus">
                        <v-list-item-title>Add to favourites</v-list-item-title>
                    </v-list-item>
                    <v-hover>
                        <template #default="{ isHovering, props }">
                            <v-list-item v-if="appStore.isAdmin" v-bind="props"
                                :class="isHovering ? 'text-primary' : ''" prepend-icon="mdi-file-plus"
                                @click="goto('/user/newsletters/add')">
                                <v-list-item-title>Add news</v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-hover>
                </v-list>
            </v-menu>
        </template>
        <!-- <newsletter class="overflow-auto" max-height="70vh" /> -->
        <!-- <pre>
    {{ news }}
</pre> -->

        <v-list class="bg-transparent">
            <v-list-item v-for="(item, i) in news" :key="i" :class="$vuetify.display.mobile ? 'mx-0 px-0 py-0' : null">

                <!-- eslint-disable-next-line vue/no-parsing-error -->
                <v-card class=" w-auto  bg-background mx-auto"
                    :class="!$vuetify.display.mobile ? 'my-3 mx-3 rounded-lg elevation-5' : 'my-0 mx-3 elevation-0 border-b-thin'"
                    max-width="800">
                    <v-img v-if="item.value.imageUrl" :class="!$vuetify.display.mobile ? 'rounded-t-lg my-0' : ''" cover
                        height="auto" min-height="200px" :src="item.value.imageUrl">
                        <template #placeholder>
                            <v-row align="center" class="fill-height ma-0" justify="center">
                                <v-progress-circular color="grey-lighten-5" indeterminate />
                            </v-row>
                        </template>
                    </v-img>

                    <v-card-title>
                        {{ item.value.title }}
                        <v-btn v-if="appStore.isAdmin" class="float-end " color="background" elevation="0"
                            icon="mdi-delete" size="sm" @click="deleteNews(item)" />
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
    </UserPage>
</template>
