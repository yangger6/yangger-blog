import IconPark from './IconPark'
import classNames from 'classnames'

const AnimateArrow = ({ color, isHover }) => {
  return (
    <div className='animate-arrow flex items-center ml-px20'>
      <div
        style={{
          borderColor: color,
          transform: 'scaleY(.9) translateY(-0.66px)',
        }}
        className='link w-px5 border-t'
      />
      <IconPark
        name='right-rest'
        className={classNames(
          {
            'translate-x-px5': isHover,
          },
          'transition-all transform -ml-px5',
        )}
        fill={color}
      />
    </div>
  )
}
export default AnimateArrow
