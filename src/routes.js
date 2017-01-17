import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import ItemCenter from './components/item-center';
import EditItem from './components/edit-item';
import Item from './components/item';

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
    path     : '/item-center',
    name     : 'item-center',
    component: ItemCenter
  },
  {
    path     : '/edit-item',
    name     : 'editItem',
    component: EditItem
  },
  {
    path     : '/item',
    name     : 'Item',
    component: Item
  },
  
  { path: '*', redirect: { name: 'home' } }];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router