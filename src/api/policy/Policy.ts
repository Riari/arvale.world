import { User } from '../entities/User'

const permissions = require('./permissions')

export default class Policy {
  check (permission: string, user: any, params?: any, body?: any) {
    if (typeof this[permission] === 'function') {
      return this[permission](user, params, body)
    }

    if (typeof permissions[permission] !== 'undefined') {
      if (typeof user === 'undefined') {
        return false
      }

      return permissions[permission].some(role => user.roleList.includes(role))
    }

    return true
  }

  protected isUserAdmin = (user: User) => {
    return user && user.roleList.includes('Administrator')
  }
}
