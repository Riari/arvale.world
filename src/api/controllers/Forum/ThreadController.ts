import { Request, Response } from 'express'

import Controller from '../Controller'
import Services from '../../services'
import { ForumThread } from '../../entities/ForumThread'
import { ForumPost } from '../../entities/ForumPost'
import { ForumCategory } from '../../entities/ForumCategory'

class ThreadController extends Controller {
  listByCategory = async (req: Request, res: Response) => {
    if (!req.params.forumCategory) {
      return res.status(404).send({ message: 'Category not found.' })
    }

    const category = req.params.forumCategory
    const perPage = ForumThread.perPage
    let currentPage = req.query.page ? req.query.page : 1

    const totalCount = await ForumThread.count({ where: { category: category.id } })

    if (currentPage > Math.ceil(totalCount / perPage)) {
      currentPage = 1
    }

    let [threads, itemCount] = await ForumThread.findAndCount({
      relations: ['author', 'author.roles', 'latestPost', 'latestPost.author', 'latestPost.author.roles'],
      skip: (currentPage - 1) * perPage,
      take: perPage,
      order: { pinnedAt: 'ASC', updatedAt: 'DESC' },
      where: { category: category.id }
    })

    const response = {
      currentPage,
      perPage,
      itemCount,
      totalPages: Math.ceil(itemCount / perPage),
      data: threads
    }

    return res.status(200).send(response)
  }

  get = async (req: Request, res: Response) => {
    if (req.params.forumThread) {
      return res.status(200).send(req.params.forumThread)
    }

    return res.status(404).send({ message: 'Thread not found.' })
  }

  getLatest = async (req: Request, res: Response) => {
    const threads = await Services.get('forum.thread').getLatest()
    return res.status(200).send(threads)
  }

  create = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      category: 'required',
      title: 'required|min:3|max:128',
      body: 'required|min:5'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const category = await Services.get('forum.category').get(req.body.category)

    if (!category) {
      return res.status(404).send({ message: 'Category not found.' })
    }

    const thread = await Services.get('forum.thread').create(req.body.title, category, req.user, req.body.body)

    this.emit('forum.thread.created', { thread })

    return res.status(201).send(thread)
  }

  update = async (req: Request, res: Response) => {
    if (!req.params.forumThread) {
      return res.status(404).send({ message: 'Thread not found.' })
    }

    const validation = this.validate(req.body, {
      title: 'min:3|max:128'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const originalCategory = req.params.forumThread.category
    let thread = req.params.forumThread

    if (req.body.title) {
      thread.title = req.body.title
    }

    await thread.save()

    if (req.body.category && req.body.category != thread.category.id) {
      const category = await ForumCategory.findOne({ id: req.body.category })

      if (!category) {
        return res.status(404).send({ message: 'Category not found.' })
      }

      thread.category = category
      thread = await thread.save()
    }

    this.emit('forum.thread.updated', { thread, originalCategory })

    return res.status(200).send(thread)
  }

  remove = async (req: Request, res: Response) => {
    if (!req.params.forumThread) {
      return res.status(404).send({ message: 'Thread not found.' })
    }

    const thread = req.params.forumThread

    thread.latestPost = null
    await thread.save()

    await ForumPost.createQueryBuilder().delete().where('thread = :id', { id: thread.id }).execute()

    this.emit('forum.thread.deleting', { thread })

    await thread.remove()

    this.emit('forum.thread.deleted', { thread })

    return res.status(200).send(thread)
  }
}

export default new ThreadController
