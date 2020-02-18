// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// eslint-disable-next-line import/extensions
import App from './App.vue';
import './plugin';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
