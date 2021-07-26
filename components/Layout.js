import Aside from './Aside'
import Footer from './Footer'

const Layout = ({ children, categories, seo }) => (
  <div className='flex flex-wrap'>
    <Aside />
    <div className='flex flex-wrap flex-1'>
      <main className='flex flex-wrap flex-row relative mx-5 md:mx-16 space-x-0'>{children}</main>
      <Footer />
    </div>
  </div>
)

export default Layout
