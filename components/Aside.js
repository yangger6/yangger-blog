import React from 'react'
import Image from 'next/image'
import darkLogo from '../public/dark-logo.svg'
import darkPerson from '../public/dark-person.svg'
import IconPark from './IconPark'
import classNames from 'classnames'
import { useHover } from '../hooks'
const Aside = ({ categories }) => {
  const [logoHoverRef, isLogoHovered] = useHover(false)
  const touchHover =
    'transform hover:translate-x-px6 transition-all hover:text-white cursor-pointer'
  return (
    <aside className='flex flex-wrap flex-col w-full relative lg:w-275/16 lg:h-auto lg:border-r dark:border-primary lg:pl-px24'>
      <div className='profile flex w-full relative lg:h-px250 lg:border-b dark:border-primary'>
        <div
          ref={logoHoverRef}
          className='absolute top-px29 left-px17 flex flex-wrap items-center z-20 lg:top-px33 lg:left-0 lg:w-px230 lg:h-px33 xl:top-px40 xl:w-px278 xl:h-px40'
        >
          <Image className='w-px203 h-px29' src={darkLogo} alt='logo' />
          <div
            className={classNames(
              'rounded-full ml-px10 w-px10 h-px10 transition-all dark:bg-white',
              {
                'dark:bg-primary': isLogoHovered,
              },
            )}
          />
          <p
            className={classNames('text-primary w-full mt-px16 font-medium text-base hidden', {
              'lg:flex': isLogoHovered,
            })}
          >
            Personal profile
          </p>
        </div>
        {/*shadow*/}
        <div
          className={classNames(
            'absolute transition-all z-10 top-0 left-0 lg:-ml-px24 lg:pl-px24 w-full h-1/2 bg-gradient-to-b from-black to-transparent opacity-100 lg:opacity-0',
            {
              'lg:opacity-100': isLogoHovered,
            },
          )}
        />
        {/*person*/}
        <div className='person flex mx-auto justify-center w-full'>
          <Image src={darkPerson} alt={'person'} layout={'fill'} />
        </div>
      </div>
      <div className='tag-list w-full relative border-b dark:border-primary hidden lg:flex'>
        <div className='inner flex-col gap-y-px10 h-px300 flex w-full overflow-y-scroll overflow-x-hidden'>
          {categories.map((category, index) => {
            return (
              <div
                key={category.id}
                className={classNames('text-base dark:text-primary', touchHover, {
                  'mt-px40': index === 0,
                })}
              >
                #{category.name} ({category.articles.length})
              </div>
            )
          })}
        </div>
        {/*shadow*/}
        <div className='absolute z-10 bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black pointer-events-none' />
      </div>
      <div className='subscribe w-full relative hidden lg:flex pt-px40 gap-y-px20 flex-col'>
        <div className={classNames('flex items-center text-base dark:text-primary', touchHover)}>
          <IconPark name='mail' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>E-mail</span>
        </div>
        <div className={classNames('flex items-center text-base dark:text-primary', touchHover)}>
          <IconPark name='dribbble' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>Dribbble</span>
        </div>
        <div className={classNames('flex items-center text-base dark:text-primary', touchHover)}>
          <IconPark name='github' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>Github</span>
        </div>
        <div className={classNames('flex items-center text-base dark:text-primary', touchHover)}>
          <IconPark name='sina' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>Sina</span>
        </div>
        <div className={classNames('flex items-center text-base dark:text-primary', touchHover)}>
          <IconPark name='twitter' color='#7BF0BE' size='28' />
          <span className='mx-px10'>·</span>
          <span>Twitter</span>
        </div>
      </div>
    </aside>
  )
}
export default Aside
