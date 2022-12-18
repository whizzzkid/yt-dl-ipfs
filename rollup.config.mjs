import { copy } from '@web/rollup-plugin-copy';
import { generateSW } from 'rollup-plugin-workbox';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import autoExternal from 'rollup-plugin-auto-external';
import json from '@rollup/plugin-json';
import minifyHTML from 'rollup-plugin-minify-html-template-literals'
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = [{
    input: 'src/index.ts',
    output: {
        'banner': '#!/usr/bin/env node',
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        autoExternal(),
        json(),
        typescript(),
    ]
}, {
    plugins: [
        html({
            input: 'src/player/index.html',
            minify: true,
            extractAssets: false
        }),
        minifyHTML(),
        typescript(),
        resolve(),
        copy({
            patterns: ['images/**/*', 'manifest.webmanifest'],
            rootDir: 'src/player'
        })
    ],
    output: {
        dir: 'dist/player'
    },
    preserveEntrySignatures: 'strict',
}];

if (process.env.NODE_ENV !== 'development') {
    config.forEach(conf => conf.plugins.push(terser.default({
        format: {
            comments: false
        },
    })));
    // add service worker only for non-dev builds.
    config[1].plugins.push(generateSW({
        globDirectory: 'dist/player',
        swDest: 'dist/player/sw.js'
    }));
}

export default config;
