import { Article } from '../entities/Article'
import { ArticleCategory } from '../entities/ArticleCategory'
import { User } from '../entities/User'

export const article = async (req, res, next, id) => {
  req.params.article = await Article.findOne({ relations: ['author', 'author.roles', 'category'], where: { id } })
  next()
}

export const articleCategory = async (req, res, next, id) => {
  req.params.articleCategory = await ArticleCategory.findOne({ where: { id } })
  next()
}

export const user = async (req, res, next, id) => {
  req.params.user = await User.findOne({ relations: ['roles'], where: { id } })
  next()
}
