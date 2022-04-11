import api from '@/biz/api'
import * as types from './mutation-types'

export const loadDropList = async ({ commit }) => {
  const resp = await api('drop.list')
  const { code, msg, data } = resp
  if (code === 0 && data && data.length) {
    let drops = data.reduce((prev, curr) => {
      const { nftMetadataStructure = [] } = curr
      const { name, description, dropTotal, logoUri, officalSite, expiresDate, rules } = curr.info

      let nftInfo = {}
      if (nftMetadataStructure && nftMetadataStructure.length && typeof nftMetadataStructure[0].info === 'object') {
        nftInfo = { ...nftMetadataStructure[0].info }
      }
      let twitterRule = false
      let discordRule = false
      if (rules && rules.rule) {
        for (var r of rules.rule) {
          if (r == 'Twitter') {
            twitterRule = true
          } else if (r == 'Discord') {
            discordRule = true
          }
        }
      }
      let d = { ...d, name, description, dropTotal, logoUri, officalSite, dropid: parseInt(curr.dropid), nftInfo, expiresDate, twitterRule, discordRule }
      prev = prev.concat([d])
      return prev
    }, [])
    // console.log(drops, data)
    commit(types.UPD_DROP_LIST, drops)
  } else {
    if (data && !data.length) throw new Error('No airdrops.')
    throw new Error(msg || 'no drops')
  }
}
/**
 * 查询Credentials列表
 * @param {} param0 
 */
export const loadCredentialsList = async ({ commit }) => {
  const resp = await api('credentials.list')
  const { code, msg, data } = resp
  if (code === 0 && data && data.length) {
    let credentials = data.reduce((prev, curr) => {

      const { id, name, description, type, chain_info, endpoint, query, expression, create_by, avatar_url, link } = curr

      let createBy = "Curated by " + create_by.substring(0, 6) + "..." + create_by.substring(create_by.length - 4)
      let _type = "Type " + type
      const data = {
        id: id,
        title: name,
        avatarUrl: avatar_url,
        desc: description,
        createdBy: createBy,
        type: _type,
        chainInfo: chain_info,
        graphLink: endpoint,
        githubLink: link,
        query: query,
        expression: expression,
      }

      // let d = { ...d, id, name, description, type, chain_info, endpoint, query, expression, create_by, avatar_url, link }

      prev = prev.concat([data])
      return prev
    }, [])
    commit(types.UPD_CREDENTIALS_LIST, credentials)
  } else {
    if (data && !data.length) throw new Error('No credentials.')
    throw new Error(msg || 'no credentials')
  }
}

/**
 * 查询Credentials 选择条件列表
 * @param {} param0 
 */
export const getDropCredentialsSelectList = async ({ commit }) => {
  const resp = await api('drop.addressList')
  const { code, msg, data } = resp
  if (code === 0 && data && data.length) {
    let credentials = data.reduce((prev, curr) => {

      const { id, name } = curr

      const data = {
        value: id,
        text: name
      }
      prev = prev.concat([data])
      return prev
    }, [])
    // console.log(credentials,"credentials")
    commit(types.UPD_CREDENTIALS_SELECT, credentials)
  } else {
    if (data && !data.length) throw new Error('No credentials Select.')
    throw new Error(msg || 'no credentials Select')
  }
}

/**
 *  SKILLS 选择条件列表
 * @param {} param0 
 */
export const getDropSkillsSelectList = async ({ commit }) => {
  const resp = await api('drop.skillList')
  const { code, msg, data } = resp
  if (code === 0 && data && data.length) {
    let credentials = data.reduce((prev, curr) => {

      const { id, name } = curr

      const data = {
        value: id,
        text: name
      }
      prev = prev.concat([data])
      return prev
    }, [])
    commit(types.UPD_SKILLS_SELECT, credentials)
  } else {
    if (data && !data.length) throw new Error('No skillList Select.')
    throw new Error(msg || 'no skillList Select')
  }
}


