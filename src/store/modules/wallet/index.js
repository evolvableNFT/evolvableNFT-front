import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    chainId: 0x0,
    currentWalletType: null,
    selectedAddress: '',
    userInfo: {
      address: '',
      email: '',
      discord: '',
      twitter: '',
    },
  },
  mutations,
  getters: {
    currentAddress: (state) => state.selectedAddress || '',
    ...getters,
  },
  actions,
}
