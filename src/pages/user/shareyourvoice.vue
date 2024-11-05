<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { ref } from 'vue'
import { SendIcon } from 'vue-tabler-icons'
import { i18n } from '@/locales/i18n'
import { useI18n } from 'vue-i18n'
import { fbOnvalue, pushData } from '@/utils/firebase'
import { useAppStore } from '@/stores/app'
import { useDate } from 'vuetify'
const date = useDate()
const appStore = useAppStore()
const { t } = useI18n()
const message = ref('')
const anonymous = ref(true)
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
        title: 'Sharingyourvoice',
        disabled: true,
        to: '',
        class: '',
        divider: false,
        icon: '',
    },
]

interface YourMessage {
    message: string;
    creationDate: string;
}
const yourmessages = ref<YourMessage[]>([])
fbOnvalue(`/documents/sharingyourvoice/${appStore.empId}/`, (data: any) => {
    const modifiedData = data.map((item: { value: any }) => item.value)
    yourmessages.value = modifiedData.map((item: any) => {
        return { message: item[i18n.global.locale], creationDate: item.creationDate }
    }).sort((a: any, b: any) => {
        // Convert creationDate to timestamps for comparison
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    })
    // console.log('data', modifiedData)
})
const submit = async () => {
    // alert(message.value)
    if (message.value !== '') {
        const lang: string = i18n.global.locale
        const data: { [key: string]: string } = {}
        data[lang] = message.value
        data.creationDate = date.format(new Date(), 'fullDateTime')
        const result = await pushData(`/documents/sharingyourvoice/${appStore.empId}/`, data)
        message.value = ''
        console.log(result)
    }
}
</script>
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
    <userPage :breadcrumbs="breadcrumbsItems">
        <!-- {{ yourmessages }} -->
        <v-container class=" fill-height">
            <v-row>
                <v-col cols="12" md="7" sm="12">
                    <div title="Share your voice">

                        <h2
                            class="text-h2 text-secondary text-uppercase font-weight-black d-flex flex-column align-center justify-center my-5">
                            <span>
                                {{ t('Sharingyourvoice').split(' ')[0] }}
                                <span class="font-weight-thin">
                                    {{ t('Sharingyourvoice').split(' ').slice(1).join('') }}
                                </span></span>

                            <!-- <LineDashedIcon class="mx-8" /> -->

                            <span class="text-h1 text-primary">
                                {{ t('SHAPINGOURFUTURE').split(' ')[0] }}
                                <span class="font-weight-thin">
                                    {{ t('SHAPINGOURFUTURE').split(' ').slice(1).join('') }}
                                </span></span>
                        </h2>
                        <v-divider class="mx-auto w-50" color="primary" inset />
                        <v-form @submit.prevent="submit">
                            <v-container style="max-width: 600px;">
                                <v-row>
                                    <v-col>
                                        <p class="text-body my-12 text-start"> {{ t('ThisinitiativegivesRDMC') }}</p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-textarea v-model="message" auto-grow class=" w-100" counter
                                            label="Add Message" max-width="600" row-height="25" rows="3" shaped
                                            variant="outlined" />

                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <div class="d-flex w-100">
                                            <v-btn class="me-auto" color="primary" type="submit"><template #prepend>
                                                    <SendIcon />
                                                </template>Send message</v-btn>
                                            <v-checkbox v-model="anonymous" color="primary" label="Anonymous" />
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </div>
                </v-col>
                <v-col class="fill-height" cols="12" md="5" sm="12">
                    <h2 class="text-onBackground text-h2">Your previous messages</h2>
                    <div class="overflow-auto" style="max-height: 50vh;">
                        <v-list class="bg-transparent">
                            <v-list-item v-for="(item, i) in yourmessages" :key="i" class="my-3 bg-background "
                                subtitle="Suggestion" :title="item.creationDate">{{ item.message }}</v-list-item>
                        </v-list>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </userPage>
</template>
