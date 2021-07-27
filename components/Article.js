import React from 'react'
import Tag from './Tag'
import classNames from 'classnames'
const Article = ({ type }) => {
  let typeClassNames = 'w-full'
  let contextClassNames = 'w-full'
  let subContextClassNames = 'hidden'
  if (type === 'banner') {
    typeClassNames = 'lg:w-full'
    contextClassNames = 'w-7/10 flex flex-col'
    subContextClassNames =
      'w-3/10 flex flex-col pl-px40 dark:text-white items-center h-full justify-center'
  } else {
    typeClassNames = 'items lg:w-1/2 xl:w-1/3'
  }
  return (
    <article
      className={classNames(
        'article flex py-px60 border-b dark:border-primary lg:px-px20',
        typeClassNames,
      )}
    >
      <div className={contextClassNames}>
        <header className='mb-2'>
          <div className='date text-xs leading-5 dark:text-grayGreen'>2021 / 02 / 05</div>
        </header>
        <main>
          <h1
            className={classNames(
              'text-2xl leading-10/15 md:leading-10/15 font-bold dark:text-white mb-px24 cursor-pointer transition-all dark:hover:text-primary',
              type === 'banner' ? 'md:text-4xl' : 'md:text-2xl',
            )}
          >
            PHP在Windows环境下获取GMT时间
          </h1>
          <div className='text-base desc dark:text-white dark:text-opacity-80 leading-6 mb-6'>
            在调用讯飞语音合成(流式版)接口时，它要求传入date参数为GMT时间，类似这样“Thu, 01 Aug 2019
            01:53:21 GMT”。使用它默认的demo测试时，发现一直提示401
            Unauthorized错误，官方说明是认证签名错误。官方提供的PHP版demo中...
          </div>
        </main>
        <footer>
          <div className='meta flex flex-wrap'>
            <div className='tags flex flex-wrap gap-px14'>
              <Tag type={'top'} />
              <Tag type='tag' text='PHP' />
              <Tag type='tag' text='PYTHON' />
            </div>
          </div>
        </footer>
      </div>
      <div className={subContextClassNames}>
        <div className='flex flex-col gap-y-px40'>
          <div className='tag-info'>
            <div className='flex items-center'>
              <div className='w-px4 h-px4 dark:bg-primary mr-px8 rounded-full' />
              标题很短
            </div>
            <div className='ml-px12'>2000分钟</div>
          </div>
          <div className='tag-info'>
            <div className='flex items-center'>
              <div className='w-px4 h-px4 dark:bg-primary mr-px8 rounded-full' />
              标题很长标题很长
            </div>
            <div className='ml-px12'>点点滴滴</div>
          </div>
        </div>
      </div>
    </article>
  )
}
export default Article
