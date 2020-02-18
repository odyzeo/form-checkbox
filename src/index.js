import FormItem from './components/FormCheckbox.vue';

const version = '__VERSION__';
let installed = false;

const install = (Vue, options = {}) => {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (installed) {
        return;
    }

    const activeItems = [];
    const event = new Vue();
    const defaultComponentName = 'form-checkbox';
    const defaultTrans = key => key;
    const {
        componentName = defaultComponentName,
        trans = defaultTrans,
    } = options;

    /**
     * Functions
     */
    function subscribeFormItem(item) {
        activeItems.push(item);
    }

    function unsubscribeFormItem(item) {
        const index = Plugin.activeItems.indexOf(item);

        if (index !== -1) {
            activeItems.splice(index, 1);
        }
    }

    event.$on('subscribe', subscribeFormItem);
    event.$on('unsubscribe', unsubscribeFormItem);

    Vue.prototype.$formItem = {
        activeItems,
        event,
        trans,
    };
    Vue.component(componentName, FormItem);

    installed = true;
};

const plugin = {
    install,
    version,
};

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}
