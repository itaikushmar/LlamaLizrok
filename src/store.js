import Vuex from 'vuex';
import Vue from 'vue';

const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
  state: {
    items: [],
    ctgs: {
      primaryCtgs: [
        'Electronics', 'Furniture', 'Clothing', 'Art', 'Misc'
      ],
      secondaryCtgs: {
        electronics: [
          'Media', 'Computers & Technology', 'Home Electronics', 'Accessories', 'Other'
        ],
        furniture: [
          'Sofas & Chairs', 'Storage Spaces', 'Tables & Desks', 'Other'
        ],
        clothing: [
          'Shirts', 'Pants & Shorts', 'Footware', 'Accessories', 'Other'
        ],
        art: [
          'Paintings', 'Sculptures', 'Other'
        ]
      }
    },
    currFilter: { primaryCtg: 'all', secondaryCtg: 'all' }
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
    filterItems(state) {
      if (state.currFilter.primaryCtg === 'all') {
        return state.items;
      }
      else {
        if (state.currFilter.secondaryCtg === 'all') {
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
    setFilter(state, payload) {
      // ************ why doesn't this work? ************
      // state.currFilter = payload;
      state.currFilter.primaryCtg = payload.primaryCtg;
      state.currFilter.secondaryCtg = payload.secondaryCtg;
    }
  },
  strict: !isProduction
})