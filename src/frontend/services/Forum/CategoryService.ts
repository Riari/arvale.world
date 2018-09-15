import querystring from 'querystring'
import { AxiosPromise } from 'axios'
import { HTTPResource } from '../resources/HTTPResource'

export default class ForumCategoryService extends HTTPResource {
  list (): AxiosPromise {
    return this.client.get('forum/category')
  }

  getByID (id: number): AxiosPromise {
    return this.client.get(`forum/category/${id}`)
  }

  listThreads (categoryId: Number, page: Number): AxiosPromise {
    const query: any = { page }

    const queryString = querystring.stringify(query)

    return this.client.get(`forum/category/${categoryId}/thread?${queryString}`)
  }
}
