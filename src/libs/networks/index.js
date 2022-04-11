import {
  ETHEREUM_MAINNET,
  ETHEREUM_ROPSTEN,
  ETHEREUM_RINKEBY,
  ETHEREUM_GOERLI,
  ETHEREUM_KOVAN,
  BINANCE_MAINNET,
  BINANCE_TESTNET,
  MATIC_MAINNET,
  MUMBAI_TESTNET,
} from './chain-types'

import {
  ETHEREUM_MAINNET_CHAIN,
  ETHEREUM_ROPSTEN_CHAIN,
  ETHEREUM_RINKEBY_CHAIN,
  ETHEREUM_GOERLI_CHAIN,
  ETHEREUM_KOVAN_CHAIN,
  BSC_MAINNET_CHAIN,
  BSC_TESTNET_CHAIN,
  POLYGON_MAINNET,
  POLYGON_MUMBAI,
} from './evm-standard-networks'

export const allChains = {
  [ETHEREUM_MAINNET]: ETHEREUM_MAINNET_CHAIN,
  [ETHEREUM_ROPSTEN]: ETHEREUM_ROPSTEN_CHAIN,
  [ETHEREUM_RINKEBY]: ETHEREUM_RINKEBY_CHAIN,
  [ETHEREUM_GOERLI]: ETHEREUM_GOERLI_CHAIN,
  [ETHEREUM_KOVAN]: ETHEREUM_KOVAN_CHAIN,
  [BINANCE_MAINNET]: BSC_MAINNET_CHAIN,
  [BINANCE_TESTNET]: BSC_TESTNET_CHAIN,
  [MATIC_MAINNET]: POLYGON_MAINNET,
  [MUMBAI_TESTNET]: POLYGON_MUMBAI,
}

// export con
export const supportChainKeys = [MATIC_MAINNET, MUMBAI_TESTNET]

/**
 *
 */
export const supportNetworks = supportChainKeys.reduce((prev, curr) => {
  if (allChains[curr]) {
    // prev = [...prev, allChains[curr]]
    prev = prev.concat([allChains[curr]])
  }
  return prev
}, [])

export const checkSupport = (chainId) => {
  const network = supportNetworks.find((n) => parseInt(n.chainId) === parseInt(chainId))
  if (!network) {
    const message = getSupportNames(supportNetworks)
    throw new Error(`Only support ${message}`)
  }
  return network
}

export function getSupportNames(supportNetworks = []) {
  const networkNames = supportNetworks.reduce((prev, curr) => {
    prev = prev.concat([`${curr.chainName}[${parseInt(curr.chainId)}]`])

    return prev
  }, [])

  return networkNames.length > 2
    ? networkNames.slice(1).join(',') + ' or ' + networkNames.slice(-1)
    : networkNames.join(',')
}
