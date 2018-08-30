import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, AfterLoad } from 'typeorm'
import slugify from 'slugify'
import showdown from 'showdown'
import truncate from 'truncate-html'

import { ArticleCategory } from './ArticleCategory'
import { User } from './User'

@Entity({ name: 'article' })
export class Article extends BaseEntity {

  static perPage = 10

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

  slug: string
  body_html: string
  body_excerpt: string

  @AfterLoad()
  onLoad () {
    const converter = new showdown.Converter({
      tasklists: true,
      ghCodeBlocks: true
    })

    this.slug = slugify(this.title, { lower: true })
    this.body_html = converter.makeHtml(this.body)
    this.body_excerpt = truncate(this.body_html, 80, { byWords: true })
  }

}
