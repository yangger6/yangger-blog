import Markdown from 'markdown-to-jsx'
import { fetchAPI } from '../lib/api'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import React from 'react'
import classNames from 'classnames'
import Tag from '../components/Tag'
import { AnimateLongArrow } from '../components/AnimateArrow'
import Article from '../components/Article'
import dayjs from 'dayjs'
import { BeautyCode } from '../lib/beautyCode'
import { BeautyImage } from '../lib/beautyImg'

const ArticlePage = ({ article, categories, blog }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={blog.seo} article={article} />
      <article className='dark:text-white'>
        <header className='mb-2 mt-px60'>
          <div className='date text-xs leading-5 dark:text-grayGreen mb-px16'>
            {dayjs(article.created_at).format('YYYY / MM / DD')}
          </div>
          <h1
            className={classNames(
              'text-2xl leading-10/15 md:leading-10/15 font-bold cursor-default dark:text-white md:text-4xl',
            )}
          >
            {article.title}
          </h1>
          <p className='mt-px16 mb-px24 text-opacity-80 text-white flex items-center gap-px8'>
            <span className='text-sm'>本文字数: {article.content.length}</span>
            <span className='text-sm'>
              阅读时间: {Math.floor(article.content.length / 400)}分钟
            </span>
          </p>
        </header>
        <footer>
          <div className='meta flex flex-wrap'>
            <div className='tags flex flex-wrap gap-px14'>
              {article.top && <Tag type={'top'} />}
              {article.categories.map((category) => {
                return (
                  <Tag key={category.id} type='tag' text={category.name} slug={category.slug} />
                )
              })}
            </div>
          </div>
        </footer>
        <main className='mt-px40'>
          <Markdown
            id='markdown'
            options={{
              overrides: {
                code: BeautyCode,
                img: BeautyImage,
              },
            }}
          >
            {article.content}
          </Markdown>
        </main>
      </article>
      <div className='line my-px60 w-full h-px dark:bg-primary' />
      <div className='more flex flex-col'>
        <div className='title flex h-px36 text-2xl items-center dark:text-white'>
          <span className='font-light'>更多阅读</span>
          <AnimateLongArrow isHover={false} fromColor='#fff' toColor='#7BF0BE' />
        </div>
        <div className='more-articles flex flex-wrap'>
          {article.prevItem && (
            <Article className='w-full' type='items' article={article.prevItem} />
          )}
          {article.nextItem && (
            <Article className='w-full' type='items' article={article.nextItem} />
          )}
        </div>
      </div>
    </Layout>
  )
}
export default ArticlePage

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles?status=published')
  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const [article, categories, blog] = await Promise.all([
    fetchAPI(`/articles/${params.slug}`),
    fetchAPI('/categories'),
    fetchAPI('/blog'),
  ])
  if (!article) {
    return {
      notFound: true,
    }
  }
  return {
    props: { article, categories, blog },
    revalidate: 1,
  }
}
