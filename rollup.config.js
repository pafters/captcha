import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import css from 'rollup-plugin-css-only';

import packageJson from "./package.json";

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: packageJson.main,
                forma: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/index.js',
                format: 'cjs'
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named'
            },
        ],
        external: [/\.css$/],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react']
            }),
            external(),
            resolve(),
            postcss({
                plugins: [],
                extract: true,
                modules: true,
                minimize: true,
                sourceMap: true
            }),
            css({ output: 'bundle.css' }) // добавляем плагин css-only
        ],
    },
];