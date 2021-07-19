import React from 'react'
import Image from 'next/image'
import darkLogo from '../../public/dark-logo.svg'
import darkPerson from '../../public/dark-person.svg'
const Aside = () => {
  return (
    <aside className='flex relative'>
      <div className='absolute left-0 top-0 bg-red logo z-10'>
        {/*<Image src={darkLogo} alt='logo' />*/}
      </div>
      {/*shadow*/}
      {/*<div className='absolute z-10 top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent'></div>*/}
      {/*person*/}
      <div className='flex mx-11 justify-center'>
        <Image src={darkPerson} alt={'person'}></Image>
      </div>
    </aside>
  )
}
export default Aside
