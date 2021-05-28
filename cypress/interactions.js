const login = () => {
  it('login', () => {
    cy.visit('http://localhost:3000')

    cy.get('input[name$="email"]').type('pato1418@yahoo.com')
    cy.get('input[name$="password"]').type('123456')
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
