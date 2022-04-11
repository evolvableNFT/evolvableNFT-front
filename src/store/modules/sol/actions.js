import * as types from './mutation-types'

import { getDropBaseInfo } from '@/biz/abi/drop-nft-sdk.js'
import { getWeb3js } from '@/libs/web3'

export const updateDropNftBaseInfo = async ({ commit }, chainId) => {
  let web3js = getWeb3js()
  getDropBaseInfo(web3js, chainId)
    .then((resp) => {
      const { baseUri, dropLength } = resp
      commit(types.UPD_NFT_BASE_URI, baseUri)
      commit(types.UPD_NFT_DROP_LENGTH, dropLength)
    })
    .catch((ex) => {
      console.log('laod drop base fail.', ex)
    })
}
