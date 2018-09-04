import { emitter } from './EventEmitter'
import { ForumCategory } from '../entities/ForumCategory'
import { ForumThread } from '../entities/ForumThread'
import { ForumPost } from '../entities/ForumPost'

emitter.on('forum.thread.created', ({ thread }: { thread: ForumThread }) => {
  thread.category.setLatestThread(thread)
  thread.category.threadCount++
  thread.category.setLatestPost(thread.latestPost)
  thread.category.postCount++
  thread.category.save()
})

emitter.on('forum.thread.updated', async ({ thread, originalCategory }: { thread: ForumThread, originalCategory: ForumCategory }) => {
  if (thread.category.id != originalCategory.id) {
    await ForumPost.createQueryBuilder().update().set({ category: thread.category.id }).where('thread = :id', { id: thread.id }).execute()

    originalCategory.threadCount--
    originalCategory.postCount -= thread.postCount
    await originalCategory.updateLatestThread()
    await originalCategory.updateLatestPost()
    await originalCategory.save()

    thread.category.threadCount++
    thread.category.postCount += thread.postCount
    await thread.category.updateLatestThread()
    await thread.category.updateLatestPost()
    await thread.category.save()
  }
})

emitter.on('forum.thread.deleting', async ({ thread }: { thread: ForumThread }) => {
  thread.category.threadCount--
  thread.category.postCount -= thread.postCount
  await thread.category.save()
})

emitter.on('forum.thread.deleted', async ({ thread }: { thread: ForumThread }) => {
  await thread.category.updateLatestThread()
  await thread.category.updateLatestPost()
  thread.category.save()
})

emitter.on('forum.post.created', async ({ post }: { post: ForumPost }) => {
  post.thread.postCount++
  post.thread.latestPost = post
  post.thread.save()

  post.thread.category.postCount++
  post.thread.category.setLatestPost(post)
  post.thread.category.save()
})

emitter.on('forum.post.deleted', async ({ post }: { post: ForumPost }) => {
  if (post.thread.postCount == 1) {
    await post.thread.remove()

    post.category.threadCount--
    post.category.postCount -= post.thread.postCount
    await post.category.updateLatestThread()
    await post.category.save()
  } else {
    post.category.postCount--
    await post.category.save()

    post.thread.postCount--
    await post.thread.save()
  }

  await post.category.updateLatestPost()
  await post.category.save()
})
