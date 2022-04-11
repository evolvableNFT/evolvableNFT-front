import { DAPP_RELOAD_NFT_LIST } from './evt-names'
export function bindDAppReloadMyNFTList(vm) {
  function _reloadNftList(web3js, chainId, selectedAddress) {
    this.$store.dispatch('token', web3js, chainId, selectedAddress)
  }
  if (vm) {
    window.addEventListener(DAPP_RELOAD_NFT_LIST, _reloadNftList.bind(vm))
  }
}
