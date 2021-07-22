import React from 'react'
import Image from 'next/image'
import darkLogo from '../public/dark-logo.svg'
import darkPerson from '../public/dark-person.svg'
const Aside = () => {
  return (
    <aside className='flex w-full relative justify-center lg:w-275/16'>
      <div className='absolute left-0 top-0 logo z-20'>
        <Image src={darkLogo} alt='logo' />
      </div>
      {/*shadow*/}
      <div className='absolute z-10 top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent' />
      {/*person*/}
      <div className='person flex mx-auto justify-center w-full'>
        <Image src={darkPerson} alt={'person'} layout={'fill'} />
      </div>
    </aside>
  )
}
export default Aside
