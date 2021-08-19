import { createContext, useEffect, useMemo, useState } from 'react'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import 'tailwindcss/tailwind.css'

import '../styles/font.css'
import '../styles/globals.css'
import '../styles/markdown.css'

import { fetchAPI } from '../lib/api'
import { highlightListenMode } from '../lib/beautyCode'

// Store Strapi Global object in context
export const GlobalContext = createContext({})
export const PAGE_SIZE = 5
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  // 在主题切换的时候运行
  const onModeChange = (currentMode) => {
    document.getElementsByTagName('html')[0].className = currentMode
    setTheme(currentMode)
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
      <Head>
        <link
          rel='stylesheet'
          href='/theme/github.css'
          title='github-light'
          key='github-light'
          {...(theme === 'dark' ? { disabled: 'disabled' } : {})}
        />
        <link
          rel='stylesheet'
          href='/theme/github-dark.css'
          title='github-dark'
          key='github-dark'
        />
      </Head>
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
