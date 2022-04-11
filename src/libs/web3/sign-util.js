const salt = 'Meta_drop_regist'

export async function signByPersonal(web3js, options = {}) {
  const { selectedAddress, email, twitter = '', discord = '' } = options
  if (!selectedAddress) throw new Error('miss selected address')
  if (!email) throw new Error('Miss email.')
  const params = buildSignParams(selectedAddress, email, twitter, discord)

  const origText = web3js.utils.utf8ToHex(JSON.stringify(params))
  // const keccakPack = web3js.utils.keccak256(origText)
  const signedData = await web3js.eth.personal.sign(origText, selectedAddress)

  let ret = {
    params,
    signedData,
  }
  // console.log('>>>>>>>>>>>>>signByPersonal>>>>>>>', ret)

  return ret
}

export function buildSignParams(userAddress, email, twitter = '', discord = '') {
  const ts = new Date().getTime() / 1000
  return {
    userAddress,
    ts: ts.toString(),
    email,
    twitter,
    discord,
  }
}

/**
 * 空投项目签名
 * @param {*} web3js 
 * @param {*} options {selectedAddress, info, merkleRoot}
 * @returns 
 */
export async function signCreateDrops(web3js, options = {}) {
  const { selectedAddress, merkleRoot } = options
  if (!selectedAddress) throw new Error('miss selected address')
  if (!merkleRoot) throw new Error('Miss merkleRoot .')
  const params = buildSignInfo(selectedAddress, merkleRoot)

  const origText = web3js.utils.utf8ToHex(JSON.stringify(params))
  // const keccakPack = web3js.utils.keccak256(origText)
  const signedData = await web3js.eth.personal.sign(origText, selectedAddress)
  // console.log('>>>>>>>>>>>>>signByPersonal>>>>>>>', ret)

  return signedData
}
/**
 * 生成签名参数
 * @param {用户钱包地址} userAddress 
 * @param {签名参数} params 
 * @returns 
 */
export function buildSignInfo(userAddress, merkleRoot) {
  // 签名一分钟有效
  const ts = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0,15)
  return {
    userAddress,
    ts: ts.toString(),
    merkleRoot,
  }
}