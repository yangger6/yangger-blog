import classNames from 'classnames'
import { useRouter } from 'next/router'
import { AnimateLongArrow } from './AnimateArrow'
import { useHover } from '../hooks'
import themeColor from '../theme'
const Pagination = ({ current, count, pageSize }) => {
  const [hoverRef, isHovered] = useHover(false)
  const router = useRouter()
  const haveNextPage = pageSize * current < count
  const normal = 'text-2xl font-light leading-9 flex items-center transition-all cursor-pointer'
  const darkMode = 'dark:text-white dark:hover:text-primary'
  const jumpPage = async (addPage = true) => {
    await router.push(`/page/${Number(current) + (addPage ? 1 : -1)}`)
  }
  return (
    <div className='py-px60 w-full border-b dark:border-primary flex items-center'>
      {current > 1 && (
        <span className={classNames(normal, darkMode, 'mr-px60')} onClick={(e) => jumpPage(false)}>
          上一页
        </span>
      )}
      <span ref={hoverRef} className={classNames(normal, darkMode)} onClick={(e) => jumpPage()}>
        {haveNextPage && (
          <>
            下一页
            <AnimateLongArrow isHover={isHovered} fromColor='#fff' toColor={themeColor.primary} />
          </>
        )}
      </span>
    </div>
  )
}

export default Pagination
