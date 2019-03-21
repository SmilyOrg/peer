import Vue from 'vue';
import Vuetify from 'vuetify';
import VueVirtualScroller from 'vue-virtual-scroller';

import 'vuetify/dist/vuetify.min.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify, {
  iconfont: 'fa',
});
Vue.use(VueVirtualScroller);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
