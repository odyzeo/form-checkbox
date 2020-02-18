/*!
 * form-checkbox v2.0.0 
 * (c) 2020 
 * Released under the undefined License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.FormCheckbox = factory());
}(this, (function () { 'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    var script = {
      props: {
        input: {
          type: Object,
          required: true
        },
        formErrors: {
          type: [Array, Object],
          default: function _default() {
            return [];
          }
        },
        value: {
          type: [String, Number, Boolean],
          default: false
        },
        trueValue: {
          type: [String, Number, Boolean],
          default: 'yes'
        },
        falseValue: {
          type: [String, Number, Boolean],
          default: null
        },
        trans: {
          type: Function,
          default: null
        }
      },
      data: function data() {
        return {
          errors: [],
          showFormErrors: false
        };
      },
      computed: {
        uid: function uid() {
          // eslint-disable-next-line no-underscore-dangle
          return "form-item-".concat(this._uid);
        },
        isErrorClass: function isErrorClass() {
          return this.errors.length || this.formErrors.length && this.showFormErrors;
        },
        showFalseInput: function showFalseInput() {
          return this.falseValue && !this.value;
        }
      },
      watch: {
        formErrors: function formErrors() {
          this.showFormErrors = true;
        }
      },
      created: function created() {
        this.$formItem.event.$emit('subscribe', this);
      },
      beforeDestroy: function beforeDestroy() {
        this.$formItem.event.$emit('unsubscribe', this);
      },
      methods: {
        change: function change($event) {
          this.showFormErrors = false;
          this.$emit('input', $event.target.checked);
        },
        translate: function translate(key) {
          if (typeof this.trans === 'function') {
            return this.trans.bind(this)(key);
          }

          return key;
        }
      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    function createInjector(context) {
      return function (id, style) {
        return addStyle(id, style);
      };
    }

    var HEAD = document.head || document.getElementsByTagName('head')[0];
    var styles = {};

    function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = {
        ids: new Set(),
        styles: []
      });

      if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (!style.element) {
          style.element = document.createElement('style');
          style.element.type = 'text/css';
          if (css.media) style.element.setAttribute('media', css.media);
          HEAD.appendChild(style.element);
        }

        if ('styleSheet' in style.element) {
          style.styles.push(code);
          style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
        } else {
          var index = style.ids.size - 1;
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    }

    var browser = createInjector;

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-item",class:{
            'form-item--error': _vm.isErrorClass,
            'is-disabled': _vm.input.disabled,
            'is-readonly': _vm.input.readonly,
        }},[_c('label',{staticClass:"form-checkbox"},[(_vm.showFalseInput)?_c('input',{attrs:{"name":_vm.input.name,"disabled":_vm.input.disabled,"readonly":_vm.input.readonly,"type":"hidden"},domProps:{"value":_vm.falseValue}}):_vm._e(),_vm._v(" "),_c('input',{staticClass:"form-checkbox__input",attrs:{"id":_vm.uid,"name":_vm.input.name,"disabled":_vm.input.disabled,"readonly":_vm.input.readonly,"type":"checkbox"},domProps:{"value":_vm.trueValue,"checked":_vm.value},on:{"change":_vm.change}}),_vm._v(" "),_c('span',{staticClass:"form-checkbox__element"}),_vm._v(" "),_vm._t("label",[(_vm.input.html)?_c('span',{staticClass:"form-checkbox__text",domProps:{"innerHTML":_vm._s(_vm.translate(_vm.input.label))}}):_c('span',{staticClass:"form-checkbox__text"},[_vm._v("\n                "+_vm._s(_vm.translate(_vm.input.label))+"\n            ")])])],2),_vm._v(" "),(_vm.showFormErrors)?_c('div',_vm._l((_vm.formErrors),function(error,key){return _c('div',{key:("be_error_" + key),staticClass:"form-item__error",domProps:{"innerHTML":_vm._s(_vm.translate(error))}})}),0):_vm._e()])};
    var __vue_staticRenderFns__ = [];

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-68c4e2ad_0", { source: ".form-checkbox{position:relative;display:block;cursor:pointer}.form-checkbox__element{z-index:1;display:inline-block;width:20px;height:20px;padding:5px;vertical-align:text-top;background:#fff content-box;border:1px solid #8d8d8d;border-radius:2px;transition:all .3s ease}.form-checkbox__input:checked+.form-checkbox__element{background-color:#50bccb}.form-checkbox__input:focus+.form-checkbox__element{border-color:#50bccb}.form-checkbox__input{width:1px;height:1px;opacity:0}.form-item.is-disabled .form-checkbox,.form-item.is-readonly .form-checkbox{opacity:.4}", map: undefined, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject SSR */
      

      
      var FormItem = normalizeComponent_1(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        browser,
        undefined
      );

    // eslint-disable-next-line import/extensions
    var version = '2.0.0';
    var installed = false;

    var install = function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      /**
       * Makes sure that plugin can be installed only once
       */
      if (installed) {
        return;
      }

      var activeItems = [];
      var event = new Vue();
      var defaultComponentName = 'form-checkbox';

      var defaultTrans = function defaultTrans(key) {
        return key;
      };

      var _options$componentNam = options.componentName,
          componentName = _options$componentNam === void 0 ? defaultComponentName : _options$componentNam,
          _options$trans = options.trans,
          trans = _options$trans === void 0 ? defaultTrans : _options$trans;
      /**
       * Functions
       */

      function subscribeFormItem(item) {
        activeItems.push(item);
      }

      function unsubscribeFormItem(item) {
        var index = Plugin.activeItems.indexOf(item);

        if (index !== -1) {
          activeItems.splice(index, 1);
        }
      }

      event.$on('subscribe', subscribeFormItem);
      event.$on('unsubscribe', unsubscribeFormItem);
      Vue.prototype.$formItem = {
        activeItems: activeItems,
        event: event,
        trans: trans
      };
      Vue.component(componentName, FormItem);
      installed = true;
    };

    var plugin = {
      install: install,
      version: version
    };

    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }

    return plugin;

})));
