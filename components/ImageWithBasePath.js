import React from 'react'
import Image from 'next/image'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH

const ImageWithBasePath = (props) => {
  let srcObj = props.src
  if (srcObj.src && srcObj.src.startsWith('/')) {
    srcObj.src = `${basePath || ''}${srcObj.src}`
  }
  return <Image {...props} src={srcObj} />
}

export default ImageWithBasePath
