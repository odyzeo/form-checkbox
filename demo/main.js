// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// eslint-disable-next-line import/extensions,import/no-unresolved
import App from '~entry';
import plugin from '../src/index';

Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
