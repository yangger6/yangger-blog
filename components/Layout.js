import Aside from './Aside'
import Footer from './Footer'

const Layout = ({ children, categories, seo }) => (
  <>
    <Aside />
    <main className='flex flex-wrap flex-row relative mt-px60 mx-5 md:mx-16'>{children}</main>
    <Footer />
  </>
)

export default Layout
