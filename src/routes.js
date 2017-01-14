import VueRouter from 'vue-router';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import Shop from './components/shop';
import Cart from './components/cart';
import AddItem from './components/item-get';

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
    path     : '/shop',
    name     : 'shop',
    component: Shop
  },
  {
    path     : '/cart',
    name     : 'cart',
    component: Cart
  },
  {
    path     : '/item-get',
    name     : 'addItem',
    component: AddItem
  },
  
  { path: '*', redirect: { name: 'home' } }];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router