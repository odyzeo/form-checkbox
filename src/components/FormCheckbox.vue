<template>
    <div :class="componentClassName">
        <label :class="$options.CLASS_NAME.label">
            <input
                v-if="showFalseInput"
                :disabled="input.disabled"
                :name="input.name"
                :readonly="input.readonly"
                :value="falseValue"
                type="hidden"
                @click="preventOnReadonly"
            >
            <input
                :id="input.id"
                :checked="localValue"
                :class="$options.CLASS_NAME.input"
                :disabled="input.disabled"
                :name="input.name"
                :readonly="input.readonly"
                :value="trueValue"
                type="checkbox"
                @change="change"
                @click="preventOnReadonly"
            >
            <span :class="$options.CLASS_NAME.element"></span>
            <slot name="label">
                <!--eslint-disable vue/no-v-html-->
                <span
                    v-if="input.html"
                    :class="$options.CLASS_NAME.text"
                    v-html="translate(input.label)"
                ></span>
                <!--eslint-enable vue/no-v-html-->
                <span
                    v-else
                    :class="$options.CLASS_NAME.text"
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
        componentClassName() {
            return {
                [this.getClassName()]: true,
                [this.getClassName(null, 'error')]: this.isErrorClass,
                [this.getClassName(null, 'disabled')]: this.input.disabled,
                [this.getClassName(null, 'readonly')]: this.input.readonly,
                [this.getClassName(null, 'active')]: this.value,
            };
        },
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
        this.initClassName();
    },
    methods: {
        init(value) {
            this.localValue = value === true || value === this.trueValue;
            this.emitChecked();
        },
        initClassName() {
            this.$options.CLASS_NAME = {
                element: this.getClassName('element'),
                input: this.getClassName('input'),
                label: this.getClassName('label'),
                text: this.getClassName('text'),
            };
        },
        emitChecked() {
            this.$emit('update:checked', this.localValue ? this.trueValue : this.falseValue);
        },
        getClassName(element = null, modifier = null) {
            let className = this.className ?? 'form-checkbox';
            if (element) {
                className = `${className}__${element}`;
            }
            if (modifier) {
                className = `${className}--${modifier}`;
            }
            return className;
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
