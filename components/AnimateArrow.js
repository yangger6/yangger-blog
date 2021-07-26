import IconPark from './IconPark'
import classNames from 'classnames'

export const AnimateLongArrow = ({ fromColor, toColor, isHover }) => {
  if (!toColor) {
    toColor = fromColor
  }
  return (
    <div className='animate-arrow flex items-center ml-px20'>
      <div
        style={{
          borderColor: isHover ? toColor : fromColor,
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
        color={isHover ? toColor : fromColor}
      />
    </div>
  )
}
export const AnimateShortArrow = ({ fromColor, toColor, isHover }) => {
  if (!toColor) {
    toColor = fromColor
  }
  return (
    <div
      className={classNames('animate-short-arrow ml-px4 w-0 transition-all overflow-hidden', {
        'w-full': isHover,
      })}
    >
      <IconPark size='11' name='tag-right' color={isHover ? toColor : fromColor} />
    </div>
  )
}
