import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'

export default class ArticleService extends HTTPResource {
  list (page: Number): AxiosPromise {
    return this.client.get(`article?page=${page}`)
  }
}
