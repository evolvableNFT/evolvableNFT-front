import * as types from './mutation-types'

import api from '@biz/api'

/**
 *
 * @param {*} param0
 * @param {*} state
 */
export const setWalletState = ({ commit }, state = {}) => {
  commit(types.UPD_WALLET_BASE_STATE, state)
}

export const updateUserInfo = ({ commit }, userInfo = {}) => {
  commit(types.UPD_USER_INFO, userInfo)
}

export const loadUserInfo = ({ commit, state }, selectedAddress) => {
  if (selectedAddress || state.selectedAddress) {
    console.log('selectedAddress>>>', selectedAddress)
    const addr = selectedAddress || state.selectedAddress

    api('user.getAddress', { address: addr })
      .then((resp) => {
        const { code, msg, data } = resp
        console.log('Get regist>>>>', msg, data)
        if (code === 0 && data && data.length) {
          commit(types.UPD_USER_INFO, data[0])
        } else {
          throw new Error(msg || 'unregisted or unfund user address')
        }
      })
      .catch((ex) => {
        console.log('get address regist info fail', ex.message)
      })
  }
}

export const queryMyBalance = async ({ commit }, chainId) => {}
