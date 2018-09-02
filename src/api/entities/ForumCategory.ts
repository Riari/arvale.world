import { BaseEntity, Entity, Tree, PrimaryGeneratedColumn, Column, JoinColumn, TreeChildren, TreeParent, OneToOne, OneToMany, AfterLoad } from 'typeorm'
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

  @OneToMany(type => ForumThread, thread => thread.category)
  threads: ForumThread[]

  @OneToMany(type => ForumPost, post => post.category)
  posts: ForumPost[]

  @OneToOne(type => ForumThread)
  @JoinColumn()
  latestThread: ForumThread

  @OneToOne(type => ForumPost)
  @JoinColumn()
  latestPost: ForumPost

  slug: string

  @AfterLoad()
  onLoad () {
    this.slug = slugify(this.name, { lower: true })
  }

}
