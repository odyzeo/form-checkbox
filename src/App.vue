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
                    :key="`${checkbox.name}-${checkbox.value}-${key}`"
                    v-model="checkbox.value"
                    :input="checkbox"
                    :form-errors="formErrors[checkbox.name]"
                ></form-checkbox>

                <p></p>

                <div
                    v-for="(checkbox, key) in checkboxes"
                    :key="key"
                >
                    <span v-html="checkbox.label"></span>: {{ checkbox.value }}
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
import FormCheckbox from './components/FormCheckbox';

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
                    label: ' <strong>iOS</strong>',
                    value: true,
                    html: true,
                },
                {
                    name: 'checkbox_android',
                    label: 'Android',
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
                    name: 'checkbox_zeo',
                    label: 'Zeo',
                    value: true,
                    readonly: true,
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
