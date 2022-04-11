/*********************************************************************
 * AircraftClass :: MetaDrop V2
 *		@description:
 *		@description:
 * WARNINGS:
 *
 * HISTORY:
 *		@author: lanbery@gmail.com
 *		@created:  2022-03-16
 *		@comments:
 **********************************************************************/

import { POLYGON_MUMBAI_ID as defChainId } from '@lib/networks/evm-standard-networks'
import { getDropNFTABI } from './json'
import { getContractAddress, SC_DROP_NFT_KEY } from './sc-addresses'
import { getDropNFTStartBlockNumber } from './sc-externals'
import { getBlockNumberLimit } from '@lib/networks/evm-standard-networks'

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 */
export const DropNFTInstance = (web3js, chainId = defChainId) => {
  const abi = getDropNFTABI()
  const contractAddress = getContractAddress(chainId, SC_DROP_NFT_KEY)
  if (!contractAddress) throw new Error(`Unset contract[${SC_DROP_NFT_KEY}] address at chain [${chainId}]`)

  return new web3js.eth.Contract(abi, contractAddress)
}

export const getDropBaseInfo = async (web3js, chainId) => {
  const inst = DropNFTInstance(web3js, chainId)
  const baseUri = await inst.methods.baseURI().call()
  const dropLength = await inst.methods.dropslength().call()
  return {
    baseUri,
    dropLength,
  }
}

export const getNFTBalance = async (web3js, address) => { }

/**
 * 判断有没有领取NFT
 * @param {*} web3js 
 * @param {*} chainId 
 * @param {*} tokenId 
 * @param {*} selectedAddress 
 * @returns 
 */
export const isClainNFT = async (web3js, chainId, tokenId, selectedAddress) => {

  const inst = await DropNFTInstance(web3js, chainId)
  console.log(tokenId, "id ownerAddress")
  try {

    let ownerAddress = await inst.methods.ownerOf(tokenId * 1).call()
    console.log(tokenId, selectedAddress, ownerAddress, "ownerAddress")
    return (ownerAddress && ownerAddress.toLowerCase() === selectedAddress.toLowerCase())
  } catch (error) {
    return false
  }

}

/**
 *
 * @param {object} web3js
 * @param {object} params
 * @property {number} dropId
 * @property {number} tokenId
 * @property {arrasy} proof
 */
export const claimNFT = async (web3js, params = {}) => {
  const { dropid, tokenId, proof, chainId, selectedAddress } = params

  if (!dropid) throw new Error('miss dropid')

  if (!proof || !proof.length) throw new Error('miss dropid or proof')

  const inst = await DropNFTInstance(web3js, chainId)

  let id = typeof dropid !== 'number' ? parseInt(dropid) : dropid

  // let ownerAddress

  // ownerAddress = await inst.methods.ownerOf(id).call()

  // if (ownerAddress && ownerAddress.toLowerCase() === selectedAddress.toLowerCase()) {
  //   throw new Error(`NFT Token [${dropid}] has claimed`)
  // }

  console.log('==============', id, tokenId, proof, selectedAddress)
  const receipt = await inst.methods.claim(id, tokenId, proof).send({ from: selectedAddress })

  // todo toggler

  return receipt
}

export const loadMyNft = async (web3js, chainId, selectedAddress) => {
  const inst = DropNFTInstance(web3js, chainId)
  const fromBlockNumber = getDropNFTStartBlockNumber(chainId)
  const pageSzie = getBlockNumberLimit(chainId)

  const endBlockNumber = await web3js.eth.getBlockNumber()

  let options = {
    filter: { to: [selectedAddress] },
    fromBlock: fromBlockNumber,
    toBlock: 'latest',
  }

  const chunks = []
  const totalBlocks = endBlockNumber - fromBlockNumber

  if (pageSzie > 0 && totalBlocks > pageSzie) {
    const size = Math.ceil(totalBlocks / pageSzie)

    let startBlockNumber = fromBlockNumber

    for (let i = 0; i < size; i++) {
      const formRageBlock = startBlockNumber
      const toRangeBlock = i === size - 1 ? endBlockNumber : startBlockNumber + pageSzie

      chunks.push({ ...options, fromBlock: formRageBlock, toBlock: toRangeBlock })
    }
  } else {
    chunks.push({ ...options, fromBlock: fromBlockNumber, toBlock: 'latest' })
  }

  const events = []
  const errors = []
  for (let j = 0; j < chunks.length; j++) {
    await inst
      .getPastEvents('Transfer', chunks[j], function (err, transferEvts) {
        if (err) {
          errors.push(err)
        }
        if (transferEvts.length > 0) {
          events.push(...transferEvts)
        }
      })
      .then((evts) => console.log)
  }

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', events)

  return { lastBlock: endBlockNumber, events, errors }
}
