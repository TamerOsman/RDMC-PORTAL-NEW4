<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable vue/script-indent -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue'
import { AddressBookOffIcon } from 'vue-tabler-icons'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import axios from 'axios'
import { setCookie } from '@/utils/cookies'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import logo from '@/components/CustomLogo.vue'

const { global: globalTheme } = useTheme()

const appStore = useAppStore()
interface VForm {
    validate: () => Promise<{ valid: boolean }>;
    resetValidation: () => void;
}

const formRef = ref<VForm | null>(null) // Correctly typed formRef

const router = useRouter()

const { t } = useI18n()

const username = ref('')
const Mobilenumber = ref('')

// const validRef: any = ref(null)

const emailRules = ref([(v: string) => !!v || t('Emailisrequired'), (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'])
const phoneRules = ref([
    (v: string) => !!v || t('Phoneisrequired'),
    (v: string) => /^[0-9]+$/.test(v) || t('Phonenumbermustbevalid'),
    (v: string) => v.length === 11 || t('Phonenumbermustbe11digits'),
])

const checkingCredentials = ref(false)

const dialogTitle = ref('dddd')
const dialogError = ref(false)

const disabledSubmit = ref(true)

const checkValidation = async () => {
    if (formRef.value) {
        const { errors }: any = await formRef.value.validate()
        errors.length < 2 ? disabledSubmit.value = false : disabledSubmit.value = true
    }
}

const validate = async () => {
    dialogTitle.value = t('Checkingyourcredentials')
    checkingCredentials.value = true
    const usernameSmallCaps = username.value.toLowerCase()
    const { data }: any = await axios.post('https://online-payment-api.vercel.app/authenticate/login', { mobile: `2${Mobilenumber.value}`, email: usernameSmallCaps, empId: '' })
    if (!data._id) {
        setTimeout(() => (
            router.push('/error/login')
        ), 3000)
        // dialogError.value = true
        // dialogTitle.value = 'error'
    } else {
        const empID: any = data._id || null
        appStore.addempId(empID)
        await setCookie('empId', empID, 365)
        setTimeout(() => (
            router.push('/auth/token')
        ), 3000)
    }
    formRef.value?.resetValidation()
    return true
}

</script>
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-indent -->
<template>
    <v-dialog v-model="checkingCredentials" max-width="320" persistent>

        <v-list class="py-2 bg-background text-onBackground" elevation="12" rounded="lg">
            <v-list-item>

                <template #title>
                    <p class="ms-2"> {{ dialogTitle }}</p>
                </template>

                <template #prepend>
                    <div>
                        <v-icon color="onBackground" :icon="logo" size="30" />
                        <!-- <v-icon color="primary" size="x-large">
                            <logo :height="50" :width="200" />
                        </v-icon> -->
                    </div>
                </template>

                <template #append>
                    <v-progress-circular v-if="!dialogError" indeterminate="disable-shrink" size="16" width="2" />
                    <v-icon v-else color="error">
                        <AddressBookOffIcon />
                    </v-icon>
                </template>
            </v-list-item>
            <v-list-item v-if="dialogError">
                <v-divider class="my-3 w-100" color="error" />
                <template #append>

                    <div class="w-100 d-flex flex-column justify-center align-center">

                        <div class="w-100 d-flex flex-row justify-center align-center">
                            <v-btn class="mx-3" color="secondary" density="compact"
                                @click="[(checkingCredentials = false), (Mobilenumber = ''), (username = ''), (dialogError = false)]">
                                Try again
                            </v-btn>

                        </div>
                    </div>

                </template>

            </v-list-item>
        </v-list>

    </v-dialog>

    <div>
        <h2 class="text-h2 text-center mb-12 mt-0 text-onBackground text-uppercase">
            {{ t('Mobility') }} <span class="font-weight-light">{{ t('Cairo') }}</span>
        </h2>
        <h2 class="text-h2 font-weight-black mt-8 text-onBackground">{{
            t('Signin')
            }}
        </h2>
        <h5 class="text-disabled  text-h5 mt-3">{{
            t('Enteryourcredentialstocontinue') }}
        </h5>
        <v-form ref="formRef" class="mt-7 loginForm" :class="globalTheme.name.value" @submit.prevent="validate()">

            <v-text-field v-model="Mobilenumber" class="mt-4 mb-8 w-100" color="primary" density="compact"
                :disabled="username != ''" hide-details="auto" :label="t('Mobilenumber')" required :rules="phoneRules"
                variant="outlined" @input="checkValidation" />

            <!-- </v-form> -->
            <v-row>
                <v-col class="d-flex align-center">
                    <v-divider class="custom-devider" />
                    <v-btn class="orbtn text-uppercase" rounded="md" size="small" variant="outlined">{{ t('or')
                        }}</v-btn>
                    <v-divider class="custom-devider" />
                </v-col>
            </v-row>
            <!-- <v-form v-model="emailFormValid" class="mt-7 loginForm" @submit.prevent> -->

            <!-- <h5 class="text-h5 text-center my-4 mb-8">Sign in with Email address</h5> -->

            <v-text-field v-model="username" class="mt-4 mb-8 text-center" color="primary" density="compact"
                :disabled="Mobilenumber != ''" hide-details="auto" :label="t('EmailAddress')" required
                :rules="emailRules" variant="outlined" @input="checkValidation" />

            <v-btn block color="primary" :disabled="disabledSubmit" type="submit">{{ t('submit') }}</v-btn>

        </v-form>

    </div>

</template>

<style lang="scss">
.v-field__field {
    direction: ltr !important;
}

.dark .custom-devider,
.dark .orbtn {
    border-color: rgba(255, 255, 255, 0.08) !important;
}

.light .custom-devider,
.light .orbtn {
    border-color: rgba(0, 0, 0, 0.5) !important;
}

.outlinedInput .v-field {
    box-shadow: none;
}

.dark .outlinedInput .v-field {
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.light .outlinedInput .v-field {
    border: 1px solid rgba(0, 0, 0, 0.5);
}

.orbtn {
    padding: 2px 40px;
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
