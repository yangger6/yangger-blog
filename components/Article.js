import React from 'react'
import Tag from './Tag'
import classNames from 'classnames'
const Article = ({ type }) => {
  let typeClassNames = 'w-full'
  if (type === 'banner') {
    typeClassNames = 'lg:w-full'
  } else {
    typeClassNames = 'lg:w-1/2 xl:w-1/3'
  }
  return (
    <article
      className={classNames(
        'article flex flex-col py-px60 border-b dark:border-primary',
        typeClassNames,
      )}
    >
      <header className='mb-2'>
        <div className='date text-xs leading-5 dark:text-grayGreen'>2021 / 02 / 05</div>
      </header>
      <main>
        <h1 className='text-2xl md:text-4xl font-bold dark:text-white leading-9 mb-6 cursor-pointer transition-all dark:hover:text-primary'>
          PHP在Windows环境下获取GMT时间
        </h1>
        <div className='text-base desc dark:text-white dark:text-opacity-80 leading-6 mb-6'>
          在调用讯飞语音合成(流式版)接口时，它要求传入date参数为GMT时间，类似这样“Thu, 01 Aug 2019
          01:53:21 GMT”。使用它默认的demo测试时，发现一直提示401
          Unauthorized错误，官方说明是认证签名错误。官方提供的PHP版demo中...
        </div>
        <div className='meta flex flex-wrap'>
          <div className='tags flex flex-wrap gap-px14'>
            <Tag type={'top'} />
            <Tag type='tag' text='PHP' />
            <Tag type='tag' text='GMT' />
          </div>
        </div>
      </main>
      <footer></footer>
    </article>
  )
}
export default Article
