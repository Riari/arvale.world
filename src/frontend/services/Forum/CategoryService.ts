import { AxiosPromise } from 'axios'
import { HTTPResource } from '../resources/HTTPResource'

export default class ForumCategoryService extends HTTPResource {
  list (): AxiosPromise {
    return this.client.get('forum/category')
  }

  getByID (id: number): AxiosPromise {
    return this.client.get(`forum/category/${id}`)
  }
}
