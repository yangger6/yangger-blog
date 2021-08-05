const simpleGit = require('simple-git')
const path = require('path')
const getLatestTag = require('latest-git-tag')
const fs = require('fs')
const request = require('request')
const progress = require('request-progress')
const extract = require('extract-zip')
const config = require('./config')

const options = {
  baseDir: path.join(__dirname, '..'),
  binary: 'git',
}
const git = simpleGit(options)

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t))

const startTimer = async () => {
  const taskId = new Date().getTime()
  try {
    // pull get tag
    console.log(`==================== task-${taskId} start ====================`)
    console.log('start git pull latest...')
    await git.pull()
    console.log('done')
    let originRemoteUrl = config.originRemoteUrl
    if (!originRemoteUrl) {
      const originRemoteUrl = await git.listRemote(['--get-url'])
      console.log(originRemoteUrl)
    }
    originRemoteUrl = originRemoteUrl.replace('.git', '') // remove.git
    console.log('origin remote url: \t', originRemoteUrl)
    console.log('start get latest git tag...')
    const latestTag = await getLatestTag({})
    console.log('done')
    console.log('latest tag: \t', latestTag)
    if (originRemoteUrl && latestTag) {
      // 删除旧压缩包
      console.log('delete old zip')
      const htmlZipPath = path.join(__dirname, config.fileName)
      const staticHtmlFiles = path.join(__dirname, 'dist')
      try {
        fs.unlinkSync(htmlZipPath)
        console.log('done')
      } catch (e) {
        // 文件不存在
      }
      const downloadUrl = `${originRemoteUrl}/releases/download/${latestTag}/staticHtml.zip`
      // 下载
      console.log('start download latest tag static html files...')
      progress(request(downloadUrl), {})
        .on('progress', function (state) {
          console.log('progress', state)
        })
        .on('error', function (err) {
          console.log(err)
        })
        .on('end', async function () {
          console.log('done')
          console.log('start delete old static html files...')
          try {
            fs.rmdirSync(staticHtmlFiles, { recursive: true })
            console.log('done')
          } catch (e) {
            // 文件夹不存在
          }
          console.log('start extract...')
          // 解压
          await extract(htmlZipPath, { dir: path.join(__dirname, 'dist') })
          console.log('done')
          console.log(`==================== task-${taskId} end====================`)
          console.log(`\n start delay ${config.delay / 1000 / 60} min`)
          await delay(1000 * 5, config.delay || 10 * 60 * 1000)
          console.log('done \n')
          await startTimer()
        })
        .pipe(fs.createWriteStream(path.join(__dirname, 'staticHtml.zip')))
    } else {
      console.error(
        'tag 或者 仓库地址有误: \t',
        'originRemoteUrl: \t',
        originRemoteUrl,
        'latestTag: \t',
        latestTag,
      )
      console.error(`==================== task-${taskId} error end====================`)
    }
  } catch (e) {
    console.error('获取最新tag失败，请重试: \t', e)
    console.error(`==================== task-${taskId} error end====================`)
  }
}

const run = async () => {
  await startTimer()
}
run().then().catch()
