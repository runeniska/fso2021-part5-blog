describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'user123',
      password: 'user123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user123')
      cy.get('#password').type('user123')
      cy.get('#login-button').click()
      cy.get('#logout-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong_username')
      cy.get('#password').type('wrong_password')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user123', password: 'user123' })
    })

    it('a blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('The Awesome Story')
      cy.get('#author').type('Author X')
      cy.get('#url').type('http://localhost:3000')
      cy.get('#create-button').click()
      cy.get('.success')
        .should('contain', 'A new blog The Awesome Story by Author X added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('The Awesome Story Author X')
    })

    it('a blog can be liked', function() {
      cy.createBlog({
        title: 'The Awesome Story',
        author: 'Author X',
        url: 'http://localhost:3000'
      })
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('a blog can be deleted', function() {
      cy.createBlog({
        title: 'The Awesome Story',
        author: 'Author X',
        url: 'http://localhost:3000'
      })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'The Awesome Story Author X')
    })

    it('the blog list is ordered by likes', function() {
      // Create first blog
      cy.createBlog({
        title: 'The Awesome Story',
        author: 'Author X',
        url: 'http://localhost:3000'
      })
      // Create second blog
      cy.createBlog({
        title: 'The Second Blog',
        author: 'Someone Else',
        url: 'http://someinvalidurl.com'
      })
      cy.contains('view').click()
      cy.contains('view').click()
      /* Ensure that 'The Awesome Story' is before the 'The Second Blog'
       * and the likes are 0 for both after creation
       */
      cy.get('.blog').then(blogs => {
        expect(blogs[0]).to.contain.text('The Awesome Story')
        expect(blogs[0]).to.contain.text('likes 0')
        expect(blogs[1]).to.contain.text('The Second Blog')
        expect(blogs[1]).to.contain.text('likes 0')
      })
      // Like the second blog to reorder the two blogs
      cy.contains('The Second Blog Someone Else')
        .contains('like')
        .click()
      // Wait for the like to be updated
      cy.contains('likes 1')
      /* Ensure that 'The Second Blog' is before the 'The Awesome Story'
       * as it has more likes
       */
      cy.get('.blog').then(blogs => {
        expect(blogs[0]).to.contain.text('The Second Blog')
        expect(blogs[0]).to.contain.text('likes 1')
        expect(blogs[1]).to.contain.text('The Awesome Story')
        expect(blogs[1]).to.contain.text('likes 0')
      })
    })
  })
})
