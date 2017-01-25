import './style.scss';
import './vendor';
import './vue-plugins';

import Vue from 'vue';
import store from './store';
import router from './routes';
import MainNav from './components/main-nav';
import MainFooter from './components/main-footer';

const app = new Vue({
  data () {
    return {
      show: true
    }
  },
  router,
  store,
  components: {
    MainNav,
    MainFooter
  }
}).$mount('#app');

