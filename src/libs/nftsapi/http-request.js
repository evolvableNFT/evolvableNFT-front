import axios from 'axios'

// replace with your Alchemy api key
const apiKey = '1iW2lf-aQp_-AOeGrzNFrBXsJODY8Yck'
// const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`
// replace with the wallet address you want to query for NFTs
const ownerAddr = '0xcF3A24407aae7c87bd800c47928C5F20Cd4764D2'
const contractAddr = '0xc0a6392F1fF8b672AD69C84B34Fd0Fa1DFa6d49D'

const service = axios.create({
  baseURL: baseURL,
  method: 'get',
  timeout: 50000,
  transformResponse: [
    function (data) {
      try {
        let _d = JSON.parse(data)
        _d.errcode = _d.errno
        delete _d.errno
        return JSON.stringify(_d)
      } catch (_) {
        return data
      }
    },
  ],
})

/**
 * request
 */
service.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

service.interceptors.response.use(
  (response) => {
    let { data } = response

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (ex) {
        console.log('API handler json fail :', ex)
      }
    }
    return data
  },
  (err) => {
    throw new Error(err)
  }
)

/**
 *
 * @returns promise
 */
export default function getNFTs() {
  let url = `${baseURL}/getNFTs/?owner=${ownerAddr}&contractAddresses[]=${contractAddr}`
  let req = {
    url: url,
  }
  return service(req)
}
