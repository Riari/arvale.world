import ArticleService from './ArticleService'
import ForumCategoryService from './Forum/CategoryService'
import ForumThreadService from './Forum/ThreadService'
import ForumPostService from './Forum/PostService'

class Services {
  services = {
    'article': ArticleService,
    'forum.category': ForumCategoryService,
    'forum.thread': ForumThreadService,
    'forum.post': ForumPostService
  }

  resolved = {}

  get = name => {
    if (!this.services[name]) {
      throw `Service '${name}' not recognised.`
    }

    if (this.resolved[name]) {
      return this.resolved[name]
    }

    const service = this.resolved[name] = new this.services[name]

    return service
  }
}

const services = new Services

export default services
