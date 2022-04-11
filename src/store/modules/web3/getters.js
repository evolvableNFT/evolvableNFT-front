export const hasConnected = (state, getters, rootState) => {
  const {
    wal: { selectedAddress, chainId },
  } = rootState
  return selectedAddress && chainId > 0
}
