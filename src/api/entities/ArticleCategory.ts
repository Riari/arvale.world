import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from 'typeorm'
import slugify from 'slugify'

import { Article } from './Article'

@Entity({ name: 'article_category' })
export class ArticleCategory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => Article, article => article.category)
  articles: Article[]

  slug: string

  @AfterLoad()
  onLoad () {
    this.slug = slugify(this.name, { lower: true })
  }

}
