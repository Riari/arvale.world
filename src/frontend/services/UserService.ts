import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'
import * as Cookie from 'js-cookie'

export default class UserService extends HTTPResource {
  create (username: string, email: string, password: string): AxiosPromise {
    return this.client.post('user', { username, email, password })
  }

  verify (code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.post('user/verify', { code })
        .then(response => {
          if (response.data.token) {
            Cookie.set('token', response.data.token)
          }

          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
}
