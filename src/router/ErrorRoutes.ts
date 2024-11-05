/* eslint-disable indent */
const AuthRoutes = {
    path: '/error',
    component: () => import('@/layouts/error.vue'),
    meta: {
        requiresAuth: false,
    },
    children: [
        {
            path: '/error/login',
            children: [
                {
                    path: '/error/login',
                    component: () => import('@/pages/error/login.vue'),
                },
            ],
        },

    ],
}

export default AuthRoutes
