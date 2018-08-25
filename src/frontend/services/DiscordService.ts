import { AxiosPromise } from 'axios'
import { HTTPResource } from './resources/HTTPResource'

export default class DiscordService extends HTTPResource {
  constructor () {
    super('https://discordapp.com/api/', false)
  }

  getServerStatus (): AxiosPromise {
    return this.client.get('guilds/269616654797766656/widget.json')
  }
}
