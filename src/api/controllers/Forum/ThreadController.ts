import { Request, Response } from 'express'
import striptags from 'striptags'

import Controller from '../Controller'
import { ForumThread } from '../../entities/ForumThread'
import { ForumPost } from '../../entities/ForumPost';
import { ForumCategory } from '../../entities/ForumCategory';

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
      thread,
      body: striptags(req.body.body),
      author: req.user
    })

    post.save()

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

    if (req.body.category) {
      const category = await ForumCategory.findOne({ id: req.body.category })

      if (!category) {
        return res.status(404).send({ message: 'Category not found.' })
      }

      thread.category = category
    }

    if (req.body.title) {
      thread.title = req.body.title
    }

    thread = await thread.save()

    return res.status(200).send(thread)
  }

  remove = async (req: Request, res: Response) => {
    if (!req.params.forumThread) {
      return res.status(404).send({ message: 'Thread not found.' })
    }

    const thread = req.params.forumThread

    const posts = await ForumPost.find({ thread })

    for (let post of posts) {
      post.remove()
    }

    thread.remove()

    return res.status(200).send(thread)
  }
}

export default new ThreadController
