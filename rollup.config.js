import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import css from 'rollup-plugin-css-only';

export default {
    input: 'src/plugin/FormCheckbox.js',
    output: {
        name: 'form-checkbox',
        exports: 'named',
    },
    plugins: [
        commonjs(),
        css({ output: false }),
        vue({
            css: false,
        }),
        buble(),
    ],
};
