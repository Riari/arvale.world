import { getManager } from 'typeorm'
import Validator from 'validatorjs'
import config from '../config'

export default abstract class Controller {
  config: any

  constructor() {
    this.config = config
  }

  getTreeRepository (entity) {
    return getManager().getTreeRepository(entity)
  }

  validate (data: object, rules: object) {
    return new Validator(data, rules)
  }
}
