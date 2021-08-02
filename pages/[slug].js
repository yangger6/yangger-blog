import Markdown from 'markdown-to-jsx'
import { fetchAPI } from '../lib/api'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import React from 'react'
import classNames from 'classnames'
import Tag from '../components/Tag'

const ArticlePage = ({ article, categories, homepage }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <article className='dark:text-white'>
        <header className='mb-2 mt-px60'>
          <div className='date text-xs leading-5 dark:text-grayGreen'>2021 / 02 / 05</div>
          <h1
            className={classNames(
              'text-2xl leading-10/15 md:leading-10/15 font-bold dark:text-white cursor-pointer transition-all dark:hover:text-primary md:text-4xl',
            )}
          >
            {article.title}
          </h1>
          <p className='mt-px16 mb-px24 text-sm text-opacity-80 text-white flex items-center gap-px8'>
            <span>本文字数: {article.content.length}</span>
            <span>阅读时间: {Math.floor(article.content.length / 400)}分钟</span>
          </p>
        </header>
        <footer>
          <div className='meta flex flex-wrap'>
            <div className='tags flex flex-wrap gap-px14'>
              {article.top && <Tag type={'top'} />}
              {article.categories.map((category) => {
                return <Tag key={category.id} type='tag' text={category.name} />
              })}
            </div>
          </div>
        </footer>
        <main className='mt-px40'>
          <Markdown id='markdown'>{article.content}</Markdown>
        </main>
      </article>
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
  const [article, categories, homepage] = await Promise.all([
    fetchAPI(`/articles/${params.slug}`),
    fetchAPI('/categories'),
    fetchAPI('/homepage'),
  ])
  if (!article) {
    return {
      notFound: true,
    }
  }
  return {
    props: { article, categories, homepage },
    revalidate: 1,
  }
}
