import { createContext, useEffect, useMemo, useState } from 'react'
import App from 'next/app'
import Script from 'next/script'
import 'tailwindcss/tailwind.css'

import '../styles/font.css'
import '../styles/globals.css'
import '../styles/markdown.css'

import { fetchAPI } from '../lib/api'

// Store Strapi Global object in context
export const GlobalContext = createContext({})
export const PAGE_SIZE = 5
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  // 在主题切换的时候运行
  const onModeChange = (currentMode) => {
    const CSS_PATH = ['github', 'github-dark']
    document.getElementsByTagName('html')[0].className = currentMode
    setTheme(currentMode)
    const [light, dark] = CSS_PATH.map(
      (path) => `<link rel="stylesheet" href="/theme/${path}.css" title="${path}" key="${path}">`,
    )
    const [lightDisabled, darkDisabled] = [light, dark].map(
      (link) => `${link.slice(0, -1)} disabled>`,
    )
    const headEl = document.querySelector('head')
    // 首次进入未加载link
    // if (!headEl.innerHTML.includes('github-dark')) {
    //   headEl.innerHTML += currentMode === 'dark' ? dark + lightDisabled : light + darkDisabled
    // } else {
    //   /**
    //    * 原本这一块想抽出来 在上面if的逻辑里只添加css 然后再这一块不写else 直接根据theme添加disabled属性
    //    * 但是并不能生效 使用setTimeout倒是可以有延迟执行的效果 感觉没有必要做为了这样的消耗
    //    * 这样写目前的效果就是会在切换的时候失去样式短暂的时间 然后才读取到样式文件
    //    */
    //   const [lightEl, darkEl] = CSS_PATH.map((title) =>
    //     document.querySelector(`link[title=${title}]`),
    //   )
    //   lightEl.disabled = currentMode === 'dark'
    //   darkEl.disabled = currentMode === 'light'
    // }
    // 首次进入未加载link
    if (!headEl.innerHTML.includes('github-dark')) {
      headEl.innerHTML += currentMode === 'dark' ? dark + lightDisabled : light + darkDisabled
    }
    /**
     * 这样写视觉效果不会有失去样式的那一段时间 会保留上个主题的样式然后进行切换
     * 目前感觉这样写比较好 在切换的时候有点闪烁的感觉
     */
    setTimeout(() => {
      const [lightEl, darkEl] = CSS_PATH.map((title) =>
        document.querySelector(`link[title=${title}]`),
      )
      lightEl.disabled = currentMode === 'dark'
      darkEl.disabled = currentMode === 'light'
    }, 0)
  }
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      onModeChange(e.matches ? 'dark' : 'light')
    })
    const nowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    onModeChange(nowTheme)
  }, [])
  const { global, articleInfo } = pageProps
  const iconParkLink = `
     https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_2112_8.ffe9b6b2442df0c60d612c1bd72a5112.js
     `
  return (
    <>
      <Script src={iconParkLink} />
      <GlobalContext.Provider value={{ global, theme, articleInfo }}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const global = await fetchAPI('/global')
  const articles = await fetchAPI('/articles?status=published')

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: {
      global,
      articleInfo: {
        count: articles.length,
        pageSize: PAGE_SIZE,
      },
    },
  }
}

export default MyApp
