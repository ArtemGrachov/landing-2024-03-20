module.exports = {
  map: {
    inline: true,
  },
  plugins: [
    require('autoprefixer')(),
    require('@csstools/postcss-sass')({
      omitSourceMapUrl: true
    }),
  ],
}
