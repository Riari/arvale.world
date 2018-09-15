import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne, AfterLoad } from 'typeorm'
import slugify from 'slugify'
import showdown from 'showdown'
import truncate from 'truncate-html'

import { ArticleCategory } from './ArticleCategory'
import { ForumThread } from './ForumThread'
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

  @OneToOne(type => ForumThread, { nullable: true })
  @JoinColumn()
  thread: ForumThread

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
    const converter = this.getMarkdownConverter()

    this.slugify()
    this.body_html = converter.makeHtml(this.body)
    this.body_excerpt = truncate(this.body_html, 80, { byWords: true })
  }

  slugify () {
    this.slug = slugify(this.title, { lower: true })
  }

  getMarkdownExcerpt () {
    const converter = this.getMarkdownConverter()
    return truncate(this.body, 80, { byWords: true })
  }

  getMarkdownConverter () {
    return new showdown.Converter({
      tasklists: true,
      ghCodeBlocks: true
    })
  }

}
