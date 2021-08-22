const login = (profile) => {
  it('login', () => {
    cy.visit('http://localhost:3000/SignIn')
    cy.get('input[name$="email"]').type(profile.email)
    cy.get('input[name$="password"]').type(profile.password)
    cy.get('button[type$="submit"]').click()
  })
}

const register = (profile, submit) => {
  it('register', () => {
    cy.visit('http://localhost:3000/SignUp')

    if (profile.role === 'Agente inmobiliario') cy.get('div[name$="agent"]').click()

    if (profile.role === 'Agencia inmobiliaria') cy.get('div[name$="agency"]').click()

    cy.get('input[name$="name"]').type(profile.name)
    cy.get('input[name$="email"]').type(profile.email)
    cy.get('input[name$="password"]').type(profile.password)
    cy.get('input[name$="phone"]').type(profile.phone)
    cy.get('input[name$="province"]').type(profile.province)
    cy.get('input[name$="city"]').type(profile.city)
    cy.get('input[name$="experience"]').type(profile.experience)
    cy.get('input[name$="ci"]').type(profile.ci)

    cy.get('li[name$="north"]').click()
    cy.get('li[name$="south"]').click()

    if (submit) cy.get('button[type$="submit"]').click()
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
