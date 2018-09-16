import { getManager } from 'typeorm'

import Policy from '../Policy'
import { User } from '../../entities/User'
import { ForumCategory } from '../../entities/ForumCategory'
import { ForumThread } from '../../entities/ForumThread'

const forumCategories = require('./categories')

export default class ForumPolicy extends Policy {
  'get.article' = async (user: User, params?: any) => {
    if (params.article && params.article.published) {
      return true
    }

    if (!user) {
      return false
    }

    return this.isUserAdmin(user)
  }

  'get.forum.category' = async (user: User, params?: any, body?: any) => {
    const category = params.forumCategory

    if (!category) {
      // Either this is a list request (/forum/category) or it's a getByID
      // request (/forum/category/:category) but no matching category was found
      return true
    }

    return this.canUserAccessCategory(user ? user : null, category)
  }

  'get.forum.category.thread' = async (user: User, params?: any, body?: any) => {
    const category = params.forumCategory

    if (!category) {
      return true
    }

    return this.canUserAccessCategory(user ? user : null, category)
  }

  'get.forum.thread' = async (user: User, params?: any, body?: any) => {
    if (!params.forumThread) {
      return true
    }

    const category = params.forumThread.category

    return this.canUserAccessCategory(user ? user : null, category)
  }

  'get.forum.thread.post' = async (user: User, params?: any, body?: any) => {
    if (!params.forumThread) {
      return true
    }

    const category = params.forumThread.category

    return this.canUserAccessCategory(user ? user : null, category)
  }

  'post.forum.thread' = async (user: User, params?: any, body?: any) => {
    if (!user) {
      return false
    }

    const category = await ForumCategory.findOne(body.category)

    if (!category || !category.acceptsThreads) {
      return false
    }

    return this.canUserAccessCategory(user, category)
  }

  'post.forum.post' = async (user: User, params?: any, body?: any) => {
    const thread = await ForumThread.findOne({ relations: ['category'], where: { id: body.thread } })

    if (!thread || thread.lockedAt && !this.isUserAdmin(user)) {
      return false
    }

    return this.canUserAccessCategory(user, thread.category)
  }

  'patch.forum.post' = async (user: User, params?: any, body?: any) => {
    return (this.isUserAdmin(user) || !params.forumPost.thread.lockedAt && params.forumPost.author.id == user.id)
  }

  public canUserAccessCategory = async (user: User, category: ForumCategory, checkAncestors = true) => {
    const check = (user, category) => !user ? false : forumCategories[category.id].some(role => user.roleList.includes(role))

    if (forumCategories[category.id]) {
      return check(user, category)
    }

    if (checkAncestors) {
      const repository = getManager().getTreeRepository(ForumCategory)

      const parents = await repository.findAncestors(category)

      for (let c of parents) {
        if (forumCategories[c.id]) {
          return check(user, c)
        }
      }
    }

    return true
  }
}
