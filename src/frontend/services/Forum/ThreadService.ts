import { AxiosPromise } from 'axios'
import { HTTPResource } from '../resources/HTTPResource'

export default class ForumThreadService extends HTTPResource {
  create (category: number, title: string, body: string): AxiosPromise {
    return this.client.post('forum/thread', { category, title, body })
  }

  getById (id: number): AxiosPromise {
    return this.client.get(`forum/thread/${id}`)
  }
}
