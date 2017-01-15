import Vuex from 'vuex';
import Vue from 'vue';

const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
  state: {
    items: [],
  },
  actions: {
    getItems({ commit }) {
      Vue.http.get('item')
        .then(res => res.json())
        .then(items => {
          commit("setItems", items);
          return items;
        });
    }
  },
  getters: {

  },
  mutations: {
    setItems(state, payload) {
      state.items = payload;
    }
  },
  strict: !isProduction

})