import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'

export default class ArticleService extends HTTPResource {
  list (page: Number): AxiosPromise {
    return this.client.get(`article?page=${page}`)
  }

  listCategories (): AxiosPromise {
    return this.client.get('article/category')
  }

  create (title: string, body: string, category: number): AxiosPromise {
    return this.client.post(`article`, { title, body, category })
  }
}
