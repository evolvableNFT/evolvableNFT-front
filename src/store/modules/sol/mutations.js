import * as types from './mutation-types'

export default {
  [types.UPD_NFT_BASE_URI](state, uri) {
    state.nft.baseUri = uri
  },
  [types.UPD_NFT_DROP_LENGTH](state, len = 0) {
    state.dropLength = len
  },
}
