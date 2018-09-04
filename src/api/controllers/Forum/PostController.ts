import { Request, Response } from 'express'
import Controller from '../Controller'
import { ForumPost } from '../../entities/ForumPost'
import { ForumThread } from '../../entities/ForumThread'
import { ForumCategory } from '../../entities/ForumCategory';

class PostController extends Controller {
  create = async (req: Request, res: Response) => {
    const validation = this.validate(req.body, {
      thread: 'required',
      body: 'required|min:5'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    const thread = await ForumThread.findOne({ relations: ['category'], where: { id: req.body.thread } })

    if (!thread) {
      return res.status(404).send({ message: 'Thread not found.' })
    }

    let post = await ForumPost.create({
      category: thread.category,
      thread,
      body: req.body.body,
      author: req.user
    })

    post = await post.save()

    thread.postCount++
    thread.latestPost = post
    thread.save()

    thread.category.postCount++
    thread.category.setLatestPost(post)
    thread.category.save()

    return res.status(201).send(post)
  }

  update = async (req: Request, res: Response) => {
    if (!req.params.forumPost) {
      return res.status(404).send({ message: 'Post not found.' })
    }

    const validation = this.validate(req.body, {
      body: 'required|min:5'
    })

    if (validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    let post = req.params.forumPost

    post.body = req.body.body

    post = await post.save()

    return res.status(200).send(post)
  }

  remove = async (req: Request, res: Response) => {
    if (!req.params.forumPost) {
      return res.status(404).send({ message: 'Post not found.' })
    }

    const post = req.params.forumPost
    const thread = await ForumThread.findOne({ relations: ['category'], where: { id: post.thread.id } })
    const category = await ForumCategory.findOne({ relations: ['latestThread', 'latestPost'], where: { id: thread.category.id } })

    category.postCount--

    thread.latestPost = null
    await thread.save()

    await post.remove()

    if (thread.postCount == 1) {
      category.threadCount--
      await thread.remove()
    } else {
      thread.postCount--
      thread.save()
    }

    const latestCategoryPost = await ForumPost.findOne({ relations: ['author', 'thread', 'thread.author'], where: { category: category.id }, order: { createdAt: 'DESC' } })
    category.setLatestPost(latestCategoryPost)

    const latestCategoryThread = await ForumThread.findOne({ relations: ['author'], where: { category: category.id }, order: { createdAt: 'DESC' } })
    category.setLatestThread(latestCategoryThread)

    await category.save()

    return res.status(200).send(post)
  }
}

export default new PostController
