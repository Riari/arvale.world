import { Request, Response } from 'express'
import striptags from 'striptags'

import Controller from '../Controller'
import { ForumThread } from '../../entities/ForumThread'
import { ForumPost } from '../../entities/ForumPost'
import { ForumCategory } from '../../entities/ForumCategory'

class ThreadController extends Controller {
  listByCategory = async (req: Request, res: Response) => {
    if (req.params.forumCategory) {
      return res.status(200).send(req.params.forumCategory.threads)
    }

    return res.status(404).send({ message: 'Category not found.' })
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

    const category = await ForumCategory.findOne({ id: req.body.category })

    if (!category) {
      return res.status(404).send({ message: 'Category not found.' })
    }

    let thread = await ForumThread.create({
      title: req.body.title,
      category,
      author: req.user
    })
    thread = await thread.save()

    let post = await ForumPost.create({
      category,
      thread,
      body: striptags(req.body.body),
      author: req.user
    })
    post = await post.save()

    thread.latestPost = post
    thread.save()

    category.setLatestThread(thread)
    category.threadCount++
    category.setLatestPost(post)
    category.postCount++
    category.save()

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

    let thread = req.params.forumThread

    if (req.body.title) {
      thread.title = req.body.title
    }

    thread = await thread.save()

    let oldCategory = null
    let newCategory = null
    if (req.body.category && req.body.category != thread.category.id) {
      oldCategory = thread.category
      newCategory = await ForumCategory.findOne({ id: req.body.category })

      if (!newCategory) {
        return res.status(404).send({ message: 'Category not found.' })
      }

      thread.category = newCategory
      await thread.save()

      const oldCategoryLatestThread = await ForumThread.findOne({ relations: ['latestPost'], where: { category: oldCategory.id }, order: { createdAt: 'DESC' } })
      const oldCategoryLatestPost = await ForumPost.findOne({ relations: ['author', 'thread'], where: { category: oldCategory.id }, order: { createdAt: 'DESC' } })

      oldCategory.setLatestThread(oldCategoryLatestThread)
      oldCategory.setLatestPost(oldCategoryLatestPost)

      oldCategory.postCount = oldCategory.postCount - thread.postCount
      oldCategory.threadCount--
      await oldCategory.save()

      const newCategoryLatestPost = await ForumPost.findOne({ relations: ['author', 'thread'], where: { category: newCategory.id }, order: { createdAt: 'DESC' } })

      newCategory.setLatestThread(thread)
      newCategory.threadCount++

      if (newCategoryLatestPost) {
        newCategory.setLatestPost(newCategoryLatestPost)
      } else {
        newCategory.setLatestPost(thread.latestPost)
      }

      newCategory.postCount = newCategory.postCount + thread.postCount
      await newCategory.save()
    }

    thread = await ForumThread.findOne(thread.id)

    return res.status(200).send(thread)
  }

  remove = async (req: Request, res: Response) => {
    if (!req.params.forumThread) {
      return res.status(404).send({ message: 'Thread not found.' })
    }

    const thread = req.params.forumThread
    const category = await ForumCategory.findOne(thread.category.id)

    await ForumPost.createQueryBuilder().delete().where('thread = :id', { id: thread.id }).execute()

    thread.remove()

    category.threadCount--
    category.postCount = category.postCount - thread.postCount

    category.save()

    return res.status(200).send(thread)
  }
}

export default new ThreadController
