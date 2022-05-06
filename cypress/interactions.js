const login = (profile, action) => {
  it('login', () => {
    cy.visit('https://localhost:3000/SignIn')
    cy.get('input[name$="email"]').type(profile.email)
    cy.get('input[name$="password"]').type(profile.password)

    if (action === 'submit') cy.get('button[type$="submit"]').click()
  })
}

const register = (profile, action) => {
  it('register', () => {
    cy.visit('https://localhost:3000/SignIn')

    cy.get('[data-cy=register-link]').click()

    cy.get('li[name$="north"]').click()

    if (profile.role === 'Agente inmobiliario') {
      cy.get('div[name$="agent"]').click()
    }

    if (profile.role === 'Agencia inmobiliaria') {
      cy.get('div[name$="agency"]').click()
    }

    cy.get('input[id$="firstName"]').type(profile.name)
    if (profile.role !== 'Agencia inmobiliaria') {
      cy.get('input[name$="lname"]').type(profile.lname)
    }
    cy.get('input[name$="email"]').type(profile.email)
    cy.get('input[name$="password"]').type(profile.password)
    cy.get('input[name$="phone"]').type(profile.phone)
    cy.get('input[name$="province"]').type(profile.province)
    cy.get('input[name$="city"]').type(profile.city)
    cy.get('input[name$="experience"]').type(profile.experience)
    cy.get('input[name$="ci"]').type(profile.ci)

    cy.get('li[name$="north"]').click()
    cy.get('li[name$="south"]').click()

    if (action === 'submit') cy.get('button[type$="submit"]').click()
  })
}

const manageProfile = () => {
  it('manage profile', () => {
    cy.visit('https://localhost:3000/Home/AgentForm')
  })
}

const searchUser = (owner) => {
  it('search user', () => {
    cy.get('a[href$="/Home/PublicArea/agents"]').click()

    cy.get('input[type$="search"]').type(owner).type('{enter}')
  })
}

const createProperty = () => {
  it('create property', () => {
    cy.get('[data-cy=property-form-link]').click()

    cy.get('[data-cy=title]').type(
      'Casa rentera en la carolina cerca de la tribuna de los shyris'
    )
    cy.get('[data-cy=property-type]').select('Casa')
    cy.get('[data-cy=operation]').select('Alquiler')
    cy.get('input[name$="dormitories"]').type(5)
    cy.get('input[name$="parkings"]').type(5)
    cy.get('input[name$="bathrooms"]').type(5)
    cy.get('input[name$="area"]').type(200)

    cy.get('textarea[name$="description"]')
      .type('ReNta departamento de lujo de 2 dormitorios en el Quito Tenis')

    cy.get('[data-cy=images-picker]').attachFile('properties/sample1.jpg')
    cy.get('div[id$="geocoder"]').click()
    cy.get('input[id$="react-select-2-input"]').type('la carolina')
    cy.get('div[id$="react-select-2-option-0"]').click()
    cy.get('input[name$="price"]').type(4000)

    // cy.get('button[type$="submit"]').click()
  })
}

export default { login, searchUser, register, manageProfile, createProperty }
