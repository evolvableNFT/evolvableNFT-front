import Web3 from 'web3'

import { checkSupport } from '../networks/index'

export const checkEvmProvider = () => {
  if (!window.ethereum || !window.ethereum.isMetaMask) throw new Error('Your browser enviroment unfound Metamask.')
  if (process.env.NODE_ENV === 'development' && !global.web3js) {
    window.web3js = new Web3(window.ethereum)
  }

  return window.ethereum
}

export const getWeb3js = (ethereum) => {
  if (!ethereum && !window.ethereum) throw new Error('Miss ethereum.')
  return new Web3(ethereum || window.ethereum)
}

/**
 *
 * @param {*} ethereum
 * @returns
 */
export const getAllowWeb3js = (ethereum) => {
  if (!ethereum && !window.ethereum) throw new Error('Miss ethereum.')
  let _ethereum = ethereum || window.ethereum
  const chainId = _ethereum.chainId ? parseInt(_ethereum.chainId) : 0
  checkSupport(chainId)
  const web3js = new Web3(window.ethereum)
  return web3js
}
