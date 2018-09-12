import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, AfterLoad } from 'typeorm'
import showdown from 'showdown'

import { ForumCategory } from './ForumCategory'
import { ForumThread } from './ForumThread'
import { User } from './User'

@Entity({ name: 'forum_post' })
export class ForumPost extends BaseEntity {

  static perPage = 12

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  body: string

  @ManyToOne(type => ForumCategory, category => category.posts)
  @JoinColumn()
  category: ForumCategory

  @ManyToOne(type => ForumThread, thread => thread.posts)
  @JoinColumn()
  thread: ForumThread

  @ManyToOne(type => User, author => author.posts)
  @JoinColumn()
  author: User

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number

  number: number
  body_html: string

  @AfterLoad()
  onLoad () {
    const converter = new showdown.Converter({
      tasklists: true,
      ghCodeBlocks: true
    })

    this.body_html = converter.makeHtml(this.body)
  }

}
