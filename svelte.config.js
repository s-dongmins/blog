const sveltePreprocess = require('svelte-preprocess');
const autoprefixer = require('autoprefixer');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    compilerOptions: {
        dev: !prod
    },
    emitCss: prod,
    hotReload: !prod,
    preprocess: sveltePreprocess({
        sourceMap: !prod,
        scss: {
            prependData: `@import "src/assets/scss/variables.scss";`
        },
        postcss: {
            plugins: [autoprefixer()]
        }
    })
}