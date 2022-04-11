import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ui from './modules/ui'
import biz from './modules/biz'
import sol from './modules/sol'
import web3 from './modules/web3'
import wallet from './modules/wallet'
import token from './modules/token'
import nfts from './modules/nfts'

import * as rootGetters from './root-getters.js'
const UPD_HEAD_SCROLL_OVER = 'theme@srcoll/toggle_theme'

export default new Vuex.Store({
  state: {
    metaTitle: 'MetaDrops',
    overHeadTheme: '',
  },
  getters: {
    ...rootGetters,
    metaTitle: (state) => state.metaTitle,
    metaHeadOver: (state) => state.overHeadTheme || '',
  },
  mutations: {
    [UPD_HEAD_SCROLL_OVER](state, overCls = '') {
      state.overHeadTheme = overCls
    },
  },
  actions: {
    setOverCls({ commit }, overCls = '') {
      commit(UPD_HEAD_SCROLL_OVER, overCls)
    },
  },
  modules: {
    ui,
    biz,
    web3,
    wal: wallet,
    sol,
    token,
    nfts,
  },
  strict: process.env.NODE_ENV !== 'production',
})
