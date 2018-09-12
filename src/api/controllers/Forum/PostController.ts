import { Request, Response } from 'express'
import Controller from '../Controller'
import { ForumPost } from '../../entities/ForumPost'
import { ForumThread } from '../../entities/ForumThread'
import { ForumCategory } from '../../entities/ForumCategory';

class PostController extends Controller {
  listByThread = async (req: Request, res: Response) => {
    if (!req.params.forumThread) {
      return res.status(404).send({ message: 'Thread not found.' })
    }

    const thread = req.params.forumThread
    const perPage = ForumPost.perPage
    let currentPage = req.query.page ? req.query.page : 1

    const totalCount = await ForumPost.count({ where: { thread: thread.id } })

    if (currentPage > Math.ceil(totalCount / perPage)) {
      currentPage = 1
    }

    let [posts, itemCount] = await ForumPost.findAndCount({
      relations: ['author', 'author.roles'],
      skip: (currentPage - 1) * perPage,
      take: perPage,
      order: { createdAt: 'ASC' },
      where: { thread: thread.id }
    })

    let enumeration = ((currentPage - 1) * perPage) + 1
    posts.forEach((post, index) => {
      posts[index].number = enumeration++
    })

    const response = {
      currentPage,
      perPage,
      itemCount,
      totalPages: Math.ceil(itemCount / perPage),
      data: posts
    }

    return res.status(200).send(response)
  }

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

    const entity = {
      category: thread.category,
      thread,
      body: req.body.body,
      author: req.user
    }

    let post = await ForumPost.create(entity)
    await post.save()

    let postCount = await ForumPost.count({ where: { thread: thread.id } })
    post.number = postCount

    post.thread.slugify()

    this.emit('forum.post.created', { post: Object.assign({}, post, entity) })

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

    thread.latestPost = null
    await thread.save()
    await post.remove()

    this.emit('forum.post.deleted', { post })

    return res.status(200).send(post)
  }
}

export default new PostController
