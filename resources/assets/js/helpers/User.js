import Token from './Token'
import AppStorage from './AppStorage'

class User {
  login (data) {
    axios.post('/api/auth/login', data)
      .then(res => this.responseAfterLogin(res))
      .catch(error => console.log(error.response.data))
  }

  responseAfterLogin (res) {
    const accessToken = res.data.access_token
    const username = res.data.user
    if (Token.isValid(accessToken)) {
      AppStorage.store(username, accessToken)
    }
  }

  hasToken () {
    const storedToken = AppStorage.getToken()
    if (storedToken) {
      return Token.isValid(storedToken)
    }
    return false
  }

  loggedIn () {
    return this.hasToken()
  }

  logout () {
    AppStorage.clear()
  }

  name () {
    if (this.loggedIn()) {
      AppStorage.getUser()
    }
  }

  id () {
    if (this.loggedIn()) {
      const payload = Token.payload(AppStorage.getToken())
      return payload.sub
    }
  }
}

export default User = new User()
