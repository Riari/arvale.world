import { emitter } from './EventEmitter'
import { Article } from '../entities/Article'
import Services from '../services'
import config from '../config'

emitter.on('article.created', async ({ article }: { article: Article }) => {
  if (article.published) {
    const forumCategory = await Services.get('forum.category').get(config.forum.announcementCategory)

    article.slugify()

    const thread = await Services.get('forum.thread').create(
      article.title,
      forumCategory,
      article.author,
      article.getMarkdownExcerpt() + `\n\n [View article](/news/${article.id}-${article.slug})`
    )

    article.thread = thread
    article.save()

    forumCategory.threadCount++
    forumCategory.postCount++
    forumCategory.save()

    if (config.production) {
      Services.get('article').sendToArvee(article)
    }
  }
})

emitter.on('article.updated', async ({ article, previouslyPublished }: { article: Article, previouslyPublished: Boolean }) => {
  if (!previouslyPublished && article.published) {
    if (!article.thread) {
      const forumCategory = await Services.get('forum.category').get(config.forum.announcementCategory)

      article.slugify()

      const thread = await Services.get('forum.thread').create(
        article.title,
        forumCategory,
        article.author,
        article.getMarkdownExcerpt() + `\n\n [View article](/news/${article.id}-${article.slug})`
      )

      article.thread = thread
      article.save()

      forumCategory.threadCount++
      forumCategory.postCount++
      forumCategory.save()
    }
  }
})
