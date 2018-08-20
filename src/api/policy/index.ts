import { User } from '../entities/User'

const permissions = require('./permissions')

export class Policy {
  static check (permission: string, user: any, params?: object) {
    if (typeof this[permission] === 'function') {
      return this[permission](user, params)
    }

    if (typeof permissions[permission] !== 'undefined') {
      if (typeof user === 'undefined') {
        return false
      }

      return permissions[permission].some(role => user.roleList.includes(role))
    }

    return true
  }

  'delete.forum.discussion' = async (user: User, params?: object) => {
    // use params.discussion, params.category, etc
  }
}
