import Vue from 'vue'
import Router from 'vue-router';

import AppHome from './components/AppHome.vue';
import AppInfo from './components/AppInfo';
import AppSelect from "./components/AppSelect";
import AppPractice from "./components/AppPractice";

Vue.use(Router);

export const router = new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      component: AppHome,
    },
    {
      path: '/appinfo',
      component: AppInfo
    },
    {
      path: '/appselect',
      component: AppSelect
    },
    {
      path: '/apppractice',
      component: AppPractice
    }
  ]
});

