import { login, searchUser, register,  manageProfile } from '../interactions'

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

    const user = {
      // email: 'pato1418@yahoo.com',
      // password: '123456'

      email: 'kevin@coloma.com',
      password: '123456'
    }

    // register()

    login(user.email, user.password)

    // searchUser()
  }
)
