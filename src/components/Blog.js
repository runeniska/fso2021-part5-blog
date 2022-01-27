import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  if (showAll) {
    return (
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={() => setShowAll(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    )
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(true)}>view</button>
    </div>
  )
}

export default Blog