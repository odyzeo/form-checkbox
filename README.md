# @odyzeo/form-checkbox

Simple input checkbox Vue.js component.

## Installation

### npm

```
npm install --save @odyzeo/form-checkbox
```

### yarn

```
yarn add @odyzeo/form-checkbox
```

Import component in your where you want to use it and register it:

```
import FormCheckbox from '@odyzeo/form-checkbox';
export default {
  components: {
    FormCheckbox,
  },
}
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
  ></form-checkbox>
</template>
```

```
<script>
import FormCheckbox from '@odyzeo/form-checkbox'

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
                },
                {
                    name: 'checkbox_android',
                    label: 'Android',
                },
                {
                    name: 'checkbox_windows',
                    label: 'Windows',
                    value: false,
                },
            ],
        };
    },
};
</script>
```

## Props

### input - required
| Property name | Type | Default value | Description |
| ------------- | ---- | ------------- | ----------- |
| `name` | string | | Input `name` attribute |
| `label` | string | `''` | Label name for checkbox |
| `html` | boolean | `false` | Display label with `v-html` |

### value {string} - optional
This is the initial value of the form checkbox.

### trueValue {string} - optional
Value for checked checkbox. Default: `yes`.

### falseValue {string} - optional
Value for unchecked checkbox. Default: `null`.

### formErrors {array} - optional
Array of errors to display.

## Events
Component emits 'input' event with value of the element

## Development

```
npm run serve
```

or

```bash
yarn serve
```
