import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  const formInformation = {
    title: 'Title',
    author: 'Author',
    url: 'www.author.com'
  }
  /* Tee uuden blogin luomisesta huolehtivalle lomakkelle testi,
   * joka varmistaa, että lomake kutsuu propseina saamaansa
   * takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa
   * kun blogi luodaan.
   */
  test('calls the callback function (handleSubmit) with correct information', () => {
    const mockHandler = jest.fn()
    const component = render(<BlogForm handleSubmit={mockHandler} />)

    // Map the elements to variables
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const createButton = component.getByText('create')

    // Fill the form
    fireEvent.change(title, {
      target: { value: formInformation.title }
    })
    fireEvent.change(author, {
      target: { value: formInformation.author }
    })
    fireEvent.change(url, {
      target: { value: formInformation.url }
    })

    // Submit the form
    fireEvent.click(createButton)

    // Expect one callback function call, three properties and correct values
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(Object.keys(mockHandler.mock.calls[0][0])).toHaveLength(3)
    expect(mockHandler.mock.calls[0][0].title).toBe(formInformation.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(formInformation.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(formInformation.url)
  })
})