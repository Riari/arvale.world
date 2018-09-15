import request from 'request'

import config from '../config'

import { Article } from '../entities/Article'

export default class ArticleService {
  config: any

  constructor () {
    this.config = config
  }

  sendToArvee = (article: Article) => {
    console.log('article')
    request(
      {
        uri: `${this.config.arvee.base_uri}news`,
        method: 'POST',
        json: true,
        body: {
          id: article.id,
          author: article.author.name,
          category: article.category.name,
          title: article.title,
          slug: article.slug,
          excerpt: article.getMarkdownExcerpt()
        }
      },
      (error, response) => {
        if (error) {
          console.error(error)
        }
      }
    )
  }
}
