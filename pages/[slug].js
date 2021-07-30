import Markdown from 'markdown-to-jsx'
import { fetchAPI } from '../lib/api'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import React from 'react'

const ArticlePage = ({ article, categories, homepage }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <Markdown className='text-primary'>{article.content}</Markdown>
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
