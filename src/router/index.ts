// router/index.ts

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import PublicRoutes from './PublicRoutes'
import UsersRoutes from './UsersRoutes'
import AuthRoutes from './AuthRoutes'
import ErrorRoutes from './ErrorRoutes'
import { useAppStore } from '@/stores/app'
import { getCookie, getSession, setCookie } from '@/utils/cookies'

import { checkLogin } from '@/utils/firebase'
// import axios from 'axios'

interface AppStore {
  empId: string;
  token: string;
  isAuthorized: boolean;
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/NotFound.vue'),
    },
    PublicRoutes,
    UsersRoutes,
    AuthRoutes,
    ErrorRoutes,
  ],
})

router.onError(err => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    console.error('Dynamic import error:', err)
    // Removed reload logic to avoid repeated reloads on failure
  } else {
    console.error(err)
  }
})

router.isReady().then(async () => {
  localStorage.removeItem('vuetify:dynamic-reload')
  // const appStore = useAppStore()
  // appStore.empId = getCookie('empId') || ''
  // appStore.token = getSession('temptoken') || ''
  // console.log('router is ready', appStore.token)
  // try {
  //   appStore.fbUser = await checkLogin(appStore.token)
  //   console.log('fbuser is the following', appStore.fbUser)
  //   if (!appStore.fbUser.user.uid) {
  //     // console.log('faild in is ready try')
  //     router.push('/auth/token')
  //   }
  //   // console.log('the user', appStore.fbUser.user.uid)
  //   appStore.isAuthorized = true
  // } catch (err) {
  //   // console.error(err)
  //   console.log('faild in is ready catch')
  //   router.push('/auth/token')
  // }
})

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore()
  if (!appStore.empId) appStore.empId = getCookie('empId') || ''
  if (to.matched.some(record => record.meta.requiresAuth)) {
    setCookie('lastPage', to.fullPath, 1)
    if (!appStore.empId) router.push('/auth/login')

    if (!appStore.token) appStore.token = getSession('temptoken') || ''
    if (!appStore.token) router.push('/auth/token')

    if (!appStore.fbUser) appStore.fbUser = await checkLogin(appStore.token) || ''
    try {
      if (!appStore.fbUser.user.uid) router.push('/auth/token')
    } catch (err) {
      console.error(err)
    }
    // try {
    //   appStore.fbUser = await checkLogin(appStore.token)
    //   if (!appStore.fbUser.user.uid) {
    //     next('/auth/token')
    //   }
    //   console.log('the user', appStore.fbUser.user.uid)
    //   appStore.isAuthorized = true
    // } catch (err) {
    //   console.error(err)
    //   next('/auth/token')
    // }

    // appStore.token = getCookie('temptoken') || ''
    // if (!appStore.isAuthorized && appStore.token && appStore.token !== '') {
    //   try {
    //     appStore.fbUser = await checkLogin(appStore.token)
    //     console.log('fbuser is', appStore.fbUser)
    //     appStore.isAuthorized = true
    //   } catch (err) {
    //     appStore.isAuthorized = false
    //   }
    // }

    const { empId, token }: AppStore = appStore

    if (!empId || empId === '') {
      next('/auth/login')
      // } else if (to.matched.some(record => record.meta.requiresAuth)) {
    } else if (!token) {
      next('/auth/token')
      // appStore.token = getCookie('token') || ''
      // }

      // if (empId !== '' && token !== '') {
      //   next()
      // } else if (empId !== '') {
      //   next('/auth/token')
      // } else {
      //   next('/auth/login')
      // }
    } else {
      next()
    }
  } else {
    // If no authentication is required, proceed to the next route
    next()
  }
})

export default router
