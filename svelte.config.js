const sveltePreprocess = require('svelte-preprocess')
const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const postcssNested = require('postcss-nested')

const postcssPlugins = [postcssImport(), postcssPresetEnv(), postcssNested()]

module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      plugins: postcssPlugins,
    },
  }),
}
