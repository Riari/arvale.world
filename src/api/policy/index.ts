import { User } from '../entities/User'

const permissions = require('./permissions')

export class Policy {
  static check (permission: string, user: any, params?: any) {
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

  static 'get.article' = async (user: User, params?: any) => {
    if (params.article.published) {
      return true
    }

    if (!user) {
      return false
    }

    return user.roleList.includes('Administrator')
  }

  static 'delete.forum.discussion' = async (user: User, params?: any) => {
    // use params.discussion, params.category, etc
  }
}
