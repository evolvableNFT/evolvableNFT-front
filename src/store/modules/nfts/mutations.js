import * as types from './mutation-types'

export default {
  [types.UPD_NFTS_LIST](state, list) {
    state.nfts = list || []
  },
}
