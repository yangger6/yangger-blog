import Aside from './Aside'
import Footer from './Footer'
import { useEffect } from 'react'
import config from '../next.config'
import SmoothScroll from '../lib/smothScroll'

const Layout = ({ children, categories }) => {
  useEffect(() => {
    if (config.smoothScroll) {
      SmoothScroll(document, 120, 12)
    }
  }, [])
  return (
    <div className='flex flex-wrap'>
      <Aside categories={categories} />
      <div className='flex flex-wrap flex-1 flex-col min-h-screen lg:ml-px250'>
        <main className='flex flex-wrap flex-row relative mx-5 md:mx-16 space-x-0'>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
