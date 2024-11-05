/* eslint-disable indent */
const PublicRoutes = {
    name: 'HomePage',
    path: '/',
    meta: {
        requiresAuth: true,
    },
    redirect: '/user',
}

export default PublicRoutes
