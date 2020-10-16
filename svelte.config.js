const sveltePreprocess = require('svelte-preprocess')
const fs = require('fs')
const mediaQueries = fs
  .readFileSync('./src/common-styles/styles-to-prepend.css')
  .toString()

module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      prependData: mediaQueries,
    },
  }),
}
