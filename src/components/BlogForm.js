import React, { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleSubmit({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input value={title} id='title' onChange={handleTitleChange}/>
        </div>
        <div>
          author:
          <input value={author} id='author' onChange={handleAuthorChange}/>
        </div>
        <div>
          url:
          <input value={url} id='url' onChange={handleUrlChange}/>
        </div>
        <button type='submit' id='create-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm