import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export default {
  namespaced: true,
  state: {
    checked: false,
    hasMetamask: false,
  },
  mutations,
  getters: {
    envChecking: (state) => !state.checked,
    metamaskInjected: (state) => Boolean(state.hasMetamask),
    ...getters,
  },
  actions,
}
