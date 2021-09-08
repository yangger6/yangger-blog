import React from 'react'
import { fetchAPI } from '../../lib/api'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import Article from '../../components/Article'

const TagPage = ({ categories, homepage, currentTag }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <div className='tag-list flex flex-col w-full'>
        <div className='title text-2xl md:text-4xl leading-10/15 font-title flex dark:text-primary text-lightPrimary justify-between mt-px60 items-center pb-px60 border-b border-lightPrimary border-opacity-30 dark:border-primary'>
          <h2>#{currentTag.name}</h2>
          <div className='tag-line h-px dark:bg-primary flex-1 mx-px40' />
          <div>({currentTag.articles.length})</div>
        </div>
        {currentTag.articles &&
          currentTag.articles.map((article) => {
            return <Article key={article.id} type={'Banner'} article={article} />
          })}
      </div>
    </Layout>
  )
}
export async function getStaticPaths() {
  const categories = await fetchAPI('/categories')
  return {
    paths: categories.map((article) => ({
      params: {
        tag: article.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Run API calls in parallel
  const [categories, homepage] = await Promise.all([fetchAPI(`/categories`), fetchAPI('/homepage')])
  const currentTag = categories.find((category) => category.slug === params.tag)
  currentTag.articles = currentTag.articles.map((tagArticle) => {
    const tagCategories = categories.filter((category) => {
      return category.articles.find((article) => article.slug === tagArticle.slug)
    })
    tagArticle.categories = JSON.parse(JSON.stringify(tagCategories))
    return tagArticle
  })
  return {
    props: {
      categories,
      homepage,
      currentTag,
    },
    revalidate: 1,
  }
}

export default TagPage
