import React, { useContext } from 'react'
import { fetchAPI, fetchArticles } from '../../lib/api'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import Article from '../../components/Article'
import Pagination from '../../components/Pagination'
import { GlobalContext, PAGE_SIZE } from '../_app'

const BlogPage = ({ articles, categories, homepage, page = 1 }) => {
  const { articleInfo } = useContext(GlobalContext)
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <div className='w-full mt-px60 border-b border-lightPrimary dark:border-primary border-opacity-30 dark:border-opacity-50 lg:hidden'>
        {/*手机模式下的线*/}
      </div>
      {articles.map((article, index) => {
        return (
          <Article
            key={article.id}
            type={article.articletype || 'items'}
            article={article}
            index={index}
          />
        )
      })}
      <Pagination current={page} pageSize={articleInfo.pageSize} count={articleInfo.count} />
    </Layout>
  )
}
export async function getStaticPaths() {
  const articles = await fetchAPI('/articles?status=published&_sort=top:desc,created_at:desc')
  const pageCurrents = Array.from(Array(Math.ceil(articles.length / PAGE_SIZE)), (_, x) => x + 1)
  return {
    paths: pageCurrents.map((pageCurrent) => ({
      params: {
        page: pageCurrent.toString(),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchArticles(params.page, PAGE_SIZE),
    fetchAPI('/categories'),
    fetchAPI('/homepage'),
  ])
  return {
    props: { articles, categories, homepage, page: params.page },
    revalidate: 1,
  }
}

export default BlogPage
