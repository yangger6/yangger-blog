import { useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { AnimateLongArrow } from './AnimateArrow'
import { useHover } from '../hooks'

const Pagination = ({ current, count, pageSize }) => {
  const [hoverRef, isHovered] = useHover(false)
  const haveNextPage = pageSize * current < count
  const normal = 'text-2xl font-light leading-9 flex items-center transition-all cursor-pointer'
  const darkMode = 'dark:text-white dark:hover:text-primary'
  return (
    <div className='py-px60 w-full border-b dark:border-primary flex items-center'>
      {current > 1 && <span className={classNames(normal, darkMode, 'mr-px60')}>上一页</span>}
      <span ref={hoverRef} className={classNames(normal, darkMode)}>
        下一页
        <AnimateLongArrow isHover={isHovered} fromColor='#fff' toColor='#7BF0BE' />
      </span>
    </div>
  )
}

export default Pagination
