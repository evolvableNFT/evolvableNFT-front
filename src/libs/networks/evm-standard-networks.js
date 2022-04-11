/*********************************************************************
 * AircraftClass :: Victor Web3 Base lib
 *		@description: Integration continue add networks
 *		@description:
 * WARNINGS:
 *
 * HISTORY:
 *		@author: lanbery@gmail.com
 *		@created:  2019-02-22
 *		@comments:
 **********************************************************************/
export const ETHEREUM_MAINNET_CHAIN_ID = 0x1

export const ETHEREUM_MAINNET_CHAIN = {
  chainId: ETHEREUM_MAINNET_CHAIN_ID,
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [],
  blockExplorerUrls: ['https://etherscan.io'],
}

export const ETHEREUM_ROPSTEN_CHAIN_ID = 0x3
export const ETHEREUM_ROPSTEN_CHAIN = {
  chainId: ETHEREUM_ROPSTEN_CHAIN_ID,
  chainName: 'Ropsten Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [],
  blockExplorerUrls: ['https://ropsten.etherscan.io'],
}

export const ETHEREUM_RINKEBY_CHAIN_ID = 0x4
export const ETHEREUM_RINKEBY_CHAIN = {
  chainId: ETHEREUM_RINKEBY_CHAIN_ID,
  chainName: 'Rinkeby Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [],
  blockExplorerUrls: ['https://rinkeby.etherscan.io'],
}

export const ETHEREUM_GOERLI_CHAIN_ID = 0x5

export const ETHEREUM_GOERLI_CHAIN = {
  chainId: ETHEREUM_GOERLI_CHAIN_ID,
  chainName: 'Goerli Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [],
  blockExplorerUrls: ['https://goerli.etherscan.io'],
}

export const ETHEREUM_KOVAN_CHAIN_ID = 0x2a
export const ETHEREUM_KOVAN_CHAIN = {
  chainId: ETHEREUM_KOVAN_CHAIN_ID,
  chainName: 'Kovan Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [],
  blockExplorerUrls: ['https://kovan.etherscan.io'],
}

export const BSC_MAINNET_CHAIN_ID = 0x38
export const BSC_MAINNET_CHAIN = {
  chainId: BSC_MAINNET_CHAIN_ID,
  chainName: 'BSC Mainnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com'],
}

export const BSC_TESTNET_CHAIN_ID = 0x61
export const BSC_TESTNET_CHAIN = {
  chainId: BSC_TESTNET_CHAIN_ID,
  chainName: 'BSC Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
}

/**
 * Matic
 */
export const POLYGON_MAINNET_ID = 0x89
export const POLYGON_MAINNET = {
  chainId: POLYGON_MAINNET_ID,
  chainName: 'Matic Network',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
}

export const POLYGON_MUMBAI_ID = 0x13881
export const POLYGON_MUMBAI = {
  chainId: POLYGON_MUMBAI_ID,
  chainName: 'Mumbai Testnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
}

export const NETWORK_CNSTS = {
  [BSC_MAINNET_CHAIN_ID]: {
    event: {
      blockLimit: 5000,
    },
  },
  [BSC_TESTNET_CHAIN_ID]: {
    event: {
      blockLimit: 5000,
    },
  },
  [POLYGON_MAINNET_ID]: {
    event: {
      blockLimit: 10000,
    },
  },
}

export function getBlockNumberLimit(chainId) {
  let { event } = NETWORK_CNSTS[chainId] || {}
  if (!event) return 5000
  return event.blockLimit || 5000
}
