<template>
  <div
    id="app"
    class="app">
    <div class="container">
      <form
        ref="form"
        novalidate
        @submit.prevent="submit"
      >
        <h1>Which platforms do you like?</h1>
        <form-checkbox
          v-for="(checkbox, key) in checkboxes"
          :input="checkbox"
          :key="`${checkbox.name}-${checkbox.value}-${key}`"
          v-model="checkbox.value"
          :form-errors="formErrors[checkbox.name]"
        ></form-checkbox>

        <p></p>

        <div
          :key="key"
          v-for="(checkbox, key) in checkboxes"
        >
          {{ checkbox.label }}: {{ checkbox.value }}
        </div>

        <p></p>

        <button class="btn-validate">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import FormCheckbox from './components/FormCheckbox.vue';

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
          label: 'iOS',
          type: 'checkbox',
          required: true,
          value: true,
        },
        {
          name: 'checkbox_android',
          label: 'Android',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'checkbox_windows',
          label: 'Windows',
          type: 'checkbox',
          required: true,
          value: false,
        },
      ],
    };
  },
  methods: {
    submit() {
      this.formErrors = {
        checkbox_android: ['Really?'],
        checkbox_windows: ['Really?'],
      };
    },
  },
};
</script>

<style lang="less">
@import '../src/less/app.less';
</style>
