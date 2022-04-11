import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export default {
  namespaced: true,
  state: {
    nft: {
      baseUri: '',
    },
    dropLength: 0,
  },
  mutations,
  getters: {
    nftBaseUri: (state) => (state.nft && state.nft.baseUri ? state.nft.baseUri : ''),
    ...getters,
  },
  actions,
}
