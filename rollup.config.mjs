import { copy } from '@web/rollup-plugin-copy';
import { generateSW } from 'rollup-plugin-workbox';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
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
    ],
    external: ['figlet', 'ora', 'inquirer', 'youtube-dl-exec', 'fs', 'path', 'sanitize-filename', 'ipfs-http-client'],
}, {
    plugins: [
        html({
            input: 'src/player/index.html',
            minify: true,
            extractAssets: false
        }),
        typescript(),
        resolve(),
        copy({
            patterns: ['images/**/*', 'manifest.webmanifest'],
            rootDir: 'src/player',
        }),
        generateSW({
            globDirectory: 'dist/player',
            swDest: 'dist/player/sw.js',
        })
    ],
    output: {
        dir: 'dist/player'
    },
    preserveEntrySignatures: 'strict',
}];

if (process.env.NODE_ENV !== 'development') {
    config.forEach(conf => conf.plugins.push(terser.default()));
}

export default config;
