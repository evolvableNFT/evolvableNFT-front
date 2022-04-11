import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export default {
  namespaced: true,
  state: {
    nftList: [],
  },
  mutations,
  getters: {
    ...getters,
  },
  actions,
}
