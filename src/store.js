import Vuex from 'vuex';
import Vue from 'vue';

const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
  state: {
    items: [],
    currItem: {},
    ctgs: [
      { name: 'Electronics', subs: ['Media', 'Computers & Technology', 'Home Electronics', 'Accessories', 'Other'] },
      { name: 'Furniture', subs: ['Sofas & Chairs', 'Storage Spaces', 'Tables & Desks', 'Other'] },
      { name: 'Clothing', subs: ['Shirts', 'Pants & Shorts', 'Footware', 'Accessories', 'Other'] },
      { name: 'Art', subs: ['Paintings', 'Sculptures', 'Other'] },
      { name: 'Misc' }
    ],
    currFilter: { primaryCtg: 'All', secondaryCtg: 'All' },
    currItemIdx: ''
  },
  actions: {
    getItems({ commit }) {
      Vue.http.get('item')
        .then(res => res.json())
        .then(items => {
          commit("setItems", items);
          return items;
        });
    },
    getCurrItem({ commit  }, itemId) {
      Vue.http.get('item/' + itemId)
        .then(res => res.json())
        .then(item => {
          commit("setItem", item);
          return item;
        });
    }
  },
  getters: {
    filterItems(state) {
      if (state.currFilter.primaryCtg === 'All') {
        return state.items;
      }
      else {
        if (state.currFilter.secondaryCtg === 'All') {
          return state.items.filter(item => item.primaryCtg === state.currFilter.primaryCtg);
        }
        else {
          return state.items.filter(item =>
            item.secondaryCtg === state.currFilter.secondaryCtg &&
            item.primaryCtg === state.currFilter.primaryCtg
          );
        }
      }
    }
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload;
    },
    setItem(state, payload) {
      state.currItem = payload;
    },
    setCurrItemIdx(state, payload) {
      state.currItemIdx = payload;
    },
    setFilter(state, payload) {
      state.currFilter.primaryCtg = payload.primaryCtg;
      state.currFilter.secondaryCtg = payload.secondaryCtg;
    }
  },
  strict: !isProduction
})