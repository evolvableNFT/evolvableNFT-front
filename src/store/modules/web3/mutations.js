import * as types from './mutation-types'

export default {
  [types.SET_METAMASK_INJECTED](state, injected) {
    state.hasMetamask = Boolean(injected)
  },
  [types.SET_ETHEREUM_PROVIDER](state, provider) {
    state.provider = provider || null
  },
  [types.SET_CHECKING_STATE](state, checked) {
    state.checked = Boolean(checked)
  },
}
