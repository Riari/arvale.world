import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'
import * as Cookie from 'js-cookie'

export default class AuthService extends HTTPResource {
  createUser (username: string, email: string, password: string): AxiosPromise {
    return this.client.post('auth/user', { username, email, password })
  }

  logIn (email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.post('auth/login', { email, password })
        .then(response => {
          if (response.data.token) {
            Cookie.set('token', response.data.token)
          }

          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }

  getMe (): AxiosPromise {
    return this.client.get('auth/me')
  }

  logOut () {
    Cookie.remove('token')
  }
}
