// import { components } from 'vuetify/dist/vuetify-labs.js'

const UsersRoutes = {
  path: '/user',
  meta: {
    requiresAuth: true,
  },
  component: () => import('@/layouts/user.vue'),
  children: [
    {
      name: 'Index',
      path: '/user',
      component: () => import('@/pages/user/home.vue'),
    }, {
      name: 'Home',
      path: '/user/home',
      component: () => import('@/pages/user/home.vue'),
    },
    {
      name: 'Dashboard',
      path: '/user/dashboard',
      component: () => import('@/pages/user/dashboard.vue'),
    }, {
      name: 'EBusinessCard',
      path: '/user/ebusinessCard',
      component: () => import('@/pages/user/EBusinessCard.vue'),
    },
    {
      path: '/user/trainingCenter',
      children: [
        {
          name: 'TrainingCenter',
          path: '/user/trainingCenter',
          component: () => import('@/pages/user/trainingCenter/TrainingCenter.vue'),
        },
        {
          name: 'AddTrainingCenter',
          path: '/user/trainingCenter/add',
          component: () => import('@/pages/user/trainingCenter/AddTraining.vue'),
        },
        {
          name: 'ViewTrainingCenter',
          path: '/user/trainingCenter/:id',
          component: () => import('@/pages/user/trainingCenter/ViewTraining.vue'),
        },
      ],
    },
    {
      path: '/user/newsletters',
      children: [
        {
          name: 'newsletters',
          path: '/user/newsletters',
          component: () => import('@/pages/user/newsletters/newsletters.vue'),
        },
        {
          name: 'addnewsletters',
          path: '/user/newsletters/add',
          component: () => import('@/pages/user/newsletters/addnewsletters.vue'),
        },
      ],
    },
    {
      name: 'shareyourvoice',
      path: '/user/shareyourvoice',
      component: () => import('@/pages/user/shareyourvoice.vue'),
    },
    {
      name: 'lrtdrivers',
      path: '/user/lrtdrivers',
      component: () => import('@/pages/user/lrtdrivers.vue'),
    },
    {
      name: 'dutyTable',
      path: '/user/dutyTable',
      component: () => import('@/pages/user/dutyTable.vue'),
    },
    {
      path: '/user/operations',
      children: [
        {
          path: '/user/operations/lrt_dutyTable',
          children: [
            {
              name: 'opertationsLrtDutyTableView',
              path: '/user/operations/lrt_dutyTable',
              component: () => import('@/pages/user/operations/lrt/dutyTable/view.vue'),
            },
            {
              name: 'opertationsLrtDutySelectedTableView',
              path: '/user/operations/lrt_dutyTable/selectedTable/:day/:month/:year',
              component: () => import('@/pages/user/operations/lrt/dutyTable/selectedTable.vue'),
            },
            {
              name: 'opertationsLrtDutyTableAdmin',
              path: '/user/operations/lrt_dutyTable/admin',
              component: () => import('@/pages/user/operations/lrt/dutyTable/admin.vue'),
            },
          ],
        },

      ],
    },
    {
      path: '/user/hr',
      children: [
        {
          name: 'hr/HRServiceDisk',
          path: '/user/hr/hrservicedisk',
          component: () => import('@/pages/user/hr/HRServiceDisk.vue'),
        },
        {
          name: 'hr/Internalvacancies',
          path: '/user/hr/internalvacancies',
          component: () => import('@/pages/user/hr/Internalvacancies.vue'),
        },
        {
          name: 'hr/hrdocuments',
          path: '/user/hr/hrdocuments',
          component: () => import('@/pages/user/hr/hrdocuments.vue'),
        },
      ],
    },
    {
      name: 'xlstojson',
      path: '/user/xlstojson',
      component: () => import('@/pages/user/xlstojson.vue'),
    },
    {
      name: 'trainingApprover',
      path: '/user/system/admin',
      component: () => import('@/pages/user/system/admin/admin.vue'),
    },
    {
      name: 'safeModeHome',
      path: '/user/safeMode',
      component: () => import('@/pages/user/safeMode/home.vue'),
    },
    {
      path: '/user/policies',
      children: [
        {
          name: 'policies',
          path: '/user/policies',
          component: () => import('@/pages/user/policies/index.vue'),
        },
        {
          name: 'policiesDocument',
          path: '/user/policies/:id',
          component: () => import('@/pages/user/policies/document.vue'),
        },
      ],
    },
  ],
}

export default UsersRoutes
