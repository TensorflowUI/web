// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import Lang from 'vue-lang'
import Icon from 'vue-awesome/components/Icon'
import VueAnalytics from 'vue-analytics'
import VueResource from 'vue-resource'

import * as tf from '@tensorflow/tfjs'
import * as marked from 'marked'
import { Webcam } from '@/assets/js/webcam'
import { ControllerDataset } from '@/assets/js/controller_dataset'
import { guid } from '@/assets/js/guid'

import 'bulma/css/bulma.css'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import 'handsontable/dist/handsontable.full.css'
import './assets/css/style.css'

require('moment/locale/tr')
var locales = {
  'tr': require('./locale/tr.json'),
  'en': require('./locale/en.json')
}

Vue.prototype.$tf = tf
Vue.prototype.$Webcam = Webcam
Vue.prototype.$ControllerDataset = ControllerDataset
Vue.prototype.$guid = guid
Vue.prototype.$marked = marked
Vue.component('v-icon', Icon)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.use(VueMoment, { moment })
Vue.use(Lang, {lang: 'en', locales: locales})
Vue.use(VueAnalytics, {
  id: 'UA-22805990-31',
  router,
  checkDuplicatedScript: true
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
