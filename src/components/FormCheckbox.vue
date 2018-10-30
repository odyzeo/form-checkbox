<template>
  <div class="form__checkbox">
    <label class="checkbox">
      <input
        v-if="falseValue && !value"
        :name="input.name"
        :value="falseValue"
        type="hidden"
      >
      <input
        :id="uid"
        :value="trueValue"
        :name="input.name"
        :checked="value"
        class="checkbox__input"
        type="checkbox"
        @change="change"
      >
      <span class="checkbox__element" />
      <span class="checkbox__text">
        {{ input.label }}
      </span>
    </label>
    <div v-if="showFormErrors">
      <div
        v-for="(error, key) in formErrors"
        :key="`be_error_${key}`"
        class="form-item__error"
        v-html="error"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: Object,
      required: true,
    },
    formErrors: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      type: String,
      default: 'yes',
    },
    falseValue: {
      type: String,
      default: 'no',
    },
  },
  data() {
    return {
      showFormErrors: false,
    };
  },
  computed: {
    uid() {
      return `form-item-${this._uid}`;
    },
  },
  watch: {
    formErrors() {
      this.showFormErrors = true;
    },
  },
  methods: {
    change($event) {
      this.showFormErrors = false;
      this.$emit('input', $event.target.checked);
    },
  },
};
</script>

<style lang="less">
@import '../less/checkbox.less';
</style>
