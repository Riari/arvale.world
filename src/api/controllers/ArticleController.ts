import { Request, Response } from 'express'
import striptags from 'striptags'

import Controller from './Controller'

import ArticleService from '../services/ArticleService'
import ForumCategoryService from '../services/Forum/CategoryService'
import ForumThreadService from '../services/Forum/ThreadService'

import { Article } from '../entities/Article'
import { ArticleCategory } from '../entities/ArticleCategory'

class ArticleController extends Controller {
  list = async (req: Request, res: Response) => {
    const currentPage = req.query.page ? req.query.page : 1
    const perPage = Article.perPage

    const where: any = {}

    if (!req.user || !req.user.roleList.includes('Administrator') && !req.query.withUnpublished) {
      where.published = true
    }

    if (req.params.articleCategory) {
      where.category = req.params.articleCategory.id
    } else if (req.query.category) {
      where.category = req.query.category
    }

    let [articles, itemCount] = await Article.findAndCount({
      relations: ['author', 'author.roles', 'category'],
      skip: (currentPage - 1) * perPage,
      take: perPage,
      order: { createdAt: 'DESC' },
      where
    })

    const response = {
      currentPage,
      perPage,
      itemCount,
      totalPages: Math.ceil(itemCount / perPage),
      data: articles
    }

    return res.status(200).send(response)
  }

  listCategories = async (req: Request, res: Response) => {
    const categories = await ArticleCategory.find()
    return res.status(200).send(categories)
  }

  get = async (req: Request, res: Response) => {
    if (req.params.article) {
      return res.send(req.params.article)
    }

    return res.status(404).send({ message: 'Article not found.' })
  }

  create = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      title: 'required',
      body: 'required',
      category: 'required',
      published: 'boolean'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const category = await ArticleCategory.findOne(req.body.category)

    if (!category) {
      return res.status(404).send({ message: 'Specified category not found.' })
    }

    const body = striptags(req.body.body)

    let article = await Article.create({
      title: req.body.title,
      body,
      category: req.body.category,
      published: !!req.body.published,
      author: req.user.id
    })

    article = await article.save()

    this.emit('article.created', { article })

    return res.status(201).send(article)
  }

  update = async (req: Request, res: Response) => {
    if (!req.params.article) {
      return res.status(404).send({ message: 'Specified article not found.' })
    }

    const validation = this.validate(req.body, {
      title: 'string',
      body: 'string',
      published: 'boolean'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const published = req.params.article.published
    let article = req.params.article

    if (req.body.title) {
      article.title = req.body.title
    }

    if (req.body.body) {
      article.body = striptags(req.body.body)
    }

    if (req.body.category) {
      const category = await ArticleCategory.findOne(req.body.category)

      if (!category) {
        return res.status(404).send({ message: 'Specified category not found.' })
      }

      article.category = category.id
    }

    article.published = req.body.published ? req.body.published : false

    article = await article.save()

    this.emit('article.updated', { article, previouslyPublished: published })

    return res.status(200).send(article)
  }

  remove = async (req: Request, res: Response) => {
    if (!req.params.article) {
      return res.status(404).send({ message: 'Specified article not found.' })
    }

    const article = req.params.article

    await article.thread.remove()
    article.remove()

    return res.status(200).send(article)
  }
}

export default new ArticleController
