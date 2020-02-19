# @odyzeo/form-checkbox

Simple input checkbox Vue.js component.

<a href="https://form-checkbox-8ilmputhy.now.sh" target="_blank">Demo</a>

## Installation

### npm

```
npm install --save @odyzeo/form-checkbox
```

### yarn

```
yarn add @odyzeo/form-checkbox
```

Import component and tell vue to use it as a plugin:

```
import FormCheckbox from '@odyzeo/form-checkbox';

Vue.use(FormCheckbox, {options});
```

Import styles or make your own.

```
import '@odyzeo/form-checkbox/dist/form-checkbox.css';
```

## Usage

```
<template>
  <form-checkbox
    v-for="(checkbox, key) in checkboxes"
    :input="checkbox"
    :key="`${checkbox.name}-${checkbox.value}-${key}`"
    v-model="checkbox.value"
    :form-errors="formErrors[checkbox.name]"
    :group-name="form-checkbox-form-test"
  ></form-checkbox>
</template>
```

```
<script>
export default {
    name: 'App',
    components: {
        FormCheckbox,
    },
    data() {
        return {
            formErrors: {},
            checkboxes: [
                {
                    name: 'checkbox_ios',
                    label: ' <strong>iOS</strong>',
                    value: true,
                    html: true,
                    required: true,
                    validators: [
                        {
                            validator: 'required',
                        },
                    ],
                    groupName: 'form-checkbox-form-test',
                },
                {
                    name: 'checkbox_android',
                    label: 'Android',
                    groupName: 'form-checkbox-form-test',
                },
                {
                    name: 'checkbox_windows',
                    label: 'Windows',
                    value: false,
                    groupName: 'form-checkbox-form-test',
                },
                {
                    name: 'checkbox_ie',
                    label: 'IE',
                    value: false,
                    disabled: true,
                },
                {
                    name: 'checkbox_zeo',
                    label: 'Zeo',
                    value: true,
                    readonly: true,
                },
            ],
        };
    },
};
</script>
```
## Plugin options
| Property name | Type     | Default value | Description                                              |
| ------------- | -------- | ------------- | -------------------------------------------------------- |
| `trans`       | function | `null`        | Enable translating or modifying labels and placeholders. |
| `componentName`| function | `null`     | Change default component name (`form-checkbox`) for template usage |

### Example using vui-i18n
```javascript
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import FormCheckbox from '@odyzeo/form-checkbox';
import App from './App';

Vue.use(VueI18n);

new Vue({
    i18n,
    render: h => h(App),
    created() {
        Vue.use(FormCheckbox, {
            trans: this.$t,
        });
    }
}).$mount('#app');
```

## Props

### input - required
| Property name | Type | Default value | Description |
| ------------- | ---- | ------------- | ----------- |
| `name` | string | | Input `name` attribute |
| `label` | string | `''` | Label name for checkbox |
| `html` | boolean | `false` | Display label with `v-html` |
| `disabled` | boolean | undefined | Add disabled attribute to input |
| `readonly` | boolean | undefined | Add readonly attribute to input |
| `required` | boolean | undefined | Add required attribute to input |
| `validators` | array | `null` | Array holding objects with `validator {string} - name of validator` and `message {string} - error message text` properties |

### value {string} - optional
This is the initial value of the form checkbox.

### trans {Function} - optional
Custom function to translate or modify input label.

### trueValue {string} - optional
Value for checked checkbox. Default: `true`.

### falseValue {string} - optional
Value for unchecked checkbox. Default: `null`.

### formErrors {array} - optional
Array of errors to display.

### groupName {string = ''} - optional 
Set if you need to target one or more form item components with global methods

### trans {Function} - optional 
Custom function to translate or modify input placeholder and label.

## Available validators
- `required` : for custom required message

## Global methods
Methods called on `$formCheckbox` object installed on main Vue instance

### $formCheckbox.validate(name)
- Arguments:
    - `{string} name` Group name of one or multiple form items
    
- Usage: 

    Trigger validation of all form items corresponding to group name argument
   
### $formCheckbox.clear(name)
- Arguments:
    - `{string} name` Group name of one or multiple form items
   
- Usage: 

    Clear inputs and errors on all form items corresponding to group name argument

### $formCheckbox.getErrors(name)
- Arguments:
    - `{string} name` Group name of one or multiple form items
   
- Returns: 
    - Array of errors
   
- Usage: 

    Get all current FE errors of all form items corresponding to group name argument 

### $formCheckbox.hasErrors(name)
- Arguments:
    - `{string} name` Group name of one or multiple form items
   
- Returns: 
    - Boolean indicating whether group of items got errors

## Events
Component emits these events:
- `input` : emits with value of the element

## Slots
| Name   | Description         |
| ---    | ---                 |
| label  | Show custom content |

## Development

```
npm run serve
```

or

```bash
yarn serve
```
