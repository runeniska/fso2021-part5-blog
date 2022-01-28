import React, { useState } from 'react'
const Blog = ({ blog, username, addLike, remove }) => {
  const [showAll, setShowAll] = useState(false)

  if (showAll) {

    const removeButton = blog.user.username === username
      ? <div><button onClick={() => remove(blog)}>remove</button></div>
      : null

    return (
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={() => setShowAll(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        {removeButton}
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