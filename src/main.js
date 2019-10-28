import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource'
// import './assets/css/global.scss';
import wsComponent from './components/index.js'
import storage from './utils/storage'
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(wsComponent);
/* eslint-disable no-new */
window.VM = new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

Vue.prototype.$storage = storage