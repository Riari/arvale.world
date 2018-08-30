import { BaseEntity, Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, OneToMany, AfterLoad } from 'typeorm'
import slugify from 'slugify'

import { ForumThread } from './ForumThread'

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

  @OneToMany(type => ForumThread, thread => thread.category)
  threads: ForumThread[]

  slug: string

  @AfterLoad()
  onLoad () {
    this.slug = slugify(this.name, { lower: true })
  }

}
