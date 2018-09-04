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

  @Column({ default: 0 })
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

  async setLatestThread (thread: ForumThread) {
    this.latestThreadId = thread.id
    this.latestThreadTitle = thread.title
    this.latestThreadAuthor = thread.author.name
  }

  async setLatestPost (post: ForumPost) {
    this.latestPostId = post.id
    this.latestPostAuthor = post.author.name
    this.latestPostThreadId = post.thread.id
    this.latestPostThreadTitle = post.thread.title
  }

}
