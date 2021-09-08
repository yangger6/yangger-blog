import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Tag from './Tag'
import dayjs from 'dayjs'

const Article = ({ type, article, className: propClassName, index }) => {
  let typeClassNames = 'w-full'
  let contextClassNames = 'w-full'
  let subContextClassNames = 'hidden'
  // banner
  if (type === 'Banner' || article.top) {
    typeClassNames = 'banner w-full'
    if (index === 0 || article.top) {
      // banner是第一条 或者 置顶
      contextClassNames = 'w-full flex flex-col lg:w-7/10'
      subContextClassNames =
        'w-3/10 flex-col pl-px40 dark:text-white items-center h-full justify-center hidden lg:flex'
    }
  } else {
    typeClassNames = 'items w-full lg:w-1/2 xl:w-1/3'
  }
  return (
    <article
      className={classNames(
        'article flex py-px60 border-b border-lightPrimary border-opacity-30 dark:border-primary lg:px-px20 dark:border-opacity-50',
        typeClassNames,
        propClassName,
      )}
    >
      <div className={contextClassNames}>
        <header className='mb-2'>
          <div className='date text-xs leading-5 dark:text-grayGreen'>
            {dayjs(article.created_at).format('YYYY / MM / DD')}
          </div>
        </header>
        <main>
          <Link href={`/${article.slug}`}>
            <a>
              <h1
                className={classNames(
                  'text-2xl leading-10/15 md:leading-10/15 font-bold dark:text-white mb-px24 cursor-pointer transition-all duration-300 dark:hover:text-primary',
                  type === 'banner' ? 'md:text-4xl' : 'md:text-2xl',
                )}
              >
                {article.title}
              </h1>
            </a>
          </Link>
          <div className='text-base desc dark:text-white dark:text-opacity-80 leading-6 mb-6'>
            {article.description}
          </div>
        </main>
        <footer>
          <div className='meta flex flex-wrap'>
            <div className='tags flex flex-wrap gap-px14'>
              {article.top && <Tag type={'top'} />}
              {article.categories.map((category) => {
                return (
                  <Tag key={category.id} type='tag' slug={category.slug} text={category.name} />
                )
              })}
            </div>
          </div>
        </footer>
      </div>
      <div className={subContextClassNames}>
        <div className='flex flex-col gap-y-px40'>
          <div className='tag-info'>
            <div className='flex items-center'>
              <div className='w-px4 h-px4 dark:bg-primary mr-px8 rounded-full' />
              本文字数
            </div>
            <div className='ml-px12'>{article.content.length}字</div>
          </div>
          <div className='tag-info'>
            <div className='flex items-center'>
              <div className='w-px4 h-px4 dark:bg-primary mr-px8 rounded-full' />
              阅读时间
            </div>
            <div className='ml-px12'>{Math.floor(article.content.length / 400)}分钟</div>
          </div>
        </div>
      </div>
    </article>
  )
}
export default Article
