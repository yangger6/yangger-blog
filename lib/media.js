import { getStrapiURL } from './api'

export function getStrapiMedia(media) {
  const imageUrl = media.url.startsWith('/') ? getStrapiURL(media.url, true) : media.url
  return imageUrl
}
