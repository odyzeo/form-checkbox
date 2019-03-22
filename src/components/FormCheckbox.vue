<template>
    <div
        :class="{
            'form-item--error': isErrorClass,
        }"
        class="form-item"
    >
        <label class="form-checkbox">
            <input
                v-if="showFalseInput"
                :name="input.name"
                :value="falseValue"
                type="hidden"
            >
            <input
                :value="trueValue"
                :id="uid"
                :name="input.name"
                :checked="value"
                type="checkbox"
                class="form-checkbox__input"
                @change="change"
            >
            <span class="form-checkbox__element"></span>
            <span
                v-if="input.html"
                class="form-checkbox__text"
                v-html="input.label"
            ></span>
            <span v-else>
                {{ input.label }}
            </span>
        </label>
        <div v-if="showFormErrors">
            <div
                v-for="(error, key) in formErrors"
                :key="`be_error_${key}`"
                class="form-item__error"
                v-html="error"
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
    },
};
</script>

<style lang="less">
@import '../less/form-checkbox';
</style>
