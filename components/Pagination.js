import classNames from 'classnames'
import Link from 'next/link'
import { AnimateLongArrow } from './AnimateArrow'
import { useHover } from '../hooks'
import themeColor from '../theme'
const Pagination = ({ current, count, pageSize }) => {
  const [hoverRef, isHovered] = useHover(false)
  const haveNextPage = pageSize * current < count
  const normal =
    'text-2xl font-light leading-9 flex items-center transition-all duration-300 cursor-pointer'
  const darkMode = 'dark:text-white dark:hover:text-primary'
  return (
    <div
      className={classNames(
        'py-px60 w-full border-b dark:border-primary dark:border-opacity-50 flex items-center',
        {
          hidden: current === 1 && !haveNextPage,
        },
      )}
    >
      {current > 1 && (
        <Link href={`/page/${Number(current) - 1}`}>
          <a className={classNames(normal, darkMode, 'mr-px60')}>上一页</a>
        </Link>
      )}
      <Link href={`/page/${Number(current) + 1}`}>
        <a ref={hoverRef} className={classNames(normal, darkMode)}>
          {haveNextPage && (
            <>
              下一页
              <AnimateLongArrow isHover={isHovered} fromColor='#fff' toColor={themeColor.primary} />
            </>
          )}
        </a>
      </Link>
    </div>
  )
}

export default Pagination
