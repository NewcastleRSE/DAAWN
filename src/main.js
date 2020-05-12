import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleRight, faLightbulb,faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowCircleRight, faLightbulb, faTimesCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

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
