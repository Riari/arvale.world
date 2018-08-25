import { Request, Response } from 'express'
import truncate from 'truncate-html'
import showdown from 'showdown'
import Controller from './Controller'
import { Article } from '../entities/Article'
import { ArticleCategory } from '../entities/ArticleCategory'

class ArticleController extends Controller {
  list = async (req: Request, res: Response) => {
    const currentPage = req.query.page ? req.query.page : 1
    const perPage = Article.perPage

    let [articles, itemCount] = await Article.findAndCount({
      relations: ['author', 'category'],
      skip: (currentPage - 1) * perPage,
      take: perPage,
      order: { createdAt: 'DESC' },
      where: req.params.articleCategory ? { category: req.params.articleCategory.id } : {}
    })

    const converter = new showdown.Converter({
      tasklists: true
    })

    articles.forEach((article, index) => {
      articles[index].body = truncate(converter.makeHtml(article.body), 200, { byWords: true })
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
      category: 'required'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const category = await ArticleCategory.findOne(req.body.category)

    if (!category) {
      return res.status(404).send({ message: 'Specified category not found.' })
    }

    let article = await Article.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      author: req.user.id
    })

    article = await article.save()

    return res.status(201).send(article)
  }

  update = async (req: Request, res: Response) => {
    if (!req.params.article) {
      return res.status(404).send({ message: 'Specified article not found.' })
    }

    const validation = this.validate(req.body, {
      title: 'required',
      body: 'required',
      category: 'required'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    let article = req.params.article

    if (req.body.category) {
      const category = await ArticleCategory.findOne(req.body.category)

      if (!category) {
        return res.status(404).send({ message: 'Specified category not found.' })
      }

      article.category = category.id
    }

    if (req.body.title) {
      article.title = req.body.title
    }

    if (req.body.body) {
      article.body = req.body.body
    }

    article = await article.save()

    return res.status(200).send(article)
  }

  remove = async (req: Request, res: Response) => {
    if (!req.params.article) {
      return res.status(404).send({ message: 'Specified article not found.' })
    }

    const article = req.params.article

    article.remove()

    return res.status(200).send(article)
  }
}

export default new ArticleController
