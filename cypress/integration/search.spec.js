import { login, searchUser, register } from '../interactions'

describe(
  'Dev',
  {
    viewportWidth: 320,
    viewportHeight: 568,
    env: {
      DEMO: true,
      API: 'http://localhost:9000'
    }
  },
  () => {
    it('start', () => {
      cy.visit('http://localhost:3000')
    })

    register()

    // login('pato1418@yahoo.com', '123456')
    // searchUser()
  }
)
