export const dropItems = (state) => {
  return state.drops || []
}

export const getDropDetail = (state, id) => {
  const drops = state.drops || []
  const detail = drops.find((d) => d.dropid === id || d.dropid === parseInt(id))
  return detail || {}
}

export const credentialsItems = (state) => {
  return state.credentials || []
}

export const getCredentialsDetail = (state, id) => {
  const credentials = state.credentials || []
  const detail = credentials.find((d) => d.id === id || d.id === parseInt(id))
  return detail || {}
}

export const credentialsSelect = (state) => {
  return state.credentialSelect || []
}

export const skillsSelect = (state) => {
  return state.skillSelect || []
}