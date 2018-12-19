<template>
  <div
    class="form-item"
    :class="{
      'form-item--error': isErrorClass,
    }"
  >
    <div class="form__checkbox">
      <label class="checkbox">
        <input
          type="hidden"
          :name="input.name"
          :value="falseValue"
          v-if="showFalseInput"
        >
        <input
          type="checkbox"
          class="checkbox__input"
          :value="trueValue"
          :id="uid"
          :name="input.name"
          :checked="value"
          @change="change"
        >
        <span class="checkbox__element"></span>
        <span class="checkbox__text">
        {{ input.label }}
      </span>
      </label>
      <div v-if="showFormErrors">
        <div
          class="form-item__error"
          :key="`be_error_${key}`"
          v-for="error in formErrors"
          v-html="error"
        ></div>
      </div>
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
      type: [Array, Object],
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: false,
    },
    trueValue: {
      type: [String, Number],
      default: 'yes',
    },
    falseValue: {
      type: [String, Number],
    },
  },
  data() {
    return {
      errors: [],
      showFormErrors: false,
    };
  },
  computed: {
    uid() {
      return `form-item-${this._uid}`;
    },
    isErrorClass() {
      return this.errors.length || (this.formErrors.length && this.showFormErrors);
    },
    showFalseInput() {
      return this.falseValue && !this.value;
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
@import '../less/form-item.less';
@import '../less/checkbox.less';
</style>
