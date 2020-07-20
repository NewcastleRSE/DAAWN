import Vue from 'vue'
import Router from 'vue-router';

import AppHome from './components/AppHome.vue';
import AppInfo from './components/AppInfo';
import AppSelect from "./components/AppSelect";
import AppPractice from "./components/AppPractice";
import AppInstructions from "./components/AppInstructions";
import AppAssessment from "./components/AppAssessment";
import AppReport from "./components/AppReport";
import AppAssessmentComplete from "./components/AssessmentComplete";
import AppAbout from "./components/AppAbout";

Vue.use(Router);

export const router = new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      component: AppHome,
    },
    {
      path: '/info',
      component: AppInfo
    },
    {
      path: '/about',
      component: AppAbout
    },
    {
      path: '/select',
      component: AppSelect
    },
    {
      path: '/instructions',
      component: AppInstructions
    },
    {
      path: '/practice',
      component: AppPractice
    },
    {
      path: '/assessment/:set',
      component: AppAssessment
    },
    {
      path: '/report',
      component: AppReport
    },
    {
      path: '/assessmentComplete',
      component: AppAssessmentComplete
    }
  ]
});

