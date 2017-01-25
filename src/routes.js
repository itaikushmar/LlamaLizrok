import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from './components/home';
import ItemCenter from './components/item-center';
import EditItem from './components/edit-item';
import ItemDetails from './components/item-details';
import Chat from './components/chat';
import MapView from './components/map-view';

// Vue.http.options.root = 'https://coding-academy.net:3014/llamalizrok/data';
Vue.http.options.root = 'http://localhost:3003/data';

const routes = [{
  path     : '/',
  name     : 'home',
  component: Home
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
    name     : 'ItemDetails',
    component: ItemDetails,
    children: [{path: ':_id', component: ItemDetails}]
  },
  {
    path     : '/chat',
    name     : 'chat',
    component: Chat
  },
  {
    path     : '/map',
    name     : 'mapView',
    component: MapView
  },
  
  { path: '*', redirect: { name: 'home' } }];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router