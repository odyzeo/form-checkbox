# @odyzeo/form-checkbox

Simple input and textarea Vue.js component.

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
import 'FormCheckbox' from '@odyzeo/form-checkbox';
export default {
  components: { FormCheckbox },
}
```

Import styles or make your own.

```
import '@odyzeo/form-checkbox/dist/form-checkbox.css';
```

## Usage

```
<template>
  <h1>Which platforms do you like?</h1>
  <form-checkbox
    v-for="(checkbox, key) in checkboxes"
    :input="checkbox"
    :key="key"
    :ref="checkbox.name"
    @input="selected[checkbox.name] = $event"
  />
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
      selected: { checkbox_android: false, checkbox_ios: false },
      checkboxes: [
        {
          name: 'checkbox_ios',
          label: 'iOS',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'checkbox_android',
          label: 'Android',
          type: 'checkbox',
          required: true,
        },
      ],
    };
  },
};
</script>
```

## Props

### input - required
| property name | type | description |
| --- | --- | --- |
| type | string | 'radio' |
| name | string | name attribute |
| options | array | array of radio options [{ value: 'value', name: 'name' }] |

### value - optional
This is the initial value of the form checkbox.

### trueValue - optional
Default is 'yes'.

### falseValue - optional
Default is 'no'.

### formErrors - optional
Use to display errors from your server/api.

## Events
Component emits 'input' event with value of the element

## CSS classes
*TODO*

## Development

```
npm run serve
```

or

```bash
yarn serve
```
