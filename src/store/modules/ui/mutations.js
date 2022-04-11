import * as types from './mutation-types'

export default {
  /**
   *
   * @param {*} state
   * @param {*} walletState
   */
  [types.TOGGLE_RIGHT_DRAWER](state, status) {
    if (status !== undefined) {
      state.drawer = Boolean(status)
    } else {
      state.drawer = !state.drawer
    }
  },
  [types.HIDE_RIGHT_DRAWER](state) {
    state.drawer = false
  },
}
