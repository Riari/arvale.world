import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import slugify from 'slugify'
import showdown from 'showdown'

import { ArticleCategory } from './ArticleCategory'
import { User } from './User'

@Entity({ name: 'article' })
export class Article extends BaseEntity {

  static perPage = 10

  slug: string
  body_html: string

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

  transform () {
    const converter = new showdown.Converter({
      tasklists: true,
      ghCodeBlocks: true
    })

    const article: any = {
      id: this.id,
      title: this.title,
      slug: this.title ? slugify(this.title, { lower: true }) : null,
      body: this.body,
      body_html: converter.makeHtml(this.body),
      category: this.category,
      author: this.author,
      published: this.published,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    if (article.category.name) {
      article.category.slug = slugify(this.category.name, { lower: true })
    }

    return article
  }

}
