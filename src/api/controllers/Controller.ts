import Validator from 'validatorjs'

export default abstract class Controller {
  config: any

  constructor() {
    this.config = require('../config/app.json')
  }

  validate (data: object, rules: object) {
    return new Validator(data, rules)
  }
}
