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
    const profiles = [
      {
        owner: 'kevin',
        email: 'kevin@coloma.com',
        password: '123456'
      },
      {
        owner: 'ronny',
        name: 'Ronny Cajas',
        role: 'Agencia inmobiliaria',
        email: 'pato1418@yahoo.com',
        password: '123456',
        phone: '0992825956',
        province: 'Pichincha',
        city: 'Quito',
        experience: 2,
        ci: '1725257594'
      },
      {
        owner: 'dailyhome',
        name: 'Dailyhome',
        role: 'Agencia inmobiliaria',
        email: 'dailyhome1418@yahoo.com',
        password: '123456',
        phone: '0992825956',
        province: 'Pichincha',
        city: 'Quito',
        experience: 2,
        ci: '123456789'
      }
    ]
    const owner = 'ronny'

    interactions.register(profiles.find((profile) => profile.owner === owner), false)
  }
)
