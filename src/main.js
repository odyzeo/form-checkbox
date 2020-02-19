// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import App from './App.vue';
import plugin from './plugin/FormCheckbox';

Vue.config.productionTip = false;
Vue.use(plugin);

new Vue({
    render: h => h(App),
}).$mount('#app');
