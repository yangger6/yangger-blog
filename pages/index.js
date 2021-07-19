import Link from 'next/link'
import Index from '../components/Aside'
export default function Home() {
  return (
    <div className={'flex mx-auto'}>
      <Index />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
