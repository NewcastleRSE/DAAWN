import Vue from 'vue'
import Router from 'vue-router';

import AppHome from './components/AppHome.vue';
import AppInfo from './components/AppInfo';
import AppSelect from "./components/AppSelect";
import AppPractice from "./components/AppPractice";
import AppInstructions from "./components/AppInstructions";
import CopyTaskInstructions from "./components/CopyTaskInstructions";
import AppAssessment from "./components/AppAssessment";
import CopyTaskAssessment from "./components/CopyTaskAssessment";
import CopyTaskAssessmentComplete from "./components/CopyTaskAssessmentComplete";
import CopyTaskReport from "./components/CopyTaskReport";
import FreeTaskInstructions from "./components/FreeTaskInstructions";
import FreeTaskAssessment from "./components/FreeTaskAssessment";
import FreeTaskAssessmentComplete from "./components/FreeTaskAssessmentComplete";
import FreeTaskReport from "./components/FreeTaskReport";
import AppReport from "./components/AppReport";
import AppAssessmentComplete from "./components/AssessmentComplete";
import AppAbout from "./components/AppAbout";
import AppFAQs from "./components/AppFAQs";
import ChooseImageSet from "./components/ChooseImageSet";

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
      path: '/faqs',
      component: AppFAQs
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
      path: '/ctinstructions',
      component: CopyTaskInstructions
    },
    {
      path: '/ftinstructions',
      component: FreeTaskInstructions
    },
    {
      path: '/chooseimageset',
      component: ChooseImageSet
    },
    {
      path: '/practice',
      component: AppPractice
    },
    {
      path: '/assessment/:set?',
      component: AppAssessment
    },
    {
      path: '/ctassessment',
      component: CopyTaskAssessment
    },
    {
      path: '/ftassessment',
      component: FreeTaskAssessment
    },
    {
      path: '/report',
      component: AppReport
    },
    {
      path: '/ctreport',
      component: CopyTaskReport
    },
    {
      path: '/ftreport',
      component: FreeTaskReport
    },
    {
      path: '/assessmentComplete',
      component: AppAssessmentComplete
    },
    {
      path: '/ctAssessmentComplete',
      component: CopyTaskAssessmentComplete
    },
    {
      path: '/ftAssessmentComplete',
      component: FreeTaskAssessmentComplete
    }
  ]
});

