import detectEthereumProvider from '@metamask/detect-provider'

import * as types from './mutation-types'

/**
 *
 * @param {*} param0
 * @param {*} hasMetamask
 */
export const checkMetaMask = async ({ commit }) => {
  try {
    commit(types.SET_CHECKING_STATE, false)
    const provider = await detectEthereumProvider({ silent: true, timeout: 2000 })

    if (provider && provider.isMetaMask) {
      // commit(types.SET_ETHEREUM_PROVIDER, provider)
      commit(types.SET_METAMASK_INJECTED, true)
    }
    commit(types.SET_CHECKING_STATE, true)
  } catch (ex) {
    console.log('>>>>>>>>>>>checkMetaMask>>>>>>>>>>>>', ex)
    commit(types.SET_CHECKING_STATE, true)
  } finally {
    commit(types.SET_CHECKING_STATE, true)
  }
}

export const setMetamaskState = async ({ commit, dispatch }, hasMetamask = false) => {}
