import * as types from './mutation-types'

export default {
  [types.UPD_DROP_LIST](state, list) {
    state.drops = list || []
  },
  [types.UPD_CREDENTIALS_LIST](state, list) {
    state.credentials = list || []
  },
  [types.UPD_CREDENTIALS_SELECT](state, list) {
    state.credentialSelect = list || []
  },
  [types.UPD_SKILLS_SELECT](state, list) {
    state.skillSelect = list || []
  },
}
