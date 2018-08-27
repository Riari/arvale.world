import Validator from 'validatorjs'
import config from '../config'

export default abstract class Controller {
  config: any

  constructor() {
    this.config = config
  }

  validate (data: object, rules: object) {
    return new Validator(data, rules)
  }
}
