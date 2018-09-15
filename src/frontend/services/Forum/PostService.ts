import { AxiosPromise } from 'axios'
import { HTTPResource } from '../resources/HTTPResource'

export default class ForumPostService extends HTTPResource {
  listLatest (): AxiosPromise {
    return this.client.get('forum/post/latest')
  }
}
