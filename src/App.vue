<template>
    <div
        id="app"
        class="app"
    >
        <div class="container">
            <form
                ref="form"
                novalidate
                @submit.prevent="submit"
            >
                <h1>Which platforms do you like?</h1>
                <form-checkbox
                    v-for="(checkbox, key) in checkboxes"
                    :key="`${checkbox.name}-${checkbox.value}-${key}-${className}`"
                    v-model="checkbox.value"
                    :class-name="className"
                    :checked.sync="checkbox.checked"
                    :false-value="checkbox.falseValue"
                    :form-errors="formErrors[checkbox.name]"
                    :group-name="$options.GROUP_NAME"
                    :input="checkbox"
                    :true-value="checkbox.trueValue"
                ></form-checkbox>

                <p></p>

                <div
                    v-for="(checkbox, key) in checkboxes"
                    :key="key"
                >
                    <!--eslint-disable vue/no-v-html-->
                    <span v-html="checkbox.label"></span>:
                    {{ checkbox.value }} - {{ checkbox.checked }}
                    <!--eslint-enable vue/no-v-html-->
                </div>

                <p></p>

                <button class="btn-validate">
                    Send
                </button>
                <button
                    class="btn-validate"
                    @click.prevent="validate"
                >
                    Validate
                </button>
                <button
                    class="btn-validate"
                    @click.prevent="clear"
                >
                    Clear
                </button>

                <button
                    class="btn-validate"
                    @click.prevent="toggleClassName"
                >
                    Toggle className
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import FormCheckbox from './components/FormCheckbox';

export default {
    GROUP_NAME: 'group-name',
    name: 'App',
    components: {
        FormCheckbox,
    },
    data() {
        return {
            className: null,
            formErrors: {},
            checkboxes: [
                {
                    name: 'checkbox_ios',
                    label: ' <strong>iOS</strong>',
                    value: '1',
                    html: true,
                    checked: true,
                },
                {
                    name: 'checkbox_android',
                    label: 'Android',
                    readonly: true,
                },
                {
                    name: 'checkbox_windows',
                    label: 'Windows',
                    value: false,
                },
                {
                    name: 'checkbox_ie',
                    label: 'IE',
                    value: false,
                    disabled: true,
                },
                {
                    name: 'checkbox_linux',
                    label: 'Linux',
                    value: '1',
                    falseValue: '0',
                },
                {
                    name: 'checkbox_tesla',
                    label: 'Tesla',
                    value: '',
                    trueValue: 'yes',
                    falseValue: 'no',
                },
                {
                    name: 'checkbox_zeo',
                    label: 'Zeo',
                    value: null,
                    required: true,
                    validatorEvent: 'onInput',
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
        clear() {
            this.$formItem.clear(this.$options.GROUP_NAME);
        },
        toggleClassName() {
            this.className = this.className === 'naked' ? null : 'naked';
        },
        validate() {
            this.$formItem.validate(this.$options.GROUP_NAME);
        },
    },
};
</script>

<style lang="less">
@import '../src/less/app.less';
</style>
