<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { getCookie, removeCookie, removeSession, setSession } from '@/utils/cookies'
import { checkLogin, fbLogout } from '@/utils/firebase'
// import { checkLogin } from '@/utils/firebase'
import { ShieldCheckFilledIcon, UserIcon } from 'vue-tabler-icons'
import { useI18n } from 'vue-i18n'
import LoadingMsg from '@/components/loadingMsg.vue'
const { t } = useI18n()

const appStore = useAppStore()
const empIdRef = appStore.empId || getCookie('empId')

const router = useRouter()
const checkingCredentials = ref(false)
const resendPopup = ref(false)

const otp = ref('')

onMounted(async () => {
    const result = await fbLogout()
    console.log('logout status', result)
    removeSession('temptoken')
    if (!empIdRef) router.push('/auth/login')
})
const changeUser = () => {
    appStore.empId = ''
    removeCookie('empId')
    router.push('/auth/login')
}

const resendToken = async () => {
    resendPopup.value = true
    const { data }: any = await axios.post('https://online-payment-api.vercel.app/authenticate/login', { mobile: ``, email: '', empId: appStore.empId })
    if (data._id) {
        setTimeout(() => (
            resendPopup.value = false
        ), 3000)
    }
}
const validate = async () => {
    checkingCredentials.value = true
    try {
        const { data } = await axios.post('https://online-payment-api.vercel.app/authenticate/token', { empId: empIdRef, token: otp.value })
        // const { data } = await axios.post('http://localhost:9003/authenticate/token', { empId: appStore.empId, token: otp.value })
        console.log('appstore', appStore.empId)
        console.log('datas', data)
        // eslint-disable-next-line no-use-before-define
        // console.log('customToken', customTokenData)
        // setCookie('temptoken', data, 365)
        if (data !== '') {
            setSession('temptoken', data)
            appStore.token = data
            appStore.fbUser = await checkLogin(appStore.token) || ''
            // try {
            //     // const uid = appStore.fbUser.user.uid
            //     appStore.userContact = await readData(`users/${appStore.fbUser.user.uid}/`)
            //     // console.log('uid', uid)
            // } catch (e) {
            //     console.log(e)
            //     router.push('/error/login')
            // }
            const toPage = getCookie('lastPage') || '/user/home'
            router.push(toPage)
            // window.location.href = '/user/home'
        } else {
            router.push('/error/login')
        }
        // appStore.fbUser = await checkLogin(data)
        // if (appStore.fbUser) {
        // setCookie('customToken', customTokenData, 365)
        // setCookie('token', otp.value, 365)
        // appStore.customToken = customTokenData
        // appStore.isAuthorized = true
        // window.location.href = '/user/home'
        // }
    } catch (e) {

    }

    // await checkLogin(customToken, (user: any) => {
    //     console.log('user again', user)
    //     setCookie('token', otp.value, 365)
    //     appStore.updateIsAuthorized(true)
    //     appStore.fbUser = user
    //     router.push('/user')
    // })
    // if (user) {

    // }
}
</script>
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-indent -->
<template>

    <LoadingMsg v-model="resendPopup" :dialog-title="t('Checkingyourcredentials')" />

    <v-dialog v-model="checkingCredentials" max-width="320" persistent>

        <v-list class="py-2 bg-background text-onBackground" elevation="12" rounded="lg">
            <v-list-item>

                <template #title>
                    <p> {{ t('appStarting') }}</p>
                </template>

                <template #prepend>

                    <v-icon color="teal" size="40">
                        <ShieldCheckFilledIcon />
                    </v-icon>
                </template>

                <template #append>
                    <v-progress-circular indeterminate="disable-shrink" size="16" width="2" />
                </template>
            </v-list-item>
        </v-list>

    </v-dialog>
    <h2 class="text-h2 text-center mb-12 mt-0 text-onBackground">{{
        t('appName')
        }}
    </h2>
    <div class="d-flex flex-row justify-start align-center my-5 ps-6 ms-12 border-s-lg">
        <v-avatar size="x-large">
            <!-- <v-img cover src="https://cdn.vuetifyjs.com/images/lists/2.jpg" /> -->
            <UserIcon />
        </v-avatar>
        <div class="ms-3">
            <h4 class="text-h4 ">{{ appStore.empId }}</h4>
            <a class="text-body-2 cursor-pointer text-decoration-underline" @click="changeUser">{{ t('ChangeUser')
                }}</a>

        </div>

    </div>

    <v-form class="mt-7 loginForm" @submit.prevent="validate()">
        <v-otp-input v-model="otp" length="6" style="direction: ltr !important;" />
        <p class="text-body-2 text-center cursor-pointer" @click="resendToken"> {{ t('ReSendToken') }} </p>
        <v-btn block class="mt-8" color="primary" type="submit">{{ t('submit') }}</v-btn>
    </v-form>

</template>

<style scoped lang="scss">
.rtlClass h1,
.rtlClass h2,
.rtlClass h3,
.rtlClass h4,
.rtlClass h5,
.rtlClass h6,
.rtlClass .text-h1,
.rtlClass .text-h2,
.rtlClass .text-h3,
.rtlClass .text-h4,
.rtlClass .text-h5,
.rtlClass .text-h6,
.rtlClass .btn,
.rtlClass div,
.rtlClass span,
.rtlClass a,
.rtlClass p,
.rtlClass ul,
.rtlClass li,
.rtlClass img,
.rtlClass table,
.rtlClass button {
    direction: ltr !important;
}

.custom-devider {
    border-color: rgba(0, 0, 0, 0.08) !important;
}

.googleBtn {
    border-color: rgba(0, 0, 0, 0.08);
    margin: 30px 0 20px 0;
}

.outlinedInput .v-field {
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: none;
}

.orbtn {
    padding: 2px 40px;
    border-color: rgba(0, 0, 0, 0.08);
    margin: 20px 15px;
}

.pwdInput {
    position: relative;

    .v-input__append {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
}

.loginForm {
    .v-text-field .v-field--active input {
        font-weight: 500;
    }
}
</style>
