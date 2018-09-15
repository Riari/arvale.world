import { ForumPost } from '../../entities/ForumPost'

export default class PostService {
  getLatest = async (number: number = 10) => {
    const posts = await ForumPost.find({ relations: ['thread', 'author', 'author.roles'], take: number, order: { createdAt: 'DESC' } })
    return posts
  }
}

