import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { fetchAPI } from '../lib/api'
import Article from '../components/Article'
import Pagination from '../components/Pagination'

const Home = ({ articles, categories, homepage }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      {articles.map((article) => {
        return <Article key={article.id} type={article.articletype || 'items'} article={article} />
      })}
      <Pagination />
    </Layout>
  )
}
export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI('/articles?status=published'),
    fetchAPI('/categories'),
    fetchAPI('/homepage'),
  ])
  console.log(articles)
  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  }
}

export default Home
