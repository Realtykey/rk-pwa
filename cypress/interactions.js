const login = (email, password) => {
  it('login', () => {
    cy.get('input[name$="email"]').type(email)
    cy.get('input[name$="password"]').type(password)
    cy.get('button[type$="submit"]').click()
  })
}

const register = () => {
  it('register', () => {
    //
  })
}

const searchUser = () => {
  it('search user', () => {
    cy.get('a[href$="/Home/PublicArea/agents"]').click()

    cy.get('input[type$="search"]').type('kevin').type('{enter}')
  })
}

export { login, searchUser, register }
