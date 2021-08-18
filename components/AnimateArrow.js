import IconPark from './IconPark'
import classNames from 'classnames'

export const AnimateLongArrow = ({ fromColor, toColor, isHover }) => {
  return (
    <div
      className={classNames(
        'animate-arrow flex items-center ml-px20 w-px24 h-px12 relative transition-all duration-300',
        {
          'w-px32': isHover,
        },
      )}
    >
      {/*line*/}
      <div
        className='absolute left-0 w-full h-px'
        style={{
          backgroundColor: isHover ? toColor : fromColor,
        }}
      />
      {/*arrow*/}
      <div
        className='absolute border-solid border border-t-0 border-r border-b border-l-0 p-px4 right-0 transform -rotate-45'
        style={{
          borderColor: isHover ? toColor : fromColor,
        }}
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
      className={classNames(
        'absolute left-full animate-short-arrow ml-px4 w-0 transition-all duration-300 overflow-hidden top-0',
        {
          'w-px11': isHover,
        },
      )}
    >
      <IconPark size='11' name='tag-right' color={isHover ? toColor : fromColor} />
    </div>
  )
}
