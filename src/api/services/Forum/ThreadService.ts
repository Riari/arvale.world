import express from 'express'
import striptags from 'striptags'

import { ForumCategory } from '../../entities/ForumCategory'
import { ForumThread } from '../../entities/ForumThread'
import { ForumPost } from '../../entities/ForumPost'

export default class ThreadService {
  getLatest = async (number: number = 5) => {
    const threads = await ForumThread.find({ relations: ['author', 'author.roles'], take: number, order: { createdAt: 'DESC' } })
    return threads
  }

  create = async (title: string, category: ForumCategory, author: express.user, body: string) => {
    let thread = await ForumThread.create({
      title: title,
      category,
      author
    })
    thread = await thread.save()

    let post = await ForumPost.create({
      category,
      thread,
      body: striptags(body),
      author
    })
    post = await post.save()

    thread.latestPost = post
    thread.save()
    thread.slugify()

    return thread
  }
}

