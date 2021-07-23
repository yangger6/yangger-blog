import React from 'react'
import Image from 'next/image'
import darkLogo from '../public/dark-logo.svg'
import darkPerson from '../public/dark-person.svg'
import IconPark from './IconPark'
const Aside = () => {
  return (
    <aside className='flex flex-wrap flex-col w-full relative lg:w-275/16 lg:h-auto lg:border-r dark:border-primary lg:pl-px24'>
      <div className='profile flex w-full relative lg:h-px250 lg:border-b dark:border-primary'>
        <div className='absolute left-0 top-0 logo z-20 lg:-ml-px24 lg:pl-px24'>
          <Image src={darkLogo} alt='logo' />
        </div>
        {/*shadow*/}
        <div className='absolute z-10 top-0 left-0 lg:-ml-px24 lg:pl-px24 w-full h-1/2 bg-gradient-to-b from-black to-transparent' />
        {/*person*/}
        <div className='person flex mx-auto justify-center w-full'>
          <Image src={darkPerson} alt={'person'} layout={'fill'} />
        </div>
      </div>
      <div className='tag-list w-full relative border-b dark:border-primary hidden lg:flex'>
        <div className='inner flex-col gap-y-px10 h-px300 flex w-full overflow-y-scroll'>
          <div className='mt-px40 text-base dark:text-primary transform translate-x-px6 transition-all'>
            #php分页数据结构 (3)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
          <div className='text-base dark:text-primary transform translate-x-px6 transition-all'>
            #C语言 (2)
          </div>
        </div>
        {/*shadow*/}
        <div className='absolute z-10 bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black' />
      </div>
      <div className='subscribe w-full relative hidden lg:flex pt-px40 gap-y-px20 flex-col'>
        <div className='flex items-center text-base dark:text-primary'>
          <IconPark name='mail' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>E-mail</span>
        </div>
        <div className='flex items-center text-base dark:text-primary'>
          <IconPark name='dribbble' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>Dribbble</span>
        </div>
        <div className='flex items-center text-base dark:text-primary'>
          <IconPark name='github' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>Github</span>
        </div>
      </div>
    </aside>
  )
}
export default Aside
