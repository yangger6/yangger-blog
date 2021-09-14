export function getStrapiURL(path = '', isMedia = false) {
  // 因为用了cdn 要区分 api host和 media host
  return `${
    isMedia
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl)
  const data = await response.json()
  return data
}

export async function fetchArticles(current = 1, pageSize = 10) {
  // current=1 pageSize=10 -> start=0 end=10
  // current=2 pageSize=10 -> start=10 end=10
  const start = current * pageSize - pageSize
  return await fetchAPI(
    `/articles?status=published&_sort=top:desc,created_at:desc&_start=${start}&_limit=${pageSize}`,
  )
}
