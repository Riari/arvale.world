import { getManager } from 'typeorm'

import { User } from '../entities/User'
import { ForumCategory } from '../entities/ForumCategory'
import { ForumThread } from '../entities/ForumThread';

const permissions = require('./permissions')
const forumCategories = require('./forum/categories')

export class Policy {
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

  'get.article' = async (user: User, params?: any) => {
    if (params.article && params.article.published) {
      return true
    }

    if (!user) {
      return false
    }

    return this.isUserAdmin(user)
  }

  'get.forum.category.thread' = async (user: User, params?: any, body?: any) => {
    if (!user) {
      return false
    }

    const category = params.forumCategory

    if (category && !category.acceptsThreads) {
      return false
    }

    return this.isForumCategoryAccessible(category, user)
  }

  'post.forum.thread' = async (user: User, params?: any, body?: any) => {
    const category = await ForumCategory.findOne(body.category)

    if (!category.acceptsThreads) {
      return false
    }

    return this.isForumCategoryAccessible(category, user)
  }

  'post.forum.post' = async (user: User, params?: any, body?: any) => {
    const thread = await ForumThread.findOne({ relations: ['category'], where: { id: body.thread } })

    if (!thread || thread.lockedAt && !this.isUserAdmin(user)) {
      return false
    }

    return this.isForumCategoryAccessible(thread.category, user)
  }

  'patch.forum.post' = async (user: User, params?: any, body?: any) => {
    return (this.isUserAdmin(user) || !params.forumPost.thread.lockedAt && params.forumPost.author.id == user.id)
  }

  private isUserAdmin = (user: User) => {
    return user && user.roleList.includes('Administrator')
  }

  private isForumCategoryAccessible = async (category: ForumCategory, user: User) => {
    const repository = getManager().getTreeRepository(ForumCategory)

    const parents = await repository.findAncestors(category)

    if (forumCategories[category.id] && !forumCategories[category.id].some(role => user.roleList.includes(role))) {
      return false
    }

    for (let c of parents) {
      if (forumCategories[c.id] && !forumCategories[c.id].some(role => user.roleList.includes(role))) {
        return false
      }
    }

    return true
  }
}
