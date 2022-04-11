import * as types from './mutation-types'

export default {
  [types.UPD_ADDRESS_NFT_TOKENS](state, list = []) {
    state.nftList = list
  },
}
