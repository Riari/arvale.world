import Validator from 'validatorjs'

export default abstract class Controller {
  validate (data: object, rules: object) {
    return new Validator(data, rules)
  }
}
