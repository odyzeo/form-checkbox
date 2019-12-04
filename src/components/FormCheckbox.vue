<template>
    <div
        :class="{
            'form-item--error': isErrorClass,
            'is-disabled': input.disabled,
            'is-readonly': input.readonly,
        }"
        class="form-item"
    >
        <label class="form-checkbox">
            <input
                v-if="showFalseInput"
                :name="input.name"
                :value="falseValue"
                :disabled="input.disabled"
                :readonly="input.readonly"
                type="hidden"
            >
            <input
                :value="trueValue"
                :id="uid"
                :name="input.name"
                :checked="value"
                :disabled="input.disabled"
                :readonly="input.readonly"
                type="checkbox"
                class="form-checkbox__input"
                @change="change"
            >
            <span class="form-checkbox__element"></span>
            <slot name="label">
                <span
                    v-if="input.html"
                    class="form-checkbox__text"
                    v-html="translate(input.label)"
                ></span>
                <span
                    v-else
                    class="form-checkbox__text"
                >
                    {{ translate(input.label) }}
                </span>
            </slot>
        </label>
        <div v-if="showFormErrors">
            <div
                v-for="(error, key) in formErrors"
                :key="`be_error_${key}`"
                class="form-item__error"
                v-html="translate(error)"
            ></div>
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
            type: [String, Number, Boolean],
            default: false,
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: 'yes',
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: null,
        },
        trans: {
            type: Function,
            default: null,
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
            // eslint-disable-next-line no-underscore-dangle
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
        translate(key) {
            if (typeof this.trans === 'function') {
                return this.trans.bind(this)(key);
            }

            return key;
        },
    },
};
</script>

<style lang="less">
@import '../less/form-checkbox';
</style>
