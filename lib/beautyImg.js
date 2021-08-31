export const BeautyImage = (element) => {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={element.src} alt={element.alt} />
      {element.alt && <i className='image-alt'>[ {element.alt} ]</i>}
    </>
  )
}
