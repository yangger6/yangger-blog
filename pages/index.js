import React, { useContext } from 'react'
import { fetchAPI, fetchArticles } from '../lib/api'
import BlogPage from './page/[page]'

const Home = ({ articles, categories, homepage }) => {
  return <BlogPage categories={categories} homepage={homepage} articles={articles} />
}
export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchArticles(1, 1),
    fetchAPI('/categories'),
    fetchAPI('/homepage'),
  ])
  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  }
}

export default Home
