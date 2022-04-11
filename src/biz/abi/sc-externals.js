/*********************************************************************
 * AircraftClass :: NxDrop V2
 *		@description:
 *		@description:
 * WARNINGS:
 *
 * HISTORY:
 *		@author: lanbery@gmail.com
 *		@created:  2022-03-20
 *		@comments:
 **********************************************************************/
import { POLYGON_MUMBAI_ID, BSC_MAINNET_CHAIN_ID, POLYGON_MAINNET_ID } from '@lib/networks/evm-standard-networks'

import { SC_DROP_NFT_KEY } from './sc-addresses'

export const MATIC_SC_EXTERNALS = {
  [SC_DROP_NFT_KEY]: {
    deployBlockNumber: 26296010,
  },
}

export const MUNBAI_SC_EXTERNALS = {
  [SC_DROP_NFT_KEY]: {
    deployBlockNumber: 25655676,
  },
}

const allChainScExternals = {
  [POLYGON_MAINNET_ID]: MATIC_SC_EXTERNALS,
  [POLYGON_MUMBAI_ID]: MUNBAI_SC_EXTERNALS,
}

/**
 *
 * @param {*} chainId
 * @param {*} scKey
 * @returns
 */
export function getScStartBlockNumber(chainId, scKey) {
  if (!allChainScExternals[chainId]) return 0

  return allChainScExternals[chainId][scKey] ? allChainScExternals[chainId][scKey].deployBlockNumber : 0
}

export function getDropNFTStartBlockNumber(chainId) {
  return getScStartBlockNumber(chainId, SC_DROP_NFT_KEY)
}
