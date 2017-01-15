import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import ItemList from './components/item-list';
import Cart from './components/cart';
import EditItem from './components/edit-item';

Vue.http.options.root = 'http://localhost:3003/data'

const routes = [{
  path     : '/',
  name     : 'home',
  component: Home
}, {
  path     : '/signin',
  name     : 'signin',
  component: Signin
},
  {
    path     : '/signup',
    name     : 'signup',
    component: Signup
  },
  {
    path     : '/item-list',
    name     : 'item-list',
    component: ItemList
  },
  {
    path     : '/cart',
    name     : 'cart',
    component: Cart
  },
  {
    path     : '/edit-item',
    name     : 'editItem',
    component: EditItem
  },
  
  { path: '*', redirect: { name: 'home' } }];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router