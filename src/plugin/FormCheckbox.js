import FormItem from '../components/FormCheckbox.vue';

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
        const index = activeItems.indexOf(item);

        if (index !== -1) {
            activeItems.splice(index, 1);
        }
    }

    function callFunctionOnFormItem(name, functionName) {
        activeItems
            .filter(item => item.groupName !== '' && item.groupName === name)
            .forEach((item) => {
                item[functionName]();
            });
    }

    function getErrors(name) {
        const errors = [];

        activeItems
            .filter(item => item.groupName !== '' && item.groupName === name)
            .forEach((item) => {
                if (item.errors.length > 0) {
                    errors.push(...item.errors);
                }
            });

        return errors;
    }


    event.$on('subscribe', subscribeFormItem);
    event.$on('unsubscribe', unsubscribeFormItem);

    Vue.prototype.$formCheckbox = {
        // methods
        validate(name) {
            callFunctionOnFormItem(name, 'validate');
        },
        clear(name) {
            callFunctionOnFormItem(name, 'clear');
        },
        getErrors(name) {
            return getErrors(name);
        },
        hasErrors(name) {
            return getErrors(name).length > 0;
        },
        trans,

        // properties
        activeItems,
        event,
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
