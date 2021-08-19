const hljs = require('highlight.js')

export const BeautyCode = ({ className, children }) => {
  const language = className && className.replace('lang-', '')
  let finalHtml = children
  try {
    if (language) {
      finalHtml = hljs.highlight(children, { language }).value
    } else {
      finalHtml = hljs.highlightAuto(children).value
    }
  } catch (e) {
    console.error('highlight error: \t', e)
    finalHtml = children // 不进行高亮
  }
  return <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: finalHtml }} />
}
