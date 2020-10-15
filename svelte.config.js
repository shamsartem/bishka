const sveltePreprocess = require('svelte-preprocess')
const fs = require('fs')
const mediaQueries = fs
  .readFileSync('./src/assets/css/media-queries.css')
  .toString()

module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      prependData: mediaQueries,
    },
  }),
}
