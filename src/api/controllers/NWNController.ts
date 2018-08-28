import https from 'https'
import { Request, Response } from 'express'
import Controller from './Controller'

class NWNController extends Controller {
  serverStatus = (req: Request, res: Response) => {
    const url = `https://api.nwn.beamdog.net/v1/servers/${this.config.nwn.ip}/${this.config.nwn.port}`

    https.get(url, response => {
      let data = ''

      if (response.statusCode == 200) {
        response.on('data', chunk => {
          data += chunk
        })

        response.on('end', () => {
          const status = JSON.parse(data)
          res.send(status)
        })
      } else {
        res.status(response.statusCode).send({ message: response.statusMessage })
      }
    }).on('error', error => res.status(503).send({ message: 'request_failed' }))
  }
}

export default new NWNController
