import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    xsHideCls: 'd-none d-sm-flex',
    xsShowCls: 'd-flex d-sm-none',
    dense: false,
    drawer: false,
    drops: [],
  },
  mutations,
  getters: {
    rightDrawer: (state) => Boolean(state.drawer),
    ...getters,
  },
  actions,
}
