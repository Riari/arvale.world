import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'

export default class NWNService extends HTTPResource {
  getServerStatus(): AxiosPromise {
    return this.client.get('nwn/server-status')
  }
}
