const fs = require('fs')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-preset-env')({ stage: 0 }),
  ],
  prependData: fs.readFileSync('src/styles/prepend.css').toString(),
}
