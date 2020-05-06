import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});


new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
