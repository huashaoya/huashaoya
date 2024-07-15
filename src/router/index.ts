import { createRouter, createWebHashHistory } from 'vue-router'

import login from '@/views/login.vue'

import userView from '../views/userView.vue';
import userIndex from '../views/userIndex.vue';
import userWork from '../views/userWork.vue';
import userChat from '../views/userChat.vue';
import userInfo from '../views/userInfo.vue';
import userHistory from '../views/userHistory.vue';

import companyView from '../views/companyView.vue';
import companyIndex from '../views/companyIndex.vue';
import companyWork from '../views/companyWork.vue';
import companyChat from '../views/companyChat.vue';
import companyInfo from '../views/companyInfo.vue';
import companyHistory from '../views/companyHistory.vue';

import admin from '../views/admin/index.vue'
import notice from '../views/admin/notice.vue'
import postType from '../views/admin/postType.vue'

const routes = [
  {
    path: '/user',
    component: userView,
    children: [
      {
        path: '',
        component: userIndex,
      },
      {
        path: 'index',
        component: userIndex,
      },
      {
        path: 'work',
        component: userWork,
      },
      {
        path: 'chat',
        component: userChat,
      },
      {
        path: 'info',
        component: userInfo,
      },
      {
        path: 'history',
        component: userHistory,
      },
    ]
  },
  {
    path: '/company',
    component: companyView,
    children: [
      {
        path: '',
        component: userIndex,
      },
      {
        path: 'index',
        component: userIndex,
      },
      {
        path: 'work',
        component: companyWork,
      },
      {
        path: 'chat',
        component: companyChat,
      },
      {
        path: 'info',
        component: companyInfo,
      },
      {
        path: 'history',
        component: companyHistory,
      },
    ]
  },
  { path: '/login', component: login },
  {
    path: '/admin',
    component: admin,
    children: [
      {
        path: '',
        component: notice,
      },
      {
        path: 'notice',
        component: notice,
      },
      {
        path: 'postType',
        component: postType,
      },
    ]

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router