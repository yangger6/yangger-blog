import React, { useContext, useMemo, useState } from 'react'
import darkLogo from '../public/dark-logo.svg'
import lightLogo from '../public/light-logo.svg'
import darkPerson from '../public/dark-person.svg'
import IconPark from './IconPark'
import classNames from 'classnames'
import { useHover } from '../hooks'
import ImageWithBasePath from './ImageWithBasePath'
import themeColors from '../theme'
import { GlobalContext } from '../pages/_app'
import Link from 'next/link'
import { getStrapiMedia } from '../lib/media'

const Aside = ({ categories }) => {
  const {
    global: { accounts, openFriendLink, personImageDark, personImage },
    theme,
  } = useContext(GlobalContext)
  const currentPersonImage = useMemo(() => {
    return getStrapiMedia(theme === 'light' ? personImage : personImageDark)
  }, [theme])
  const [friendLinks, socialAccounts] = [[], []]
  accounts.map((account) => {
    if (account.accountType === 'sociality') {
      socialAccounts.push(account)
    } else if (account.accountType === 'friend') {
      friendLinks.push(account)
    }
  })
  const [isShowPanel, setShowPanel] = useState(false)
  const [logoHoverRef, isLogoHovered] = useHover(false)
  const touchHover =
    'transform hover:translate-x-px6 transition-all duration-300 hover:text-green dark:hover:text-white cursor-pointer'
  return (
    <aside className='flex flex-wrap flex-col w-full lg:w-275/16 lg:h-auto lg:border-r border-lightPrimary border-opacity-30 dark:border-primary lg:pl-px24 lg:fixed lg:h-full'>
      {/*menu*/}
      <div
        onClick={(e) => setShowPanel(!isShowPanel)}
        className='menu-icon lg:hidden absolute w-px24 h-px24 z-30 flex flex-col justify-center items-center right-px20 top-px32'
      >
        <div
          className={classNames(
            'menu-icon-bar menu-icon-bar-1 bg-primary dark:bg-white h-px w-px16 rounded-full transform transition-all duration-300',
            {
              'rotate-45 translate-y-px5': isShowPanel,
            },
          )}
        />
        <div
          style={{
            transformOrigin: '0 50%',
          }}
          className={classNames(
            'menu-icon-bar menu-icon-bar-2 bg-primary dark:bg-white h-px w-px16 rounded-full mt-px4 transform transition-all duration-300',
            {
              'opacity-70 scale-x-0 -translate-x-px16': isShowPanel,
            },
          )}
        />
        <div
          className={classNames(
            'menu-icon-bar menu-icon-bar-3 bg-primary dark:bg-white h-px w-px16 rounded-full mt-px4 transform transition-all duration-300',
            {
              '-rotate-45 -translate-y-px5': isShowPanel,
            },
          )}
        />
      </div>
      {/*person*/}
      <div className='profile flex w-full relative lg:h-px300' ref={logoHoverRef}>
        <div
          className={classNames(
            'absolute cursor-pointer top-px29 left-px17 flex flex-wrap items-center z-20 lg:top-px33 lg:left-0 lg:w-px280 lg:h-px33 xl:top-px40 xl:w-px278 xl:h-px40',
            {
              'z-30': isShowPanel,
            },
          )}
        >
          <Link href='/'>
            <ImageWithBasePath
              className='w-px203 h-px29'
              src={theme === 'light' ? lightLogo : darkLogo}
              alt='logo'
            />
          </Link>
          <div
            className={classNames(
              'rounded-full ml-px10 w-px10 h-px10 transition-all duration-300 dark:bg-white',
              {
                'dark:bg-primary': isLogoHovered,
              },
            )}
          />
          <p
            className={classNames(
              'text-primary w-full mt-px16 font-medium text-base lg:opacity-0 cursor-default',
              {
                hidden: isShowPanel,
                'lg:opacity-100': isLogoHovered,
              },
            )}
          >
            Personal profile
          </p>
        </div>
        {/*shadow*/}
        <div
          className={classNames(
            'absolute dark-mask transition-all duration-300 z-10 top-0 left-0 lg:-ml-px24 lg:pl-px24 w-full h-1/2 bg-gradient-to-b from-black to-transparent opacity-100',
          )}
        />
        <div className='person flex mx-auto justify-center w-full h-full'>
          <ImageWithBasePath src={currentPersonImage} alt={'person'} layout='fill' />
        </div>
      </div>
      <div
        className={classNames('aside-panel', {
          show: isShowPanel,
        })}
      >
        {/*tag*/}
        <div
          className={classNames(
            'tag-list w-full relative flex lg:flex flex-col py-px30 border-t border-lightPrimary border-opacity-30 border-lightPrimary border-opacity-30 dark:border-primary dark:border-opacity-50',
            {
              hidden: !isShowPanel,
              'mt-px90': isShowPanel,
            },
          )}
        >
          <div className='dark:text-primary text-lg leading-10/15 font-bold text-green'>
            标签导航
          </div>
          <div className='inner flex-col gap-y-px10 h-px215 flex w-full overflow-y-scroll overflow-x-hidden'>
            {categories.map((category, index) => {
              return (
                <Link key={category.id} href={`/tag/${category.slug}`}>
                  <a>
                    <div
                      key={category.id}
                      className={classNames(
                        'text-base text-lightPrimary dark:text-primary text-lightPrimary',
                        touchHover,
                        {
                          'mt-px20': index === 0,
                        },
                      )}
                    >
                      #{category.name} ({category.articles.length})
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>
          {/*shadow*/}
          <div className='absolute dark-mask z-10 bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white dark:to-black pointer-events-none' />
        </div>
        {/*subscribe*/}
        <div
          className={classNames(
            'subscribe w-full relative flex lg:flex gap-y-px20 flex-col py-px30 border-t border-lightPrimary border-opacity-30 dark:border-primary dark:border-opacity-50',
            {
              hidden: !isShowPanel,
            },
          )}
        >
          <div className='dark:text-primary text-green text-lg leading-10/15 font-bold'>
            其他主页
          </div>
          {socialAccounts.map((account) => (
            <div
              key={account.id}
              className={classNames(
                'flex items-center text-base dark:text-primary text-lightPrimary',
                touchHover,
              )}
            >
              <IconPark
                name={account.icon}
                color={theme === 'light' ? themeColors.lightPrimary : themeColors.primary}
                size='28'
              />
              <span className='mx-px10'>·</span>
              <a href={account.link} target='_blank' rel='noreferrer'>
                {account.title}
              </a>
            </div>
          ))}
        </div>
        {/*Friend Link*/}
        {openFriendLink && (
          <div
            className={classNames(
              'friend-link w-full relative flex lg:flex gap-y-px14 flex-col py-px30 border-t border-lightPrimary border-opacity-30 dark:border-primary dark:border-opacity-50',
              {
                hidden: !isShowPanel,
              },
            )}
          >
            <div className='dark:text-primary text-green text-lg leading-10/15 font-bold'>友链</div>
            {friendLinks.map((friend) => (
              <a
                href={friend.link}
                target='_blank'
                rel='noreferrer'
                key={friend.id}
                className={classNames(
                  'flex items-center text-base dark:text-primary text-lightPrimary',
                  touchHover,
                )}
              >
                <span>{friend.author}</span>
                <span className='mx-px10'>·</span>
                <span>{friend.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
export default Aside
