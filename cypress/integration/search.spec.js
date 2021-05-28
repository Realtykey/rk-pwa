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
    login()
    searchUser()
  }
)
