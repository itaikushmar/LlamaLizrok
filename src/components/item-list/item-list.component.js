import {mapGetters, mapMutations} from 'vuex';
import {ADD_TO_CART} from '../../modules/cart/cart.module';
import {UPDATE_QUANTITY} from '../../modules/shop/shop.module';

import Item from '../item';

export default {
  created () {
    this.$store.dispatch('getItems');
  },
  computed  : {
    items() {
      return this.$store.state.items;
    }
  },
  components: {
    Item
  }

}

