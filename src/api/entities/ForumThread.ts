import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToOne, OneToMany, AfterLoad } from 'typeorm'
import slugify from 'slugify'

import { ForumCategory } from './ForumCategory'
import { ForumPost } from './ForumPost'
import { User } from './User'

@Entity({ name: 'forum_thread' })
export class ForumThread extends BaseEntity {

  static perPage = 20

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @ManyToOne(type => ForumCategory, category => category.threads)
  @JoinColumn()
  category: ForumCategory

  @ManyToOne(type => User, author => author.threads)
  @JoinColumn()
  author: User

  @OneToMany(type => ForumPost, post => post.thread)
  posts: ForumPost[]

  @Column({ default: 1 })
  postCount: number

  @OneToOne(type => ForumPost)
  @JoinColumn()
  latestPost: ForumPost

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  lockedAt: string

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  pinnedAt: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number

  slug: string

  @AfterLoad()
  onLoad () {
    this.slugify()
  }

  slugify () {
    this.slug = slugify(this.title, { lower: true })
  }

}
