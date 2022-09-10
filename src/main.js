import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(vueCustomElement);
App.store = store;
Vue.customElement('wether-widget', App);
