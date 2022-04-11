import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './biz/api'
import store from './store'
import vuetify from './plugins/vuetify'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Toast from './meta-ui/toast'

import { DropNFTInstance } from '@biz/abi/drop-nft-sdk'

Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$api = api

initStore(store)

const dapp = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

function initStore(store) {
  store.dispatch('web3/checkMetaMask')
  store.dispatch('biz/loadDropList')
}

if (process.env.NODE_ENV === 'development') {
  global.$dapp = dapp
  window.DropNFTInstance = DropNFTInstance
}
