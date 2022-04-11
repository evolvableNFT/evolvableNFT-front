/*********************************************************************
 * AircraftClass :: This file get env variables for Vue-client Frame
 *		@description: IF use no webpack ,you need implemention env inject
 *		@description:
 * WARNINGS:
 *
 * HISTORY:
 *		@author: lanbery@gmail.com
 *		@created:  2022-03-18
 *		@comments:
 **********************************************************************/
import { POLYGON_MAINNET_ID, POLYGON_MUMBAI_ID } from '../networks/evm-standard-networks'
const metaDropEnv = {
  nftBaseUri: process.env.VUE_APP_NFT_BASE_URI,
  [parseInt(POLYGON_MAINNET_ID)]: {
    metaDropNFTAddress: process.env.VUE_APP_MATIC_NFT_DROP_ADDR || '',
  },
  [parseInt(POLYGON_MUMBAI_ID)]: {},
}

/**
 *
 * @param {hex or number} chainId
 * @returns object
 */
export const getMetaDropEnvByChainId = (chainId) => {
  if (!chainId) return {}
  const key = parseInt(chainId)
  return metaDropEnv[key] ? metaDropEnv[key] : {}
}

export const getMetaDropNftBaseUri = () => {
  return metaDropEnv['nftBaseUri'] || ''
}
