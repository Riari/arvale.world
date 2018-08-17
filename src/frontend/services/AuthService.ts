import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'
import * as Cookie from 'js-cookie'

export default class AuthService extends HTTPResource {
  login (email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.post('auth/login', { email, password })
        .then(response => {
          if (response.data.token) {
            Cookie.set('token', response.data.token)
          }

          resolve(response.data)
        })
    })
  }

  getMe (): AxiosPromise {
    return this.client.get('auth/me')
  }

  logout () {
    Cookie.remove('token')
  }
}
