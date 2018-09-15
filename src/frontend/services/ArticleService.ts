import querystring from 'querystring'
import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'

interface ListOptions {
  category?: Number
  withUnpublished?: Boolean
}

interface ListQuery {
  page: Number
  category?: Number
  withUnpublished?: Boolean
}

export default class ArticleService extends HTTPResource {
  list (page: Number, options?: ListOptions): AxiosPromise {
    const query: ListQuery = { page }

    if (options) {
      if (options.category) {
        query.category = options.category
      }
      if (options.withUnpublished) {
        query.withUnpublished = true
      }
    }

    const queryString = querystring.stringify(query)

    return this.client.get(`article?${queryString}`)
  }

  listCategories (): AxiosPromise {
    return this.client.get('article/category')
  }

  get (id: number): AxiosPromise {
    return this.client.get(`article/${id}`)
  }

  create (title: string, body: string, category: number, published: boolean): AxiosPromise {
    return this.client.post('article', { title, body, category, published })
  }

  update (article): AxiosPromise {
    return this.client.patch(`article/${article.id}`, article)
  }

  destroy (article): AxiosPromise {
    return this.client.delete(`article/${article.id}`)
  }
}
