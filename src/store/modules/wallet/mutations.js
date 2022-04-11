import * as types from './mutation-types'

export default {
  /**
   *
   * @param {*} state
   * @param {*} walletState
   */
  [types.UPD_WALLET_BASE_STATE](state, walletState = {}) {
    const { selectedAddress, chainId } = walletState
    state.chainId = chainId
    selectedAddress && (state.selectedAddress = selectedAddress)
  },
  [types.SET_CHAINID](state, chainId = 0x0) {
    state = state.chainId = typeof chainId !== 'number' ? parseInt(chainId) : chainId
  },
  [types.UPD_USER_INFO](state, userInfo = {}) {
    const { address = '', email, discord, twitter } = userInfo
    console.log('>>>>>>>>>>>>>>>>', userInfo)
    state.userInfo.address = address
    email && (state.userInfo.email = email)
    discord && (state.userInfo.discord = discord)
    twitter && (state.userInfo.twitter = twitter)
  },
}
