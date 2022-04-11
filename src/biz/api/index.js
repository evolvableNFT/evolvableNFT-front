import qs from 'qs'
import request from './http-request'
import allApiList from './api-list'

const getApis = {
  'user.getAddress': true,
  'drop.getClaimParams': true,
  'drop.addressList': true,
  'drop.skillList': true,
  'drop.credentialsAddressMerkleTree': true,
  'drop.metadatastructure': true,
  
}

/**
 *
 * @param {string} apikey like user.sendcode
 * @param {object} data
 * @returns promise
 */
export default function api(apikey, data = {}) {
  if (!allApiList[apikey]) {
    throw new Error(`Apikey ${apikey} undefined`)
  }

  let method = allApiList[apikey].method

  let url = /^(\/).*/.test(allApiList[apikey].url) ? `${allApiList[apikey].url}` : `/${allApiList[apikey].url}`

  let req = {
    url,
    method,
  }

  if (apikey == 'storage.upload' || apikey === 'storage.multiupload') {
    req.headers = { 'Content-Type': 'multipart/form-data' }
    req.data = data
  } else if (apikey === 'log.info') {
    req.data = data
  } else {
    let m = method.toLowerCase()
    switch (m) {
      case 'post':
        req.data = qs.stringify(data)
        break
      case 'get':
        if (getApis[apikey] && data) {
          req.url = url.indexOf('?') > 0 ? `${req.url}&${qs.stringify(data)}` : `${req.url}?${qs.stringify(data)}`
        }

        req.data = qs.stringify(data)
        break
      default:
        req.data = data
    }

    // req.data = method.toLowerCase() === 'post' ? qs.stringify(data) : data // qs.stringify(data)
  }

  return request(req)
}
