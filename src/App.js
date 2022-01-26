import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: '', success: true })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(
        {
          text: 'Wrong username or password',
          success: false
        }
      )
      setTimeout(() => setMessage(''), 5000)
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleUsernameChange = ({ target }) => (
    setUsername(target.value)
  )

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const createBlog = async (blog) => {
    const obj = await blogService.create(blog)
    const userObject = {
      username: obj.user.username,
      name: obj.user.name,
      id: obj.user.id
    }
    const blogObject = {
      user: userObject,
      ...obj
    }
    setBlogs(blogs.concat(blogObject))
    setMessage(
      {
        text: `A new blog ${blog.title} by ${blog.author} added`,
        success: true
      }
    )
    setTimeout(() => setMessage(''), 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.text} success={message.success} />
        <LoginForm 
          handleSubmit={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message.text} success={message.success} />
      <div>
        {user.name} logged in
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <BlogForm handleSubmit={createBlog} />
    </div>
  )
}

export default App
