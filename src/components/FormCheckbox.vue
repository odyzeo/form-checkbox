<template>
    <div
        :class="{
            'form-item--error': isErrorClass,
            'is-disabled': input.disabled,
            'is-readonly': input.readonly,
            'is-active': value,
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
                @click="preventOnReadonly"
            >
            <input
                :id="uid"
                :value="trueValue"
                :name="input.name"
                :checked="value"
                :disabled="input.disabled"
                :readonly="input.readonly"
                :required="input.required"
                type="checkbox"
                class="form-checkbox__input"
                @change="change"
                @click="preventWhenReadonly"
            >
            <span class="form-checkbox__element"></span>
            <slot name="label">
                <!--eslint-disable vue/no-v-html-->
                <span
                    v-if="input.html"
                    class="form-checkbox__text"
                    v-html="translate(input.label)"
                ></span>
                <!--eslint-enable vue/no-v-html-->
                <span
                    v-else
                    class="form-checkbox__text"
                >
                    {{ translate(input.label) }}
                </span>
            </slot>
        </label>

        <!--eslint-disable vue/no-v-html-->
        <template v-if="showFormErrors">
            <div
                v-for="(error, key) in formErrors"
                :key="`be_error_${key}`"
                class="form-item__error"
                v-html="translate(error)"
            ></div>
        </template>
        <div v-else>
            <div
                v-for="(error, key) in errors"
                :key="`fe_error_${key}`"
                class="form-item__error"
                v-html="error"
            ></div>
        </div>
        <!--eslint-enable vue/no-v-html-->
    </div>
</template>

<script>
import VALIDATORS from '../constants/validators';

export default {
    props: {
        groupName: {
            type: String,
            default: '',
        },
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
            default: true,
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
            showFormErrors: (this.formErrors.length > 0),
            inputValidators: null,
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
        getType() {
            return type => type.split(':')[0];
        },
        validator() {
            return type => this.inputValidators
                && this.inputValidators
                    .find(validator => this.getType(validator.validator) === type);
        },
        requiredMessage() {
            return (this.validator('required') && this.validator('required').message)
                || VALIDATORS.required.message;
        },

    },
    watch: {
        formErrors() {
            this.showFormErrors = true;
        },
    },
    created() {
        this.$formCheckbox.event.$emit('subscribe', this);
    },
    mounted() {
        this.inputValidators = this.input.validators || null;
    },
    beforeDestroy() {
        this.$formCheckbox.event.$emit('unsubscribe', this);
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
        preventWhenReadonly(event) {
            if (this.input.readonly) {
                event.preventDefault();
            }
        },
        validate(scroll = false) {
            this.errors = [];
            if (
                this.input.required
                && (!this.value || this.value === '')
            ) {
                this.errors.push(this.translate(this.requiredMessage));
            }
            if (scroll && this.errors.length) {
                this.$el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        },
        clear() {
            this.$emit('input', null);
            this.errors = [];
            this.showFormErrors = false;
        },
    },
};
</script>

<style lang="less">
  @import '../less/form-checkbox';
</style>
