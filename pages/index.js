import Link from 'next/link'
import Aside from '../components/Aside'
export default function Home() {
  return (
    <div className={'flex mx-auto'}>
      <Aside />
      <main></main>
      <footer></footer>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
