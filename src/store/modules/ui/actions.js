import * as types from './mutation-types'

export const toggleDrawer = ({ commit, state }, status) => {
  commit(types.TOGGLE_RIGHT_DRAWER, status)
}

export const hiddenDrawer = ({ commit }) => {
  commit(types.HIDE_RIGHT_DRAWER)
}
