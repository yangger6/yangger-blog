import { createContext, useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import 'tailwindcss/tailwind.css'

import '../styles/font.css'
import '../styles/globals.css'

import { fetchAPI } from '../lib/api'

// Store Strapi Global object in context
export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const newColorScheme = e.matches ? 'dark' : 'light'
      document.getElementsByTagName('html')[0].className = newColorScheme
    })
    document.getElementsByTagName('html')[0].className = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
      ? 'dark'
      : 'light'
  }, [])
  const { global } = pageProps
  const iconParkLink = `
     https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_2112_5.38455a5ff1e7c1ac634461fcf58e8a66.js
     `
  return (
    <>
      <Script src={iconParkLink} />
      <Head></Head>
      <GlobalContext.Provider value={global}>
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
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } }
}

export default MyApp
