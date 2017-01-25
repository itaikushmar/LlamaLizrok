import './style.scss';
import './vendor';
import './vue-plugins';

import Vue from 'vue';
import store from './store';
import router from './routes';
import MainNav from './components/main-nav';
import MainFooter from './components/main-footer';

window.eventBus = new Vue();

window.eventBus.$on('goToItemDet', itemId => {
  //  console.log('itemId', itemId);
  //  this.$router.push(`item/${itemId}`);
   router.push({ name: 'ItemDetails', params: { itemId: itemId } })
});

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

