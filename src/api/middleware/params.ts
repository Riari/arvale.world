import { Article } from '../entities/Article'
import { ArticleCategory } from '../entities/ArticleCategory'
import { ForumCategory } from '../entities/ForumCategory'
import { ForumThread } from '../entities/ForumThread'
import { ForumPost } from '../entities/ForumPost'
import { User } from '../entities/User'

export const article = async (req, res, next, id) => {
  req.params.article = await Article.findOne({ relations: ['author', 'author.roles', 'category'], where: { id } })
  next()
}

export const articleCategory = async (req, res, next, id) => {
  req.params.articleCategory = await ArticleCategory.findOne({ where: { id } })
  next()
}

export const forumCategory = async (req, res, next, id) => {
  req.params.forumCategory = await ForumCategory.findOne({ where: { id } })
  next()
}

export const forumThread = async (req, res, next, id) => {
  req.params.forumThread = await ForumThread.findOne({ relations: ['author', 'category', 'latestPost'], where: { id } })
  next()
}

export const forumPost = async (req, res, next, id) => {
  req.params.forumPost = await ForumPost.findOne({ relations: ['category', 'thread'], where: { id } })
  next()
}

export const user = async (req, res, next, id) => {
  req.params.user = await User.findOne({ relations: ['roles'], where: { id } })
  next()
}
