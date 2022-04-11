export const nftsItems = (state) => {
  return state.nfts || []
}

export const getNftDetail = (state, id) => {
  const nfts = state.nfts || []
  const detail = nfts.find((d) => d.tokenId === id || d.tokenId === parseInt(id))
  return detail || {}
}
