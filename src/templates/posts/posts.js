import React from 'react'

export default function Posts (props) {
  const { post } = props.pageContext

  console.log('post', JSON.parse(post.content.data.content))
  console.log('post', post.HtmlContent)

  return (
    <div>
      <h1>{post.title}</h1>
      {/* <div>{post.content.data.content}</div> */}
      <div dangerouslySetInnerHTML={{ __html: post.HtmlContent.join('') }} />
    </div>
  )
}
