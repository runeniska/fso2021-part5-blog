import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 100,
    url: 'www.author.com',
    user: {
      name: 'Name',
      username: 'username'
    }
  }

  test('renders title and author but no url or likes by default', () => {
    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent('Title')
    expect(component.container).toHaveTextContent('Title')
    expect(component.container).not.toHaveTextContent('www.author.com')
    expect(component.container).not.toHaveTextContent('100')
  })

  test('shows url and likes when blog is expanded', () => {
    const component = render(<Blog blog={blog} />)
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('www.author.com')
    expect(component.container).toHaveTextContent('100')
  })

  test('calls like handler twice when like button is clicked twice', () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} addLike={mockHandler}/>)
    const button = component.getByText('view')
    fireEvent.click(button)

    // The blog is expanded
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})