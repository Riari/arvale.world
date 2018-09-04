import { getManager } from 'typeorm'
import Validator from 'validatorjs'
import config from '../config'
import EventEmitter, { emitter } from '../events/EventEmitter'

export default abstract class Controller {
  config: any
  eventEmitter: EventEmitter

  constructor() {
    this.config = config
    this.eventEmitter = emitter
  }

  getTreeRepository (entity) {
    return getManager().getTreeRepository(entity)
  }

  validate (data: object, rules: object) {
    return new Validator(data, rules)
  }

  emit (eventName, payload) {
    this.eventEmitter.emit(eventName, payload)
  }
}
