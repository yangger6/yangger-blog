import classNames from 'classnames'

const Tag = ({ text = '', type = 'top' }) => {
  // top | tag
  const baseClassName = 'tag py-px2 px-px17 rounded-full text-sm'
  return (
    <>
      {type === 'top' && (
        <div className={classNames(baseClassName, 'top', 'dark:text-black dark:bg-primary')}>
          置顶
        </div>
      )}
      {type === 'tag' && (
        <div
          className={classNames(
            baseClassName,
            'dark:bg-black dark:text-primary border border-primary',
          )}
        >
          #{text}
        </div>
      )}
    </>
  )
}
export default Tag
