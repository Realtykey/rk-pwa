import { login, searchUser } from '../interactions'

describe(
  'Dev',
  {
    viewportWidth: 600,
    viewportHeight: 700,
    env: {
      DEMO: true,
      API: 'http://localhost:9000'
    }
  },
  () => {
    it('start', () => {
      cy.visit('http://localhost:3000')
    })

    login('pato1418@yahoo.com', '123456')

    // searchUser()
  }
)
