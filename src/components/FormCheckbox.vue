<template>
    <div
        :class="{
            'form-item--error': isErrorClass,
            'is-disabled': input.disabled,
            'is-readonly': input.readonly,
            'is-active': value,
        }"
        class="form-item form-item--checkbox"
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
                :id="input.id"
                :value="trueValue"
                :name="input.name"
                :checked="localValue"
                :disabled="input.disabled"
                :readonly="input.readonly"
                type="checkbox"
                class="form-checkbox__input"
                @change="change"
                @click="preventOnReadonly"
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
                    v-text="translate(input.label)"
                ></span>
            </slot>
        </label>

        <form-errors
            v-if="showFormErrors"
            :form-errors="formErrors"
        ></form-errors>
        <form-errors
            v-else
            :form-errors="errors"
        ></form-errors>
    </div>
</template>

<script>
import { FormErrors, FormItem } from '@odyzeo/form-item';

export default {
    components: { FormErrors },
    extends: FormItem,
    props: {
        checked: {
            type: [Boolean, String],
            default: '1',
        },
        trueValue: {
            type: [Boolean, String],
            default: '1',
        },
        falseValue: {
            type: String,
            default: null,
        },
    },
    computed: {
        showFalseInput() {
            return this.falseValue && !this.value;
        },
    },
    watch: {
        value(value) {
            this.init(value);
        },
    },
    created() {
        this.init(this.value);
    },
    methods: {
        init(value) {
            this.localValue = value === true || value === this.trueValue;
            this.emitChecked();
        },
        emitChecked() {
            this.$emit('update:checked', this.localValue ? this.trueValue : this.falseValue);
        },
        change(ev) {
            this.errors = [];
            this.showFormErrors = false;
            this.validateByEventType(ev.type);

            this.$emit('input', ev.target.checked);
            this.emitChecked();
        },
        preventOnReadonly(event) {
            if (this.input.readonly) {
                event.preventDefault();
            }
        },
        /**
         * Used by FormItem plugin
         */
        validate() {
            this.errors = [];

            if (this.isRequired && !this.localValue) {
                this.errors.push(this.translate(this.requiredMessage));
            }
        },
    },
};
</script>

<style lang="less">
@import '../less/form-checkbox';
</style>
