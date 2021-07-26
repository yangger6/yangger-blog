import classNames from 'classnames'
import { useHover } from '../hooks'
import { AnimateShortArrow } from './AnimateArrow'

const Tag = ({ text = '', type = 'top' }) => {
  // top | tag
  const [hoverRef, isHovered] = useHover(false)
  const baseClassName = 'flex items-center tag py-px2 px-px17 rounded-full text-sm transition-all'
  return (
    <>
      {type === 'top' && (
        <div
          className={classNames(
            baseClassName,
            'top cursor-default',
            'dark:text-black dark:bg-primary',
          )}
        >
          置顶
        </div>
      )}
      {type === 'tag' && (
        <div
          ref={hoverRef}
          className={classNames(
            baseClassName,
            'cursor-pointer',
            'dark:text-primary border border-primary border-opacity-50 dark:bg-opacity-10 dark:bg-primary',
          )}
        >
          #{text}
          <AnimateShortArrow isHover={isHovered} fromColor='#7BF0BE' />
        </div>
      )}
    </>
  )
}
export default Tag
