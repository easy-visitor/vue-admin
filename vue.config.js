module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // data: '@import "@/scss/settings.scss";'
        prependData: `@import "@/scss/base.scss";`
      }
    }
  }
}
