import querystring from 'querystring'
import { AxiosPromise } from 'axios'
import { HTTPResource } from '../resources/HTTPResource'

export default class ForumThreadService extends HTTPResource {
  create (category: number, title: string, body: string): AxiosPromise {
    return this.client.post('forum/thread', { category, title, body })
  }

  getById (id: number): AxiosPromise {
    return this.client.get(`forum/thread/${id}`)
  }

  listPosts (threadId: Number, page: Number): AxiosPromise {
    const query: any = { page }

    const queryString = querystring.stringify(query)

    return this.client.get(`forum/thread/${threadId}/post?${queryString}`)
  }

  createPost (threadId: Number, body: String): AxiosPromise {
    return this.client.post('forum/post', { thread: threadId, body })
  }
}
