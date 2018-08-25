import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'

import { ArticleCategory } from './ArticleCategory'
import { User } from './User'

@Entity()
export class Article extends BaseEntity {

  static perPage = 10

  slug: string

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'text' })
  body: string

  @Column({ default: false })
  published: boolean

  @ManyToOne(type => ArticleCategory, category => category.articles)
  @JoinColumn()
  category: ArticleCategory

  @ManyToOne(type => User, author => author.articles)
  @JoinColumn()
  author: User

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number

}
