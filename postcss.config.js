module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-preset-env')({ stage: 0 }),
    process.env.NODE_ENV === 'production' &&
      require('cssnano')({
        preset: ['default', { discardComments: { removeAll: true } }],
      }),
  ].filter(Boolean),
}
