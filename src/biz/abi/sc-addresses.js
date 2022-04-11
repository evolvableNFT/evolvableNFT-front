/*********************************************************************
 * AircraftClass :: MetaDrops
 *		@description:
 *		@description:
 * WARNINGS:
 *
 * HISTORY:
 *		@author: lanbery@gmail.com
 *		@created:  2022-03-14
 *		@comments:
 **********************************************************************/

export const SC_DROP_NFT_KEY = 'DropsNFT721'

import { POLYGON_MUMBAI_ID, BSC_MAINNET_CHAIN_ID, POLYGON_MAINNET_ID } from '@lib/networks/evm-standard-networks'

const MUNBAI_SC_ADDRESSES = {
  // [SC_DROP_NFT_KEY]: '0x9d74bfDa1b213a4D7fDC7d8a60fF5E7Dd263A32D',
  // 合约增加技能升级
  [SC_DROP_NFT_KEY]: '0xf5c9704bd9C9F9697306c2c5c5D42C336e98c8D3',
}

export const BSC_MAIN_ADDRESSES = {
  [SC_DROP_NFT_KEY]: '',
}

export const MATIC_SC_ADDRESSES = {
  [SC_DROP_NFT_KEY]: '0xEC7dE4a87F6F75f61fb51ED2355b1E4540842d80',
}

export const allContractAddresses = {
  [POLYGON_MUMBAI_ID]: MUNBAI_SC_ADDRESSES,
  [BSC_MAINNET_CHAIN_ID]: BSC_MAIN_ADDRESSES,
  [POLYGON_MAINNET_ID]: MATIC_SC_ADDRESSES,
}

/**
 *
 * @param {number} chainId
 * @param {string} contractName
 * @returns
 */
export const getContractAddress = (chainId, contractName) => {
  if (!allContractAddresses[parseInt(chainId)]) return ''
  return allContractAddresses[parseInt(chainId)][contractName] || ''
}

/**
 *
 * @param {string} contractName
 * @returns
 */
export const getMumbarContractAddress = (contractName) => {
  return MUNBAI_SC_ADDRESSES[contractName] || ''
}
