import { copy } from '@web/rollup-plugin-copy';
import {rollupPluginHTML as html} from '@web/rollup-plugin-html';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = [{
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        json(),
        typescript()
    ]
}, {
    plugins: [
        html({
            input: 'src/player/index.html',
            minify: true,
        }),
        typescript(),
        // Resolve bare module specifiers to relative paths
        resolve(),
        // Optional: copy any static assets to build directory
        copy({
            patterns: ['images/**/*'],
        }),
    ],
    output: {
        dir: 'dist/player',
    },
    preserveEntrySignatures: 'strict',
}];

if (process.env.NODE_ENV !== 'development') {
    config.forEach(conf => conf.plugins.push(terser.default()));
}

export default config;
