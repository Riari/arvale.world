import { BaseEntity, Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, OneToMany, AfterLoad } from 'typeorm'
import slugify from 'slugify'

import { ForumThread } from './ForumThread'
import { ForumPost } from './ForumPost'

@Entity({ name: 'forum_category', orderBy: { weight: 'ASC' } })
@Tree('materialized-path')
export class ForumCategory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  weight: number

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
  latestPostAuthor: string

  @Column({ nullable: true })
  latestPostThreadId: number

  @Column({ nullable: true })
  latestPostThreadTitle: string

  @Column({ nullable: true })
  latestPostThreadSize: number

  @OneToMany(type => ForumThread, thread => thread.category)
  threads: ForumThread[]

  @OneToMany(type => ForumPost, post => post.category)
  posts: ForumPost[]

  slug: string
  latestPostThreadSlug: string

  @AfterLoad()
  onLoad () {
    this.slug = slugify(this.name, { lower: true })

    if (this.latestPostThreadTitle) {
      this.latestPostThreadSlug = slugify(this.latestPostThreadTitle, { lower: true })
    }
  }

  async updateLatestPost () {
    const post = await ForumPost.findOne({
      relations: ['author', 'thread'],
      where: { category: this.id },
      order: { createdAt: 'DESC' }
    })

    this.setLatestPost(post)
  }

  setLatestPost (post: ForumPost) {
    if (post) {
      this.latestPostAuthor = post.author.name
      this.latestPostThreadId = post.thread.id
      this.latestPostThreadTitle = post.thread.title
      this.latestPostThreadSize = post.thread.postCount
    } else {
      this.latestPostAuthor = null
      this.latestPostThreadId = null
      this.latestPostThreadTitle = null
      this.latestPostThreadSize = null
    }
  }

}
