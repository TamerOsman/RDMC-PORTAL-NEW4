<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/script-indent -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { child, ref as fbRef, get, getDatabase } from 'firebase/database'
import { ClockPauseIcon, FingerprintIcon, MugIcon } from 'vue-tabler-icons'
import { useRouter } from 'vue-router'

const router = useRouter()
const dutytable = ref<any>(null)
const loading = ref(true)

// Define the type for breadcrumb items
interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    href: string;
}

// type ActivityType = 'SON' | 'OPR' | 'MB' | 'PI' | 'D-PRP' | 'W' | 'PRP' | 'PO' | 'SOFF' | 'TRVL' | 'SWP';
interface bgsInt {
    SON: string;
    OPR: string;
    MB: string;
    PI: string;
    'D-PRP': string;
    W: string;
    PRP: string;
    PO: string;
    SOFF: string;
    TRVL: string;
    SWP: string;
}
// Example bgs object with these keys
const bgs: bgsInt = {
    SON: 'bg-primary',
    OPR: 'bg-blue-grey border-thin  elevation-3',
    MB: 'bg-warning text-white',
    PI: 'bg-info',
    'D-PRP': 'bg-info',
    W: 'bg-warning text-white',
    PRP: 'bg-info',
    PO: 'bg-info',
    SOFF: 'bg-error',
    TRVL: 'bg-info',
    SWP: 'bg-info',
}

interface Item {
    duty: string;
    time_start: string;
    time_end: string;
    loc_start: string;
    loc_end: string;
    activity: string;
    bg?: string;
}

const items = ref<BreadcrumbItem[]>([])
onMounted(() => {
    items.value = [
        {
            title: 'appName',
            disabled: false,
            href: 'breadcrumbs_dashboard',
        },
        {
            title: 'LRT Drivers',
            disabled: true,
            href: 'breadcrumbs_link_2',
        },
    ]

    const dbRef = fbRef(getDatabase())
    get(child(dbRef, `/operations/lrt_duty_table`)).then(snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val()

            if (data) {
                // dutytable.value = data
                const dkeys = Object.keys(data)
                const result = dkeys.map((key: string | number) => {
                    const r: any = { value: data[key].data }
                    r.value.id = key
                    return r
                }).reverse()

                const ddkeys = Object.keys(result[0].value)
                const r1 = dutytable.value = ddkeys.map((key: string | number) => {
                    return result[0].value[key]
                })

                let lastendtime = 'xx'
                const consolidatedByDuty = r1.reduce((acc, item: Item) => {
                    if (!acc[item.duty]) {
                        acc[item.duty] = {
                            duty: item.duty,
                            activities: [],
                        }
                    }

                    if (typeof item.time_start !== 'undefined') {
                        const timeString = item.time_start
                        const colonCount = (timeString.match(/:/g) || []).length
                        let trimmedString = timeString
                        if (colonCount === 2) {
                            trimmedString = timeString.substring(0, timeString.lastIndexOf(':'))
                        }
                        item.time_start = trimmedString
                    }
                    if (typeof item.time_end !== 'undefined') {
                        const timeEnd = item.time_end
                        const colonCount = (timeEnd.match(/:/g) || []).length
                        let endTrimmedString = timeEnd
                        if (colonCount === 2) {
                            endTrimmedString = timeEnd.substring(0, timeEnd.lastIndexOf(':'))
                        }
                        item.time_end = endTrimmedString
                    }

                    if (typeof item.activity !== 'undefined') {
                        item.bg = bgs[item.activity as keyof typeof bgs]
                    }

                    if (lastendtime !== item.time_start || item.activity !== 'OPR') {
                        acc[item.duty].activities.push(item)
                    }
                    if (item.activity !== 'OPR') {
                        lastendtime = 'xx'
                    } else {
                        lastendtime = item.time_end
                    }

                    return acc
                }, {})

                loading.value = false
                dutytable.value = Object.values(consolidatedByDuty)
            } else {
                dutytable.value = []
            }
            // console.log(snapshot.val())
        } else {
            console.log('No data available')
        }
    }).catch(error => {
        console.error(error)
    })
})

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
        title: 'LRTDirvers',
        disabled: true,
        to: '',
        class: 'me-auto',
        divider: false,
        icon: '',
    },
]

</script>
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/first-attribute-linebreak -->

<template>
    <userPage :breadcrumbs="breadcrumbsItems">
        <template #breadcrumbs>
            <v-btn color="primary" prepend-icon="mdi-cog"
                @click="router.push('/user/operations/lrt_dutyTable/admin')">Admin</v-btn>
        </template>

        <!-- <v-card class="mb-5">
            <v-breadcrumbs :items="items">
                <template #title="{ item }">
                    {{ t(item.title).toUpperCase() }}
                </template>
                <template #divider>
                    <v-icon icon="mdi-chevron-right" />
                </template>
            </v-breadcrumbs>
        </v-card> -->
        <v-layout class="fill-height  d-flex flex-column overflow-auto">
            <!-- <v-card v-if="appStore.isAdmin">
                <v-card-title class="bg-background2">
                    Create new duty table
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-file-input label="File input" prepend-icon="" variant="outlined" @change="handleFileUpload">
                            <template #prepend-inner>
                                <PaperclipIcon />
                            </template>
                        </v-file-input>
                        <p v-if="jsonData">true</p>
                        <p v-else>false</p>
                        <button @click="downloadPDF">Download PDF</button>
                    </v-container>

                </v-card-text>
            </v-card> -->

            <!-- <pre>
    {{ dutytable }}
</pre> -->
            <!-- <v-skeleton-loader class="my-5" :loading="loading" type="article" /> -->
            <div ref="pdfContent" class="content-to-export">
                <v-container>
                    <v-row v-for="(record, i) in dutytable" :key="i">

                        <!-- <item v-for="(item, ii) in record.activities" :key="ii" :locEnd="item.loc_end"
                    :locStart="item.loc_start" :timeEnd="item.time_end" :timeStart="item.time_start"
                    :vehicleTask="item.vehicle_task || null" /> -->
                        <v-card class=" px-0 pb-8 my-3">
                            <v-card class="text-center text-h1" elevation="0">{{
                                record.activities[0].duty }}</v-card>
                            <v-slide-group class="ps-md-8 mx-auto" selected-class="bg-success" show-arrows
                                style="max-width: 90vw;">
                                <v-slide-group-item v-for="(item, ii) in record.activities" :key="ii">
                                    <div v-if="item.activity == 'MB'"
                                        class="d-flex flex-column justify-center align-center mx-1">
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_start }}
                                        </div>
                                        <div class=" fill-height d-flex flex-column justify-center align-center my-1 px-3 py-1 "
                                            :class="item.bg">
                                            <MugIcon />
                                            Break
                                        </div>
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_end }}
                                        </div>

                                    </div>
                                    <div v-else-if="item.activity == 'D-PRP'"
                                        class="d-flex flex-column justify-center align-center mx-1">
                                        <div class=" fill-height d-flex flex-column justify-center align-center my-1 px-3 py-1 "
                                            :class="item.bg">
                                            <p>D-PRP</p>
                                        </div>
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_end }}
                                        </div>

                                    </div>
                                    <div v-else-if="item.activity == 'PRP'"
                                        class="d-flex flex-column justify-center align-center mx-1">
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_start }}
                                        </div>
                                        <div
                                            class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1 elevation-3">
                                            {{
                                                item.vehicle_task }}</div>
                                        <div class=" fill-height d-flex flex-column justify-center align-center my-1 px-3 py-1 "
                                            :class="item.bg">
                                            <p>PRP</p>
                                        </div>

                                    </div>
                                    <div v-else-if="item.activity == 'W'"
                                        class="d-flex flex-column justify-center align-center mx-1">
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_start }}
                                        </div>
                                        <div class=" fill-height d-flex flex-column justify-center align-center my-1 px-3 py-1 "
                                            :class="item.bg">
                                            <ClockPauseIcon />
                                            Waiting
                                        </div>
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_end }}
                                        </div>

                                    </div>
                                    <div v-else-if="item.activity == 'SON'"
                                        class="d-flex flex-column justify-center align-center mx-1">
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.loc_start }}
                                        </div>
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_start }}
                                        </div>
                                        <div class=" fill-height d-flex flex-column justify-center align-center my-1 px-3 py-1 "
                                            :class="item.bg">
                                            <FingerprintIcon />
                                            S ON
                                        </div>
                                    </div>
                                    <div v-else-if="item.activity == 'SOFF'"
                                        class="d-flex flex-column justify-center align-center mx-1">
                                        <div class=" fill-height d-flex flex-column justify-center align-center my-1 px-3 py-1 "
                                            :class="item.bg">
                                            <FingerprintIcon />
                                            S OFF
                                        </div>
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_end }}
                                        </div>
                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.loc_end }}
                                        </div>
                                    </div>
                                    <div v-else class="d-flex flex-column justify-center align-center mx-1">

                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.loc_start }}
                                        </div>

                                        <div class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_start }}
                                        </div>

                                        <div class=" fill-height d-flex flex-column justify-center align-center my-1 px-3 py-1 "
                                            :class="item.bg">

                                            <!-- <v-btn variant="text"> -->
                                            <FingerprintIcon v-if="item.activity == 'SON' || item.activity == 'SOFF'" />
                                            <MugIcon v-else-if="item.activity == 'MB'" />
                                            <ClockPauseIcon v-else-if="item.activity == 'W'" />
                                            <p v-else-if="item.activity == 'PI'">P/IN</p>
                                            <p v-else-if="item.activity == 'D-PRP'">D-PRP</p>
                                            <p v-else-if="item.activity == 'TRVL'">TRVL</p>
                                            <p v-else-if="item.activity == 'PRP'">PRP</p>
                                            <p v-else-if="item.activity == 'PO'">PO</p>

                                            <!-- <v-img v-else-if="item.activity == 'PRP'" cover :src="trainright" /> -->
                                            <a v-else>{{ item.vehicle_task }}</a>
                                            <!-- </v-btn> -->
                                        </div>
                                        <!-- SON: 'bg-primary',
    OPR: 'bg-transparent border-thin  elevation-3',
    MB: 'bg-info',
    PI: 'bg-info',
    'D-PRP': 'bg-info',
    W: 'bg-info',
    PRP: 'bg-info',
    PO: 'bg-info',
    SOFF: 'bg-error',
    TRVL: 'bg-info',
    SWP: 'bg-info', -->
                                        <div v-if="item.activity != 'SON' && item.activity != 'PRP' && item.activity != 'D-PRP'"
                                            class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.time_end }}
                                        </div>

                                        <div v-if="item.activity != 'SON' && item.activity != 'MB' && item.activity != 'W'"
                                            class=" border-thin d-flex flex-column justify-center align-center my-1 px-3 py-1"
                                            height="30">
                                            {{ item.loc_end }}
                                        </div>
                                    </div>
                                </v-slide-group-item>
                            </v-slide-group>

                        </v-card>
                    </v-row>

                </v-container>

            </div>
        </v-layout>
        <!--  dddd -->
    </userPage>
</template>
