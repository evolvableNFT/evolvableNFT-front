import { compressAddress } from '@lib/web3/address-util'

export const getConnectBtn = (state) => {
  const { wal = {}, web3 = {} } = state
  const injected = Boolean(web3.hasMetamask)
  console.log('>>>', state, injected, wal)
  let resp = {
    typ: -1,
    btnText: 'Download Metamask',
  }

  if (!injected) return resp

  let selectedAddress = wal.selectedAddress
  if (!selectedAddress)
    return {
      typ: 2,
      btnText: 'Connect Wallet',
    }
  return {
    typ: 1,
    btnText: compressAddress(selectedAddress),
  }
}

export const showUserMenu = (state) => {
  const { wal = {}, web3 = {} } = state
  return !!wal.selectedAddress
}
