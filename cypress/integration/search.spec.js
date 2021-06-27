import interactions from '../interactions'

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

    const profiles = [
      {
        owner: 'kevin',
        email: 'kevin@coloma.com',
        password: '123456'
      },
      {
        owner: 'ronny',
        email: 'pato1418@yahoo.com',
        password: '123456'
      }
    ]
    const owner = 'ronny'
    // interactions.register()
    interactions.login(profiles.find((profile) => profile.owner === owner))

    // interactions.manageProfile()
    interactions.searchUser(owner)
  }
)
