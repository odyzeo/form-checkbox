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
          :key="key"
          :ref="checkbox.name"
        />
        <input
          class="btn-validate"
          type="submit"
          value="Show selected values">
      </form>
      <pre v-if="values">{{ values }}</pre>
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
      values: null,
    };
  },
  methods: {
    submit() {
      const formData = new FormData(this.$refs.form);
      this.values = Array.from(formData.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
      }), {});
    },
  },
};
</script>

<style lang="less">
@import '../src/less/app.less';
</style>
