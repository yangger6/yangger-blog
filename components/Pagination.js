import { useRef, useState } from 'react'
import classNames from 'classnames'
import AnimateArrow from './AnimateArrow'
import { useHover } from '../hooks'

const Pagination = ({}) => {
  const [hoverRef, isHovered] = useHover(false)
  const normal = 'text-2xl font-light leading-9 flex items-center transition-all cursor-pointer'
  const darkMode = 'dark:text-white dark:hover:text-primary'
  return (
    <div className='py-px60 w-full border-b dark:border-primary flex items-center'>
      <span className={classNames(normal, darkMode, 'mr-px60')}>上一页</span>
      <span ref={hoverRef} className={classNames(normal, darkMode)}>
        下一页
        <AnimateArrow isHover={isHovered} color={isHovered ? '#7BF0BE' : '#fff'} />
      </span>
    </div>
  )
}

export default Pagination
