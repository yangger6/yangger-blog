import { createContext, useEffect, useState } from 'react'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import 'tailwindcss/tailwind.css'

import '../styles/font.css'
import '../styles/globals.css'
import '../styles/markdown.css'

import { fetchAPI } from '../lib/api'

// Store Strapi Global object in context
export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const newColorScheme = e.matches ? 'dark' : 'light'
      document.getElementsByTagName('html')[0].className = newColorScheme
      setTheme(newColorScheme)
    })
    const nowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.getElementsByTagName('html')[0].className = nowTheme
    setTheme(nowTheme)
  }, [])
  const { global, articleInfo } = pageProps
  const iconParkLink = `
     https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_2112_8.ffe9b6b2442df0c60d612c1bd72a5112.js
     `
  return (
    <>
      <Script src={iconParkLink} />
      <Head></Head>
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
        pageSize: 1,
      },
    },
  }
}

export default MyApp
