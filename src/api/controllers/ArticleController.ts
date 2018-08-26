import { Request, Response } from 'express'
import showdown from 'showdown'
import slugify from 'slugify'
import truncate from 'truncate-html'
import striptags from 'striptags'
import Controller from './Controller'
import { Article } from '../entities/Article'
import { ArticleCategory } from '../entities/ArticleCategory'

class ArticleController extends Controller {
  private getMarkdownConverter () {
    return new showdown.Converter({
      tasklists: true
    })
  }

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

    const converter = this.getMarkdownConverter()

    articles.forEach((article, index) => {
      articles[index].slug = slugify(article.title, { lower: true })
      articles[index].body = truncate(converter.makeHtml(article.body), 80, { byWords: true })
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

    categories.forEach((category, index) => {
      categories[index].slug = slugify(category.name, { lower: true })
    })

    return res.status(200).send(categories)
  }

  get = async (req: Request, res: Response) => {
    if (req.params.article) {
      return res.send(req.params.article.transform())
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

    let article = await Article.create({
      title: req.body.title,
      body: striptags(req.body.body),
      category: req.body.category,
      published: req.body.published ? req.body.published : false,
      author: req.user.id
    })

    article = await article.save()

    return res.status(201).send(article.transform())
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

    return res.status(200).send(article.transform())
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
