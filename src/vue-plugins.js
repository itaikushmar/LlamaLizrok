import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';
import Toastr from 'vue-toastr';
import * as jQuery from 'jquery';
import GoogleMaps from 'google-maps/lib/Google.js';

// window.jQuery = jQuery;
// import * as LatLngPicker from 'gmap/js/jquery-gmaps-latlon-picker.js';



Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.component('vue-toastr', Toastr);

