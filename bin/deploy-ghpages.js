#!/usr/bin/env node
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */

const fs = require('fs-extra')
const { dist, R, join, baseResovle, isAbsolute } = require('../ci/paths')
const pkgJson = require('../package.json')

const { PrintInfo, PrintError, PrintRun, PrintOK } = require('../ci/printer')

require('dotenv').config({ path: baseResovle('bin', '.env') })

const TARGET_PROJECT = '../nxdrop.github.io'
const TARGET_BRANCH_NAME = 'gh-pages'
const TARGET_PROJECT_DOCS = 'docs'
const TARGET_RELEASE_NAME = 'RELEASE.md'
const BUILD_CDM = 'build:gh'

const GIT_CMD = {
  getBranch: 'git rev-parse --abbrev-ref HEAD',
  getHash: 'git rev-parse --short HEAD',
  getRemoteURL: 'git remote get-url origin',
  getRemoteBranches: `git rev-parse --symbolic-full-name --branches ${TARGET_BRANCH_NAME}`,
  gitForceOverride: `git fetch --all && git reset --hard origin/${TARGET_BRANCH_NAME} && git checkout ${TARGET_BRANCH_NAME} && git pull`,
}

main().then((res) => {
  PrintOK(res)
})

async function main() {
  try {
    const targetGhPagesPath = isAbsolute(TARGET_PROJECT) ? TARGET_PROJECT : baseResovle(TARGET_PROJECT)
    const targetInfo = checkTargetProject(targetGhPagesPath)

    const hash = buildSelfProject()

    // copy to target docs & push
    const okMsg = copyToTargetAndPush(targetGhPagesPath, {
      ...targetInfo,
      commitHash: hash,
    })

    return okMsg
  } catch (err) {
    // console.log('>>>>>>>>>>>>', err)
    PrintError(err.message)
  }
}

/**
 *
 * @param {*} targetPath
 * @returns git Info
 */
function checkTargetProject(targetPath) {
  if (!fs.existsSync(targetPath)) throw new Error(`Target gh-pages Project [${targetPath}] not exists.`)

  if (!fs.existsSync(R(targetPath, '.git'))) throw new Error(`Target gh-pages Project [${targetPath}] not Git Project.`)

  const gitInfo = getProjectGitInfo(targetPath)

  require('child_process')
    .execSync(`cd ${targetPath} && ${GIT_CMD.gitForceOverride}`, {
      encoding: 'utf-8',
    })
    .toString()

  return gitInfo
}

function buildSelfProject() {
  const execEnvPath = process.cwd()
  let commitHash = require('child_process')
    .execSync(`cd ${execEnvPath} && ${GIT_CMD.getHash}`, {
      encoding: 'utf-8',
    })
    .toString()

  commitHash = commitHash.replace(/\r|\r\n|\n/g, '')

  const buildRes = require('child_process')
    .execSync(`cd ${execEnvPath} && npm run ${BUILD_CDM}`, {
      encoding: 'utf-8',
    })
    .toString()

  PrintInfo('Commit Hash: ', commitHash, buildRes)

  return commitHash
}

function copyToTargetAndPush(targetPath, options = {}) {
  const { commitHash = '', user = '', email = '', ghPageName = '', pubDate } = options
  const targetDocsPath = R(targetPath, TARGET_PROJECT_DOCS)
  const execEnvPath = process.cwd()

  // clear docs
  fs.emptydirSync(targetDocsPath)

  fs.copySync(dist, targetDocsPath, { overwrite: true })

  // writeCName(targetDocsPath, process.env.CNAME || '')

  const pushComment = `docs: publish v${pkgJson.version}-${commitHash}`

  const releaseFile = R(targetPath, TARGET_RELEASE_NAME)

  fs.ensureFileSync(releaseFile)
  fs.appendFileSync(
    releaseFile,
    `\n# Version ${pkgJson.version}-${commitHash}
    \n> Release v${pkgJson.version}\n Publish At: ${pubDate} By ${user}<${email}>\n---\n`,
    { encoding: 'utf8' }
  )

  const targetPushLog = require('child_process')
    .execSync(`cd ${targetPath} && git add . && git commit -am "${pushComment}" && git push`, {
      encoding: 'utf-8',
    })
    .toString()

  PrintInfo('Push>>>', targetPushLog)

  return ghPageName
    ? `Publish Complete \nVisit this url : https://nxdrop.github.io\n`
    : 'Publish Complete \n You can login your github account to see result.'
}

function writeCName(targetDocsPath, cname) {
  if (cname) {
    fs.writeFileSync(R(targetDocsPath, 'CNAME'), cname)
  }
}

/**
 *
 * @param {*} targetPath
 * @returns
 */
function getProjectGitInfo(targetPath) {
  const currTime = new Date()
  const pubDate = `${currTime.getFullYear()}-${currTime.getMonth() + 1}-${currTime.getDate() + 1}`

  let operateUser = require('child_process')
    .execSync(`cd ${targetPath} && git config --get user.name`, {
      encoding: 'utf-8',
    })
    .toString()

  operateUser = operateUser.replace(/\r|\r\n|\n/g, '')

  let email = require('child_process')
    .execSync(`cd ${targetPath} && git config --get user.email`, {
      encoding: 'utf-8',
    })
    .toString()

  email = email.replace(/\r|\r\n|\n/g, '')

  let remoteUrl = require('child_process')
    .execSync(`cd ${targetPath} && ${GIT_CMD.getRemoteURL}`, {
      encoding: 'utf-8',
    })
    .toString()

  remoteUrl = remoteUrl.replace(/\r|\r\n|\n/g, '')
  const picks = /(?<=\/)[^\/]+(?=\.git)/.exec(remoteUrl)

  const gitInfo = {
    pubDate,
    email: email || 'shopee.gay@gmail.com',
    user: operateUser || '',
    ghPageName: picks && picks.length ? picks[0] : '',
  }

  return gitInfo
}
