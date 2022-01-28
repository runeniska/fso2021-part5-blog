/* Tee testi, joka varmistaa että blogin näyttävä komponentti
 * renderöi blogin titlen, authorin mutta ei renderöi
 * oletusarvoisesti urlia eikä likejen määrää.
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
  let component

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test('renders title and author but no url or likes by default', () => {
    expect(component.container).toHaveTextContent('Title')
    expect(component.container).toHaveTextContent('Title')
    expect(component.container).not.toHaveTextContent('www.author.com')
    expect(component.container).not.toHaveTextContent('100')
  })
})