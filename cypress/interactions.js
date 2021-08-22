const login = (profile) => {
  it('login', () => {
    cy.visit('http://localhost:3000/SignIn')
    cy.get('input[name$="email"]').type(profile.email)
    cy.get('input[name$="password"]').type(profile.password)
    cy.get('button[type$="submit"]').click()
  })
}

const register = () => {
  it('register', () => {
    cy.visit('http://localhost:3000/SignUp')
  })
}

const manageProfile = () => {
  it('manage profile', () => {
    cy.visit('http://localhost:3000/Home/AgentForm')
  })
}

const searchUser = (owner) => {
  it('search user', () => {
    cy.get('a[href$="/Home/PublicArea/agents"]').click()

    cy.get('input[type$="search"]').type(owner).type('{enter}')
  })
}

export default { login, searchUser, register, manageProfile }
