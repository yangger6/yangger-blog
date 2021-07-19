import 'tailwindcss/tailwind.css'
import {useEffect} from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newColorScheme = e.matches ? "dark" : "light";
      document.getElementsByTagName('html')[0].className = newColorScheme
    });
    document.getElementsByTagName('html')[0].className = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
