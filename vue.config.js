module.exports = {
  configureWebpack:{
    resolve:{
      extensions: [],
      alias:{
        // "@":'src',
        "assets":'@/assets',
        "common":'@/common',
        "components":'@/components',
        "network":'@/network',
        "router":'@/router',
        "store":'@/store',
        "views":'@/views',

      }
    }
  },
  // devServer:{
  //   public:'0.0.0.0:8080',
  //   hot:true,
  //   disableHostCheck:true,
  // }
}