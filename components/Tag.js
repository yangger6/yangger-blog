import { useContext } from 'react'
import classNames from 'classnames'
import { useHover } from '../hooks'
import { AnimateShortArrow } from './AnimateArrow'
import Link from 'next/link'
import { GlobalContext } from '../pages/_app'
import themeColors from '../theme'

const Tag = ({ slug, text = '', type = 'top' }) => {
  // top | tag
  const [hoverRef, isHovered] = useHover(false)
  const { theme } = useContext(GlobalContext)
  const baseClassName =
    'flex items-center tag py-px2 px-px17 rounded-full text-sm transition-all duration-300 h-px23'
  return (
    <>
      {type === 'top' && (
        <div
          className={classNames(
            baseClassName,
            'top cursor-default',
            'dark:text-black dark:bg-primary bg-green text-white',
          )}
        >
          置顶
        </div>
      )}
      {type === 'tag' && (
        <Link href={`/tag/${slug}`}>
          <a>
            <div
              ref={hoverRef}
              className={classNames(
                baseClassName,
                'cursor-pointer',
                'text-lightPrimary border border-lightGray border-primary bg-greenGray bg-opacity-20 border-opacity-20 hover:pr-px32',
                'dark:text-primary dark:border-opacity-50 dark:bg-opacity-10 dark:bg-primary',
                {
                  'pr-px32': isHovered,
                },
              )}
            >
              <span className='relative'>
                #{text}
                <AnimateShortArrow
                  isHover={isHovered}
                  fromColor={theme === 'light' ? themeColors.lightPrimary : themeColors.primary}
                />
              </span>
            </div>
          </a>
        </Link>
      )}
    </>
  )
}
export default Tag
