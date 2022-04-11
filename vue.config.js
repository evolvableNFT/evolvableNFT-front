/* eslint-disable no-unused-vars */
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const isProd = process.env.NODE_ENV === 'production'

// const { R, src } = require('./ci/paths')

const apiProxy = isProd
  ? {
    '/meta': {
      changeOrigin: true,
      ws: true,
      target: 'http://testdrop.ayibyb.com.cn/',
      pathRewrite: {
        '^/meta': '',
      },
    },
  }
  : {
    '/meta': {
      changeOrigin: true,
      ws: true,
      target: 'http://127.0.0.1:3000/',
      pathRewrite: {
        '^/meta': '',
      },
    },
  }

console.log(isProd, apiProxy, "apiProxy")
module.exports = {
  publicPath: process.env.PUBLIC_PATH || '',
  productionSourceMap: isProd,
  transpileDependencies: ['vuetify'],
  devServer: {
    port: process.env.PORT || 37211,
    disableHostCheck: false,
    proxy: {
      ...apiProxy,
    },
  },
  lintOnSave: true,
  // chainWebpack: (config) => {
  //   config.plugin('VuetifyLoaderPlugin').tap((args) => [
  //     {
  //       match(originalTag, { kebaTag, camelTag, path, component }) {
  //         if (kebaTag.startsWith('core-')) {
  //           return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
  //         }
  //       },
  //     },
  //   ])
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '@/assets',
        '@biz': '@/biz',
        '@comp': '@/components',
        '@pages': '@/pages',
        '@ui': '@/meta-ui',
        '@lib': '@/libs',
        '@utils': '@/libs/utils',
        '@store': '@/store',
        '@mocks': '@/mocks',
        '@views': '@/views',
      },
    },

    // plugins: [
    //   new VuetifyLoaderPlugin({
    //     match(originalTag, { kebabTag, camelTag, path, component }) {
    //       if (kebabTag.startsWith('core-')) {
    //         return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
    //       }
    //     },
    //   }),
    // ],
  },
}
