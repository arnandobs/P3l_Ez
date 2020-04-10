import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://localhost:8000/api'

Vue.config.productionTip = false
Vue.use(vuetify)

new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: { App }
}).$mount('#app')
