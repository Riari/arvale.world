import { BaseEntity, Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, OneToMany, AfterLoad } from 'typeorm'
import slugify from 'slugify'

import { ForumThread } from './ForumThread'
import { ForumPost } from './ForumPost'

@Entity({ name: 'forum_category' })
@Tree('materialized-path')
export class ForumCategory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  acceptsThreads: boolean

  @TreeChildren()
  children: ForumCategory[]

  @TreeParent()
  parent: ForumCategory

  @Column({ default: 0 })
  threadCount: number

  @Column({ default: 0 })
  postCount: number

  @Column({ nullable: true })
  latestThreadId: number

  @Column({ nullable: true })
  latestThreadTitle: string

  @Column({ nullable: true })
  latestThreadAuthor: string

  @Column({ nullable: true })
  latestPostId: number

  @Column({ nullable: true })
  latestPostAuthor: string

  @Column({ nullable: true })
  latestPostThreadId: number

  @Column({ nullable: true })
  latestPostThreadTitle: string

  @OneToMany(type => ForumThread, thread => thread.category)
  threads: ForumThread[]

  @OneToMany(type => ForumPost, post => post.category)
  posts: ForumPost[]

  slug: string
  latestThreadSlug: string
  latestPostThreadSlug: string

  @AfterLoad()
  onLoad () {
    this.slug = slugify(this.name, { lower: true })

    if (this.latestThreadTitle) {
      this.latestThreadSlug = slugify(this.latestThreadTitle, { lower: true })
    }

    if (this.latestPostThreadTitle) {
      this.latestPostThreadSlug = slugify(this.latestPostThreadTitle, { lower: true })
    }
  }

  async updateLatestThread () {
    const thread = await ForumThread.findOne({
      relations: ['author'],
      where: { category: this.id },
      order: { createdAt: 'DESC' }
    })

    this.setLatestThread(thread)
  }

  async updateLatestPost () {
    const post = await ForumPost.findOne({
      relations: ['author', 'thread'],
      where: { category: this.id },
      order: { createdAt: 'DESC' }
    })

    this.setLatestPost(post)
  }

  setLatestThread (thread: ForumThread) {
    if (thread) {
      this.latestThreadId = thread.id
      this.latestThreadTitle = thread.title
      this.latestThreadAuthor = thread.author.name
    } else {
      this.latestThreadId = null
      this.latestThreadTitle = null
      this.latestThreadAuthor = null
    }
  }

  setLatestPost (post: ForumPost) {
    if (post) {
      this.latestPostId = post.id
      this.latestPostAuthor = post.author.name
      this.latestPostThreadId = post.thread.id
      this.latestPostThreadTitle = post.thread.title
    } else {
      this.latestPostId = null
      this.latestPostAuthor = null
      this.latestPostThreadId = null
      this.latestPostThreadTitle = null
    }
  }

}
