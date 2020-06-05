
// Basics
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
Vue.config.productionTip = false

// Firebase
import { firebase } from './config.js'
import VueFire from 'vuefire'
Vue.use(VueFire)

//PWA
//import './registerServiceWorker'

// Bootstrap 
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt, faEllipsisH, faArrowLeft, faArrowRight, faInfoCircle, faCheck, faCalendar, faUser, faTags, faPlusCircle, faSortAmountDown, faFilter, faPen, faSortNumericUp, faSortNumericDown, faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
library.add(faSyncAlt, faEllipsisH, faCheckSquare, faSquare, faFacebook, faGoogle, faArrowLeft, faArrowRight, faInfoCircle, faCheck, faCalendar, faUser, faTags, faPlusCircle, faSortAmountDown, faFilter, faPen, faSortNumericUp, faSortNumericDown, faSortAlphaUp, faSortAlphaDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import VueTextareaAutosize from 'vue-textarea-autosize'
Vue.use(VueTextareaAutosize)

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateDD', function(value) {
  if (value) {
    return moment(value).format('DD')
  }
})


/*
 *  Start
 */ 

let app = '';

firebase.auth().onAuthStateChanged(async user => {
  if (!app) {
  	var user = await firebase.auth().currentUser;
    app = new Vue({
      router,
      created() {
      	if (!user) {
        	console.log('User not logged in');
      	} else {
      		console.log('User logged in');
      	}
      },
      render: h => h(App)
    }).$mount('#app');
  }
});






