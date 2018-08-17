import axios, { AxiosInstance } from 'axios'
import * as Cookie from 'js-cookie'

export abstract class HTTPResource {
  client: AxiosInstance

  constructor (baseURL: string = '/api/') {
    this.client = axios.create({
      baseURL: baseURL,
      withCredentials: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const token = Cookie.get('token')

    if (token) {
      this.client.defaults.headers['x-access-token'] = token
    }
  }
}
