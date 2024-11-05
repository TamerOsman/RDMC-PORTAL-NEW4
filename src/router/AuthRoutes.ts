/* eslint-disable indent */
const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/auth.vue'),
    meta: {
        requiresAuth: false,
    },
    children: [
        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/pages/auth/login.vue'),
        },
        {
            name: 'Token',
            path: '/auth/token',
            component: () => import('@/pages/auth/token.vue'),
        },
        {
            name: 'test',
            path: '/auth/test',
            component: () => import('@/pages/auth/test.vue'),
        },

    ],
}

export default AuthRoutes
