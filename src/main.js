import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFlag, faCircleDot, faCircle} from "@fortawesome/free-regular-svg-icons"
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faAngleDown, faGlobe } from "@fortawesome/free-solid-svg-icons"

/* add icons to the library */
library.add(faFlag, faTwitter, faFacebookF, faCircleDot, faCircle,faAngleDown, faGlobe)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

import ECharts from 'vue-echarts';
import "echarts";
Vue.component('v-chart', ECharts);

